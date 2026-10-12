"""Региональный этап ВсОШ 2025/26 — третий вариант рядом с муниципальным и финалом (просьба учителя 12.10).

Всё из официального архива ЦПМ (2025-26/reg/engl): задания письменного и устного туров, ключи
(anskrit), скрипт аудио, критерии устного тура. Аудиозапись регионального этапа в архиве
не опубликована — Listening идёт по официальному скрипту, и приложение говорит об этом прямо.

Ключ ниже переписан вручную со страницы 1 anskrit (закрашенные клетки) и со страницы
Use of English Keys — независимо от файла данных, чтобы тест ловил ошибку переноса.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
DATA = ["data/variant-mun-msk-25-26.js", "data/variant-reg-25-26.js", "data/variant.js",
        "data/howto.js", "data/howto-mun.js", "data/howto-reg.js",
        "data/explain.js", "data/explain-mun.js", "data/explain-reg.js", "js/check.js"]

LR_KEY = "BBAABBAABA" + "CCABB" + "ADCABDBCBD" + "CGAFCEGADBEBACD"
UOE_KEY = {1: "subsequent", 2: "precedence", 3: "incorporates", 4: "retract", 5: "prototype", 6: "stumbling", 7: "dimension",
           8: "G", 9: "I", 10: "C", 11: "D", 12: "K", 13: "B", 14: "O",
           15: "M", 16: "J", 17: "B", 18: "G", 19: "D", 20: "A"}


def run_js(body):
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in DATA] +
                    ["JSON.stringify((function(){ var L = window.VARIANTS, H = window.HOWTO, E = window.EXPLAIN, C = window.Check;"
                     " var R = L.filter(function(v){ return v.id === 'reg-2025-26'; })[0]; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


class Regional(unittest.TestCase):
    def test_three_variants_in_stage_order(self):
        r = run_js("return L.map(function(v){ return v.id; });")
        self.assertEqual(r, ["mun-msk-25-26", "reg-2025-26", "final-2025-26"])
        i = [HTML.index(f) for f in ["variant-mun-msk-25-26.js", "variant-reg-25-26.js", 'src="data/variant.js']]
        self.assertEqual(i, sorted(i))
        for f in ["howto-reg.js", "explain-reg.js"]:
            self.assertIn('src="data/' + f + '?v=', HTML)

    def test_parts_time_and_points_as_official(self):
        r = run_js("return R.parts.map(function(p){ var n = 0; p.tasks.forEach(function(t){ n += (t.items || []).length; }); return [p.id, p.minutes || 0, p.max, n]; });")
        self.assertEqual([x[1:] for x in r], [[75, 40, 40], [45, 20, 20], [60, 20, 0], [0, 20, 0]])

    def test_official_keys(self):
        # Части по порядку: [0] Listening and Reading, [1] Use of English.
        r = run_js("""
          return [0, 1].map(function(i){ var out = {};
            R.parts[i].tasks.forEach(function(t){ t.items.forEach(function(it){ out[it.n] = t.type === 'choice' ? it.a : it.accept; }); });
            return out; });
        """)
        lr, uoe = r
        self.assertEqual(sorted(int(n) for n in lr), list(range(1, 41)))
        self.assertEqual("".join(lr[str(n)][0] for n in range(1, 41)), LR_KEY)
        self.assertTrue(all(len(lr[str(n)]) == 1 for n in range(1, 41)))
        self.assertEqual(sorted(int(n) for n in uoe), list(range(1, 21)))
        for n, want in UOE_KEY.items():
            self.assertEqual(uoe[str(n)][0], want, n)

    def test_key_gives_full_marks(self):
        r = run_js("""
          var out = [];
          R.parts.forEach(function(p){
            var got = 0, max = 0;
            p.tasks.forEach(function(t){
              if (t.type === "writing" || t.type === "speaking") { max += C.score(t, {}).max; return; }
              var sheet = {};
              t.items.forEach(function(it){ sheet[it.n] = t.type === "choice" ? it.a[0] : it.accept[0]; });
              var s = C.score(t, sheet); got += s.got; max += s.max;
            });
            out.push([p.max, max, got]);
          });
          return out;
        """)
        for declared, mx, got in r:
            self.assertEqual(declared, mx)
        self.assertEqual([x[2] for x in r[:2]], [40, 20])

    def test_listening_uses_the_official_script_because_no_audio_is_published(self):
        r = run_js("""
          return R.parts[0].tasks.filter(function(t){ return t.section === "listening"; })
            .map(function(t){ return [!!t.audio, (t.script || "").length > 300]; });
        """)
        self.assertEqual(r, [[False, True]] * 3)
        self.assertIn("t.script", HTML)
        self.assertIn("not published", HTML)

    def test_every_task_explained_and_uoe_breakdowns_name_the_key(self):
        r = run_js("""
          var bad = [];
          R.parts.forEach(function(p){ p.tasks.forEach(function(t){
            var h = H.tasks[t.id]; if (!h || !h.what || !h.steps || h.steps.length < 2) bad.push(t.id + ": no how-to");
            if (t.section !== "uoe") return;
            t.items.forEach(function(it){
              var e = (E[t.id] || {})[it.n] || "", up = e.toUpperCase();
              var keys = t.type === "choice" ? it.a : [it.accept[0]];
              if (!keys.some(function(k){ return up.indexOf(t.type === "choice" ? "ANSWER: " + k : String(k).toUpperCase()) >= 0; })) bad.push(t.id + "#" + it.n);
            });
          }); });
          if (!(H.stages && H.stages["reg-2025-26"])) bad.push("stage note");
          return bad;
        """)
        self.assertEqual(r, [])

    def test_crossword_grid_and_speaking_cards(self):
        r = run_js("""
          var fig = [], cards = null, mono = null;
          R.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.figure) fig.push(t.figure.src);
            if (t.type === "speaking") { cards = t.cards.map(function(c){ return [c.id, c.fact.length > 0, !!c.partnerFirst]; }); mono = t.timing.monoSec; } }); });
          return {fig: fig, cards: cards, mono: mono};
        """)
        self.assertEqual(len(r["fig"]), 1)
        self.assertTrue((ROOT / r["fig"][0]).is_file())
        self.assertEqual(len(r["cards"]), 4)
        self.assertTrue(all(c[1] for c in r["cards"]))
        self.assertEqual(r["mono"], 240)
        self.assertIn("t.figure", HTML)
        self.assertIn("monoSec", HTML)

    def test_speaking_zero_rule_only_where_official(self):
        # Критерии финала: «0» за монолог → «0» за весь Speaking. В критериях регионального этапа
        # такого правила нет — там обнуляет только чтение по записям.
        r = run_js("""
          function sp(v){ var t = null; v.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.type === "speaking") t = x; }); }); return t; }
          var F = L.filter(function(v){ return v.id === 'final-2025-26'; })[0];
          var marks = {mono: 0, dia: 5, org: 3, lex: 2, gram: 2, phon: 2};
          function got(t){ var sheet = {}; sheet[t.id] = marks; return C.score(t, sheet).got; }
          return [got(sp(F)), got(sp(R))];
        """)
        self.assertEqual(r, [0, 14])

    def test_after_text_shown_without_audio_too(self):
        self.assertIn("if (t.afterText) h += ", HTML)
        self.assertLess(HTML.index("if (t.afterText) h += "), HTML.index("if (t.audio) {"))


if __name__ == "__main__":
    unittest.main()
