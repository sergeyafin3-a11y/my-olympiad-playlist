// Игры со словами из «My words»: пары, сборка из букв, диктант на слух и скоростной раунд.
// Каждый ответ меняет уровень слова (как в карточках), первый ответ дня засчитывает стрик.
(function () {
  var A = window.App, Vo = window.Vocab, esc = A.esc, D = A.words;
  var G = null; // текущая игра: {kind, ...}

  var css = document.createElement("style");
  css.textContent = [
    ".mgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}",
    ".mgrid .col{display:flex;flex-direction:column;gap:8px}",
    ".mt{min-height:52px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:600;padding:8px 10px;text-align:center;overflow-wrap:anywhere}",
    ".mt.sel{border-color:" + D.color + ";box-shadow:0 0 0 2px " + D.color + " inset}",
    ".mt.done{background:rgba(61,220,151,.15);border-color:var(--ok, #3DDC97);color:var(--mute)}",
    ".mt.bad{border-color:var(--bad);animation:mShake .3s}",
    "@keyframes mShake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
    ".tiles{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px}",
    ".tile{min-width:44px;height:48px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);font-weight:800;font-size:20px;text-transform:lowercase}",
    ".tile:disabled{opacity:.25}",
    // Слоты в одну строку даже у слова из 12 букв на узком телефоне: ширина делится поровну.
    ".slots{display:flex;gap:4px;justify-content:center;width:100%;min-height:52px;margin-top:6px}",
    ".slot{flex:1 1 0;max-width:36px;min-width:0;height:48px;border-bottom:3px solid " + D.color + ";display:grid;place-items:center;font-weight:800;font-size:22px}",
    ".slots.ok .slot{border-color:#3DDC97;color:#3DDC97}.slots.no .slot{border-color:var(--bad);color:var(--bad)}",
    ".timer{font-family:var(--head);font-weight:800;font-size:22px;font-variant-numeric:tabular-nums}",
    ".speedq .big{font-size:clamp(24px,6vw,34px)}.speedq .tr{font-size:22px}",
    "@media (prefers-reduced-motion: reduce){.mt.bad{animation:none}}"
  ].join("\n");
  document.head.appendChild(css);

  var TITLES = { match: "🧩 Match", build: "🔤 Build the word", listen: "🎧 Listen & write", speed: "⚡ Speed round" };
  var HOW = {
    match: "Tap a word on the left, then its translation on the right. Find all the pairs.",
    build: "Read the translation. Tap the letters in the right order to make the English word.",
    listen: "Press 🔊 and listen. Type the word you hear. You can listen again.",
    speed: "You have 60 seconds. Is the translation right? Tap ✓ True or ✗ False. Be fast!"
  };
  var NEED = {
    match: "You need at least 3 words with a translation.",
    build: "You need words with a translation: one word, 3–12 letters (not phrases).",
    listen: "Save a few words first.",
    speed: "You need at least 4 words with different translations."
  };

  function head(kind) {
    return '<div style="--c:' + D.color + '"><a class="back" href="#/words">← My words</a><h1 style="margin-top:14px;font-size:28px;font-weight:800">' + esc(TITLES[kind]) + '</h1>' +
      '<p class="howto">' + esc(HOW[kind]) + '</p>';
  }
  function finish(kind, right, total, note) {
    return '<div class="flash"><div class="big">' + right + ' / ' + total + '</div><div class="cx">' + (note || (right === total ? 'All of them! 🎉' : 'The words you missed will come up first next time.')) + '</div></div>' +
      '<div class="listen"><button class="bigplay" data-xagain="' + kind + '">↺ Play again</button><a class="ghost" href="#/words" style="text-decoration:none">My words</a></div></div>';
  }
  // Оценка один раз на слово за игру; первая оценка дня зажигает огонёк.
  function grade(id, ok) {
    if (G.graded[id] != null) return;
    G.graded[id] = ok; D.grade(id, ok);
    if (ok) G.right++;
    if (A.markActivity && G.kind !== "speed") A.markActivity();
  }

  function start(kind) {
    var W = D.all(), g = { kind: kind, graded: {}, right: 0, i: 0 };
    if (kind === "match") {
      var r = Vo.matchRound(W, 5, Math.random);
      g.left = r.left; g.rightCol = r.right; g.sel = null; g.done = {}; g.bad = null;
      g.ok = g.left.length >= 3;
    } else if (kind === "build") {
      g.qs = Vo.pick(Vo.buildable(W), 8).map(function (w) { return { w: w, letters: Vo.scramble(w.term.toLowerCase(), Math.random) }; });
      g.used = []; g.result = null; g.ok = g.qs.length > 0;
    } else if (kind === "listen") {
      g.qs = Vo.pick(W, 8); g.answer = null; g.typed = ""; g.ok = g.qs.length > 0;
    } else {
      g.qs = Vo.speedRound(W, 60, Math.random); g.left = 60; g.started = false; g.over = false; g.flash = null;
      var trs = {}; W.forEach(function (w) { if (w.tr) trs[Vo.norm(w.tr)] = 1; });
      g.ok = Object.keys(trs).length >= 4; g.answered = 0;
    }
    G = g;
  }
  function game(kind) {
    if (!G || G.kind !== kind) start(kind);
    var h = head(kind);
    if (!G.ok) return h + '<div class="empty">' + NEED[kind] + '</div></div>';
    return h + VIEWS[kind]();
  }

  var VIEWS = {
    match: function () {
      var n = G.left.length, done = Object.keys(G.done).length;
      if (done === n) return finish("match", G.right, n, G.right === n ? 'All pairs, no mistakes! 🎉' : 'Words with a mistake will come up first next time.');
      var cell = function (side, x) {
        var c = "mt", key = side + x.id;
        if (G.done[x.id]) c += " done"; else if (G.sel === key) c += " sel"; else if (G.bad === key) c += " bad";
        return '<button class="' + c + '" data-xm="' + key + '"' + (G.done[x.id] ? ' disabled' : '') + '>' + esc(x.text) + '</button>';
      };
      return '<div class="prog">' + done + ' / ' + n + ' pairs</div><div class="mgrid"><div class="col">' + G.left.map(function (x) { return cell("L", x); }).join("") +
        '</div><div class="col">' + G.rightCol.map(function (x) { return cell("R", x); }).join("") + '</div></div></div>';
    },
    build: function () {
      if (G.i >= G.qs.length) return finish("build", G.right, G.qs.length);
      var q = G.qs[G.i], word = G.used.map(function (j) { return q.letters[j]; });
      var h = '<div class="prog">' + (G.i + 1) + ' / ' + G.qs.length + ' · ' + G.right + ' right</div>' +
        '<div class="flash" style="min-height:0;padding:20px"><div class="tr">' + esc(q.w.tr) + '</div>' +
        '<div class="slots' + (G.result == null ? '' : G.result ? ' ok' : ' no') + '">' +
        q.letters.map(function (_, j) { return '<span class="slot">' + esc(word[j] || "") + '</span>'; }).join("") + '</div></div>';
      if (G.result == null) {
        h += '<div class="tiles">' + q.letters.map(function (l, j) {
          return '<button class="tile" data-xb="' + j + '"' + (G.used.indexOf(j) >= 0 ? ' disabled' : '') + '>' + esc(l) + '</button>';
        }).join("") + '</div><div class="listen"><button class="ghost" data-xundo="1">⌫ Undo</button><button class="ghost" data-xgive="1">Show the word</button></div>';
      } else {
        h += '<div class="key">' + (G.result ? '✓ Right: <b>' + esc(q.w.term) + '</b>' : '✗ The word is <b>' + esc(q.w.term) + '</b>') + '</div>' +
          '<div class="listen"><button class="bigplay" data-xnext="1">Next ▶</button></div>';
      }
      return h + '</div>';
    },
    listen: function () {
      if (G.i >= G.qs.length) return finish("listen", G.right, G.qs.length);
      var w = G.qs[G.i], h = '<div class="prog">' + (G.i + 1) + ' / ' + G.qs.length + ' · ' + G.right + ' right</div>';
      if (!("speechSynthesis" in window)) h += '<div class="empty">This browser can\'t read words aloud. Try Safari or Chrome.</div>';
      h += '<div class="flash" style="min-height:0;padding:22px"><button class="bigplay" data-xsay="1" style="font-size:22px">🔊 Listen</button>' +
        (G.answer != null && w.tr ? '<div class="tr">' + esc(w.tr) + '</div>' : '<div class="cx">Type what you hear</div>') + '</div>' +
        '<input class="inp" id="gType" style="max-width:none;margin-top:12px" autocomplete="off" autocapitalize="off" spellcheck="false"' + (G.answer != null ? ' disabled value="' + esc(G.typed) + '"' : '') + '>';
      if (G.answer == null) h += '<div class="listen"><button class="bigplay" data-xlcheck="1">✓ Check</button></div>';
      else h += '<div class="key">' + (G.answer ? '✓ Right' : '✗ Answer: <b>' + esc(w.term) + '</b>') + '</div><div class="listen"><button class="bigplay" data-xnext="1">Next ▶</button></div>';
      return h + '</div>';
    },
    speed: function () {
      if (G.over) return finish("speed", G.right, G.answered, G.answered ? (G.right + ' right answers in 60 seconds. Can you beat it?') : 'Time is up! Try again and tap faster.');
      if (!G.started) return '<div class="flash"><div class="timer">60 s</div><div class="cx">Ready?</div></div><div class="listen"><button class="bigplay" data-xstart="1">▶ Start</button></div></div>';
      var q = G.qs[G.i];
      return '<div class="prog"><span class="timer" id="gTimer">' + G.left + ' s</span> · ' + G.right + ' right' + (G.flash ? ' · ' + G.flash : '') + '</div>' +
        '<div class="flash speedq"><div class="big">' + esc(q.w.term) + '</div><div class="tr">' + esc(q.shown) + '</div><div class="cx">Is this the right translation?</div></div>' +
        '<div class="listen"><button class="ghost" data-xs="0" style="font-size:18px">✗ False</button><button class="bigplay" data-xs="1" style="font-size:18px">✓ True</button></div></div>';
    }
  };

  A.wordGames = {};
  Object.keys(TITLES).forEach(function (k) { A.wordGames[k] = function () { return game(k); }; });

  function say(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text); u.lang = "en-GB"; u.rate = 0.85;
    speechSynthesis.speak(u);
  }
  function stopTimer() { if (G && G.timer) { clearInterval(G.timer); G.timer = null; } }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b || !G) return;
    var d = b.dataset;
    if (d.xagain) { stopTimer(); start(d.xagain); A.render(); return; }
    if (d.xm) {
      var side = d.xm[0], id = d.xm.slice(1);
      G.bad = null;
      if (!G.sel || G.sel[0] === side) { G.sel = G.sel === d.xm ? null : d.xm; A.render(); return; }
      var other = G.sel.slice(1);
      if (other === id) { G.done[id] = 1; grade(id, true); }
      else {
        // Ошибка — минус обоим словам: и тому, что выбрано слева, и тому, чей перевод перепутан.
        grade(id, false); grade(other, false);
        G.bad = d.xm;
      }
      G.sel = null; A.render(); return;
    }
    if (d.xb != null) {
      var q = G.qs[G.i]; G.used.push(+d.xb);
      if (G.used.length === q.letters.length) {
        var built = G.used.map(function (j) { return q.letters[j]; }).join("");
        G.result = built === q.w.term.toLowerCase(); grade(q.w.id, G.result);
      }
      A.render(); return;
    }
    if (d.xundo) { G.used.pop(); A.render(); return; }
    if (d.xgive) { var qq = G.qs[G.i]; G.result = false; G.used = qq.letters.map(function (_, j) { return j; }); qq.letters = qq.w.term.toLowerCase().split(""); grade(qq.w.id, false); A.render(); return; }
    if (d.xsay) { say(G.qs[G.i].term); var inp0 = document.getElementById("gType"); if (inp0 && !inp0.disabled) inp0.focus(); return; }
    if (d.xlcheck) {
      var inp = document.getElementById("gType"); G.typed = inp ? inp.value : "";
      if (!G.typed.trim()) { b.textContent = "Type at least one letter"; return; }
      var w = G.qs[G.i]; G.answer = Vo.checkTyped(w, G.typed); grade(w.id, G.answer); A.render(); return;
    }
    if (d.xnext) {
      G.i++; G.used = []; G.result = null; G.answer = null; G.typed = ""; A.render();
      var g = G;
      if (g.kind === "listen" && g.i < g.qs.length) setTimeout(function () { if (G === g) say(g.qs[g.i].term); }, 250);
      return;
    }
    if (d.xstart) {
      if (G.timer) return;
      G.started = true; A.render();
      var sg = G, id = setInterval(function () {
        if (G !== sg || !sg.timer) { clearInterval(id); return; }
        G.left--;
        var t = document.getElementById("gTimer"); if (t) t.textContent = G.left + " s";
        if (G.left <= 0) { stopTimer(); G.over = true; A.render(); if (G.answered && A.markActivity) A.markActivity(); }
      }, 1000);
      G.timer = id;
      return;
    }
    if (d.xs != null) {
      var s = G.qs[G.i], ok = (d.xs === "1") === s.right;
      G.answered++;
      // В раунде слова повторяются: уровень слова меняем только по первому ответу, а очки — за каждый.
      if (G.graded[s.w.id] == null) grade(s.w.id, ok); else if (ok) G.right++;
      G.flash = ok ? "✓" : "✗ " + esc(s.w.term) + " = " + esc(s.w.tr);
      G.i = (G.i + 1) % G.qs.length; A.render(); return;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.id === "gType") { var c = document.querySelector("[data-xlcheck]"); if (c) c.click(); }
  });
  // Ушли со страницы игры — игру сбрасываем, таймер останавливаем.
  window.addEventListener("hashchange", function () {
    var p = location.hash.replace(/^#\/?/, "").split("/");
    if (!G || p[0] !== "words" || p[1] !== G.kind) {
      // Ушла из скоростного раунда раньше времени, но отвечала — день всё равно засчитан.
      if (G && G.kind === "speed" && G.answered && !G.over && A.markActivity) A.markActivity();
      stopTimer(); G = null;
    }
  });
})();
