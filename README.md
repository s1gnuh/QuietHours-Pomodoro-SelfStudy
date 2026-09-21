# QuietHours

> **Your private, distraction-free study room — 100% offline-first, zero dependencies, zero build step.**
> Phòng học tập cá nhân — không bị xao nhãng, 100% hoạt động trên trình duyệt, không cài gì cả.

---

## 🇬🇧 English

### What is QuietHours?
QuietHours is a static, self-contained web app that turns any browser tab into a calm Pomodoro / focus workspace. All data lives inside your browser's `localStorage` — there is no backend, no account, no telemetry.

### ✨ Features
- 🍅 **Pomodoro Timer** — Focus / Short break / Long break cycles with auto-start, configurable durations, and **5 end-of-session notification chimes** (Chime / Bell / Zen Bowl / Digital / Nature) plus 1–5 repeat.
- 📅 **Study Schedule (Lịch học)** — calendar view with built-in **Vietnamese Lunar (Hồ Ngọc Đức algorithm)** support.
- 📋 **Task Board (Bảng việc)** — your own TODO / task list.
- 📊 **Insights (Thống kê)** — weekly & all-time Pomodoro stats rendered with **Chart.js**, plus a **Weekly Report Card** you can export as PNG (Story).
- 🌧️ **Ambient Sound Mixer** — 5 procedurally-generated tracks via the Web Audio API (Rain / Café / Ocean / Fireplace / Lo-fi) with per-track volume sliders and master volume.
- 🔥 **Daily Quote Card** — 200 bilingual (VI / EN) motivational quotes, picked daily, offline fallback included.
- 🎨 **5 Theme Packs** — Sage / Sunset / Lavender / Ocean / Cyber, switch at any time.
- 🧘 **Zen Mode** — fullscreen distraction-free focus, press `Esc` or click the floating bar to exit.
- 🌐 **Bilingual UI** — Vietnamese · English, one-click switch.
- 📱 **Fully responsive** — optimized for desktop sticky top-nav and mobile 6-column bottom-nav with iPhone safe-area support.
- 🔒 **100% Local Storage** — your data never leaves your browser. Clear site data = wipe everything, back up your localStorage if you need to.

### 🏗️ Tech stack
| Layer | What |
|---|---|
| Markup | Pure HTML5, no framework |
| Styling | Vanilla CSS + custom CSS vars (Themes, light/dark via accent packs) |
| Logic | Vanilla ES6 JavaScript, organized with IIFE modules (`AmbientEngine`, `NotificationSounds`, `Lunar`, `I18N`, `ThemePack`, …) |
| Charts | [Chart.js 4.4.1 UMD](https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js) (CDN) |
| PNG export | [html2canvas 1.4.1 UMD](https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js) (CDN) |
| Audio | Web Audio API, procedurally generated oscillators / noise buffers (no MP3/WAV assets) |
| Persistence | `localStorage` key `quiethours-static-v1` |
| Fonts | Google Fonts **Figtree** (UI) + **Fraunces** (headings) |
| Build step | **None.** Just open [`index.html`](index.html). |

### 🚀 Run locally
No `npm`, no bundler. Any static HTTP server will do. Example:

```bash
# Python 3
python -m http.server 8765
# then visit http://127.0.0.1:8765/
```

Or just open `index.html` directly in most browsers (audio might be blocked until a user gesture — click any button to unlock).

### 📂 Project structure
```
QuietHours/
├── index.html          # Entire app shell + all 6 views (Focus/Schedule/Board/Insights/Data/Guide)
├── css/styles.css      # All styles + 5 theme packs + responsive breakpoints
├── js/app.js           # Full app logic (state, timer, audio, charts, i18n, lunar, etc.)
└── data/quotes.json    # 200 bilingual offline quotes (VI + EN)
```

### 🧑‍💻 Author
Made with ♥ by **Việt Hùng (s1gnuh)**
- GitHub: [github.com/s1gnuh](https://github.com/s1gnuh)
- Facebook: [viet.hung.183615](https://www.facebook.com/viet.hung.183615/)
- Instagram: [@s1gnuh](https://www.instagram.com/s1gnuh/?hl=en)

### 📜 License
MIT — use freely.

---

## 🇻🇳 Tiếng Việt

### QuietHours là gì?
QuietHours là một ứng dụng web tĩnh **chỉ gồm 1 file HTML, 1 file CSS, 1 file JS**, biến tab trình duyệt thành phòng học tập Pomodoro yên tĩnh. Mọi dữ liệu lưu hoàn toàn ở `localStorage` trình duyệt của bạn — **không có server, không cần tài khoản, không thu thập dữ liệu**.

### ✨ Tính năng chính
- 🍅 **Bộ đếm Pomodoro** — 3 chế độ Tập trung / Nghỉ ngắn / Nghỉ dài, tự động chạy phiên tiếp, cấu hình thời gian. **5 loại chuông báo khi hết phiên** (Chime / Chuông tháp / Tibetan Bowl / Digital / Chim hót) + số lần lặp 1–5.
- 📅 **Lịch học** — lịch tháng với hỗ trợ **Lịch Vạn niên Việt Nam** (thuật toán Hồ Ngọc Đức, múi giờ +7).
- 📋 **Bảng việc** — danh sách TODO / ghi chú cá nhân.
- 📊 **Thống kê** — biểu đồ tuần / toàn thời gian bằng **Chart.js** + **Thẻ Tổng Kết Tuần (Weekly Report Card)** xuất ảnh PNG (Story).
- 🌧️ **Trộn nhạc nền** — 5 luồng nhạc nền procedural sinh bằng Web Audio API (Mưa / Quán cà phê / Biển / Lò sưởi / Lo-fi), điều khiển âm lượng từng track + master.
- 🔥 **Câu nói cảm hứng hàng ngày** — 200 câu song ngữ (VI / EN) trong `data/quotes.json`, có 5 câu dự phòng offline nếu load JSON lỗi.
- 🎨 **5 bộ giao diện** — Sage / Sunset / Lavender / Ocean / Cyber, đổi bất cứ lúc nào.
- 🧘 **Chế độ Zen** — toàn màn hình không xao nhãng, nhấn `Esc` hoặc bar nổi để thoát.
- 🌐 **2 ngôn ngữ** — Tiếng Việt · English, 1 click đổi.
- 📱 **Responsive hoàn toàn** — desktop top-nav dính, mobile bottom-nav 6 nút, hỗ trợ safe-area (notch / Dynamic Island iPhone).
- 🔒 **100% Local Storage** — dữ liệu không đi đâu cả. Xóa cache trình duyệt = mất toàn bộ, hãy backup localStorage nếu cần.

### 🏗️ Công nghệ
| Thành phần | Chi tiết |
|---|---|
| Giao diện | HTML5 thuần, không dùng framework |
| Kiểu dáng | CSS + biến CSS tuỳ chỉnh (5 Theme Pack) |
| Logic | ES6 JavaScript thuần, gom thành các IIFE module (`AmbientEngine`, `NotificationSounds`, `Lunar`, `I18N`, `ThemePack`, …) |
| Biểu đồ | [Chart.js 4.4.1 UMD](https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js) (CDN) |
| Xuất ảnh PNG | [html2canvas 1.4.1 UMD](https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js) (CDN) |
| Âm thanh | Web Audio API: OSC / noise buffer procedural **hoàn toàn** — không có file MP3/WAV. |
| Lưu trữ | `localStorage` key `quiethours-static-v1` |
| Fonts | Google Fonts **Figtree** (UI) + **Fraunces** (tiêu đề) |
| Build step | **Không có gì cả.** Mở [`index.html`](index.html) là chạy. |

### 🚀 Chạy local
Không cần `npm`, không cần bundler. Mọi HTTP server tĩnh đều được. Ví dụ với Python 3:

```bash
python -m http.server 8765
# mở trình duyệt vào http://127.0.0.1:8765/
```

Hoặc mở thẳng `index.html` trong File Explorer (âm thanh có thể bị chặn đến khi bạn click một nút bất kỳ).

### 📂 Cấu trúc dự án
```
QuietHours/
├── index.html          # Toàn bộ shell app + 6 màn hình (Tập trung / Lịch / Bảng / Thống kê / Dữ liệu / Cảm ơn & HD)
├── css/styles.css      # CSS toàn app + 5 Theme + breakpoints responsive
├── js/app.js           # Logic toàn app (state, timer, audio, charts, i18n, Lịch âm,…)
└── data/quotes.json    # 200 câu nói offline song ngữ VI / EN
```

### 🧑‍💻 Tác giả
Tạo ra với ♥ bởi **Việt Hùng (s1gnuh)**
- GitHub: [github.com/s1gnuh](https://github.com/s1gnuh)
- Facebook: [viet.hung.183615](https://www.facebook.com/viet.hung.183615/)
- Instagram: [@s1gnuh](https://www.instagram.com/s1gnuh/?hl=en)

### 📜 Bản quyền
MIT — sử dụng tự do.
