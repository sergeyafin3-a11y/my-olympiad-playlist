// Вкладка Warm-up: разминки на 5–10 минут из data/warmups.js.
// Учитель 12.10: «ничего не понимаю» — поэтому наверху выбор этапа (по умолчанию муниципальный,
// на нём сейчас подготовка), а внутри — части экзамена в порядке олимпиады. На карточке — что это:
// 💬 Talk (поговорить на тему) или ✏️ Practice (короткое упражнение). Без фильтров.
// Кнопка «Done» отмечает разминку и засчитывает день 🔥 — как проверка задания.
(function () {
  var A = window.App, W = window.WARMUPS || [], esc = A.esc;
  var KEY = "olymp-warmups", STAGE_KEY = "olymp-warmup-stage", COLOR = "#FFB347";
  // { id: "2026-10-12" } — день, когда разминку сделали. Испорченное значение (массив, строка) — заново.
  var done = {};
  try { var raw = JSON.parse(localStorage.getItem(KEY) || "{}"); if (raw && typeof raw === "object" && !Array.isArray(raw)) done = raw; } catch (e) {}
  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  // Разминку можно делать на каждом уроке: «сделано» — только сегодня, завтра кнопка снова есть.
  function doneToday(id) { return done[id] === today(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  var STAGES = [["mun", "Municipal"], ["reg", "Regional"], ["final", "Final"]];
  var stage = "mun";
  try { var st = localStorage.getItem(STAGE_KEY); if (st === "reg" || st === "final") stage = st; } catch (e) {}
  var PARTS = [
    ["any", "☕", "Any lesson", "Start any lesson with a short chat"],
    ["listening", "🎧", "Listening", ""],
    ["reading", "📖", "Reading", ""],
    ["uoe", "🧩", "Use of English", ""],
    ["writing", "✍️", "Writing", ""],
    ["speaking", "🎤", "Speaking", ""]
  ];
  var KIND = {
    talk: { label: "💬 Talk", color: "#FFB347", what: "Talk" },
    drill: { label: "✏️ Practice", color: "#5B7CFF", what: "Practice" }
  };

  var css = document.createElement("style");
  css.textContent = [
    ".wu-group{display:flex;align-items:center;gap:10px;margin:26px 0 2px}",
    ".wu-group .ic{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:20px;background:var(--g)}",
    ".wu-group h2{font-size:21px;font-weight:800;line-height:1.1}",
    ".wu-sub{font-size:13px;color:var(--mute);margin:2px 0 4px 48px}",
    ".wu-card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;margin-top:8px;padding:12px 14px;border-radius:12px;background:var(--card);border:1px solid var(--line);text-decoration:none}",
    ".wu-card:hover{border-color:var(--g)}",
    ".wu-card .em{font-size:24px;line-height:1}",
    ".wu-kind{display:block;font-size:12px;font-weight:700;letter-spacing:.02em;margin-bottom:2px}",
    ".wu-name{display:block;font-family:var(--head);font-size:17px;font-weight:700;line-height:1.2;color:var(--ink)}",
    ".wu-before{display:block;margin-top:3px;font-size:13px;color:var(--mute);line-height:1.35}",
    ".wu-card .st{font-size:12px;color:var(--dim);white-space:nowrap;text-align:right}",
    ".wu-card .st.done{color:var(--acc);font-weight:700}",
    ".wu-q{margin:10px 0 0;padding-left:22px}.wu-q li{margin:8px 0;font-size:16px;line-height:1.45}",
    ".wu-words{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}",
    ".wu-words button{border-radius:999px;padding:5px 12px;background:var(--card);border:1px solid var(--line);font-size:14px;color:var(--ink)}",
    ".wu-steps{margin:12px 0 0;padding-left:22px;color:var(--mute);font-size:14px}.wu-steps li{margin:4px 0;line-height:1.4}",
    ".wu-done{font-weight:700;color:var(--acc)}",
    ".wu-item{margin-top:10px;padding:12px 14px;border-radius:12px;background:var(--card)}",
    ".wu-item .q{font-size:16px;line-height:1.45}.wu-item .q b{color:var(--c)}",
    ".wu-item details{margin-top:8px}.wu-item summary{cursor:pointer;color:var(--c);font-weight:600;font-size:14px}",
    ".wu-item .a{margin-top:6px;font-size:15px;color:var(--ink);line-height:1.45}"
  ].join("\n");
  document.head.appendChild(css);

  function byId(id) { return W.filter(function (w) { return w.id === id; })[0]; }

  A.routes.warmup = function (parts) {
    var w = parts[1] && byId(parts[1]);
    return w ? page(w) : list();
  };

  function list() {
    var mine = W.filter(function (w) { return w.stages.indexOf(stage) >= 0; });
    var h = '<div style="--c:' + COLOR + '"><div class="tabtop"></div>' +
      '<div class="album"><span class="sq" aria-hidden="true">☕</span><div><span class="eyebrow" style="color:#DADADA">Start of the lesson</span><h1>Warm-ups</h1><p>5–10 minutes each</p></div></div>' +
      '<p class="howto">A warm-up is 5–10 minutes at the start of a lesson. Choose the stage, then the part of the exam you will practise today. ' +
      '<b>💬 Talk</b> — talk about a topic from a real olympiad text. <b>✏️ Practice</b> — a short exercise before the task; the answers are hidden.</p>' +
      '<div class="cards2" role="tablist" aria-label="Stage">' + STAGES.map(function (x) {
        return '<button class="opt' + (stage === x[0] ? ' sel' : '') + '" data-wustage="' + x[0] + '" role="tab" aria-selected="' + (stage === x[0]) + '">' + esc(x[1]) + '</button>';
      }).join("") + '</div>';
    PARTS.forEach(function (p) {
      var items = mine.filter(function (w) { return w.part === p[0]; });
      if (!items.length) return;
      h += '<div class="wu-group" style="--g:' + COLOR + '"><span class="ic" aria-hidden="true">' + p[1] + '</span><h2>' + esc(p[2]) + '</h2></div>' + (p[3] ? '<p class="wu-sub">' + esc(p[3]) + '</p>' : '');
      // Сначала разговор, потом упражнение: так и идёт урок.
      items.sort(function (x, y) { return (x.kind === "talk" ? 0 : 1) - (y.kind === "talk" ? 0 : 1); }).forEach(function (w) {
        var k = KIND[w.kind];
        h += '<a class="wu-card" href="#/warmup/' + w.id + '" style="--g:' + k.color + '"><span class="em" aria-hidden="true">' + w.icon + '</span>' +
          '<span><span class="wu-kind" style="color:' + k.color + '">' + k.label + '</span><span class="wu-name">' + esc(w.title) + '</span><span class="wu-before">' + esc(w.before) + '</span></span>' +
          '<span class="st' + (doneToday(w.id) ? ' done' : '') + '">' + (doneToday(w.id) ? '✓ today' : w.minutes + ' min') + '</span></a>';
      });
    });
    if (stage !== "mun") h += '<p class="note" style="margin-top:18px">Now we are getting ready for the municipal stage — these are for later.</p>';
    return h + '</div>';
  }

  function page(w) {
    var k = KIND[w.kind];
    var h = '<div style="--c:' + k.color + '"><a class="back" href="#/warmup">← Warm-ups</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">' + w.icon + '</span><div><span class="eyebrow">' + esc(k.label) + ' · ' + w.minutes + ' min</span><h1>' + esc(w.title) + '</h1></div></div>' +
      '<p class="howto">' + esc(w.goal) + '</p>' +
      '<p class="note"><b>Before:</b> ' + esc(w.before) + '</p>' +
      '<ol class="wu-steps" aria-label="What to do">' + w.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ol>';
    if (w.kind === "talk") {
      h += '<h2 class="list-h" style="font-size:18px">Questions</h2><ol class="wu-q">' + w.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join("") + '</ol>' +
        '<h2 class="list-h" style="font-size:18px">Useful words</h2><p class="note" style="margin-top:2px">Tap a word or phrase to save it to My words — with the translation.</p><div class="wu-words">' +
        w.words.map(function (x) { return '<button type="button" data-wuword="' + esc(x) + '">' + esc(x) + '</button>'; }).join("") + '</div>';
    } else {
      h += '<div class="listen"><button class="ghost" data-wuall="1">👀 Show all answers</button></div>' +
        w.items.map(function (it, i) {
          return '<div class="wu-item"><div class="q"><b>' + (i + 1) + '.</b> ' + esc(it.q) + '</div><details><summary>Show answer</summary><div class="a">' + esc(it.a) + '</div></details></div>';
        }).join("");
    }
    h += '<div class="listen" style="margin-top:18px;align-items:center">' + (doneToday(w.id)
      ? '<span class="wu-done">✓ Done today</span><a class="ghost" href="#/warmup" style="text-decoration:none">More warm-ups</a>'
      : '<button class="bigplay" data-wudone="' + esc(w.id) + '">✓ Done</button>') + '</div>';
    return h + '</div>';
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.wustage) { stage = b.dataset.wustage; try { localStorage.setItem(STAGE_KEY, stage); } catch (e) {} A.keepScroll(A.render); return; }
    if (b.dataset.wuword) { if (A.words && A.words.offer) A.words.offer(b.dataset.wuword, (byId((location.hash.split("/")[2] || "")) || {}).title); return; }
    if (b.dataset.wuall) { document.querySelectorAll(".wu-item details").forEach(function (d) { d.open = true; }); return; }
    if (b.dataset.wudone) {
      done[b.dataset.wudone] = today(); save();
      if (A.markActivity) A.markActivity();
      A.keepScroll(A.render);
    }
  });
})();
