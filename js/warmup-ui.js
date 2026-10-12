// Вкладка Warm-up: разминки на 5–10 минут из data/warmups.js.
// Список — две группы (разговор и навык) с фильтром по части олимпиады; страница разминки —
// вопросы и слова (разговор) или задания со спрятанными ответами (навык).
// Кнопка «Done» отмечает разминку и засчитывает день 🔥 — как проверка задания.
(function () {
  var A = window.App, W = window.WARMUPS || [], esc = A.esc;
  var KEY = "olymp-warmups", COLOR = "#FFB347";
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  var filter = "all";
  var FILTERS = [["all", "All"], ["talk", "💬 Talk"], ["listening", "🎧 Listening"], ["reading", "📖 Reading"],
                 ["uoe", "🧩 Use of English"], ["culture", "🏛️ Culture"], ["writing", "✍️ Writing"]];
  var GROUPS = [
    { kind: "talk", title: "Talk", icon: "💬", color: "#FFB347", sub: "10-minute conversations on topics from real olympiad texts" },
    { kind: "drill", title: "Skill warm-ups", icon: "⚡", color: "#5B7CFF", sub: "5–10 minutes of practice before a task" }
  ];

  var css = document.createElement("style");
  css.textContent = [
    ".wu-group{display:flex;align-items:center;gap:10px;margin:26px 0 2px}",
    ".wu-group .ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:20px;background:var(--g)}",
    ".wu-group h2{font-size:21px;font-weight:800;line-height:1.1}",
    ".wu-sub{font-size:13px;color:var(--mute);margin:2px 0 4px 48px}",
    ".wu-card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;margin-top:8px;padding:12px 14px;border-radius:12px;background:var(--card);border:1px solid var(--line);text-decoration:none}",
    ".wu-card:hover{border-color:var(--g)}",
    ".wu-card .em{font-size:24px;line-height:1}",
    ".wu-name{display:block;font-family:var(--head);font-size:17px;font-weight:700;line-height:1.2;color:var(--ink)}",
    ".wu-before{display:block;margin-top:3px;font-size:13px;color:var(--mute);line-height:1.35}",
    ".wu-card .st{font-size:12px;color:var(--dim);white-space:nowrap;text-align:right}",
    ".wu-card .st.done{color:var(--acc);font-weight:700}",
    ".wu-q{margin:10px 0 0;padding-left:22px}.wu-q li{margin:8px 0;font-size:16px;line-height:1.45}",
    ".wu-words{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}",
    ".wu-words span{border-radius:999px;padding:4px 12px;background:var(--card);border:1px solid var(--line);font-size:14px}",
    ".wu-item{margin-top:10px;padding:12px 14px;border-radius:12px;background:var(--card)}",
    ".wu-item .q{font-size:16px;line-height:1.45}.wu-item .q b{color:var(--c)}",
    ".wu-item details{margin-top:8px}.wu-item summary{cursor:pointer;color:var(--c);font-weight:600;font-size:14px}",
    ".wu-item .a{margin-top:6px;font-size:15px;color:var(--ink);line-height:1.45}"
  ].join("\n");
  document.head.appendChild(css);

  function byId(id) { return W.filter(function (w) { return w.id === id; })[0]; }
  function shown(w) { return filter === "all" || w.section === filter; }

  A.routes.warmup = function (parts) {
    var w = parts[1] && byId(parts[1]);
    return w ? page(w) : list();
  };

  function list() {
    var h = '<div style="--c:' + COLOR + '"><div class="tabtop"></div>' +
      '<div class="album"><span class="sq" aria-hidden="true">☕</span><div><span class="eyebrow" style="color:#DADADA">Start here</span><h1>Warm-ups</h1><p>' + W.length + ' warm-ups · 5–10 minutes each</p></div></div>' +
      '<p class="howto">Start a lesson or a task with a warm-up. <b>Talk</b> — answer questions on a topic from a real olympiad text. <b>Skill</b> — a short practice before one task. Answers are hidden: say yours first.</p>' +
      '<div class="cards2" role="tablist" aria-label="Filter">' + FILTERS.map(function (f) {
        return '<button class="opt' + (filter === f[0] ? ' sel' : '') + '" data-wufilter="' + f[0] + '" role="tab" aria-selected="' + (filter === f[0]) + '">' + esc(f[1]) + '</button>';
      }).join("") + '</div>';
    GROUPS.forEach(function (g) {
      var items = W.filter(function (w) { return w.kind === g.kind && shown(w); });
      if (!items.length) return;
      h += '<div class="wu-group" style="--g:' + g.color + '"><span class="ic" aria-hidden="true">' + g.icon + '</span><h2>' + esc(g.title) + '</h2></div><p class="wu-sub">' + esc(g.sub) + '</p>';
      items.forEach(function (w) {
        h += '<a class="wu-card" href="#/warmup/' + w.id + '" style="--g:' + g.color + '"><span class="em" aria-hidden="true">' + w.icon + '</span>' +
          '<span><span class="wu-name">' + esc(w.title) + '</span><span class="wu-before">' + esc(w.before) + '</span></span>' +
          '<span class="st' + (done[w.id] ? ' done' : '') + '">' + (done[w.id] ? '✓ done' : w.minutes + ' min') + '</span></a>';
      });
    });
    return h + '</div>';
  }

  function page(w) {
    var g = GROUPS.filter(function (x) { return x.kind === w.kind; })[0];
    var h = '<div style="--c:' + g.color + '"><a class="back" href="#/warmup">← Warm-ups</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">' + w.icon + '</span><div><span class="eyebrow">' + esc(g.title) + ' · ' + w.minutes + ' min</span><h1>' + esc(w.title) + '</h1></div></div>' +
      '<p class="howto">' + esc(w.goal) + '</p>' +
      '<p class="note"><b>Before:</b> ' + esc(w.before) + '</p>' +
      '<ol class="steps" aria-label="What to do">' + w.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ol>';
    if (w.kind === "talk") {
      h += '<h2 class="list-h" style="font-size:18px">Questions</h2><ol class="wu-q">' + w.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join("") + '</ol>' +
        '<h2 class="list-h" style="font-size:18px">Useful words</h2><p class="note" style="margin-top:2px">Tap a word to save it to My words.</p><div class="wu-words">' + w.words.map(function (x) { return '<span>' + esc(x) + '</span>'; }).join("") + '</div>';
    } else {
      h += '<div class="listen"><button class="ghost" data-wuall="1">👀 Show all answers</button></div>' +
        w.items.map(function (it, i) {
          return '<div class="wu-item"><div class="q"><b>' + (i + 1) + '.</b> ' + esc(it.q) + '</div><details><summary>Show answer</summary><div class="a">' + esc(it.a) + '</div></details></div>';
        }).join("");
    }
    h += '<div class="listen" style="margin-top:18px">' + (done[w.id]
      ? '<span class="res">✓ Done</span><a class="ghost" href="#/warmup" style="text-decoration:none">More warm-ups</a>'
      : '<button class="bigplay" data-wudone="' + esc(w.id) + '">✓ Done</button>') + '</div>';
    return h + '</div>';
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.wufilter) { filter = b.dataset.wufilter; A.keepScroll(A.render); return; }
    if (b.dataset.wuall) { document.querySelectorAll(".wu-item details").forEach(function (d) { d.open = true; }); return; }
    if (b.dataset.wudone) {
      done[b.dataset.wudone] = new Date().toISOString().slice(0, 10); save();
      if (A.markActivity) A.markActivity();
      A.keepScroll(A.render);
    }
  });
})();
