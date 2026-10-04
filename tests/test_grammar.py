"""Грамматика: темы A1–B2, тест по теме и смешанный тест."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
LEVELS = ["a1", "a2", "b1", "b2"]


def run_js(body):
    parts = ["var window = this;", (ROOT / "js" / "check.js").read_text(encoding="utf-8")]
    parts += [(ROOT / "data" / "grammar" / ("grammar-%s.js" % l)).read_text(encoding="utf-8") for l in LEVELS]
    parts += [(ROOT / "js" / "grammar.js").read_text(encoding="utf-8"),
              "JSON.stringify((function(){ var G = window.Grammar, T = window.GRAMMAR; " + body + "})());"]
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", "\n".join(parts)],
                         capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


SEEDED = "var seed = 11; function rnd(){ seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }"


class Content(unittest.TestCase):
    def test_topics_cover_a1_to_b2_with_ten_items_each(self):
        info = run_js("return T.map(function(t){ return [t.id, t.level, t.items.length, t.items.filter(function(i){return i.type==='text';}).length]; });")
        ids = [t[0] for t in info]
        self.assertEqual(len(ids), len(set(ids)), "ids must be unique")
        self.assertEqual({t[1] for t in info}, {"A1", "A2", "B1", "B2"})
        self.assertGreaterEqual(len(info), 30)
        for tid, _, n, texts in info:
            self.assertEqual(n, 10, tid)
            self.assertGreaterEqual(texts, 3, tid)

    def test_every_item_is_answerable(self):
        bad = run_js("""
          var bad = [];
          T.forEach(function(t){
            if (!t.rule || !t.rule.intro || !t.rule.blocks.length) bad.push(t.id + ": no rule");
            t.items.forEach(function(it, i){
              var where = t.id + "#" + i;
              if (it.type === "choice") {
                if (!(it.a >= 0 && it.a < it.opts.length)) bad.push(where + ": key out of range");
                var seen = {}; it.opts.forEach(function(o){ if (seen[o]) bad.push(where + ": duplicate option"); seen[o] = 1; });
              } else if (it.type === "text") {
                if (!it.accept || !it.accept.length) bad.push(where + ": empty accept");
              } else bad.push(where + ": unknown type");
              if (!it.why) bad.push(where + ": no explanation");
            });
          });
          return bad;
        """)
        self.assertEqual(bad, [])


class Scoring(unittest.TestCase):
    def test_check_item(self):
        r = run_js("""
          var c = {type: "choice", opts: ["a", "b"], a: 1};
          var t = {type: "text", accept: ["hasn't called", "has not called"]};
          return [G.check(c, 1), G.check(c, 0), G.check(c, null),
                  G.check(t, " Has not  called "), G.check(t, "hasn’t called"), G.check(t, "called"), G.check(t, "")];
        """)
        self.assertEqual(r, [True, False, False, True, True, False, False])

    def test_topic_answers_with_the_key_score_ten(self):
        r = run_js("""
          return T.map(function(t){
            var ans = t.items.map(function(it){ return it.type === "choice" ? it.a : it.accept[0]; });
            return G.score(t.items, ans).got;
          });
        """)
        self.assertTrue(all(x == 10 for x in r), r)


class MixedTest(unittest.TestCase):
    def test_mixed_takes_only_chosen_topics_without_repeats(self):
        r = run_js(SEEDED + """
          var ids = ["b1-past-perfect", "b2-wish", "a2-quantifiers"];
          var qs = G.mixed(T, ids, 20, rnd);
          var keys = qs.map(function(q){ return q.topic + "#" + q.i; });
          var uniq = {}; keys.forEach(function(k){ uniq[k] = 1; });
          return {n: qs.length, uniq: Object.keys(uniq).length,
                  topics: qs.map(function(q){ return q.topic; }).filter(function(x, i, a){ return a.indexOf(x) === i; }).sort()};
        """)
        self.assertEqual(r["n"], 20)
        self.assertEqual(r["uniq"], 20)
        self.assertEqual(r["topics"], ["a2-quantifiers", "b1-past-perfect", "b2-wish"])

    def test_mixed_is_capped_by_available_items(self):
        r = run_js(SEEDED + 'return G.mixed(T, ["a1-can"], 30, rnd).length;')
        self.assertEqual(r, 10)

    def test_mixed_by_level(self):
        r = run_js(SEEDED + """
          var ids = G.topicsByLevel(T, ["B2"]).map(function(t){ return t.id; });
          var qs = G.mixed(T, ids, 15, rnd);
          return qs.every(function(q){ return q.topic.indexOf("b2-") === 0; }) && ids.length > 5;
        """)
        self.assertTrue(r)


class SavedState(unittest.TestCase):
    def test_prune_drops_questions_whose_topic_or_item_is_gone(self):
        r = run_js("""
          var mix = {qs: [{topic: "a1-can", i: 0}, {topic: "gone-topic", i: 1}, {topic: "a1-can", i: 99}, {topic: "b2-wish", i: 3}],
                     ans: {"0": 1, "1": "x", "2": "y", "3": "hadn't said"}, checked: false};
          var p = G.prune(mix, T);
          return {qs: p.qs, ans: p.ans};
        """)
        self.assertEqual(r["qs"], [{"topic": "a1-can", "i": 0}, {"topic": "b2-wish", "i": 3}])
        self.assertEqual(r["ans"], {"0": 1, "1": "hadn't said"})

    def test_known_topic_ids_filters_stale_selection(self):
        r = run_js('return G.knownIds(T, ["a1-can", "gone-topic", "b2-wish"]);')
        self.assertEqual(r, ["a1-can", "b2-wish"])


class Scope(unittest.TestCase):
    def test_mixed_conditionals_are_not_taught(self):
        # Учитель попросил убрать смешанные условные: ни темы, ни правила, ни вопросов о них.
        r = run_js("""
          var hits = [];
          T.forEach(function(t){
            var blob = JSON.stringify(t).toLowerCase();
            if (/mixed|смешанн/.test(blob)) hits.push(t.id);
          });
          return {hits: hits, third: T.filter(function(t){ return t.id === "b2-conditional-3"; }).map(function(t){ return t.title; })};
        """)
        self.assertEqual(r["hits"], [])
        self.assertEqual(r["third"], ["Third conditional"])


class OlympiadMarks(unittest.TestCase):
    def test_marked_topics_exist_and_have_a_reason(self):
        r = run_js("""
          var ids = T.map(function(t){ return t.id; });
          return Object.keys(G.OLYMPIAD).map(function(k){ return [k, ids.indexOf(k) >= 0, !!G.OLYMPIAD[k]]; });
        """)
        self.assertGreaterEqual(len(r), 6)
        for tid, exists, reason in r:
            self.assertTrue(exists, tid)
            self.assertTrue(reason, tid)

    def test_marked_topics_go_first_inside_their_level(self):
        r = run_js("""
          var ordered = G.olympiadFirst(T.filter(function(t){ return t.level === "A2"; }));
          return ordered.map(function(t){ return !!G.OLYMPIAD[t.id]; });
        """)
        flags = r
        self.assertIn(True, flags)
        # сначала все отмеченные, потом остальные
        self.assertEqual(flags, sorted(flags, reverse=True))


class Page(unittest.TestCase):
    def test_page_loads_grammar(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        for l in LEVELS:
            self.assertIn('src="data/grammar/grammar-%s.js?v=' % l, html)
        self.assertIn('src="js/grammar.js?v=', html)
        self.assertIn('src="js/grammar-ui.js?v=', html)


if __name__ == "__main__":
    unittest.main()
