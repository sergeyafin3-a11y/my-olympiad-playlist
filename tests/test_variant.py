"""Проверки варианта и подсчёта очков.

JS запускается через JavaScriptCore (osascript -l JavaScript): Node на этом
ноутбуке нет, а проверять надо ровно тот код, который грузит страница.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run_js(body):
    """Грузит data/variant.js и js/check.js, выполняет body, возвращает JSON."""
    src = "\n".join([
        "var window = this;",
        (ROOT / "data" / "variant.js").read_text(encoding="utf-8"),
        (ROOT / "js" / "check.js").read_text(encoding="utf-8"),
        "JSON.stringify((function(){" + body + "})());",
    ])
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src],
                         capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


# Официальный ключ заключительного этапа 2025/26 (ans-engl-9-11-pism-final-25-26.pdf).
KEY_LR = {1: "B", 2: "B", 3: "B", 4: "A", 5: "B", 6: "A", 7: "A", 8: "B", 9: "A", 10: "B",
          11: "C", 12: "A", 13: "C", 14: "B", 15: "A",
          16: "A", 17: "A", 18: "A", 19: "A", 20: "D", 21: "A", 22: "D", 23: "C", 24: "B", 25: "D",
          26: "bemusement", 27: "shifty", 28: "falsehood", 29: "implausibility", 30: "unsettling",
          31: "B", 32: "A", 33: "B", 34: "C", 35: "C", 36: "B", 37: "C", 38: "D", 39: "A", 40: "D"}
KEY_UOE = {1: ["complied", "complicated"], 2: ["agonise", "antagonise"], 3: ["brie", "briefly"],
           4: ["pie", "pirate"], 5: ["lies", "lotteries"], 6: ["Tom", "toponym"], 7: ["part", "parapet"],
           8: "down to earth", 9: "keep in touch", 10: "an eye for an eye",
           11: "making up for lost time", 12: "the odds are overwhelming", 13: "no biggie",
           14: "step up to the plate",
           15: "L", 16: "E", 17: "A", 18: "G", 19: "B", 20: "N", 21: "P", 22: "J",
           23: ["heart", "earth"], 24: ["silent", "listen"], 25: ["former", "reform"],
           26: ["credit", "direct"], 27: ["danger", "garden"], 28: ["below", "elbow"],
           29: ["spare", "spear"], 30: ["rental", "learnt"],
           31: "D", 32: "H", 33: "I", 34: "G", 35: "B", 36: "F", 37: "E", 38: "K", 39: "C", 40: "J"}


def score_part(part_id, answers):
    return run_js(f"""
      var part = window.VARIANT.parts.find(function(p){{return p.id === {json.dumps(part_id)};}});
      var ans = {json.dumps({str(k): v for k, v in answers.items()})};
      var got = 0, max = 0;
      part.tasks.forEach(function(t){{ var r = window.Check.score(t, ans); got += r.got; max += r.max; }});
      return {{got: got, max: max}};
    """)


class Structure(unittest.TestCase):
    def test_parts_and_item_numbers(self):
        info = run_js("""
          return window.VARIANT.parts.map(function(p){
            var ns = [];
            (p.tasks || []).forEach(function(t){ (t.items || []).forEach(function(i){ ns.push(i.n); }); });
            return {id: p.id, max: p.max, ns: ns};
          });
        """)
        by = {p["id"]: p for p in info}
        self.assertEqual(set(by), {"lr", "uoe", "writing", "speaking"})
        self.assertEqual(by["lr"]["ns"], list(range(1, 41)))
        self.assertEqual(by["uoe"]["ns"], list(range(1, 41)))
        self.assertEqual(sum(p["max"] for p in info), 120)

    def test_choice_keys_point_at_existing_options(self):
        bad = run_js("""
          var bad = [];
          window.VARIANT.parts.forEach(function(p){ (p.tasks || []).forEach(function(t){
            if (t.type !== "choice") return;
            t.items.forEach(function(i){
              var keys = (i.opts || t.opts).map(function(o){ return o.k; });
              i.a.forEach(function(a){ if (keys.indexOf(a) < 0) bad.push(i.n + ":" + a); });
            });
          }); });
          return bad;
        """)
        self.assertEqual(bad, [])

    def test_audio_markers_ascend_inside_recording(self):
        marks = run_js("""
          var m = [];
          window.VARIANT.parts[0].tasks.forEach(function(t){ if (t.audio) m.push(t.audio.from); });
          return m;
        """)
        self.assertEqual(len(marks), 3)
        self.assertEqual(marks, sorted(marks))
        self.assertTrue(all(0 <= s < 25 * 60 for s in marks))

    def test_media_files_exist(self):
        paths = run_js("""
          var p = [window.VARIANT.audio];
          window.VARIANT.parts.forEach(function(part){ (part.tasks || []).forEach(function(t){
            (t.items || []).forEach(function(i){ if (i.img) p.push(i.img); });
            (t.examples || []).forEach(function(e){ if (e.img) p.push(e.img); });
          }); });
          return p;
        """)
        self.assertGreaterEqual(len(paths), 8)
        for p in paths:
            self.assertTrue((ROOT / p).is_file(), p)

    def test_page_loads_data_and_checker(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/variant.js"', html)
        self.assertIn('src="js/check.js"', html)


class Scoring(unittest.TestCase):
    def test_official_key_gives_full_marks(self):
        self.assertEqual(score_part("lr", KEY_LR), {"got": 40, "max": 40})
        self.assertEqual(score_part("uoe", KEY_UOE), {"got": 40, "max": 40})

    def test_empty_sheet_gives_zero(self):
        self.assertEqual(score_part("lr", {})["got"], 0)
        self.assertEqual(score_part("uoe", {})["got"], 0)

    def test_alternatives_from_the_key_are_accepted(self):
        lr = {**KEY_LR, **{17: "C", 18: "B", 26: "Amusement ", 28: "falsifications"}}
        self.assertEqual(score_part("lr", lr)["got"], 40)
        uoe = {**KEY_UOE, **{2: ["agonize", "Antagonize"], 7: ["part", "rampart"],
                               9: "Keep in line", 8: "down-to-earth",
                               12: "overwhelming odds", 16: "F", 18: "M", 22: "F"}}
        self.assertEqual(score_part("uoe", uoe)["got"], 40)

    def test_wrong_answers_cost_points(self):
        lr = {**KEY_LR, **{1: "A", 27: "shift", 40: "C"}}
        self.assertEqual(score_part("lr", lr)["got"], 37)
        # Пара засчитывается целиком: одно верное слово из двух — ноль.
        uoe = {**KEY_UOE, **{1: ["complied", "complex"], 23: ["earth", "heart"]}}
        self.assertEqual(score_part("uoe", uoe)["got"], 38)


class ReviewFixes(unittest.TestCase):
    def test_manual_score_waits_for_the_gate_criterion(self):
        # Пока учитель не выставил «решение задачи», баллы за остальное не считаются.
        r = run_js("""
          var w = window.VARIANT.parts[2].tasks[0];
          var a = window.Check.score(w, {"writing-1": {org: 3, lex: 2}});
          var b = window.Check.score(w, {"writing-1": {task: 0, org: 3, lex: 2}});
          var c = window.Check.score(w, {"writing-1": {task: 7, org: 3, lex: 2}});
          return [a.got, a.marked, b.got, b.marked, c.got, c.marked];
        """)
        self.assertEqual(r, [0, False, 0, True, 12, True])

    def test_pair_counts_as_answered_only_when_both_words_typed(self):
        r = run_js("""
          var t = window.VARIANT.parts[1].tasks[0];
          var s = window.Check.score(t, {"1": ["", ""], "2": ["agonise", ""], "3": ["brie", "briefly"]});
          return s.items.slice(0, 3).map(function(i){ return i.answered; });
        """)
        self.assertEqual(r, [False, False, True])

    def test_interview_marker_lives_in_data(self):
        r = run_js("""
          var t = window.VARIANT.parts[0].tasks[2];
          return [t.audio.from, t.audio.skip && t.audio.skip.at];
        """)
        self.assertTrue(r[0] < r[1] < 25 * 60)


if __name__ == "__main__":
    unittest.main()
