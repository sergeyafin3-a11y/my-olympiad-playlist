"""Стрик 🔥: дни подряд, когда ученица проверила хотя бы одно задание, и поздравления на рубежах."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run_js(body):
    src = "\n".join(["var window = this;", (ROOT / "js" / "streak.js").read_text(encoding="utf-8"),
                     "JSON.stringify((function(){ var K = window.Streak; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


class Days(unittest.TestCase):
    def test_day_key_is_local_date(self):
        self.assertEqual(run_js('return K.dayKey(new Date(2026, 9, 10, 23, 59));'), "2026-10-10")

    def test_count_consecutive_days(self):
        r = run_js("""
          var s = K.empty();
          ["2026-10-01","2026-10-02","2026-10-03","2026-10-05","2026-10-06","2026-10-07"].forEach(function(d){ s = K.record(s, d).state; });
          return [K.current(s, "2026-10-07"), K.current(s, "2026-10-08"), K.current(s, "2026-10-09"), s.best];
        """)
        # сегодня сделано → 3; сегодня ещё нет, но вчера было → стрик жив (3); пропущен день → 0
        self.assertEqual(r, [3, 3, 0, 3])

    def test_same_day_twice_counts_once(self):
        r = run_js("""
          var s = K.empty(), a = K.record(s, "2026-10-10"), b = K.record(a.state, "2026-10-10");
          return [a.firstToday, b.firstToday, b.state.days.length];
        """)
        self.assertEqual(r, [True, False, 1])

    def test_milestones_fire_once(self):
        r = run_js("""
          var s = K.empty(), hits = [];
          for (var i = 1; i <= 31; i++) {
            var d = "2026-10-" + (i < 10 ? "0" + i : i);
            if (i === 31) d = "2026-10-31";
            var res = K.record(s, d); s = res.state;
            if (res.milestone) hits.push(res.milestone.days);
            var again = K.record(s, d); if (again.milestone) hits.push("again");
          }
          return hits;
        """)
        self.assertEqual(r, [3, 7, 14, 30])

    def test_after_a_break_milestones_can_be_won_again(self):
        r = run_js("""
          var s = K.empty(), hits = [];
          ["2026-10-01","2026-10-02","2026-10-03","2026-10-05","2026-10-06","2026-10-07"].forEach(function(d){
            var res = K.record(s, d); s = res.state; if (res.milestone) hits.push(d);
          });
          return hits;
        """)
        self.assertEqual(r, ["2026-10-03", "2026-10-07"])

    def test_streak_survives_month_boundary(self):
        r = run_js("""
          var s = K.empty();
          ["2026-10-30","2026-10-31","2026-11-01"].forEach(function(d){ s = K.record(s, d).state; });
          return K.current(s, "2026-11-01");
        """)
        self.assertEqual(r, 3)


class Page(unittest.TestCase):
    def test_page_shows_the_flame(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="js/streak.js?v=', html)
        self.assertIn('src="js/streak-ui.js?v=', html)

    def test_empty_checks_are_refused_everywhere(self):
        # Ревью: пустая проверка в экзамене и пустой ввод в тесте слов засчитывали день.
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        vocab = (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8")
        self.assertIn('"Answer at least one question"', html)
        self.assertIn('"Type at least one letter"', vocab)


if __name__ == "__main__":
    unittest.main()
