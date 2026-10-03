<div align="center">

# 🌙 QuietHours

**A calm, private study room that lives in your browser.**<br>
Pomodoro · ambient sound · schedule · task board · analytics · exam countdown — no backend, no account, no build step.

[![Live demo](https://img.shields.io/badge/Live_demo-open_app-8a9e8e?style=for-the-badge&logo=githubpages&logoColor=white)](https://s1gnuh.github.io/QuietHours-Pomodoro-SelfStudy/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Zero dependencies](https://img.shields.io/badge/Build_step-none-success?style=for-the-badge)](#-getting-started)
[![Languages](https://img.shields.io/badge/UI-English_%7C_Ti%E1%BA%BFng_Vi%E1%BB%87t-orange?style=for-the-badge)](README.vi.md)

**English** · [Tiếng Việt](README.vi.md)

<img src="docs/screenshots/focus.webp" alt="QuietHours — focus view with exam countdown, rank card, Pomodoro dial and ambient mixer" width="900">

</div>

---

## Table of contents

- [Why QuietHours](#-why-quiethours)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting started](#-getting-started)
- [Deploy to GitHub Pages](#-deploy-to-github-pages)
- [How XP and ranks work](#-how-xp-and-ranks-work)
- [Keyboard shortcuts](#-keyboard-shortcuts)
- [Your data and privacy](#-your-data-and-privacy)
- [Tech stack](#-tech-stack)
- [Project structure](#-project-structure)
- [Contributing](#-contributing)
- [Author](#-author) · [License](#-license)

## ✨ Why QuietHours

Most study apps want an account, a subscription, or your data. QuietHours is the opposite: **one static site** you can open anywhere, that stores everything in your own browser and stays out of your way.

- 🔒 **Private by design** — nothing leaves your device. No analytics, no tracking, no server.
- ⚡ **Zero setup** — plain HTML, CSS and vanilla JavaScript. Open `index.html` and study.
- 🎧 **No audio files** — every ambient sound is synthesised live with the Web Audio API.
- 🌐 **Bilingual** — full Vietnamese and English UI, switchable in one click.

## 🚀 Features

### Focus
| | |
|---|---|
| 🍅 **Pomodoro timer** | Focus / short break / long break cycles, auto-start, configurable lengths, glowing progress dial. Every completed session is logged against a subject. |
| 🔔 **End-of-session chimes** | Five synthesised chimes (Chime, Bell, Zen bowl, Digital, Nature) with 1–5 repeats and a preview button. |
| 🧘 **Zen mode** | Fullscreen, distraction-free: just the clock. `Esc` to exit. |
| 💬 **Daily quote** | 200 bilingual motivational quotes with an offline fallback. |

### Atmosphere
| | |
|---|---|
| 🌧️ **Ambient mixer** | Seven procedurally generated stereo tracks — **Rain** (with drops, gutters and distant thunder), **Café** (murmuring voices, cups), **Ocean** (individual waves with foam), **Fireplace** (crackles and pops), **Lo-fi** (chords, bass, drums, vinyl), **Forest** (wind and birdsong) and **Brown noise**. Shared reverb and a glue compressor keep stacked tracks clean. |
| 🎛️ **Presets** | Seven built-in mixes (Rainy night, Cozy café, Beach, Fireside, Lo-fi chill, Deep forest, Deep focus) plus **your own saved presets**. |
| 🌙 **Sleep timer** | Fade the sound out after 15 / 30 / 45 / 60 / 90 minutes, or when the current session ends. |
| 🌅 **Time-of-day sky** | A background that moves from dawn to night with a travelling sun/moon glow and twinkling stars. |
| 🎨 **Five theme packs** | Sage, Sunset, Lavender, Ocean and Cyber — the logo, charts and rank cards follow the accent. |

### Plan & track
| | |
|---|---|
| 🎯 **Exam mode** | Add exams with date, time, subject, study-hours goal and target score. A live countdown sits on the home screen, turns amber/red as the date nears, and shows the pace you need per day. |
| 📅 **Study schedule** | Daily and weekly views with a built-in **Vietnamese lunar calendar** (Hồ Ngọc Đức algorithm). |
| 📋 **Kanban board** | To do → In progress → Done, with drag-and-drop, priorities, deadlines and subjects. |
| 🗺️ **Focus heatmap** | A GitHub-style, 12-month calendar of your focus minutes. |
| 📊 **Insights** | Daily-hours chart, time-by-subject donut and an editable session history. |
| 🪪 **Weekly report card** | Export a shareable 9:16 Story image (PNG) of your week. |

### Motivation
| | |
|---|---|
| 🏆 **XP, levels & ranks** | Earn XP for every minute you focus and climb nine ranks — Iron → Bronze → Silver → Gold → Platinum → Emerald → Diamond → Master → Challenger. |
| 🏅 **17 achievement badges** | Streaks, total hours, marathons, early-bird / night-owl sessions and more, each with a progress bar. |
| 🎉 **Celebrations** | Confetti and toasts when you finish a session, level up or unlock a badge. |
| 👋 **First-visit tour** | A six-step bilingual walkthrough (replayable from the Guide tab). |

## 🖼️ Screenshots

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/insights.webp" alt="Insights: heatmap, ranks and badges, charts"><br><sub><b>Insights</b> — focus heatmap, rank ladder, badges and charts</sub></td>
    <td width="50%"><img src="docs/screenshots/schedule.webp" alt="Study schedule with lunar calendar"><br><sub><b>Schedule</b> — week strip, lunar dates and session list</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/board.webp" alt="Kanban board"><br><sub><b>Board</b> — drag-and-drop Kanban with priorities and subjects</sub></td>
    <td width="50%" align="center"><img src="docs/screenshots/mobile-focus.webp" alt="Mobile layout" width="260"><br><sub><b>Mobile</b> — responsive layout with bottom navigation</sub></td>
  </tr>
</table>

## 🏁 Getting started

QuietHours is a static site — there is nothing to install.

**Option 1 — use it online**

👉 **<https://s1gnuh.github.io/QuietHours-Pomodoro-SelfStudy/>**

**Option 2 — run it locally**

```bash
git clone https://github.com/s1gnuh/QuietHours-Pomodoro-SelfStudy.git
cd QuietHours-Pomodoro-SelfStudy

# any static file server works, for example:
python -m http.server 8765        # Python 3
# or
npx serve .                       # Node.js
```

Then open <http://127.0.0.1:8765/>.

> You can also double-click `index.html`. Daily quotes then use the built-in fallback set (browsers block `fetch` on `file://`), and audio starts after your first click — a browser rule for all web audio.

## 🌍 Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.
4. Your site goes live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

No build pipeline is needed. All asset paths are relative, so the app also works from a sub-folder.

## 🧮 How XP and ranks work

```
XP = 1 × focus minutes  +  5 × completed sessions  +  10 × active days
```

Each level needs `100 + 50 × (level − 1)` XP. Every **four levels** you move up a rank, and each rank has four divisions (IV → I). **Challenger** is the top tier.

| Rank | From level | Rank | From level |
|---|---:|---|---:|
| Iron | 1 | Emerald | 21 |
| Bronze | 5 | Diamond | 25 |
| Silver | 9 | Master | 29 |
| Gold | 13 | Challenger | 33 |
| Platinum | 17 | | |

As a rough guide, **a steady 2 focus hours a day reaches Gold in about a month**.

## ⌨️ Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Start / pause the timer (ignored while a dialog or text field is focused) |
| `Esc` | Close the open dialog, or leave Zen mode |

## 🔐 Your data and privacy

- Everything — sessions, schedule, board, exams, presets and settings — is saved in your browser's **`localStorage`** under the key `quiethours-static-v1` (plus a few small preference keys for language, theme and onboarding).
- **Nothing is sent to any server.** The only network requests are two public CDN scripts (Chart.js, html2canvas) and Google Fonts — see the tech stack below.
- Clearing site data, switching browser or switching device **erases your data**. Use **Data → Export** to download a JSON backup, and **Import** to restore it. Backups from older versions are upgraded automatically.

## 🧰 Tech stack

| Layer | Choice |
|---|---|
| Markup & styling | Plain HTML5 and CSS (custom properties for five theme packs) |
| Logic | Vanilla ES6 JavaScript — no framework, no bundler, no transpiler |
| Audio | Web Audio API, fully procedural (oscillators, filtered noise, convolution reverb) |
| Charts | [Chart.js 4.4.1](https://www.chartjs.org/) (CDN) |
| Image export | [html2canvas 1.4.1](https://html2canvas.hertzen.com/) (CDN) |
| Fonts | Google Fonts — Figtree and Fraunces |
| Storage | `localStorage` |
| Hosting | Any static host; GitHub Pages recommended |

## 📂 Project structure

```
QuietHours-Pomodoro-SelfStudy/
├── index.html            # App shell, views and dialogs
├── css/
│   ├── styles.css        # Base design system, layout, themes, responsive rules
│   ├── effects.css       # Motion and visual polish (aurora, dial glow, ripples)
│   └── features.css      # Heatmap, ranks, exam mode, mixer presets, sky
├── js/
│   ├── app.js            # Core: state, timer, audio engine, charts, i18n, lunar calendar, onboarding
│   ├── effects.js        # Visual effects: aurora, dial ticks and knob, confetti, toasts
│   └── features.js       # Heatmap, XP / ranks / badges, exam mode, presets, sleep timer, sky
├── data/quotes.json      # 200 bilingual quotes
├── docs/screenshots/     # README images
├── LICENSE
├── README.md
└── README.vi.md
```

`features.js` and `effects.js` are add-on modules: they talk to `app.js` only through a small `window.QH` bridge and `qh:*` DOM events, so each can be removed without touching the core.

## 🤝 Contributing

Issues and pull requests are welcome.

1. Fork the repo and create a branch: `git checkout -b feature/my-idea`
2. Keep the project dependency-free — no build step, no frameworks.
3. Test in a current Chromium-based browser and Firefox, on desktop and mobile widths.
4. Open a pull request describing what changed and why.

**Ideas on the roadmap:** installable PWA with offline cache, JSON backup reminders, notification and wake-lock support, custom Pomodoro presets, more ambient tracks.

## 👤 Author

Made with ♥ by **Việt Hùng ([@s1gnuh](https://github.com/s1gnuh))**

[GitHub](https://github.com/s1gnuh) · [Facebook](https://www.facebook.com/viet.hung.183615/) · [Instagram](https://www.instagram.com/s1gnuh/)

## 📜 License

Released under the [MIT License](LICENSE) — use it freely, personally or commercially.
