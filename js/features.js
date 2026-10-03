/* =========================================================
   QuietHours · Feature add-ons
   - GitHub-style focus heatmap
   - XP / levels / ranks (Iron → Challenger) + achievement badges
   - Exam mode: countdowns, goals, manager dialog
   - Ambient mixer presets + sleep timer
   - Time-of-day sky background
   Talks to app.js only through window.QH and qh:* DOM events.
   ========================================================= */
(function () {
  "use strict";
  const QH = window.QH;
  if (!QH) return;

  // -------- i18n ----------------------------------------------------------
  const DICT = {
    vi: {
      heat: {
        title: "Bản đồ chăm chỉ", kicker: "12 tháng qua", less: "Ít", more: "Nhiều",
        summary: "{hours} trong 12 tháng · {days} ngày có học · chuỗi dài nhất {streak} ngày",
        cell: "{date}: {mins}", none: "chưa học",
        dow: ["T2", "", "T4", "", "T6", "", ""],
        months: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"]
      },
      xp: {
        level: "Cấp {n}", total: "Tổng {xp} XP", toNext: "{cur} / {need} XP", max: "Hạng cao nhất!",
        kicker: "Thành tích", title: "Cấp độ & Huy hiệu",
        rule: "XP = 1 XP mỗi phút tập trung + 5 XP mỗi phiên + 10 XP mỗi ngày có học.",
        ladder: "Bậc xếp hạng", badges: "Huy hiệu", unlocked: "{n}/{total} đã mở khóa",
        fromLevel: "Từ cấp {n}",
        levelUp: "⬆️ Lên cấp {n} — {rank}!", rankUp: "🏆 Thăng hạng: {rank}!",
        badgeUnlocked: "🏅 Mở khóa huy hiệu: {name}", badgesUnlocked: "🏅 Mở khóa {n} huy hiệu mới!",
        viewAll: "Xem thành tích"
      },
      ranks: ["Sắt", "Đồng", "Bạc", "Vàng", "Bạch Kim", "Lục Bảo", "Kim Cương", "Cao Thủ", "Thách Đấu"],
      badges: {
        first: ["Bước đầu tiên", "Hoàn thành phiên tập trung đầu tiên"],
        streak3: ["Khởi động", "Chuỗi 3 ngày liên tiếp"],
        streak7: ["Một tuần bền bỉ", "Chuỗi 7 ngày liên tiếp"],
        streak14: ["Nửa tháng thép", "Chuỗi 14 ngày liên tiếp"],
        streak30: ["Thói quen vàng", "Chuỗi 30 ngày liên tiếp"],
        streak100: ["Huyền thoại", "Chuỗi 100 ngày liên tiếp"],
        hours10: ["10 giờ đầu tiên", "Tổng 10 giờ tập trung"],
        hours50: ["Người kiên trì", "Tổng 50 giờ tập trung"],
        hours100: ["Trăm giờ", "Tổng 100 giờ tập trung"],
        hours500: ["Bậc thầy thời gian", "Tổng 500 giờ tập trung"],
        sessions50: ["50 Pomodoro", "Hoàn thành 50 phiên"],
        sessions200: ["Cỗ máy Pomodoro", "Hoàn thành 200 phiên"],
        marathon: ["Marathon", "4 giờ tập trung trong một ngày"],
        week20: ["Tuần bùng nổ", "20 giờ trong một tuần"],
        nightOwl: ["Cú đêm", "Hoàn thành phiên sau 22:00"],
        earlyBird: ["Chim sớm", "Hoàn thành phiên trước 7:00"],
        polymath: ["Đa năng", "Học 5 môn khác nhau"]
      },
      exam: {
        kicker: "Chế độ thi", manage: "Quản lý", add: "Thêm kỳ thi", edit: "Sửa", del: "Xóa",
        days: "ngày", today: "Hôm nay thi!", goal: "Mục tiêu", score: "Điểm mục tiêu",
        progress: "{done} / {goal} giờ ôn", perDay: "Cần ~{need}/ngày để đạt mục tiêu",
        goalDone: "Đã đạt mục tiêu ôn tập 🎉", todayStudy: "Hôm nay: {done} / {need}",
        others: "Kỳ thi khác", allSubjects: "Tất cả môn",
        ctaTitle: "Sắp có kỳ thi?", ctaText: "Bật chế độ thi để đếm ngược ngay trên màn hình chính và đặt mục tiêu ôn tập.",
        dialogTitle: "Kỳ thi & mục tiêu", dialogDesc: "Thêm lịch thi để đếm ngược, đặt số giờ ôn và điểm mục tiêu. Giờ ôn được tính từ các phiên Pomodoro của môn đó kể từ ngày tạo kỳ thi.",
        name: "Tên kỳ thi", namePh: "Ví dụ: Thi cuối kỳ Giải tích", date: "Ngày thi", time: "Giờ thi",
        subject: "Môn học", goalHours: "Mục tiêu giờ ôn", targetScore: "Điểm mục tiêu", scorePh: "VD: 8.5 hoặc IELTS 7.0",
        note: "Ghi chú", notePh: "Phòng thi, tài liệu cần mang...", save: "Lưu kỳ thi", update: "Cập nhật", cancel: "Hủy", close: "Đóng",
        empty: "Chưa có kỳ thi nào.", past: "Đã thi", confirmDel: "Xóa kỳ thi \"{name}\"?",
        needName: "Hãy nhập tên kỳ thi.", needDate: "Hãy chọn ngày thi.", hours: "giờ", hidden: "Ẩn"
      },
      mix: {
        presets: "Preset", save: "Lưu mix", namePh: "Tên preset...", saved: "Đã lưu preset",
        sleep: "Hẹn giờ tắt", off: "Tắt", endSession: "Hết phiên", min: "p",
        sleepIn: "Tắt sau {t}", sleepAtEnd: "Tắt khi hết phiên", sleeping: "Đã tắt nhạc nền 🌙",
        nothingOn: "Hãy bật ít nhất một âm thanh trước khi lưu.",
        builtin: { rainNight: "Mưa đêm", cafe: "Quán quen", beach: "Bờ biển", cabin: "Lò sưởi", lofi: "Lofi chill", forest: "Rừng sâu", deep: "Tập trung sâu" }
      }
    },
    en: {
      heat: {
        title: "Focus heatmap", kicker: "Past 12 months", less: "Less", more: "More",
        summary: "{hours} in 12 months · {days} active days · longest streak {streak} days",
        cell: "{date}: {mins}", none: "no focus",
        dow: ["Mon", "", "Wed", "", "Fri", "", ""],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      xp: {
        level: "Level {n}", total: "{xp} XP total", toNext: "{cur} / {need} XP", max: "Top rank!",
        kicker: "Achievements", title: "Level & Badges",
        rule: "XP = 1 XP per focus minute + 5 XP per session + 10 XP per active day.",
        ladder: "Rank ladder", badges: "Badges", unlocked: "{n}/{total} unlocked",
        fromLevel: "From level {n}",
        levelUp: "⬆️ Level {n} — {rank}!", rankUp: "🏆 Ranked up: {rank}!",
        badgeUnlocked: "🏅 Badge unlocked: {name}", badgesUnlocked: "🏅 {n} new badges unlocked!",
        viewAll: "View achievements"
      },
      ranks: ["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "Challenger"],
      badges: {
        first: ["First step", "Complete your first focus session"],
        streak3: ["Warming up", "3-day streak"],
        streak7: ["One solid week", "7-day streak"],
        streak14: ["Iron fortnight", "14-day streak"],
        streak30: ["Golden habit", "30-day streak"],
        streak100: ["Legend", "100-day streak"],
        hours10: ["First 10 hours", "10 total focus hours"],
        hours50: ["Persistent", "50 total focus hours"],
        hours100: ["Centurion", "100 total focus hours"],
        hours500: ["Time master", "500 total focus hours"],
        sessions50: ["50 Pomodoros", "Complete 50 sessions"],
        sessions200: ["Pomodoro machine", "Complete 200 sessions"],
        marathon: ["Marathon", "4 focus hours in one day"],
        week20: ["Power week", "20 hours in one week"],
        nightOwl: ["Night owl", "Finish a session after 22:00"],
        earlyBird: ["Early bird", "Finish a session before 7:00"],
        polymath: ["Polymath", "Study 5 different subjects"]
      },
      exam: {
        kicker: "Exam mode", manage: "Manage", add: "Add exam", edit: "Edit", del: "Delete",
        days: "days", today: "Exam day!", goal: "Goal", score: "Target score",
        progress: "{done} / {goal} h studied", perDay: "Need ~{need}/day to hit your goal",
        goalDone: "Study goal reached 🎉", todayStudy: "Today: {done} / {need}",
        others: "Other exams", allSubjects: "All subjects",
        ctaTitle: "Exam coming up?", ctaText: "Turn on exam mode for a live countdown on your home screen and a study-hours goal.",
        dialogTitle: "Exams & goals", dialogDesc: "Add exams for a countdown, set study hours and a target score. Study hours count Pomodoro sessions for that subject since the exam was created.",
        name: "Exam name", namePh: "e.g. Calculus final", date: "Exam date", time: "Time",
        subject: "Subject", goalHours: "Study-hours goal", targetScore: "Target score", scorePh: "e.g. 8.5 or IELTS 7.0",
        note: "Note", notePh: "Room, things to bring...", save: "Save exam", update: "Update", cancel: "Cancel", close: "Close",
        empty: "No exams yet.", past: "Done", confirmDel: "Delete exam \"{name}\"?",
        needName: "Please enter an exam name.", needDate: "Please pick an exam date.", hours: "h", hidden: "Hide"
      },
      mix: {
        presets: "Presets", save: "Save mix", namePh: "Preset name...", saved: "Preset saved",
        sleep: "Sleep timer", off: "Off", endSession: "End of session", min: "m",
        sleepIn: "Stops in {t}", sleepAtEnd: "Stops when session ends", sleeping: "Ambient sound stopped 🌙",
        nothingOn: "Turn on at least one sound before saving.",
        builtin: { rainNight: "Rainy night", cafe: "Cozy café", beach: "Beach", cabin: "Fireside", lofi: "Lofi chill", forest: "Deep forest", deep: "Deep focus" }
      }
    }
  };
  function ft(path, vars) {
    let cur = DICT[QH.lang] || DICT.vi;
    for (const p of path.split(".")) { if (cur == null) break; cur = cur[p]; }
    if (cur == null) return path;
    return vars && typeof cur === "string" ? QH.formatTpl(cur, vars) : cur;
  }
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toast = (m) => { if (typeof window.toast === "function") window.toast(m); };
  const celebrate = () => { try { window.QuietFX && window.QuietFX.confetti && window.QuietFX.confetti(); } catch (_) {} };
  const lsGet = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };
  const iso = (d) => QH.todayISO(d);
  const parseDay = (s) => new Date(s + "T00:00:00");
  function mondayOf(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }

  // ======================================================================
  //  STATS shared by heatmap + gamification
  // ======================================================================
  function computeStats() {
    const logs = QH.state.logs || [];
    const byDate = new Map();
    const byWeek = new Map();
    const subjects = new Set();
    let totalMin = 0, nightOwl = 0, earlyBird = 0;
    logs.forEach((l) => {
      const m = Number(l.minutes) || 0;
      totalMin += m;
      byDate.set(l.date, (byDate.get(l.date) || 0) + m);
      const wk = iso(mondayOf(parseDay(l.date)));
      byWeek.set(wk, (byWeek.get(wk) || 0) + m);
      if (l.subjectId) subjects.add(l.subjectId);
      if (l.completedAt) {
        const h = new Date(l.completedAt).getHours();
        if (h >= 22 || h < 4) nightOwl++;
        if (h >= 4 && h < 7) earlyBird++;
      }
    });
    // Longest run of consecutive active days
    const days = [...byDate.keys()].filter((d) => byDate.get(d) > 0).sort();
    let longest = 0, run = 0, prev = null;
    days.forEach((d) => {
      run = prev && (parseDay(d) - parseDay(prev)) / 86400000 === 1 ? run + 1 : 1;
      if (run > longest) longest = run;
      prev = d;
    });
    return {
      totalMin, sessions: logs.length, activeDays: days.length, byDate, longest,
      current: QH.computeStreak(logs),
      maxDay: Math.max(0, ...byDate.values()),
      maxWeek: Math.max(0, ...byWeek.values()),
      subjects: subjects.size, nightOwl, earlyBird
    };
  }

  // ======================================================================
  //  HEATMAP
  // ======================================================================
  function heatLevel(m) { return m <= 0 ? 0 : m < 30 ? 1 : m < 60 ? 2 : m < 120 ? 3 : 4; }
  function renderHeatmap(stats) {
    const host = $("qh-heatmap");
    if (!host) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = mondayOf(QH.addDays(today, -7 * 52));
    let cells = "", months = "", lastMonth = -1, col = 0, yearMin = 0, yearDays = 0;
    for (let d = new Date(start); d <= today || d.getDay() !== 1; d = QH.addDays(d, 1)) {
      const dow = (d.getDay() + 6) % 7;
      if (dow === 0) {
        if (d.getMonth() !== lastMonth && d.getDate() <= 7) {
          months += `<span style="grid-column:${col + 1}">${ft("heat.months")[d.getMonth()]}</span>`;
          lastMonth = d.getMonth();
        }
        col++;
      }
      if (d > today) { cells += `<i class="hm-cell hm-future"></i>`; continue; }
      const key = iso(d);
      const m = stats.byDate.get(key) || 0;
      if (m > 0) { yearMin += m; yearDays++; }
      const label = ft("heat.cell", { date: d.toLocaleDateString(QH.lang === "vi" ? "vi-VN" : "en-US", { day: "numeric", month: "short", year: "numeric" }), mins: m ? QH.minutesToLabel(m) : ft("heat.none") });
      cells += `<i class="hm-cell hm-l${heatLevel(m)}${key === iso(today) ? " hm-today" : ""}" data-tip="${esc(label)}"></i>`;
    }
    const dow = ft("heat.dow").map((s) => `<span>${s}</span>`).join("");
    host.innerHTML = `
      <div class="chart-card hm-card">
        <div class="hm-head">
          <div>
            <p class="section-kicker">${ft("heat.kicker")}</p>
            <h3 class="card-title">${ft("heat.title")}</h3>
          </div>
          <p class="hm-summary">${esc(ft("heat.summary", { hours: QH.minutesToLabel(yearMin), days: yearDays, streak: stats.longest }))}</p>
        </div>
        <div class="hm-scroll">
          <div class="hm-wrap" style="--cols:${col}">
            <div class="hm-months">${months}</div>
            <div class="hm-dow">${dow}</div>
            <div class="hm-grid">${cells}</div>
          </div>
        </div>
        <div class="hm-legend"><span>${ft("heat.less")}</span>${[0, 1, 2, 3, 4].map((l) => `<i class="hm-cell hm-l${l}"></i>`).join("")}<span>${ft("heat.more")}</span></div>
      </div>`;
    fitHeatmap();
  }
  // Size cells to fill the card (10–16px), scroll to the newest week on narrow screens
  function fitHeatmap() {
    const sc = document.querySelector("#qh-heatmap .hm-scroll");
    const wrap = sc && sc.querySelector(".hm-wrap");
    if (!wrap || !sc.clientWidth) return;
    const cols = Number(wrap.style.getPropertyValue("--cols")) || 53;
    const cell = Math.max(10, Math.min(16, Math.floor((sc.clientWidth - 34) / cols) - 3));
    wrap.style.setProperty("--cell", cell + "px");
    sc.scrollLeft = sc.scrollWidth;
  }
  // One floating tooltip for all heatmap cells
  function initHeatTooltip() {
    const tip = document.createElement("div");
    tip.className = "hm-tooltip";
    document.body.appendChild(tip);
    document.addEventListener("pointerover", (e) => {
      const c = e.target.closest && e.target.closest(".hm-cell[data-tip]");
      if (!c) { tip.classList.remove("show"); return; }
      tip.textContent = c.dataset.tip;
      const r = c.getBoundingClientRect();
      tip.style.left = r.left + r.width / 2 + "px";
      tip.style.top = r.top - 8 + "px";
      tip.classList.add("show");
    });
    const hide = () => tip.classList.remove("show");
    document.addEventListener("scroll", hide, true);
    document.addEventListener("click", hide);
    document.addEventListener("qh:change", hide);
    // The heatmap is hidden while another view is active -> size it when Insights opens or the window resizes
    let rz = 0;
    window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(fitHeatmap, 150); });
    document.addEventListener("click", (e) => {
      if (e.target.closest && e.target.closest('[data-view="insights"]')) { hide(); setTimeout(fitHeatmap, 30); }
    });
  }

  // ======================================================================
  //  GAMIFICATION: XP, levels, ranks, badges
  // ======================================================================
  const RANK_STYLE = [
    { key: "iron", c1: "#a3a3a3", c2: "#3f3f46" },
    { key: "bronze", c1: "#e0a06a", c2: "#7a4521" },
    { key: "silver", c1: "#eef2f6", c2: "#7d8a99" },
    { key: "gold", c1: "#ffe08a", c2: "#b8860b" },
    { key: "platinum", c1: "#b5f5ea", c2: "#2f8f86" },
    { key: "emerald", c1: "#86efac", c2: "#0f7a47" },
    { key: "diamond", c1: "#bfe3ff", c2: "#4a62f0" },
    { key: "master", c1: "#ebb8ff", c2: "#7b2fbf" },
    { key: "challenger", c1: "#fff3b0", c2: "#e0572a" }
  ];
  const DIVS = ["IV", "III", "II", "I"];
  const LEVELS_PER_TIER = 4;
  const levelCost = (L) => 100 + 50 * (L - 1);          // XP needed to go from L to L+1
  function xpOf(stats) { return Math.round(stats.totalMin + 5 * stats.sessions + 10 * stats.activeDays); }
  function levelInfo(xp) {
    let L = 1, floor = 0;
    while (xp >= floor + levelCost(L)) { floor += levelCost(L); L++; }
    const tier = Math.min(RANK_STYLE.length - 1, Math.floor((L - 1) / LEVELS_PER_TIER));
    const isTop = tier === RANK_STYLE.length - 1;
    const div = isTop ? "" : DIVS[(L - 1) % LEVELS_PER_TIER];
    return { level: L, tier, div, cur: xp - floor, need: levelCost(L), xp, isTop };
  }
  function rankName(info) { return ft("ranks")[info.tier] + (info.div ? " " + info.div : ""); }
  function firstLevelOfTier(tier) { return tier * LEVELS_PER_TIER + 1; }

  let emblemSeq = 0;
  function emblemSVG(tier, size = 56, label = "") {
    const s = RANK_STYLE[tier], id = "rk" + ++emblemSeq;
    const wings = tier >= 6 ? `<path d="M6 30 L1 22 L8 24 Z M58 30 L63 22 L56 24 Z" fill="url(#${id})" opacity=".85"/>` : "";
    const crown = tier >= 3 ? `<path d="M22 9 L26 3 L32 8 L38 3 L42 9 Z" fill="url(#${id})" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>` : "";
    const gem = tier >= 4 ? `<path d="M32 22 L38 30 L32 40 L26 30 Z" fill="rgba(255,255,255,.55)"/>` : `<circle cx="32" cy="31" r="5" fill="rgba(255,255,255,.35)"/>`;
    return `<svg class="rank-emblem" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.c1}"/><stop offset="1" stop-color="${s.c2}"/></linearGradient></defs>
      ${wings}${crown}
      <path d="M32 7 L53 15 L53 33 C53 46 43 54 32 59 C21 54 11 46 11 33 L11 15 Z" fill="url(#${id})" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
      <path d="M32 13 L47 19 L47 33 C47 42 40 48 32 52 C24 48 17 42 17 33 L17 19 Z" fill="rgba(0,0,0,.18)"/>
      ${gem}
      ${label ? `<text x="32" y="50" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="Figtree, sans-serif">${label}</text>` : ""}
    </svg>`;
  }

  const BADGES = [
    { id: "first", icon: "🌱", val: (s) => s.sessions, goal: 1 },
    { id: "streak3", icon: "🔥", val: (s) => s.longest, goal: 3 },
    { id: "streak7", icon: "🔥", val: (s) => s.longest, goal: 7 },
    { id: "streak14", icon: "⚡", val: (s) => s.longest, goal: 14 },
    { id: "streak30", icon: "🌟", val: (s) => s.longest, goal: 30 },
    { id: "streak100", icon: "👑", val: (s) => s.longest, goal: 100 },
    { id: "hours10", icon: "⏱️", val: (s) => s.totalMin / 60, goal: 10 },
    { id: "hours50", icon: "📚", val: (s) => s.totalMin / 60, goal: 50 },
    { id: "hours100", icon: "💯", val: (s) => s.totalMin / 60, goal: 100 },
    { id: "hours500", icon: "🧠", val: (s) => s.totalMin / 60, goal: 500 },
    { id: "sessions50", icon: "🍅", val: (s) => s.sessions, goal: 50 },
    { id: "sessions200", icon: "🤖", val: (s) => s.sessions, goal: 200 },
    { id: "marathon", icon: "🏃", val: (s) => s.maxDay / 60, goal: 4 },
    { id: "week20", icon: "🚀", val: (s) => s.maxWeek / 60, goal: 20 },
    { id: "nightOwl", icon: "🦉", val: (s) => s.nightOwl, goal: 1 },
    { id: "earlyBird", icon: "🐦", val: (s) => s.earlyBird, goal: 1 },
    { id: "polymath", icon: "🎓", val: (s) => s.subjects, goal: 5 }
  ];
  const unlockedIds = (stats) => BADGES.filter((b) => b.val(stats) >= b.goal).map((b) => b.id);

  function renderXPCard(info) {
    const pct = info.isTop && info.cur >= info.need ? 100 : Math.min(100, (info.cur / info.need) * 100);
    const s = RANK_STYLE[info.tier];
    return `
      <button type="button" class="xp-card" id="xp-card" style="--rk1:${s.c1};--rk2:${s.c2}" title="${esc(ft("xp.viewAll"))}">
        <div class="xp-emblem">${emblemSVG(info.tier, 58, info.div)}</div>
        <div class="xp-body">
          <div class="xp-top">
            <span class="xp-rank">${esc(rankName(info))}</span>
            <span class="xp-level">${ft("xp.level", { n: info.level })}</span>
          </div>
          <div class="xp-bar"><span style="width:${pct}%"></span></div>
          <div class="xp-meta">
            <span>${ft("xp.toNext", { cur: info.cur.toLocaleString(), need: info.need.toLocaleString() })}</span>
            <span>${ft("xp.total", { xp: info.xp.toLocaleString() })}</span>
          </div>
        </div>
      </button>`;
  }

  function renderAchievements(stats, info) {
    const host = $("qh-achievements");
    if (!host) return;
    const ladder = RANK_STYLE.map((_, i) => `
      <div class="rk-step${i < info.tier ? " done" : i === info.tier ? " current" : ""}">
        ${emblemSVG(i, 40)}
        <span class="rk-name">${esc(ft("ranks")[i])}</span>
        <span class="rk-lvl">${ft("xp.fromLevel", { n: firstLevelOfTier(i) })}</span>
      </div>`).join("");
    const unlocked = new Set(unlockedIds(stats));
    const badges = BADGES.map((b) => {
      const [name, desc] = ft("badges." + b.id);
      const v = b.val(stats), done = unlocked.has(b.id);
      const pct = Math.min(100, (v / b.goal) * 100);
      const prog = b.goal > 1 ? `${Math.min(b.goal, Math.floor(v * 10) / 10)}/${b.goal}` : "";
      return `<div class="badge-tile${done ? " unlocked" : ""}" title="${esc(desc)}">
        <div class="badge-ic">${b.icon}</div>
        <p class="badge-name">${esc(name)}</p>
        <p class="badge-desc">${esc(desc)}</p>
        ${done ? "" : `<div class="badge-prog"><span style="width:${pct}%"></span></div><p class="badge-num">${prog}</p>`}
      </div>`;
    }).join("");
    host.innerHTML = `
      <div class="chart-card ach-card" id="ach-card">
        <div class="hm-head">
          <div>
            <p class="section-kicker">${ft("xp.kicker")}</p>
            <h3 class="card-title">${ft("xp.title")}</h3>
          </div>
          <p class="hm-summary">${ft("xp.rule")}</p>
        </div>
        <div class="ach-hero">${renderXPCard(info)}</div>
        <p class="ach-sub">${ft("xp.ladder")}</p>
        <div class="rk-ladder">${ladder}</div>
        <p class="ach-sub">${ft("xp.badges")} · <span class="muted">${ft("xp.unlocked", { n: unlocked.size, total: BADGES.length })}</span></p>
        <div class="badge-grid">${badges}</div>
      </div>`;
  }

  // Celebrate new level / rank / badges (only for changes after the first run)
  function checkProgress(stats, info) {
    const BKEY = "quiethours-static-badges", LKEY = "quiethours-static-level";
    const now = unlockedIds(stats);
    const seenRaw = lsGet(BKEY), lvlRaw = lsGet(LKEY);
    if (seenRaw == null || lvlRaw == null) { // first run: record silently
      lsSet(BKEY, JSON.stringify(now)); lsSet(LKEY, String(info.level));
      return;
    }
    let seen = [];
    try { seen = JSON.parse(seenRaw) || []; } catch (_) {}
    const fresh = now.filter((id) => !seen.includes(id));
    const prevLevel = Number(lvlRaw) || 1;
    const msgs = [];
    if (info.level > prevLevel) {
      const prevTier = Math.min(RANK_STYLE.length - 1, Math.floor((prevLevel - 1) / LEVELS_PER_TIER));
      msgs.push(info.tier > prevTier ? ft("xp.rankUp", { rank: rankName(info) }) : ft("xp.levelUp", { n: info.level, rank: rankName(info) }));
    }
    if (fresh.length === 1) msgs.push(ft("xp.badgeUnlocked", { name: ft("badges." + fresh[0])[0] }));
    else if (fresh.length > 1) msgs.push(ft("xp.badgesUnlocked", { n: fresh.length }));
    // Keep the stored values in sync both ways (e.g. after deleting logs / reset)
    lsSet(BKEY, JSON.stringify(now));
    lsSet(LKEY, String(info.level));
    if (msgs.length) {
      celebrate();
      msgs.forEach((m, i) => setTimeout(() => toast(m), i * 3800));
    }
  }

  // ======================================================================
  //  EXAM MODE
  // ======================================================================
  const CTA_KEY = "quiethours-static-exam-cta-hidden";
  function examTime(e) {
    const d = parseDay(e.date);
    const [hh, mm] = String(e.time || "07:30").split(":").map(Number);
    d.setHours(hh || 0, mm || 0, 0, 0);
    return d.getTime();
  }
  function upcomingExams() {
    const now = Date.now();
    return (QH.state.exams || []).filter((e) => examTime(e) > now).sort((a, b) => examTime(a) - examTime(b));
  }
  function studiedMinutesFor(exam, onlyDate) {
    const from = exam.createdAt || "0000-00-00";
    return (QH.state.logs || [])
      .filter((l) => (!exam.subjectId || l.subjectId === exam.subjectId) && l.date >= from && l.date <= exam.date && (!onlyDate || l.date === onlyDate))
      .reduce((s, l) => s + (Number(l.minutes) || 0), 0);
  }
  function daysUntil(exam) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return Math.round((parseDay(exam.date) - today) / 86400000);
  }
  function fmtCountdown(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const p = (n) => String(n).padStart(2, "0");
    return { d, hms: `${p(h)}:${p(m)}:${p(sec)}` };
  }
  function fmtDate(e) {
    return new Date(examTime(e)).toLocaleString(QH.lang === "vi" ? "vi-VN" : "en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  function renderExamCard() {
    const list = upcomingExams();
    if (!list.length) {
      if (lsGet(CTA_KEY) === "1") return "";
      return `
        <div class="exam-cta">
          <div class="exam-cta-ic">🎯</div>
          <div class="exam-cta-body">
            <p class="exam-cta-title">${ft("exam.ctaTitle")}</p>
            <p class="exam-cta-text">${ft("exam.ctaText")}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" data-exam-action="add">${ft("exam.add")}</button>
          <button type="button" class="btn btn-ghost btn-icon-sm" data-exam-action="hide-cta" aria-label="${ft("exam.hidden")}" title="${ft("exam.hidden")}">×</button>
        </div>`;
    }
    const e = list[0];
    const days = daysUntil(e);
    const urgency = days <= 3 ? "urgent" : days <= 7 ? "soon" : "";
    const goalMin = (Number(e.goalHours) || 0) * 60;
    const doneMin = studiedMinutesFor(e);
    let goalHTML = "";
    if (goalMin > 0) {
      const pct = Math.min(100, (doneMin / goalMin) * 100);
      const remain = Math.max(0, goalMin - doneMin);
      const perDay = remain / Math.max(1, days);
      const todayDone = studiedMinutesFor(e, QH.todayISO());
      goalHTML = `
        <div class="exam-goal">
          <div class="exam-goal-top">
            <span>${ft("exam.progress", { done: (doneMin / 60).toFixed(1), goal: e.goalHours })}</span>
            <span>${Math.round(pct)}%</span>
          </div>
          <div class="exam-bar"><span style="width:${pct}%"></span></div>
          <p class="exam-hint">${remain <= 0 ? ft("exam.goalDone") : ft("exam.perDay", { need: QH.minutesToLabel(perDay) }) + " · " + ft("exam.todayStudy", { done: QH.minutesToLabel(todayDone), need: QH.minutesToLabel(perDay) })}</p>
        </div>`;
    }
    const subj = e.subjectId ? QH.subjectNameFor(e.subjectId) : "";
    const others = list.slice(1, 4).map((o) => `<span class="exam-chip">${esc(o.name)} · D-${Math.max(0, daysUntil(o))}</span>`).join("");
    const cd = fmtCountdown(examTime(e) - Date.now());
    return `
      <div class="exam-card ${urgency}" data-exam-id="${esc(e.id)}">
        <div class="exam-head">
          <p class="section-kicker">🎯 ${ft("exam.kicker")}</p>
          <button type="button" class="btn btn-ghost btn-sm" data-exam-action="manage">${ft("exam.manage")}</button>
        </div>
        <h3 class="exam-name">${esc(e.name)}</h3>
        <p class="exam-when">${esc(fmtDate(e))}${subj ? ` · <span class="exam-subj">${esc(subj)}</span>` : ""}${e.targetScore ? ` · ${ft("exam.score")}: <b>${esc(e.targetScore)}</b>` : ""}</p>
        <div class="exam-count">
          <div class="exam-days"><span class="exam-d" id="exam-d">${days <= 0 ? "D-Day" : cd.d}</span><span class="exam-d-lbl">${days <= 0 ? ft("exam.today") : ft("exam.days")}</span></div>
          <div class="exam-hms" id="exam-hms">${cd.hms}</div>
        </div>
        ${goalHTML}
        ${others ? `<div class="exam-others"><span>${ft("exam.others")}:</span>${others}</div>` : ""}
      </div>`;
  }
  function tickExamCountdown() {
    const card = document.querySelector(".exam-card[data-exam-id]");
    if (!card) return;
    const e = (QH.state.exams || []).find((x) => x.id === card.dataset.examId);
    if (!e) return;
    const ms = examTime(e) - Date.now();
    if (ms <= 0) { renderFocusExtras(); return; }
    const cd = fmtCountdown(ms);
    const d = $("exam-d"), h = $("exam-hms");
    if (d && daysUntil(e) > 0) d.textContent = cd.d;
    if (h) h.textContent = cd.hms;
  }

  // ---- Exam manager dialog ----
  let editingExamId = null;
  function ensureExamDialog() {
    if ($("dialog-exams")) return;
    const bd = document.createElement("div");
    bd.className = "dialog-backdrop";
    bd.id = "dialog-exams";
    bd.innerHTML = `<div class="dialog dialog-wide exam-dialog"><div id="exam-dialog-body"></div></div>`;
    document.body.appendChild(bd);
    bd.addEventListener("click", (e) => { if (e.target === bd) bd.classList.remove("open"); });
  }
  function renderExamDialog() {
    const body = $("exam-dialog-body");
    if (!body) return;
    const exams = [...(QH.state.exams || [])].sort((a, b) => examTime(a) - examTime(b));
    const now = Date.now();
    const editing = exams.find((x) => x.id === editingExamId) || null;
    const rows = exams.length ? exams.map((e) => {
      const past = examTime(e) <= now;
      const d = daysUntil(e);
      return `<li class="exam-row${past ? " past" : ""}">
        <div class="exam-row-d">${past ? ft("exam.past") : d <= 0 ? "D-Day" : "D-" + d}</div>
        <div class="exam-row-body">
          <p class="exam-row-name">${esc(e.name)}</p>
          <p class="exam-row-meta">${esc(fmtDate(e))}${e.subjectId ? " · " + esc(QH.subjectNameFor(e.subjectId)) : ""}${e.goalHours ? ` · ${ft("exam.goal")}: ${e.goalHours} ${ft("exam.hours")}` : ""}${e.targetScore ? ` · ${ft("exam.score")}: ${esc(e.targetScore)}` : ""}</p>
          ${e.note ? `<p class="exam-row-note">${esc(e.note)}</p>` : ""}
        </div>
        <div class="exam-row-actions">
          <button type="button" class="btn btn-ghost btn-sm" data-exam-edit="${esc(e.id)}">${ft("exam.edit")}</button>
          <button type="button" class="btn btn-ghost btn-sm exam-del" data-exam-del="${esc(e.id)}">${ft("exam.del")}</button>
        </div>
      </li>`;
    }).join("") : `<li class="exam-empty">${ft("exam.empty")}</li>`;
    const v = editing || { name: "", date: "", time: "07:30", subjectId: "", goalHours: "", targetScore: "", note: "" };
    body.innerHTML = `
      <h3>🎯 ${ft("exam.dialogTitle")}</h3>
      <p class="desc">${ft("exam.dialogDesc")}</p>
      <ul class="exam-list">${rows}</ul>
      <form id="exam-form" class="exam-form" novalidate>
        <div class="field"><label>${ft("exam.name")}</label><input type="text" id="ex-name" maxlength="80" placeholder="${esc(ft("exam.namePh"))}" value="${esc(v.name)}" /></div>
        <div class="field-row-3">
          <div class="field"><label>${ft("exam.date")}</label><input type="date" id="ex-date" value="${esc(v.date)}" /></div>
          <div class="field"><label>${ft("exam.time")}</label><input type="time" id="ex-time" value="${esc(v.time || "07:30")}" /></div>
          <div class="field"><label>${ft("exam.subject")}</label><select id="ex-subject"></select></div>
        </div>
        <div class="field-row">
          <div class="field"><label>${ft("exam.goalHours")}</label><input type="number" id="ex-goal" min="0" max="2000" step="1" placeholder="30" value="${esc(v.goalHours || "")}" /></div>
          <div class="field"><label>${ft("exam.targetScore")}</label><input type="text" id="ex-score" maxlength="30" placeholder="${esc(ft("exam.scorePh"))}" value="${esc(v.targetScore || "")}" /></div>
        </div>
        <div class="field"><label>${ft("exam.note")}</label><input type="text" id="ex-note" maxlength="160" placeholder="${esc(ft("exam.notePh"))}" value="${esc(v.note || "")}" /></div>
        <p class="error-text" id="ex-error" style="display:none"></p>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost btn-sm" id="ex-close">${editing ? ft("exam.cancel") : ft("exam.close")}</button>
          <button type="submit" class="btn btn-primary btn-sm">${editing ? ft("exam.update") : ft("exam.save")}</button>
        </div>
      </form>`;
    QH.rebuildSubjectOptions($("ex-subject"), { value: v.subjectId || "", noneLabel: ft("exam.allSubjects") });
    body.querySelectorAll("[data-exam-edit]").forEach((b) => b.addEventListener("click", () => { editingExamId = b.dataset.examEdit; renderExamDialog(); $("ex-name").focus(); }));
    body.querySelectorAll("[data-exam-del]").forEach((b) => b.addEventListener("click", () => {
      const ex = QH.state.exams.find((x) => x.id === b.dataset.examDel);
      if (!ex || !window.confirm(ft("exam.confirmDel", { name: ex.name }))) return;
      QH.state.exams = QH.state.exams.filter((x) => x.id !== ex.id);
      if (editingExamId === ex.id) editingExamId = null;
      QH.persist();
      renderExamDialog();
    }));
    $("ex-close").addEventListener("click", () => {
      if (editingExamId) { editingExamId = null; renderExamDialog(); }
      else QH.closeDialog("dialog-exams");
    });
    $("exam-form").addEventListener("submit", (ev) => {
      ev.preventDefault();
      const err = $("ex-error");
      const name = $("ex-name").value.trim();
      const date = $("ex-date").value;
      const fail = (m) => { err.textContent = m; err.style.display = "block"; };
      if (!name) return fail(ft("exam.needName"));
      if (!date) return fail(ft("exam.needDate"));
      const goal = Math.max(0, Math.min(2000, Number($("ex-goal").value) || 0));
      const data = {
        name, date,
        time: $("ex-time").value || "07:30",
        subjectId: $("ex-subject").value || undefined,
        goalHours: goal || undefined,
        targetScore: $("ex-score").value.trim() || undefined,
        note: $("ex-note").value.trim() || undefined
      };
      if (editingExamId) {
        const ex = QH.state.exams.find((x) => x.id === editingExamId);
        if (ex) Object.assign(ex, data);
        editingExamId = null;
      } else {
        QH.state.exams.push({ id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36), createdAt: QH.todayISO(), ...data });
      }
      lsSet(CTA_KEY, "0");
      QH.persist();
      renderExamDialog();
    });
  }
  function openExamDialog() {
    ensureExamDialog();
    editingExamId = null;
    renderExamDialog();
    QH.openDialog("dialog-exams");
  }

  // ---- Focus extras host (exam + XP) ----
  function renderFocusExtras() {
    const host = $("focus-extras");
    if (!host) return;
    const stats = computeStats();
    const info = levelInfo(xpOf(stats));
    const exam = renderExamCard();
    host.classList.toggle("has-exam", !!exam);
    host.innerHTML = `${exam}${renderXPCard(info)}`;
  }

  // ======================================================================
  //  MIXER: presets + sleep timer
  // ======================================================================
  const BUILTIN_PRESETS = [
    { id: "rainNight", icon: "🌧️", master: 0.6, tracks: { rain: 0.65, fireplace: 0.2, brown: 0.15 } },
    { id: "cafe", icon: "☕", master: 0.6, tracks: { cafe: 0.6, rain: 0.2, lofi: 0.25 } },
    { id: "beach", icon: "🌊", master: 0.6, tracks: { ocean: 0.7, forest: 0.15 } },
    { id: "cabin", icon: "🔥", master: 0.6, tracks: { fireplace: 0.6, rain: 0.3 } },
    { id: "lofi", icon: "🎧", master: 0.55, tracks: { lofi: 0.7, rain: 0.25 } },
    { id: "forest", icon: "🌲", master: 0.6, tracks: { forest: 0.7, rain: 0.1 } },
    { id: "deep", icon: "🧠", master: 0.55, tracks: { brown: 0.6, rain: 0.15 } }
  ];
  function applyPreset(p) {
    QH.unlockAudio();
    const tr = QH.state.mixer.tracks;
    Object.keys(tr).forEach((k) => {
      const v = p.tracks[k];
      tr[k].on = v > 0;
      if (v > 0) tr[k].volume = v;
    });
    if (Number.isFinite(p.master)) QH.state.mixer.master = p.master;
    QH.persist();
    QH.renderMixer();
  }
  function presetMatches(p) {
    const tr = QH.state.mixer.tracks;
    return Object.keys(tr).every((k) => {
      const want = p.tracks[k] || 0, on = tr[k].on && tr[k].volume > 0;
      return want > 0 ? on && Math.abs(tr[k].volume - want) < 0.02 : !on;
    });
  }
  let sleepAt = null, sleepAtEnd = false, sleepTimer = null, sleepTick = null;
  function clearSleep() {
    sleepAt = null; sleepAtEnd = false;
    clearTimeout(sleepTimer); clearInterval(sleepTick);
  }
  function stopAmbient() {
    clearSleep();
    QH.fadeOutAmbient(8);
    setTimeout(() => {
      Object.values(QH.state.mixer.tracks).forEach((t) => { t.on = false; });
      QH.persist();
      QH.renderMixer(); // restores master level with every track off
      renderMixerExtras();
    }, 8200);
    toast(ft("mix.sleeping"));
  }
  function setSleep(val) {
    clearSleep();
    if (val === "end") sleepAtEnd = true;
    else if (val > 0) {
      sleepAt = Date.now() + val * 60000;
      sleepTimer = setTimeout(stopAmbient, val * 60000);
      sleepTick = setInterval(updateSleepLabel, 1000);
    }
    renderMixerExtras();
  }
  function updateSleepLabel() {
    const el = $("mx-sleep-status");
    if (!el) return;
    if (sleepAt) {
      const s = Math.max(0, Math.round((sleepAt - Date.now()) / 1000));
      el.textContent = ft("mix.sleepIn", { t: `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` });
    } else el.textContent = sleepAtEnd ? ft("mix.sleepAtEnd") : "";
  }
  function renderMixerExtras() {
    const host = $("mixer-extras");
    if (!host) return;
    const custom = QH.state.mixerPresets || [];
    const chips = BUILTIN_PRESETS.map((p) =>
      `<button type="button" class="mx-chip${presetMatches(p) ? " active" : ""}" data-preset="${p.id}">${p.icon} ${esc(ft("mix.builtin." + p.id))}</button>`
    ).concat(custom.map((p) =>
      `<span class="mx-chip mx-custom${presetMatches(p) ? " active" : ""}"><button type="button" data-custom="${esc(p.id)}">⭐ ${esc(p.name)}</button><button type="button" class="mx-del" data-custom-del="${esc(p.id)}" aria-label="×">×</button></span>`
    )).join("");
    const sleepOpts = [["off", ft("mix.off")], [15, "15" + ft("mix.min")], [30, "30" + ft("mix.min")], [45, "45" + ft("mix.min")], [60, "60" + ft("mix.min")], [90, "90" + ft("mix.min")], ["end", ft("mix.endSession")]];
    const curSleep = sleepAtEnd ? "end" : sleepAt ? "timer" : "off";
    host.innerHTML = `
      <div class="mx-section">
        <p class="mx-label">${ft("mix.presets")}</p>
        <div class="mx-chips">${chips}
          <button type="button" class="mx-chip mx-save" id="mx-save-btn">＋ ${ft("mix.save")}</button>
        </div>
        <form class="mx-save-form" id="mx-save-form" hidden>
          <input type="text" id="mx-save-name" maxlength="30" placeholder="${esc(ft("mix.namePh"))}" />
          <button type="submit" class="btn btn-primary btn-sm">${ft("exam.save").split(" ")[0]}</button>
        </form>
      </div>
      <div class="mx-section">
        <p class="mx-label">🌙 ${ft("mix.sleep")} <span class="mx-sleep-status" id="mx-sleep-status"></span></p>
        <div class="mx-chips">${sleepOpts.map(([v, l]) => {
          const active = (v === "off" && curSleep === "off") || (v === "end" && curSleep === "end");
          return `<button type="button" class="mx-chip mx-sleep${active ? " active" : ""}" data-sleep="${v}">${l}</button>`;
        }).join("")}</div>
      </div>`;
    updateSleepLabel();
    host.querySelectorAll("[data-preset]").forEach((b) => b.addEventListener("click", () => applyPreset(BUILTIN_PRESETS.find((p) => p.id === b.dataset.preset))));
    host.querySelectorAll("[data-custom]").forEach((b) => b.addEventListener("click", () => {
      const p = custom.find((x) => x.id === b.dataset.custom);
      if (p) applyPreset(p);
    }));
    host.querySelectorAll("[data-custom-del]").forEach((b) => b.addEventListener("click", () => {
      QH.state.mixerPresets = custom.filter((x) => x.id !== b.dataset.customDel);
      QH.persist();
    }));
    host.querySelectorAll("[data-sleep]").forEach((b) => b.addEventListener("click", () => {
      const v = b.dataset.sleep;
      setSleep(v === "off" ? 0 : v === "end" ? "end" : Number(v));
    }));
    const form = $("mx-save-form");
    $("mx-save-btn").addEventListener("click", () => {
      form.hidden = !form.hidden;
      if (!form.hidden) $("mx-save-name").focus();
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("mx-save-name").value.trim();
      if (!name) return;
      const tracks = {};
      Object.entries(QH.state.mixer.tracks).forEach(([k, t]) => { if (t.on && t.volume > 0) tracks[k] = t.volume; });
      if (!Object.keys(tracks).length) { toast(ft("mix.nothingOn")); return; }
      QH.state.mixerPresets = [...custom, { id: "p" + Date.now().toString(36), name, master: QH.state.mixer.master, tracks }];
      QH.persist();
      toast(ft("mix.saved"));
    });
  }

  // ======================================================================
  //  TIME-OF-DAY SKY
  // ======================================================================
  function daypart(h) {
    if (h >= 5 && h < 7) return "dawn";
    if (h >= 7 && h < 11) return "morning";
    if (h >= 11 && h < 16) return "day";
    if (h >= 16 && h < 18.5) return "golden";
    if (h >= 18.5 && h < 20) return "dusk";
    return "night";
  }
  function updateSky() {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    document.body.dataset.daypart = daypart(h);
    // Sun travels 6h→18h, moon 18h→6h, along an arc across the sky
    const isDay = h >= 6 && h < 18;
    const f = isDay ? (h - 6) / 12 : ((h + 6) % 24) / 12;
    document.body.style.setProperty("--sky-x", (8 + f * 84).toFixed(1) + "%");
    document.body.style.setProperty("--sky-y", (8 + Math.pow(2 * f - 1, 2) * 30).toFixed(1) + "%");
  }

  // ======================================================================
  //  WIRING
  // ======================================================================
  function renderAllFeatures() {
    const stats = computeStats();
    const info = levelInfo(xpOf(stats));
    renderHeatmap(stats);
    renderAchievements(stats, info);
    renderFocusExtras();
    renderMixerExtras();
    const lbl = document.querySelector("#btn-open-exams .exam-btn-label");
    if (lbl) lbl.textContent = QH.lang === "vi" ? "Kỳ thi" : "Exams";
    checkProgress(stats, info);
  }
  let pending = 0;
  function scheduleRender() {
    clearTimeout(pending);
    pending = setTimeout(renderAllFeatures, 120);
  }

  function init() {
    initHeatTooltip();
    renderAllFeatures();
    updateSky();
    setInterval(updateSky, 60000);
    setInterval(tickExamCountdown, 1000);
    document.addEventListener("qh:change", scheduleRender);
    document.addEventListener("qh:lang", () => {
      renderAllFeatures();
      // The exam dialog is only re-rendered by its own actions (so typing isn't lost), except on language change
      if ($("dialog-exams") && $("dialog-exams").classList.contains("open")) renderExamDialog();
    });
    document.addEventListener("qh:session", () => { if (sleepAtEnd) stopAmbient(); });
    // Delegated actions inside the focus extras
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("[data-exam-action]");
      if (a) {
        const act = a.dataset.examAction;
        if (act === "add" || act === "manage") openExamDialog();
        if (act === "hide-cta") { lsSet(CTA_KEY, "1"); renderFocusExtras(); }
        return;
      }
      const xp = e.target.closest && e.target.closest("#focus-extras .xp-card");
      if (xp) {
        QH.switchView("insights");
        setTimeout(() => { const c = $("ach-card"); if (c) c.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
      }
    });
    const btn = $("btn-open-exams");
    if (btn) btn.addEventListener("click", openExamDialog);
  }

  // app.js fires qh:ready at the end of its DOMContentLoaded bootstrap
  document.addEventListener("qh:ready", init, { once: true });
})();
