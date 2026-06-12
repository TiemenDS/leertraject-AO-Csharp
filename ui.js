/* ============================================================
   UI / APP
   ============================================================ */
const UI = (() => {
  const $ = s => document.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
  let userCache = null;

  /* ---------- Code highlighter (lichtgewicht C#) ---------- */
  function highlight(code) {
    // HTML escapen
    code = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    const keywords = new Set([
      "public","private","protected","internal","static",
      "class","void","int","double","float","decimal",
      "bool","string","char","new","return","if","else",
      "for","foreach","while","do","switch","case","break",
      "continue","this","base","null","true","false",
      "namespace","using","try","catch","finally","throw",
      "const","readonly","enum","struct","interface",
      "virtual","override","abstract","sealed","async",
      "await","var","get","set"
    ]);

    let result = "";
    let i = 0;

    while (i < code.length) {

      // Commentaar
      if (code.substring(i, i + 2) === "//") {
        let end = code.indexOf("\n", i);
        if (end === -1) end = code.length;

        result += `<span class="tok-com">${code.slice(i, end)}</span>`;
        i = end;
        continue;
      }

      // Strings
      if (code[i] === '"') {
        let j = i + 1;

        while (j < code.length) {
          if (code[j] === "\\" && j + 1 < code.length) {
            j += 2;
            continue;
          }

          if (code[j] === '"') {
            j++;
            break;
          }

          j++;
        }

        result += `<span class="tok-str">${code.slice(i, j)}</span>`;
        i = j;
        continue;
      }

      // Getallen
      const numMatch = code.slice(i).match(/^\d+(\.\d+)?/);
      if (numMatch) {
        result += `<span class="tok-num">${numMatch[0]}</span>`;
        i += numMatch[0].length;
        continue;
      }

      // Woorden
      const wordMatch = code.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/);

      if (wordMatch) {
        const word = wordMatch[0];

        if (keywords.has(word)) {
          result += `<span class="tok-kw">${word}</span>`;
        }
        else if (/^[A-Z]/.test(word)) {
          result += `<span class="tok-type">${word}</span>`;
        }
        else {
          result += word;
        }

        i += word.length;
        continue;
      }

      result += code[i];
      i++;
    }

    return result;
  }
  function codeBlock(code) {
    const pre = el("pre");
    pre.innerHTML = `<button class="copy-btn">kopieer</button><code>${highlight(code)}</code>`;
    pre.querySelector(".copy-btn").onclick = () => {
      navigator.clipboard.writeText(code); pre.querySelector(".copy-btn").textContent = "✓";
      setTimeout(() => pre.querySelector(".copy-btn").textContent = "kopieer", 1200);
    };
    return pre;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(title, sub) {
    let t = $("#toast");
    if (!t) { t = el("div", "toast"); t.id = "toast"; document.body.appendChild(t); }
    t.innerHTML = `<div class="tt">${title}</div><div class="ts">${sub || ""}</div>`;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Theme ---------- */
  function initTheme() {
    const saved = localStorage.getItem("csharp_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved === "dark" ? "" : "light");
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute("data-theme");
    const next = cur === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next === "dark" ? "" : "light");
    localStorage.setItem("csharp_theme", next);
  }

  /* ---------- User chip ---------- */
  async function refreshUserChip() {
    const u = await Auth.userData();
    userCache = u;
    const chip = $("#userchip");
    if (!u) { chip.innerHTML = ""; return; }
    const p = Gamify.progress(u.xp || 0);
    chip.innerHTML = `
      <div class="row">
        <div class="av">${Auth.name()[0].toUpperCase()}</div>
        <div><div class="nm">${Auth.name()}</div><div class="lv">Level ${p.lvl} · 🔥 ${u.streak || 0}</div></div>
      </div>
      <div class="xpbar"><div style="width:${p.pct}%"></div></div>
      <div class="xpmeta"><span>${u.xp || 0} XP</span><span>${p.cur}/${p.need}</span></div>`;
    rebuildNav();
  }

  /* ---------- Navigation ---------- */
  function rebuildNav() {
    const nav = $("#nav"); if (!nav) return;
    nav.innerHTML = "";
    const completed = userCache ? userCache.completed : {};
    COURSE.forEach(mod => {
      const m = el("div", "nav-mod");
      m.appendChild(el("div", "mt", `${mod.icon} ${mod.title}`));
      mod.lessons.forEach(les => {
        const done = completed && completed[les.id];
        const item = el("div", "nav-item nav-sub" + (done ? " done" : ""));
        item.innerHTML = `<span class="dot"></span><span class="nm">${les.title}</span>`;
        item.onclick = () => { route(`lesson/${les.id}`); closeMobileNav(); };
        item.dataset.id = les.id;
        m.appendChild(item);
      });
      // hoofdstuktest
      const test = el("div", "nav-item nav-sub");
      test.innerHTML = `<span class="dot"></span><span class="nm">📝 ${EXAMS.chapterTests[mod.id].title}</span>`;
      test.onclick = () => { route(`test/${mod.id}`); closeMobileNav(); };
      m.appendChild(test);
      nav.appendChild(m);
    });
    // examens & extra
    const extra = el("div", "nav-mod");
    extra.appendChild(el("div", "mt", "🎓 Examens & meer"));
    [["Tussentijds Examen", "midterm/mid1"], ["Eindproject", "final"],
     ["🏆 Scorebord", "leaderboard"], ["🏅 Badges", "badges"], ["👤 Profiel", "profile"]
    ].forEach(([label, r]) => {
      const it = el("div", "nav-item nav-sub");
      it.innerHTML = `<span class="dot"></span><span class="nm">${label}</span>`;
      it.onclick = () => { route(r); closeMobileNav(); };
      extra.appendChild(it);
    });
    nav.appendChild(extra);
  }

  function closeMobileNav() { if (window.innerWidth <= 900) $("#sidebar").classList.remove("open"); }

  /* ---------- Lesson rendering ---------- */
  function findLesson(id) {
    for (const m of COURSE) { const l = m.lessons.find(x => x.id === id); if (l) return { mod: m, les: l }; }
    return null;
  }

  function renderLesson(id) {
    const found = findLesson(id); if (!found) return renderHome();
    const { mod, les } = found;
    const c = el("div", "content");
    c.appendChild(el("div", "crumb", `${mod.icon} ${mod.title}`));
    c.appendChild(el("div", "lesson-title", les.title));
    c.appendChild(el("div", "lesson-sub", les.sub));

    // 1. Theorie
    const sTh = el("div", "section");
    sTh.appendChild(el("div", "pill-row", '<span class="tag theory">1 · Theorie</span>'));
    const body = el("div", null, les.theory);
    sTh.appendChild(body);
    c.appendChild(sTh);

    // 2. Voorbeelden
    if (les.examples && les.examples.length) {
      const sEx = el("div", "section");
      sEx.appendChild(el("div", "pill-row", '<span class="tag code">2 · Voorbeelden</span>'));
      les.examples.forEach(ex => {
        sEx.appendChild(el("h3", null, ex.title));
        sEx.appendChild(codeBlock(ex.code));
      });
      c.appendChild(sEx);
    }

    // 3. Samenvatting
    const sSum = el("div", "section");
    sSum.appendChild(el("div", "pill-row", '<span class="tag">3 · Samenvatting</span>'));
    const ul = el("ul");
    les.summary.forEach(s => ul.appendChild(el("li", null, s)));
    sSum.appendChild(ul);
    c.appendChild(sSum);

    // 4. Quiz
    const sQ = el("div", "section");
    sQ.appendChild(el("div", "pill-row", '<span class="tag quiz">4 · Quiz</span>'));
    const quizWrap = el("div");
    sQ.appendChild(quizWrap);
    buildQuiz(quizWrap, les.quiz, les.id);
    c.appendChild(sQ);

    // 5. Oefeningen
    if (les.exercises && les.exercises.length) {
      const sExr = el("div", "section");
      sExr.appendChild(el("div", "pill-row", '<span class="tag ex">5 · Oefeningen</span>'));
      les.exercises.forEach((exr, i) => sExr.appendChild(buildExercise(exr, i)));
      c.appendChild(sExr);
    }

    // navigatie onderaan
    const navRow = el("div", "btn-row");
    const all = COURSE.flatMap(m => m.lessons);
    const idx = all.findIndex(l => l.id === id);
    if (idx > 0) { const b = el("button", "btn sec", "← Vorige"); b.onclick = () => route(`lesson/${all[idx - 1].id}`); navRow.appendChild(b); }
    if (idx < all.length - 1) { const b = el("button", "btn", "Volgende →"); b.onclick = () => route(`lesson/${all[idx + 1].id}`); navRow.appendChild(b); }
    c.appendChild(navRow);

    swap(c);
  }

  /* ---------- Quiz builder ---------- */
  function buildQuiz(wrap, questions, lessonId) {
    let answered = 0, correctCount = 0;
    const state = questions.map(() => null);
    questions.forEach((q, qi) => {
      const block = el("div", "quiz-q");
      block.appendChild(el("div", "qt", `${qi + 1}. ${q.q}`));
      const fb = el("div", "quiz-feedback");
      q.opts.forEach((opt, oi) => {
        const btn = el("button", "quiz-opt", opt);
        btn.onclick = () => {
          if (state[qi] !== null) return;
          state[qi] = oi;
          answered++;
          const ok = oi === q.correct;
          if (ok) correctCount++;
          [...block.querySelectorAll(".quiz-opt")].forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.correct) b.classList.add("correct");
            else if (bi === oi) b.classList.add("wrong");
          });
          fb.className = "quiz-feedback show " + (ok ? "ok" : "no");
          fb.textContent = (ok ? "✓ Juist! " : "✗ Fout. ") + (q.exp || "");
          if (answered === questions.length) finishQuiz();
        };
        block.appendChild(btn);
      });
      block.appendChild(fb);
      wrap.appendChild(block);
    });
    const result = el("div"); wrap.appendChild(result);
    function finishQuiz() {
      const pct = Math.round(correctCount / questions.length * 100);
      result.innerHTML = "";
      const pill = el("div", "result-pill " + (pct >= 60 ? "ok" : "no"),
        `${pct >= 60 ? "🎉" : "📚"} Score: ${correctCount}/${questions.length} (${pct}%)`);
      result.appendChild(pill);
      if (lessonId) Gamify.completeLesson(lessonId, pct);
    }
  }

  /* ---------- Exercise builder ---------- */
  function buildExercise(exr, i) {
    const block = el("div", "ex-block");
    if (exr.type === "fill") {
      block.appendChild(el("div", null, `<b>Oefening ${i + 1}.</b> ${exr.prompt}`));
      const parts = exr.template.split("___");
      const row = el("div", "mono"); row.style.margin = "10px 0";
      const inputs = [];
      parts.forEach((p, idx) => {
        row.appendChild(document.createTextNode(p));
        if (idx < parts.length - 1) {
          const inp = el("input", "fill"); inp.type = "text"; inputs.push(inp); row.appendChild(inp);
        }
      });
      block.appendChild(row);
      const fb = el("div", "quiz-feedback");
      const btn = el("button", "btn sec", "Controleer");
      btn.onclick = () => {
        let allOk = true;
        inputs.forEach((inp, ii) => {
          const ok = inp.value.trim().toLowerCase() === (exr.answers[ii] || "").toLowerCase();
          inp.classList.toggle("ok", ok); inp.classList.toggle("no", !ok);
          if (!ok) allOk = false;
        });
        fb.className = "quiz-feedback show " + (allOk ? "ok" : "no");
        fb.textContent = allOk ? "✓ Correct! +10 XP" : `✗ Probeer opnieuw. Hint: ${exr.hint}`;
        if (allOk) Gamify.award(10, "Oefening opgelost");
      };
      block.appendChild(el("div", "btn-row")).appendChild(btn);
      block.appendChild(fb);
    } else if (exr.type === "code") {
      block.appendChild(el("div", null, `<b>Oefening ${i + 1}.</b> ${exr.prompt}`));
      const ta = el("textarea", "code-input"); ta.value = exr.starter || ""; ta.spellcheck = false;
      block.appendChild(ta);
      const fb = el("div", "quiz-feedback");
      const row = el("div", "btn-row");
      const check = el("button", "btn", "Controleer");
      const showSol = el("button", "btn ghost", "Toon oplossing");
      check.onclick = () => {
        const v = ta.value.replace(/\s+/g, " ");
        const missing = (exr.check || []).filter(k => !v.toLowerCase().includes(k.toLowerCase().replace(/\s+/g, " ")));
        const ok = missing.length === 0;
        fb.className = "quiz-feedback show " + (ok ? "ok" : "no");
        fb.textContent = ok ? "✓ Ziet er goed uit! +15 XP" :
          `✗ Nog niet compleet. Mist o.a.: ${missing.slice(0, 2).join(", ")}`;
        if (ok) Gamify.award(15, "Code-oefening");
      };
      showSol.onclick = () => {
        const sol = block.querySelector(".sol");
        if (sol) { sol.remove(); return; }
        const s = codeBlock(exr.sample); s.classList.add("sol"); block.appendChild(s);
      };
      row.appendChild(check); row.appendChild(showSol);
      block.appendChild(row); block.appendChild(fb);
    }
    return block;
  }

  /* ---------- Exam / test rendering ---------- */
  function renderExam(test, examId, xp, isFinal) {
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", test.title));
    c.appendChild(el("div", "lesson-sub", `Slaag met minstens 60%. Beloning: ${xp} XP.`));
    const s = el("div", "section");
    const wrap = el("div"); s.appendChild(wrap);
    let answered = 0, correct = 0;
    const state = test.questions.map(() => null);
    test.questions.forEach((q, qi) => {
      const block = el("div", "quiz-q");
      block.appendChild(el("div", "qt", `${qi + 1}. ${q.q}`));
      q.opts.forEach((opt, oi) => {
        const btn = el("button", "quiz-opt", opt);
        btn.onclick = () => {
          if (state[qi] !== null) return;
          state[qi] = oi; answered++;
          if (oi === q.correct) correct++;
          [...block.querySelectorAll(".quiz-opt")].forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.correct) b.classList.add("correct");
            else if (bi === oi) b.classList.add("wrong");
          });
          if (answered === test.questions.length) done();
        };
        block.appendChild(btn);
      });
      wrap.appendChild(block);
    });
    const res = el("div"); s.appendChild(res);
    function done() {
      const pct = Math.round(correct / test.questions.length * 100);
      res.innerHTML = "";
      res.appendChild(el("div", "result-pill " + (pct >= 60 ? "ok" : "no"),
        `${pct >= 60 ? "🎓 Geslaagd!" : "📚 Niet geslaagd"} ${correct}/${test.questions.length} (${pct}%)`));
      Gamify.recordExam(examId, pct, xp);
    }
    c.appendChild(s);
    swap(c);
  }

  /* ---------- Final project ---------- */
  function renderFinal() {
    const fp = EXAMS.finalProject;
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", "🏆 " + fp.title));
    c.appendChild(el("div", "lesson-sub", fp.intro));
    fp.parts.forEach((p, i) => {
      const s = el("div", "section");
      s.appendChild(el("h2", null, `Deel ${i + 1} — ${p.title.replace(/^Deel \d+ — /, "")}`));
      s.appendChild(el("p", null, p.desc));
      c.appendChild(s);
    });
    const chk = el("div", "section");
    chk.appendChild(el("h2", null, "✅ Checklist"));
    fp.checklist.forEach((item, i) => {
      const row = el("div", "check-row");
      const cb = el("input"); cb.type = "checkbox"; cb.id = "fp" + i;
      const lab = el("label"); lab.htmlFor = "fp" + i; lab.textContent = item; lab.style.color = "var(--text)";
      row.appendChild(cb); row.appendChild(lab);
      chk.appendChild(row);
    });
    const btn = el("button", "btn", "Eindproject indienen (+500 XP)");
    btn.onclick = async () => {
      const all = [...chk.querySelectorAll('input[type=checkbox]')];
      if (!all.every(cb => cb.checked)) { toast("⚠️ Onvolledig", "Vink alle punten af."); return; }
      const db = await Store.load();
      const u = db.users[Auth.name()];
      if (!u.completed["final_project"]) {
        u.completed["final_project"] = { done: true, t: Date.now() };
        await Gamify.award(fp.xp, "Eindproject voltooid");
      } else toast("Al voltooid", "Je hebt dit al ingediend.");
      await Store.save();
    };
    chk.appendChild(el("div", "btn-row")).appendChild(btn);
    c.appendChild(chk);
    swap(c);
  }

  /* ---------- Leaderboard ---------- */
  async function renderLeaderboard() {
    const data = await Gamify.leaderboard();
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", "🏆 Scorebord"));
    c.appendChild(el("div", "lesson-sub", "Ranglijst op basis van XP. Scores zijn niet aanpasbaar."));
    const s = el("div", "section");
    const tbl = el("table", "lb-table");
    tbl.innerHTML = `<thead><tr><th>#</th><th>Gebruiker</th><th>XP</th><th>Level</th><th>🔥</th><th>Gem.</th><th>Lessen</th></tr></thead>`;
    const tb = el("tbody");
    data.forEach((u, i) => {
      const tr = el("tr", u.name === Auth.name() ? "me" : "");
      const rc = i === 0 ? "r1" : i === 1 ? "r2" : i === 2 ? "r3" : "";
      tr.innerHTML = `<td><div class="rank ${rc}">${i + 1}</div></td><td><b>${u.name}</b></td>
        <td>${u.xp}</td><td>${u.level}</td><td>${u.streak}</td><td>${u.avg}%</td><td>${u.lessons}</td>`;
      tb.appendChild(tr);
    });
    tbl.appendChild(tb); s.appendChild(tbl);
    if (!data.length) s.appendChild(el("p", "muted", "Nog geen gebruikers."));
    c.appendChild(s);
    swap(c);
  }

  /* ---------- Badges ---------- */
  function renderBadges() {
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", "🏅 Badges"));
    c.appendChild(el("div", "lesson-sub", "Verdien badges door lessen, examens en streaks."));
    const s = el("div", "section");
    const grid = el("div", "badge-grid");
    const earned = (userCache && userCache.badges) || [];
    BADGES.forEach(b => {
      const card = el("div", "badge-card" + (earned.includes(b.id) ? " earned" : ""));
      card.innerHTML = `<div class="ic">${b.icon}</div><div class="bn">${b.name}</div><div class="bd">${b.desc}</div>`;
      grid.appendChild(card);
    });
    s.appendChild(grid); c.appendChild(s);
    swap(c);
  }

  /* ---------- Profile ---------- */
  async function renderProfile() {
    const u = await Auth.userData();
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", "👤 " + Auth.name()));
    const p = Gamify.progress(u.xp || 0);
    const scores = u.quizScores || [];
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const totalLessons = COURSE.reduce((n, m) => n + m.lessons.length, 0);
    const doneLessons = Object.keys(u.completed || {}).filter(k => k.startsWith("m")).length;
    const stats = el("div", "stats");
    [["XP", u.xp || 0], ["Level", p.lvl], ["🔥 Streak", u.streak || 0], ["Gem. score", avg + "%"],
     ["Lessen", `${doneLessons}/${totalLessons}`], ["Badges", (u.badges || []).length]
    ].forEach(([l, v]) => {
      const st = el("div", "stat"); st.innerHTML = `<div class="v">${v}</div><div class="l">${l}</div>`; stats.appendChild(st);
    });
    c.appendChild(stats);
    const s = el("div", "section");
    s.appendChild(el("h2", null, "Voortgang"));
    s.appendChild(el("div", "xpbar", `<div style="width:${p.pct}%"></div>`));
    s.appendChild(el("div", "xpmeta", `<span>Level ${p.lvl}</span><span>${p.cur}/${p.need} XP tot level ${p.lvl + 1}</span>`));
    const btn = el("button", "btn ghost", "Uitloggen");
    btn.onclick = () => { Auth.logout(); location.hash = ""; location.reload(); };
    s.appendChild(el("div", "btn-row")).appendChild(btn);
    c.appendChild(s);
    swap(c);
  }

  /* ---------- Home ---------- */
  function renderHome() {
    const c = el("div", "content");
    c.appendChild(el("div", "lesson-title", `Welkom, ${Auth.name()}! 👋`));
    c.appendChild(el("div", "lesson-sub", "Een interactief leertraject voor C# Object-Georiënteerd Programmeren."));
    COURSE.forEach(mod => {
      const s = el("div", "section");
      s.appendChild(el("h2", null, `${mod.icon} ${mod.title}`));
      s.appendChild(el("p", "muted", mod.desc));
      const done = userCache ? mod.lessons.filter(l => userCache.completed[l.id]).length : 0;
      s.appendChild(el("div", "xpbar", `<div style="width:${Math.round(done / mod.lessons.length * 100)}%"></div>`));
      s.appendChild(el("div", "xpmeta", `<span>${done}/${mod.lessons.length} lessen</span><span></span>`));
      const b = el("button", "btn sec", "Start module"); b.style.marginTop = "12px";
      b.onclick = () => route(`lesson/${mod.lessons[0].id}`);
      s.appendChild(b);
      c.appendChild(s);
    });
    swap(c);
  }

  /* ---------- Admin (verborgen via #admin) ---------- */
  async function renderAdmin() {
    const c = el("div", "content");
    if (!sessionStorage.getItem("admin_ok")) {
      const pass = prompt("Adminwachtwoord:");
      if (pass !== CONFIG.ADMIN_SECRET) { toast("⛔ Geweigerd", "Verkeerd wachtwoord."); renderHome(); return; }
      sessionStorage.setItem("admin_ok", "1");
    }
    c.appendChild(el("div", "lesson-title", "🔐 Adminpaneel"));
    c.appendChild(el("div", "lesson-sub", "Beheer gebruikers, bekijk scores en logs."));
    const db = await Store.load();

    // Gebruikers
    const sU = el("div", "section");
    sU.appendChild(el("h2", null, "Gebruikers & scores"));
    const tbl = el("table", "lb-table");
    tbl.innerHTML = `<thead><tr><th>Gebruiker</th><th>XP</th><th>Lvl</th><th>🔥</th><th>Badges</th><th>Acties</th></tr></thead>`;
    const tb = el("tbody");
    Object.entries(db.users).forEach(([name, u]) => {
      const tr = el("tr");
      const td = el("td"); td.innerHTML = `<b>${name}</b>`;
      tr.appendChild(td);
      tr.appendChild(el("td", null, String(u.xp || 0)));
      tr.appendChild(el("td", null, String(u.level || 1)));
      tr.appendChild(el("td", null, String(u.streak || 0)));
      tr.appendChild(el("td", null, String((u.badges || []).length)));
      const act = el("td");
      const reset = el("button", "btn ghost", "Reset XP"); reset.style.fontSize = "11px"; reset.style.padding = "4px 8px";
      reset.onclick = async () => { u.xp = 0; u.level = 1; await Store.save(); Store.log(`ADMIN reset XP: ${name}`); renderAdmin(); };
      const del = el("button", "btn ghost", "Verwijder"); del.style.fontSize = "11px"; del.style.padding = "4px 8px"; del.style.marginLeft = "6px";
      del.onclick = async () => { if (confirm(`Verwijder ${name}?`)) { delete db.users[name]; await Store.save(); Store.log(`ADMIN delete: ${name}`); renderAdmin(); } };
      act.appendChild(reset); act.appendChild(del);
      tr.appendChild(act);
      tb.appendChild(tr);
    });
    tbl.appendChild(tb); sU.appendChild(tbl);
    c.appendChild(sU);

    // Logs
    const sL = el("div", "section");
    sL.appendChild(el("h2", null, "Logs (laatste 50)"));
    const logs = JSON.parse(localStorage.getItem("csharp_logs") || "[]").slice(-50).reverse();
    const pre = el("pre");
    pre.textContent = logs.map(l => `${l.t.slice(0, 19)}  ${l.msg}`).join("\n") || "Geen logs.";
    sL.appendChild(pre);
    c.appendChild(sL);

    swap(c);
  }

  /* ---------- Router ---------- */
  function route(r) { location.hash = r; handleRoute(); }
  function handleRoute() {
    const h = location.hash.replace(/^#\/?/, "") || "home";
    setActive(h);
    if (h === "admin") return renderAdmin();
    if (!Auth.name()) return; // auth modal handelt dit af
    if (h === "home") return renderHome();
    if (h.startsWith("lesson/")) return renderLesson(h.split("/")[1]);
    if (h.startsWith("test/")) { const mid = h.split("/")[1]; return renderExam(EXAMS.chapterTests[mid], "test_" + mid, EXAMS.chapterTests[mid].xp); }
    if (h.startsWith("midterm/")) { const id = h.split("/")[1]; return renderExam(EXAMS.midterms[id], id, EXAMS.midterms[id].xp); }
    if (h === "final") return renderFinal();
    if (h === "leaderboard") return renderLeaderboard();
    if (h === "badges") return renderBadges();
    if (h === "profile") return renderProfile();
    renderHome();
  }
  function setActive(h) {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    const id = h.startsWith("lesson/") ? h.split("/")[1] : null;
    if (id) { const it = document.querySelector(`.nav-item[data-id="${id}"]`); if (it) it.classList.add("active"); }
  }

  function swap(node) { const m = $("#view"); m.innerHTML = ""; m.appendChild(node); window.scrollTo(0, 0); }

  return { toast, refreshUserChip, rebuildNav, route, handleRoute, initTheme, toggleTheme,
    setUserCache: u => userCache = u };
})();
