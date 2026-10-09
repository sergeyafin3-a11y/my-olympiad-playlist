"""Словарик: добавление слов, повторы, тест по словам.

Логика словарика — чистые функции в js/vocab.js; гоняем их через JavaScriptCore,
как и подсчёт очков варианта.
"""
import json
import pathlib
import subprocess
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
# Настоящие двухбуквенные слова английского; остальные двухбуквенные ключи — огрызки.
SHORT_OK = {"a", "i", "am", "an", "as", "at", "be", "by", "do", "go", "he", "if", "in", "is", "it", "me", "my", "no", "of", "oh", "ok", "on", "or", "so", "to", "up", "us", "we", "tv", "ox", "pm", "am"}


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


class Lookup(unittest.TestCase):
    """Перевод подставляется сам: всё, что есть в заданиях, есть во встроенном словарике."""

    def lookup(self, terms):
        src = "\n".join(["var window = this;", (ROOT / "data" / "dict.js").read_text(encoding="utf-8"),
                         (ROOT / "js" / "vocab.js").read_text(encoding="utf-8"),
                         "JSON.stringify(%s.map(function(t){ return window.Vocab.lookup(t, window.DICT); }));" % json.dumps(terms)])
        return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)

    def test_words_phrases_and_case(self):
        r = self.lookup(["contempt", "Leeway", "pull the wool over her eyes", "IN THE LIMELIGHT", "zzzqx"])
        self.assertTrue(r[0] and r[1] and r[2] and r[3])
        self.assertEqual(r[4], "")

    def test_simple_word_forms_fall_back_to_the_base(self):
        r = self.lookup(["contempts", "gossiped", "relying on"])
        self.assertTrue(r[0], "contempts → contempt")
        self.assertTrue(r[1], "gossiped → gossip")

    def test_every_word_in_the_tasks_is_in_the_dictionary(self):
        import glob, re
        src = (ROOT / "data" / "dict.js").read_text(encoding="utf-8")
        words = json.loads(src[src.index("window.DICT = ") + len("window.DICT = "):src.rindex(";\n})();")])["words"]
        missing = set()
        for f in [ROOT / "data" / "variant.js"] + [pathlib.Path(p) for p in glob.glob(str(ROOT / "data" / "lexis" / "*.js")) + glob.glob(str(ROOT / "data" / "grammar" / "*.js"))]:
            for lit in re.findall(r'"((?:[^"\\]|\\.)*)"', f.read_text(encoding="utf-8")):
                if re.search(r"[а-яА-ЯёЁ]", lit) and not re.search(r"[A-Za-z]{3}", lit):
                    continue
                for w in re.findall(r"[A-Za-z][A-Za-z'’-]*[A-Za-z]|[A-Za-z]", lit):
                    w = w.replace("’", "'").lower().strip("'-")
                    if len(w) >= 3 and not re.search(r"^lx-|^v-|-is-", w) and w not in words:
                        missing.add(w)
        # Без перевода остаются только огрызки: суффиксы из правил (-ance, -ible), куски адресов,
        # наборы букв анаграмм. Настоящих слов среди них почти нет — держим покрытие не ниже 97 %.
        total = len(set(words)) + len(missing)
        self.assertLess(len(missing) / total, 0.03, sorted(missing))

    def test_no_wrong_translation_from_word_fragments(self):
        # Ревью: «thing» → «окончание числительного», «shed» → «тсс» — из-за мусорных ключей (th, sh)
        # и отрезания окончаний до огрызка. Такие слова должны остаться без перевода, а не с чужим.
        r = self.lookup(["thing", "shed", "wing", "wed", "feed", "sting"])
        for word, tr in zip(["thing", "shed", "wing", "wed", "feed", "sting"], r):
            self.assertFalse(any(x in tr for x in ["окончание", "фрагмент", "тсс", "мы", "святой"]), (word, tr))

    def test_dictionary_has_no_fragments_or_ids(self):
        src = (ROOT / "data" / "dict.js").read_text(encoding="utf-8")
        words = json.loads(src[src.index("window.DICT = ") + len("window.DICT = "):src.rindex(";\n})();")])["words"]
        bad = [k for k, v in words.items()
               if (len(k) < 3 and k not in SHORT_OK) or re.search(r"\d|^lx-|^v-|-is-", k)
               or re.search(r"фрагмент|окончание|часть слова|не слово", v)]
        self.assertEqual(bad, [])

    def test_screen_fills_translation(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/dict.js?v=', html)
        ui = (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8")
        self.assertIn("Vo.lookup(", ui)


class Games(unittest.TestCase):
    """Игры со словами: пары, сборка слова из букв, диктант, скоростной раунд."""
    SEED = "var seed = 5; function rnd(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }"

    def test_match_round_pairs_words_with_their_translations(self):
        r = run_js(self.SEED + """
          var l = %s; var round = V.matchRound(l, 5, rnd);
          var byId = {}; l.forEach(function(w){ byId[w.id] = w; });
          return {n: round.left.length, right: round.right.length,
                  ok: round.right.every(function(x){ return byId[x.id].tr === x.text; }),
                  same: round.left.map(function(x){ return x.id; }).join() === round.right.map(function(x){ return x.id; }).join()};
        """ % words(8))
        self.assertEqual(r["n"], 5)
        self.assertEqual(r["right"], 5)
        self.assertTrue(r["ok"])
        self.assertFalse(r["same"], "translations must be shuffled")

    def test_match_round_skips_words_without_translation(self):
        r = run_js(self.SEED + 'var l = %s; l[0].tr = ""; l[1].tr = ""; return V.matchRound(l, 5, rnd).left.length;' % words(4))
        self.assertEqual(r, 2)

    def test_scramble_uses_the_same_letters_in_another_order(self):
        r = run_js(self.SEED + 'return ["gossip", "leeway", "contempt"].map(function(w){ var s = V.scramble(w, rnd); return [s.join(""), s.slice().sort().join(""), w.split("").sort().join("")]; });')
        for shuffled, a, b in r:
            self.assertEqual(a, b)
        self.assertTrue(any(x[0] not in ("gossip", "leeway", "contempt") for x in r))

    def test_buildable_words_are_single_and_short(self):
        r = run_js('return V.buildable([{term:"gossip",tr:"x"},{term:"pull the wool",tr:"y"},{term:"a",tr:"z"},{term:"extraordinarily",tr:"q"}]).map(function(w){return w.term;});')
        self.assertEqual(r, ["gossip"])

    def test_speed_round_mixes_right_and_wrong_pairs(self):
        r = run_js(self.SEED + """
          var l = %s, items = V.speedRound(l, 20, rnd), byId = {};
          l.forEach(function(w){ byId[w.id] = w; });
          return items.map(function(it){ return [it.right, byId[it.w.id].tr === it.shown]; });
        """ % words(6))
        self.assertEqual(len(r), 20)
        self.assertTrue(all(right == really for right, really in r))
        self.assertTrue(any(x[0] for x in r) and any(not x[0] for x in r))


class Page(unittest.TestCase):
    def test_page_loads_vocab_script(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="js/vocab.js?v=', html)
        # Экран словарика подключается отдельным файлом после основного скрипта.
        self.assertIn('src="js/vocab-ui.js?v=', html)
        ui = (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8")
        self.assertIn('A.routes.words', ui)


class GamesPage(unittest.TestCase):
    def test_four_games_are_on_my_words_and_count_for_the_streak(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="js/games-ui.js?v=', html)
        self.assertLess(html.index("js/vocab-ui.js"), html.index("js/games-ui.js"))
        ui = (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8")
        for route in ["#/words/match", "#/words/build", "#/words/listen", "#/words/speed"]:
            self.assertIn(route, ui)
        games = (ROOT / "js" / "games-ui.js").read_text(encoding="utf-8")
        # Игры засчитывают день стрика сами: их кнопки не из списка проверок streak-ui.
        self.assertIn("A.markActivity", games)
        self.assertIn("A.markActivity = markActivity", (ROOT / "js" / "streak-ui.js").read_text(encoding="utf-8"))
        self.assertIn('"Type at least one letter"', games)
        self.assertIn('class="howto"', games)

    def test_game_buttons_do_not_share_names_with_other_screens(self):
        # Все модули слушают клики по всему документу: кнопка «Start» игры с именем data-gstart
        # запускала смешанный тест грамматики.
        import re
        def names(txt):
            return set(re.findall(r'data-([a-z]+)=', txt)) | set(m.lower() for m in re.findall(r'dataset\.([a-zA-Z]+)', txt))
        games = names((ROOT / "js" / "games-ui.js").read_text(encoding="utf-8"))
        others = set()
        for f in ["index.html", "js/vocab-ui.js", "js/grammar-ui.js", "js/lexis-ui.js", "js/streak-ui.js"]:
            others |= names((ROOT / f).read_text(encoding="utf-8"))
        self.assertEqual(sorted(games & others), [])


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
