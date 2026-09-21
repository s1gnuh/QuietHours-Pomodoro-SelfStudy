/* =========================================================
   QuietHours · Static HTML port
   Vanilla JS (no React, no build tools)
   ========================================================= */
(function () {
  "use strict";

  // -------- i18n dictionary -------------------------------------------------
  const DICTS = {
    vi: {
      brand: { tagline: "Phòng học tập cá nhân", localOnly: "Dữ liệu chỉ lưu ở trình duyệt của bạn." },
      nav: { focus: "Tập trung", schedule: "Lịch học", board: "Bảng việc", insights: "Thống kê", data: "Dữ liệu" },
      author: { title: "Tác giả" },
      common: { start: "Bắt đầu", pause: "Tạm dừng", reset: "Đặt lại", settings: "Cài đặt",
        add: "Thêm", cancel: "Hủy", save: "Lưu", done: "Hoàn thành", undo: "Hoàn tác",
        delete: "Xóa", none: "Không", openLink: "Mở liên kết",
        exportData: "Xuất dữ liệu", importData: "Nhập dữ liệu" },
      focus: {
        session: "Buổi học", pomodoro: "Pomodoro", focus: "Tập trung", shortBreak: "Nghỉ ngắn", longBreak: "Nghỉ dài",
        complete: "hoàn thành!", finished: "đã kết thúc", isUp: "đã đến", next: "Tiếp theo",
        nextSession: "Buổi tới", nothingScheduled: "Không có lịch nào", happeningNow: "Đang diễn ra",
        inX: "Còn {label}", studyStreak: "Chuỗi ngày", day: "ngày", days: "ngày",
        today: "hôm nay", noFocusToday: "Chưa tập trung hôm nay", thisWeek: "Tuần này",
        focusHours: "Giờ tập trung", focusSessions: "buổi tập trung", spaceToStart: "Nhấn Space để bắt đầu / dừng"
      },
      timerSettings: {
        title: "Cài đặt bộ đếm",
        desc: "Độ dài các phiên. Một phiên nghỉ dài sẽ xuất hiện sau mỗi {n} phiên tập trung.",
        focus: "Tập trung (phút)", shortBreak: "Nghỉ ngắn (phút)", longBreak: "Nghỉ dài (phút)",
        longBreakEvery: "Nghỉ dài sau (phiên)", autoStart: "Tự động bắt đầu phiên tiếp theo",
        autoStartDesc: "Không cần nhấn Bắt đầu sau mỗi chu kỳ."
      },
      mixer: {
        atmosphere: "Không gian", soundMixer: "Trộn âm thanh", master: "Tổng",
        tracks: {
          rain: { label: "Mưa", hint: "Mưa nhẹ trên mái" },
          cafe: { label: "Quán cà phê", hint: "Tiếng người nói & cốc chén" },
          ocean: { label: "Biển", hint: "Sóng nhẹ dập bờ" },
          fireplace: { label: "Lò sưởi", hint: "Lửa kẹt nhẹ" },
          lofi: { label: "Lofi", hint: "Hợp âm & beat nhẹ" }
        }
      },
      schedule: {
        calendar: "Lịch", studySchedule: "Lịch học tập", timeline: "Theo ngày", week: "Theo tuần",
        noSessions: "Không có buổi học nào trong ngày", free: "Trống",
        active: "Đang diễn ra", completed: "Hoàn thành", upcoming: "Sắp tới",
        newSession: "Buổi học mới", newSessionDesc: "Thêm một mục vào lịch học.",
        name: "Tên buổi học", date: "Ngày", startTime: "Bắt đầu", endTime: "Kết thúc",
        type: "Loại", subject: "Môn học", link: "Liên kết", saveSession: "Lưu buổi học",
        types: { study: "Học bài", lecture: "Lý thuyết", review: "Ôn tập", break: "Nghỉ giải lao", other: "Khác" }
      },
      board: {
        tasks: "Công việc", board: "Bảng Kanban", toDo: "Cần làm", inProgress: "Đang làm", done: "Hoàn thành",
        dropHere: "Kéo thả vào đây", newCard: "Thẻ mới", newCardDesc: "Thêm công việc vào bảng Kanban.",
        title: "Tiêu đề", notes: "Ghi chú", priority: "Ưu tiên", column: "Cột", deadline: "Hạn",
        addToBoard: "Thêm vào bảng", moveTo: "Chuyển sang",
        priorityLabel: { low: "Thấp", medium: "Trung bình", high: "Cao" }
      },
      insights: {
        insights: "Phân tích", productivity: "Năng suất",
        dailyStreak: "Chuỗi ngày", consecutiveDays: "ngày liên tục có hoạt động",
        today: "Hôm nay", loggedTime: "thời gian đã ghi nhận",
        thisWeek: "Tuần này", acrossSubjects: "trên các môn học",
        dailyHours: "Giờ tập trung / ngày", timeBySubject: "Thời gian theo môn",
        hours: "Giờ"
      },
      data: {
        privacy: "Quyền riêng tư", data: "Dữ liệu",
        dataDesc: "Tất cả dữ liệu (lịch, task, thống kê) được lưu trữ hoàn toàn trên trình duyệt của bạn dưới khóa ",
        backupTitle: "Sao lưu & khôi phục", backupDesc: "Xuất file JSON để sao lưu, hoặc nhập file đã xuất trước đó để khôi phục.",
        couldNotImport: "Không thể nhập file này.", restored: "Đã khôi phục dữ liệu gốc.",
        subjects: "Môn học", subjectsDesc: "Tạo môn học để gắn vào lịch và công việc — giúp thống kê chính xác hơn.",
        newSubject: "Thêm môn học", subjectPlaceholder: "Ví dụ: Toán cao cấp",
        resetTitle: "Đặt lại dữ liệu", resetDesc: "Xóa toàn bộ lịch, công việc, thống kê — hành động không thể hoàn tác."
      },
      dock: { start: "Bắt đầu", pause: "Tạm dừng" },
      lang: { switch: "Chuyển ngôn ngữ" }
    },
    en: {
      brand: { tagline: "Your private study room", localOnly: "Your data stays in this browser only." },
      nav: { focus: "Focus", schedule: "Schedule", board: "Board", insights: "Insights", data: "Data" },
      author: { title: "Author" },
      common: { start: "Start", pause: "Pause", reset: "Reset", settings: "Settings",
        add: "Add", cancel: "Cancel", save: "Save", done: "Done", undo: "Undo",
        delete: "Delete", none: "None", openLink: "Open link",
        exportData: "Export data", importData: "Import data" },
      focus: {
        session: "Session", pomodoro: "Pomodoro", focus: "Focus", shortBreak: "Short break", longBreak: "Long break",
        complete: "complete!", finished: "finished", isUp: "is up", next: "Next",
        nextSession: "Next session", nothingScheduled: "Nothing scheduled", happeningNow: "Happening now",
        inX: "In {label}", studyStreak: "Study streak", day: "day", days: "days",
        today: "today", noFocusToday: "No focus logged today", thisWeek: "This week",
        focusHours: "Focus hours", focusSessions: "focus sessions", spaceToStart: "Press Space to start / pause"
      },
      timerSettings: {
        title: "Timer settings",
        desc: "Length of each interval. A long break appears after every {n} focus sessions.",
        focus: "Focus (min)", shortBreak: "Short break (min)", longBreak: "Long break (min)",
        longBreakEvery: "Long break every", autoStart: "Auto-start next session",
        autoStartDesc: "Don't require pressing Start after each cycle."
      },
      mixer: {
        atmosphere: "Atmosphere", soundMixer: "Ambient mixer", master: "Master",
        tracks: {
          rain: { label: "Rain", hint: "Soft rooftop rain" },
          cafe: { label: "Cafe", hint: "Room murmur & cups" },
          ocean: { label: "Ocean", hint: "Slow shoreline wash" },
          fireplace: { label: "Fireplace", hint: "Low crackle" },
          lofi: { label: "Lofi", hint: "Dusty chords & beat" }
        }
      },
      schedule: {
        calendar: "Calendar", studySchedule: "Study schedule", timeline: "Timeline", week: "Week",
        noSessions: "No sessions scheduled for today", free: "Free",
        active: "Active", completed: "Completed", upcoming: "Upcoming",
        newSession: "New session", newSessionDesc: "Add a session to your study schedule.",
        name: "Name", date: "Date", startTime: "Start", endTime: "End",
        type: "Type", subject: "Subject", link: "Link", saveSession: "Save session",
        types: { study: "Study", lecture: "Lecture", review: "Review", break: "Break", other: "Other" }
      },
      board: {
        tasks: "Tasks", board: "Board", toDo: "To Do", inProgress: "In Progress", done: "Done",
        dropHere: "Drop cards here", newCard: "New card", newCardDesc: "Add a task to the board.",
        title: "Title", notes: "Notes", priority: "Priority", column: "Column", deadline: "Deadline",
        addToBoard: "Add to Board", moveTo: "Move to",
        priorityLabel: { low: "Low", medium: "Medium", high: "High" }
      },
      insights: {
        insights: "Insights", productivity: "Productivity",
        dailyStreak: "Daily streak", consecutiveDays: "consecutive active days",
        today: "Today", loggedTime: "logged time",
        thisWeek: "This week", acrossSubjects: "across subjects",
        dailyHours: "Daily hours", timeBySubject: "Time by subject",
        hours: "Hours"
      },
      data: {
        privacy: "Privacy", data: "Data",
        dataDesc: "Everything (schedule, tasks, logs) lives entirely in your browser under key ",
        backupTitle: "Backup & restore", backupDesc: "Export a JSON snapshot, or import one to restore a previous backup.",
        couldNotImport: "Could not import this file.", restored: "All data has been reset.",
        subjects: "Subjects", subjectsDesc: "Create subjects to tag schedule and tasks — makes analytics more useful.",
        newSubject: "New subject", subjectPlaceholder: "e.g. Linear Algebra",
        resetTitle: "Reset data", resetDesc: "Delete schedule, tasks, analytics — this can't be undone."
      },
      dock: { start: "Start", pause: "Pause" },
      lang: { switch: "Switch language" }
    }
  };

  // -------- Tiny localization helpers ---------------------------------------
  let currentLang = (function () {
    try {
      const saved = localStorage.getItem("quiethours-static-lang");
      if (saved === "en" || saved === "vi") return saved;
    } catch (_) {}
    const nav = (navigator.language || "vi").toLowerCase();
    return nav.startsWith("vi") ? "vi" : "en";
  })();

  function t(path) {
    const parts = path.split(".");
    let cur = DICTS[currentLang];
    for (const p of parts) {
      if (cur == null) return path;
      cur = cur[p];
    }
    return cur == null ? path : cur;
  }
  function formatTpl(str, vars) {
    return String(str).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? String(vars[k]) : ""));
  }
  function applyTranslations() {
    const root = document.documentElement;
    root.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const path = el.getAttribute("data-i18n");
      const txt = t(path);
      if (path === "data.dataDesc") {
        // Special case: needs to insert key *after* text because HTML has <code> sibling
        el.textContent = txt;
      } else {
        el.textContent = txt;
      }
    });
    // Option <option data-i18n> (nested) already handled above via querySelectorAll
    // Input placeholders
    document.querySelectorAll("input[data-i18n-placeholder]").forEach((el) => {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
  }
  function setLang(lang) {
    if (lang !== "vi" && lang !== "en") return;
    currentLang = lang;
    try { localStorage.setItem("quiethours-static-lang", lang); } catch (_) {}
    // Sync selects
    document.getElementById("lang-select").value = lang;
    document.getElementById("lang-select-mobile").value = lang;
    applyTranslations();
    // Re-render dynamic texts
    updateDynamicLabels();
    renderWeekStrip();
    renderSchedule();
    renderKanban();
    renderSubjectChips();
    renderStats();
    renderCharts();
  }

  // -------- Persistence (localStorage, mirror of PersistedData) --------------
  const STORAGE_KEY = "quiethours-static-v1";
  const TONES = ["sage", "sand", "clay", "mist", "foam"];
  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
  function todayISO(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  }
  function seedSampleData() {
    return {
      subjects: [],
      timerSettings: { focusMin: 25, shortBreakMin: 5, longBreakMin: 15, longBreakEvery: 4, autoStart: false },
      timer: { mode: "focus", running: false, endAt: null, remainingMs: 25 * 60 * 1000, focusCount: 0 },
      mixer: {
        master: 0.7,
        tracks: {
          rain: { on: false, volume: 0.5 },
          cafe: { on: false, volume: 0.4 },
          ocean: { on: false, volume: 0 },
          fireplace: { on: false, volume: 0 },
          lofi: { on: false, volume: 0 }
        }
      },
      schedule: [],
      kanban: [],
      logs: []
    };
  }
  let state = (function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (_) {}
    const sd = seedSampleData();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sd)); } catch (_) {}
    return sd;
  })();
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  // -------- Date / time helpers ---------------------------------------------
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function weekDays(from = new Date()) {
    const out = [];
    const d = new Date(from);
    const day = d.getDay() === 0 ? 6 : d.getDay() - 1; // Monday first
    d.setDate(d.getDate() - day);
    for (let i = 0; i < 7; i++) out.push(addDays(d, i));
    return out;
  }
  function formatDayHeading(d) {
    const dow = ["Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "CN"];
    if (currentLang === "en") {
      return d.toLocaleDateString("en-US", { weekday: "short" });
    }
    return dow[d.getDay() === 0 ? 6 : d.getDay() - 1];
  }
  function minutesToLabel(mins) {
    const m = Math.round(mins);
    const h = Math.floor(m / 60);
    const rem = m % 60;
    if (h === 0) return `${rem} ${currentLang === "vi" ? "phút" : "min"}`;
    return `${h} ${currentLang === "vi" ? "giờ" : "h"} ${rem === 0 ? "" : rem + (currentLang === "vi" ? " phút" : " min")}`.trim();
  }
  function combineDateTime(dateISO, timeHHMM) {
    const [hh, mm] = timeHHMM.split(":").map(Number);
    const d = new Date(dateISO + "T00:00:00");
    d.setHours(hh || 0, mm || 0, 0, 0);
    return d;
  }
  function taskStatus(task, now = new Date()) {
    if (task.completed) return "completed";
    const s = combineDateTime(task.date, task.start).getTime();
    const e = combineDateTime(task.date, task.end).getTime();
    const n = now.getTime();
    if (n >= s && n < e) return "active";
    if (n < s) return "upcoming";
    return "completed";
  }
  function nextSessionLabel(next, tNow) {
    const diff = next.startDate - tNow;
    if (diff <= 0) return { label: currentLang === "vi" ? "đang diễn ra" : "now", status: "active" };
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return { label: `${mins} ${currentLang === "vi" ? "phút" : "min"}`, status: "upcoming" };
    const h = Math.floor(mins / 60);
    const rem = mins % 60;
    if (h < 24) return { label: `${h}${currentLang === "vi" ? "g" : "h"} ${rem}${currentLang === "vi" ? "p" : "m"}`.trim(), status: "upcoming" };
    const d = Math.floor(h / 24);
    return { label: `${d} ${currentLang === "vi" ? "ngày" : "d"}`, status: "upcoming" };
  }
  function computeStreak(logs, asOf = new Date()) {
    const set = new Set(logs.map((l) => l.date));
    let cur = asOf;
    let count = 0;
    // If not today, look back but require today first
    let iso = todayISO(cur);
    if (!set.has(iso)) cur = addDays(cur, -1);
    while (set.has(todayISO(cur))) {
      count++;
      cur = addDays(cur, -1);
    }
    return count;
  }
  function hoursThisWeek(logs, asOf = new Date()) {
    const days = weekDays(asOf);
    const isoSet = new Set(days.map(todayISO));
    return logs.filter((l) => isoSet.has(l.date)).reduce((s, l) => s + (l.minutes || 0), 0);
  }
  function minutesByDate(logs) {
    const m = new Map();
    logs.forEach((l) => m.set(l.date, (m.get(l.date) || 0) + (l.minutes || 0)));
    return m;
  }
  function minutesBySubject(logs) {
    const m = new Map();
    logs.forEach((l) => {
      const k = l.subjectId || "__none__";
      m.set(k, (m.get(k) || 0) + (l.minutes || 0));
    });
    return m;
  }

  // -------- Vietnamese Lunar Calendar (Lịch Vạn niên) -----------------------
  // Thuật toán Hồ Ngọc Đức - convert Gregorian ↔ Vietnamese Lunar (UTC+7)
  function _lunarInt(d) { return Math.floor(d); }
  function _jdFromDate(dd, mm, yy) {
    const a = _lunarInt((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + _lunarInt((153 * m + 2) / 5) + 365 * y + _lunarInt(y / 4) - _lunarInt(y / 100) + _lunarInt(y / 400) - 32045;
  }
  function _jdToDate(jd) {
    const a = jd + 32044;
    const b = _lunarInt((4 * a + 3) / 146097);
    const c = a - _lunarInt(146097 * b / 4);
    const d = _lunarInt((4 * c + 3) / 1461);
    const e = c - _lunarInt(1461 * d / 4);
    const m = _lunarInt((5 * e + 2) / 153);
    const day = e - _lunarInt((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * _lunarInt(m / 10);
    const year = 100 * b + d - 4800 + _lunarInt(m / 10);
    return { day, month, year };
  }
  function _getNewMoonDay(k, timeZone) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    let dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr);
    C1 += 0.0021 * Math.sin(2 * dr * M);
    C1 -= 0.4068 * Math.sin(Mpr * dr);
    C1 += 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    let deltat;
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    }
    return _lunarInt(Jd1 + C1 - deltat + 0.5 + timeZone / 24);
  }
  function _getLunarMonth11(yy, timeZone) {
    const off = _lunarInt((_jdFromDate(31, 12, yy) - 2415021.076998695) / 29.530588853);
    let k = off;
    let nm = _getNewMoonDay(k, timeZone);
    let y1 = _jdToDate(nm).year;
    if (y1 < yy) k++;
    else if (y1 > yy) k--;
    return _getNewMoonDay(k, timeZone);
  }
  function _getLeapMonthOffset(a11, timeZone) {
    const k = _lunarInt((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0, i = 1, arc = _getNewMoonDay(k + i, timeZone);
    do {
      last = arc;
      i++;
      arc = _getNewMoonDay(k + i, timeZone);
    } while (arc - last < 365);
    return Math.round((_getNewMoonDay(k + 12, timeZone) - _getNewMoonDay(k + 1, timeZone)) / 29);
  }
  function _leapBias(lunarYear, timeZone) {
    const x = _getNewMoonDay(_lunarInt((12 * (lunarYear - 1900) + 10.5) / 29.530588853), timeZone);
    return (_getNewMoonDay(_lunarInt((12 * (lunarYear - 1900) + 10.5) / 29.530588853) + 13, timeZone) - x) > 365 ? 1 : 0;
  }
  function convertSolar2Lunar(dd, mm, yy, timeZone) {
    const dayNumber = _jdFromDate(dd, mm, yy);
    const k = _lunarInt((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = _getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) monthStart = _getNewMoonDay(k, timeZone);
    let a11 = _getLunarMonth11(yy, timeZone);
    let b11 = a11;
    if (a11 >= monthStart) {
      b11 = _getLunarMonth11(yy - 1, timeZone);
    }
    const lunarYear = a11 >= monthStart ? yy : yy - 1;
    const lunarDay = dayNumber - monthStart + 1;
    const diff = _lunarInt((monthStart - b11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = _getLeapMonthOffset(b11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 11;
        if (diff === leapMonthDiff) lunarLeap = 1;
      }
    }
    if (lunarMonth > 12) lunarMonth = lunarMonth - 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear += 1;
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: !!lunarLeap };
  }
  function solarToLunar(isoString) {
    const [y, m, d] = isoString.split("-").map(Number);
    return convertSolar2Lunar(d, m, y, 7);
  }
  function formatLunarShort(isoString) {
    const l = solarToLunar(isoString);
    const leap = l.leap ? " N" : "";
    return `${String(l.day).padStart(2, "0")}/${String(l.month).padStart(2, "0")}${leap}`;
  }
  function formatLunarFull(isoString) {
    const l = solarToLunar(isoString);
    const leap = l.leap ? " (nhuận)" : "";
    return `Ngày ${l.day} tháng ${l.month} năm ${l.year}${leap}`;
  }
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  function canChiYear(year) {
    return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
  }
  function canChiDay(isoString) {
    const [y, m, d] = isoString.split("-").map(Number);
    const jd = _jdFromDate(d, m, y);
    return `${CAN[(jd + 9) % 10]} ${CHI[(jd + 1) % 12]}`;
  }

  // -------- View / navigation switching -------------------------------------
  function switchView(viewId) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const target = document.getElementById("view-" + viewId);
    if (target) target.classList.add("active");
    document.querySelectorAll("[data-view]").forEach((btn) => {
      if (btn.tagName === "BUTTON") {
        btn.classList.toggle("active", btn.getAttribute("data-view") === viewId);
      }
    });
    // Hide dock on focus view
    const dock = document.getElementById("dock");
    dock.style.display = viewId === "focus" ? "none" : "flex";
    if (viewId === "insights") {
      // Trigger render at next tick so layout ready
      setTimeout(renderCharts, 20);
    }
    try { sessionStorage.setItem("quiethours-static-view", viewId); } catch (_) {}
  }

  // -------- Timer engine -----------------------------------------------------
  function durationMsFor(mode) {
    const s = state.timerSettings;
    if (mode === "focus") return s.focusMin * 60 * 1000;
    if (mode === "shortBreak") return s.shortBreakMin * 60 * 1000;
    return s.longBreakMin * 60 * 1000;
  }
  function modeLabelKey(mode) {
    return mode === "focus" ? "focus.focus" : mode === "shortBreak" ? "focus.shortBreak" : "focus.longBreak";
  }
  function remainingMsNow() {
    const tm = state.timer;
    if (tm.running && tm.endAt) {
      const diff = tm.endAt - Date.now();
      return diff > 0 ? diff : 0;
    }
    return tm.remainingMs;
  }
  function formatMs(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  let completingRef = false;
  function completeSession() {
    const tm = state.timer;
    const completedMode = tm.mode;
    // Log
    if (completedMode === "focus") {
      state.logs.push({
        id: uid(),
        date: todayISO(),
        minutes: Math.round(durationMsFor(completedMode) / 60000),
        subjectId: undefined,
        mode: completedMode,
        completedAt: Date.now()
      });
    }
    let nextMode;
    let count = tm.focusCount;
    if (completedMode === "focus") {
      count += 1;
      state.timer.focusCount = count;
      if (count % state.timerSettings.longBreakEvery === 0) nextMode = "longBreak";
      else nextMode = "shortBreak";
    } else {
      nextMode = "focus";
    }
    state.timer.mode = nextMode;
    state.timer.remainingMs = durationMsFor(nextMode);
    state.timer.endAt = null;
    state.timer.running = !!state.timerSettings.autoStart;
    if (state.timer.running) state.timer.endAt = Date.now() + state.timer.remainingMs;
    persist();
    // Notification-ish (small inline popup via console for static demo)
    console.log(
      `[QuietHours] ${t(modeLabelKey(completedMode))} ${t("focus.complete")} — ${t("focus.next")}: ${t(modeLabelKey(nextMode))}`
    );
    renderTimer();
    renderStats();
    renderCharts();
  }
  function startTimer() {
    const tm = state.timer;
    const ms = tm.remainingMs > 0 ? tm.remainingMs : durationMsFor(tm.mode);
    tm.remainingMs = ms;
    tm.endAt = Date.now() + ms;
    tm.running = true;
    persist();
    renderTimer();
  }
  function pauseTimer() {
    state.timer.running = false;
    state.timer.remainingMs = remainingMsNow();
    state.timer.endAt = null;
    persist();
    renderTimer();
  }
  function resetTimer() {
    state.timer.running = false;
    state.timer.endAt = null;
    state.timer.remainingMs = durationMsFor(state.timer.mode);
    completingRef = false;
    persist();
    renderTimer();
  }
  function setMode(mode) {
    state.timer.mode = mode;
    state.timer.running = false;
    state.timer.endAt = null;
    state.timer.remainingMs = durationMsFor(mode);
    completingRef = false;
    persist();
    renderTimer();
  }
  function renderTimer() {
    const tm = state.timer;
    const remaining = remainingMsNow();
    const total = durationMsFor(tm.mode);
    const progress = total > 0 ? 1 - remaining / total : 0;
    const CIRC = 2 * Math.PI * 130; // r=130
    const progressEl = document.getElementById("dial-progress");
    if (progressEl) progressEl.setAttribute("stroke-dashoffset", String(CIRC * (1 - progress)));
    document.getElementById("timer-text").textContent = formatMs(remaining);
    document.getElementById("dock-timer").textContent = formatMs(remaining);
    const modeLabelEl = document.getElementById("timer-mode-label");
    if (modeLabelEl) modeLabelEl.textContent = t(modeLabelKey(tm.mode));
    const dockMode = document.getElementById("dock-mode");
    if (dockMode) dockMode.textContent = t(modeLabelKey(tm.mode));
    const toggleBtn = document.getElementById("btn-timer-toggle");
    if (toggleBtn) {
      const startText = toggleBtn.querySelector(".start-text");
      const startIcon = toggleBtn.querySelector(".start-icon");
      if (tm.running) {
        if (startText) startText.textContent = t("common.pause");
        if (startIcon) startIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      } else {
        if (startText) startText.textContent = t("common.start");
        if (startIcon) startIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      }
    }
    const dockBtn = document.getElementById("dock-toggle-btn");
    if (dockBtn) {
      dockBtn.innerHTML = tm.running
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      dockBtn.setAttribute("aria-label", tm.running ? t("dock.pause") : t("dock.start"));
    }
    document.title = tm.running
      ? `${formatMs(remaining)} · ${t(modeLabelKey(tm.mode))} · QuietHours`
      : "QuietHours · Static Port";
    document.getElementById("timer-focus-count").textContent = String(tm.focusCount);
    // Update title on Segmented
    document.querySelectorAll("#timer-modes button").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-mode") === tm.mode);
    });
  }
  // Tick every 250ms
  setInterval(() => {
    const tm = state.timer;
    if (tm.running) {
      const rem = remainingMsNow();
      if (rem <= 0 && !completingRef) {
        completingRef = true;
        completeSession();
        setTimeout(() => { completingRef = false; }, 250);
      } else {
        renderTimer();
      }
    }
  }, 250);

  // -------- Mixer UI (visual only — audio engine omitted in static port) -----
  function renderMixer() {
    const mx = state.mixer;
    const mv = document.getElementById("master-volume");
    const mvval = document.getElementById("master-volume-val");
    if (mv) mv.value = String(Math.round(mx.master * 100));
    if (mvval) mvval.textContent = String(Math.round(mx.master * 100));
    const icon = document.getElementById("master-vol-icon");
    if (icon) {
      if (mx.master < 0.01) {
        icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
      }
    }
    document.querySelectorAll(".track-row").forEach((row) => {
      const id = row.getAttribute("data-track");
      const tr = mx.tracks[id];
      if (!tr) return;
      const btn = row.querySelector(".icon-toggle");
      if (btn) btn.classList.toggle("active", !!tr.on);
      const slider = row.querySelector(".track-volume");
      if (slider) slider.value = String(Math.round(tr.volume * 100));
    });
  }

  // -------- Stats (Focus view + Insights) ------------------------------------
  function renderStats() {
    const now = new Date();
    // Next session
    const today = todayISO(now);
    const sorted = [...state.schedule]
      .filter((t) => t.date >= today)
      .sort((a, b) => combineDateTime(a.date, a.start).getTime() - combineDateTime(b.date, b.start).getTime());
    const next = sorted[0];
    const nextTitleEl = document.getElementById("stat-next-title");
    const nextSubEl = document.getElementById("stat-next-sub");
    if (nextTitleEl) nextTitleEl.textContent = next ? next.name : (currentLang === "vi" ? "Không có lịch" : "Nothing scheduled");
    if (nextSubEl) {
      if (!next) {
        nextSubEl.textContent = currentLang === "vi" ? "—" : "—";
      } else {
        const status = taskStatus(next, now);
        if (status === "active") {
          nextSubEl.textContent = `${t("focus.happeningNow")} · ${next.start}–${next.end}`;
        } else {
          const sDate = combineDateTime(next.date, next.start);
          const lbl = nextSessionLabel({ startDate: sDate.getTime() }, now.getTime());
          nextSubEl.textContent = `${formatTpl(t("focus.inX"), { label: lbl.label })} · ${next.start}–${next.end}`;
        }
      }
    }
    // Streak
    const streak = computeStreak(state.logs, now);
    const streakEl = document.getElementById("stat-streak");
    if (streakEl) streakEl.textContent = String(streak);
    const streakSub = document.getElementById("stat-streak-sub");
    const todayMins = minutesByDate(state.logs).get(today) || 0;
    if (streakSub) {
      streakSub.textContent = todayMins > 0
        ? `${minutesToLabel(todayMins)} ${t("focus.today").toLowerCase()}`
        : t("focus.noFocusToday");
    }
    // Week
    const weekMins = hoursThisWeek(state.logs, now);
    const statWeekEl = document.getElementById("stat-week");
    if (statWeekEl) statWeekEl.textContent = minutesToLabel(weekMins);
    // Insight summary cards
    const s1 = document.getElementById("insight-streak");
    if (s1) s1.textContent = String(streak);
    const s2 = document.getElementById("insight-today");
    if (s2) s2.textContent = minutesToLabel(todayMins);
    const s3 = document.getElementById("insight-week");
    if (s3) s3.textContent = minutesToLabel(weekMins);
  }

  // -------- Schedule ---------------------------------------------------------
  let scheduleViewMode = "daily";
  let selectedDay = todayISO();
  function renderWeekStrip() {
    const strip = document.getElementById("week-strip");
    if (!strip) return;
    strip.innerHTML = "";
    weekDays().forEach((d) => {
      const iso = todayISO(d);
      const count = state.schedule.filter((t) => t.date === iso).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "day-chip" + (iso === selectedDay ? " active" : "");
      btn.setAttribute("data-iso", iso);
      btn.innerHTML = `
        <span class="dow">${formatDayHeading(d)}</span>
        <span class="dom">${d.getDate()}</span>
        <span class="lunar">${formatLunarShort(iso)}</span>
        <span class="count">${count > 0 ? count + (count === 1 ? (currentLang === "vi" ? " buổi" : " sess") : (currentLang === "vi" ? " buổi" : " sess")) : ""}</span>`;
      btn.addEventListener("click", () => {
        selectedDay = iso;
        renderWeekStrip();
        renderSchedule();
      });
      strip.appendChild(btn);
    });
  }
  function renderSchedule() {
    const dailyView = document.getElementById("schedule-daily-view");
    const weeklyView = document.getElementById("schedule-weekly-view");
    const segBtns = document.querySelectorAll("#schedule-view-seg button");
    segBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-sched") === scheduleViewMode));
    if (dailyView) dailyView.style.display = scheduleViewMode === "daily" ? "" : "none";
    if (weeklyView) weeklyView.style.display = scheduleViewMode === "weekly" ? "" : "none";

    // Selected date banner (solar + lunar + can chi)
    const banner = document.getElementById("selected-day-banner");
    if (banner) {
      const d = new Date(selectedDay + "T00:00:00");
      const solarFull = d.toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });
      const lunarObj = solarToLunar(selectedDay);
      const ccDay = canChiDay(selectedDay);
      const ccYear = canChiYear(lunarObj.year);
      const lunarFull = (currentLang === "vi")
        ? `Âm ${String(lunarObj.day).padStart(2, "0")}/${String(lunarObj.month).padStart(2, "0")}${lunarObj.leap ? " N" : ""} năm ${ccYear} · Ngày ${ccDay}`
        : `Lunar ${String(lunarObj.day).padStart(2, "0")}/${String(lunarObj.month).padStart(2, "0")}${lunarObj.leap ? " (leap)" : ""}, ${ccYear} · ${ccDay}`;
      banner.innerHTML = `
        <p class="solar">${solarFull}</p>
        <p class="lunar">${lunarFull}</p>`;
    }

    // Daily
    const list = document.getElementById("task-list");
    if (list) {
      const ofDay = state.schedule
        .filter((t) => t.date === selectedDay)
        .sort((a, b) => a.start.localeCompare(b.start));
      list.innerHTML = "";
      if (ofDay.length === 0) {
        list.setAttribute("data-empty", t("schedule.noSessions"));
      } else {
        list.removeAttribute("data-empty");
        const now = new Date();
        ofDay.forEach((task) => {
          const status = taskStatus(task, now);
          const li = document.createElement("li");
          li.className = "task-item";
          const subject = state.subjects.find((s) => s.id === task.subjectId);
          const statusTone = status === "active" ? "sage" : status === "completed" ? "muted" : "sand";
          const typeToneMap = { study: "sage", lecture: "mist", review: "sand", break: "foam", other: "muted" };
          li.innerHTML = `
            <div class="task-times"><div>${task.start}</div><div>${task.end}</div></div>
            <div class="task-body">
              <div class="task-name-row">
                <p class="task-name"></p>
                <span class="badge badge-${statusTone}">${
                  status === "active" ? t("schedule.active") :
                  status === "completed" ? t("schedule.completed") : t("schedule.upcoming")
                }</span>
                <span class="badge badge-${typeToneMap[task.type] || "muted"}">${t("schedule.types." + task.type)}</span>
                ${subject ? `<span class="badge badge-${subject.tone}"></span>` : ""}
              </div>
              ${task.link ? `<a class="task-link" href="${task.link}" target="_blank" rel="noreferrer">${t("common.openLink")} ↗</a>` : ""}
            </div>
            <div class="task-actions">
              <button type="button" class="btn ${task.completed ? "btn-secondary" : "btn-ghost"} btn-sm" data-action="toggle">${task.completed ? t("common.undo") : t("common.done")}</button>
              <button type="button" class="btn btn-ghost btn-icon-sm" data-action="remove" aria-label="${t("common.delete")}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>`;
          li.querySelector(".task-name").textContent = task.name;
          if (subject) li.querySelector(".badge-" + subject.tone + ":last-of-type").textContent = subject.name;
          li.querySelector('[data-action="toggle"]').addEventListener("click", () => {
            state.schedule = state.schedule.map((t) => t.id === task.id ? { ...t, completed: !t.completed } : t);
            persist();
            renderSchedule();
            renderStats();
          });
          li.querySelector('[data-action="remove"]').addEventListener("click", () => {
            state.schedule = state.schedule.filter((t) => t.id !== task.id);
            persist();
            renderWeekStrip();
            renderSchedule();
            renderStats();
          });
          list.appendChild(li);
        });
      }
    }
    // Weekly grid
    const grid = document.getElementById("week-grid");
    if (grid) {
      grid.innerHTML = "";
      weekDays().forEach((d) => {
        const iso = todayISO(d);
        const items = state.schedule
          .filter((t) => t.date === iso)
          .sort((a, b) => a.start.localeCompare(b.start));
        const col = document.createElement("div");
        col.className = "week-day";
        const lunarShort = formatLunarShort(iso);
        col.innerHTML = `
          <p class="week-day-title">
            <span>${d.toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US", { weekday: "short", day: "numeric" })}</span>
            <span class="week-day-lunar">${lunarShort}</span>
          </p>
          <ul class="week-day-list"></ul>`;
        const ul = col.querySelector("ul");
        if (items.length === 0) {
          const li = document.createElement("li");
          li.className = "week-empty";
          li.textContent = t("schedule.free");
          ul.appendChild(li);
        } else {
          items.forEach((task) => {
            const now = new Date();
            const status = taskStatus(task, now);
            const li = document.createElement("li");
            li.className = "week-task" + (status === "completed" ? " completed" : "");
            li.innerHTML = `<p class="week-task-name"></p><p class="week-task-time">${task.start}–${task.end}</p>`;
            li.querySelector(".week-task-name").textContent = task.name;
            ul.appendChild(li);
          });
        }
        grid.appendChild(col);
      });
    }
    // Subject select (new session dialog)
    const sel = document.getElementById("sched-subject");
    if (sel) {
      sel.innerHTML = `<option value="">— ${t("common.none")} —</option>` +
        state.subjects.map((s) => `<option value="${s.id}"></option>`).join("");
      state.subjects.forEach((s, i) => {
        sel.options[i + 1].textContent = s.name;
      });
    }
    // Update sched-date lunar label when dialog opens
    updateSchedDateLunar();
  }
  function updateSchedDateLunar() {
    const dateInput = document.getElementById("sched-date");
    const lunarLabel = document.getElementById("sched-date-lunar");
    if (!dateInput || !lunarLabel) return;
    const iso = dateInput.value || selectedDay;
    const lunar = solarToLunar(iso);
    const ccYear = canChiYear(lunar.year);
    const ccDay = canChiDay(iso);
    lunarLabel.textContent = (currentLang === "vi")
      ? `Âm ${String(lunar.day).padStart(2, "0")}/${String(lunar.month).padStart(2, "0")}${lunar.leap ? " N" : ""} (${ccYear}) · ${ccDay}`
      : `Lunar ${String(lunar.day).padStart(2, "0")}/${String(lunar.month).padStart(2, "0")}${lunar.leap ? " (leap)" : ""} (${ccYear}) · ${ccDay}`;
  }

  // -------- Kanban -----------------------------------------------------------
  function renderKanban() {
    const cols = ["todo", "doing", "done"];
    cols.forEach((col) => {
      const ul = document.querySelector(`.board-col-body[data-col="${col}"]`);
      if (!ul) return;
      const count = state.kanban.filter((k) => k.column === col).length;
      const counter = document.getElementById("count-" + col);
      if (counter) counter.textContent = String(count);
      ul.innerHTML = "";
      const cards = state.kanban
        .filter((k) => k.column === col)
        .sort((a, b) => a.order - b.order);
      if (cards.length === 0) {
        const hint = document.createElement("li");
        hint.className = "drop-hint";
        hint.textContent = t("board.dropHere");
        ul.appendChild(hint);
      } else {
        cards.forEach((card) => {
          const subject = state.subjects.find((s) => s.id === card.subjectId);
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="kanban-card" draggable="true" data-id="${card.id}">
              <div class="kanban-card-head">
                <p class="kanban-title"></p>
                <div class="drop-menu-wrap">
                  <button class="kebab-btn" type="button" aria-label="Menu">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <div class="drop-menu" role="menu"></div>
                </div>
              </div>
              ${card.notes ? `<p class="kanban-notes"></p>` : ""}
              <div class="kanban-badges">
                <span class="badge badge-${card.priority}"></span>
                ${subject ? `<span class="badge badge-${subject.tone}"></span>` : ""}
                ${card.deadline ? `<span class="badge badge-muted"></span>` : ""}
              </div>
            </div>`;
          li.querySelector(".kanban-title").textContent = card.title;
          if (card.notes) li.querySelector(".kanban-notes").textContent = card.notes;
          li.querySelector(".badge-" + card.priority).textContent = t("board.priorityLabel." + card.priority);
          if (subject) li.querySelector(".badge-" + subject.tone).textContent = subject.name;
          if (card.deadline) li.querySelector(".badge-muted:last-of-type").textContent = (function () {
            const d = new Date(card.deadline + "T00:00:00");
            return d.toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US", { day: "2-digit", month: "short" });
          })();
          // Kebab menu
          const wrap = li.querySelector(".drop-menu-wrap");
          const menu = li.querySelector(".drop-menu");
          const kebab = li.querySelector(".kebab-btn");
          cols.filter((c) => c !== col).forEach((c) => {
            const b = document.createElement("button");
            b.type = "button";
            b.textContent = `${t("board.moveTo")} ${t(c === "todo" ? "board.toDo" : c === "doing" ? "board.inProgress" : "board.done")}`;
            b.addEventListener("click", (e) => {
              e.stopPropagation();
              moveKanbanCard(card.id, c);
              closeMenus();
            });
            menu.appendChild(b);
          });
          const del = document.createElement("button");
          del.type = "button";
          del.className = "danger";
          del.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="width:1rem;height:1rem"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path></svg> ${t("common.delete")}`;
          del.addEventListener("click", (e) => {
            e.stopPropagation();
            state.kanban = state.kanban.filter((k) => k.id !== card.id);
            persist();
            renderKanban();
            closeMenus();
          });
          menu.appendChild(del);
          kebab.addEventListener("click", (e) => {
            e.stopPropagation();
            const open = menu.classList.contains("open");
            closeMenus();
            if (!open) menu.classList.add("open");
          });
          // Drag handlers
          const c = li.querySelector(".kanban-card");
          c.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", card.id);
            e.dataTransfer.effectAllowed = "move";
            c.classList.add("dragging");
          });
          c.addEventListener("dragend", () => {
            c.classList.remove("dragging");
            document.querySelectorAll(".board-col").forEach((colEl) => colEl.classList.remove("drag-over"));
          });
          ul.appendChild(li);
        });
      }
    });
    // Subject select (card dialog)
    const sel = document.getElementById("card-subject");
    if (sel) {
      sel.innerHTML = `<option value="">— ${t("common.none")} —</option>` +
        state.subjects.map((s) => `<option value="${s.id}"></option>`).join("");
      state.subjects.forEach((s, i) => {
        sel.options[i + 1].textContent = s.name;
      });
    }
  }
  function closeMenus() {
    document.querySelectorAll(".drop-menu.open").forEach((m) => m.classList.remove("open"));
  }
  function moveKanbanCard(id, column) {
    const card = state.kanban.find((k) => k.id === id);
    if (!card) return;
    card.column = column;
    // Recompute order
    const colCards = state.kanban.filter((k) => k.column === column).sort((a, b) => a.order - b.order);
    colCards.forEach((c, i) => (c.order = i));
    persist();
    renderKanban();
  }

  // -------- Subjects (Data view) --------------------------------------------
  function renderSubjectChips() {
    const ul = document.getElementById("subject-chips");
    if (!ul) return;
    ul.innerHTML = "";
    state.subjects.forEach((s) => {
      const li = document.createElement("li");
      li.className = "subject-chip";
      li.textContent = s.name;
      ul.appendChild(li);
    });
  }

  // -------- Dynamic labels (i18n on computed text) --------------------------
  function updateDynamicLabels() {
    document.querySelectorAll("[data-empty]").forEach((el) => {
      if (el.tagName === "OL" && el.id === "task-list") {
        el.setAttribute("data-empty", t("schedule.noSessions"));
      }
    });
    document.querySelectorAll(".drop-hint").forEach((el) => {
      el.textContent = t("board.dropHere");
    });
  }

  // -------- Dialogs ----------------------------------------------------------
  function openDialog(id) {
    const d = document.getElementById(id);
    if (d) d.classList.add("open");
  }
  function closeDialog(id) {
    const d = document.getElementById(id);
    if (d) d.classList.remove("open");
  }

  // -------- Charts (Chart.js UMD) -------------------------------------------
  let barChartInstance = null;
  let donutChartInstance = null;
  function renderCharts() {
    if (typeof Chart === "undefined") return;
    const barCanvas = document.getElementById("chart-bar");
    const donutCanvas = document.getElementById("chart-donut");
    if (!barCanvas || !donutCanvas) return;

    const TONE_HEX = { sage: "#8a9e8e", sand: "#c4a574", clay: "#c47a6a", mist: "#8e9aa3", foam: "#7d9a7e" };

    // Daily 14 days
    const labels = [];
    const values = [];
    const map = minutesByDate(state.logs);
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = addDays(today, -i);
      const iso = todayISO(d);
      labels.push(d.toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US", { month: "short", day: "numeric" }));
      values.push(Number(((map.get(iso) || 0) / 60).toFixed(2)));
    }
    Chart.defaults.color = "#9a948a";
    Chart.defaults.borderColor = "#2c2924";
    Chart.defaults.font.family = 'Figtree, ui-sans-serif, system-ui, sans-serif';
    Chart.defaults.font.size = 12;

    if (barChartInstance) barChartInstance.destroy();
    barChartInstance = new Chart(barCanvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: t("insights.hours"),
          data: values,
          backgroundColor: "#8a9e8e",
          borderRadius: 6,
          maxBarThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1e1c19",
            titleColor: "#f2eee6",
            bodyColor: "#f2eee6",
            displayColors: false
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(242,238,230,0.06)" },
            ticks: {
              callback: (v) => `${v}${currentLang === "vi" ? "g" : "h"}`
            }
          }
        }
      }
    });

    // By subject donut
    const subjMap = minutesBySubject(state.logs);
    const rows = [...subjMap.entries()].map(([id, minutes]) => {
      const subject = state.subjects.find((s) => s.id === id);
      return {
        label: subject ? subject.name : t("common.none"),
        minutes,
        color: TONE_HEX[subject?.tone || "mist"]
      };
    });
    rows.sort((a, b) => b.minutes - a.minutes);
    if (donutChartInstance) donutChartInstance.destroy();
    donutChartInstance = new Chart(donutCanvas, {
      type: "doughnut",
      data: {
        labels: rows.map((r) => r.label),
        datasets: [{
          data: rows.map((r) => r.minutes),
          backgroundColor: rows.map((r) => r.color),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 10, padding: 16 } },
          tooltip: {
            backgroundColor: "#1e1c19",
            callbacks: {
              label: (ctx) => ` ${minutesToLabel(Number(ctx.raw))}`
            }
          }
        }
      }
    });
  }

  // -------- Export / Import / Reset -----------------------------------------
  function exportBackup() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const stamp = todayISO().replace(/-/g, "");
    a.download = `quiethours-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  async function importBackup(file) {
    const txt = await file.text();
    const obj = JSON.parse(txt);
    if (!obj || typeof obj !== "object") throw new Error(t("data.couldNotImport"));
    state = Object.assign(seedSampleData(), obj);
    // Clamp types for safety
    if (!Array.isArray(state.subjects)) state.subjects = [];
    if (!Array.isArray(state.schedule)) state.schedule = [];
    if (!Array.isArray(state.kanban)) state.kanban = [];
    if (!Array.isArray(state.logs)) state.logs = [];
    persist();
    renderAll();
  }
  function resetData() {
    const ok = window.confirm(
      currentLang === "vi"
        ? "Bạn có chắc chắn muốn xóa toàn bộ dữ liệu (lịch, công việc, thống kê)?"
        : "Delete ALL data (schedule, tasks, analytics)? This cannot be undone."
    );
    if (!ok) return;
    state = seedSampleData();
    persist();
    renderAll();
    alert(t("data.restored"));
  }

  // -------- Master render-all + init ----------------------------------------
  function renderAll() {
    renderTimer();
    renderMixer();
    renderWeekStrip();
    renderSchedule();
    renderKanban();
    renderSubjectChips();
    renderStats();
    // Update timer-settings dialog previews
    const s = state.timerSettings;
    document.getElementById("ts-focus").value = s.focusMin;
    document.getElementById("ts-short").value = s.shortBreakMin;
    document.getElementById("ts-long").value = s.longBreakMin;
    document.getElementById("ts-every").value = s.longBreakEvery;
    document.getElementById("ts-autostart").checked = !!s.autoStart;
    // Also update "desc" that contains {n} placeholder
    const descEl = document.querySelector("#dialog-timer .desc");
    if (descEl) descEl.textContent = formatTpl(t("timerSettings.desc"), { n: s.longBreakEvery });
    // Selected date in schedule dialog defaults to selectedDay
    document.getElementById("sched-date").value = selectedDay;
    // Chart only if Insights visible (or just render anyway)
    renderCharts();
  }

  // -------- Wire up events --------------------------------------------------
  function wireUI() {
    // Nav switching (all buttons with data-view, but exclude the buttons inside sidebar/footer nav that duplicate actions)
    document.querySelectorAll("[data-view]").forEach((btn) => {
      if (btn.tagName !== "BUTTON") return;
      btn.addEventListener("click", () => {
        const v = btn.getAttribute("data-view");
        if (v) switchView(v);
      });
    });

    // Language switcher
    const l1 = document.getElementById("lang-select");
    const l2 = document.getElementById("lang-select-mobile");
    const onChange = (e) => setLang(e.target.value);
    l1.value = currentLang;
    l2.value = currentLang;
    l1.addEventListener("change", onChange);
    l2.addEventListener("change", onChange);

    // Timer
    document.querySelectorAll("#timer-modes button").forEach((b) => {
      b.addEventListener("click", () => setMode(b.getAttribute("data-mode")));
    });
    document.getElementById("btn-timer-toggle").addEventListener("click", () => {
      state.timer.running ? pauseTimer() : startTimer();
    });
    document.getElementById("btn-timer-reset").addEventListener("click", resetTimer);
    document.getElementById("btn-open-timer-settings").addEventListener("click", () => openDialog("dialog-timer"));
    document.getElementById("btn-save-timer-settings").addEventListener("click", () => {
      const fm = (id, mn, mx, df) => {
        const raw = Number(document.getElementById(id).value);
        if (!Number.isFinite(raw) || raw < mn) return df;
        return Math.min(mx, raw);
      };
      state.timerSettings.focusMin = fm("ts-focus", 1, 180, 25);
      state.timerSettings.shortBreakMin = fm("ts-short", 1, 180, 5);
      state.timerSettings.longBreakMin = fm("ts-long", 1, 180, 15);
      state.timerSettings.longBreakEvery = fm("ts-every", 1, 12, 4);
      state.timerSettings.autoStart = !!document.getElementById("ts-autostart").checked;
      // Reset remaining if not running
      if (!state.timer.running) {
        state.timer.remainingMs = durationMsFor(state.timer.mode);
      }
      persist();
      renderAll();
      closeDialog("dialog-timer");
    });
    // Dock controls
    document.getElementById("dock-toggle-btn").addEventListener("click", () => {
      state.timer.running ? pauseTimer() : startTimer();
    });
    document.getElementById("dock-open-focus").addEventListener("click", () => switchView("focus"));

    // Keyboard shortcuts (Space → play/pause timer)
    window.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      if (e.code === "Space") {
        e.preventDefault();
        state.timer.running ? pauseTimer() : startTimer();
      }
      if (e.key === "Escape") {
        closeDialog("dialog-timer");
        closeDialog("dialog-schedule");
        closeDialog("dialog-card");
        closeMenus();
      }
    });

    // Mixer UI
    document.getElementById("master-volume").addEventListener("input", (e) => {
      state.mixer.master = Number(e.target.value) / 100;
      persist();
      renderMixer();
    });
    document.querySelectorAll(".track-row").forEach((row) => {
      const id = row.getAttribute("data-track");
      const btn = row.querySelector(".icon-toggle");
      const slider = row.querySelector(".track-volume");
      btn.addEventListener("click", () => {
        state.mixer.tracks[id].on = !state.mixer.tracks[id].on;
        persist();
        renderMixer();
      });
      slider.addEventListener("input", (e) => {
        const v = Number(e.target.value) / 100;
        state.mixer.tracks[id].volume = v;
        if (v > 0 && !state.mixer.tracks[id].on) state.mixer.tracks[id].on = true;
        persist();
        renderMixer();
      });
    });

    // Schedule: view mode
    document.querySelectorAll("#schedule-view-seg button").forEach((b) => {
      b.addEventListener("click", () => {
        scheduleViewMode = b.getAttribute("data-sched");
        renderSchedule();
      });
    });
    document.getElementById("btn-add-session").addEventListener("click", () => {
      document.getElementById("sched-name").value = "";
      document.getElementById("sched-date").value = selectedDay;
      document.getElementById("sched-start").value = "09:00";
      document.getElementById("sched-end").value = "10:00";
      document.getElementById("sched-type").value = "study";
      document.getElementById("sched-subject").value = "";
      document.getElementById("sched-link").value = "";
      openDialog("dialog-schedule");
      updateSchedDateLunar();
    });
    document.getElementById("sched-date").addEventListener("input", updateSchedDateLunar);
    document.getElementById("form-schedule").addEventListener("submit", () => {
      const name = document.getElementById("sched-name").value.trim();
      const date = document.getElementById("sched-date").value || selectedDay;
      const start = document.getElementById("sched-start").value || "09:00";
      const end = document.getElementById("sched-end").value || "10:00";
      const type = document.getElementById("sched-type").value;
      const subjectId = document.getElementById("sched-subject").value || undefined;
      const link = document.getElementById("sched-link").value.trim() || undefined;
      if (!name) return;
      const sd = combineDateTime(date, start);
      const ed = combineDateTime(date, end);
      if (ed.getTime() <= sd.getTime()) return;
      state.schedule.push({
        id: uid(),
        name, date, start, end,
        type: ["study", "lecture", "review", "break", "other"].includes(type) ? type : "study",
        link, completed: false, subjectId
      });
      persist();
      renderWeekStrip();
      renderSchedule();
      renderStats();
      closeDialog("dialog-schedule");
    });

    // Board: add card dialog
    document.getElementById("btn-add-card").addEventListener("click", () => {
      document.getElementById("card-title").value = "";
      document.getElementById("card-notes").value = "";
      document.getElementById("card-priority").value = "medium";
      document.getElementById("card-column").value = "todo";
      document.getElementById("card-deadline").value = "";
      document.getElementById("card-subject").value = "";
      openDialog("dialog-card");
    });
    document.getElementById("form-card").addEventListener("submit", () => {
      const title = document.getElementById("card-title").value.trim();
      if (!title) return;
      const notes = document.getElementById("card-notes").value.trim() || undefined;
      const priority = (function (v) { return v === "low" || v === "medium" || v === "high" ? v : "medium"; })(document.getElementById("card-priority").value);
      const column = (function (v) { return v === "todo" || v === "doing" || v === "done" ? v : "todo"; })(document.getElementById("card-column").value);
      const deadline = document.getElementById("card-deadline").value || undefined;
      const subjectId = document.getElementById("card-subject").value || undefined;
      const order = state.kanban.filter((k) => k.column === column).length;
      state.kanban.push({ id: uid(), title, notes, priority, column, deadline, subjectId, order });
      persist();
      renderKanban();
      closeDialog("dialog-card");
    });

    // Kanban drag-drop on columns
    document.querySelectorAll(".board-col-body").forEach((ul) => {
      const col = ul.getAttribute("data-col");
      const colEl = ul.parentElement;
      ul.addEventListener("dragover", (e) => {
        e.preventDefault();
        colEl.classList.add("drag-over");
      });
      ul.addEventListener("dragleave", () => colEl.classList.remove("drag-over"));
      ul.addEventListener("drop", (e) => {
        e.preventDefault();
        colEl.classList.remove("drag-over");
        const id = e.dataTransfer.getData("text/plain");
        if (id) moveKanbanCard(id, col);
      });
    });
    // Close drop menus when clicking outside
    document.addEventListener("click", () => closeMenus());

    // Data view: subjects + backup + reset
    document.getElementById("subject-form").addEventListener("submit", () => {
      const name = document.getElementById("subject-name").value.trim();
      if (!name) return;
      const tone = TONES[state.subjects.length % TONES.length];
      state.subjects.push({ id: uid(), name, tone });
      persist();
      document.getElementById("subject-name").value = "";
      renderSubjectChips();
      renderSchedule();
      renderKanban();
      renderCharts();
    });
    document.getElementById("btn-export").addEventListener("click", exportBackup);
    document.getElementById("file-import").addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      const errEl = document.getElementById("import-error");
      errEl.style.display = "none";
      if (!f) return;
      importBackup(f).catch((err) => {
        errEl.textContent = err && err.message ? err.message : t("data.couldNotImport");
        errEl.style.display = "block";
      }).finally(() => {
        e.target.value = "";
      });
    });
    document.getElementById("btn-reset").addEventListener("click", resetData);

    // Close dialogs via backdrop click / [data-dialog-close]
    document.querySelectorAll(".dialog-backdrop").forEach((bd) => {
      bd.addEventListener("click", (e) => {
        if (e.target === bd) bd.classList.remove("open");
      });
    });
    document.querySelectorAll("[data-dialog-close]").forEach((b) => {
      b.addEventListener("click", () => closeDialog(b.getAttribute("data-dialog-close")));
    });
  }

  // -------- Bootstrap --------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
    wireUI();
    renderAll();
    // Restore last view
    try {
      const saved = sessionStorage.getItem("quiethours-static-view");
      if (saved) switchView(saved);
    } catch (_) {}
  });
})();
