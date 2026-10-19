// Вкладка Lesson: занятия по датам из data/lessons.js и урок по шагам — как на интерактивной
// платформе: сверху шаги с минутами, внутри блоки (викторина, пример, «крючки», таймер,
// настоящее олимпиадное задание), снизу «Back / Next». Шаг урока запоминается.
// Из урока задание открывается обычным экраном задания, а наверху там — «← Back to the lesson».
(function () {
  var A = window.App, LS = window.LESSONS || [], esc = A.esc;
  var KEY = "olymp-lessons", COLOR = "#2EC4D6";
  var st = { step: {}, from: null, timer: null };
  try { var raw = JSON.parse(localStorage.getItem(KEY) || "{}"); if (raw && typeof raw === "object" && !Array.isArray(raw)) st = Object.assign(st, raw); } catch (e) {}
  if (!st.step || typeof st.step !== "object") st.step = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  var picked = {}; // ответы викторин в этой сессии: "l2:1:0:3" → индекс выбранного варианта
  var STAGE = { "warm-up": "☕", "presentation": "💡", "practice": "✏️", "production": "🏆", "feedback": "🔍", "wrap-up": "🏁" };

  var css = document.createElement("style");
  css.textContent = [
    ".ls-card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;margin-top:10px;padding:14px;border-radius:14px;background:var(--card);border:1px solid var(--line);text-decoration:none;color:var(--ink)}",
    ".ls-card.today{border-color:var(--c);box-shadow:0 0 0 1px var(--c) inset}",
    ".ls-date{width:52px;text-align:center;font-weight:800;line-height:1.1}.ls-date b{display:block;font-family:var(--head);font-size:24px}.ls-date small{font-size:12px;color:var(--mute);text-transform:uppercase}",
    ".ls-title{font-family:var(--head);font-size:17px;font-weight:700;line-height:1.25}",
    ".ls-sub{display:block;margin-top:3px;font-size:13px;color:var(--mute)}",
    ".ls-badge{font-size:12px;font-weight:700;border-radius:999px;padding:3px 10px;white-space:nowrap}",
    ".ls-badge.now{background:var(--c);color:#0B0B0B}.ls-badge.done{color:var(--acc)}.ls-badge.soon{color:var(--dim)}",
    ".ls-steps{display:flex;gap:6px;overflow-x:auto;margin:14px -16px 0;padding:2px 16px 6px;scrollbar-width:none}",
    ".ls-steps::-webkit-scrollbar{display:none}",
    ".ls-steps button{flex:none;border-radius:999px;padding:7px 12px;border:1px solid var(--line);background:var(--card);color:var(--mute);font-size:13px;font-weight:600}",
    ".ls-steps button.on{background:var(--c);border-color:var(--c);color:#0B0B0B}",
    ".ls-steps button.past{color:var(--ink)}",
    ".ls-head{margin-top:16px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}",
    ".ls-head h2{font-size:26px;font-weight:800;line-height:1.1}.ls-head span{font-size:13px;color:var(--mute)}",
    ".ls-text{margin-top:12px;font-size:16px;line-height:1.5}",
    ".ls-box{margin-top:12px;padding:14px;border-radius:14px;background:var(--card)}",
    ".ls-box h3{font-size:15px;margin-bottom:6px}",
    ".ls-q{margin-top:12px;padding:14px;border-radius:14px;background:var(--card)}",
    ".ls-q .qq{font-size:16px;line-height:1.45}",
    ".ls-q .opts{display:grid;gap:6px;margin-top:10px}",
    ".ls-q .opts button{text-align:left;border-radius:10px;padding:10px 12px;border:1px solid var(--line);background:transparent;color:var(--ink);font-size:15px;line-height:1.35}",
    ".ls-q .opts button.right{border-color:var(--acc);background:rgba(61,220,151,.14)}",
    ".ls-q .opts button.wrong{border-color:var(--bad);background:rgba(255,92,92,.12)}",
    ".ls-q .why{margin-top:8px;font-size:14px;color:var(--mute);line-height:1.45}",
    ".ls-hooks{display:grid;gap:8px;margin-top:12px}",
    ".ls-hooks div{padding:12px 14px;border-radius:12px;background:var(--card);border-left:3px solid var(--c)}",
    ".ls-hooks b{display:block;margin-bottom:2px}",
    ".ls-gap{font-size:16px;line-height:1.5;padding:12px 14px;border-radius:12px;background:#101010;margin-top:8px}",
    ".ls-talk{margin:10px 0 0;padding-left:22px}.ls-talk li{margin:7px 0;font-size:16px;line-height:1.45}",
    ".ls-words{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}",
    ".ls-words button{border-radius:999px;padding:5px 12px;background:var(--card);border:1px solid var(--line);font-size:14px;color:var(--ink)}",
    ".ls-ol{margin:8px 0 0;padding-left:22px}.ls-ol li{margin:5px 0;line-height:1.45}",
    ".ls-task{display:flex;align-items:center;gap:12px;margin-top:12px;padding:16px;border-radius:14px;background:var(--c);color:#0B0B0B;text-decoration:none;font-weight:800;font-size:17px}",
    ".ls-timer{margin-top:12px;display:flex;align-items:center;gap:10px}",
    ".ls-timer b{font-family:var(--head);font-size:26px;font-variant-numeric:tabular-nums}",
    ".ls-links a{display:block;margin-top:8px;padding:12px 14px;border-radius:12px;background:var(--card);color:var(--ink);text-decoration:none}",
    ".ls-links a small{display:block;color:var(--mute);margin-top:2px}",
    ".ls-nav{display:flex;justify-content:space-between;gap:10px;margin-top:22px}",
    ".ls-back{display:inline-block;margin-top:10px;padding:8px 14px;border-radius:999px;background:var(--card);border:1px solid #2EC4D6;color:var(--ink);text-decoration:none;font-weight:600;font-size:14px}"
  ].join("\n");
  document.head.appendChild(css);

  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function dateParts(d) { var p = d.split("-"); return [String(+p[2]), MONTHS[+p[1] - 1]]; }
  function byId(id) { return LS.filter(function (l) { return l.id === id; })[0]; }
  // «Сегодня» — урок с сегодняшней датой, а если сегодня урока нет — ближайший следующий.
  function current() { var t = today(); return LS.filter(function (l) { return l.date >= t; })[0] || LS[LS.length - 1]; }
  // **жирный** в тексте урока — без HTML в данных.
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }

  A.routes.lesson = function (parts) {
    var l = parts[1] && byId(parts[1]);
    return l ? lesson(l) : list();
  };

  function list() {
    var cur = current(), t = today();
    var h = '<div style="--c:' + COLOR + '"><div class="tabtop"></div>' +
      '<div class="album"><span class="sq" aria-hidden="true">🎓</span><div><span class="eyebrow" style="color:#DADADA">Municipal stage · 21 November</span><h1>Lessons</h1><p>' + LS.length + ' lessons · 50 minutes each</p></div></div>';
    LS.forEach(function (l) {
      var dp = dateParts(l.date), isCur = l === cur, past = l.date < t && !isCur;
      var badge = isCur ? '<span class="ls-badge now">' + (l.date === t ? 'Today' : 'Next') + '</span>' : past ? '<span class="ls-badge done">✓ done</span>' : '<span class="ls-badge soon">soon</span>';
      h += '<a class="ls-card' + (isCur ? ' today' : '') + '" href="#/lesson/' + l.id + '"><span class="ls-date"><b>' + dp[0] + '</b><small>' + dp[1] + '</small></span>' +
        '<span><span class="ls-title">' + esc(l.title) + '</span><span class="ls-sub">' + (l.steps ? l.steps.length + ' steps · ' + l.steps.reduce(function (a, s) { return a + s.minutes; }, 0) + ' min' : (l.summary ? 'Summary and links' : 'Coming soon')) + '</span></span>' + badge + '</a>';
    });
    return h + '</div>';
  }

  function lesson(l) {
    var dp = dateParts(l.date);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/lesson">← Lessons</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">🎓</span><div><span class="eyebrow">Lesson · ' + dp[0] + ' ' + dp[1] + (l.steps ? ' · ' + l.steps.reduce(function (a, s) { return a + s.minutes; }, 0) + ' min' : '') + '</span><h1>' + esc(l.title) + '</h1></div></div>';
    if (!l.steps) {
      if (l.summary) h += '<p class="ls-text">' + rich(l.summary) + '</p>';
      if (l.aims) h += '<div class="ls-box"><h3>' + (l.summary ? 'We did' : 'In this lesson') + '</h3><ul class="ls-ol">' + l.aims.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ul></div>';
      if (l.links) h += '<div class="ls-links">' + l.links.map(linkHTML).join("") + '</div>';
      return h + '</div>';
    }
    var i = Math.min(st.step[l.id] || 0, l.steps.length - 1), s = l.steps[i];
    if (i === 0 && l.aims) h += '<div class="ls-box"><h3>Today\'s aims</h3><ul class="ls-ol">' + l.aims.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ul></div>';
    h += '<div class="ls-steps" role="tablist" aria-label="Lesson steps">' + l.steps.map(function (x, j) {
      return '<button class="' + (j === i ? 'on' : j < i ? 'past' : '') + '" data-lsgo="' + l.id + ':' + j + '" role="tab" aria-selected="' + (j === i) + '">' + (j + 1) + ' · ' + esc(x.title) + '</button>';
    }).join("") + '</div>';
    h += '<div class="ls-head"><h2>' + (STAGE[s.stage] || '') + ' ' + esc(s.title) + '</h2><span>Step ' + (i + 1) + ' of ' + l.steps.length + ' · ' + s.minutes + ' min</span></div>';
    s.blocks.forEach(function (b, k) { h += block(l, i, k, b); });
    h += '<div class="ls-nav">' + (i > 0 ? '<button class="ghost" data-lsgo="' + l.id + ':' + (i - 1) + '">← Back</button>' : '<span></span>') +
      (i < l.steps.length - 1 ? '<button class="bigplay" data-lsgo="' + l.id + ':' + (i + 1) + '">Next: ' + esc(l.steps[i + 1].title) + ' →</button>' : '<a class="ghost" href="#/lesson" style="text-decoration:none">Finish ✓</a>') + '</div>';
    return h + '</div>';
  }

  function linkHTML(x) { return '<a href="' + esc(x.href) + '" data-lsfrom="1">' + esc(x.label) + (x.note ? '<small>' + esc(x.note) + '</small>' : '') + '</a>'; }

  // Варианты викторины показываем в своём порядке для каждого вопроса: в данных верный — первый,
  // и без перемешивания ответ угадывался бы по месту.
  function order(n, seed) { var o = []; for (var j = 0; j < n; j++) o.push(j); var r = seed % n; return o.slice(r).concat(o.slice(0, r)); }
  // Сдвиг зависит от текста вопроса, а не только от номера: иначе место верного ответа шло бы по кругу.
  function seedOf(s) { var h = 0; for (var c = 0; c < s.length; c++) h = (h * 31 + s.charCodeAt(c)) % 9973; return h; }

  function block(l, i, k, b) {
    var key = l.id + ":" + i + ":" + k;
    if (b.type === "text") return '<p class="ls-text">' + rich(b.text) + '</p>';
    if (b.type === "list") return '<div class="ls-box"><h3>' + esc(b.title) + '</h3><ul class="ls-ol">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ul></div>';
    if (b.type === "steps") return '<div class="ls-box"><h3>📘 ' + esc(b.title) + '</h3><ol class="ls-ol">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol></div>';
    if (b.type === "talk") return '<ol class="ls-talk">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol>';
    if (b.type === "words") return '<div class="ls-words">' + b.items.map(function (x) { return '<button type="button" data-lsword="' + esc(x) + '">' + esc(x) + '</button>'; }).join("") + '</div>';
    if (b.type === "hooks") return '<div class="ls-hooks">' + b.items.map(function (x) { return '<div><b>' + esc(x.h) + '</b>' + rich(x.t) + '</div>'; }).join("") + '</div>';
    if (b.type === "reveal") return '<details class="ls-box"><summary><b>' + esc(b.label) + '</b></summary><p class="ls-text">' + rich(b.text) + '</p></details>';
    if (b.type === "timer") {
      var on = st.timer && st.timer.key === key;
      return '<div class="ls-timer"><b class="ls-clock" data-key="' + key + '">' + (on ? left(st.timer.end) : b.minutes + ':00') + '</b><button class="ghost" data-lstimer="' + key + '" data-min="' + b.minutes + '">' + (on ? '↺ Restart' : '▶ ' + esc(b.label)) + '</button></div>';
    }
    if (b.type === "task") return '<a class="ls-task" href="#/t/' + esc(b.task) + '" data-lsfrom="1"><span aria-hidden="true">📖</span>' + esc(b.label) + ' →</a>';
    if (b.type === "links") return '<div class="ls-box ls-links"><h3>' + esc(b.title) + '</h3>' + b.items.map(linkHTML).join("") + '</div>';
    if (b.type === "example") {
      var pk = key + ":0", sel = picked[pk];
      return '<div class="ls-q"><div class="qq"><b>' + esc(b.title) + '</b></div><div class="ls-gap">' + esc(b.text) + '</div><div class="opts">' +
        b.opts.map(function (o, j) { var c = sel == null ? '' : j === b.a ? 'right' : j === sel ? 'wrong' : ''; return '<button class="' + c + '" data-lspick="' + pk + ':' + j + '">' + "AB"[j] + '. ' + esc(o) + '</button>'; }).join("") +
        '</div>' + (sel != null ? '<p class="why">' + rich(b.why) + '</p>' : '') + '</div>';
    }
    if (b.type === "quiz") {
      return b.items.map(function (it, n) {
        var pk = key + ":" + n, sel = picked[pk];
        return '<div class="ls-q"><div class="qq"><b>' + (n + 1) + '.</b> ' + esc(it.q) + '</div><div class="opts">' +
          order(it.opts.length, seedOf(it.q)).map(function (j) { var c = sel == null ? '' : j === it.a ? 'right' : j === sel ? 'wrong' : ''; return '<button class="' + c + '" data-lspick="' + pk + ':' + j + '">' + esc(it.opts[j]) + '</button>'; }).join("") +
          '</div>' + (sel != null ? '<p class="why">' + (sel === it.a ? '✓ ' : '✗ ') + rich(it.why) + '</p>' : '') + '</div>';
      }).join("");
    }
    return "";
  }

  // Наверху задания, открытого из урока, — путь обратно на тот же шаг урока.
  A.taskTop = A.taskTop || [];
  A.taskTop.push(function (t) {
    if (!st.from || !st.from.lesson) return "";
    var l = byId(st.from.lesson); if (!l) return "";
    return '<a class="ls-back" href="#/lesson/' + l.id + '">← Back to the lesson: ' + esc(l.steps ? l.steps[Math.min(st.step[l.id] || 0, l.steps.length - 1)].title : l.title) + '</a>' +
      (st.timer && st.timer.end > Date.now() ? ' <b class="ls-clock" data-key="' + st.timer.key + '" style="margin-left:8px;font-variant-numeric:tabular-nums">' + left(st.timer.end) + '</b>' : '');
  });

  // Таймер урока живёт по времени окончания, а не по элементу на экране: он идёт дальше,
  // пока ученица решает задание, и виден там рядом со ссылкой «назад».
  function left(end) {
    var s = Math.max(0, Math.round((end - Date.now()) / 1000));
    return s ? Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") : "Time is up";
  }
  setInterval(function () {
    if (!st.timer) return;
    document.querySelectorAll(".ls-clock").forEach(function (el) { if (el.dataset.key === st.timer.key) el.textContent = left(st.timer.end); });
  }, 1000);
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-lsfrom]");
    if (a) { var m = /^#\/lesson\/([^/]+)/.exec(location.hash); st.from = m ? { lesson: m[1] } : null; save(); return; }
    var b = e.target.closest("button"); if (!b) return;
    var d = b.dataset;
    if (d.lsgo) { var p = d.lsgo.split(":"); st.step[p[0]] = +p[1]; save(); A.render(); window.scrollTo(0, 0); return; }
    if (d.lspick) { var q = d.lspick.split(":"), j = +q.pop(), pk = q.join(":"); if (picked[pk] == null) { picked[pk] = j; A.keepScroll(A.render); } return; }
    if (d.lsword) { if (A.words && A.words.offer) A.words.offer(d.lsword, "Lesson"); return; }
    if (d.lstimer) { st.timer = { key: d.lstimer, end: Date.now() + (+d.min) * 60000 }; save(); A.keepScroll(A.render); return; }
  });
  // Ушли из уроков не через задание урока — обратная ссылка больше не нужна.
  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (st.from && !/^#\/(t|lesson)\//.test(h) && h !== "#/lesson") { st.from = null; save(); }
  });
  A.render();
})();
