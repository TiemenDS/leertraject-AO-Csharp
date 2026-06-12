/* ============================================================
   APP BOOT — opstart, auth-modal & event-wiring
   Dit was het ontbrekende beginpunt: het toont de auth-modal,
   dwingt de 3 verplichte vinkjes af bij registratie en start
   daarna de router uit ui.js.
   ============================================================ */
(() => {
  const $ = s => document.querySelector(s);

  /* ---------- Auth-modal ---------- */
  function showAuth() { $("#authModal").classList.add("show"); }
  function hideAuth() { $("#authModal").classList.remove("show"); }

  function switchTab(which) {
    const login = which === "login";
    $("#tabLogin").classList.toggle("active", login);
    $("#tabRegister").classList.toggle("active", !login);
    $("#loginPanel").classList.toggle("hidden", !login);
    $("#registerPanel").classList.toggle("hidden", login);
    $("#loginErr").textContent = "";
    $("#regErr").textContent = "";
  }

  async function enterApp() {
    hideAuth();
    await UI.refreshUserChip();
    if (!location.hash || location.hash === "#") location.hash = "home";
    UI.handleRoute();
  }

  /* ---------- Registratie: vinkjes verplicht ---------- */
  function wireConsent() {
    const boxes = ["#c1", "#c2", "#c3"].map(s => $(s));
    const btn = $("#regBtn");
    const update = () => { btn.disabled = !boxes.every(b => b.checked); };
    boxes.forEach(b => b.addEventListener("change", update));
    update(); // start uitgeschakeld
  }

  /* ---------- Form-handlers ---------- */
  function wireForms() {
    $("#tabLogin").onclick = () => switchTab("login");
    $("#tabRegister").onclick = () => switchTab("register");

    $("#loginBtn").onclick = async () => {
      const u = $("#loginUser").value, p = $("#loginPass").value;
      $("#loginErr").textContent = "";
      const r = await Auth.login(u, p);
      if (!r.ok) { $("#loginErr").textContent = r.err; return; }
      await enterApp();
    };

    $("#regBtn").onclick = async () => {
      if ($("#regBtn").disabled) return;
      const u = $("#regUser").value, p = $("#regPass").value;
      $("#regErr").textContent = "";
      const r = await Auth.register(u, p);
      if (!r.ok) { $("#regErr").textContent = r.err; return; }
      await enterApp();
    };

    // Enter-toets in de velden
    ["#loginUser", "#loginPass"].forEach(s => $(s).addEventListener("keydown", e => { if (e.key === "Enter") $("#loginBtn").click(); }));
    ["#regUser", "#regPass"].forEach(s => $(s).addEventListener("keydown", e => { if (e.key === "Enter") $("#regBtn").click(); }));
  }

  /* ---------- Topbar / sidebar ---------- */
  function wireChrome() {
    $("#menuBtn").onclick = () => $("#sidebar").classList.toggle("open");
    $("#themeBtn").onclick = () => UI.toggleTheme();
    $("#brandHome").onclick = () => { if (Auth.name()) { location.hash = "home"; UI.handleRoute(); } };
  }

  /* ---------- Opstart ---------- */
  async function boot() {
    UI.initTheme();
    wireChrome();
    wireForms();
    wireConsent();
    switchTab("login");

    window.addEventListener("hashchange", () => {
      // verborgen adminpaneel mag ook zonder ingelogde gebruiker
      if (!Auth.name() && currentRoute() !== "admin") { showAuth(); return; }
      UI.handleRoute();
    });

    const user = await Auth.resume();
    if (user) {
      await enterApp();
    } else if (currentRoute() === "admin") {
      hideAuth();
      UI.handleRoute();           // adminpaneel vraagt zelf om het wachtwoord
    } else {
      showAuth();
    }
  }

  function currentRoute() { return location.hash.replace(/^#\/?/, "") || "home"; }

  document.addEventListener("DOMContentLoaded", boot);
})();