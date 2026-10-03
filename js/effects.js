/* QuietHours - visual effects layer. Purely additive; reads the DOM that app.js renders. */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, ns) {
    var n = ns ? document.createElementNS(NS, tag) : document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  // ---- Aurora background ------------------------------------------------
  function initAurora() {
    var a = el("div", { class: "aurora", "aria-hidden": "true" });
    a.innerHTML = "<i></i><i></i><i></i>";
    document.body.insertBefore(a, document.body.firstChild);
  }

  // ---- Dial: gradient stroke, tick marks, glowing knob -------------------
  function initDial() {
    var svg = document.querySelector(".dial-svg");
    var prog = $("dial-progress");
    if (!svg || !prog) return;

    var defs = el("defs", {}, true);
    var grad = el("linearGradient", { id: "dial-grad", x1: "0", y1: "0", x2: "1", y2: "1" }, true);
    grad.appendChild(el("stop", { offset: "0%", style: "stop-color: var(--color-accent)" }, true));
    grad.appendChild(el("stop", { offset: "100%", style: "stop-color: color-mix(in oklab, var(--color-accent) 55%, #fff)" }, true));
    defs.appendChild(grad);
    svg.insertBefore(defs, svg.firstChild);

    var ticks = el("g", { class: "dial-ticks" }, true);
    for (var i = 0; i < 60; i++) {
      var major = i % 5 === 0;
      var ang = (i / 60) * 2 * Math.PI;
      var r1 = major ? 114 : 118, r2 = 122;
      ticks.appendChild(el("line", {
        x1: 134 + r1 * Math.cos(ang), y1: 134 + r1 * Math.sin(ang),
        x2: 134 + r2 * Math.cos(ang), y2: 134 + r2 * Math.sin(ang),
        class: major ? "major" : ""
      }, true));
    }
    svg.insertBefore(ticks, prog);

    var knob = el("circle", { class: "dial-knob", r: "5", cx: "134", cy: "4", opacity: "0" }, true);
    svg.appendChild(knob);

    var CIRC = 2 * Math.PI * 130;
    function syncKnob() {
      var off = parseFloat(prog.getAttribute("stroke-dashoffset"));
      if (isNaN(off)) return;
      var p = 1 - off / CIRC;
      if (p <= 0.003 || p >= 0.999) { knob.setAttribute("opacity", "0"); return; }
      var ang = p * 2 * Math.PI;
      knob.setAttribute("cx", 134 + 130 * Math.cos(ang));
      knob.setAttribute("cy", 134 + 130 * Math.sin(ang));
      knob.setAttribute("opacity", "1");
    }
    new MutationObserver(syncKnob).observe(prog, { attributes: true, attributeFilter: ["stroke-dashoffset"] });
    syncKnob();
  }

  // ---- Running state -> body.timer-running (derived from the tab title) ---
  function initRunningFlag() {
    var titleEl = document.querySelector("title");
    if (!titleEl) return;
    function sync() {
      document.body.classList.toggle("timer-running", /^\d+:\d+\s·/.test(document.title));
    }
    new MutationObserver(sync).observe(titleEl, { childList: true, characterData: true, subtree: true });
    sync();
  }

  // ---- Spotlight following the cursor on cards ----------------------------
  function initSpotlight() {
    if (!window.matchMedia || !window.matchMedia("(hover: hover)").matches) return;
    var raf = 0, lastEvt = null;
    document.addEventListener("pointermove", function (e) {
      lastEvt = e;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var card = lastEvt.target.closest && lastEvt.target.closest(".card, .stat-card");
        if (!card) return;
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (lastEvt.clientX - r.left) + "px");
        card.style.setProperty("--my", (lastEvt.clientY - r.top) + "px");
      });
    }, { passive: true });
  }

  // ---- Button ripple -------------------------------------------------------
  function initRipple() {
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest && e.target.closest(".btn");
      if (!btn || btn.disabled || reduceMotion) return;
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height) * 2;
      var s = el("span", { class: "fx-ripple" });
      s.style.width = s.style.height = size + "px";
      s.style.left = (e.clientX - r.left - size / 2) + "px";
      s.style.top = (e.clientY - r.top - size / 2) + "px";
      btn.appendChild(s);
      setTimeout(function () { s.remove(); }, 650);
    }, { passive: true });
  }

  // ---- Confetti + toast on completed focus session --------------------------
  function confetti() {
    if (reduceMotion) return;
    var cs = getComputedStyle(document.body);
    var colors = ["--color-accent", "--color-sand", "--color-clay", "--color-foam", "--color-fg"]
      .map(function (v) { return cs.getPropertyValue(v).trim() || "#8a9e8e"; });
    var canvas = el("canvas", { class: "fx-confetti", "aria-hidden": "true" });
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = canvas.width = window.innerWidth * dpr;
    var H = canvas.height = window.innerHeight * dpr;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");
    var parts = [];
    for (var i = 0; i < 140; i++) {
      var side = i % 2 ? 1 : -1;
      parts.push({
        x: W / 2 + side * W * 0.05, y: H * 0.35,
        vx: (Math.random() * 9 + 3) * side * dpr * (Math.random() > 0.5 ? 1 : 0.6),
        vy: -(Math.random() * 13 + 5) * dpr,
        w: (Math.random() * 7 + 5) * dpr, h: (Math.random() * 4 + 3) * dpr,
        rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.35,
        c: colors[(Math.random() * colors.length) | 0]
      });
    }
    var start = performance.now();
    (function frame(now) {
      var t = now - start;
      ctx.clearRect(0, 0, W, H);
      var alive = false;
      parts.forEach(function (p) {
        p.vy += 0.32 * dpr; p.vx *= 0.992;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y < H + 40) alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - t / 3200);
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive && t < 3200) requestAnimationFrame(frame);
      else canvas.remove();
    })(start);
  }

  function toast(msg) {
    var t = el("div", { class: "fx-toast", role: "status" });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add("show"); }); });
    setTimeout(function () { t.classList.remove("show"); }, 3400);
    setTimeout(function () { t.remove(); }, 4100);
  }

  function initCelebrate() {
    var counter = $("timer-focus-count");
    if (!counter) return;
    var last = parseInt(counter.textContent, 10) || 0;
    new MutationObserver(function () {
      var now = parseInt(counter.textContent, 10) || 0;
      if (now > last) {
        var en = ($("lang-select") || {}).value === "en";
        confetti();
        toast(en ? "🎉 Focus session complete — nice work!" : "🎉 Hoàn thành phiên tập trung — làm tốt lắm!");
      }
      last = now;
    }).observe(counter, { childList: true, characterData: true, subtree: true });
  }

  function init() {
    initAurora();
    initDial();
    initRunningFlag();
    initSpotlight();
    initRipple();
    initCelebrate();
    // app.js uses window.toast (if present) instead of alert() for small notices
    window.toast = toast;
    // Dev hook: QuietFX.test() fires the celebration without waiting a full Pomodoro.
    window.QuietFX = { test: function () { confetti(); toast("🎉 Test"); } };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
