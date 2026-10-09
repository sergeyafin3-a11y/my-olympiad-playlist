// Стрик 🔥: дни подряд, в которые ученица проверила хотя бы одно задание.
// Чистые функции без DOM — их гоняют тесты через JavaScriptCore. Дни — местные даты «ГГГГ-ММ-ДД».
(function () {
  // Рубежи, на которых показываем поздравление. Каждый — один раз за всю жизнь стрика-рекорда.
  var MILESTONES = [
    { days: 3, title: "3 days in a row!", text: "The fire is lit. Keep it burning tomorrow too.", emoji: "🔥" },
    { days: 7, title: "One week streak!", text: "Seven days without a break. That's how legends are made.", emoji: "🏆" },
    { days: 14, title: "Two weeks!", text: "Fourteen days in a row. You're on fire.", emoji: "⚡" },
    { days: 30, title: "A whole month!", text: "Thirty days. Lexicon Legend status unlocked.", emoji: "👑" },
    { days: 60, title: "60 days!", text: "Two months of English every day. Unstoppable.", emoji: "🚀" },
    { days: 100, title: "100 days!", text: "Triple digits. This is real dedication.", emoji: "💯" },
    { days: 200, title: "200 days!", text: "Most people never get here. You did.", emoji: "🌟" },
    { days: 365, title: "One year!", text: "A full year of English every day. Absolute legend.", emoji: "🎉" }
  ];

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  // Считаем через полдень по UTC, чтобы переход на летнее время не съедал и не удваивал дни.
  function shift(key, delta) {
    var p = key.split("-"), d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2], 12));
    d.setUTCDate(d.getUTCDate() + delta);
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
  }
  function empty() { return { days: [], best: 0, seen: [] }; }

  function current(state, today) {
    var set = {}; (state.days || []).forEach(function (d) { set[d] = 1; });
    // Сегодня ещё ничего не решено, но вчера было — стрик жив, просто ждёт сегодняшнего задания.
    var start = set[today] ? today : (set[shift(today, -1)] ? shift(today, -1) : null);
    if (!start) return 0;
    var n = 0, d = start;
    while (set[d]) { n++; d = shift(d, -1); }
    return n;
  }

  function record(state, day) {
    state = state || empty();
    if ((state.days || []).indexOf(day) >= 0) return { state: state, firstToday: false, milestone: null, count: current(state, day) };
    var days = (state.days || []).concat([day]).sort();
    // Храним только последние 400 дней: этого хватает для годового рубежа и не раздувает хранилище.
    if (days.length > 400) days = days.slice(days.length - 400);
    var next = { days: days, best: state.best || 0, seen: (state.seen || []).slice() };
    var n = current(next, day);
    // Стрик начался заново — рубежи снова можно получить: неделя после перерыва тоже праздник.
    if (n === 1) next.seen = [];
    next.best = Math.max(next.best, n);
    var hit = null;
    MILESTONES.forEach(function (m) { if (m.days === n && next.seen.indexOf(m.days) < 0) hit = m; });
    if (hit) next.seen.push(hit.days);
    return { state: next, firstToday: true, milestone: hit, count: n };
  }

  window.Streak = { MILESTONES: MILESTONES, dayKey: dayKey, shift: shift, empty: empty, current: current, record: record };
})();
