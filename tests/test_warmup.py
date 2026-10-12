"""Warm-ups — разминки на 5–10 минут перед уроком или заданием (просьба учителя 12.10).

Два вида: разговор на тему из настоящих олимпиадных текстов (на муниципальном этапе нет
устной части — поэтому разговор и есть Speaking) и короткая тренировка навыка перед
конкретным заданием олимпиады. Ответы спрятаны, сделанная разминка засчитывает день 🔥.
"""
import json
import pathlib
import re
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


def run_js(body):
    src = "\n".join(["var window = this;", (ROOT / "data" / "warmups.js").read_text(encoding="utf-8"),
                     "JSON.stringify((function(){ var W = window.WARMUPS; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


class Warmups(unittest.TestCase):
    def test_tab_is_second_after_exam(self):
        tabs = re.findall(r'\{ href: "(#/[a-z]*)", icon: "[^"]+", label: "([^"]+)"', HTML)
        self.assertEqual([t[0] for t in tabs], ["#/", "#/warmup", "#/lexis", "#/grammar", "#/words", "#/results"])
        self.assertIn('src="data/warmups.js?v=', HTML)
        self.assertIn('src="js/warmup-ui.js?v=', HTML)

    def test_every_warmup_is_complete(self):
        r = run_js("""
          var bad = [], ids = {};
          W.forEach(function(w){
            if (ids[w.id]) bad.push("dup " + w.id); ids[w.id] = 1;
            if (!w.title || !w.goal || !w.minutes || !w.before || !w.steps || w.steps.length < 2) bad.push(w.id + ": header");
            if (w.kind === "talk") { if (!w.questions || w.questions.length < 5) bad.push(w.id + ": questions"); if (!w.words || w.words.length < 5) bad.push(w.id + ": words"); }
            else if (w.kind === "drill") { if (!w.items || w.items.length < 5) bad.push(w.id + ": items");
              (w.items || []).forEach(function(it, i){ if (!it.q || !it.a) bad.push(w.id + "#" + i); }); }
            else bad.push(w.id + ": kind");
          });
          return {bad: bad, talk: W.filter(function(w){ return w.kind === "talk"; }).length, drill: W.filter(function(w){ return w.kind === "drill"; }).length};
        """)
        self.assertEqual(r["bad"], [])
        self.assertGreaterEqual(r["talk"], 10)
        self.assertGreaterEqual(r["drill"], 8)

    def test_all_in_english(self):
        src = (ROOT / "data" / "warmups.js").read_text(encoding="utf-8")
        lines = [l for l in src.splitlines() if not l.strip().startswith("//")]
        self.assertEqual([l for l in lines if re.search(r"[А-Яа-яЁё]", l)], [])

    def test_answers_hidden_and_done_counts_for_the_streak(self):
        ui = (ROOT / "js" / "warmup-ui.js").read_text(encoding="utf-8")
        self.assertIn("<details", ui)
        self.assertIn("A.markActivity", ui)
        self.assertIn('class="howto"', ui)

    def test_useful_words_have_translations(self):
        # «Tap a word to save it to My words»: перевод должен подставиться сам, и у слова, и у фразы целиком.
        src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in ["data/warmups.js", "data/dict.js", "js/vocab.js"]] +
                        ["JSON.stringify((function(){ var bad = []; window.WARMUPS.forEach(function(w){ (w.words || []).forEach(function(x){"
                         " if (!window.Vocab.lookup(x, window.DICT)) bad.push(w.id + ': ' + x); }); }); return bad; })());"])
        bad = json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)
        self.assertEqual(bad, [])


if __name__ == "__main__":
    unittest.main()
