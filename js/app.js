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
        focusHours: "Giờ tập trung", focusSessions: "buổi tập trung", spaceToStart: "Nhấn Space để bắt đầu / dừng",
        subjectLabel: "Môn học", subjectNone: "Không gắn môn", subjectHint: "Chọn môn học trước khi bắt đầu để ghi nhận thống kê chính xác.",
        addSubjectQuick: "Thêm môn", addSubjectPlace: "Tên môn..."
      },
      timerSettings: {
        title: "Cài đặt bộ đếm",
        desc: "Độ dài các phiên. Một phiên nghỉ dài sẽ xuất hiện sau mỗi {n} phiên tập trung.",
        focus: "Tập trung (phút)", shortBreak: "Nghỉ ngắn (phút)", longBreak: "Nghỉ dài (phút)",
        longBreakEvery: "Nghỉ dài sau (phiên)", autoStart: "Tự động bắt đầu phiên tiếp theo",
        autoStartDesc: "Không cần nhấn Bắt đầu sau mỗi chu kỳ.",
        notifTitle: "Chuông thông báo khi kết thúc phiên",
        notifSubtitle: "Chọn loại âm và số lần lặp lại để biết khi nào phiên Pomodoro kết thúc.",
        notifSound: "Loại chuông",
        notifRepeat: "Số lần lặp",
        sounds: {
          chime: "Chime (Ding-Dong)",
          bell: "Chuông tháp",
          zen: "Tibetan Bowl",
          digital: "Digital Beep",
          nature: "Chim hót"
        }
      },
      mixer: {
        atmosphere: "Không gian", soundMixer: "Trộn âm thanh", master: "Tổng",
        tracks: {
          rain: { label: "Mưa", hint: "Mưa nhẹ trên mái" },
          cafe: { label: "Quán cà phê", hint: "Tiếng người nói & cốc chén" },
          ocean: { label: "Biển", hint: "Sóng nhẹ dập bờ" },
          fireplace: { label: "Lò sưởi", hint: "Lửa kẹt nhẹ" },
          lofi: { label: "Lofi", hint: "Hợp âm, bass & trống nhẹ" },
          forest: { label: "Rừng", hint: "Gió lá & chim hót" },
          brown: { label: "Ồn nâu", hint: "Che tiếng ồn, tập trung sâu" }
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
        hours: "Giờ", history: "Lịch sử phiên", historyDesc: "Nhấn Sửa để đổi môn học của phiên đã ghi nhận.",
        editSubject: "Sửa môn", changeSubjectTo: "Đổi môn", saveChange: "Lưu",
        session: "phiên", subject: "Môn học"
      },
      data: {
        privacy: "Quyền riêng tư", data: "Dữ liệu",
        dataDesc: "Tất cả dữ liệu (lịch, task, thống kê) được lưu trữ hoàn toàn trên trình duyệt của bạn dưới khóa ",
        backupTitle: "Sao lưu & khôi phục", backupDesc: "Xuất file JSON để sao lưu, hoặc nhập file đã xuất trước đó để khôi phục.",
        couldNotImport: "Không thể nhập file này.", restored: "Đã khôi phục dữ liệu gốc.",
        subjects: "Môn học", subjectsDesc: "Tạo môn học để gắn vào lịch và công việc — giúp thống kê chính xác hơn.",
        newSubject: "Thêm môn học", subjectPlaceholder: "Ví dụ: Toán cao cấp",
        deleteSubjectConfirm: "Xóa môn học \"{name}\"? Các lịch/thẻ/thống kê dùng môn này sẽ được chuyển sang Không gắn môn.",
        deletedSubject: "Đã xóa môn học.",
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
        bgAuto: "Theo giờ",
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
      zen: {
        openTitle: "Bật Chế độ Zen toàn màn hình",
        buttonShort: "Zen Mode",
        active: "Zen Mode đang bật",
        escapeHint: "(nhấn ESC hoặc nút bên phải để thoát)",
        exit: "Thoát Zen",
        needGesture: "Trình duyệt yêu cầu thao tác để vào toàn màn hình - thử lại nhé."
      },
      guide: {
        kicker: "Góc nhỏ",
        title: "Cảm ơn & Hướng dẫn sử dụng",
        subtitle: "Những điều nhỏ xinh bạn nên biết để đồng hành cùng QuietHours thật hiệu quả.",
        letterTitle: "Thư gửi bạn - người sử dụng QuietHours",
        letterFrom: "Tác giả · s1gnuh · một người luôn tin vào sức mạnh của thói quen nhỏ.",
        letterBody: "<p>Chào bạn,</p><p>Đầu tiên, mình cảm ơn bạn rất nhiều vì đã dành thời gian mở QuietHours, lựa chọn nó làm \"không gian riêng\" để bạn ngồi lại, tạm gác những tiếng xô bồ bên ngoài và dành thời gian trân quý cho chính sự phát triển của bạn.</p><p>Mỗi ứng dụng đều được sinh ra từ một lý do: mình cũng từng là sinh viên hay người đi làm bị ngợp trong hàng loạt lịch trình, không gian làm việc lung tung, thiếu động lực. QuietHours không phải công cụ kì diệu thay bạn làm việc, nó chỉ là một người bạn nhỏ ở bên cạnh — hứa sẽ giữ gìn không gian yên tĩnh, đếm những phút bạn cố gắng, phát lại màn mưa nhẹ khi bạn mệt, và mở thẻ báo cáo cuối tuần để bạn nhìn lại mình: \"Tôi đã làm được nhiều thế này\".</p><p>Dù bạn chỉ mở ứng dụng 1 phút mỗi ngày hay hàng giờ đồng hồ — sự hiện diện của bạn đã làm cho dự án nhỏ bé này trở nên có ý nghĩa hơn rất nhiều.</p><p>Hãy giữ thói quen tốt, nghỉ ngơi khi mệt, biết thưởng thức những phút tĩnh lặng. Và nhớ rằng: tiến bộ nhỏ mỗi ngày, là một kiệt tác.</p><p>Cảm ơn bạn một lần nữa 💚</p>",
        dataTitle: "Về dữ liệu của bạn - Lưu ý quan trọng",
        dataBody: "Tất cả dữ liệu của bạn (lịch học, bảng việc, thống kê, cài đặt, theme & background) được lưu an toàn <b>100% trên Trình duyệt này (Local Storage)</b>, không gửi lên máy chủ, không chia sẻ với bất kỳ ai (kể cả tác giả). Vì vậy, nếu bạn dọn Cache trình duyệt, chuyển máy, chuyển trình duyệt hoặc gỡ profile — dữ liệu sẽ mất. Đừng quên chủ động <b>sao lưu định kỳ</b> tại mục <b>Dữ liệu → Xuất file JSON</b> nhé!",
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
        h3p3: "📸 <b>Tải ảnh Story 9:16:</b> Trong Modal Tổng kết tuần, bấm nút <b>Tải ảnh Story</b>. Ứng dụng sẽ dựng một thẻ tỉ lệ <b>9:16</b> (chuẩn Instagram / Facebook Story) với gradient hiện đại, chụp bằng thư viện <code>html2canvas</code> và tự động tải về máy với tên <code>quiethours-story-TuầnDD-MM.png</code>. Bạn chỉ cần đăng tải lên MXH thôi!",
        h3p4: "💡 <b>Chia sẻ hay nói gì?</b> Đừng quên tag <code>@quiethours</code> / hashtag <code>#quiethours</code> / <code>#s1gnuh</code> để mình có thể thấy và vui cùng bạn 💚"
      },
      onboard: {
        stepOf: "Bước {n}/{total}", skip: "Bỏ qua", back: "Quay lại", next: "Tiếp tục",
        finish: "Bắt đầu học thôi!", replay: "Xem lại hướng dẫn nhanh",
        welcome: {
          title: "Chào mừng đến với QuietHours",
          body: "<p>Phòng học riêng của bạn ngay trên trình duyệt: <b>Pomodoro</b>, <b>nhạc nền</b>, <b>lịch học</b>, <b>bảng việc</b> và <b>thống kê</b>.</p><p>Chỉ mất khoảng 1 phút để làm quen — bạn có thể bỏ qua bất cứ lúc nào. Chọn ngôn ngữ bạn muốn dùng:</p>"
        },
        subjects: {
          title: "Tạo môn học của bạn",
          body: "<p>Môn học dùng để gắn nhãn cho phiên Pomodoro, lịch học và thẻ công việc, giúp <b>thống kê theo môn</b> chính xác. Thêm vài môn ngay bây giờ, hoặc để sau ở tab <b>Dữ liệu</b>.</p>",
          placeholder: "Tên môn, ví dụ: Toán cao cấp",
          suggestions: "Gợi ý:",
          empty: "Chưa có môn nào — bạn có thể bỏ qua bước này.",
          suggestList: ["Toán", "Tiếng Anh", "Vật lý", "Lập trình", "Ngữ văn"]
        },
        pomodoro: {
          title: "Học theo nhịp Pomodoro",
          body: "<ul><li>Chọn <b>môn học</b> rồi bấm <b>Bắt đầu</b> (hoặc nhấn phím <code>Space</code>).</li><li>Mặc định: 25 phút tập trung → 5 phút nghỉ; cứ sau 4 phiên có một lần nghỉ dài 15 phút.</li><li>Bấm biểu tượng ✏️ trên thẻ Pomodoro để chỉnh thời lượng, tự động chạy phiên tiếp và <b>chuông báo</b>.</li><li>Mỗi phiên tập trung hoàn thành được ghi vào <b>Thống kê</b> và nối dài <b>chuỗi ngày</b> 🔥.</li></ul>"
        },
        atmosphere: {
          title: "Âm thanh, giao diện & Zen Mode",
          body: "<ul><li>Thẻ <b>Không gian</b>: bật Mưa, Quán cà phê, Biển, Lò sưởi, Lofi và chỉnh âm lượng từng kênh — tự động lưu.</li><li>Nút 🎨 <b>Giao diện</b> trên thanh trên cùng: đổi màu nhấn và hình nền.</li><li><b>Zen Mode</b>: toàn màn hình, chỉ còn đồng hồ — nhấn <code>Esc</code> để thoát.</li></ul>"
        },
        plan: {
          title: "Lên kế hoạch & theo dõi tiến bộ",
          body: "<ul><li><b>Lịch học</b>: thêm buổi học theo ngày / tuần, có hiển thị lịch âm.</li><li><b>Bảng việc</b>: kéo thả thẻ giữa Cần làm → Đang làm → Hoàn thành (trên điện thoại dùng menu ⋮).</li><li><b>Thống kê</b>: bản đồ chăm chỉ 12 tháng, biểu đồ theo môn và <b>Thẻ tổng kết tuần</b> xuất ảnh Story.</li><li>🎯 <b>Chế độ thi</b>: đếm ngược tới ngày thi và mục tiêu giờ ôn ngay trên màn hình chính (nút <b>Kỳ thi</b> ở tab Lịch học).</li><li>🏆 Mỗi phút tập trung cho bạn <b>XP</b> để lên cấp từ Sắt → Thách Đấu và mở khóa huy hiệu.</li></ul>"
        },
        data: {
          title: "Dữ liệu nằm trong máy của bạn",
          body: "<p>Mọi thứ được lưu <b>100% trong trình duyệt này</b> — không tài khoản, không máy chủ.</p><p>Xóa dữ liệu trình duyệt sẽ mất hết, nên hãy <b>Xuất dữ liệu</b> định kỳ ở tab <b>Dữ liệu</b>. Bạn có thể mở lại hướng dẫn này ở tab <b>Cảm ơn & HD</b>.</p>"
        }
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
        focusHours: "Focus hours", focusSessions: "focus sessions", spaceToStart: "Press Space to start / pause",
        subjectLabel: "Subject", subjectNone: "No subject", subjectHint: "Pick a subject before starting for accurate analytics.",
        addSubjectQuick: "Add subject", addSubjectPlace: "Subject name..."
      },
      timerSettings: {
        title: "Timer settings",
        desc: "Length of each interval. A long break appears after every {n} focus sessions.",
        focus: "Focus (min)", shortBreak: "Short break (min)", longBreak: "Long break (min)",
        longBreakEvery: "Long break every", autoStart: "Auto-start next session",
        autoStartDesc: "Don't require pressing Start after each cycle.",
        notifTitle: "End-of-session notification chime",
        notifSubtitle: "Pick a sound and how many times it repeats so you know when a Pomodoro ends.",
        notifSound: "Chime sound",
        notifRepeat: "Repeat count",
        sounds: {
          chime: "Chime (Ding-Dong)",
          bell: "Tubular Bell",
          zen: "Tibetan Bowl",
          digital: "Digital Beep",
          nature: "Bird Chirp"
        }
      },
      mixer: {
        atmosphere: "Atmosphere", soundMixer: "Ambient mixer", master: "Master",
        tracks: {
          rain: { label: "Rain", hint: "Soft rooftop rain" },
          cafe: { label: "Cafe", hint: "Room murmur & cups" },
          ocean: { label: "Ocean", hint: "Slow shoreline wash" },
          fireplace: { label: "Fireplace", hint: "Low crackle" },
          lofi: { label: "Lofi", hint: "Dusty chords, bass & beat" },
          forest: { label: "Forest", hint: "Wind, leaves & birdsong" },
          brown: { label: "Brown noise", hint: "Masks noise for deep focus" }
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
        hours: "Hours", history: "Session history", historyDesc: "Click Edit to change the subject of a logged session.",
        editSubject: "Edit subject", changeSubjectTo: "Change to", saveChange: "Save",
        session: "session", subject: "Subject"
      },
      data: {
        privacy: "Privacy", data: "Data",
        dataDesc: "Everything (schedule, tasks, logs) lives entirely in your browser under key ",
        backupTitle: "Backup & restore", backupDesc: "Export a JSON snapshot, or import one to restore a previous backup.",
        couldNotImport: "Could not import this file.", restored: "All data has been reset.",
        subjects: "Subjects", subjectsDesc: "Create subjects to tag schedule and tasks — makes analytics more useful.",
        newSubject: "New subject", subjectPlaceholder: "e.g. Linear Algebra",
        deleteSubjectConfirm: "Delete subject \"{name}\"? Schedule, cards, and logs tagged with this subject will become unassigned (No subject).",
        deletedSubject: "Subject deleted.",
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
        bgAuto: "Time of day",
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
      zen: {
        openTitle: "Enter Zen fullscreen Mode",
        buttonShort: "Zen Mode",
        active: "Zen Mode is on",
        escapeHint: "(press ESC or button on the right to exit)",
        exit: "Exit Zen",
        needGesture: "Browser requires a gesture to enter fullscreen — please try again."
      },
      guide: {
        kicker: "A little corner",
        title: "Thank you & How to use",
        subtitle: "Small things worth knowing to make the most of QuietHours.",
        letterTitle: "A letter to you — the QuietHours user",
        letterFrom: "Author · s1gnuh · someone who always believes in the power of small habits.",
        letterBody: "<p>Hi there,</p><p>First of all, thank you so much for opening QuietHours — for choosing it as your \"little private room\" where you can slow down, step away from the noise outside, and spend some quality time on your own growth.</p><p>Every app is born for a reason: I've also been that student or office worker overwhelmed by endless schedules, a messy workspace, and zero motivation. QuietHours is not a magic tool that does the work for you. It's just a small friend by your side — promising to guard your quiet space, count the minutes you put in, replay a soft rain when you're tired, and open a weekly report card so you can look back and say: \"Wow, I actually got all this done.\"</p><p>Whether you open the app for just one minute a day or spend hours with it — your presence already makes this tiny project mean a whole lot more.</p><p>Keep your good habits, rest when you're tired, and learn to savor the quiet moments. And remember: small daily progress is a masterpiece in itself.</p><p>Thank you, once again 💚</p>",
        dataTitle: "About your data — important notice",
        dataBody: "All of your data (schedule, tasks, analytics, settings, themes & backgrounds) is stored safely <b>100% in this Browser (Local Storage)</b>. Nothing is sent to a server, nothing is shared with anyone — including the author. So if you clear your browser cache, switch computers, switch browsers, or remove your profile — your data will be gone. Please remember to make a <b>regular backup</b> under <b>Data → Export JSON</b>!",
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
        h3p3: "📸 <b>Download 9:16 Story:</b> inside the Weekly modal, click <b>Download Story</b>. The app renders a <b>9:16</b> Instagram/Facebook Story-sized card with a modern gradient, captures it with <code>html2canvas</code>, and auto-downloads a PNG named <code>quiethours-story-WeekDD-MM.png</code>. Just share!",
        h3p4: "💡 <b>What to say when sharing:</b> tag <code>@quiethours</code> / use <code>#quiethours</code> / <code>#s1gnuh</code> so I can celebrate with you 💚"
      },
      onboard: {
        stepOf: "Step {n} of {total}", skip: "Skip", back: "Back", next: "Next",
        finish: "Let's start studying!", replay: "Replay quick tour",
        welcome: {
          title: "Welcome to QuietHours",
          body: "<p>Your private study room right in the browser: <b>Pomodoro</b>, <b>ambient sound</b>, <b>schedule</b>, <b>task board</b> and <b>insights</b>.</p><p>This takes about a minute — you can skip anytime. Pick your language:</p>"
        },
        subjects: {
          title: "Create your subjects",
          body: "<p>Subjects tag your Pomodoro sessions, schedule and task cards so <b>per-subject analytics</b> stay accurate. Add a few now, or later in the <b>Data</b> tab.</p>",
          placeholder: "Subject name, e.g. Linear Algebra",
          suggestions: "Suggestions:",
          empty: "No subjects yet — feel free to skip this step.",
          suggestList: ["Math", "English", "Physics", "Programming", "Literature"]
        },
        pomodoro: {
          title: "Study in Pomodoro rhythm",
          body: "<ul><li>Pick a <b>subject</b>, then press <b>Start</b> (or hit <code>Space</code>).</li><li>Default: 25 min focus → 5 min break; every 4 sessions you get a 15 min long break.</li><li>Click the ✏️ icon on the Pomodoro card to change durations, auto-start and the <b>end chime</b>.</li><li>Every completed focus session is logged to <b>Insights</b> and extends your <b>streak</b> 🔥.</li></ul>"
        },
        atmosphere: {
          title: "Sound, appearance & Zen Mode",
          body: "<ul><li><b>Atmosphere</b> card: turn on Rain, Cafe, Ocean, Fireplace, Lofi and mix each volume — saved automatically.</li><li>The 🎨 <b>Appearance</b> button in the top bar: change accent color and background.</li><li><b>Zen Mode</b>: fullscreen with just the clock — press <code>Esc</code> to exit.</li></ul>"
        },
        plan: {
          title: "Plan & track your progress",
          body: "<ul><li><b>Schedule</b>: add sessions by day / week, with the lunar calendar shown.</li><li><b>Board</b>: drag cards between To Do → In Progress → Done (on mobile use the ⋮ menu).</li><li><b>Insights</b>: 12-month focus heatmap, time per subject and a <b>Weekly report card</b> you can export as a Story image.</li><li>🎯 <b>Exam mode</b>: a countdown and study-hours goal right on the home screen (the <b>Exams</b> button in Schedule).</li><li>🏆 Every focus minute earns <b>XP</b> to rank up from Iron → Challenger and unlock badges.</li></ul>"
        },
        data: {
          title: "Your data stays on your device",
          body: "<p>Everything is stored <b>100% in this browser</b> — no account, no server.</p><p>Clearing browser data wipes it, so <b>Export data</b> regularly from the <b>Data</b> tab. You can replay this tour from the <b>Guide</b> tab.</p>"
        }
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
      if (typeof txt === "string" && txt.indexOf("<") !== -1) {
        el.innerHTML = txt;
      } else {
        el.textContent = txt;
      }
    });
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
    ZenMode.syncLabels();
    document.dispatchEvent(new CustomEvent("qh:lang", { detail: { lang } }));
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
    // New users start with no subjects — they create their own (onboarding / Data / quick add)
    return {
      subjects: [],
      timerSettings: { focusMin: 25, shortBreakMin: 5, longBreakMin: 15, longBreakEvery: 4, autoStart: false, notifSound: "chime", notifRepeat: 2, lastSubjectId: null },
      timer: { mode: "focus", running: false, endAt: null, remainingMs: 25 * 60 * 1000, focusCount: 0 },
      mixer: {
        master: 0.7,
        tone: 0.6,
        tracks: {
          rain: { on: false, volume: 0.5 },
          cafe: { on: false, volume: 0.4 },
          ocean: { on: false, volume: 0 },
          fireplace: { on: false, volume: 0 },
          lofi: { on: false, volume: 0 },
          forest: { on: false, volume: 0 },
          brown: { on: false, volume: 0 }
        }
      },
      mixerPresets: [],
      exams: [],
      schedule: [],
      kanban: [],
      logs: []
    };
  }
  // Fill in anything missing from older saves / imported backups so new features never hit undefined
  function normalizeState(s) {
    const df = seedSampleData();
    ["subjects", "schedule", "kanban", "logs", "exams", "mixerPresets"].forEach((k) => { if (!Array.isArray(s[k])) s[k] = []; });
    if (!s.timerSettings || typeof s.timerSettings !== "object") s.timerSettings = df.timerSettings;
    if (!s.timer || typeof s.timer !== "object") s.timer = df.timer;
    if (!s.mixer || typeof s.mixer !== "object") s.mixer = df.mixer;
    if (!Number.isFinite(s.mixer.master)) s.mixer.master = df.mixer.master;
    if (!Number.isFinite(s.mixer.tone)) s.mixer.tone = df.mixer.tone;
    if (!s.mixer.tracks || typeof s.mixer.tracks !== "object") s.mixer.tracks = {};
    Object.keys(df.mixer.tracks).forEach((k) => {
      const tr = s.mixer.tracks[k];
      if (!tr || typeof tr !== "object") s.mixer.tracks[k] = { ...df.mixer.tracks[k] };
      else { tr.on = !!tr.on; tr.volume = Number.isFinite(tr.volume) ? tr.volume : 0; }
    });
    return s;
  }
  let isFirstVisit = false; // true when no saved data existed -> show onboarding
  let state = (function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          // Backfill new settings for existing users
          if (!parsed.timerSettings) parsed.timerSettings = seedSampleData().timerSettings;
          const df = seedSampleData().timerSettings;
          if (typeof parsed.timerSettings.notifSound !== "string") parsed.timerSettings.notifSound = df.notifSound;
          if (!Number.isFinite(parsed.timerSettings.notifRepeat)) parsed.timerSettings.notifRepeat = df.notifRepeat;
          if (typeof parsed.timerSettings.lastSubjectId !== "string") parsed.timerSettings.lastSubjectId = null;
          // An empty subject list is valid (user deleted every subject) — don't re-seed it
          normalizeState(parsed);
          // Ensure every log has subjectId shape (never throw)
          if (Array.isArray(parsed.logs)) {
            parsed.logs.forEach((l) => {
              if (!("subjectId" in l)) l.subjectId = undefined;
            });
          }
          return parsed;
        }
      }
    } catch (_) {}
    isFirstVisit = true;
    const sd = seedSampleData();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sd)); } catch (_) {}
    return sd;
  })();
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
    // Let add-on modules (js/features.js) refresh their views
    document.dispatchEvent(new CustomEvent("qh:change"));
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
    const VALID_BGS = ["none", "auto", "rain", "lofi", "cyber"];
    const VISIBLE_BGS = ["none", "auto", "rain"];
    let currentTheme = "sage";
    let currentBg = "none";

    function sanitizeBg(id) {
      if (!VALID_BGS.includes(id)) return "none";
      if (VISIBLE_BGS.includes(id)) return id;
      return "none";
    }

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
        // New visitors get the time-of-day sky by default
        currentBg = b == null ? "auto" : sanitizeBg(b);
        if (currentBg !== b) {
          try { localStorage.setItem(BG_KEY, currentBg); } catch (_) {}
        }
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
      id = sanitizeBg(id);
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

  // -------- Zen Mode (Ambient Fullscreen) ---------------------------------
  const ZenMode = (function () {
    let active = false;

    function syncLabels() {
      const openTitle = t("zen.openTitle");
      ["btn-zen-mobile", "btn-zen-sidebar", "btn-zen-timer"].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute("title", openTitle);
        el.setAttribute("aria-label", openTitle);
      });
    }

    function switchViewToFocusIfNeeded() {
      if (document.getElementById("view-focus") && !document.getElementById("view-focus").classList.contains("active")) {
        try { switchView("focus"); } catch (_) {
          // graceful fallback: toggle active manually
          document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
          const vf = document.getElementById("view-focus");
          if (vf) vf.classList.add("active");
        }
      }
    }

    function applyClass(on) {
      document.body.classList.toggle("zen-mode", !!on);
      active = !!on;
    }

    async function requestFullscreenOrFallback() {
      const el = document.documentElement;
      const api =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.webkitEnterFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;
      try {
        if (api) {
          const p = api.call(el);
          if (p && typeof p.catch === "function") {
            // ignore fullscreen failure user-declined; but still enable zen visually?
            p.catch((err) => {
              // Only show warning if not a user gesture error, but browser already handles
              if (err && /gesture|user/.test(String(err.message || ""))) {
                // swallow, user will retry
              }
            });
          }
        }
      } catch (_) {}
    }

    async function exitFullscreenIfAny() {
      const fs =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.webkitCancelFullScreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen;
      if (!fs) return;
      const isInFs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.webkitCurrentFullScreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      if (!isInFs) return;
      try { const p = fs.call(document); if (p && typeof p.catch === "function") p.catch(() => {}); } catch (_) {}
    }

    function open() {
      switchViewToFocusIfNeeded();
      applyClass(true);
      // Audio unlock gesture (good time to unlock ambient audio too on gesture)
      try { unlockAudioIfNeeded(); } catch (_) {}
      // Request fullscreen inside the same click/user gesture stack:
      requestFullscreenOrFallback();
    }

    function close() {
      applyClass(false);
      exitFullscreenIfAny();
    }

    function toggle() { active ? close() : open(); }

    function isActive() { return active; }

    // ESC: key "Escape" => if zen mode active, close first (even before fullscreen browser default)
    function onKey(e) {
      const k = (e.key || "").toLowerCase();
      if (k === "escape" && active) {
        e.preventDefault();
        close();
      }
    }

    // When user exits fullscreen via browser (eg ESC default fallback), also close Zen UI.
    function onFullscreenChange() {
      const inFs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.webkitCurrentFullScreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      if (active && !inFs) {
        applyClass(false);
      } else if (!active && inFs) {
        // User manually went fullscreen outside Zen? leave it.
      }
    }

    function init() {
      syncLabels();
      window.addEventListener("keydown", onKey, true);
      [
        "fullscreenchange",
        "webkitfullscreenchange",
        "mozfullscreenchange",
        "MSFullscreenChange"
      ].forEach((evt) => document.addEventListener(evt, onFullscreenChange));
    }

    return { init, open, close, toggle, isActive, syncLabels };
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
      // Quote (sync: pick from the already-loaded cache; Quotes.random() is async)
      let quoteTxt = "";
      const list = Quotes.allLoaded();
      if (Array.isArray(list) && list.length) {
        const q = list[Math.floor(Math.random() * list.length)];
        quoteTxt = (currentLang === "vi" ? q.vi : q.en) || q.vi || q.en || "";
      }
      if (!quoteTxt) {
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

  // -------- Onboarding (first-visit walkthrough) ------------------------------
  const Onboarding = (function () {
    const DONE_KEY = "quiethours-static-onboarded";
    const STEPS = ["welcome", "subjects", "pomodoro", "atmosphere", "plan", "data"];
    const ICONS = { welcome: "🌿", subjects: "📚", pomodoro: "🍅", atmosphere: "🎧", plan: "🗓️", data: "🔒" };
    let step = 0;
    let open = false;

    function $(id) { return document.getElementById(id); }
    function isOpen() { return open; }

    function renderLangPicker(host) {
      const wrap = document.createElement("div");
      wrap.className = "onboard-lang";
      [["vi", "Tiếng Việt"], ["en", "English"]].forEach(([code, label]) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn btn-sm " + (currentLang === code ? "btn-primary" : "btn-secondary");
        b.textContent = label;
        b.addEventListener("click", () => setLang(code));
        wrap.appendChild(b);
      });
      host.appendChild(wrap);
    }

    function renderSubjectStep(host) {
      const chips = document.createElement("ul");
      chips.className = "subject-chips onboard-chips";
      if (!state.subjects.length) {
        const li = document.createElement("li");
        li.className = "onboard-empty";
        li.textContent = t("onboard.subjects.empty");
        chips.appendChild(li);
      }
      state.subjects.forEach((s) => {
        const li = document.createElement("li");
        li.className = "subject-chip";
        const label = document.createElement("span");
        label.className = "chip-label";
        label.textContent = s.name;
        const del = document.createElement("button");
        del.type = "button";
        del.className = "chip-delete";
        del.setAttribute("aria-label", t("common.delete"));
        del.innerHTML = "&times;";
        del.addEventListener("click", () => {
          const used = [state.logs, state.schedule, state.kanban].some((arr) => arr.some((x) => x.subjectId === s.id));
          if (used) deleteSubject(s.id); // asks for confirmation + unassigns
          else {
            state.subjects = state.subjects.filter((x) => x.id !== s.id);
            if (state.timerSettings.lastSubjectId === s.id) state.timerSettings.lastSubjectId = null;
            if (state.timer.subjectId === s.id) delete state.timer.subjectId;
            persist();
            renderAll();
          }
          render();
        });
        li.appendChild(label);
        li.appendChild(del);
        chips.appendChild(li);
      });
      host.appendChild(chips);

      const form = document.createElement("form");
      form.className = "onboard-add";
      form.innerHTML = `<input type="text" maxlength="40" /><button type="submit" class="btn btn-primary btn-sm"></button>`;
      const input = form.querySelector("input");
      input.placeholder = t("onboard.subjects.placeholder");
      form.querySelector("button").textContent = t("common.add");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (addSubject(input.value)) {
          render();
          const again = $("onboard-body").querySelector(".onboard-add input");
          if (again) again.focus();
        }
      });
      host.appendChild(form);

      const sugg = document.createElement("div");
      sugg.className = "onboard-suggest";
      const lbl = document.createElement("span");
      lbl.textContent = t("onboard.subjects.suggestions");
      sugg.appendChild(lbl);
      const existing = new Set(state.subjects.map((s) => s.name.toLowerCase()));
      (t("onboard.subjects.suggestList") || []).filter((n) => !existing.has(n.toLowerCase())).forEach((name) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "onboard-suggest-chip";
        b.textContent = "+ " + name;
        b.addEventListener("click", () => { addSubject(name); render(); });
        sugg.appendChild(b);
      });
      host.appendChild(sugg);
    }

    function render() {
      const body = $("onboard-body");
      if (!body) return;
      const key = STEPS[step];
      body.innerHTML = `
        <div class="onboard-icon" aria-hidden="true">${ICONS[key]}</div>
        <p class="onboard-step"></p>
        <h3 class="onboard-title" id="onboard-title"></h3>
        <div class="onboard-text"></div>
        <div class="onboard-extra"></div>`;
      body.querySelector(".onboard-step").textContent = formatTpl(t("onboard.stepOf"), { n: step + 1, total: STEPS.length });
      body.querySelector(".onboard-title").textContent = t(`onboard.${key}.title`);
      body.querySelector(".onboard-text").innerHTML = t(`onboard.${key}.body`); // static dictionary HTML
      const extra = body.querySelector(".onboard-extra");
      if (key === "welcome") renderLangPicker(extra);
      if (key === "subjects") renderSubjectStep(extra);
      // restart entrance animation
      body.classList.remove("onboard-anim");
      void body.offsetWidth;
      body.classList.add("onboard-anim");

      const dots = $("onboard-dots");
      if (dots) {
        dots.innerHTML = "";
        STEPS.forEach((_, i) => {
          const d = document.createElement("button");
          d.type = "button";
          d.className = "onboard-dot" + (i === step ? " active" : i < step ? " done" : "");
          d.setAttribute("aria-label", formatTpl(t("onboard.stepOf"), { n: i + 1, total: STEPS.length }));
          d.addEventListener("click", () => { step = i; render(); });
          dots.appendChild(d);
        });
      }
      const bar = $("onboard-bar");
      if (bar) bar.style.width = ((step + 1) / STEPS.length) * 100 + "%";
      const back = $("onboard-back");
      if (back) { back.textContent = t("onboard.back"); back.style.visibility = step === 0 ? "hidden" : "visible"; }
      const next = $("onboard-next");
      if (next) next.textContent = step === STEPS.length - 1 ? t("onboard.finish") : t("onboard.next");
      const skip = $("onboard-skip");
      if (skip) { skip.textContent = t("onboard.skip"); skip.style.visibility = step === STEPS.length - 1 ? "hidden" : "visible"; }
    }

    function openAt(i) {
      step = Math.max(0, Math.min(STEPS.length - 1, i || 0));
      open = true;
      render();
      openDialog("dialog-onboard");
    }
    function finish() {
      open = false;
      closeDialog("dialog-onboard");
      try { localStorage.setItem(DONE_KEY, "1"); } catch (_) {}
    }
    function init() {
      const next = $("onboard-next");
      if (next) next.addEventListener("click", () => {
        if (step >= STEPS.length - 1) finish();
        else { step++; render(); }
      });
      const back = $("onboard-back");
      if (back) back.addEventListener("click", () => { if (step > 0) { step--; render(); } });
      const skip = $("onboard-skip");
      if (skip) skip.addEventListener("click", finish);
      const replay = $("btn-replay-onboarding");
      if (replay) replay.addEventListener("click", () => openAt(0));
      let done = false;
      try { done = localStorage.getItem(DONE_KEY) === "1"; } catch (_) {}
      if (isFirstVisit && !done) setTimeout(() => openAt(0), 350);
    }
    return { init, openAt, finish, render, isOpen };
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
  function subjectNameFor(subjectId) {
    if (!subjectId) return t("focus.subjectNone");
    const s = state.subjects.find((x) => x.id === subjectId);
    return s ? s.name : t("focus.subjectNone");
  }
  function rebuildSubjectOptions(selectEl, {
    value = "",
    noneLabel = null,
    includeNone = true
  } = {}) {
    if (!selectEl) return;
    selectEl.innerHTML = "";
    if (includeNone) {
      const oNone = document.createElement("option");
      oNone.value = "";
      oNone.textContent = noneLabel || t("focus.subjectNone");
      if (value === "") oNone.selected = true;
      selectEl.appendChild(oNone);
    }
    state.subjects.forEach((s) => {
      const o = document.createElement("option");
      o.value = s.id;
      o.textContent = s.name;
      if (value === s.id) o.selected = true;
      selectEl.appendChild(o);
    });
  }
  function renderFocusSubjectPicker() {
    const sel = document.getElementById("focus-subject-select");
    if (!sel) return;
    const cur = (state.timer && state.timer.subjectId) || state.timerSettings.lastSubjectId || "";
    rebuildSubjectOptions(sel, { value: cur });
    try { sel.setAttribute("title", subjectNameFor(cur)); } catch (_) {}
  }
  function renderInsightsHistory() {
    const host = document.getElementById("insights-history-list");
    if (!host) return;
    host.innerHTML = "";
    const logs = [...state.logs].sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));
    if (!logs.length) {
      const p = document.createElement("p");
      p.style.cssText = "margin:0; font-size:0.8rem; color: var(--color-muted); padding: 0.6rem 0.2rem";
      p.textContent = currentLang === "vi" ? "Chưa có phiên nào được ghi nhận. Hãy bắt đầu một buổi Pomodoro!" : "No sessions logged yet. Start a Pomodoro to see them here.";
      host.appendChild(p);
      return;
    }
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex; flex-direction:column; gap:0.45rem";
    const now = new Date();
    logs.slice(0, 40).forEach((log) => {
      const row = document.createElement("div");
      row.style.cssText = "display:grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.3fr) auto; align-items:center; gap:0.55rem; padding:0.55rem 0.65rem; border-radius:0.55rem; background: var(--color-elevated); border:1px solid var(--color-border)";
      row.dataset.logId = log.id;

      const left = document.createElement("div");
      left.style.cssText = "min-width:0; display:flex; flex-direction:column; gap:0.12rem";
      const d = new Date(log.completedAt || now.getTime());
      const timeStr = d.toLocaleTimeString(currentLang === "vi" ? "vi-VN" : "en-US", { hour: "2-digit", minute: "2-digit" });
      const dateStr = d.toLocaleDateString(currentLang === "vi" ? "vi-VN" : "en-US", { month: "short", day: "numeric" });
      const time = document.createElement("span");
      time.style.cssText = "font-weight:600; font-size:0.82rem";
      time.textContent = `${timeStr} · ${dateStr}`;
      const mins = document.createElement("span");
      mins.style.cssText = "color: var(--color-muted); font-size:0.72rem";
      mins.textContent = `${log.minutes || 0} ${currentLang === "vi" ? "phút" : "min"} · ${t(modeLabelKey(log.mode || "focus"))}`;
      left.appendChild(time);
      left.appendChild(mins);

      const mid = document.createElement("div");
      mid.style.cssText = "min-width:0; display:flex; align-items:center; gap:0.35rem";
      const midLabel = document.createElement("span");
      midLabel.className = "subject-chip";
      midLabel.style.cssText = "max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap";
      midLabel.textContent = subjectNameFor(log.subjectId);
      mid.appendChild(midLabel);

      const actions = document.createElement("div");
      actions.style.cssText = "display:flex; align-items:center; gap:0.3rem";
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn btn-ghost btn-icon-sm";
      editBtn.title = t("insights.editSubject");
      editBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg><span style="font-size:0.74rem; margin-left:0.25rem">${t("insights.editSubject")}</span>`;
      editBtn.addEventListener("click", () => {
        if (row.dataset.editing === "1") return;
        row.dataset.editing = "1";
        mid.innerHTML = "";
        const sel = document.createElement("select");
        sel.style.cssText = "flex:1; min-width:150px; padding:0.32rem 0.5rem; background: var(--color-surface); border:1px solid var(--color-border); border-radius:0.5rem; color: var(--color-fg); font-family:inherit; font-size:0.8rem";
        rebuildSubjectOptions(sel, { value: log.subjectId || "" });
        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "btn btn-primary btn-sm";
        saveBtn.style.cssText = "padding-inline:0.55rem";
        saveBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"></polyline></svg><span style="font-size:0.72rem; margin-left:0.22rem">${t("insights.saveChange")}</span>`;
        saveBtn.addEventListener("click", () => {
          const next = sel.value || undefined;
          const target = state.logs.find((l) => l.id === log.id);
          if (target) target.subjectId = next;
          persist();
          row.dataset.editing = "0";
          renderInsightsHistory();
          renderCharts();
          renderStats();
        });
        mid.appendChild(sel);
        mid.appendChild(saveBtn);
      });
      actions.appendChild(editBtn);

      row.appendChild(left);
      row.appendChild(mid);
      row.appendChild(actions);
      wrap.appendChild(row);
    });
    host.appendChild(wrap);
  }
  function completeSession() {
    const tm = state.timer;
    const completedMode = tm.mode;
    // Log
    if (completedMode === "focus") {
      const sid = tm.subjectId || state.timerSettings.lastSubjectId || null;
      state.logs.push({
        id: uid(),
        date: todayISO(),
        // Use the length the session actually started with (settings may change mid-session)
        minutes: Math.round((tm.plannedMs || durationMsFor(completedMode)) / 60000),
        subjectId: sid || undefined,
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
    state.timer.plannedMs = state.timer.remainingMs;
    state.timer.endAt = null;
    state.timer.running = !!state.timerSettings.autoStart;
    if (state.timer.running) state.timer.endAt = Date.now() + state.timer.remainingMs;
    // Retain subject selection across sessions for convenience
    const lastSub = tm.subjectId || state.timerSettings.lastSubjectId || null;
    state.timerSettings.lastSubjectId = lastSub || null;
    state.timer.subjectId = null;
    persist();
    // Chime notification
    try { unlockAudioIfNeeded(); } catch (_) {}
    try { NotificationSounds && NotificationSounds.playEndOfSession && NotificationSounds.playEndOfSession(); } catch (_) {}
    // Notification-ish (small inline popup via console for static demo)
    console.log(
      `[QuietHours] ${t(modeLabelKey(completedMode))} ${t("focus.complete")} — ${t("focus.next")}: ${t(modeLabelKey(nextMode))}`
    );
    renderTimer();
    renderFocusSubjectPicker();
    renderStats();
    renderCharts();
    renderInsightsHistory();
    document.dispatchEvent(new CustomEvent("qh:session", { detail: { mode: completedMode, next: nextMode } }));
  }
  function startTimer() {
    const tm = state.timer;
    const sel = document.getElementById("focus-subject-select");
    if (sel) {
      const v = sel.value || null;
      tm.subjectId = v || undefined;
      if (v) state.timerSettings.lastSubjectId = v;
    }
    const ms = tm.remainingMs > 0 ? tm.remainingMs : durationMsFor(tm.mode);
    if (!tm.plannedMs || ms > tm.plannedMs) tm.plannedMs = Math.max(ms, durationMsFor(tm.mode));
    tm.remainingMs = ms;
    tm.endAt = Date.now() + ms;
    tm.running = true;
    persist();
    renderTimer();
    renderFocusSubjectPicker();
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
    state.timer.plannedMs = null;
    completingRef = false;
    persist();
    renderTimer();
  }
  function setMode(mode) {
    state.timer.mode = mode;
    state.timer.running = false;
    state.timer.endAt = null;
    state.timer.remainingMs = durationMsFor(mode);
    state.timer.plannedMs = null;
    completingRef = false;
    persist();
    renderTimer();
  }
  function renderTimer() {
    const tm = state.timer;
    const remaining = remainingMsNow();
    const total = tm.plannedMs || durationMsFor(tm.mode);
    const progress = total > 0 ? Math.max(0, Math.min(1, 1 - remaining / total)) : 0;
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
      : "QuietHours · Self-Study";
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
  // Generates every ambient track procedurally (no audio files). Tracks are built
  // lazily the first time they're turned on; random-event schedulers skip work
  // while a track is silent. Stereo noise beds + a shared generated reverb.
  const AmbientEngine = (function () {
    let ctx = null;
    let masterGain = null;
    let reverbSend = null;
    let toneLp = null;
    let toneLevel = 0.6; // 0 = warm/dark, 1 = bright
    const toneToHz = (v) => 800 * Math.pow(15, Math.max(0, Math.min(1, v))); // 800 Hz .. 12 kHz
    const tracks = {};   // id -> { gain }
    const desired = {};  // id -> target volume (0..1)
    const bufCache = {};
    // Per-track loudness trim so tracks sit at similar levels at the same slider value
    const TRIM = { rain: 0.9, cafe: 1.0, ocean: 1.0, fireplace: 1.0, lofi: 0.85, forest: 0.9, brown: 0.8 };

    function ensureCtx() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        try { ctx = new AC({ latencyHint: "playback" }); } catch (_) { ctx = new AC(); }
        masterGain = ctx.createGain();
        masterGain.gain.value = 0;
        // Tone control: low-pass that tames hiss / high frequencies (Warm <-> Bright slider)
        toneLp = ctx.createBiquadFilter();
        toneLp.type = "lowpass"; toneLp.Q.value = 0.5;
        toneLp.frequency.value = toneToHz(toneLevel);
        // Gentle glue compressor so stacked tracks never clip
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -14; comp.knee.value = 12; comp.ratio.value = 3;
        comp.attack.value = 0.02; comp.release.value = 0.4;
        // Brick-wall-ish limiter as the last stage: no hard clipping on the speakers
        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -2; limiter.knee.value = 0; limiter.ratio.value = 20;
        limiter.attack.value = 0.003; limiter.release.value = 0.1;
        masterGain.connect(toneLp);
        toneLp.connect(comp);
        comp.connect(limiter);
        limiter.connect(ctx.destination);
        startTicker();
        // Shared room reverb (generated impulse response)
        const conv = ctx.createConvolver();
        conv.buffer = makeImpulse(1.6, 3);
        reverbSend = ctx.createGain();
        reverbSend.gain.value = 1;
        reverbSend.connect(conv);
        conv.connect(masterGain);
      }
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      return ctx;
    }
    function unlock() { ensureCtx(); }

    function makeImpulse(seconds, decay) {
      const sr = ctx.sampleRate, len = Math.floor(sr * seconds);
      const buf = ctx.createBuffer(2, len, sr);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      return buf;
    }

    // Stereo noise buffer with a short crossfade at the loop point (no click)
    function noiseBuffer(seconds, type) {
      const key = type + seconds;
      if (bufCache[key]) return bufCache[key];
      const sr = ctx.sampleRate, len = Math.floor(sr * seconds), fade = Math.floor(sr * 0.05);
      const buf = ctx.createBuffer(2, len, sr);
      for (let ch = 0; ch < 2; ch++) {
        const tmp = new Float32Array(len + fade);
        let b0 = 0, b1 = 0, b2 = 0, last = 0;
        for (let i = 0; i < tmp.length; i++) {
          const w = Math.random() * 2 - 1;
          if (type === "white") tmp[i] = w * 0.5;
          else if (type === "pink") {
            b0 = 0.99765 * b0 + w * 0.099046;
            b1 = 0.963 * b1 + w * 0.2965164;
            b2 = 0.57 * b2 + w * 1.0526913;
            tmp[i] = (b0 + b1 + b2 + w * 0.1848) * 0.06;
          } else {
            last = (last + 0.02 * w) / 1.02;
            tmp[i] = last * 3.5;
          }
        }
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = tmp[i];
        for (let i = 0; i < fade; i++) { const a = i / fade; d[i] = tmp[i] * a + tmp[len + i] * (1 - a); }
      }
      bufCache[key] = buf;
      return buf;
    }
    function loopNoise(type, seconds) {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(seconds, type);
      src.loop = true;
      src.start(0, Math.random() * seconds);
      return src;
    }
    function filter(type, freq, q) {
      const f = ctx.createBiquadFilter();
      f.type = type; f.frequency.value = freq;
      if (q != null) f.Q.value = q;
      return f;
    }
    function gainNode(v) { const g = ctx.createGain(); g.gain.value = v; return g; }
    function panner(p) {
      if (ctx.createStereoPanner) { const n = ctx.createStereoPanner(); n.pan.value = p; return n; }
      return ctx.createGain();
    }
    function chain(...nodes) { for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); return nodes[nodes.length - 1]; }
    function rand(a, b) { return a + Math.random() * (b - a); }
    function isOn(id) { return (desired[id] || 0) > 0.0005; }
    // Run fn at random intervals, but only do the work while the track is audible
    //
    // Background-safe scheduler. Browsers throttle setTimeout/setInterval in hidden tabs
    // (to ~1 s, later ~1/min), which starved the event scheduling and caused crackling when
    // switching tabs. Timers inside a Worker are not throttled, so one Worker ticks every
    // 25 ms and all random sound events / the lo-fi sequencer run from those ticks.
    const tasks = [];
    let ticker = null;
    function runTasks() {
      const now = performance.now();
      for (let i = 0; i < tasks.length; i++) {
        const t = tasks[i];
        if (now < t.at) continue;
        try { t.fn(); } catch (_) {}
        t.at = now + t.delay(); // from "now": never replay a backlog after a long pause
      }
    }
    function startTicker() {
      if (ticker) return;
      try {
        const src = "setInterval(function(){postMessage(0)},25)";
        const url = URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
        const w = new Worker(url);
        w.onmessage = runTasks;
        ticker = w;
      } catch (_) {
        ticker = setInterval(runTasks, 25); // fallback (e.g. strict CSP)
      }
    }
    function addTask(fn, delay, firstDelay) {
      tasks.push({ fn, delay, at: performance.now() + (firstDelay == null ? delay() : firstDelay) });
    }
    function every(id, minMs, maxMs, fn) {
      addTask(
        () => { if (isOn(id) && ctx.state === "running") fn(); },
        () => rand(minMs, maxMs),
        rand(0, minMs)
      );
    }
    // Slow random drift of an AudioParam (gusts, flicker, wandering filters)
    function drift(id, param, min, max, minMs, maxMs, tc) {
      every(id, minMs, maxMs, () => param.setTargetAtTime(rand(min, max), ctx.currentTime, tc));
    }
    // One-shot decaying noise burst (drops, crackles, hats, thuds)
    function burst(dest, { type = "white", dur = 0.05, gain = 0.1, ftype = "bandpass", freq = 2000, q = 1, pan = 0, when = ctx.currentTime, attack = 0.002 }) {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuffer(2, type);
      const f = filter(ftype, freq, q);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(gain, when + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      chain(src, f, g, panner(pan), dest);
      src.start(when, Math.random() * 1.5, dur + 0.05);
    }
    function tone(dest, { freq, type = "sine", dur = 0.3, gain = 0.1, when = ctx.currentTime, attack = 0.005, freqEnd = null, pan = 0 }) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(freq, when);
      if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, when + dur * 0.8);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(gain, when + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      chain(o, g, panner(pan), dest);
      o.start(when); o.stop(when + dur + 0.05);
      return o;
    }

    // ---- Track builders: each returns its output GainNode ------------------
    function buildRain(out) {
      // Steady hiss + body + low roof rumble
      const hissG = gainNode(0.32);
      chain(loopNoise("white", 9), filter("highpass", 900), filter("lowpass", 7500), hissG, out);
      drift("rain", hissG.gain, 0.22, 0.42, 1500, 4000, 1.2); // gusts
      chain(loopNoise("pink", 11), filter("bandpass", 1300, 0.5), gainNode(0.75), out);
      chain(loopNoise("brown", 13), filter("lowpass", 260), gainNode(0.45), out);
      // Individual drops all over the stereo field
      every("rain", 35, 220, () => burst(out, { dur: rand(0.015, 0.05), gain: rand(0.015, 0.06), freq: rand(1800, 5200), q: rand(1, 4), pan: rand(-0.85, 0.85) }));
      // Gutter drips (pitched plinks)
      every("rain", 1200, 4200, () => tone(out, { freq: rand(1800, 3200), freqEnd: rand(900, 1400), dur: 0.09, gain: rand(0.015, 0.035), pan: rand(-0.7, 0.7) }));
      // Distant thunder
      every("rain", 45000, 110000, () => {
        const t = ctx.currentTime;
        const src = ctx.createBufferSource(); src.buffer = noiseBuffer(13, "brown");
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(rand(0.5, 0.9), t + rand(0.6, 1.4));
        g.gain.exponentialRampToValueAtTime(0.0001, t + rand(5, 8));
        chain(src, filter("lowpass", rand(110, 180)), g, panner(rand(-0.5, 0.5)), out);
        src.start(t, rand(0, 4), 9);
      });
      return 0.12; // reverb send
    }
    function buildCafe(out) {
      // Room tone
      chain(loopNoise("brown", 9), filter("bandpass", 420, 0.6), gainNode(0.5), out);
      // Murmur: several "voices" — narrow formant bands with syllable-like envelopes
      for (let v = 0; v < 5; v++) {
        const f1 = filter("bandpass", rand(350, 800), rand(3, 6));
        const f2 = filter("bandpass", rand(1100, 2200), rand(4, 8));
        const env = gainNode(0);
        const pan = panner(rand(-0.8, 0.8));
        const src = loopNoise("pink", 7);
        src.connect(f1); src.connect(f2);
        const mix = gainNode(1); f1.connect(mix); f2.connect(gainNode(0.4)).connect(mix);
        chain(mix, filter("lowpass", 2400), env, pan, out);
        const level = rand(0.25, 0.6);
        every("cafe", 110, 320, () => {
          const talking = Math.random() < 0.72;
          env.gain.setTargetAtTime(talking ? rand(0.25, 1) * level : 0, ctx.currentTime, 0.05);
          if (Math.random() < 0.08) { f1.frequency.setTargetAtTime(rand(350, 800), ctx.currentTime, 0.4); }
        });
      }
      // Cups & spoons: inharmonic metallic partials
      every("cafe", 2200, 7000, () => {
        const base = rand(1900, 3000), p = rand(-0.8, 0.8), g = rand(0.02, 0.045);
        [1, 2.76, 5.4].forEach((m, i) => tone(out, { freq: base * m, dur: rand(0.25, 0.6) / (i + 1), gain: g / (i + 1), pan: p, attack: 0.002 }));
        if (Math.random() < 0.4) setTimeout(() => tone(out, { freq: base * 1.07, dur: 0.2, gain: g * 0.5, pan: p, attack: 0.002 }), rand(90, 200));
      });
      // Cup set down on a saucer / table
      every("cafe", 5000, 14000, () => burst(out, { type: "brown", dur: 0.08, gain: 0.25, ftype: "lowpass", freq: 600, pan: rand(-0.6, 0.6) }));
      return 0.35;
    }
    function buildOcean(out) {
      // Undertow bed
      chain(loopNoise("brown", 12), filter("lowpass", 380), gainNode(0.3), out);
      // Individual waves: swell -> crash -> foamy retreat
      function wave() {
        const t = ctx.currentTime;
        const rise = rand(2.2, 3.6), fall = rand(4, 6.5), peak = rand(0.45, 0.85), pan = rand(-0.45, 0.45);
        const src = ctx.createBufferSource(); src.buffer = noiseBuffer(12, "pink");
        const lp = filter("lowpass", 300);
        lp.frequency.setValueAtTime(300, t);
        lp.frequency.exponentialRampToValueAtTime(rand(1800, 2600), t + rise);
        lp.frequency.exponentialRampToValueAtTime(450, t + rise + fall);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(peak, t + rise);
        g.gain.exponentialRampToValueAtTime(0.0001, t + rise + fall);
        chain(src, lp, g, panner(pan), out);
        src.start(t, rand(0, 5), rise + fall + 0.2);
        // Foam hiss right after the crash
        const fs = ctx.createBufferSource(); fs.buffer = noiseBuffer(9, "white");
        const fg = ctx.createGain();
        fg.gain.setValueAtTime(0.0001, t + rise - 0.3);
        fg.gain.exponentialRampToValueAtTime(peak * 0.35, t + rise + 0.2);
        fg.gain.exponentialRampToValueAtTime(0.0001, t + rise + fall * 0.8);
        chain(fs, filter("highpass", 2600), fg, panner(-pan * 0.6), out);
        fs.start(t, rand(0, 3), rise + fall);
      }
      every("ocean", 5200, 9500, wave);
      return 0.15;
    }
    function buildFireplace(out) {
      // Low roar with a wandering cutoff
      const roarLp = filter("lowpass", 320);
      chain(loopNoise("brown", 9), roarLp, gainNode(0.7), out);
      drift("fireplace", roarLp.frequency, 200, 450, 400, 1400, 0.3);
      // Flame breath
      const hiss = gainNode(0.08);
      chain(loopNoise("white", 7), filter("bandpass", 2400, 0.5), hiss, out);
      drift("fireplace", hiss.gain, 0.03, 0.12, 150, 600, 0.08);
      // Crackle clusters across the stereo field
      every("fireplace", 120, 900, () => {
        const t = ctx.currentTime, n = 1 + Math.floor(Math.random() * 5), p = rand(-0.6, 0.6);
        for (let i = 0; i < n; i++) {
          burst(out, { dur: rand(0.004, 0.02), gain: rand(0.05, 0.18), ftype: "highpass", freq: rand(2500, 5000), q: 0.7, pan: p + rand(-0.1, 0.1), when: t + i * rand(0.005, 0.03), attack: 0.0008 });
        }
      });
      // Occasional wood pop / log settling
      every("fireplace", 3000, 9000, () => {
        const p = rand(-0.5, 0.5);
        tone(out, { freq: rand(90, 150), freqEnd: 50, dur: 0.18, gain: 0.18, pan: p, attack: 0.002 });
        burst(out, { dur: 0.06, gain: 0.12, ftype: "bandpass", freq: 900, q: 1.5, pan: p });
      });
      return 0.1;
    }
    function buildForest(out) {
      // Wind through trees
      const windBp = filter("bandpass", 500, 0.7);
      const windG = gainNode(0.35);
      chain(loopNoise("pink", 11), windBp, windG, out);
      drift("forest", windBp.frequency, 300, 900, 1500, 4000, 1.5);
      drift("forest", windG.gain, 0.18, 0.5, 2000, 5000, 1.8);
      // Leaves rustle
      const leaves = gainNode(0.05);
      chain(loopNoise("white", 8), filter("highpass", 4200), leaves, out);
      drift("forest", leaves.gain, 0.01, 0.09, 600, 2200, 0.4);
      // Birds: a few "species" with different chirp shapes, near and far
      const species = [
        { f: [2600, 4200], dur: 0.09, n: [3, 6], gap: 0.12 },  // quick tweets
        { f: [1800, 2600], dur: 0.25, n: [2, 3], gap: 0.3 },   // slow whistles
        { f: [3500, 5200], dur: 0.05, n: [5, 9], gap: 0.06 },  // trills
        { f: [1300, 1700], dur: 0.35, n: [2, 2], gap: 0.45 }   // cuckoo-ish
      ];
      every("forest", 1400, 5500, () => {
        const s = species[Math.floor(Math.random() * species.length)];
        const far = Math.random() < 0.45;
        const pan = rand(-0.9, 0.9), base = rand(s.f[0], s.f[1]);
        const n = Math.round(rand(s.n[0], s.n[1]));
        let t = ctx.currentTime;
        for (let i = 0; i < n; i++) {
          const up = Math.random() < 0.6;
          tone(out, { freq: base * (up ? 0.85 : 1.15), freqEnd: base * (up ? 1.2 : 0.8), dur: s.dur, gain: far ? 0.012 : rand(0.025, 0.05), pan, when: t, attack: 0.01 });
          t += s.dur + s.gap * rand(0.7, 1.3);
        }
      });
      return 0.3;
    }
    function buildBrown(out) {
      chain(loopNoise("brown", 15), filter("lowpass", 900), gainNode(0.8), out);
      return 0;
    }
    function buildLofi(out) {
      // Tape-ish bus: everything goes through a soft lowpass
      const bus = gainNode(1);
      chain(bus, filter("lowpass", 3600), out);
      // Vinyl: hiss + sparse clicks
      chain(loopNoise("white", 6), filter("bandpass", 5000, 0.4), gainNode(0.012), bus);
      every("lofi", 80, 700, () => burst(bus, { dur: 0.004, gain: rand(0.02, 0.08), ftype: "highpass", freq: 3000, attack: 0.0005 }));
      // Wow & flutter applied to all pitched notes
      const wobble = ctx.createOscillator(); wobble.frequency.value = 0.45;
      const wobbleDepth = gainNode(7); // cents
      wobble.connect(wobbleDepth); wobble.start();

      const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
      const prog = [
        { bass: 45, notes: [57, 60, 64, 67, 71] }, // Am9
        { bass: 38, notes: [62, 65, 69, 72] },     // Dm7
        { bass: 41, notes: [53, 57, 60, 64] },     // Fmaj7
        { bass: 43, notes: [55, 59, 62, 64] }      // G6
      ];
      const BPM = 72, beat = 60 / BPM, six = beat / 4, swing = beat * 0.07;
      let step = 0, bar = 0, nextTime = 0;

      function epiano(m, when, dur, vel) {
        [[1, "sine", 1], [2, "triangle", 0.18]].forEach(([mult, type, lvl]) => {
          const o = ctx.createOscillator(); o.type = type;
          o.frequency.value = midi(m) * mult;
          o.detune.value = rand(-6, 6);
          wobbleDepth.connect(o.detune);
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.0001, when);
          g.gain.exponentialRampToValueAtTime(vel * lvl, when + 0.012);
          g.gain.exponentialRampToValueAtTime(vel * lvl * 0.35, when + 0.6);
          g.gain.setValueAtTime(vel * lvl * 0.35, when + dur - 0.25);
          g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
          chain(o, filter("lowpass", 1600), g, bus);
          o.start(when); o.stop(when + dur + 0.05);
        });
      }
      function kick(when) {
        const o = ctx.createOscillator();
        o.frequency.setValueAtTime(120, when);
        o.frequency.exponentialRampToValueAtTime(42, when + 0.25);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, when);
        g.gain.exponentialRampToValueAtTime(0.55, when + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, when + 0.38);
        chain(o, g, bus); o.start(when); o.stop(when + 0.4);
      }
      function snare(when) {
        burst(bus, { dur: 0.18, gain: 0.16, freq: 1800, q: 0.8, when });
        tone(bus, { freq: 190, freqEnd: 150, dur: 0.1, gain: 0.08, when });
      }
      function hat(when, vel) { burst(bus, { dur: 0.035, gain: vel, ftype: "highpass", freq: 7500, when, attack: 0.001 }); }

      function scheduleStep(s, t) {
        const chord = prog[bar % prog.length];
        if (s === 0) {
          chord.notes.forEach((m, i) => epiano(m, t + i * 0.012, beat * 3.6, 0.05));
          tone(bus, { freq: midi(chord.bass), type: "triangle", dur: beat * 1.6, gain: 0.16, when: t, attack: 0.01 });
        }
        if (s === 10) tone(bus, { freq: midi(chord.bass), type: "triangle", dur: beat * 0.9, gain: 0.12, when: t, attack: 0.01 });
        if (s === 6 && Math.random() < 0.5) chord.notes.slice(1).forEach((m) => epiano(m, t, beat * 1.2, 0.025));
        if (s === 0 || s === 8 || (s === 11 && Math.random() < 0.35)) kick(t);
        if (s === 4 || s === 12) snare(t);
        if (s % 2 === 0) hat(t, s % 4 === 0 ? 0.035 : 0.022);
        else if (Math.random() < 0.15) hat(t, 0.012);
      }
      addTask(() => {
        if (!isOn("lofi") || ctx.state !== "running") { nextTime = 0; step = 0; return; }
        if (nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.05; // catch up without restarting the bar
        while (nextTime < ctx.currentTime + 1.2) { // generous look-ahead
          const swingOffset = step % 4 === 2 ? swing : 0;
          scheduleStep(step, nextTime + swingOffset);
          nextTime += six;
          step = (step + 1) % 16;
          if (step === 0) bar++;
        }
      }, () => 50, 0);
      return 0.12;
    }
    const BUILDERS = { rain: buildRain, cafe: buildCafe, ocean: buildOcean, fireplace: buildFireplace, lofi: buildLofi, forest: buildForest, brown: buildBrown };

    function buildTrack(id) {
      if (tracks[id] || !BUILDERS[id] || !ensureCtx()) return tracks[id];
      const out = ctx.createGain();
      out.gain.value = 0;
      out.connect(masterGain);
      let send = 0;
      try { send = BUILDERS[id](out) || 0; } catch (e) { console.error(e); }
      if (send > 0) { const s = gainNode(send); out.connect(s); s.connect(reverbSend); }
      tracks[id] = { gain: out };
      return tracks[id];
    }

    function setMaster(vol) {
      if (!ensureCtx()) return;
      masterGain.gain.setTargetAtTime(Math.max(0, vol), ctx.currentTime, 0.08);
    }
    function setTrack(id, on, vol) {
      const target = on ? Math.max(0, Math.min(1, vol)) * (TRIM[id] || 1) : 0;
      desired[id] = target;
      if (target > 0) buildTrack(id); // build lazily on first use
      const t = tracks[id];
      if (!t || !ctx) return;
      t.gain.gain.setTargetAtTime(target, ctx.currentTime, 0.35);
    }
    // Smoothly fade the master to 0 (used by the sleep timer)
    function fadeOut(seconds) {
      if (!ctx || !masterGain) return;
      const now = ctx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0, now + seconds);
    }
    function setTone(v) {
      toneLevel = Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0.6));
      if (toneLp && ctx) toneLp.frequency.setTargetAtTime(toneToHz(toneLevel), ctx.currentTime, 0.05);
    }
    function getContext() { ensureCtx(); return ctx; }

    return { unlock, setMaster, setTone, setTrack, fadeOut, getContext, TRACKS: Object.keys(BUILDERS) };
  })();
  function unlockAudioIfNeeded() { try { AmbientEngine.unlock(); } catch (_) {} }

  // -------- Notification Sounds — 5 procedural chimes + repeat -------------
  const NotificationSounds = (function () {
    const VALID = ["chime", "bell", "zen", "digital", "nature"];
    function normalize(id) { return VALID.includes(id) ? id : "chime"; }
    function normRepeat(n) {
      const x = Number(n);
      if (!Number.isFinite(x)) return 2;
      return Math.max(1, Math.min(5, Math.round(x)));
    }
    function getCtx() {
      const c = (AmbientEngine && typeof AmbientEngine.getContext === "function")
        ? AmbientEngine.getContext()
        : null;
      if (!c) {
        const AC = window.AudioContext || window.webkitAudioContext;
        return AC ? new AC() : null;
      }
      return c;
    }
    let activeStop = null;
    function stopActive() {
      if (typeof activeStop === "function") {
        try { activeStop(); } catch (_) {}
        activeStop = null;
      }
    }

    // --- Individual chime players (each returns stop fn + duration ms) ----
    function playChime(ctx, master, when) {
      // Two-note pleasant ding-dong (E5 → A4)
      const dur = 1100;
      const o1 = ctx.createOscillator(); const g1 = ctx.createGain();
      o1.type = "sine"; o1.frequency.setValueAtTime(659.25, when);
      g1.gain.setValueAtTime(0.0001, when);
      g1.gain.exponentialRampToValueAtTime(0.28, when + 0.02);
      g1.gain.exponentialRampToValueAtTime(0.0001, when + 0.45);
      o1.connect(g1).connect(master);
      o1.start(when); o1.stop(when + 0.5);

      const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
      o2.type = "sine"; o2.frequency.setValueAtTime(440.0, when + 0.35);
      g2.gain.setValueAtTime(0.0001, when + 0.35);
      g2.gain.exponentialRampToValueAtTime(0.26, when + 0.37);
      g2.gain.exponentialRampToValueAtTime(0.0001, when + 1.05);
      o2.connect(g2).connect(master);
      o2.start(when + 0.35); o2.stop(when + 1.1);
      return dur;
    }
    function playBell(ctx, master, when) {
      // Tubular bell-like: fundamental + harmonics
      const dur = 1500;
      const freqs = [523.25, 1046.5, 1569.75];
      const gains = [0.25, 0.12, 0.07];
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(f, when);
        g.gain.setValueAtTime(0.0001, when);
        g.gain.exponentialRampToValueAtTime(gains[i], when + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, when + 1.45 - i * 0.1);
        o.connect(g).connect(master);
        o.start(when); o.stop(when + 1.5);
      });
      return dur;
    }
    function playZen(ctx, master, when) {
      // Tibetan bowl: low fundamental + slow beating via two detuned oscs, long decay
      const dur = 2600;
      const f = 220;
      const o1 = ctx.createOscillator(); const g = ctx.createGain();
      const o2 = ctx.createOscillator();
      o1.type = "sine"; o1.frequency.setValueAtTime(f, when);
      o2.type = "sine"; o2.frequency.setValueAtTime(f * 1.006, when);
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(0.3, when + 0.2);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 2.55);
      o1.connect(g); o2.connect(g); g.connect(master);
      o1.start(when); o2.start(when);
      o1.stop(when + 2.6); o2.stop(when + 2.6);
      return dur;
    }
    function playDigital(ctx, master, when) {
      // Microwave / digital: two short high beeps
      const dur = 700;
      const seqs = [0, 0.22];
      seqs.forEach((off) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "square"; o.frequency.setValueAtTime(1760, when + off);
        g.gain.setValueAtTime(0.0001, when + off);
        g.gain.exponentialRampToValueAtTime(0.13, when + off + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, when + off + 0.13);
        o.connect(g).connect(master);
        o.start(when + off); o.stop(when + off + 0.15);
      });
      return dur;
    }
    function playNature(ctx, master, when) {
      // Soft bird-chirp: two quick pitch-sweep sines
      const dur = 900;
      const chirps = [{ off: 0, fStart: 1600, fEnd: 2400 }, { off: 0.28, fStart: 1800, fEnd: 2700 }];
      chirps.forEach((c) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(c.fStart, when + c.off);
        o.frequency.exponentialRampToValueAtTime(c.fEnd, when + c.off + 0.18);
        g.gain.setValueAtTime(0.0001, when + c.off);
        g.gain.exponentialRampToValueAtTime(0.17, when + c.off + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, when + c.off + 0.22);
        o.connect(g).connect(master);
        o.start(when + c.off); o.stop(when + c.off + 0.25);
      });
      return dur;
    }

    function playOne(id, ctx, master, when) {
      switch (normalize(id)) {
        case "bell":    return playBell(ctx, master, when);
        case "zen":     return playZen(ctx, master, when);
        case "digital": return playDigital(ctx, master, when);
        case "nature":  return playNature(ctx, master, when);
        default:        return playChime(ctx, master, when);
      }
    }

    function play(soundId, repeatOverride) {
      stopActive();
      const ctx = getCtx();
      if (!ctx) return null;
      try { unlockAudioIfNeeded(); } catch (_) {}
      if (ctx.state === "suspended") { try { ctx.resume(); } catch (_) {} }
      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
      const id = normalize(soundId);
      const reps = normRepeat(repeatOverride != null ? repeatOverride : (state.timerSettings && state.timerSettings.notifRepeat));
      let totalDur = 0;
      const gap = 0.22; // seconds between repeats
      for (let i = 0; i < reps; i++) {
        const w = ctx.currentTime + totalDur / 1000 + i * gap;
        const oneDur = playOne(id, ctx, master, w) / 1000;
        totalDur += (oneDur + gap) * 1000;
      }
      const stopAt = ctx.currentTime + totalDur / 1000 + 0.2;
      const stopFn = () => {
        try {
          if (master) master.gain.cancelScheduledValues(stopAt - 1);
          if (master) master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
          if (master) master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        } catch (_) {}
      };
      activeStop = stopFn;
      setTimeout(() => { if (activeStop === stopFn) activeStop = null; }, totalDur + 400);
      return stopFn;
    }

    function preview(id) { return play(id, 1); }
    function playEndOfSession() {
      const s = (state.timerSettings && state.timerSettings.notifSound) || "chime";
      return play(s, state.timerSettings.notifRepeat);
    }

    return { play, preview, playEndOfSession, stop: stopActive, normalize, normRepeat, VALID };
  })();

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
      AmbientEngine.setTone(mx.tone);
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
    // Only sessions not yet finished (ended or marked done are skipped)
    const sorted = [...state.schedule]
      .filter((t) => !t.completed && t.date >= today && combineDateTime(t.date, t.end).getTime() > now.getTime())
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
              ${safeUrl(task.link) ? `<a class="task-link" target="_blank" rel="noreferrer">${t("common.openLink")} ↗</a>` : ""}
            </div>
            <div class="task-actions">
              <button type="button" class="btn ${task.completed ? "btn-secondary" : "btn-ghost"} btn-sm" data-action="toggle">${task.completed ? t("common.undo") : t("common.done")}</button>
              <button type="button" class="btn btn-ghost btn-icon-sm" data-action="remove" aria-label="${t("common.delete")}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>`;
          li.querySelector(".task-name").textContent = task.name;
          const linkEl = li.querySelector(".task-link");
          if (linkEl) linkEl.href = safeUrl(task.link);
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
  // Only allow http(s) links (blocks javascript: etc. from imported/typed data)
  function safeUrl(raw) {
    if (!raw) return "";
    try {
      const u = new URL(String(raw).trim(), location.href);
      return u.protocol === "http:" || u.protocol === "https:" ? u.href : "";
    } catch (_) { return ""; }
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
  // Returns the subject id (existing one when the name is a case-insensitive duplicate), or null if empty
  function addSubject(rawName) {
    const name = String(rawName || "").trim().slice(0, 40);
    if (!name) return null;
    const dup = state.subjects.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (dup) return dup.id;
    const usedTones = new Set(state.subjects.map((s) => s.tone));
    const tone = TONES.find((x) => !usedTones.has(x)) || TONES[state.subjects.length % TONES.length];
    const id = uid();
    state.subjects.push({ id, name, tone });
    persist();
    renderSubjectChips();
    renderSchedule();
    renderKanban();
    renderCharts();
    renderFocusSubjectPicker();
    renderInsightsHistory();
    return id;
  }
  function deleteSubject(id) {
    const subj = state.subjects.find((s) => s.id === id);
    if (!subj) return;
    const ok = window.confirm(formatTpl(t("data.deleteSubjectConfirm"), { name: subj.name }));
    if (!ok) return;
    state.subjects = state.subjects.filter((s) => s.id !== id);
    // Unassign from all references (replace id -> undefined)
    const unassign = (obj) => {
      if (!obj || typeof obj !== "object") return;
      if (obj.subjectId === id) {
        delete obj.subjectId;
      }
    };
    (state.logs || []).forEach(unassign);
    (state.schedule || []).forEach(unassign);
    (state.kanban || []).forEach(unassign);
    // Remembered selections
    if (state.timer && state.timer.subjectId === id) {
      delete state.timer.subjectId;
    }
    if (state.timerSettings && state.timerSettings.lastSubjectId === id) {
      state.timerSettings.lastSubjectId = null;
    }
    persist();
    renderAll();
    try {
      const msg = t("data.deletedSubject");
      if (typeof window.toast === "function") window.toast(msg);
      else if (msg) setTimeout(() => window.alert(msg), 0);
    } catch (_) {}
  }
  function renderSubjectChips() {
    const ul = document.getElementById("subject-chips");
    if (!ul) return;
    ul.innerHTML = "";
    state.subjects.forEach((s) => {
      const li = document.createElement("li");
      li.className = "subject-chip";
      li.dataset.subjectId = s.id;
      const label = document.createElement("span");
      label.className = "chip-label";
      label.textContent = s.name;
      li.appendChild(label);
      const del = document.createElement("button");
      del.type = "button";
      del.className = "chip-delete";
      del.setAttribute("aria-label", t("common.delete"));
      del.title = t("common.delete");
      del.dataset.deleteSubject = s.id;
      del.innerHTML = '&times;';
      li.appendChild(del);
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
    // applyTranslations() resets this to the raw "{n}" template
    const descEl = document.querySelector("#dialog-timer .desc");
    if (descEl) descEl.textContent = formatTpl(t("timerSettings.desc"), { n: state.timerSettings.longBreakEvery });
    if (typeof Onboarding !== "undefined" && Onboarding.isOpen()) Onboarding.render();
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
  let chartSig = "";
  function renderCharts() {
    if (typeof Chart === "undefined") return;
    const barCanvas = document.getElementById("chart-bar");
    const donutCanvas = document.getElementById("chart-donut");
    if (!barCanvas || !donutCanvas) return;
    // Rebuilding two Chart.js charts blocks the main thread for a few hundred ms. Skip it when
    // nothing they show has changed (e.g. just switching tabs) and only let them re-measure.
    const sig = [
      currentLang, todayISO(),
      getComputedStyle(document.body).getPropertyValue("--color-accent").trim(),
      state.subjects.map((x) => x.id + x.name + x.tone).join("|"),
      state.logs.map((l) => l.date + ":" + l.minutes + ":" + (l.subjectId || "")).join(",")
    ].join("#");
    if (sig === chartSig && barChartInstance && donutChartInstance) {
      try { barChartInstance.resize(); donutChartInstance.resize(); } catch (_) {}
      return;
    }
    chartSig = sig;

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
          backgroundColor: getComputedStyle(document.body).getPropertyValue("--color-accent").trim() || "#8a9e8e",
          borderRadius: 6,
          maxBarThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 250 },
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
        animation: { duration: 250 },
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
    state = normalizeState(Object.assign(seedSampleData(), obj));
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
    renderFocusSubjectPicker();
    renderInsightsHistory();
    renderStats();
    // Update timer-settings dialog previews
    const s = state.timerSettings;
    document.getElementById("ts-focus").value = s.focusMin;
    document.getElementById("ts-short").value = s.shortBreakMin;
    document.getElementById("ts-long").value = s.longBreakMin;
    document.getElementById("ts-every").value = s.longBreakEvery;
    document.getElementById("ts-autostart").checked = !!s.autoStart;
    const selSound = document.getElementById("ts-notif-sound");
    if (selSound) selSound.value = NotificationSounds.normalize(s.notifSound);
    const repEl = document.getElementById("ts-notif-repeat");
    if (repEl) repEl.value = String(NotificationSounds.normRepeat(s.notifRepeat));
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
      // Remember how long the current session was meant to be BEFORE the settings change
      const oldTotal = state.timer.plannedMs || durationMsFor(state.timer.mode);
      state.timerSettings.focusMin = fm("ts-focus", 1, 180, 25);
      state.timerSettings.shortBreakMin = fm("ts-short", 1, 180, 5);
      state.timerSettings.longBreakMin = fm("ts-long", 1, 180, 15);
      state.timerSettings.longBreakEvery = fm("ts-every", 1, 12, 4);
      state.timerSettings.autoStart = !!document.getElementById("ts-autostart").checked;
      const selSnd = document.getElementById("ts-notif-sound");
      state.timerSettings.notifSound = selSnd ? NotificationSounds.normalize(selSnd.value) : "chime";
      state.timerSettings.notifRepeat = NotificationSounds.normRepeat(fm("ts-notif-repeat", 1, 5, 2));
      // Apply a new session length without throwing away progress made before pausing.
      if (!state.timer.running) {
        const newTotal = durationMsFor(state.timer.mode);
        const elapsed = Math.max(0, oldTotal - state.timer.remainingMs);
        if (elapsed < 1000) {
          // Untouched timer: just show the new full length
          state.timer.remainingMs = newTotal;
          state.timer.plannedMs = null;
        } else {
          // Paused mid-session: keep the time already studied, change only the target
          state.timer.remainingMs = Math.max(1000, newTotal - elapsed);
          state.timer.plannedMs = newTotal;
        }
      }
      persist();
      renderAll();
      closeDialog("dialog-timer");
    });
    // Notification preview button (timer settings dialog)
    const previewBtn = document.getElementById("btn-notif-preview");
    if (previewBtn) {
      previewBtn.addEventListener("click", () => {
        try { unlockAudioIfNeeded(); } catch (_) {}
        const selSnd = document.getElementById("ts-notif-sound");
        const id = selSnd ? NotificationSounds.normalize(selSnd.value) : "chime";
        const rep = NotificationSounds.normRepeat(Number(document.getElementById("ts-notif-repeat").value));
        NotificationSounds.preview && NotificationSounds.preview(id);
      });
    }
    // Dock controls
    document.getElementById("dock-toggle-btn").addEventListener("click", () => {
      state.timer.running ? pauseTimer() : startTimer();
    });
    document.getElementById("dock-open-focus").addEventListener("click", () => switchView("focus"));

    // Keyboard shortcuts (Space → play/pause timer)
    window.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
      const dialogOpen = !!document.querySelector(".dialog-backdrop.open");
      if (e.code === "Space" && !dialogOpen) {
        e.preventDefault();
        state.timer.running ? pauseTimer() : startTimer();
      }
      if (e.key === "Escape") {
        if (Onboarding.isOpen()) Onboarding.finish();
        document.querySelectorAll(".dialog-backdrop.open").forEach((d) => d.classList.remove("open"));
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
        renderCharts(); // bar color follows the accent
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

    // Zen Mode open buttons (mobile header, sidebar desktop, timer card-head)
    const zenOpenIds = ["btn-zen-mobile", "btn-zen-sidebar", "btn-zen-timer"];
    zenOpenIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", () => ZenMode.open());
    });
    const bx = document.getElementById("btn-exit-zen");
    if (bx) bx.addEventListener("click", () => ZenMode.close());

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
      if (ed.getTime() <= sd.getTime()) {
        alert(currentLang === "vi" ? "Giờ kết thúc phải sau giờ bắt đầu." : "End time must be after start time.");
        return;
      }
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
      if (addSubject(document.getElementById("subject-name").value)) {
        document.getElementById("subject-name").value = "";
      }
    });
    // Data view: delete subject (event delegation)
    const chipsUl = document.getElementById("subject-chips");
    if (chipsUl) {
      chipsUl.addEventListener("click", (e) => {
        const btn = (e.target && (e.target.closest ? e.target.closest("[data-delete-subject]") : null)) || null;
        if (!btn) return;
        e.stopPropagation();
        e.preventDefault();
        const id = btn.getAttribute("data-delete-subject");
        if (id) deleteSubject(id);
      });
    }
    // Focus view: subject picker change (instantly remember selection)
    const fss = document.getElementById("focus-subject-select");
    if (fss) {
      fss.addEventListener("change", () => {
        const v = fss.value || null;
        state.timer.subjectId = v || undefined;
        if (v) state.timerSettings.lastSubjectId = v;
        persist();
        renderFocusSubjectPicker();
      });
    }
    // Focus view: quick add subject toggle
    const openQa = document.getElementById("focus-btn-open-quick-add");
    const qaForm = document.getElementById("focus-quick-add-subject-form");
    const qaInput = document.getElementById("focus-quick-add-subject-input");
    const qaCancel = document.getElementById("focus-quick-add-cancel");
    if (openQa && qaForm && qaInput) {
      openQa.addEventListener("click", () => {
        qaForm.style.display = qaForm.style.display === "flex" ? "none" : "flex";
        if (qaForm.style.display === "flex") setTimeout(() => qaInput.focus(), 0);
      });
    }
    if (qaCancel && qaForm) {
      qaCancel.addEventListener("click", () => {
        qaForm.style.display = "none";
        if (qaInput) qaInput.value = "";
      });
    }
    if (qaForm && qaInput) {
      qaForm.addEventListener("submit", (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const newId = addSubject(qaInput.value);
        if (!newId) return;
        state.timerSettings.lastSubjectId = newId;
        state.timer.subjectId = newId;
        persist();
        qaInput.value = "";
        qaForm.style.display = "none";
        renderFocusSubjectPicker();
      });
    }
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
        if (e.target !== bd) return;
        // Onboarding needs an explicit Skip/Finish so a stray click doesn't dismiss it
        if (bd.id === "dialog-onboard") return;
        bd.classList.remove("open");
      });
    });
    document.querySelectorAll("[data-dialog-close]").forEach((b) => {
      b.addEventListener("click", () => closeDialog(b.getAttribute("data-dialog-close")));
    });
  }

  // -------- Bridge for add-on modules (js/features.js) ------------------------
  window.QH = {
    get state() { return state; },
    get lang() { return currentLang; },
    persist, t, formatTpl, minutesToLabel, todayISO, addDays, computeStreak,
    subjectNameFor, rebuildSubjectOptions, openDialog, closeDialog, switchView,
    renderMixer, unlockAudio: unlockAudioIfNeeded,
    fadeOutAmbient: (s) => AmbientEngine.fadeOut(s),
    setTone: (v, save) => { state.mixer.tone = v; AmbientEngine.setTone(v); if (save) persist(); },
    TONES
  };

  // -------- Bootstrap --------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // Apply persisted theme/background ASAP (before paint) to avoid FOUC
    Appearance.init();
    applyTranslations();
    // Sync Zen button tooltips after language is applied
    ZenMode.init();
    wireUI();
    renderAll();
    // Sync swatch active states in Data panel
    Appearance.refreshActiveSwatches();
    // Restore last view (always call switchView so the dock visibility is correct on first load)
    let savedView = null;
    try { savedView = sessionStorage.getItem("quiethours-static-view"); } catch (_) {}
    switchView(savedView && document.getElementById("view-" + savedView) ? savedView : "focus");
    Onboarding.init();
    document.dispatchEvent(new CustomEvent("qh:ready"));
  });
})();
