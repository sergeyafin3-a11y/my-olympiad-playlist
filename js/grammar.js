// Грамматика: проверка ответа, подсчёт и сборка смешанного теста. Чистые функции без DOM.
(function () {
  var norm = window.Check.norm;

  function check(item, ans) {
    if (ans == null || ans === "") return false;
    if (item.type === "choice") return Number(ans) === item.a;
    var v = norm(ans);
    return !!v && item.accept.some(function (a) { return norm(a) === v; });
  }

  function score(items, answers) {
    var got = 0;
    items.forEach(function (it, i) { if (check(it, answers[i])) got++; });
    return { got: got, max: items.length };
  }

  function topicsByLevel(topics, levels) {
    return topics.filter(function (t) { return levels.indexOf(t.level) >= 0; });
  }

  // Смешанный тест: вопросы из выбранных тем вперемешку, без повторов.
  // Ссылаемся на вопрос по теме и номеру, чтобы правка в теме сразу попадала и сюда.
  function mixed(topics, ids, n, rnd) {
    var pool = [];
    topics.forEach(function (t) {
      if (ids.indexOf(t.id) < 0) return;
      t.items.forEach(function (_, i) { pool.push({ topic: t.id, i: i }); });
    });
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = pool[i]; pool[i] = pool[j]; pool[j] = x; }
    return pool.slice(0, n);
  }

  // Сохранённый смешанный тест мог пережить обновление тем: выкидываем вопросы, которых больше нет,
  // и перенумеровываем ответы, иначе страница падает на несуществующем вопросе.
  function prune(mix, topics) {
    var byId = {}; topics.forEach(function (t) { byId[t.id] = t; });
    var qs = [], ans = {};
    mix.qs.forEach(function (q, i) {
      var t = byId[q.topic];
      if (!t || !t.items[q.i]) return;
      if (mix.ans && mix.ans[i] != null) ans[qs.length] = mix.ans[i];
      qs.push(q);
    });
    return { qs: qs, ans: ans, checked: !!mix.checked && qs.length > 0 };
  }

  function knownIds(topics, ids) {
    var all = topics.map(function (t) { return t.id; });
    return ids.filter(function (id) { return all.indexOf(id) >= 0; });
  }

  window.Grammar = { check: check, score: score, topicsByLevel: topicsByLevel, mixed: mixed, prune: prune, knownIds: knownIds };
})();
