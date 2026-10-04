// Грамматика: темы A1–B2 (правило + тест на 10 вопросов) и смешанный тест по выбранным темам.
(function () {
  var A = window.App, G = window.Grammar, T = window.GRAMMAR || [], esc = A.esc;
  var KEY = "olymp-grammar", COLOR = "#2EC4D6", LEVELS = ["A1", "A2", "B1", "B2"];
  var S = { best: {}, ans: {}, checked: {}, mix: null, mixLevels: ["B1", "B2"], mixTopics: [], mixN: 20 };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  if (!Array.isArray(S.mixLevels)) S.mixLevels = ["B1", "B2"];
  S.mixTopics = G.knownIds(T, Array.isArray(S.mixTopics) ? S.mixTopics : []);
  if (S.mix && Array.isArray(S.mix.qs)) S.mix = G.prune(S.mix, T); else S.mix = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var filter = "all";

  var css = document.createElement("style");
  css.textContent = [
    ".lv{display:inline-block;min-width:30px;text-align:center;border-radius:5px;padding:1px 6px;font-size:12px;font-weight:700;color:#0B1A1C;background:" + COLOR + "}",
    ".lv.A1{background:#9BE7C4}.lv.A2{background:#7FD3F0}.lv.B1{background:#B9A6FF}.lv.B2{background:#FF9DC4}",
    ".rule{margin-top:14px;background:var(--card);border-radius:12px;padding:14px 16px}",
    ".rule .ri{font-size:16px;margin:0 0 6px}",
    ".rule h3{font-family:var(--body);font-size:14px;font-weight:700;color:" + COLOR + ";margin:14px 0 6px;letter-spacing:.02em}",
    ".rtab{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);border:1px solid var(--line);border-radius:8px;overflow:hidden}",
    ".rtab div{padding:7px 10px;font-size:14px;border-bottom:1px solid var(--line)}",
    ".rtab div:nth-child(odd){color:var(--mute);background:#181818}",
    ".rtab div:nth-last-child(-n+2){border-bottom:0}",
    ".tips{margin:12px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px}",
    ".tips li{font-size:14px;background:color-mix(in srgb," + COLOR + " 12%,transparent);border-radius:8px;padding:8px 10px}",
    ".why{margin-top:6px;font-size:13px;color:var(--mute)}",
    ".topic-src{font-size:12px;color:var(--mute);margin-bottom:2px}",
    "@media (max-width:480px){.rtab{grid-template-columns:1fr}.rtab div:nth-child(odd){border-bottom:0;padding-bottom:0}}"
  ].join("\n");
  document.head.appendChild(css);

  function byId(id) { return T.filter(function (t) { return t.id === id; })[0]; }

  A.practice.push(function () {
    var done = Object.keys(S.best).length;
    return '<a class="row" href="#/grammar" style="--c:' + COLOR + '"><span class="sq" aria-hidden="true">📐</span><span><span class="t">Grammar</span><br><span class="s">' + T.length + ' topics · ' + Object.keys(G.OLYMPIAD).length + ' 🔥 olympiad · ' + done + ' tested</span></span></a>';
  });

  A.routes.grammar = function (parts) {
    if (parts[1] === "t" && byId(parts[2])) return topic(byId(parts[2]));
    if (parts[1] === "mix" && parts[2] === "run" && S.mix) return mixRun();
    if (parts[1] === "mix") return mixSetup();
    return overview();
  };

  function overview() {
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/">← Home</a>' +
      '<div class="album"><span class="sq" aria-hidden="true">📐</span><div><span class="eyebrow" style="color:#DADADA">Practice</span><h1>Grammar</h1><p>' + T.length + ' topics · rule + 10 questions each</p></div></div>' +
      '<div class="listen"><a class="bigplay" href="#/grammar/mix" style="text-decoration:none">▶ Mixed test</a></div>' +
      '<div class="cards2">' + ["all", "olymp"].concat(LEVELS).map(function (l) { return '<button class="opt' + (filter === l ? ' sel' : '') + '" data-gfilter="' + l + '">' + (l === "all" ? "All levels" : l === "olymp" ? "🔥 Olympiad" : l) + '</button>'; }).join("") + '</div>' +
      '<p class="note">🔥 — темы, которые встречаются в заданиях олимпиады (финал и региональный этап, 2021–2026).</p>';
    LEVELS.forEach(function (l) {
      if (filter !== "all" && filter !== "olymp" && filter !== l) return;
      if (filter === "olymp" && !T.some(function (t) { return t.level === l && G.OLYMPIAD[t.id]; })) return;
      h += '<h2 class="list-h" style="font-size:18px"><span class="lv ' + l + '">' + l + '</span></h2><div class="tracks">';
      G.olympiadFirst(T.filter(function (t) { return t.level === l && (filter !== "olymp" || G.OLYMPIAD[t.id]); })).forEach(function (t, i) {
        var b = S.best[t.id], fire = G.OLYMPIAD[t.id];
        h += '<a class="tr" href="#/grammar/t/' + t.id + '"><span class="i">' + (i + 1) + '</span><span><span class="t">' + (fire ? '🔥 ' : '') + esc(t.title) + '</span>' + (fire ? '<br><span class="s">' + esc(fire) + '</span>' : '') + '</span><span class="r' + (b != null ? ' done' : '') + '">' + (b != null ? b + ' / 10' : '—') + '</span></a>';
      });
      h += '</div>';
    });
    return h + '</div>';
  }

  function itemHTML(scope, it, i, ans, checked, sub) {
    var a = ans[i], ok = checked ? G.check(it, a) : null;
    var h = '<div class="it' + (checked ? (ok ? ' ok' : ' no') : '') + '">' + (sub ? '<div class="topic-src">' + sub + '</div>' : '') +
      '<div class="q"><span class="n">' + (i + 1) + '.</span>' + esc(it.q) + '</div>';
    if (it.type === "choice") {
      h += '<div class="opts">' + it.opts.map(function (o, j) {
        var c = "opt";
        if (checked) { if (j === it.a) c += " right"; else if (j === a) c += " wrong"; }
        else if (j === a) c += " sel";
        return '<button class="' + c + '" data-gs="' + scope + '" data-gi="' + i + '" data-gj="' + j + '"' + (checked ? ' disabled' : '') + '>' + esc(o) + '</button>';
      }).join("") + '</div>';
    } else {
      h += '<input class="inp" data-gs="' + scope + '" data-gi="' + i + '" value="' + esc(a || "") + '" placeholder="your answer" autocomplete="off" autocapitalize="off" spellcheck="false"' + (checked ? ' disabled' : '') + '>';
    }
    if (checked) {
      if (!ok) h += '<div class="key">Answer: <b>' + esc(it.type === "choice" ? it.opts[it.a] : it.accept.join(" / ")) + '</b></div>';
      h += '<div class="why">' + esc(it.why) + '</div>';
    }
    return h + '</div>';
  }

  function topic(t) {
    var ans = S.ans[t.id] || {}, checked = !!S.checked[t.id], r = G.score(t.items, ans);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/grammar">← Grammar</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">📐</span><div><span class="eyebrow"><span class="lv ' + t.level + '">' + t.level + '</span></span><h1>' + esc(t.title) + '</h1></div></div>' +
      (G.OLYMPIAD[t.id] ? '<p class="note">🔥 Встречается на олимпиаде: ' + esc(G.OLYMPIAD[t.id]) + '</p>' : '') +
      '<div class="rule"><p class="ri">' + esc(t.rule.intro) + '</p>' +
      t.rule.blocks.map(function (b) { return '<h3>' + esc(b.h) + '</h3><div class="rtab">' + b.rows.map(function (row) { return '<div>' + esc(row[0]) + '</div><div>' + esc(row[1]) + '</div>'; }).join("") + '</div>'; }).join("") +
      (t.rule.tips && t.rule.tips.length ? '<ul class="tips">' + t.rule.tips.map(function (x) { return '<li>💡 ' + esc(x) + '</li>'; }).join("") + '</ul>' : '') + '</div>' +
      '<h2 class="list-h" style="font-size:20px">Test · 10 questions</h2><div class="items">' +
      t.items.map(function (it, i) { return itemHTML(t.id, it, i, ans, checked); }).join("") + '</div>';
    h += '<div class="actions">' + (checked ? '<button class="ghost" data-gretry="' + t.id + '">↺ Try again</button><span class="res">' + r.got + ' <small>/ 10 · best ' + S.best[t.id] + '</small></span>'
                                            : '<button class="bigplay" data-gcheck="' + t.id + '">✓ Check answers</button><span class="res"><small id="gCount">' + answered(t.items, ans) + ' / 10 answered</small></span>') + '</div>';
    return h + '</div>';
  }
  function answered(items, ans) { return items.filter(function (_, i) { return ans[i] != null && String(ans[i]).trim() !== ""; }).length; }

  function mixSetup() {
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/grammar">← Grammar</a><h1 style="margin-top:14px;font-size:30px;font-weight:800">Mixed test</h1>' +
      '<p class="muted">Questions from several topics, shuffled. Pick levels or exact topics.</p>' +
      '<h2 class="list-h" style="font-size:16px">Levels</h2><div class="cards2"' + (S.mixTopics.length ? ' style="opacity:.4"' : '') + '>' + LEVELS.map(function (l) { return '<button class="opt' + (S.mixLevels.indexOf(l) >= 0 ? ' sel' : '') + '" data-glevel="' + l + '">' + l + '</button>'; }).join("") + '</div>' +
      (S.mixTopics.length ? '<p class="note" id="gTopicNote">Topics are chosen below, so levels are ignored. <button class="link-btn" data-gclear="1" style="background:none;border:0;color:' + COLOR + ';padding:0;text-decoration:underline">Clear topics</button></p>' : '') +
      '<details class="text"><summary>Or choose topics (' + S.mixTopics.length + ' selected)</summary><div class="prose" style="padding-top:4px">' +
      T.map(function (t) { return '<label style="display:flex;gap:8px;align-items:flex-start;margin:6px 0;cursor:pointer"><input type="checkbox" data-gtopic="' + t.id + '"' + (S.mixTopics.indexOf(t.id) >= 0 ? ' checked' : '') + ' style="margin-top:6px;accent-color:' + COLOR + '"><span><span class="lv ' + t.level + '">' + t.level + '</span> ' + esc(t.title) + '</span></label>'; }).join("") + '</div></details>' +
      '<h2 class="list-h" style="font-size:16px">Questions</h2><div class="cards2">' + [10, 20, 30].map(function (n) { return '<button class="opt' + (S.mixN === n ? ' sel' : '') + '" data-gn="' + n + '">' + n + '</button>'; }).join("") + '</div>' +
      '<div class="listen" style="margin-top:20px"><button class="bigplay" data-gstart="1">▶ Start</button></div>';
    if (S.mix) h += '<p class="note"><a href="#/grammar/mix/run">Continue the last mixed test →</a></p>';
    return h + '</div>';
  }
  function mixIds() {
    return S.mixTopics.length ? S.mixTopics.slice() : G.topicsByLevel(T, S.mixLevels).map(function (t) { return t.id; });
  }
  function mixItems() { return S.mix.qs.map(function (q) { var t = byId(q.topic); return t && t.items[q.i]; }); }

  function mixRun() {
    var M = S.mix, items = mixItems(), checked = !!M.checked, r = G.score(items, M.ans);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/grammar/mix">← Mixed test</a><h1 style="margin-top:14px;font-size:28px;font-weight:800">Mixed test · ' + items.length + '</h1><div class="items">' +
      items.map(function (it, i) { var t = byId(M.qs[i].topic); return it ? itemHTML("mix", it, i, M.ans, checked, '<span class="lv ' + t.level + '">' + t.level + '</span> ' + esc(t.title)) : ""; }).join("") + '</div>';
    if (checked) {
      var weak = {};
      items.forEach(function (it, i) { if (!G.check(it, M.ans[i])) weak[M.qs[i].topic] = (weak[M.qs[i].topic] || 0) + 1; });
      var ws = Object.keys(weak);
      if (ws.length) h += '<h2 class="list-h" style="font-size:18px">Repeat these rules</h2><div class="tracks">' + ws.map(function (id) { var t = byId(id); return '<a class="tr" href="#/grammar/t/' + id + '"><span class="i"><span class="lv ' + t.level + '">' + t.level + '</span></span><span class="t">' + esc(t.title) + '</span><span class="r">' + weak[id] + ' ✗</span></a>'; }).join("") + '</div>';
    }
    h += '<div class="actions">' + (checked ? '<button class="ghost" data-gstart="1">↺ New mix</button><span class="res">' + r.got + ' <small>/ ' + r.max + '</small></span>'
                                            : '<button class="bigplay" data-gcheck="mix">✓ Check answers</button><span class="res"><small id="gCount">' + answered(items, M.ans) + ' / ' + items.length + ' answered</small></span>') + '</div>';
    return h + '</div>';
  }

  function ansOf(scope) { if (scope === "mix") return S.mix.ans; return (S.ans[scope] = S.ans[scope] || {}); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.gs != null && b.dataset.gj != null) {
      var a = ansOf(b.dataset.gs), i = b.dataset.gi, j = +b.dataset.gj;
      a[i] = a[i] === j ? null : j; save(); A.keepScroll(A.render); return;
    }
    if (b.dataset.gcheck) {
      var its = b.dataset.gcheck === "mix" ? mixItems() : byId(b.dataset.gcheck).items, cur = ansOf(b.dataset.gcheck);
      if (!answered(its, cur)) { b.textContent = "Answer at least one question"; return; }
      if (b.dataset.gcheck === "mix") S.mix.checked = true;
      else {
        var t = byId(b.dataset.gcheck), got = G.score(t.items, S.ans[t.id] || {}).got;
        S.checked[t.id] = true; S.best[t.id] = Math.max(S.best[t.id] || 0, got);
      }
      save(); A.keepScroll(A.render); return;
    }
    if (b.dataset.gretry) { delete S.checked[b.dataset.gretry]; delete S.ans[b.dataset.gretry]; save(); A.keepScroll(A.render); return; }
    if (b.dataset.gfilter) { filter = b.dataset.gfilter; A.keepScroll(A.render); return; }
    if (b.dataset.glevel) {
      var l = b.dataset.glevel, k = S.mixLevels.indexOf(l);
      if (k >= 0) S.mixLevels.splice(k, 1); else S.mixLevels.push(l);
      save(); A.keepScroll(A.render); return;
    }
    if (b.dataset.gclear) { S.mixTopics = []; save(); A.keepScroll(A.render); return; }
    if (b.dataset.gn) { S.mixN = +b.dataset.gn; save(); A.keepScroll(A.render); return; }
    if (b.dataset.gstart) {
      var ids = mixIds();
      if (!ids.length) { b.textContent = "Choose a level or a topic first"; return; }
      S.mix = { qs: G.mixed(T, ids, S.mixN, Math.random), ans: {}, checked: false }; save();
      if (location.hash === "#/grammar/mix/run") { A.render(); window.scrollTo(0, 0); } else location.hash = "#/grammar/mix/run";
      return;
    }
  });
  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.gs != null && el.tagName === "INPUT") {
      var a = ansOf(el.dataset.gs); a[el.dataset.gi] = el.value; save();
      var c = document.getElementById("gCount");
      if (c) { var items = el.dataset.gs === "mix" ? mixItems() : byId(el.dataset.gs).items; c.textContent = answered(items, a) + " / " + items.length + " answered"; }
    }
  });
  document.addEventListener("change", function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.gtopic) {
      var k = S.mixTopics.indexOf(el.dataset.gtopic);
      if (el.checked && k < 0) S.mixTopics.push(el.dataset.gtopic);
      if (!el.checked && k >= 0) S.mixTopics.splice(k, 1);
      save(); A.keepScroll(A.render);
      var d = document.querySelector("details.text"); if (d) d.open = true;
    }
  });

  A.render();
})();
