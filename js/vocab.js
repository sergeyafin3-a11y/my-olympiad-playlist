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
    for (var i = 0; i < tries.length; i++) if (tries[i] !== t && w[tries[i]]) return w[tries[i]];
    return "";
  }

  function exportText(list) {
    return list.map(function (w) { return w.term + (w.tr ? " — " + w.tr : ""); }).join("\n");
  }

  window.Vocab = { lookup: lookup, norm: norm, add: add, update: update, rename: rename, remove: remove, checkTyped: checkTyped, grade: grade, pick: pick, shuffle: shuffle, choiceQuestion: choiceQuestion, exportText: exportText };
})();
