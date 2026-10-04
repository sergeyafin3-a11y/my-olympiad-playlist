// Подсчёт очков. Чистые функции без DOM: их же гоняют тесты через JavaScriptCore.
(function () {
  // Сравниваем ответы так, как сравнил бы проверяющий: регистр, лишние пробелы,
  // дефисы («down-to-earth») и кавычки-ёлочки ошибкой не считаются.
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[-–—]/g, " ")
      .replace(/[.,!?;:"“”]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matches(value, accepted) {
    var v = norm(value);
    if (!v) return false;
    return accepted.some(function (a) { return norm(a) === v; });
  }

  function itemOk(task, item, ans) {
    if (ans == null) return false;
    if (task.type === "choice") return item.a.indexOf(String(ans).toUpperCase()) >= 0;
    if (task.type === "text") return matches(ans, item.accept);
    // Пара слов засчитывается целиком, как в листе ответов: одно слово из двух — ноль.
    if (task.type === "pair") {
      return Array.isArray(ans) && ans.length === 2 &&
        matches(ans[0], item.accept[0]) && matches(ans[1], item.accept[1]);
    }
    return false;
  }

  function manual(task, sheet) {
    var max = task.criteria.reduce(function (s, c) { return s + c.max; }, 0);
    var marks = (sheet && sheet[task.id]) || {};
    var got = task.criteria.reduce(function (s, c) {
      var v = Math.max(0, Math.min(c.max, Number(marks[c.id]) || 0));
      return s + v;
    }, 0);
    // По критериям ВсОШ ноль за содержание (письмо) или за монолог (устная часть) обнуляет всё.
    // Пока этот критерий не выставлен, работа считается непроверенной: иначе 0/9 на экране
    // соседствовал бы с ненулевой суммой.
    var gate = task.type === "writing" ? "task" : "mono";
    var marked = marks[gate] != null;
    if (!marked || Number(marks[gate]) === 0) got = 0;
    return { got: got, max: max, items: [], marked: marked };
  }

  // Пара считается отвеченной, только когда вписаны оба слова.
  function isAnswered(ans) {
    if (Array.isArray(ans)) return ans.length === 2 && ans.every(function (w) { return norm(w) !== ""; });
    return ans != null && String(ans).trim() !== "";
  }

  function score(task, sheet) {
    if (task.type === "writing" || task.type === "speaking") return manual(task, sheet);
    sheet = sheet || {};
    var items = task.items.map(function (it) {
      var ans = sheet[String(it.n)];
      return { n: it.n, ok: itemOk(task, it, ans), answered: isAnswered(ans) };
    });
    var got = items.filter(function (i) { return i.ok; }).length;
    return { got: got, max: task.items.length, items: items };
  }

  function rightAnswer(task, item) {
    if (task.type === "choice") {
      var opts = item.opts || task.opts;
      return item.a.map(function (k) {
        var o = opts.filter(function (x) { return x.k === k; })[0];
        return o ? k + (task.longOpts ? "" : " · " + o.t) : k;
      }).join("  или  ");
    }
    if (task.type === "text") return item.accept.join(" / ");
    if (task.type === "pair") return item.accept.map(function (w) { return w.join(" | "); }).join("  +  ");
    return "";
  }

  window.Check = { norm: norm, score: score, rightAnswer: rightAnswer };
})();
