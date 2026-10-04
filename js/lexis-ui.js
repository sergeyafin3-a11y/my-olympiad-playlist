// Olympiad lexis: то, что реально спрашивают на финале и региональном этапе ВсОШ —
// словообразование, фразовые глаголы, предлоги, идиомы, игра слов, «найди лишнее слово».
// Устроено как грамматика: подсказка + 10 вопросов, плюс смешанный тест «как на олимпиаде».
// Проверка ответов — общая, из js/grammar.js; оформление правил — из стилей грамматики.
(function () {
  var A = window.App, G = window.Grammar, L = window.LEXIS || [], esc = A.esc;
  var KEY = "olymp-lexis", COLOR = "#FF9F43";
  var GROUPS = [];
  L.forEach(function (t) { if (GROUPS.indexOf(t.group) < 0) GROUPS.push(t.group); });
  var S = { best: {}, ans: {}, checked: {}, mix: null, mixN: 20 };
  try { S = Object.assign(S, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) {}
  if (S.mix && Array.isArray(S.mix.qs)) S.mix = G.prune(S.mix, L); else S.mix = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function byId(id) { return L.filter(function (t) { return t.id === id; })[0]; }
  function answered(items, ans) { return items.filter(function (_, i) { return ans[i] != null && String(ans[i]).trim() !== ""; }).length; }

  A.routes.lexis = function (parts) {
    if (parts[1] === "t" && byId(parts[2])) return topic(byId(parts[2]));
    if (parts[1] === "mix" && S.mix && S.mix.qs.length) return mixRun();
    return overview();
  };

  function overview() {
    var h = '<div style="--c:' + COLOR + '"><div class="tabtop"></div>' +
      '<div class="album"><span class="sq" aria-hidden="true">🔥</span><div><span class="eyebrow" style="color:#DADADA">Practice</span><h1>Olympiad lexis</h1><p>' + L.length + ' topics · tip + 10 questions each</p></div></div>' +
      '<p class="note">Темы выбраны по 10 вариантам финала и регионального этапа ВсОШ 2021–2026: именно это там спрашивают чаще всего.</p>' +
      '<div class="listen"><button class="bigplay" data-lstart="1">▶ Olympiad mix</button>' + [10, 20, 30].map(function (n) { return '<button class="opt' + (S.mixN === n ? ' sel' : '') + '" data-ln="' + n + '">' + n + '</button>'; }).join("") + '</div>' +
      (S.mix && S.mix.qs.length ? '<p class="note"><a href="#/lexis/mix">Continue the last mix →</a></p>' : '');
    GROUPS.forEach(function (g) {
      h += '<h2 class="list-h" style="font-size:18px">' + esc(g) + '</h2><div class="tracks">';
      L.filter(function (t) { return t.group === g; }).forEach(function (t, i) {
        var b = S.best[t.id];
        h += '<a class="tr" href="#/lexis/t/' + t.id + '"><span class="i">' + (i + 1) + '</span><span><span class="t">' + esc(t.title) + '</span></span><span class="r' + (b != null ? ' done' : '') + '">' + (b != null ? b + ' / 10' : '—') + '</span></a>';
      });
      h += '</div>';
    });
    return h + '</div>';
  }

  // «Одно слово на три предложения» пишется через « / » — показываем по строкам.
  // В фразовых глаголах « / » стоит внутри подсказки «(put / off)», её не трогаем:
  // строки разбиваем, только если в вопросе несколько пропусков.
  function qText(q) {
    var e = esc(q);
    return q.split("___").length > 2 ? e.replace(/ \/ /g, "<br>") : e;
  }

  function itemHTML(scope, it, i, ans, checked, sub) {
    var a = ans[i], ok = checked ? G.check(it, a) : null;
    var h = '<div class="it' + (checked ? (ok ? ' ok' : ' no') : '') + '">' + (sub ? '<div class="topic-src">' + esc(sub) + '</div>' : '') +
      '<div class="q"><span class="n">' + (i + 1) + '.</span>' + qText(it.q) + '</div>';
    if (it.type === "choice") {
      h += '<div class="opts">' + it.opts.map(function (o, j) {
        var c = "opt";
        if (checked) { if (j === it.a) c += " right"; else if (j === a) c += " wrong"; }
        else if (j === a) c += " sel";
        return '<button class="' + c + '" data-ls="' + scope + '" data-li="' + i + '" data-lj="' + j + '"' + (checked ? ' disabled' : '') + '>' + esc(o) + '</button>';
      }).join("") + '</div>';
    } else {
      h += '<input class="inp" data-ls="' + scope + '" data-li="' + i + '" value="' + esc(a || "") + '" placeholder="your answer" autocomplete="off" autocapitalize="off" spellcheck="false"' + (checked ? ' disabled' : '') + '>';
    }
    if (checked) {
      if (!ok) h += '<div class="key">Answer: <b>' + esc(it.type === "choice" ? it.opts[it.a] : it.accept.join(" / ")) + '</b></div>';
      h += '<div class="why">' + esc(it.why) + '</div>';
    }
    return h + '</div>';
  }

  function topic(t) {
    var ans = S.ans[t.id] || {}, checked = !!S.checked[t.id], r = G.score(t.items, ans);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/lexis">← Olympiad lexis</a>' +
      '<div class="taskhead"><span class="sq" aria-hidden="true">🔥</span><div><span class="eyebrow">' + esc(t.group) + '</span><h1>' + esc(t.title) + '</h1></div></div>' +
      '<div class="rule"><p class="ri">' + esc(t.rule.intro) + '</p>' +
      t.rule.blocks.map(function (b) { return '<h3>' + esc(b.h) + '</h3><div class="rtab">' + b.rows.map(function (row) { return '<div>' + esc(row[0]) + '</div><div>' + esc(row[1]) + '</div>'; }).join("") + '</div>'; }).join("") +
      (t.rule.tips && t.rule.tips.length ? '<ul class="tips">' + t.rule.tips.map(function (x) { return '<li>💡 ' + esc(x) + '</li>'; }).join("") + '</ul>' : '') + '</div>' +
      '<h2 class="list-h" style="font-size:20px">Test · 10 questions</h2><div class="items">' +
      t.items.map(function (it, i) { return itemHTML(t.id, it, i, ans, checked); }).join("") + '</div>';
    h += '<div class="actions">' + (checked ? '<button class="ghost" data-lretry="' + t.id + '">↺ Try again</button><span class="res">' + r.got + ' <small>/ 10 · best ' + S.best[t.id] + '</small></span>'
                                            : '<button class="bigplay" data-lcheck="' + t.id + '">✓ Check answers</button><span class="res"><small id="lCount">' + answered(t.items, ans) + ' / 10 answered</small></span>') + '</div>';
    return h + '</div>';
  }

  function mixItems() { return S.mix.qs.map(function (q) { var t = byId(q.topic); return t && t.items[q.i]; }); }
  function mixRun() {
    var M = S.mix, items = mixItems(), checked = !!M.checked, r = G.score(items, M.ans);
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/lexis">← Olympiad lexis</a><h1 style="margin-top:14px;font-size:28px;font-weight:800">Olympiad mix · ' + items.length + '</h1><div class="items">' +
      items.map(function (it, i) { var t = byId(M.qs[i].topic); return itemHTML("mix", it, i, M.ans, checked, t.group + " · " + t.title); }).join("") + '</div>';
    if (checked) {
      var weak = {};
      items.forEach(function (it, i) { if (!G.check(it, M.ans[i])) weak[M.qs[i].topic] = (weak[M.qs[i].topic] || 0) + 1; });
      var ws = Object.keys(weak);
      if (ws.length) h += '<h2 class="list-h" style="font-size:18px">Repeat these topics</h2><div class="tracks">' + ws.map(function (id) { var t = byId(id); return '<a class="tr" href="#/lexis/t/' + id + '"><span class="i">🔥</span><span class="t">' + esc(t.title) + '</span><span class="r">' + weak[id] + ' ✗</span></a>'; }).join("") + '</div>';
    }
    h += '<div class="actions">' + (checked ? '<button class="ghost" data-lstart="1">↺ New mix</button><span class="res">' + r.got + ' <small>/ ' + r.max + '</small></span>'
                                            : '<button class="bigplay" data-lcheck="mix">✓ Check answers</button><span class="res"><small id="lCount">' + answered(items, M.ans) + ' / ' + items.length + ' answered</small></span>') + '</div>';
    return h + '</div>';
  }

  function ansOf(scope) { if (scope === "mix") return S.mix.ans; return (S.ans[scope] = S.ans[scope] || {}); }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.ls != null && b.dataset.lj != null) {
      var a = ansOf(b.dataset.ls), i = b.dataset.li, j = +b.dataset.lj;
      a[i] = a[i] === j ? null : j; save(); A.keepScroll(A.render); return;
    }
    if (b.dataset.lcheck) {
      var its = b.dataset.lcheck === "mix" ? mixItems() : byId(b.dataset.lcheck).items;
      if (!answered(its, ansOf(b.dataset.lcheck))) { b.textContent = "Answer at least one question"; return; }
      if (b.dataset.lcheck === "mix") S.mix.checked = true;
      else { var t = byId(b.dataset.lcheck); S.checked[t.id] = true; S.best[t.id] = Math.max(S.best[t.id] || 0, G.score(t.items, S.ans[t.id]).got); }
      save(); A.keepScroll(A.render); return;
    }
    if (b.dataset.lretry) { delete S.checked[b.dataset.lretry]; delete S.ans[b.dataset.lretry]; save(); A.keepScroll(A.render); return; }
    if (b.dataset.ln) { S.mixN = +b.dataset.ln; save(); A.keepScroll(A.render); return; }
    if (b.dataset.lstart) {
      var qs = G.mixed(L, L.map(function (t) { return t.id; }), S.mixN, Math.random);
      if (!qs.length) { b.textContent = "No questions yet"; return; }
      S.mix = { qs: qs, ans: {}, checked: false }; save();
      if (location.hash === "#/lexis/mix") { A.render(); window.scrollTo(0, 0); } else location.hash = "#/lexis/mix";
    }
  });
  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.ls != null && el.tagName === "INPUT") {
      var a = ansOf(el.dataset.ls); a[el.dataset.li] = el.value; save();
      var c = document.getElementById("lCount");
      if (c) { var items = el.dataset.ls === "mix" ? mixItems() : byId(el.dataset.ls).items; c.textContent = answered(items, a) + " / " + items.length + " answered"; }
    }
  });

  A.render();
})();
