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

    def test_warmups_do_not_give_away_answers_of_the_app_variants(self):
        # Ревью PR 27: Culture flash раскрывал 6 из 10 ответов Task 4 муниципального 2025/26,
        # а слова к теме «музыка» — ответ Task 3 (physicist). Разминка идёт ДО задания.
        files = ["data/variant-mun-msk-25-26.js", "data/variant-reg-25-26.js", "data/variant.js", "data/warmups.js"]
        src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] + ["""JSON.stringify((function(){
          var ans = [];
          window.VARIANTS.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(t){
            if (t.section !== "uoe") return;
            // В «лишнем слове» ответы — служебные слова (being, so, of): они есть в любом тексте.
            if ((t.examples || []).some(function(e){ return e.strike || e.correct; })) return;
            (t.items || []).forEach(function(it){
              (it.accept || []).forEach(function(a){ a = String(a).toLowerCase(); if (a.length >= 5) ans.push(a); });
              if (t.longOpts && it.q && it.q.length < 40) ans.push(it.q.toLowerCase().replace(/^the /, ""));
            });
          }); }); });
          // Обычные слова из инструкций — не подсказка: «listen», «learnt», «heart» —
          // ответы анаграмм финала, но встречаются в любом тексте.
          var COMMON = ["listen", "learnt", "heart"];
          var text = JSON.stringify(window.WARMUPS).toLowerCase();
          return ans.filter(function(a){ return COMMON.indexOf(a) < 0 && text.indexOf(a) >= 0; });
        })());"""])
        hits = json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)
        self.assertEqual(hits, [])

    def test_word_chips_save_the_whole_phrase(self):
        ui = (ROOT / "js" / "warmup-ui.js").read_text(encoding="utf-8")
        self.assertIn("data-wuword", ui)
        self.assertIn("A.words.offer", ui)
        self.assertIn("A.words = {", (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8"))
        self.assertIn("offer:", (ROOT / "js" / "vocab-ui.js").read_text(encoding="utf-8"))

    def test_split_by_stage_municipal_first_and_by_exam_part(self):
        # Учитель 12.10: «ничего не понимаю — раздели на муниципальные, региональные и всероссийские,
        # сейчас фокус на муниципальном». Внутри этапа — по частям экзамена, как на олимпиаде.
        r = run_js("""
          var bad = [], STAGES = ["mun", "reg", "final"], PARTS = ["any", "listening", "reading", "uoe", "writing", "speaking"];
          W.forEach(function(w){
            if (!Array.isArray(w.stages) || !w.stages.length || w.stages.some(function(s){ return STAGES.indexOf(s) < 0; })) bad.push(w.id + ": stages");
            if (PARTS.indexOf(w.part) < 0) bad.push(w.id + ": part");
          });
          var mun = W.filter(function(w){ return w.stages.indexOf("mun") >= 0; });
          var parts = {}; mun.forEach(function(w){ parts[w.part] = 1; });
          return {bad: bad, mun: mun.length, munSpeaking: mun.filter(function(w){ return w.part === "speaking"; }).length, parts: Object.keys(parts).sort()};
        """)
        self.assertEqual(r["bad"], [])
        self.assertGreaterEqual(r["mun"], 12)
        self.assertEqual(r["munSpeaking"], 0, "на муниципальном этапе нет устной части")
        for p in ["listening", "reading", "uoe", "writing"]:
            self.assertIn(p, r["parts"])
        ui = (ROOT / "js" / "warmup-ui.js").read_text(encoding="utf-8")
        self.assertIn("data-wustage", ui)
        self.assertIn('stage = "mun"', ui)
        self.assertNotIn("data-wufilter", ui)
        for label in ["💬 Talk", "✏️ Practice", "Municipal", "Regional", "Final"]:
            self.assertIn(label, ui)


if __name__ == "__main__":
    unittest.main()
