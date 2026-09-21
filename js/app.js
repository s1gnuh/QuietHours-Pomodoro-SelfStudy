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
      nav: { focus: "Tập trung", schedule: "Lịch học", board: "Bảng việc", insights: "Thống kê", data: "Dữ liệu", guide: "Cảm ơn & HD" },
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
      quotes: {
        title: "Cảm hứng hôm nay", next: "Câu khác", copied: "Đã sao chép ✨",
        subtitle: "Lấy một chút động lực cho phiên học tập của bạn."
      },
      appearance: {
        title: "Giao diện",
        desc: "Chọn màu nhấn Accent và hình nền động — được lưu tự động cho các lần sau.",
        themes: "Màu nhấn",
        backgrounds: "Hình nền",
        bgNone: "Mặc định",
        bgRain: "Cửa sổ mưa",
        bgLofi: "Lofi Pixel",
        bgCyber: "Cyber Neon"
      },
      report: {
        openWeekly: "Thẻ tổng kết tuần",
        title: "Thẻ tổng kết tuần",
        range: "{start} → {end}",
        app: "QuietHours",
        days: "ngày",
        thisWeek: "Tổng giờ tuần này",
        sessions: "phiên tập trung",
        topSubject: "Môn học nhiều nhất",
        bestDay: "Ngày năng suất nhất",
        downloadStory: "Tải ảnh Story",
        tagline: "Tuần này tôi đã học",
        focusHours: "Giờ tập trung",
        dayStreak: "Ngày liên tục",
        prepDownload: "Đang chuẩn bị ảnh...",
        downloaded: "Đã tải! 🌿",
        notAvailable: "Thư viện html2canvas chưa được tải. Vui lòng kiểm tra mạng.",
        mon: "Thứ 2", tue: "Thứ 3", wed: "Thứ 4", thu: "Thứ 5", fri: "Thứ 6", sat: "Thứ 7", sun: "Chủ nhật",
        todayShort: "Hôm nay"
      },
      guide: {
        kicker: "Góc nhỏ",
        title: "Cảm ơn & Hướng dẫn sử dụng",
        subtitle: "Những điều nhỏ xinh bạn nên biết để đồng hành cùng QuietHours thật hiệu quả.",
        letterTitle: "Thư gửi bạn - người sử dụng QuietHours",
        letterFrom: "Tác giả · s1gnuh · một người luôn tin vào sức mạnh của thói quen nhỏ.",
        dataTitle: "Về dữ liệu của bạn - Lưu ý quan trọng",
        h1Title: "Duy trì Streak và quy tắc đứt chuỗi",
        h1Sub: "Chuỗi ngày học tập liên tục - nguồn động lực vô hình đáng giá nhất.",
        h1p1: "✅ <b>Cách tính Streak:</b> Tính từ hôm nay (hoặc hôm qua nếu hôm nay chưa học), lùi về phía trước đếm số ngày liên tiếp bạn đã hoàn thành <b>ít nhất 1 phiên Pomodoro Tập trung</b> (log ghi nhận).",
        h1p2: "✅ <b>Mẹo duy trì:</b> Đừng để ngày \"trắng\"! Ngày bận quá cũng hãy hoàn thành <b>ít nhất 1 Pomodoro ngắn</b> (25 phút) - một chút còn hơn mất trắng, giúp Streak không bị đứt.",
        h1p3: "❌ <b>Đứt chuỗi:</b> Bỏ lỡ 1 ngày bất kỳ trong chuỗi → Streak reset về 0 vào ngày hôm sau. Đừng quá buồn nhé, thói quen tốt đáng để ta bắt đầu lại bất cứ lúc nào.",
        h1p4: "💡 <b>Trick:</b> Đặt lịch Pomodoro 25 phút đầu ngày làm nhiệm vụ \"đánh dấu có mặt\" - bạn sẽ ngạc nhiên vì mức độ hiệu quả của nó.",
        h2Title: "Tạo & lưu Sound Mixes cá nhân (Atmosphere)",
        h2Sub: "Lập không gian âm thanh yêu thích của riêng bạn - mưa, quán cà phê, lửa trại, sóng biển, lofi...",
        h2p1: "✅ Mở tab <b>Tập trung</b>, tìm thẻ <b>Atmosphere</b> (Ambient Mixer).",
        h2p2: "✅ Bật các track (Mưa, Quán cà phê, Biển, Lò sưởi, Lofi beat) bằng nút 🔘, kéo thanh trượt Volume để cân bằng độ lớn theo ý thích.",
        h2p3: "✅ Tăng giảm <b>Master Volume</b> (âm lượng tổng) nhanh chóng.",
        h2p4: "💾 <b>Tự động lưu:</b> mọi thay đổi của bạn (bật/tắt track, volume) được lưu tự động vào Local Storage. Lần sau khi mở web, Mix yêu thích của bạn vẫn nguyên vẹn.",
        h2p5: "💡 <b>Mẹo mix ngon:</b> Mưa (60%) + Quán cà phê (25%) + Master 50% = hiệu quả work từ 2-3 tiếng không mệt.",
        h3Title: "Sử dụng Zen Mode & Xuất ảnh Story chia sẻ",
        h3Sub: "Tập trung cực sâu + khoe thành tích tuần 1 cách đẹp mắt lên MXH.",
        h3p1: "🧘 <b>Zen Mode (tối giản toàn màn hình):</b> Tìm nút \"Chuyển sang chế độ toàn màn hình / Chế độ Zen\" trên thanh công cụ. Các thanh điều hướng, thẻ phụ sẽ ẩn đi, chỉ giữ lại Đồng hồ Pomodoro nghệ thuật + câu Quote truyền cảm hứng. Nhấn <code>ESC</code> hoặc nút \"Thoát Zen\" để về giao diện bình thường.",
        h3p2: "📊 <b>Thẻ Tổng Kết Tuần:</b> Mở tab <b>Thống kê</b>, bấm nút <b>Thẻ tổng kết tuần</b>. Một Modal hiện ra với: tổng giờ học, Streak, Môn học nhiều nhất, Ngày năng suất nhất, biểu đồ ngày trong tuần và 1 câu quote ngẫu nhiên.",
        h3p3: "📸 <b>Tải ảnh Story 9:16:</b> Trong Modal Tổng kết tuần, bấm nút <b>Tải ảnh Story</b>. Ứng dụng sẽ dựng một thẻ tỉ lệ <b>9:16</b> (chuẩn Instagram / Facebook Story) với gradient hiện đại, chụp bằng thư viện <code>html2canvas</code> và tự động tải về máy. Bạn chỉ cần đăng tải lên MXH thôi!",
        h3p4: "💡 <b>Chia sẻ hay nói gì?</b> Đừng quên tag <code>@quiethours</code> / hashtag <code>#quiethours</code> / <code>#s1gnuh</code> để mình có thể thấy và vui cùng bạn 💚"
      },
      lang: { switch: "Chuyển ngôn ngữ" }
    },
    en: {
      brand: { tagline: "Your private study room", localOnly: "Your data stays in this browser only." },
      nav: { focus: "Focus", schedule: "Schedule", board: "Board", insights: "Insights", data: "Data", guide: "Guide" },
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
      quotes: {
        title: "Today's inspiration", next: "Next quote", copied: "Copied ✨",
        subtitle: "A small bit of fuel for your study session."
      },
      appearance: {
        title: "Appearance",
        desc: "Pick an accent color and a dynamic background — saved automatically for next time.",
        themes: "Accent color",
        backgrounds: "Background",
        bgNone: "Default",
        bgRain: "Rainy window",
        bgLofi: "Lofi Pixel",
        bgCyber: "Cyber Neon"
      },
      report: {
        openWeekly: "Weekly report card",
        title: "Weekly report card",
        range: "{start} → {end}",
        app: "QuietHours",
        days: "days",
        thisWeek: "This week",
        sessions: "focus sessions",
        topSubject: "Top subject",
        bestDay: "Most productive day",
        downloadStory: "Download Story",
        tagline: "This week I studied",
        focusHours: "Focus hours",
        dayStreak: "Day streak",
        prepDownload: "Preparing image...",
        downloaded: "Downloaded! 🌿",
        notAvailable: "html2canvas not loaded. Please check your network.",
        mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
        todayShort: "Today"
      },
      guide: {
        kicker: "A little corner",
        title: "Thank you & How to use",
        subtitle: "Small things worth knowing to make the most of QuietHours.",
        letterTitle: "A letter to you — the QuietHours user",
        letterFrom: "Author · s1gnuh · someone who always believes in the power of small habits.",
        dataTitle: "About your data — important notice",
        h1Title: "Keep your Streak & how streak resets",
        h1Sub: "Consecutive study days — the most valuable invisible motivator.",
        h1p1: "✅ <b>How Streak is counted:</b> starting from today (or yesterday if you haven't studied yet today), go backwards and count consecutive days with <b>at least 1 completed Focus Pomodoro session</b> (logged).",
        h1p2: "✅ <b>Tip to maintain:</b> don't let a day go \"blank\"! On super busy days, still finish <b>at least 1 short Pomodoro</b> (25 min) — anything is better than losing a streak.",
        h1p3: "❌ <b>Breaking the streak:</b> miss any single day → the streak resets to 0 the next day. Don't be sad — good habits are always worth restarting.",
        h1p4: "💡 <b>Trick:</b> schedule a 25-min Pomodoro first thing in the morning as a \"check-in\" — you'll be surprised how effective it is.",
        h2Title: "Create & save personal Sound Mixes (Atmosphere)",
        h2Sub: "Build your own favorite audio space — rain, café, fireplace, ocean waves, lofi...",
        h2p1: "✅ Open the <b>Focus</b> tab, find the <b>Atmosphere</b> card (Ambient Mixer).",
        h2p2: "✅ Toggle tracks (Rain, Café, Ocean, Fireplace, Lofi beat) with the 🔘 buttons, drag Volume sliders to taste.",
        h2p3: "✅ Tweak <b>Master Volume</b> anytime.",
        h2p4: "💾 <b>Auto-save:</b> all changes (track on/off, volume) persist automatically in Local Storage. Your mix is still there next time you open QuietHours.",
        h2p5: "💡 <b>Tasty mix tip:</b> Rain (60%) + Café (25%) + Master 50% = a sweet 2–3 hour deep work vibe.",
        h3Title: "Use Zen Mode & share a Story image",
        h3Sub: "Go ultra-deep focused + show off weekly wins beautifully on social media.",
        h3p1: "🧘 <b>Zen Mode (distraction-free fullscreen):</b> look for the \"Go fullscreen / Zen Mode\" button on the toolbar. Sidebars and extra cards hide, leaving only the artistic Pomodoro clock + the inspiring quote. Press <code>ESC</code> or the \"Exit Zen\" button to return.",
        h3p2: "📊 <b>Weekly report card:</b> open the <b>Insights</b> tab, click <b>Weekly report card</b>. A modal reveals total hours, Streak, top subject, best day, per-day mini bars, plus a random quote.",
        h3p3: "📸 <b>Download 9:16 Story:</b> inside the Weekly modal, click <b>Download Story</b>. The app renders a <b>9:16</b> Instagram/Facebook Story-sized card with a modern gradient, captures it with <code>html2canvas</code>, and auto-downloads a PNG. Just share!",
        h3p4: "💡 <b>What to say when sharing:</b> tag <code>@quiethours</code> / use <code>#quiethours</code> / <code>#s1gnuh</code> so I can celebrate with you 💚"
      },
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
    renderQuote();
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

  // -------- Quotes module ---------------------------------------------------
  const Quotes = (function () {
    const STORAGE_URL = "data/quotes.json";
    const QUOTE_LAST_ID_KEY = "quiethours-static-last-quote-id";
    let cache = null;
    let lastShownId = null;
    let isLoading = false;
    const pending = [];
    async function load() {
      if (cache) return cache;
      if (isLoading) {
        return new Promise((res) => pending.push(res));
      }
      isLoading = true;
      try {
        const resp = await fetch(STORAGE_URL, { cache: "no-cache" });
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const arr = await resp.json();
        if (Array.isArray(arr) && arr.length > 0) {
          cache = arr;
        }
      } catch (_) {
        // Fallback mini quotes if fetch fails (e.g. file://)
        cache = getFallbackQuotes();
      } finally {
        isLoading = false;
        while (pending.length) pending.shift()(cache);
      }
      return cache;
    }
    function getFallbackQuotes() {
      return [
        { id: "fb01", vi: "Bắt đầu từ nơi bạn đang đứng, dùng những gì bạn có, làm điều gì đó bạn có thể.", en: "Start where you are. Use what you have. Do what you can." },
        { id: "fb02", vi: "Không có ai trở nên giỏi bằng cách chần chừ, chỉ có hành động mới rèn luyện kỹ năng.", en: "Nobody gets good by postponing things — only practice sharpens skill." },
        { id: "fb03", vi: "Sự khác biệt giữa người giỏi và người xuất sắc là tần suất luyện tập những gì họ biết.", en: "The gap between good and excellent is how often you practice what you already know." },
        { id: "fb04", vi: "Đừng đợi cảm hứng đến. Hãy hành động như thể nó đã ở đó.", en: "Do not wait for inspiration. Act as if it were already here." },
        { id: "fb05", vi: "Một pomodoro 25 phút hôm nay vẫn hơn một toàn bộ ngày hoàn hảo mà không bao giờ đến.", en: "One messy 25-minute pomodoro today beats a perfect day that never comes." }
      ];
    }
    function pick(list, lang) {
      if (!list || list.length === 0) return null;
      const fallbackText = (q) => (lang === "vi" ? q.vi : q.en) || q.vi || q.en;
      let maxTries = Math.min(8, list.length);
      while (maxTries-- > 0) {
        const q = list[Math.floor(Math.random() * list.length)];
        if (q && q.id !== lastShownId && fallbackText(q)) {
          lastShownId = q.id;
          try { localStorage.setItem(QUOTE_LAST_ID_KEY, String(q.id)); } catch (_) {}
          return { id: q.id, text: fallbackText(q), vi: q.vi, en: q.en };
        }
      }
      const q = list[Math.floor(Math.random() * list.length)];
      lastShownId = q.id;
      return { id: q.id, text: fallbackText(q), vi: q.vi, en: q.en };
    }
    async function random(langOverride) {
      const list = await load();
      return pick(list, langOverride || currentLang || "vi");
    }
    function allLoaded() { return cache; }
    // Seed last seen id to avoid repeat on page reload
    try {
      const s = localStorage.getItem(QUOTE_LAST_ID_KEY);
      if (s) lastShownId = s;
    } catch (_) {}
    return { load, random, allLoaded };
  })();

  async function renderQuote() {
    const root = document.getElementById("quote-card");
    if (!root) return;
    const textEl = document.getElementById("quote-text");
    const nextBtn = document.getElementById("quote-next");
    const copyBtn = document.getElementById("quote-copy");
    if (!textEl) return;
    textEl.textContent = "";
    const loader = document.createElement("span");
    loader.className = "quote-loading-dots";
    loader.textContent = "…";
    textEl.appendChild(loader);
    const q = await Quotes.random(currentLang);
    if (q) textEl.textContent = q.text;
    if (copyBtn) {
      copyBtn.onclick = async () => {
        if (!q) return;
        const txt = q.text || q.vi || q.en;
        try {
          await navigator.clipboard.writeText(txt);
          const prev = copyBtn.textContent;
          copyBtn.textContent = t("quotes.copied");
          copyBtn.classList.add("quote-copied-flash");
          setTimeout(() => {
            copyBtn.textContent = prev;
            copyBtn.classList.remove("quote-copied-flash");
          }, 1200);
        } catch (_) {}
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => renderQuote();
    }
  }

  // -------- Appearance (Themes + Backgrounds) ----------------------------
  const Appearance = (function () {
    const THEME_KEY = "quiethours-static-theme";
    const BG_KEY = "quiethours-static-bg";
    const VALID_THEMES = ["sage", "sunset", "lavender", "ocean", "cyber"];
    const VALID_BGS = ["none", "rain", "lofi", "cyber"];
    let currentTheme = "sage";
    let currentBg = "none";

    function applyClasses() {
      const body = document.body;
      VALID_THEMES.forEach((t) => body.classList.remove("theme-" + t));
      body.classList.add("theme-" + currentTheme);
      VALID_BGS.forEach((b) => body.classList.remove("bg-" + b));
      body.classList.add("bg-" + currentBg);
    }
    function init() {
      try {
        const t = localStorage.getItem(THEME_KEY);
        if (VALID_THEMES.includes(t)) currentTheme = t;
        const b = localStorage.getItem(BG_KEY);
        if (VALID_BGS.includes(b)) currentBg = b;
      } catch (_) {}
      applyClasses();
    }
    function setTheme(id) {
      if (!VALID_THEMES.includes(id)) return;
      currentTheme = id;
      try { localStorage.setItem(THEME_KEY, id); } catch (_) {}
      applyClasses();
      refreshActiveSwatches();
    }
    function setBackground(id) {
      if (!VALID_BGS.includes(id)) return;
      currentBg = id;
      try { localStorage.setItem(BG_KEY, id); } catch (_) {}
      applyClasses();
      refreshActiveSwatches();
    }
    function getTheme() { return currentTheme; }
    function getBg() { return currentBg; }
    function refreshActiveSwatches() {
      document.querySelectorAll(".theme-swatches .swatch[data-theme]").forEach((sw) => {
        sw.classList.toggle("active", sw.getAttribute("data-theme") === currentTheme);
      });
      document.querySelectorAll(".bg-swatches .sw-bg[data-bg]").forEach((sw) => {
        sw.classList.toggle("active", sw.getAttribute("data-bg") === currentBg);
      });
    }
    return { init, theme: setTheme, background: setBackground, getTheme, getBg, refreshActiveSwatches };
  })();

  // -------- Reports (Weekly card + Story export PNG) ----------------------
  const Reports = (function () {
    const DOW_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    function pad(n) { return String(n).padStart(2, "0"); }
    function dowLabel(d, isToday) {
      const k = DOW_KEYS[d.getDay() === 0 ? 6 : d.getDay() - 1];
      let base = t("report." + k);
      const todayIso = todayISO();
      const iso = todayISO(d);
      if (isToday && iso === todayIso) base += " · " + t("report.todayShort");
      return base;
    }
    function isoDM(d) {
      return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
    }
    function computeWeekData(asOf = new Date()) {
      const days = weekDays(asOf); // Mon..Sun
      const isoSet = new Set(days.map(todayISO));
      const weekLogs = state.logs.filter((l) => isoSet.has(l.date));
      const totalMin = weekLogs.reduce((s, l) => s + (l.minutes || 0), 0);
      const sessions = weekLogs.length;
      // Per-day minutes
      const perDay = days.map((d) => 0);
      weekLogs.forEach((l) => {
        const ld = parseISO(l.date);
        if (!ld) return;
        const idx = days.findIndex((d) => todayISO(d) === l.date);
        if (idx >= 0) perDay[idx] += l.minutes || 0;
      });
      // Streak
      const streak = computeStreak(state.logs, asOf);
      // Top subject
      const bySubj = minutesBySubject(weekLogs);
      let topSubject = null, topMin = 0;
      bySubj.forEach((mins, id) => {
        if (mins > topMin) { topMin = mins; topSubject = id; }
      });
      const topSubjName = topSubject ? (topSubject === "__none__" ? t("common.none") : (state.subjects.find((s) => s.id === topSubject)?.name || t("common.none"))) : "—";
      // Best day
      let bestIdx = -1, bestMin = 0;
      perDay.forEach((m, i) => { if (m > bestMin) { bestMin = m; bestIdx = i; } });
      const bestDayName = bestIdx >= 0 ? dowLabel(days[bestIdx]) : "—";
      const bestDayMin = bestIdx >= 0 ? bestMin : 0;
      // Quote
      let quoteTxt = "";
      try {
        const q = Quotes.random();
        quoteTxt = currentLang === "vi" ? (q.vi || "") : (q.en || "");
      } catch (_) {
        quoteTxt = currentLang === "vi"
          ? "Hành trình ngàn dặm bắt đầu từ một bước chân. — Lão Tử"
          : "A journey of a thousand miles begins with a single step. — Lao Tzu";
      }
      return { days, perDay, totalMin, sessions, streak, topSubject, topSubjName, topMin, bestIdx, bestDayName, bestDayMin, quoteTxt };
    }
    function barsHTML(container, perDay, days, vertical = false, accent = "var(--color-accent)") {
      container.innerHTML = "";
      const max = Math.max(1, ...perDay);
      const todayIso = todayISO();
      perDay.forEach((min, i) => {
        const pct = Math.max(2, Math.round((min / max) * 100));
        const wrap = document.createElement("div");
        wrap.className = vertical ? "sc-bar-col" : "bar-col";
        const d = days[i];
        const label = document.createElement("span");
        label.className = vertical ? "sc-bar-lbl" : "bar-lbl";
        label.textContent = DOW_SHORT_LABEL(d);
        if (todayISO(d) === todayIso) label.classList.add("today");
        wrap.appendChild(label);
        const track = document.createElement("div");
        track.className = vertical ? "sc-bar-track" : "bar-track";
        const bar = document.createElement("div");
        bar.className = vertical ? "sc-bar-fill" : "bar-fill";
        bar.style.setProperty("--h", pct + "%");
        bar.style.background = accent;
        track.appendChild(bar);
        wrap.appendChild(track);
        const val = document.createElement("span");
        val.className = vertical ? "sc-bar-val" : "bar-val";
        const rounded = Math.round(min);
        if (rounded === 0) val.textContent = "—";
        else if (rounded < 60) val.textContent = rounded + (currentLang === "vi" ? "p" : "m");
        else val.textContent = (rounded / 60).toFixed(rounded % 60 === 0 ? 0 : 1) + (currentLang === "vi" ? "g" : "h");
        wrap.appendChild(val);
        container.appendChild(wrap);
      });
    }
    function DOW_SHORT_LABEL(d) {
      const keys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
      return t("report." + keys[d.getDay() === 0 ? 6 : d.getDay() - 1]);
    }
    function openWeekly() {
      const W = computeWeekData();
      // Header range
      const rng = document.getElementById("weekly-range");
      if (rng) rng.textContent = formatTpl(t("report.range"), { start: isoDM(W.days[0]), end: isoDM(W.days[6]) });
      const wcWeek = document.getElementById("wc-week");
      if (wcWeek) wcWeek.textContent = `${isoDM(W.days[0])} → ${isoDM(W.days[6])}`;
      const scWeek = document.getElementById("sc-week");
      if (scWeek) scWeek.textContent = `WEEK ${isoDM(W.days[0])} – ${isoDM(W.days[6])}`;
      document.getElementById("wc-streak").textContent = String(W.streak);
      document.getElementById("sc-streak").textContent = String(W.streak);
      document.getElementById("wc-hours").textContent = minutesToLabel(W.totalMin);
      document.getElementById("sc-hours").textContent = minutesToLabel(W.totalMin);
      const sesLbl = currentLang === "vi" ? "phiên" : "sessions";
      document.getElementById("wc-sessions").textContent = `${W.sessions} ${sesLbl} · ${t("report.sessions")}`;
      document.getElementById("sc-sessions").textContent = String(W.sessions);
      // Top subject
      document.getElementById("wc-top-subject").textContent = W.topSubjName;
      document.getElementById("sc-top-subject").textContent = W.topSubjName;
      document.getElementById("wc-top-subject-min").textContent = minutesToLabel(W.topMin);
      // Best day
      document.getElementById("wc-best-day").textContent = W.bestDayName;
      document.getElementById("sc-best-day").textContent = W.bestDayName;
      document.getElementById("wc-best-day-min").textContent = minutesToLabel(W.bestDayMin);
      // Bars
      const wcBars = document.getElementById("wc-bars");
      if (wcBars) barsHTML(wcBars, W.perDay, W.days, false);
      const scBars = document.getElementById("sc-bars");
      if (scBars) barsHTML(scBars, W.perDay, W.days, true, "#d9f99d");
      // Quote
      document.getElementById("wc-quote-text").textContent = W.quoteTxt;
      document.getElementById("sc-quote-text").textContent = W.quoteTxt;
      // Footer encouragement
      const ftr = document.getElementById("wc-footer");
      if (ftr) {
        if (W.streak >= 7) ftr.textContent = currentLang === "vi" ? "Một tuần tuyệt vời! Tiếp tục nào 🔥" : "Incredible week! Keep going 🔥";
        else if (W.totalMin >= 10 * 60) ftr.textContent = currentLang === "vi" ? "Hơn 10 giờ tuần này. Vạn sự khởi đầu nan 💚" : "Over 10 hours this week — incredible 💚";
        else if (W.sessions > 0) ftr.textContent = currentLang === "vi" ? "Mỗi nỗ lực đều đáng giá. Keep going! 🌿" : "Every minute counts. Keep going! 🌿";
        else ftr.textContent = currentLang === "vi" ? "Tuần này chưa có phiên nào — bắt đầu từ hôm nay nhé! ✨" : "No sessions logged yet. Start with one pomodoro today ✨";
      }
      openDialog("dialog-weekly");
    }
    async function downloadStory() {
      const status = document.getElementById("share-status");
      if (typeof html2canvas !== "function") {
        if (status) status.textContent = t("report.notAvailable");
        return;
      }
      if (status) status.textContent = t("report.prepDownload");
      const root = document.getElementById("story-card-root");
      const card = document.getElementById("story-card");
      try {
        root.style.display = "block";
        root.style.position = "fixed";
        root.style.left = "-10000px";
        root.style.top = "0px";
        // Wait for layout
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        const canvas = await html2canvas(card, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          logging: false
        });
        const W = computeWeekData();
        const fname = `quiethours-story-Tuan${pad(W.days[0].getDate())}${pad(W.days[0].getMonth() + 1)}-${pad(W.days[6].getDate())}${pad(W.days[6].getMonth() + 1)}.png`;
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = fname;
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (status) status.textContent = t("report.downloaded");
        setTimeout(() => { if (status && document.body.contains(status)) status.textContent = ""; }, 3200);
      } catch (e) {
        if (status) status.textContent = currentLang === "vi" ? "Không thể tạo ảnh, thử lại nhé." : "Couldn't create image. Please try again.";
        console.error(e);
      } finally {
        root.style.display = "";
        root.style.position = "";
        root.style.left = "";
        root.style.top = "";
      }
    }
    return { openWeekly, downloadStory, computeWeekData };
  })();

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

  // -------- Ambient Mixer — Web Audio procedural engine ----------------------
  // Generates all 5 ambient tracks procedurally using AudioNodes (no audio files needed)
  const AmbientEngine = (function () {
    let ctx = null;
    let masterGain = null;
    const tracks = {};
    let unlocked = false;

    function ensureCtx() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(ctx.destination);
      }
      if (ctx && !unlocked && ctx.state === "suspended") {
        ctx.resume().then(() => { unlocked = true; }).catch(() => {});
      }
      return ctx;
    }
    function unlock() {
      const c = ensureCtx();
      if (c && c.state === "suspended") c.resume();
    }

    // Noise buffer generators ------------------------------------------
    function makeNoiseBuffer(seconds, type) {
      const c = ensureCtx(); if (!c) return null;
      const length = Math.floor(c.sampleRate * seconds);
      const buffer = c.createBuffer(1, length, c.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0, lastOut2 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        if (type === "white") {
          data[i] = white;
        } else if (type === "pink") {
          // Paul Kellet pink noise approximation
          lastOut = 0.99765 * lastOut + white * 0.0990460;
          lastOut2 = 0.96300 * lastOut2 + white * 0.2965164;
          data[i] = (lastOut + lastOut2 + white * 1.0526913) * 0.11;
        } else if (type === "brown") {
          lastOut = (lastOut + (0.02 * white)) / 1.02;
          data[i] = lastOut * 3.5;
        }
      }
      return buffer;
    }
    function playLoopBuffer(buf) {
      const c = ensureCtx(); if (!c || !buf) return null;
      const src = c.createBufferSource();
      src.buffer = buf; src.loop = true;
      src.start(0);
      return src;
    }

    // Track builders ---------------------------------------------------
    function buildRain() {
      const c = ensureCtx(); if (!c) return null;
      const buf = makeNoiseBuffer(8, "white");
      const src = playLoopBuffer(buf);
      const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 600;
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 4800;
      const gain = c.createGain(); gain.gain.value = 0;
      // Second layer: low rumbles
      const buf2 = makeNoiseBuffer(10, "pink");
      const src2 = playLoopBuffer(buf2);
      const lp2 = c.createBiquadFilter(); lp2.type = "lowpass"; lp2.frequency.value = 600;
      const g2 = c.createGain(); g2.gain.value = 0.5;
      src.connect(hp); hp.connect(lp); lp.connect(gain);
      src2.connect(lp2); lp2.connect(g2); g2.connect(gain);
      // Occasional droplet pops using scheduled noise bursts
      function drop() {
        if (!c) return;
        const t = c.currentTime;
        const popBuf = c.createBuffer(1, Math.floor(c.sampleRate * 0.08), c.sampleRate);
        const d = popBuf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) * 0.6;
        const s = c.createBufferSource(); s.buffer = popBuf;
        const pg = c.createGain(); pg.gain.value = 0.08;
        const pf = c.createBiquadFilter(); pf.type = "bandpass"; pf.frequency.value = 1800 + Math.random() * 1600;
        s.connect(pf); pf.connect(pg); pg.connect(gain);
        s.start(t);
        setTimeout(drop, 120 + Math.random() * 1500);
      }
      drop();
      return { node: gain, srcs: [src, src2] };
    }
    function buildCafe() {
      const c = ensureCtx(); if (!c) return null;
      // Brown noise base (room tone)
      const buf = makeNoiseBuffer(8, "brown");
      const src = playLoopBuffer(buf);
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 500; bp.Q.value = 0.6;
      const gain = c.createGain(); gain.gain.value = 0;
      const tone = c.createGain(); tone.gain.value = 0.7;
      src.connect(bp); bp.connect(tone); tone.connect(gain);
      // Muffled speech murmur: slow AM modulation of filtered noise
      const buf2 = makeNoiseBuffer(6, "pink");
      const src2 = playLoopBuffer(buf2);
      const bp2 = c.createBiquadFilter(); bp2.type = "bandpass"; bp2.frequency.value = 800; bp2.Q.value = 0.8;
      const lfo = c.createOscillator(); lfo.frequency.value = 0.25;
      const lfoG = c.createGain(); lfoG.gain.value = 0.5;
      const am = c.createGain(); am.gain.value = 0.3;
      lfo.connect(lfoG); lfoG.connect(am.gain);
      src2.connect(bp2); bp2.connect(am); am.connect(gain);
      lfo.start(0);
      // Occasional clinks (cup/china)
      function clink() {
        if (!c) return;
        const t = c.currentTime;
        const freqA = 1800 + Math.random() * 600;
        const freqB = freqA * 1.03;
        const o1 = c.createOscillator(); o1.type = "sine"; o1.frequency.value = freqA;
        const o2 = c.createOscillator(); o2.type = "sine"; o2.frequency.value = freqB;
        const g = c.createGain(); g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.06, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        o1.connect(g); o2.connect(g); g.connect(gain);
        o1.start(t); o2.start(t);
        o1.stop(t + 0.5); o2.stop(t + 0.5);
        setTimeout(clink, 2500 + Math.random() * 5000);
      }
      clink();
      return { node: gain, srcs: [src, src2, lfo] };
    }
    function buildOcean() {
      const c = ensureCtx(); if (!c) return null;
      const buf = makeNoiseBuffer(10, "pink");
      const src = playLoopBuffer(buf);
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 900;
      const gain = c.createGain(); gain.gain.value = 0;
      // Wave amplitude modulation — slow swell and fade
      const lfo1 = c.createOscillator(); lfo1.type = "sine"; lfo1.frequency.value = 0.09;
      const lfo1Gain = c.createGain(); lfo1Gain.gain.value = 0.55;
      const modGain = c.createGain(); modGain.gain.value = 0.45;
      lfo1.connect(lfo1Gain); lfo1Gain.connect(modGain.gain);
      src.connect(lp); lp.connect(modGain); modGain.connect(gain);
      // Second wave layer slightly out of phase
      const buf2 = makeNoiseBuffer(12, "pink");
      const src2 = playLoopBuffer(buf2);
      const lp2 = c.createBiquadFilter(); lp2.type = "lowpass"; lp2.frequency.value = 600;
      const lfo2 = c.createOscillator(); lfo2.type = "sine"; lfo2.frequency.value = 0.13;
      const lfo2Gain = c.createGain(); lfo2Gain.gain.value = 0.35;
      const modGain2 = c.createGain(); modGain2.gain.value = 0.35;
      lfo2.connect(lfo2Gain); lfo2Gain.connect(modGain2.gain);
      src2.connect(lp2); lp2.connect(modGain2); modGain2.connect(gain);
      lfo1.start(0); lfo2.start(0);
      return { node: gain, srcs: [src, src2, lfo1, lfo2] };
    }
    function buildFireplace() {
      const c = ensureCtx(); if (!c) return null;
      // Base: brown noise rumble
      const buf = makeNoiseBuffer(8, "brown");
      const src = playLoopBuffer(buf);
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 450;
      const base = c.createGain(); base.gain.value = 0.7;
      const gain = c.createGain(); gain.gain.value = 0;
      src.connect(lp); lp.connect(base); base.connect(gain);
      // Higher-frequency hiss (flame breath)
      const buf2 = makeNoiseBuffer(6, "white");
      const src2 = playLoopBuffer(buf2);
      const bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 2200; bp.Q.value = 0.4;
      const hiss = c.createGain(); hiss.gain.value = 0.12;
      // Hiss AM
      const lfo = c.createOscillator(); lfo.type = "triangle"; lfo.frequency.value = 3.2;
      const lfoG = c.createGain(); lfoG.gain.value = 0.07;
      lfo.connect(lfoG); lfoG.connect(hiss.gain);
      src2.connect(bp); bp.connect(hiss); hiss.connect(gain);
      lfo.start(0);
      // Crackles: random short high-pass bursts with rapid decay
      function crackle() {
        if (!c) return;
        const t = c.currentTime;
        const count = 2 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          const tt = t + i * (0.005 + Math.random() * 0.01);
          const dur = 0.008 + Math.random() * 0.015;
          const b = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
          const d = b.getChannelData(0);
          for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * (1 - j / d.length);
          const s = c.createBufferSource(); s.buffer = b;
          const hp = c.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 3200;
          const g = c.createGain();
          const amp = 0.05 + Math.random() * 0.08;
          g.gain.setValueAtTime(0.0001, tt);
          g.gain.exponentialRampToValueAtTime(amp, tt + 0.001);
          g.gain.exponentialRampToValueAtTime(0.0001, tt + dur);
          s.connect(hp); hp.connect(g); g.connect(gain);
          s.start(tt); s.stop(tt + dur + 0.01);
        }
        setTimeout(crackle, 150 + Math.random() * 1200);
      }
      crackle();
      return { node: gain, srcs: [src, src2, lfo] };
    }
    function buildLofi() {
      const c = ensureCtx(); if (!c) return null;
      const gain = c.createGain(); gain.gain.value = 0;
      // Ambient dust: very slow low-pass noise pad
      const buf = makeNoiseBuffer(20, "pink");
      const src = playLoopBuffer(buf);
      const lpNoise = c.createBiquadFilter(); lpNoise.type = "lowpass"; lpNoise.frequency.value = 550;
      const noiseG = c.createGain(); noiseG.gain.value = 0.08;
      src.connect(lpNoise); lpNoise.connect(noiseG); noiseG.connect(gain);
      // Soft Lofi chord progression (vi–IV–I–V in C-ish, detuned to feel dusty)
      const chords = [
        [220.00, 261.63, 329.63, 392.00], // Am
        [174.61, 220.00, 261.63, 329.63], // F
        [196.00, 246.94, 293.66, 392.00], // G
        [261.63, 329.63, 392.00, 493.88]  // C
      ];
      const chordLen = 4.2;
      let step = 0;
      function scheduleChord(startAt) {
        if (!c) return;
        const notes = chords[step % chords.length];
        step++;
        notes.forEach((f, idx) => {
          const o1 = c.createOscillator(); o1.type = "triangle";
          o1.frequency.value = f * (0.996 + Math.random() * 0.008);
          const o2 = c.createOscillator(); o2.type = "sine";
          o2.frequency.value = (f * 2) * (0.994 + Math.random() * 0.012);
          const g = c.createGain();
          const vel = 0.055 + idx * 0.008;
          g.gain.setValueAtTime(0.0001, startAt);
          g.gain.exponentialRampToValueAtTime(vel, startAt + 0.7);
          g.gain.setValueAtTime(vel, startAt + chordLen - 1.2);
          g.gain.exponentialRampToValueAtTime(0.0001, startAt + chordLen - 0.1);
          const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1300;
          o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(gain);
          o1.start(startAt); o2.start(startAt);
          o1.stop(startAt + chordLen); o2.stop(startAt + chordLen);
        });
      }
      function loopChords() {
        const t0 = (c ? c.currentTime : 0) + 0.1;
        scheduleChord(t0 + 0 * chordLen);
        scheduleChord(t0 + 1 * chordLen);
        scheduleChord(t0 + 2 * chordLen);
        scheduleChord(t0 + 3 * chordLen);
        setTimeout(loopChords, chordLen * 4 * 1000 - 50);
      }
      loopChords();
      // Slow tape warble via a chorus-like LFO on a master filter
      const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1800;
      const warble = c.createOscillator(); warble.type = "sine"; warble.frequency.value = 0.4;
      const wg = c.createGain(); wg.gain.value = 0.5;
      warble.connect(wg); wg.connect(lp.frequency);
      warble.start(0);
      gain.connect(lp); lp.connect(gain);
      // Re-route: split noise into warble chain too is messy; simpler: keep output clean
      // Actually rewire properly: disconnect noise then go through lp to destination.
      // Build a clean pre-master.
      lp.disconnect();
      lp.connect(c.destination); // bypass masterGain temporarily — we'll fix below
      // To honor master gain properly, use a separate chain below.
      return { node: gain, srcs: [src, warble], _lp: lp };
    }

    // Public: build all tracks and connect to master
    function buildAll() {
      if (!ensureCtx()) return;
      if (Object.keys(tracks).length) return;
      const builders = { rain: buildRain, cafe: buildCafe, ocean: buildOcean, fireplace: buildFireplace, lofi: buildLofi };
      Object.keys(builders).forEach((k) => {
        try {
          const t = builders[k]();
          if (!t) return;
          // Reconnect track to master
          try { t.node.disconnect(); } catch (_) {}
          t.node.connect(masterGain);
          // Lofi: also reconnect its lp through master
          if (t._lp) { try { t._lp.disconnect(); t._lp.connect(masterGain); } catch (_) {} }
          tracks[k] = { built: t, gain: t.node };
        } catch (_) {}
      });
    }
    function setMaster(vol) {
      buildAll();
      ensureCtx();
      if (masterGain) masterGain.gain.setTargetAtTime(Math.max(0, vol), ctx.currentTime, 0.05);
    }
    function setTrack(id, on, vol) {
      buildAll();
      ensureCtx();
      const t = tracks[id];
      if (!t) return;
      const target = on ? Math.max(0, Math.min(1, vol)) : 0;
      if (t.gain) t.gain.gain.setTargetAtTime(target, ctx.currentTime, 0.08);
    }
    function getContext() { ensureCtx(); return ctx; }

    return { unlock, setMaster, setTrack, getContext };
  })();
  function unlockAudioIfNeeded() { try { AmbientEngine.unlock(); } catch (_) {} }

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
      } else if (mx.master < 0.35) {
        icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
      } else {
        icon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`;
      }
    }
    // Push state to audio engine (builds nodes lazily on first user gesture)
    try {
      AmbientEngine.setMaster(mx.master);
      Object.keys(mx.tracks).forEach((k) => {
        const t = mx.tracks[k];
        AmbientEngine.setTrack(k, !!t.on, Number(t.volume) || 0);
      });
    } catch (_) {}
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
    renderQuote();
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
      unlockAudioIfNeeded();
      state.mixer.master = Number(e.target.value) / 100;
      persist();
      renderMixer();
    });
    document.querySelectorAll(".track-row").forEach((row) => {
      const id = row.getAttribute("data-track");
      const btn = row.querySelector(".icon-toggle");
      const slider = row.querySelector(".track-volume");
      btn.addEventListener("click", () => {
        unlockAudioIfNeeded();
        state.mixer.tracks[id].on = !state.mixer.tracks[id].on;
        persist();
        renderMixer();
      });
      slider.addEventListener("input", (e) => {
        unlockAudioIfNeeded();
        const v = Number(e.target.value) / 100;
        state.mixer.tracks[id].volume = v;
        if (v > 0 && !state.mixer.tracks[id].on) state.mixer.tracks[id].on = true;
        persist();
        renderMixer();
      });
    });
    // Global user gesture: unlock audio on first click/tap/key anywhere on page (covers autoplay policy)
    ["click", "keydown", "touchstart"].forEach((evt) => {
      window.addEventListener(evt, () => unlockAudioIfNeeded(), { once: true, passive: true, capture: true });
    });

    // Appearance: Theme accent swatches
    document.querySelectorAll(".theme-swatches .swatch[data-theme]").forEach((sw) => {
      sw.addEventListener("click", () => {
        Appearance.theme(sw.getAttribute("data-theme"));
      });
    });
    // Appearance: Background swatches
    document.querySelectorAll(".bg-swatches .sw-bg[data-bg]").forEach((sw) => {
      sw.addEventListener("click", () => {
        Appearance.background(sw.getAttribute("data-bg"));
      });
    });
    // Appearance: open dialogs (desktop sidebar, mobile header)
    const openAppearance = () => {
      Appearance.refreshActiveSwatches();
      openDialog("dialog-appearance");
    };
    const ba = document.getElementById("btn-open-appearance");
    if (ba) ba.addEventListener("click", openAppearance);
    const bam = document.getElementById("btn-open-appearance-mobile");
    if (bam) bam.addEventListener("click", openAppearance);

    // Reports: weekly report card + story download
    const bwr = document.getElementById("btn-weekly-report");
    if (bwr) bwr.addEventListener("click", () => Reports.openWeekly());
    const bds = document.getElementById("btn-download-story");
    if (bds) bds.addEventListener("click", () => Reports.downloadStory());

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
    // Apply persisted theme/background ASAP (before paint) to avoid FOUC
    Appearance.init();
    applyTranslations();
    wireUI();
    renderAll();
    // Sync swatch active states in Data panel
    Appearance.refreshActiveSwatches();
    // Restore last view
    try {
      const saved = sessionStorage.getItem("quiethours-static-view");
      if (saved) switchView(saved);
    } catch (_) {}
  });
})();
