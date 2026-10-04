// Словарик: экран «My words», карточки, тест и добавление слова нажатием в любом задании.
// Слова хранятся отдельно от ответов варианта: словарик общий для всех вариантов и тем.
(function () {
  var A = window.App, Vo = window.Vocab, esc = A.esc;
  var KEY = "olymp-words";
  var W = [];
  try { W = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(W)); } catch (e) {} }
  var COLOR = "#FF7AB6";

  var css = document.createElement("style");
  css.textContent = [
    ".addpill{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:12;background:" + COLOR + ";color:#2A0A18;border:0;border-radius:999px;padding:10px 18px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,.45);max-width:calc(100vw - 32px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".sheet{position:fixed;left:8px;right:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:13;max-width:720px;margin:0 auto;background:#232323;border:1px solid #333;border-radius:14px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.6)}",
    ".sheet h2{font-size:18px}.sheet label{display:block;font-size:13px;color:var(--mute);margin-top:10px}",
    ".sheet .inp{max-width:none;margin-top:4px}.sheet .ctx{font-size:13px;color:var(--mute);font-style:italic;margin-top:8px}",
    ".sheet .btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;align-items:center}",
    ".sheet a{color:" + COLOR + ";font-size:14px}",
    ".wsearch{max-width:none;margin-top:14px}",
    ".wrow{display:grid;grid-template-columns:1fr auto;gap:4px 10px;padding:10px 0;border-bottom:1px solid var(--line)}",
    ".wrow .term{font-weight:700}.wrow .tr{color:var(--mute)}.wrow .cx{grid-column:1/-1;font-size:13px;color:var(--dim);font-style:italic}",
    ".wrow .cx mark{background:none;color:" + COLOR + "}",
    ".wrow .acts{display:flex;gap:4px;align-items:start}.wrow .acts button{background:none;border:1px solid var(--line);border-radius:999px;padding:3px 10px;font-size:13px;color:var(--mute)}",
    ".lvl{display:inline-flex;gap:2px;margin-left:8px;vertical-align:2px}.lvl i{width:6px;height:6px;border-radius:50%;background:#3A3A3A}.lvl i.on{background:" + COLOR + "}",
    ".flash{margin-top:18px;background:linear-gradient(160deg,#3A1F2E,#1C1C1C);border-radius:16px;padding:28px 20px;min-height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px}",
    ".flash .big{font-family:var(--head);font-weight:800;font-size:clamp(26px,7vw,38px);line-height:1.1;text-wrap:balance}",
    ".flash .tr{font-size:20px;color:" + COLOR + ";font-weight:600}.flash .cx{font-size:14px;color:var(--mute);font-style:italic;max-width:52ch}",
    ".prog{font-size:13px;color:var(--mute);margin-top:12px;font-variant-numeric:tabular-nums}",
    ".empty{margin-top:18px;background:var(--card);border-radius:12px;padding:16px;color:var(--mute)}"
  ].join("\n");
  document.head.appendChild(css);

  // ---------- главная: строка в блоке Practice ----------
  A.practice.push(function () {
    var known = W.filter(function (w) { return (w.level || 0) >= 4; }).length;
    return '<a class="row" href="#/words" style="--c:' + COLOR + '"><span class="sq" aria-hidden="true">💗</span><span><span class="t">My words</span><br><span class="s">' + W.length + ' saved · ' + known + ' learned</span></span></a>';
  });

  // ---------- экраны ----------
  var session = null; // текущая тренировка: {mode, deck, i, shown, right, done}

  A.routes.words = function (parts) {
    if (parts[1] === "cards" || parts[1] === "quiz") return practice(parts[1]);
    session = null;
    var q = (document.getElementById("wSearch") || {}).value || "";
    var h = '<div style="--c:' + COLOR + '"><a class="back" href="#/">← Home</a>' +
      '<div class="album"><span class="sq" aria-hidden="true">💗</span><div><span class="eyebrow" style="color:#DADADA">Practice</span><h1>My words</h1><p>' + W.length + ' saved · tap any word in a task to add it</p></div></div>' +
      '<div class="listen"><a class="bigplay" href="#/words/cards" style="text-decoration:none">▶ Flashcards</a><a class="ghost" href="#/words/quiz" style="text-decoration:none">✎ Quiz</a><button class="ghost" data-wnew="1">＋ Add word</button><button class="ghost" data-wcopy="1">⧉ Copy list</button></div>';
    if (!W.length) {
      return h + '<div class="empty">No words yet. Open any task, tap an unknown word and press <b>＋ add</b>. To save a phrase, select several words.</div></div>';
    }
    h += '<input class="inp wsearch" id="wSearch" placeholder="Search" value="' + esc(q) + '" autocomplete="off">' + '<div id="wList">' + list(q) + '</div>';
    return h + '</div>';
  };

  function dots(level) {
    var h = '<span class="lvl" aria-label="level ' + (level || 0) + ' of 5">';
    for (var i = 1; i <= 5; i++) h += '<i class="' + (i <= (level || 0) ? 'on' : '') + '"></i>';
    return h + '</span>';
  }
  function markCtx(w) {
    if (!w.ctx) return "";
    var c = esc(w.ctx), t = esc(w.term), i = c.toLowerCase().indexOf(t.toLowerCase());
    return i < 0 ? c : c.slice(0, i) + "<mark>" + c.slice(i, i + t.length) + "</mark>" + c.slice(i + t.length);
  }
  function list(q) {
    var k = Vo.norm(q);
    return W.filter(function (w) { return !k || Vo.norm(w.term).indexOf(k) >= 0 || Vo.norm(w.tr).indexOf(k) >= 0; }).map(function (w) {
      return '<div class="wrow"><div><span class="term">' + esc(w.term) + '</span>' + dots(w.level) + '<br><span class="tr">' + (w.tr ? esc(w.tr) : '<i>no translation yet</i>') + '</span></div>' +
        '<div class="acts"><button data-wedit="' + w.id + '">edit</button><button data-wdel="' + w.id + '">✕</button></div>' +
        (w.ctx ? '<div class="cx">' + markCtx(w) + '</div>' : '') + '</div>';
    }).join("") || '<p class="muted">Nothing found.</p>';
  }

  // ---------- карточки и тест ----------
  function newSession(mode) {
    var deck = Vo.pick(W, 10), qs = [];
    if (mode === "quiz") {
      deck.forEach(function (w, i) {
        var ch = i % 2 === 0 ? Vo.choiceQuestion(W, w, Math.random) : null;
        if (ch) qs.push({ w: w, kind: "choice", opts: ch.opts, a: ch.a });
        else if (w.tr) qs.push({ w: w, kind: "type", prompt: w.tr });
        else if (w.ctx && w.ctx.toLowerCase().indexOf(w.term.toLowerCase()) >= 0) qs.push({ w: w, kind: "type", prompt: w.ctx.replace(new RegExp(w.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), "_____") });
      });
    } else deck.forEach(function (w) { qs.push({ w: w }); });
    return { mode: mode, qs: qs, i: 0, shown: false, right: 0, answer: null };
  }

  function practice(mode) {
    if (!session || session.mode !== mode) session = newSession(mode);
    var S = session, h = '<div style="--c:' + COLOR + '"><a class="back" href="#/words">← My words</a><h1 style="margin-top:14px;font-size:28px;font-weight:800">' + (mode === "cards" ? "Flashcards" : "Quiz") + '</h1>';
    if (!S.qs.length) return h + '<div class="empty">' + (W.length ? 'Add translations to your words first: the quiz asks for them.' : 'Your list is empty. Save a few words from the tasks first.') + '</div></div>';
    if (S.i >= S.qs.length) {
      return h + '<div class="flash"><div class="big">' + S.right + ' / ' + S.qs.length + '</div><div class="cx">' + (S.right === S.qs.length ? 'All of them! 🎉' : 'The words you missed will come up first next time.') + '</div></div>' +
        '<div class="listen"><button class="bigplay" data-wagain="' + mode + '">↺ Again</button><a class="ghost" href="#/words" style="text-decoration:none">My words</a></div></div>';
    }
    var q = S.qs[S.i], w = q.w;
    h += '<div class="prog">' + (S.i + 1) + ' / ' + S.qs.length + ' · ' + S.right + ' right</div>';
    if (mode === "cards") {
      h += '<div class="flash"><div class="big">' + esc(w.term) + '</div>' + (S.shown ? '<div class="tr">' + (w.tr ? esc(w.tr) : '—') + '</div>' + (w.ctx ? '<div class="cx">' + markCtx(w) + '</div>' : '') : '') + '</div>';
      h += S.shown ? '<div class="listen"><button class="ghost" data-wgrade="0">✗ Not yet</button><button class="bigplay" data-wgrade="1">✓ I knew it</button></div>'
                   : '<div class="listen"><button class="bigplay" data-wshow="1">Show translation</button></div>';
      return h + '</div>';
    }
    if (q.kind === "choice") {
      h += '<div class="flash"><div class="big">' + esc(w.term) + '</div><div class="cx">Choose the translation</div></div><div class="opts col" style="margin-top:12px">' +
        q.opts.map(function (o, j) {
          var c = "opt";
          if (S.answer != null) { if (j === q.a) c += " right"; else if (j === S.answer) c += " wrong"; }
          return '<button class="' + c + '" data-wpick="' + j + '"' + (S.answer != null ? ' disabled' : '') + '>' + esc(o) + '</button>';
        }).join("") + '</div>';
    } else {
      h += '<div class="flash"><div class="big" style="font-size:24px">' + esc(q.prompt) + '</div><div class="cx">Type the English word or phrase</div></div>' +
        '<input class="inp" id="wType" style="max-width:none" autocomplete="off" autocapitalize="off" spellcheck="false"' + (S.answer != null ? ' disabled value="' + esc(S.typed || "") + '"' : '') + '>';
      if (S.answer == null) h += '<div class="listen"><button class="bigplay" data-wcheck="1">✓ Check</button></div>';
      else h += '<div class="key">' + (S.answer ? '✓ Right' : '✗ Answer: <b>' + esc(w.term) + '</b>') + '</div>';
    }
    if (S.answer != null) h += '<div class="listen"><button class="bigplay" data-wnext="1">Next ▶</button></div>';
    return h + '</div>';
  }

  function gradeCurrent(ok) {
    var w = session.qs[session.i].w, g = Vo.grade(w, ok, Date.now());
    W = Vo.update(W, w.id, { level: g.level, seen: g.seen }); save();
    if (ok) session.right++;
  }

  // ---------- окно добавления/правки ----------
  var pill = document.createElement("button"); pill.className = "addpill"; pill.hidden = true; document.body.appendChild(pill);
  var sheet = document.createElement("div"); sheet.className = "sheet"; sheet.hidden = true; document.body.appendChild(sheet);
  var pending = null, editId = null;

  function openSheet(entry, id) {
    editId = id || null; pill.hidden = true;
    sheet.innerHTML = '<h2>' + (id ? 'Edit word' : 'Add to My words') + '</h2>' +
      '<label for="wsTerm">Word or phrase</label><input class="inp" id="wsTerm" value="' + esc(entry.term) + '" autocomplete="off" autocapitalize="off" spellcheck="false">' +
      '<label for="wsTr">Translation</label><input class="inp" id="wsTr" value="' + esc(entry.tr || "") + '" placeholder="перевод" autocomplete="off">' +
      (entry.ctx ? '<div class="ctx">“' + esc(entry.ctx) + '”</div>' : '') +
      '<div class="btns"><button class="bigplay" data-wsave="1">Save</button><button class="ghost" data-wcancel="1">Cancel</button>' +
      '<a id="wsLook" href="https://dictionary.cambridge.org/dictionary/english-russian/' + encodeURIComponent(entry.term.toLowerCase()) + '" target="_blank" rel="noopener">Look it up ↗</a></div>';
    pending = entry; sheet.hidden = false;
    var f = document.getElementById(entry.term ? "wsTr" : "wsTerm"); if (f) f.focus();
  }
  function closeSheet() { sheet.hidden = true; pending = null; editId = null; }

  // Слово под пальцем: берём текстовый узел в точке нажатия и расширяем до границ слова.
  function wordAt(x, y) {
    var node, off;
    if (document.caretRangeFromPoint) { var r = document.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
    else if (document.caretPositionFromPoint) { var p = document.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
    if (!node || node.nodeType !== 3) return null;
    var t = node.textContent, re = /[A-Za-z'’-]/, a = off, b = off;
    while (a > 0 && re.test(t[a - 1])) a--;
    while (b < t.length && re.test(t[b])) b++;
    var w = t.slice(a, b).replace(/^['’-]+|['’-]+$/g, "");
    if (w.length < 2 || !/[A-Za-z]/.test(w)) return null;
    return { term: w, ctx: sentence(node.parentElement ? node.parentElement.textContent : t, w) };
  }
  function sentence(text, w) {
    var i = text.indexOf(w); if (i < 0) return "";
    var a = i, b = i + w.length;
    while (a > 0 && !/[.!?]/.test(text[a - 1])) a--;
    while (b < text.length && !/[.!?]/.test(text[b])) b++;
    return text.slice(a, Math.min(text.length, b + 1)).replace(/\s+/g, " ").trim().slice(0, 240);
  }
  function inContent(el) {
    return el && el.closest && el.closest("#app") && !el.closest("button, input, textarea, a, select, .wrow, .flash, label");
  }
  function showPill(entry) {
    pending = entry; pill.textContent = "＋ add “" + entry.term + "”"; pill.hidden = false;
    clearTimeout(showPill.t); showPill.t = setTimeout(function () { pill.hidden = true; }, 5000);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b === pill) { openSheet(pending); return; }
    if (b && b.closest(".sheet")) {
      if (b.dataset.wsave) {
        var term = document.getElementById("wsTerm").value, tr = document.getElementById("wsTr").value;
        if (editId) W = Vo.update(W, editId, { term: term.replace(/\s+/g, " ").trim() || pending.term, tr: tr.trim() });
        else W = Vo.add(W, { term: term, tr: tr, ctx: pending.ctx, src: (location.hash.split("/")[2] || "") }, Date.now());
        save(); closeSheet(); A.keepScroll(A.render);
      }
      if (b.dataset.wcancel) closeSheet();
      return;
    }
    if (b) {
      if (b.dataset.wnew) { openSheet({ term: "", tr: "" }); return; }
      if (b.dataset.wedit) { var w = W.filter(function (x) { return x.id === b.dataset.wedit; })[0]; if (w) openSheet(w, w.id); return; }
      if (b.dataset.wdel) {
        if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = "delete?"; return; }
        W = Vo.remove(W, b.dataset.wdel); save(); A.keepScroll(A.render); return;
      }
      if (b.dataset.wcopy) {
        var txt = Vo.exportText(W);
        var done = function () { b.textContent = "✓ Copied"; };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () { fallbackCopy(txt); done(); });
        else { fallbackCopy(txt); done(); }
        return;
      }
      if (b.dataset.wshow) { session.shown = true; A.render(); return; }
      if (b.dataset.wgrade) { gradeCurrent(b.dataset.wgrade === "1"); session.i++; session.shown = false; A.render(); return; }
      if (b.dataset.wpick) { session.answer = +b.dataset.wpick; gradeCurrent(session.answer === session.qs[session.i].a); A.render(); return; }
      if (b.dataset.wcheck) {
        var inp = document.getElementById("wType"); session.typed = inp ? inp.value : "";
        var ok = Vo.checkTyped(session.qs[session.i].w, session.typed); session.answer = ok; gradeCurrent(ok); A.render(); return;
      }
      if (b.dataset.wnext) { session.i++; session.answer = null; session.typed = ""; A.render(); return; }
      if (b.dataset.wagain) { session = newSession(b.dataset.wagain); A.render(); return; }
      return;
    }
    if (!sheet.hidden && !e.target.closest(".sheet")) closeSheet();
    var sel = window.getSelection && String(window.getSelection()).trim();
    if (sel) return; // выделение обрабатывает selectionchange
    if (!inContent(e.target)) { pill.hidden = true; return; }
    var hit = wordAt(e.clientX, e.clientY);
    if (hit) showPill(hit); else pill.hidden = true;
  });

  // Несколько слов подряд — выделением: тогда в словарик уходит фраза целиком.
  document.addEventListener("selectionchange", function () {
    clearTimeout(selT);
    selT = setTimeout(function () {
      var s = window.getSelection(); if (!s || s.isCollapsed) return;
      var txt = String(s).replace(/\s+/g, " ").trim();
      var el = s.anchorNode && (s.anchorNode.nodeType === 3 ? s.anchorNode.parentElement : s.anchorNode);
      if (!txt || txt.length > 80 || !/[A-Za-z]/.test(txt) || !inContent(el)) return;
      showPill({ term: txt.replace(/^[^A-Za-z]+|[^A-Za-z'’]+$/g, ""), ctx: sentence(el.textContent, txt) });
    }, 350);
  });
  var selT;

  document.addEventListener("input", function (e) {
    if (e.target.id === "wSearch") { var l = document.getElementById("wList"); if (l) l.innerHTML = list(e.target.value); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.id === "wType") { var c = document.querySelector("[data-wcheck]"); if (c) c.click(); }
    if (e.key === "Enter" && (e.target.id === "wsTr" || e.target.id === "wsTerm")) { var s = document.querySelector("[data-wsave]"); if (s) s.click(); }
    if (e.key === "Escape" && !sheet.hidden) closeSheet();
  });
  window.addEventListener("hashchange", function () { pill.hidden = true; closeSheet(); });

  function fallbackCopy(txt) {
    var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "absolute"; ta.style.left = "-9999px";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove();
  }

  A.render();
})();
