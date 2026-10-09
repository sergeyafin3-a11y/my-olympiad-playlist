// Словарик: чистые функции без DOM. Их же гоняют тесты через JavaScriptCore.
(function () {
  function norm(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, " ").trim();
  }

  // Одно и то же слово не заводим дважды: повторное добавление только дописывает перевод.
  function add(list, entry, now) {
    var term = String(entry.term || "").replace(/\s+/g, " ").trim();
    if (!term) return list;
    var key = norm(term), out = list.slice();
    for (var i = 0; i < out.length; i++) {
      if (norm(out[i].term) === key) {
        var upd = Object.assign({}, out[i]);
        if (entry.tr && String(entry.tr).trim()) upd.tr = String(entry.tr).trim();
        if (!upd.ctx && entry.ctx) upd.ctx = entry.ctx;
        out[i] = upd;
        return out;
      }
    }
    out.unshift({
      id: "w" + now.toString(36) + Math.floor(Math.random() * 1e6).toString(36),
      term: term, tr: String(entry.tr || "").trim(), ctx: entry.ctx || "", src: entry.src || "",
      level: 0, added: now, seen: 0
    });
    return out;
  }

  function update(list, id, patch) {
    return list.map(function (w) { return w.id === id ? Object.assign({}, w, patch) : w; });
  }

  // Правка слова: если новое написание совпало с другим словом из списка, сливаем их,
  // иначе в словарике окажутся два одинаковых слова с разными уровнями.
  function rename(list, id, term, tr) {
    term = String(term || "").replace(/\s+/g, " ").trim();
    tr = String(tr || "").trim();
    var me = list.filter(function (w) { return w.id === id; })[0];
    if (!me) return list;
    if (!term) term = me.term;
    var twin = list.filter(function (w) { return w.id !== id && norm(w.term) === norm(term); })[0];
    if (!twin) return update(list, id, { term: term, tr: tr });
    return list.filter(function (w) { return w.id !== id; }).map(function (w) {
      return w.id === twin.id ? Object.assign({}, w, { tr: tr || w.tr, ctx: w.ctx || me.ctx }) : w;
    });
  }

  function remove(list, id) { return list.filter(function (w) { return w.id !== id; }); }

  function checkTyped(entry, typed) {
    var t = norm(typed);
    return !!t && t === norm(entry.term);
  }

  // Уровень знания 0–5: верный ответ поднимает на ступень, ошибка возвращает в начало,
  // чтобы слово чаще попадалось в следующих тестах.
  function grade(entry, ok, now) {
    var level = ok ? Math.min(5, (entry.level || 0) + 1) : 0;
    return Object.assign({}, entry, { level: level, seen: now });
  }

  // Для теста берём самые слабые слова, при равенстве — давно не повторённые.
  function pick(list, n) {
    return list.slice().sort(function (a, b) {
      return (a.level || 0) - (b.level || 0) || (a.seen || 0) - (b.seen || 0) || (a.added || 0) - (b.added || 0);
    }).slice(0, n);
  }

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  // Вопрос «выбери перевод»: нужен перевод у слова и ещё у трёх других, иначе вариантов не набрать.
  function choiceQuestion(list, entry, rnd) {
    if (!entry.tr) return null;
    var seen = {}; seen[norm(entry.tr)] = 1;
    var others = shuffle(list.filter(function (w) {
      var k = norm(w.tr);
      if (w.id === entry.id || !k || seen[k]) return false;
      seen[k] = 1; return true;
    }), rnd).slice(0, 3);
    if (others.length < 3) return null;
    var opts = shuffle([entry.tr].concat(others.map(function (w) { return w.tr; })), rnd);
    return { opts: opts, a: opts.indexOf(entry.tr) };
  }

  // Перевод из встроенного словарика: сначала целая фраза, потом слово, потом простые формы
  // (books → book, gossiped → gossip). Нет в словарике — пусто, ученица впишет сама.
  function lookup(term, dict) {
    if (!dict) return "";
    var t = norm(term).replace(/[^a-z' -]/g, "").replace(/\s+/g, " ").trim();
    if (!t) return "";
    if (dict.phrases && dict.phrases[t]) return dict.phrases[t];
    if (t.indexOf(" ") >= 0) return "";
    var w = dict.words || {};
    if (w[t]) return w[t];
    var tries = [t.replace(/'s$/, ""), t.replace(/ies$/, "y"), t.replace(/es$/, ""), t.replace(/s$/, ""),
                 t.replace(/ied$/, "y"), t.replace(/ed$/, ""), t.replace(/d$/, ""), t.replace(/ing$/, ""), t.replace(/ing$/, "e"), t.replace(/ly$/, "")];
    // Основа короче трёх букв — уже не слово («thing» → «th»), такой перевод был бы чужим.
    for (var i = 0; i < tries.length; i++) if (tries[i] !== t && tries[i].length >= 3 && w[tries[i]]) return w[tries[i]];
    return "";
  }

  // ---------- игры ----------
  function translated(list) { return list.filter(function (w) { return w.tr && String(w.tr).trim(); }); }

  // Пары «слово — перевод»: слабые слова первыми, переводы перемешаны.
  // Одинаковый перевод — только у одного слова раунда: иначе справа две одинаковые кнопки и верный выбор засчитан ошибкой.
  function matchRound(list, n, rnd) {
    var seen = {}, picked = pick(translated(list), list.length).filter(function (w) {
      var k = norm(w.tr); if (seen[k]) return false; seen[k] = 1; return true;
    }).slice(0, n);
    var left = shuffle(picked.map(function (w) { return { id: w.id, text: w.term }; }), rnd);
    var right = shuffle(picked.map(function (w) { return { id: w.id, text: w.tr }; }), rnd);
    // Сверяем с уже окончательным левым столбцом: если все пары встали друг напротив друга — сдвигаем.
    if (right.length > 1 && right.every(function (x, i) { return x.id === left[i].id; })) right.push(right.shift());
    return { left: left, right: right };
  }

  // Слова для сборки из букв: одно слово, 3–12 букв.
  function buildable(list) {
    return list.filter(function (w) { return w.tr && /^[a-z'’-]{3,12}$/i.test(String(w.term).trim()); });
  }
  function scramble(term, rnd) {
    var letters = String(term).split(""), out = letters;
    for (var tries = 0; tries < 10; tries++) { out = shuffle(letters, rnd); if (out.join("") !== letters.join("")) break; }
    return out;
  }

  // Скоростной раунд: пара «слово — перевод», примерно половина верных, половина с чужим переводом.
  function speedRound(list, n, rnd) {
    var tr = translated(list), items = [];
    if (tr.length < 2) return items;
    for (var i = 0; i < n; i++) {
      var w = tr[Math.floor(rnd() * tr.length)];
      var right = rnd() < 0.5, shown = w.tr;
      if (!right) {
        var others = tr.filter(function (x) { return norm(x.tr) !== norm(w.tr); });
        if (others.length) shown = others[Math.floor(rnd() * others.length)].tr; else right = true;
      }
      items.push({ w: w, shown: shown, right: right });
    }
    return items;
  }

  function exportText(list) {
    return list.map(function (w) { return w.term + (w.tr ? " — " + w.tr : ""); }).join("\n");
  }

  window.Vocab = { matchRound: matchRound, buildable: buildable, scramble: scramble, speedRound: speedRound, lookup: lookup, norm: norm, add: add, update: update, rename: rename, remove: remove, checkTyped: checkTyped, grade: grade, pick: pick, shuffle: shuffle, choiceQuestion: choiceQuestion, exportText: exportText };
})();
