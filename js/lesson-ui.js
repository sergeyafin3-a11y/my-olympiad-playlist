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
  // Буквы, напечатанные в настоящем задании урока: "l2:1:1" → {"6": "D"}. Помнятся, пока ходим по шагам.
  if (!st.paper || typeof st.paper !== "object" || Array.isArray(st.paper)) st.paper = {};
  // Записи ученицы в уроке (карта сюжета, свои версии фраз, абзац): "l3:5:1" → {text: "…"}. Помнятся между шагами.
  if (!st.notes || typeof st.notes !== "object" || Array.isArray(st.notes)) st.notes = {};
  function notesOf(key) {
    var m = st.notes[key];
    if (!m || typeof m !== "object" || Array.isArray(m)) m = st.notes[key] = {};
    return m;
  }
  // Шкала жюри муниципального этапа (Writing, критерии 2–5): число ошибок → баллы.
  function points(n) { return n === 0 ? 4 : n <= 2 ? 3 : n <= 4 ? 2 : n <= 6 ? 1 : 0; }
  // Слова — как их считает жюри: заголовок и числа тоже слова, «didn't» и «well-known» — одно слово.
  function countWords(t) { return (String(t).match(/[A-Za-z0-9][A-Za-z0-9'\u2019-]*/g) || []).length; }
  function wcLine(t, min, max) { var n = countWords(t); return n + " word" + (n === 1 ? "" : "s") + " · aim: " + min + "–" + max; }
  // Ответы одного листа — только буквы A–K: испорченное хранилище не должно ни ломать лист, ни глотать ввод.
  function sheetOf(key) {
    var m = st.paper[key];
    if (!m || typeof m !== "object" || Array.isArray(m)) m = st.paper[key] = {};
    Object.keys(m).forEach(function (g) { if (!/^[A-K]$/.test(m[g])) delete m[g]; });
    return m;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} }
  var picked = {}; // ответы викторин в этой сессии: "l2:1:0:3" → индекс выбранного варианта
  var games = {};  // состояние игр в этой сессии (выбор, найденные слова, разложенные карточки)
  function game(k) { return games[k] || (games[k] = {}); }
  function blockOf(key) { var p = key.split(":"), l = byId(p[0]); return l && l.steps[+p[1]].blocks[+p[2]]; }
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
    // Мемы учителя — с надписями: показываем целиком (contain), без обрезки, на мягком фоне.
    ".ls-hero{display:block;width:100%;height:auto;max-height:340px;object-fit:contain;border-radius:16px;margin-top:14px;background:#1d1d1d}",
    ".ls-thumb{width:64px;height:64px;border-radius:12px;object-fit:cover;background:#1d1d1d}",
    ".ls-card .ls-when{display:block;font-size:12px;font-weight:700;color:var(--c);letter-spacing:.02em;margin-bottom:2px}",
    ".ls-photo{position:relative}",
    ".ls-sticker{position:absolute;left:12px;bottom:12px;transform:rotate(-4deg);padding:6px 12px;border-radius:10px;background:#FFF3B0;color:#111;font-weight:800;font-size:15px;box-shadow:0 6px 18px rgba(0,0,0,.35);letter-spacing:.01em}",
    ".ls-meme{margin-top:12px;border-radius:16px;overflow:hidden;border:1px solid var(--line)}",
    ".ls-meme .row{display:grid;grid-template-columns:72px 1fr;align-items:center;min-height:72px}",
    ".ls-meme .row span{font-size:42px;text-align:center}",
    ".ls-meme .row p{margin:0;padding:12px 14px;font-weight:700;font-size:16px;line-height:1.35}",
    ".ls-meme .no{background:#2b1f1f}.ls-meme .yes{background:#1f2b23}",
    ".ls-meme.pov{padding:16px;background:linear-gradient(135deg,#2a1a3a,#1a2a3a);font-weight:800;font-size:18px;line-height:1.35}",
    ".ls-meme.pov span{display:block;font-size:44px;margin-top:6px}",
    ".ls-credit{font-size:11px;color:var(--dim);margin-top:4px}",
    ".ls-tot{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}",
    ".ls-tot button{border-radius:14px;padding:14px 10px;border:2px solid var(--line);background:var(--card);color:var(--ink);font-size:16px;font-weight:700}",
    ".ls-tot button.on{border-color:var(--c);background:rgba(46,196,214,.16)}",
    ".ls-tot .ask{grid-column:1/-1;font-size:15px;color:var(--ink);padding:2px 4px 8px}",
    ".ls-speak{margin-top:12px;padding:16px;border-radius:16px;background:linear-gradient(135deg,rgba(46,196,214,.18),rgba(199,125,255,.14));border:1px solid var(--line)}",
    ".ls-speak h3{font-size:18px;margin-bottom:6px}",
    ".ls-game{margin-top:12px;padding:14px;border-radius:16px;background:var(--card)}",
    ".ls-sent{display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:17px}",
    ".ls-sent button.w{border:0;background:transparent;color:var(--ink);font-size:17px;padding:4px 3px;border-radius:6px}",
    ".ls-sent button.w:hover{background:rgba(255,255,255,.08)}",
    ".ls-sent button.w.bin{text-decoration:line-through;color:var(--bad);animation:lsBin .5s}",
    ".ls-sent button.w.hit{background:rgba(61,220,151,.22);color:var(--ink);font-weight:700}",
    ".ls-sent button.w.miss,.ls-chip.miss{animation:lsShake .35s;background:rgba(255,92,92,.18)}",
    ".ls-sent .ok{border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--ink);padding:4px 10px;font-size:14px;margin-left:4px}",
    ".ls-sent .ok.hit{border-color:var(--acc);background:rgba(61,220,151,.18)}",
    ".ls-game .why{margin-top:6px;font-size:14px;color:var(--mute)}",
    ".ls-score{font-size:13px;color:var(--mute);margin-top:6px}",
    ".ls-pool{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;min-height:44px}",
    ".ls-chip{touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;border-radius:999px;padding:8px 14px;border:1px solid var(--line);background:#2a2a2a;color:var(--ink);font-weight:600;font-size:15px}",
    ".ls-chip.sel{border-color:var(--c);box-shadow:0 0 0 2px var(--c)}",
    ".ls-chip.card{border-radius:12px;font-weight:500;text-align:left;line-height:1.35}",
    ".ls-buckets{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}",
    ".ls-bucket{min-height:110px;border-radius:14px;border:2px dashed var(--line);padding:10px;display:flex;flex-direction:column;gap:6px;align-items:flex-start}",
    ".ls-bucket b{font-size:14px}",
    ".ls-bucket.over,.ls-slot.over{border-color:var(--c);background:rgba(46,196,214,.08)}",
    ".ls-bucket .ls-chip{cursor:default;background:rgba(61,220,151,.18);border-color:var(--acc)}",
    ".ls-gaptext{font-size:16px;line-height:1.9}",
    ".ls-slot{display:inline-block;min-width:90px;min-height:30px;vertical-align:middle;border-radius:10px;border:2px dashed var(--line);padding:2px 8px;margin:2px;font-size:14px;line-height:1.35;cursor:pointer}",
    ".ls-slot.full{border-style:solid;border-color:var(--c);background:rgba(46,196,214,.10)}",
    ".ls-slot.right{border-color:var(--acc);background:rgba(61,220,151,.16)}.ls-slot.wrong{border-color:var(--bad);background:rgba(255,92,92,.14)}",
    ".ls-ghost{position:fixed;z-index:50;pointer-events:none;opacity:.92;transform:translate(-50%,-50%) rotate(-2deg);box-shadow:0 10px 30px rgba(0,0,0,.5)}",
    ".ls-win{margin-top:10px;font-weight:800;color:var(--acc)}",
    "@keyframes lsShake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}",
    "@keyframes lsBin{0%{transform:scale(1)}50%{transform:scale(1.25) rotate(-6deg)}100%{transform:scale(1)}}",
    "@media (prefers-reduced-motion: reduce){.ls-sent button.w.bin,.ls-sent button.w.miss,.ls-chip.miss{animation:none}}",
    ".ls-back{display:inline-block;margin-top:10px;padding:8px 14px;border-radius:999px;background:var(--card);border:1px solid #2EC4D6;color:var(--ink);text-decoration:none;font-weight:600;font-size:14px}",
    // Настоящее задание — светлым листом, как бланк олимпиады: сразу видно, что это не упражнение, а оно самое.
    ".ls-paper{margin-top:12px;padding:16px;border-radius:6px;background:#FBF8F1;color:#1A1A1A;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.55;box-shadow:0 8px 24px rgba(0,0,0,.35)}",
    ".ls-paper .src{font-family:inherit;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#6B6457;border-bottom:1px solid #D9D2C3;padding-bottom:6px;margin-bottom:10px}",
    ".ls-ptask{margin-top:16px;font-size:16px}",
    ".ls-paper p{margin:0 0 10px}.ls-paper .ins{font-weight:700}.ls-paper .ttl{font-weight:700;font-size:17px;text-align:center}",
    ".ls-paper .ls-popts{border-top:1px solid #D9D2C3;padding-top:10px;margin-top:4px}.ls-paper .ls-popts p{margin:0 0 7px}",
    ".ls-pgap{font-weight:700;color:#B3261E;white-space:nowrap}",
    ".ls-grid{display:grid;grid-template-columns:repeat(10,1fr);border:1px solid #8A8478;margin-top:10px;font-size:13px;text-align:center}",
    ".ls-grid span{border-left:1px solid #8A8478;padding:3px 0}.ls-grid span:nth-child(10n+1){border-left:0}.ls-grid .e{border-top:1px solid #8A8478;padding:0}",
    // Поля для букв: в пропуске текста и в клетке таблицы. 16px — чтобы iPhone не увеличивал страницу.
    ".ls-pin,.ls-cell{border:0;background:#FFF;color:#1A1A1A;font:700 16px/1 Georgia,'Times New Roman',serif;text-align:center;text-transform:uppercase;padding:0;margin:0}",
    ".ls-pin{width:30px;height:26px;margin-left:3px;border-bottom:2px solid #B3261E;border-radius:4px 4px 0 0;vertical-align:baseline}",
    ".ls-cell{display:block;width:100%;height:32px;background:transparent}",
    ".ls-pin:focus,.ls-cell:focus{outline:2px solid #2EC4D6;outline-offset:0}",
    ".ls-pin.dup,.ls-cell.dup{background:#F6D5D2;color:#B3261E}",
    ".ls-pclear{margin-top:8px;display:flex;justify-content:flex-end}",
    // «What to do» перед каждым упражнением: что сделать, по пунктам, и пример.
    ".ls-brief{margin-top:14px;padding:14px;border-radius:14px;background:rgba(255,214,102,.10);border:1px solid rgba(255,214,102,.55)}",
    ".ls-brief h3{font-size:16px;margin-bottom:4px}.ls-brief .lbl{margin:6px 0 0;font-size:13px;font-weight:700;color:var(--mute);text-transform:uppercase;letter-spacing:.04em}",
    ".ls-brief .ls-ex{margin-top:8px;font-size:15px;line-height:1.45}",
    ".ls-walk ol{margin:10px 0 0;padding-left:22px}.ls-walk li{margin:10px 0;line-height:1.45}.ls-walk li .why{margin-top:4px;font-size:15px;color:var(--ink)}",
    ".ls-walk .ls-pgap{color:var(--c)}",
    // Writing: объявление «Stories Wanted» на листе, жюри, карта сюжета, окно для письма, счётчик ошибок.
    ".ls-notice{border:2px solid #1A1A1A;border-radius:4px;padding:10px 12px;margin:8px 0 10px}.ls-notice .nt{display:block;text-align:center;font-size:17px;margin-bottom:4px}",
    ".ls-paper ul{margin:0 0 10px;padding-left:22px}",
    ".ls-jury{margin-top:12px;padding:12px 14px;border-radius:14px;background:var(--card)}",
    ".ls-jury .jr{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:6px 0}.ls-jury .jr b{flex:1 1 160px}",
    ".ls-jury .jr button{min-width:38px;height:36px;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--ink);font-weight:700;font-size:15px}",
    ".ls-jury .jr button.on{background:var(--c);border-color:var(--c);color:#0B0B0B}.ls-jury .jr em{font-style:normal;font-weight:800;color:var(--acc);margin-left:4px}",
    ".ls-jury .tot{margin-top:6px;font-weight:700}",
    ".ls-verdict{margin-top:10px;padding:12px 14px;border-radius:12px;background:var(--card);border-left:3px solid var(--acc)}.ls-verdict ul{margin:4px 0 8px;padding-left:20px}.ls-verdict li{margin:4px 0;line-height:1.45}.ls-verdict s{color:var(--bad)}",
    ".ls-map label{display:block;margin-top:10px;font-size:15px}",
    ".ls-map textarea,.ls-tf textarea,.ls-write textarea{display:block;width:100%;box-sizing:border-box;margin-top:6px;font:16px/1.45 inherit;font-family:inherit;padding:8px 10px;border-radius:10px;border:1px solid var(--line);background:#101010;color:var(--ink)}",
    ".ls-write{margin-top:12px}.ls-write .wc{margin-top:6px;font-size:14px;color:var(--mute)}",
    ".ls-counter{margin-top:12px;padding:6px 14px;border-radius:14px;background:var(--card)}",
    ".ls-counter .cr{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--line)}.ls-counter .cr:last-child{border-bottom:0}",
    ".ls-counter .cr b{flex:1 1 150px}.ls-counter .pts{font-weight:700}.ls-counter .btns{display:flex;gap:6px}.ls-counter .btns button{width:42px;height:38px;padding:0;font-size:20px}",
    // Таблица-напоминание (герундий / инфинитив): колонки на широком экране, одна под другой на телефоне.
    ".ls-vt{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;margin-top:8px}",
    ".ls-vt>div{padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.04);border-left:3px solid var(--c)}",
    ".ls-vt b.h{display:block;margin-bottom:4px}.ls-vt ul{margin:0;padding-left:18px}.ls-vt li{margin:4px 0;line-height:1.4;font-size:15px}",
    ".ls-vt .note{margin:6px 0 0;font-size:13px;color:var(--mute)}",
    // Перефразирование в формате Use of English Task 2: поле ответа и проверка.
    ".ls-tf{margin-top:10px;padding:14px;border-radius:14px;background:var(--card);border:1px solid var(--line)}",
    ".ls-tf.right{border-color:var(--acc)}.ls-tf.wrong{border-color:var(--bad)}",
    ".ls-tf .q{margin:0;line-height:1.45}.ls-tf .w{margin:8px 0 0;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--c)}",
    ".ls-tf .s{margin:6px 0 0;line-height:2.1}.ls-tf input{width:220px;max-width:100%;font-size:16px;padding:6px 8px;border-radius:8px;border:1px solid var(--line);background:#101010;color:var(--ink)}",
    ".ls-tf .row{display:flex;gap:10px;align-items:center;margin-top:8px;flex-wrap:wrap}.ls-tf .why{font-size:15px}",
    ".ls-wopts{margin-top:8px;padding:10px 14px;border-radius:12px;border:1px solid var(--line);font-size:15px;line-height:1.45}.ls-wopts p{margin:4px 0}"
  ].join("\n");
  document.head.appendChild(css);

  function today() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function dateParts(d) { var p = d.split("-"); return [String(+p[2]), MONTHS[+p[1] - 1]]; }
  function byId(id) { return LS.filter(function (l) { return l.id === id; })[0]; }
  // Задание варианта или тренировочного набора по id — для листа «paper» с настоящим текстом.
  function taskById(id) {
    var r = null;
    (window.VARIANTS || []).forEach(function (v) { v.parts.forEach(function (p) { p.tasks.forEach(function (x) { if (x.id === id) r = x; }); }); });
    Object.keys(window.PRACTICE || {}).forEach(function (v) { Object.keys(window.PRACTICE[v]).forEach(function (pid) {
      window.PRACTICE[v][pid].forEach(function (x) { if (x.id === id) r = x; }); }); });
    return r;
  }
  // «Сегодня» — урок с сегодняшней датой, а если сегодня урока нет — ближайший следующий.
  function current() { var t = today(); return LS.filter(function (l) { return l.date >= t; })[0] || LS[LS.length - 1]; }
  // **жирный** в тексте урока — без HTML в данных.
  // Обложка урока в списке — та же картинка, маленьким квадратом (обрезка через CSS).
  function thumb(u) { return u; }
  function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
  // Ответ перефразирования: без регистра, лишних пробелов и точки в конце; апостроф — любой.
  function norm(s) { return String(s).toLowerCase().replace(/\u2019/g, "'").replace(/[.,!?;:"]/g, " ").replace(/\s+/g, " ").trim(); }
  function matches(it, v) { return it.accept.some(function (a) { return norm(a) === norm(v); }); }
  // Пропуск [3] в тексте задания — как на бланке: «(3) ________».
  function gaps(html) { return html.replace(/\[(\d+)\]/g, '<span class="ls-pgap">($1) ________</span>'); }

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
      h += '<a class="ls-card' + (isCur ? ' today' : '') + '" href="#/lesson/' + l.id + '">' + (l.cover ? '<img class="ls-thumb" src="' + esc(thumb(l.cover)) + '" alt="" loading="lazy">' : '<span class="ls-date"><b>' + dp[0] + '</b><small>' + dp[1] + '</small></span>') +
        '<span><span class="ls-when">' + dp[0] + ' ' + dp[1] + (l.emoji ? ' · ' + l.emoji : '') + '</span><span class="ls-title">' + esc(l.title) + '</span><span class="ls-sub">' + (l.steps ? l.steps.length + ' steps · ' + l.steps.reduce(function (a, s) { return a + s.minutes; }, 0) + ' min' : (l.summary ? 'Summary and links' : 'Coming soon')) + '</span></span>' + badge + '</a>';
    });
    return h + '</div>';
  }

  function lesson(l) {
    var dp = dateParts(l.date);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/lesson">← Lessons</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">🎓</span><div><span class="eyebrow">Lesson · ' + dp[0] + ' ' + dp[1] + (l.steps ? ' · ' + l.steps.reduce(function (a, s) { return a + s.minutes; }, 0) + ' min' : '') + '</span><h1>' + esc(l.title) + '</h1></div></div>';
    if (!l.steps) {
      if (l.cover) h += '<img class="ls-hero" src="' + esc(l.cover) + '" alt="" loading="lazy">';
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
    h += '<div class="ls-head"><h2>' + (STAGE[s.stage] || '') + ' ' + esc(s.title) + '</h2><span>Section ' + (i + 1) + ' of ' + l.steps.length + ' · ' + s.minutes + ' min</span></div>';
    if (s.image) h += '<div class="ls-photo"><img class="ls-hero" src="' + esc(s.image) + '" alt="" loading="lazy">' + (s.sticker ? '<span class="ls-sticker">' + esc(s.sticker) + '</span>' : '') + '</div>';
    // Задания раздела нумеруются по порядку — Task 1, Task 2…: учитель задаёт на дом «Section 5 → Task 3».
    var tn = 0;
    s.blocks.forEach(function (b, k) { h += block(l, i, k, b, b.type === "brief" || b.type === "paper" ? ++tn : 0); });
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

  function block(l, i, k, b, num) {
    var key = l.id + ":" + i + ":" + k;
    if (b.type === "text") return '<p class="ls-text">' + rich(b.text) + '</p>';
    if (b.type === "list") return '<div class="ls-box"><h3>' + esc(b.title) + '</h3><ul class="ls-ol">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ul></div>';
    if (b.type === "steps") return '<div class="ls-box"><h3>📘 ' + esc(b.title) + '</h3><ol class="ls-ol">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol></div>';
    if (b.type === "talk") return '<ol class="ls-talk">' + b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol>';
    if (b.type === "words") return '<div class="ls-words">' + b.items.map(function (x) { return '<button type="button" data-lsword="' + esc(x) + '">' + esc(x) + '</button>'; }).join("") + '</div>';
    if (b.type === "hooks") return '<div class="ls-hooks">' + b.items.map(function (x) { return '<div><b>' + esc(x.h) + '</b>' + rich(x.t) + '</div>'; }).join("") + '</div>';
    if (b.type === "reveal") return '<details class="ls-box"><summary><b>' + esc(b.label) + '</b></summary><p class="ls-text">' + rich(b.text) + '</p></details>';
    // Настоящее задание: букву можно напечатать прямо в пропуске или в таблице — это одно и то же поле.
    // Проверки нет нарочно: у задания урока (2025/26) и домашнего пирога (2024/25) шесть общих букв в ключе —
    // проверка на уроке выдала бы больше половины домашнего задания.
    // Текст берётся из самого задания (b.task) — тот же, что на его странице, без копии в уроке.
    if (b.type === "paper") {
      var src = b.task ? taskById(b.task) : b;
      if (!src) return "";
      var paras = src.paras || src.text.map(function (x) { return x.replace(/\((\d+)\)\s*_+/g, "[$1]"); });
      var mine = sheetOf(key), cnt = {};
      Object.keys(mine).forEach(function (g) { cnt[mine[g]] = (cnt[mine[g]] || 0) + 1; });
      var pin = function (n, cls) {
        var v = mine[n] || "";
        return '<input class="' + cls + (v && cnt[v] > 1 ? ' dup' : '') + '" data-pin="' + key + ':' + n + '" value="' + esc(v) + '" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="Gap ' + n + '">';
      };
      var cells = ""; for (var c = 1; c <= 10; c++) cells += '<span>' + c + '</span>';
      for (c = 1; c <= 10; c++) cells += '<span class="e">' + pin(c, "ls-cell") + '</span>';
      return (num ? '<h3 class="ls-ptask">📋 Task ' + num + ' · ' + esc(b.title || "The olympiad task") + '</h3>' : '') + '<div class="ls-paper"><div class="src">' + esc(b.source) + '</div><p class="ins">' + esc(src.instruction || src.intro) + '</p>' +
        (src.textTitle ? '<p class="ttl">' + esc(src.textTitle) + '</p>' : '') +
        paras.map(function (x) { return '<p>' + esc(x).replace(/\[(\d+)\]/g, function (_, n) { return '<span class="ls-pgap">(' + n + ') ' + pin(n, "ls-pin") + '</span>'; }) + '</p>'; }).join("") +
        '<div class="ls-popts">' + src.opts.map(function (o) { return '<p><b>' + esc(o.k) + ')</b> ' + esc(o.t) + '</p>'; }).join("") + '</div>' +
        '<div class="ls-grid" aria-label="Answer table">' + cells + '</div></div>' +
        '<div class="ls-pclear"><button class="ghost" data-lspclear="' + key + '">↺ Clear the answers</button></div>';
    }
    if (b.type === "vtable") return '<div class="ls-box"><h3>' + esc(b.title) + '</h3><div class="ls-vt">' + b.cols.map(function (c) {
      return '<div><b class="h">' + esc(c.h) + '</b><ul>' + c.lines.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ul>' + (c.note ? '<p class="note">' + rich(c.note) + '</p>' : '') + '</div>';
    }).join("") + '</div></div>';
    // Ответ виден только после «Check»: верный — зелёным, неверный — красным и с правильным ответом.
    if (b.type === "transform") return b.items.map(function (it, n) {
      var tg = game(key + ":" + n), val = tg.v || "", ok = tg.checked && matches(it, val);
      return '<div class="ls-tf' + (tg.checked ? (ok ? ' right' : ' wrong') : '') + '"><p class="q"><b>' + (n + 1) + '.</b> ' + esc(it.q) + '</p><p class="w">' + esc(it.word) + '</p>' +
        '<p class="s">' + (it.before ? esc(it.before) + ' ' : '') + '<input data-tfin="' + key + ':' + n + '" value="' + esc(val) + '" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" aria-label="Answer ' + (n + 1) + '"> ' + esc(it.after) + ' <small>(' + it.n + ' words)</small></p>' +
        '<div class="row"><button class="ghost" data-tfcheck="' + key + ':' + n + '">✓ Check</button>' +
        (tg.checked ? '<span class="why">' + (ok ? '✓ Right!' : '✗ Answer: <b>' + esc(it.accept[0]) + '</b>') + '</span>' : '') + '</div>' +
        (tg.checked && it.note ? '<p class="why">' + rich(it.note) + '</p>' : '') + '</div>';
    }).join("");
    // Задание Writing — тоже светлым листом; объявление в рамке, заданная фраза — жирным.
    if (b.type === "wpaper") {
      var w = b.task ? taskById(b.task) : b;
      if (!w) return "";
      var dot = w.premise.indexOf(". "), head = dot > 0 ? w.premise.slice(0, dot) : "", rest = dot > 0 ? w.premise.slice(dot + 2) : w.premise;
      return '<div class="ls-paper"><div class="src">' + esc(b.source) + '</div><p>' + esc(w.intro) + '</p><div class="ls-notice">' +
        (head ? '<b class="nt">' + esc(head) + '</b>' : '') + esc(rest).replace(/(sentence: )(.+)$/, '$1<b>$2</b>') + '</div>' +
        '<p class="ins">' + esc(w.pointsLabel) + '</p><ul>' + w.points.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul><p>' + esc(w.outro) + '</p></div>';
    }
    // Жюри: ученица ставит баллы сама; вердикт с ошибками — только по кнопке.
    if (b.type === "jury") {
      var jg = game(key), pick = jg.pick || {}, CR = [["task", "Task completion"], ["org", "Organisation"], ["lex", "Vocabulary"], ["gram", "Grammar"], ["spell", "Spelling and punctuation"]];
      var mineSum = 0, all = true, jurySum = 0;
      CR.forEach(function (c) { if (pick[c[0]] == null) all = false; else mineSum += pick[c[0]]; jurySum += b.score[c[0]]; });
      var jh = '<div class="ls-paper"><p class="ttl">' + esc(b.title) + '</p>' + b.story.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join("") + '</div>' +
        '<div class="ls-jury">' + CR.map(function (c) {
          return '<div class="jr"><b>' + c[1] + '</b><span>' + [0, 1, 2, 3, 4].map(function (v) {
            return '<button class="' + (pick[c[0]] === v ? 'on' : '') + '" data-lsjury="' + key + ':' + c[0] + ':' + v + '">' + v + '</button>';
          }).join(" ") + '</span>' + (jg.verdict ? '<em>Jury: ' + b.score[c[0]] + '</em>' : '') + '</div>';
        }).join("") + (all ? '<p class="tot">Your score: ' + mineSum + ' / 20' + (jg.verdict ? ' · Jury: ' + jurySum + ' / 20' : '') + '</p>' : '') + '</div>';
      if (!jg.verdict) return jh + '<div class="listen"><button class="bigplay" data-lsverdict="' + key + '">⚖️ Show the jury\'s verdict</button></div>';
      return jh + CR.map(function (c) {
        var ms = b.mistakes[c[0]] || [];
        return '<div class="ls-verdict"><b>' + c[1] + ': ' + b.score[c[0]] + ' / 4</b>' + (ms.length ? '<ul>' + ms.map(function (m) {
          return '<li>' + (typeof m === "string" ? esc(m) : '<s>' + esc(m.wrong) + '</s> → <b>' + esc(m.right) + '</b>' + (m.why ? ' — ' + esc(m.why) : '')) + '</li>';
        }).join("") + '</ul>' : '<p class="why">No mistakes.</p>') + '</div>';
      }).join("");
    }
    if (b.type === "storymap") {
      var sm = notesOf(key);
      return '<div class="ls-map">' + b.fields.map(function (f) {
        return '<label><b>' + esc(f.label) + '</b><textarea rows="2" data-lsnote="' + key + ':' + f.id + '">' + esc(sm[f.id] || "") + '</textarea></label>';
      }).join("") + '</div>';
    }
    // Своя версия — без автопроверки: правильных вариантов много, решает учитель; образец — по кнопке.
    if (b.type === "upgrade") {
      var um = notesOf(key);
      return b.items.map(function (it, n) {
        return '<div class="ls-tf"><p class="q"><b>' + (n + 1) + '.</b> ' + esc(it.plain) + '</p><p class="w">' + esc(it.tool) + '</p>' +
          '<textarea rows="2" data-lsnote="' + key + ':' + n + '" spellcheck="false" placeholder="Your version…">' + esc(um[n] || "") + '</textarea>' +
          '<div class="row">' + (game(key + ":" + n).model ? '<span class="why">💡 ' + esc(it.model) + '</span>' : '<button class="ghost" data-lsmodel="' + key + ':' + n + '">💡 One possible version</button>') + '</div></div>';
      }).join("");
    }
    // Окно для письма — как на олимпиаде в тестирующей системе: без подсказок орфографии.
    if (b.type === "writebox") {
      var wm = notesOf(key), wt = wm.text != null ? wm.text : (b.start || "");
      return '<div class="ls-write"><textarea rows="9" data-lsnote="' + key + ':text" spellcheck="false" autocorrect="off" autocapitalize="sentences" placeholder="Start writing here…">' + esc(wt) + '</textarea>' +
        '<div class="wc" data-wc="' + key + ':text" data-min="' + b.min + '" data-max="' + b.max + '">' + wcLine(wt, b.min, b.max) + '</div></div>';
    }
    // Счётчик жюри: учитель отмечает ошибки, баллы — по шкале муниципального этапа.
    if (b.type === "counter") {
      var cn = game(key).n || {}, ctot = 0;
      return '<div class="ls-counter">' + b.crits.map(function (c) {
        var n = cn[c.id] || 0, p = points(n); ctot += p;
        return '<div class="cr"><b>' + esc(c.t) + '</b> <span class="pts">' + n + ' mistake' + (n === 1 ? '' : 's') + ' → ' + p + ' point' + (p === 1 ? '' : 's') + '</span>' +
          '<span class="btns"><button class="ghost" data-lscount="' + key + ':' + c.id + ':-1" aria-label="One mistake less">−</button><button class="ghost" data-lscount="' + key + ':' + c.id + ':1" aria-label="One more mistake">+</button></span></div>';
      }).join("") + '<p class="tot"><b>Criteria 2–5: ' + ctot + ' / ' + b.crits.length * 4 + '</b></p></div>';
    }
    if (b.type === "brief") return '<div class="ls-brief"><h3>📋 ' + (num ? 'Task ' + num + ' · ' : '') + esc(b.title) + '</h3><p class="lbl">What to do</p><ol class="ls-ol">' +
      b.items.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol>' + (b.example ? '<p class="ls-ex"><b>Example:</b> ' + rich(b.example) + '</p>' : '') + '</div>';
    // Разбор пропуска по шагам: вопрос шага виден, ответ открывается по «Show», и только тогда — следующий шаг.
    if (b.type === "walk") {
      var wn = game(key).n || 0;
      return '<div class="ls-game ls-walk"><div class="ls-gap">' + gaps(esc(b.context)) + '</div>' +
        (b.opts ? '<div class="ls-wopts">' + b.opts.map(function (o) { return '<p><b>' + esc(o.k) + ')</b> ' + esc(o.t) + '</p>'; }).join("") + '</div>' : '') + '<ol>' + b.steps.map(function (x, j) {
        return j > wn ? '' : '<li><b>' + rich(x.q) + '</b>' + (j < wn ? '<p class="why">' + rich(x.a) + '</p>' : '') + '</li>';
      }).join("") + '</ol>' + (wn < b.steps.length ? '<button class="bigplay" data-lswalk="' + key + '">👀 Show</button>' : '<p class="ls-win">✅ Gap ' + esc(b.gap) + ' = ' + esc(b.answer) + '</p>') + '</div>';
    }
    if (b.type === "timer") {
      var on = st.timer && st.timer.key === key;
      return '<div class="ls-timer"><b class="ls-clock" data-key="' + key + '">' + (on ? left(st.timer.end) : b.minutes + ':00') + '</b><button class="ghost" data-lstimer="' + key + '" data-min="' + b.minutes + '">' + (on ? '↺ Restart' : '▶ ' + esc(b.label)) + '</button></div>';
    }
    if (b.type === "task") return '<a class="ls-task" href="#/t/' + esc(b.task) + '" data-lsfrom="1"><span aria-hidden="true">📖</span>' + esc(b.label) + ' →</a>';
    if (b.type === "links") return '<div class="ls-box ls-links"><h3>' + esc(b.title) + '</h3>' + b.items.map(linkHTML).join("") + '</div>';
    // Мемы — в форматах на эмодзи и тексте (без чужих фото): «🙅 / 😎», «POV», «Me … / Me after».
    if (b.type === "meme") {
      if (b.style === "drake") return '<div class="ls-meme"><div class="row no"><span aria-hidden="true">🙅‍♀️</span><p>' + rich(b.no) + '</p></div><div class="row yes"><span aria-hidden="true">😎</span><p>' + rich(b.yes) + '</p></div></div>';
      if (b.style === "pov") return '<div class="ls-meme pov">' + rich(b.text) + '<span aria-hidden="true">' + esc(b.emoji) + '</span></div>';
      if (b.style === "me") return '<div class="ls-meme"><div class="row no"><span aria-hidden="true">' + esc(b.a) + '</span><p>' + rich(b.top) + '</p></div><div class="row yes"><span aria-hidden="true">' + esc(b.b) + '</span><p>' + rich(b.bottom) + '</p></div></div>';
    }
    if (b.type === "thisorthat") return '<div>' + b.items.map(function (it, n) {
      var g = game(key + ":" + n);
      return '<div class="ls-tot">' + ["a", "b"].map(function (side) { return '<button class="' + (g.side === side ? 'on' : '') + '" data-lstot="' + key + ':' + n + ':' + side + '">' + esc(it[side]) + '</button>'; }).join("") +
        (g.side ? '<div class="ask">💬 ' + esc(it.ask) + '</div>' : '') + '</div>';
    }).join("") + '</div>';
    if (b.type === "speak") return '<div class="ls-speak"><h3>' + esc(b.title) + '</h3><ol class="ls-ol">' + b.plan.map(function (x) { return '<li>' + rich(x) + '</li>'; }).join("") + '</ol>' +
      '<div class="ls-words">' + b.phrases.map(function (x) { return '<button type="button" data-lsword="' + esc(x) + '">' + esc(x) + '</button>'; }).join("") + '</div>' +
      block(l, i, k + "s", { type: "timer", minutes: (b.seconds || 60) / 60, label: "Start talking" }) + '</div>';
    if (b.type === "binword") return b.items.map(function (it, n) {
      var g = game(key + ":" + n), words = it.text.split(" ");
      return '<div class="ls-game"><div class="ls-sent">' + words.map(function (w, j) {
        var clean = w.replace(/[.,!?]/g, ""), cls = g.done && clean === it.extra ? ' bin' : g.miss === j ? ' miss' : '';
        return '<button class="w' + cls + '" data-lsbin="' + key + ':' + n + ':' + j + '"' + (g.done ? ' disabled' : '') + '>' + esc(w) + '</button>';
      }).join("") + '<button class="ok' + (g.done && !it.extra ? ' hit' : g.miss === -1 ? ' miss' : '') + '" data-lsbin="' + key + ':' + n + ':-1"' + (g.done ? ' disabled' : '') + '>✓ correct</button></div>' +
        (g.done ? '<p class="why">' + (it.extra ? '🗑️ <b>' + esc(it.extra) + '</b> — ' : '✅ ') + rich(it.why) + '</p>' : '') + '</div>';
    }).join("");
    if (b.type === "hookhunt") {
      var hg = game(key), found = hg.found || {}, n = Object.keys(found).length;
      return '<div class="ls-game"><div class="ls-sent">' + b.text.split(" ").map(function (w, j) {
        return '<button class="w' + (found[j] ? ' hit' : hg.miss === j ? ' miss' : '') + '" data-lshook="' + key + ':' + j + '">' + esc(w) + '</button>';
      }).join("") + '</div><p class="ls-score">' + (n === b.hooks.length ? '<span class="ls-win">🎉 All ' + n + ' hooks found!</span>' : '🔎 Found ' + n + ' of ' + b.hooks.length) + '</p></div>';
    }
    if (b.type === "sort") {
      // rest, а не left: left — функция таймера, var здесь затенял её во всём block().
      var sg = game(key), placed = sg.placed || {}, rest = b.cards.filter(function (c, j) { return !placed[j]; });
      return '<div class="ls-game"><div class="ls-pool">' + b.cards.map(function (c, j) {
        return placed[j] ? '' : '<span class="ls-chip' + (sg.sel === j ? ' sel' : '') + (sg.miss === j ? ' miss' : '') + '" data-lsdrag="' + key + ':' + j + '" role="button" tabindex="0">' + esc(c.t) + '</span>';
      }).join("") + (rest.length ? '' : '<span class="ls-win">🎉 All sorted!</span>') + '</div><div class="ls-buckets">' + b.buckets.map(function (bk) {
        return '<div class="ls-bucket" data-lsdrop="' + key + ':' + bk.id + '"><b>' + esc(bk.label) + '</b>' +
          b.cards.map(function (c, j) { return placed[j] === bk.id ? '<span class="ls-chip">' + esc(c.t) + '</span>' : ''; }).join("") + '</div>';
      }).join("") + '</div></div>';
    }
    if (b.type === "gapfill") {
      var gg = game(key), fill = gg.fill || {}, used = {};
      Object.keys(fill).forEach(function (gap) { used[fill[gap]] = 1; });
      var txt = esc(b.text).replace(/\[(\d+)\]/g, function (_, gap) {
        var c = fill[gap], card = c && b.cards.filter(function (x) { return x.k === c; })[0];
        var cls = c ? (gg.checked ? (b.key[gap] === c ? ' right' : ' wrong') : ' full') : '';
        return '<span class="ls-slot' + cls + '" data-lsdrop="' + key + ':' + gap + '" role="button" tabindex="0">' + (card ? '<b>' + esc(card.k) + '.</b> ' + esc(card.t) : '(' + gap + ') drop here') + '</span>';
      });
      return '<div class="ls-game"><div class="ls-gaptext">' + txt + '</div><div class="ls-pool">' + b.cards.map(function (c) {
        return used[c.k] ? '' : '<span class="ls-chip card' + (gg.sel === c.k ? ' sel' : '') + '" data-lsdrag="' + key + ':' + c.k + '" role="button" tabindex="0"><b>' + esc(c.k) + '.</b> ' + esc(c.t) + '</span>';
      }).join("") + '</div><div class="listen">' + (gg.checked ? '<button class="ghost" data-lsreset="' + key + '">↺ Try again</button>' : '<button class="bigplay" data-lscheck="' + key + '">✓ Check</button>') + '</div>' +
        (gg.checked ? '<ul class="ls-ol">' + Object.keys(b.why).map(function (g) { return '<li>' + rich(b.why[g]) + '</li>'; }).join("") + '</ul>' : '') + '</div>';
    }
    if (b.type === "example") {
      var pk = key + ":0", sel = picked[pk];
      return '<div class="ls-q"><div class="qq"><b>' + esc(b.title) + '</b></div><div class="ls-gap">' + esc(b.text) + '</div><div class="opts">' +
        b.opts.map(function (o, j) { var c = sel == null ? '' : j === b.a ? 'right' : j === sel ? 'wrong' : ''; return '<button class="' + c + '" data-lspick="' + pk + ':' + j + '">' + "AB"[j] + '. ' + esc(o) + '</button>'; }).join("") +
        '</div>' + (sel != null ? '<p class="why">' + rich(b.why) + '</p>' : '') + '</div>';
    }
    if (b.type === "quiz") {
      return b.items.map(function (it, n) {
        var pk = key + ":" + n, sel = picked[pk];
        return '<div class="ls-q"><div class="qq">' + (b.items.length > 1 ? '<b>' + (n + 1) + '.</b> ' : '') + esc(it.q) + '</div><div class="opts">' +
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
    if (d.lstot) { var t3 = d.lstot.split(":"), side = t3.pop(); game(t3.join(":")).side = side; A.keepScroll(A.render); return; }
    if (d.lsbin) {
      var bp = d.lsbin.split(":"), wi = +bp.pop(), ni = +bp.pop(), bk = bp.join(":"), bb = blockOf(bk), it = bb.items[ni], g = game(bk + ":" + ni);
      var clean = wi < 0 ? null : it.text.split(" ")[wi].replace(/[.,!?]/g, "");
      if ((wi < 0 && !it.extra) || (wi >= 0 && clean === it.extra)) { g.done = true; g.miss = null; } else g.miss = wi;
      A.keepScroll(A.render); return;
    }
    if (d.lshook) {
      var hp = d.lshook.split(":"), wj = +hp.pop(), hk = hp.join(":"), hb = blockOf(hk), hg = game(hk);
      var word = hb.text.split(" ")[wj].replace(/[.,!?]/g, "");
      hg.found = hg.found || {};
      if (hb.hooks.indexOf(word) >= 0) { hg.found[wj] = 1; hg.miss = null; } else hg.miss = wj;
      A.keepScroll(A.render); return;
    }
    if (d.lscheck) { game(d.lscheck).checked = true; A.keepScroll(A.render); return; }
    if (d.tfcheck) { game(d.tfcheck).checked = true; A.keepScroll(A.render); return; }
    if (d.lsjury) { var jp = d.lsjury.split(":"), jv = +jp.pop(), jc = jp.pop(), jgm = game(jp.join(":")); jgm.pick = jgm.pick || {}; jgm.pick[jc] = jv; A.keepScroll(A.render); return; }
    if (d.lsverdict) { game(d.lsverdict).verdict = true; A.keepScroll(A.render); return; }
    if (d.lsmodel) { game(d.lsmodel).model = true; A.keepScroll(A.render); return; }
    if (d.lscount) { var cp = d.lscount.split(":"), cd = +cp.pop(), cc = cp.pop(), cgm = game(cp.join(":")); cgm.n = cgm.n || {}; cgm.n[cc] = Math.max(0, (cgm.n[cc] || 0) + cd); A.keepScroll(A.render); return; }
    if (d.lswalk) { var wg = game(d.lswalk); wg.n = (wg.n || 0) + 1; A.keepScroll(A.render); return; }
    // Стереть все буквы — со второго касания, как «Start over» на экране задания.
    if (d.lspclear) {
      if (!d.sure) { d.sure = 1; b.textContent = "Sure? Tap again to clear all letters"; return; }
      delete st.paper[d.lspclear]; save(); A.keepScroll(A.render); return;
    }
    if (d.lsreset) { games[d.lsreset] = {}; A.keepScroll(A.render); return; }
    if (d.lsword) { if (A.words && A.words.offer) A.words.offer(d.lsword, "Lesson"); return; }
    if (d.lstimer) { st.timer = { key: d.lstimer, end: Date.now() + (+d.min) * 60000 }; save(); A.keepScroll(A.render); return; }
  });
  // Буква в настоящем задании: только A–K, заглавная; в пропуске всегда одна буква — новая заменяет старую.
  // Страницу не перерисовываем — иначе пропал бы курсор; то же поле в таблице/тексте правим на месте.
  // Кириллица-двойник (экранная клавиатура в русской раскладке) — латиницей по виду.
  var CYR = { "\u0410": "A", "\u0412": "B", "\u0421": "C", "\u0415": "E", "\u041D": "H", "\u041A": "K" };
  // Записи ученицы сохраняем сразу; у окна для письма — счётчик слов на месте, без перерисовки (курсор не прыгает).
  document.addEventListener("input", function (e) {
    var el = e.target; if (!el.dataset || el.dataset.lsnote == null) return;
    var np = el.dataset.lsnote.split(":"), nf = np.pop();
    notesOf(np.join(":"))[nf] = el.value; save();
    var wc = document.querySelector('[data-wc="' + el.dataset.lsnote + '"]');
    if (wc) wc.textContent = wcLine(el.value, wc.dataset.min, wc.dataset.max);
  });
  // Ответ перефразирования помним, пока урок открыт; страницу не перерисовываем — иначе пропал бы курсор.
  document.addEventListener("input", function (e) {
    // Исправила ответ — старый ✓/✗ уже не про него: до нового «Check» поле снова не проверено.
    var el = e.target; if (el.dataset && el.dataset.tfin != null) { var tg = game(el.dataset.tfin); tg.v = el.value; tg.checked = false; }
  });
  document.addEventListener("keydown", function (e) {
    var el = e.target; if (e.key !== "Enter" || !el.dataset || el.dataset.tfin == null) return;
    var c = document.querySelector('[data-tfcheck="' + el.dataset.tfin + '"]'); if (c) c.click();
  });
  document.addEventListener("input", function (e) {
    var el = e.target; if (!el.dataset || el.dataset.pin == null) return;
    var p = el.dataset.pin.split(":"), n = p.pop(), pk = p.join(":"), mine = sheetOf(pk);
    var got = el.value.toUpperCase().split("").map(function (ch) { return CYR[ch] || ch; }).filter(function (ch) { return /[A-K]/.test(ch); });
    // Не та клавиша (Z, цифра) — буква остаётся, как и в русской раскладке; стереть можно только стиранием.
    if (!got.length && el.value !== "") { el.value = mine[n] || ""; return; }
    // Без maxlength: в полное поле дописалась вторая буква — убираем старую, остаётся новая.
    if (got.length > 1 && got.indexOf(mine[n]) >= 0) got.splice(got.indexOf(mine[n]), 1);
    put(el, pk, n, got.length ? got[got.length - 1] : "");
  });
  // Физическая клавиатура в русской раскладке: клавиша D даёт «в», а по виду это B. Берём клавишу, а не символ.
  document.addEventListener("keydown", function (e) {
    var el = e.target; if (!el.dataset || el.dataset.pin == null) return;
    // Зажатая клавиша — автоповтор: без этого буква шла по клеткам и заполняла всю таблицу.
    if (e.repeat) { e.preventDefault(); return; }
    var m = /^Key([A-Z])$/.exec(e.code || "");
    if (!m || !e.key || e.key.length !== 1 || /[A-Za-z]/.test(e.key) || e.ctrlKey || e.metaKey || e.altKey) return;
    e.preventDefault();
    if (m[1] <= "K") { var p = el.dataset.pin.split(":"), n = p.pop(); put(el, p.join(":"), n, m[1]); }
  });
  function put(el, pk, n, v) {
    var mine = sheetOf(pk);
    if (v) mine[n] = v; else delete mine[n];
    save();
    el.value = v;
    var cnt = {}; Object.keys(mine).forEach(function (g) { cnt[mine[g]] = (cnt[mine[g]] || 0) + 1; });
    document.querySelectorAll('[data-pin^="' + pk + ':"]').forEach(function (x) {
      if (x.dataset.pin === el.dataset.pin && x !== el) x.value = v;
      x.classList.toggle("dup", !!x.value && cnt[x.value] > 1);
    });
    // В таблице — сразу к следующей клетке, как на бланке.
    if (v && el.classList.contains("ls-cell")) { var nx = document.querySelector('.ls-cell[data-pin="' + pk + ':' + (+n + 1) + '"]'); if (nx) nx.focus(); }
  }
  document.addEventListener("focusin", function (e) { if (e.target.dataset && e.target.dataset.pin != null) e.target.select(); });
  // Перетаскивание: карточку можно тянуть мышкой или пальцем (pointer events) — или нажать на неё,
  // а потом на корзину / пропуск. Оба пути ведут в place().
  function place(cardRef, dropRef) {
    var cp = cardRef.split(":"), card = cp.pop(), key = cp.join(":");
    var dp2 = dropRef.split(":"), target = dp2.pop(), dkey = dp2.join(":");
    if (key !== dkey) return;
    var b = blockOf(key), g = game(key);
    if (b.type === "sort") {
      var j = +card;
      if (b.cards[j].b === target) { g.placed = g.placed || {}; g.placed[j] = target; g.miss = null; } else g.miss = j;
    } else if (b.type === "gapfill") {
      g.fill = g.fill || {}; g.checked = false;
      Object.keys(g.fill).forEach(function (gap) { if (g.fill[gap] === card) delete g.fill[gap]; });
      g.fill[target] = card;
    }
    g.sel = null;
    A.keepScroll(A.render);
  }
  var drag = null;
  document.addEventListener("pointerdown", function (e) {
    var c = e.target.closest && e.target.closest("[data-lsdrag]"); if (!c) return;
    drag = { el: c, ref: c.dataset.lsdrag, x: e.clientX, y: e.clientY, moved: false, ghost: null };
  });
  document.addEventListener("pointermove", function (e) {
    if (!drag) return;
    if (!drag.moved && Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) < 8) return;
    if (!drag.moved) { drag.moved = true; drag.ghost = drag.el.cloneNode(true); drag.ghost.classList.add("ls-ghost"); document.body.appendChild(drag.ghost); }
    drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px";
    document.querySelectorAll(".over").forEach(function (x) { x.classList.remove("over"); });
    var under = document.elementFromPoint(e.clientX, e.clientY), drop = under && under.closest("[data-lsdrop]");
    if (drop) drop.classList.add("over");
    e.preventDefault();
  });
  document.addEventListener("pointerup", function (e) {
    if (!drag) return;
    var d = drag; drag = null;
    if (d.ghost) d.ghost.remove();
    document.querySelectorAll(".over").forEach(function (x) { x.classList.remove("over"); });
    var cp = d.ref.split(":"), card = cp.pop(), key = cp.join(":"), g = game(key);
    if (!d.moved) { g.miss = null; g.sel = g.sel === (blockOf(key).type === "sort" ? +card : card) ? null : (blockOf(key).type === "sort" ? +card : card); A.keepScroll(A.render); return; }
    var under = document.elementFromPoint(e.clientX, e.clientY), drop = under && under.closest("[data-lsdrop]");
    if (drop) place(d.ref, drop.dataset.lsdrop);
  });
  document.addEventListener("pointercancel", function () {
    if (drag && drag.ghost) drag.ghost.remove(); drag = null;
    document.querySelectorAll(".over").forEach(function (x) { x.classList.remove("over"); });
  });
  // Нажатие на корзину или пропуск, когда карточка выбрана нажатием; нажатие на занятый пропуск — вернуть карточку.
  document.addEventListener("click", function (e) {
    var drop = e.target.closest && e.target.closest("[data-lsdrop]"); if (!drop) return;
    var dp3 = drop.dataset.lsdrop.split(":"), target = dp3.pop(), key = dp3.join(":"), g = game(key), b = blockOf(key);
    if (g.sel != null) { place(key + ":" + g.sel, drop.dataset.lsdrop); return; }
    if (b.type === "gapfill" && g.fill && g.fill[target]) { delete g.fill[target]; g.checked = false; A.keepScroll(A.render); }
  });

  // Ушли из уроков не через задание урока — обратная ссылка больше не нужна.
  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (st.from && !/^#\/(t|lesson)\//.test(h) && h !== "#/lesson") { st.from = null; save(); }
  });
  A.render();
})();
