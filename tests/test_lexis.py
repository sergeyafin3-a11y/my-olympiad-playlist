"""Olympiad lexis: словообразование, фразовые глаголы, предлоги, идиомы, игра слов, поиск лишнего слова."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ["lexis-wf", "lexis-pv", "lexis-wp"]
GROUPS = {"Word formation", "Phrasal verbs", "Prepositions", "Collocations & idioms", "Word play", "Error hunt"}


def run_js(body):
    parts = ["var window = this;", (ROOT / "js" / "check.js").read_text(encoding="utf-8")]
    parts += [(ROOT / "data" / "lexis" / (f + ".js")).read_text(encoding="utf-8") for f in FILES]
    parts += [(ROOT / "js" / "grammar.js").read_text(encoding="utf-8"),
              "JSON.stringify((function(){ var G = window.Grammar, L = window.LEXIS; " + body + "})());"]
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", "\n".join(parts)],
                         capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


class Content(unittest.TestCase):
    def test_topics_and_groups(self):
        info = run_js("return L.map(function(t){ return [t.id, t.group, t.items.length]; });")
        ids = [t[0] for t in info]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertEqual(len(info), 13)
        self.assertEqual({t[1] for t in info}, GROUPS)
        for tid, _, n in info:
            self.assertEqual(n, 10, tid)
            self.assertTrue(tid.startswith("lx-"), tid)

    def test_every_item_is_answerable_and_the_key_scores_ten(self):
        r = run_js("""
          var bad = [];
          L.forEach(function(t){
            if (!t.rule || !t.rule.intro || !t.rule.blocks.length) bad.push(t.id + ": no rule");
            t.items.forEach(function(it, i){
              if (it.type === "choice" && !(it.a >= 0 && it.a < it.opts.length)) bad.push(t.id + "#" + i);
              if (it.type === "text" && !(it.accept && it.accept.length)) bad.push(t.id + "#" + i);
              if (!it.why) bad.push(t.id + "#" + i + ": no why");
            });
            var ans = t.items.map(function(it){ return it.type === "choice" ? it.a : it.accept[0]; });
            if (G.score(t.items, ans).got !== 10) bad.push(t.id + ": key < 10");
          });
          return bad;
        """)
        self.assertEqual(r, [])

    def test_error_hunt_items_name_exactly_one_word_from_the_line(self):
        r = run_js("""
          var bad = [];
          // Формат «найди лишнее слово» встречается и в предлогах, проверяем его везде.
          L.forEach(function(t){
            t.items.forEach(function(it, i){
              if (!/^Find the extra word:/.test(it.q)) return;
              var line = it.q.replace(/^Find the extra word:\\s*/, "").toLowerCase();
              var words = line.replace(/[^a-z' -]/g, " ").split(/\\s+/);
              it.accept.forEach(function(a){ if (words.indexOf(a.toLowerCase()) < 0) bad.push(t.id + "#" + i + ": " + a); });
            });
          });
          return bad;
        """)
        self.assertEqual(r, [])


class Titles(unittest.TestCase):
    def test_every_group_has_its_own_colour_and_icon(self):
        # Названия групп и тем должны быть хорошо заметны: у каждой группы свой цвет и значок.
        import re
        ui = (ROOT / "js" / "lexis-ui.js").read_text(encoding="utf-8")
        styled = set(re.findall(r'"([^"]+)": \{ icon: "[^"]+", color: "#[0-9A-Fa-f]{6}" \}', ui))
        self.assertEqual(styled, GROUPS)

    def test_topic_title_splits_into_name_and_details(self):
        ui = (ROOT / "js" / "lexis-ui.js").read_text(encoding="utf-8")
        self.assertIn('class="lx-name"', ui)
        self.assertIn('class="lx-detail"', ui)


class Page(unittest.TestCase):
    def test_page_loads_lexis(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        for f in FILES:
            self.assertIn('src="data/lexis/%s.js?v=' % f, html)
        self.assertIn('src="js/lexis-ui.js?v=', html)
        ui = (ROOT / "js" / "lexis-ui.js").read_text(encoding="utf-8")
        self.assertIn("A.routes.lexis", ui)


if __name__ == "__main__":
    unittest.main()
