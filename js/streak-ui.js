// Стрик 🔥 на экране: огонёк на главной, «Day N!» за первое задание дня, карточка-поздравление на рубежах.
// День засчитывается, когда ученица проверила задание (экзамен, грамматика, лексика) или занималась словами.
(function () {
  var A = window.App, K = window.Streak, esc = A.esc;
  var KEY = "olymp-streak";
  var S = K.empty();
  // Хранилище читаем перед каждой записью: открытая со вчера вкладка или вторая вкладка
  // не должны затереть дни, записанные в другой. Испорченные поля заменяем пустыми.
  function load() {
    var s = K.empty();
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (raw && Array.isArray(raw.days)) s = { days: raw.days.filter(function (d) { return typeof d === "string"; }), best: +raw.best || 0, seen: Array.isArray(raw.seen) ? raw.seen : [] };
    } catch (e) {}
    return s;
  }
  S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function today() { return K.dayKey(new Date()); }

  var css = document.createElement("style");
  css.textContent = [
    ".streak{display:inline-flex;align-items:center;gap:6px;margin:10px 0 0 8px;border-radius:999px;padding:6px 14px;font-weight:700;font-size:14px;font-variant-numeric:tabular-nums;vertical-align:middle}",
    ".streak.on{background:linear-gradient(135deg,#FF8A00,#FF3D6E);color:#1A0A00}",
    ".streak.off{background:var(--card);border:1px solid var(--line);color:var(--mute)}",
    ".streak.off .fl{filter:grayscale(1);opacity:.6}",
    ".streak small{font-weight:500;font-size:12px}",
    ".stoast{position:fixed;left:50%;top:calc(14px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:30;background:linear-gradient(135deg,#FF8A00,#FF3D6E);color:#1A0A00;font-weight:800;border-radius:999px;padding:10px 20px;box-shadow:0 10px 30px rgba(0,0,0,.5);animation:stIn .35s ease-out}",
    "@keyframes stIn{from{transform:translate(-50%,-30px);opacity:0}to{transform:translate(-50%,0);opacity:1}}",
    ".sover{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:20px;overflow:hidden}",
    ".scard{position:relative;width:min(360px,100%);border-radius:24px;padding:28px 22px 22px;text-align:center;color:#1A0A00;background:linear-gradient(160deg,#FFD23F 0%,#FF8A00 45%,#FF3D6E 100%);box-shadow:0 20px 60px rgba(0,0,0,.6);animation:scIn .5s cubic-bezier(.2,1.4,.4,1)}",
    "@keyframes scIn{from{transform:scale(.6) rotate(-4deg);opacity:0}to{transform:none;opacity:1}}",
    ".scard .em{font-size:64px;line-height:1}",
    ".scard .num{font-family:var(--head);font-weight:800;font-size:84px;line-height:.9;margin-top:6px}",
    ".scard .lbl{font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:12px;opacity:.75}",
    ".scard h2{font-size:24px;margin-top:12px;color:#1A0A00}",
    ".scard p{margin:6px 0 0;font-size:15px}",
    ".scard .shot{margin-top:10px;font-size:12px;opacity:.7}",
    ".scard button{margin-top:16px;border:0;border-radius:999px;padding:12px 22px;font-weight:800;background:#1A0A00;color:#FFD23F}",
    ".conf{position:absolute;top:-10px;width:10px;height:14px;border-radius:2px;animation:fall linear forwards}",
    "@keyframes fall{to{transform:translateY(110vh) rotate(720deg)}}",
    "@media (prefers-reduced-motion: reduce){.stoast,.scard,.conf{animation:none}.conf{display:none}}"
  ].join("\n");
  document.head.appendChild(css);

  // Огонёк на главной: сделано сегодня — горит; ещё нет — серый и напоминает, что делать.
  A.homeTop.push(function () {
    S = load();
    var t = today(), n = K.current(S, t), done = S.days.indexOf(t) >= 0;
    if (done) return '<span class="streak on" title="Day streak"><span class="fl">🔥</span>' + n + (n === 1 ? ' day' : ' days') + ' in a row</span>';
    if (n > 0) return '<span class="streak off"><span class="fl">🔥</span>' + n + ' <small>· check one task today to keep it</small></span>';
    return '<span class="streak off"><span class="fl">🔥</span><small>Check one task today to start a streak</small></span>';
  });

  function toast(text) {
    var el = document.createElement("div"); el.className = "stoast"; el.setAttribute("role", "status"); el.textContent = text;
    document.body.appendChild(el); setTimeout(function () { el.remove(); }, 2600);
  }

  function celebrate(m, n) {
    var over = document.createElement("div"); over.className = "sover"; over.setAttribute("role", "dialog"); over.setAttribute("aria-label", m.title);
    var colors = ["#FFD23F", "#FF3D6E", "#3DDC97", "#5B7CFF", "#C77DFF", "#FFFFFF"], conf = "";
    for (var i = 0; i < 40; i++) {
      conf += '<i class="conf" style="left:' + Math.round(Math.random() * 100) + '%;background:' + colors[i % colors.length] +
        ';animation-duration:' + (2 + Math.random() * 2).toFixed(2) + 's;animation-delay:' + (Math.random() * .8).toFixed(2) + 's"></i>';
    }
    over.setAttribute("aria-modal", "true");
    over.innerHTML = conf + '<div class="scard"><div class="em">' + m.emoji + '</div><div class="num">' + n + '</div><div class="lbl">day streak</div>' +
      '<h2>' + esc(m.title) + '</h2><p>' + esc(m.text) + '</p><p class="shot">📸 Screenshot it!</p><button type="button" data-sclose="1">Keep going 🔥</button></div>';
    document.body.appendChild(over);
    var close = function () { over.remove(); document.removeEventListener("keydown", onKey); };
    var onKey = function (e) { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    over.addEventListener("click", function (e) { if (e.target === over || e.target.closest("[data-sclose]")) close(); });
    var btn = over.querySelector("[data-sclose]"); if (btn) btn.focus();
  }

  function markActivity() {
    S = load();
    var r = K.record(S, today());
    if (!r.firstToday) return;
    S = r.state; save();
    if (r.milestone) celebrate(r.milestone, r.count);
    else toast("🔥 Day " + r.count + "!");
    if (location.hash === "" || location.hash === "#/") A.keepScroll(A.render);
  }

  // Игры со словами зовут это сами: у них свои кнопки, которых нет в списке ниже.
  A.markActivity = markActivity;

  // Действия, которые засчитывают день: проверка задания в экзамене, грамматике, лексике и занятия словами.
  var COUNTS = ["check", "gcheck", "lcheck", "wgrade", "wcheck", "wpick"];
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var hit = COUNTS.some(function (k) { return b.dataset[k] != null; }); if (!hit) return;
    // Пустую проверку модули отклоняют, меняя надпись кнопки, — такую не засчитываем.
    setTimeout(function () {
      if (document.body.contains(b) && /at least one/i.test(b.textContent)) return;
      markActivity();
    }, 60);
  }, true);

  A.render();
})();
