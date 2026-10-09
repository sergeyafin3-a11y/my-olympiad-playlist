"""Разбор под каждым вопросом Use of English: есть для всех 40 и совпадает с официальным ключом."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run_js(body):
    src = "\n".join(["var window = this;",
                     (ROOT / "data" / "variant.js").read_text(encoding="utf-8"),
                     (ROOT / "data" / "explain.js").read_text(encoding="utf-8"),
                     "JSON.stringify((function(){ var V = window.VARIANT, E = window.EXPLAIN; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src],
                                     capture_output=True, text=True, check=True).stdout)


class Explain(unittest.TestCase):
    def test_every_use_of_english_item_has_a_breakdown_matching_the_key(self):
        bad = run_js("""
          var bad = [];
          V.parts[1].tasks.forEach(function(t){ t.items.forEach(function(it){
            var e = (E[t.id] || {})[it.n];
            if (!e) { bad.push(t.id + "#" + it.n + ": нет разбора"); return; }
            var up = e.toUpperCase();
            // для выбора с двумя допустимыми ответами достаточно назвать любой из них
            if (t.type === "choice" && !it.a.some(function(k){ return up.indexOf("ANSWER: " + k) >= 0; })) { bad.push(t.id + "#" + it.n + ": нет ответа"); return; }
            var keys = t.type === "choice" ? []
                     : t.type === "pair" ? [it.accept[0][0].toUpperCase(), it.accept[1][0].toUpperCase()]
                     : [it.accept[0].toUpperCase()];
            keys.forEach(function(k){ if (up.indexOf(k) < 0) bad.push(t.id + "#" + it.n + ": нет ответа " + k); });
          }); });
          return bad;
        """)
        self.assertEqual(bad, [])

    def test_breakdowns_are_in_english(self):
        # Объяснения — простым английским; по-русски только переводы в скобках.
        bad = run_js("""
          var bad = [];
          Object.keys(E).forEach(function(t){ Object.keys(E[t]).forEach(function(n){
            var noRu = E[t][n].replace(/\\([^)]*\\)/g, "");
            if (/[а-яё]/i.test(noRu)) bad.push(t + "#" + n);
          }); });
          return bad;
        """)
        self.assertEqual(bad, [])

    def test_page_hides_the_breakdown_behind_a_button(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/explain.js?v=', html)
        self.assertIn('class="ex"', html)
        self.assertIn("Show how to solve", html)


if __name__ == "__main__":
    unittest.main()
