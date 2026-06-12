/* ============================================================
   CONFIG — vul deze in (zie README.md)
   ============================================================ */
window.CONFIG = {
  JSONBIN_API_KEY: "$2a$10$eZo3VQ6ser1OMzQjMUlLBOVAYjSmSezzMc6r3xXGG3HyHPxEfkSOS",  // X-Master-Key van JSONBin.io
  JSONBIN_BIN_ID: "6a2c23e4f5f4af5e29e714c2",          // ID van je bin
  ADMIN_USERS: ["Tiemen"],                               // gebruikersnamen met adminrechten
  ADMIN_SECRET: "Admin6767"                     // wachtwoord voor adminpaneel (#admin)
};

/* ============================================================
   STORAGE — JSONBin met lokale fallback
   Datastructuur in de bin:
   { users: { username: { pwHash, xp, level, badges[], streak,
     lastActive, completed{}, quizScores[], created } } }
   ============================================================ */
const Store = (() => {
  const BASE = "https://api.jsonbin.io/v3/b";
  let cache = null;
  const useRemote = () =>
    CONFIG.JSONBIN_API_KEY && !CONFIG.JSONBIN_API_KEY.startsWith("REPLACE") &&
    CONFIG.JSONBIN_BIN_ID && !CONFIG.JSONBIN_BIN_ID.startsWith("REPLACE");

  async function hash(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str + "::csharp-salt"));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function localGet() {
    try { return JSON.parse(localStorage.getItem("csharp_db") || "{}"); }
    catch { return {}; }
  }
  function localSet(db) { localStorage.setItem("csharp_db", JSON.stringify(db)); }

  async function load() {
    if (cache) return cache;
    if (!useRemote()) { cache = localGet(); if (!cache.users) cache.users = {}; return cache; }
    try {
      const r = await fetch(`${BASE}/${CONFIG.JSONBIN_BIN_ID}/latest`, {
        headers: { "X-Master-Key": CONFIG.JSONBIN_API_KEY, "X-Bin-Meta": "false" }
      });
      if (!r.ok) throw new Error("load fail");
      cache = await r.json();
      if (!cache.users) cache.users = {};
    } catch (e) {
      console.warn("JSONBin load mislukt, lokale fallback", e);
      cache = localGet(); if (!cache.users) cache.users = {};
    }
    return cache;
  }

  async function save() {
    if (!cache) return;
    localSet(cache); // altijd lokaal bewaren als backup
    if (!useRemote()) return;
    try {
      await fetch(`${BASE}/${CONFIG.JSONBIN_BIN_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": CONFIG.JSONBIN_API_KEY },
        body: JSON.stringify(cache)
      });
    } catch (e) { console.warn("JSONBin save mislukt", e); }
  }

  function log(msg) {
    const logs = JSON.parse(localStorage.getItem("csharp_logs") || "[]");
    logs.push({ t: new Date().toISOString(), msg });
    if (logs.length > 200) logs.shift();
    localStorage.setItem("csharp_logs", JSON.stringify(logs));
  }

  return { load, save, hash, log, useRemote };
})();

/* ============================================================
   AUTH
   ============================================================ */
const Auth = (() => {
  let current = null; // username

  function session() { return localStorage.getItem("csharp_user"); }
  function setSession(u) { u ? localStorage.setItem("csharp_user", u) : localStorage.removeItem("csharp_user"); }

  async function register(username, password) {
    username = username.trim();
    if (username.length < 3) return { ok: false, err: "Gebruikersnaam minstens 3 tekens." };
    if (password.length < 4) return { ok: false, err: "Wachtwoord minstens 4 tekens." };
    const db = await Store.load();
    if (db.users[username]) return { ok: false, err: "Gebruikersnaam bestaat al." };
    db.users[username] = {
      pwHash: await Store.hash(password),
      xp: 0, level: 1, badges: [], streak: 0,
      lastActive: new Date().toISOString().slice(0, 10),
      completed: {}, quizScores: [], created: new Date().toISOString()
    };
    await Store.save();
    Store.log(`Registratie: ${username}`);
    current = username; setSession(username);
    return { ok: true };
  }

  async function login(username, password) {
    username = username.trim();
    const db = await Store.load();
    const u = db.users[username];
    if (!u) return { ok: false, err: "Gebruiker niet gevonden." };
    if (u.pwHash !== await Store.hash(password)) return { ok: false, err: "Verkeerd wachtwoord." };
    current = username; setSession(username);
    Gamify.touchStreak(u); await Store.save();
    Store.log(`Login: ${username}`);
    return { ok: true };
  }

  function logout() { current = null; setSession(null); }

  async function resume() {
    const s = session();
    if (!s) return null;
    const db = await Store.load();
    if (!db.users[s]) { setSession(null); return null; }
    current = s;
    return s;
  }

  function user() {
    if (!current || !cacheUsers()) return null;
    return cacheUsers()[current];
  }
  function cacheUsers() { return (Store_cacheRef() || {}).users; }
  function name() { return current; }
  function isAdmin() { return current && CONFIG.ADMIN_USERS.includes(current); }

  // helper to peek cache
  function Store_cacheRef() {
    try { return JSON.parse(localStorage.getItem("csharp_db") || "{}"); } catch { return {}; }
  }

  return { register, login, logout, resume, name, isAdmin,
    async userData() { const db = await Store.load(); return db.users[current]; } };
})();