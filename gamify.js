/* ============================================================
   GAMIFICATION — XP, levels, badges, streaks
   XP en streaks worden server-side berekend o.b.v. acties;
   gebruikers kunnen ze niet rechtstreeks aanpassen.
   ============================================================ */
const Gamify = (() => {

  function levelFor(xp) { return Math.floor(Math.sqrt(xp / 50)) + 1; }
  function xpForLevel(lvl) { return Math.pow(lvl - 1, 2) * 50; }
  function progress(xp) {
    const lvl = levelFor(xp);
    const cur = xpForLevel(lvl), next = xpForLevel(lvl + 1);
    return { lvl, pct: Math.min(100, Math.round((xp - cur) / (next - cur) * 100)), cur: xp - cur, need: next - cur };
  }

  function touchStreak(u) {
    const today = new Date().toISOString().slice(0, 10);
    if (u.lastActive === today) return;
    const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    u.streak = (u.lastActive === yest) ? (u.streak || 0) + 1 : 1;
    u.lastActive = today;
  }

  async function award(xp, reason) {
    const db = await Store.load();
    const u = db.users[Auth.name()];
    if (!u) return;
    touchStreak(u);
    u.xp = (u.xp || 0) + xp;
    u.level = levelFor(u.xp);
    Store.log(`+${xp} XP (${reason}) → ${Auth.name()}`);
    checkBadges(u);
    await Store.save();
    UI.toast(`+${xp} XP`, reason);
    UI.refreshUserChip();
    return u;
  }

  async function completeLesson(lessonId, quizPct) {
    const db = await Store.load();
    const u = db.users[Auth.name()];
    if (!u) return;
    const first = !u.completed[lessonId];
    u.completed[lessonId] = { done: true, quiz: quizPct, t: Date.now() };
    if (typeof quizPct === "number") u.quizScores.push(quizPct);
    if (first) { await award(50, "Les voltooid"); }
    if (quizPct === 100) await award(25, "Perfecte quiz");
    checkBadges(u);
    await Store.save();
    return u;
  }

  function checkBadges(u) {
    const has = id => u.badges.includes(id);
    const give = id => { if (!has(id)) { u.badges.push(id); UI.toast("🏅 Badge!", BADGE_NAME(id)); } };
    if (Object.keys(u.completed).length >= 1) give("first_lesson");
    if (moduleDone(u, "m1")) give("m1_done");
    if (moduleDone(u, "m2")) give("m2_done");
    if (moduleDone(u, "m3")) give("m3_done");
    if (u.quizScores.some(s => s === 100)) give("quiz_ace");
    if ((u.streak || 0) >= 3) give("streak3");
    if ((u.streak || 0) >= 7) give("streak7");
    if (u.examsPassed && u.examsPassed.length) give("exam_pass");
    if (u.level >= 5) give("level5");
    if (u.completed["final_project"]) give("final_done");
  }

  function moduleDone(u, mid) {
    const mod = COURSE.find(m => m.id === mid);
    if (!mod) return false;
    return mod.lessons.every(l => u.completed[l.id]);
  }

  function BADGE_NAME(id) { const b = BADGES.find(x => x.id === id); return b ? b.name : id; }

  async function leaderboard() {
    const db = await Store.load();
    return Object.entries(db.users).map(([name, u]) => {
      const scores = u.quizScores || [];
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      return { name, xp: u.xp || 0, level: u.level || 1, streak: u.streak || 0,
        avg, lessons: Object.keys(u.completed || {}).length };
    }).sort((a, b) => b.xp - a.xp);
  }

  async function recordExam(examId, pct, xp) {
    const db = await Store.load();
    const u = db.users[Auth.name()];
    if (!u) return;
    u.examsPassed = u.examsPassed || [];
    if (pct >= 60 && !u.examsPassed.includes(examId)) {
      u.examsPassed.push(examId);
      await award(xp, "Examen geslaagd");
    }
    u.quizScores.push(pct);
    checkBadges(u);
    await Store.save();
  }

  return { levelFor, progress, award, completeLesson, touchStreak, leaderboard, recordExam, moduleDone };
})();