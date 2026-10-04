"""Словарик: добавление слов, повторы, тест по словам.

Логика словарика — чистые функции в js/vocab.js; гоняем их через JavaScriptCore,
как и подсчёт очков варианта.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run_js(body):
    src = "\n".join([
        "var window = this;",
        (ROOT / "js" / "vocab.js").read_text(encoding="utf-8"),
        "JSON.stringify((function(){ var V = window.Vocab; " + body + "})());",
    ])
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src],
                         capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def words(n):
    return json.dumps([{"id": "w%d" % i, "term": "word%d" % i, "tr": "слово%d" % i,
                        "level": 0, "added": i} for i in range(n)])


class AddWords(unittest.TestCase):
    def test_add_trims_and_keeps_context(self):
        r = run_js("""
          var l = V.add([], {term: "  shifty ", tr: "подозрительный", ctx: "liars look shifty", src: "lr-4a"}, 100);
          return l;
        """)
        self.assertEqual(len(r), 1)
        self.assertEqual(r[0]["term"], "shifty")
        self.assertEqual(r[0]["tr"], "подозрительный")
        self.assertEqual(r[0]["ctx"], "liars look shifty")
        self.assertEqual(r[0]["level"], 0)
        self.assertTrue(r[0]["id"])

    def test_same_word_is_not_added_twice_but_translation_updates(self):
        r = run_js("""
          var l = V.add([], {term: "Gossip", tr: ""}, 1);
          l = V.add(l, {term: "gossip", tr: "сплетни"}, 2);
          l = V.add(l, {term: "GOSSIP ", tr: ""}, 3);
          return l;
        """)
        self.assertEqual(len(r), 1)
        self.assertEqual(r[0]["tr"], "сплетни")

    def test_phrases_are_allowed(self):
        r = run_js('return V.add([], {term: "pull the wool over her eyes", tr: "обмануть"}, 1)[0].term;')
        self.assertEqual(r, "pull the wool over her eyes")

    def test_empty_term_is_ignored(self):
        self.assertEqual(run_js('return V.add([], {term: "   ", tr: "x"}, 1).length;'), 0)


class Practice(unittest.TestCase):
    def test_typed_answer_ignores_case_and_spaces(self):
        r = run_js("""
          var e = {term: "step up to the plate"};
          return [V.checkTyped(e, " Step up  to the plate "), V.checkTyped(e, "step up"), V.checkTyped(e, "")];
        """)
        self.assertEqual(r, [True, False, False])

    def test_grade_moves_level_up_and_resets_on_mistake(self):
        r = run_js("""
          var e = {term: "a", level: 2};
          var up = V.grade(e, true, 10), down = V.grade(e, false, 11);
          var top = V.grade({term: "a", level: 5}, true, 12);
          return [up.level, up.seen, down.level, top.level];
        """)
        self.assertEqual(r, [3, 10, 0, 5])

    def test_test_picks_least_known_words_first(self):
        r = run_js("""
          var l = %s;
          l[3].level = 0; l.forEach(function(w, i){ w.level = i === 3 ? 0 : 4; });
          l[5].level = 1;
          return V.pick(l, 2).map(function(w){ return w.id; });
        """ % words(8))
        self.assertEqual(r, ["w3", "w5"])

    def test_choice_question_has_the_right_answer_once(self):
        r = run_js("""
          var l = %s, seed = 7;
          function rnd(){ seed = (seed * 9301 + 49297) %% 233280; return seed / 233280; }
          var q = V.choiceQuestion(l, l[2], rnd);
          return {opts: q.opts, a: q.a};
        """ % words(6))
        self.assertEqual(len(r["opts"]), 4)
        self.assertEqual(len(set(r["opts"])), 4)
        self.assertEqual(r["opts"][r["a"]], "слово2")

    def test_choice_needs_four_translated_words(self):
        r = run_js("""
          var l = %s; l[1].tr = "";
          return V.choiceQuestion(l, l[0], Math.random);
        """ % words(4))
        self.assertIsNone(r)

    def test_export_lists_words_with_translations(self):
        r = run_js('return V.exportText([{term: "shifty", tr: "подозрительный"}, {term: "leeway", tr: ""}]);')
        self.assertEqual(r, "shifty — подозрительный\nleeway")


class Page(unittest.TestCase):
    def test_page_loads_vocab_script(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="js/vocab.js"', html)
        # Экран словарика подключается отдельным файлом после основного скрипта.
        self.assertIn('src="js/vocab-ui.js"', html)
        ui = (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8")
        self.assertIn('A.routes.words', ui)


class Edit(unittest.TestCase):
    def test_rename_into_existing_word_merges_instead_of_duplicating(self):
        r = run_js("""
          var l = [{id: "a", term: "gossip", tr: "", ctx: "c1", level: 2},
                   {id: "b", term: "rumour", tr: "слух", ctx: "", level: 0}];
          var out = V.rename(l, "b", "Gossip", "сплетни");
          return out.map(function(w){ return [w.id, w.term, w.tr]; });
        """)
        self.assertEqual(r, [["a", "gossip", "сплетни"]])

    def test_rename_plain_and_empty(self):
        r = run_js("""
          var l = [{id: "a", term: "gossip", tr: ""}];
          return [V.rename(l, "a", " small talk ", "болтовня")[0].term, V.rename(l, "a", "   ", "x")[0].term];
        """)
        self.assertEqual(r, ["small talk", "gossip"])


if __name__ == "__main__":
    unittest.main()
