"""Настоящая работа муниципального этапа 2022/23 целиком: отдельный этап на вкладке Exam (файлы mock-*: так она называлась сначала).

Учитель 06.11: для пробника этот год слишком старый, пробник 16 ноября — по самой свежей работе 2025/26. Эта работа остаётся запасной,
поэтому её нет ни в отработке, ни в уроках. Слова сверяются с официальным файлом
(tests/fixtures/mock-mun-2223.txt), ключи ниже выписаны с отрисованных страниц файла ответов: верный вариант там жирным.
"""
import json
import pathlib
import re
import subprocess
import unicodedata
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")

KEYS = {
    "mock-l1": list("BBABAABABB"),
    "mock-l2": list("BCACB"),
    "mock-r1": list("CBDADACDBA"),
    "mock-r2": list("FBKGDAJEIC"),
    "mock-u1": ["having", "v", "if", "does", "a", "be", "v", "had", "up", "was", "being", "like", "v", "hardly", "been"],
    "mock-u2": ["to avoid being recognised/to avoid being recognized", "such long hair that", "unless I finish", "a sufficient amount of time",
                "quite a few people", "more than enough of", "is bound to get", "must have done", "is said to have taken", "had been driving for"],
    "mock-u3": ["excellent", "disadvantaged", "accessible", "encouraging", "applicants/applications", "discrimination", "selection", "mockery", "parental", "private"],
    "mock-u4": list("JEKAHMLFGB"),
}


def data():
    files = ["data/variant-mun-msk-25-26.js", "data/variant-mun-msk-23-24.js", "data/variant-mun-msk-22-23.js", "data/variant-reg-25-26.js", "data/variant.js",
             "data/howto.js", "data/howto-mun.js", "data/howto-reg.js", "data/practice-mun.js", "data/lessons.js", "js/check.js"]
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] + ["""JSON.stringify((function(){
      var V = window.VARIANTS.filter(function(x){ return x.id === "mun-msk-22-23"; })[0], C = window.Check, full = {};
      V.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.type === "writing") return;
        var sheet = {}; t.items.forEach(function(it){ sheet[it.n] = t.type === "choice" ? it.a[0] : it.accept[0]; });
        var s = C.score(t, sheet); full[t.id] = [s.got, s.max]; }); });
      return { order: window.VARIANTS.map(function(x){ return x.id; }), v: V, full: full, how: window.HOWTO.tasks, stages: window.HOWTO.stages,
               stops: [C.stopAfter(V, 0), C.stopAfter(V, 419)], practice: JSON.stringify(window.PRACTICE),
               l5: window.LESSONS.filter(function(l){ return l.id === "l5"; })[0] };
    })());"""])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


def norm(s):
    s = unicodedata.normalize("NFC", s).replace("’", "'").replace("‘", "'").replace("`", "'")
    s = re.sub(r"-\s*\n\s*", "-", s)
    s = re.sub(r"(?:_+\s*)+", "_ ", s)
    s = re.sub(r"\(\s+", "(", s)
    return re.sub(r"\s+", " ", s).strip()


class Mock(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.r = data()
        cls.tasks = {t["id"]: t for p in cls.r["v"]["parts"] for t in p["tasks"]}
        cls.paper = norm((ROOT / "tests" / "fixtures" / "mock-mun-2223.txt").read_text(encoding="utf-8"))

    def test_is_a_separate_variant_right_after_the_main_one(self):
        self.assertEqual(self.r["order"], ["mun-msk-25-26", "mun-msk-23-24", "mun-msk-22-23", "reg-2025-26", "final-2025-26"])
        self.assertEqual(self.r["v"]["title"], "Municipal 2022/23 · Moscow")
        self.assertNotIn("mock", self.r["v"])
        self.assertIn("variant-mun-msk-22-23.js?v=", HTML)
        self.assertLess(HTML.index("variant-mun-msk-25-26.js"), HTML.index("variant-mun-msk-22-23.js"))
        self.assertLess(HTML.index("variant-mun-msk-22-23.js"), HTML.index("variant-reg-25-26.js"))

    def test_parts_as_on_the_day(self):
        parts = [(p["title"], p["minutes"], p["max"]) for p in self.r["v"]["parts"]]
        self.assertEqual(parts, [("Listening", 15, 15), ("Reading", 45, 20), ("Use of English", 60, 45), ("Writing", 60, 20)])
        self.assertEqual(sum(len(t["items"]) for t in self.tasks.values() if t["type"] != "writing"), 80)

    def test_official_keys(self):
        for tid, want in KEYS.items():
            t = self.tasks[tid]
            got = [it["a"] if t["type"] == "choice" else it["accept"] for it in t["items"]]
            self.assertEqual(len(got), len(want), tid)
            for i, (g, w) in enumerate(zip(got, want)):
                self.assertEqual(sorted(x.lower() for x in g), sorted(x.lower() for x in w.split("/")), (tid, i + 1))
            self.assertEqual(self.r["full"][tid][0], self.r["full"][tid][1], tid)

    def test_every_word_is_in_the_official_paper(self):
        # Сегмент за сегментом: пункты, варианты, абзацы и инструкции — как в бумаге.
        bits = []
        for t in self.tasks.values():
            for k in ("intro", "textTitle", "outro", "pointsLabel"):
                # У текста Reading Task 2 в бумаге нет заголовка: «Text for items 11–20» — только подпись блока.
                if t.get(k) and not (t["id"] == "mock-r2" and k == "textTitle"):
                    bits.append(t[k])
            bits += t.get("points", [])
            for o in t.get("opts", []):
                if o["t"] not in ("True", "False"):
                    bits.append(o["t"])
            for e in t.get("examples", []):
                bits.append(e["show"])
            for it in t.get("items", []):
                for o in it.get("opts", []):
                    bits.append(o["t"])
                if it["q"].startswith("Gap ("):
                    continue
                if " — " in it["q"]:
                    first, word, second = it["q"].split(" — ")
                    bits += [first, word, second]
                else:
                    bits.append(it["q"])
            for p in t.get("text", []):
                bits += re.split(r"\(\d+\) _+\.?", p) if t["id"] == "mock-r2" else [p]
        bits.append("A journey of a thousand miles begins with a single step.")
        bits.append("Lao Tzu")
        missing = [b for b in bits if b.strip() and norm(b) not in self.paper]
        self.assertEqual(missing, [])
        self.assertIn("A journey of a thousand miles begins with a single step", self.tasks["mock-w1"]["premise"])
        self.assertIn("Lao Tzu", self.tasks["mock-w1"]["premise"])

    def test_nothing_from_the_paper_is_lost(self):
        # Обратная сверка: сумма слов задания равна сумме слов бумаги — ничего не выпало.
        w = lambda s: sorted(x for x in re.findall(r"[a-z]{2,}|[0-9]{3,}", norm(s).lower()) if x not in ("task", "points", "time", "minutes", "true", "false"))
        ours = []
        for t in self.tasks.values():
            for k in ("intro", "textTitle", "premise", "outro", "pointsLabel"):
                if t.get(k) and not (t["id"] == "mock-r2" and k == "textTitle"):
                    ours.append(t[k])
            ours += t.get("points", []) + t.get("text", [])
            for o in t.get("opts", []):
                if o["t"] not in ("True", "False"):
                    ours.append(o["t"])
            for e in t.get("examples", []):
                ours += [e["show"], e.get("answer", "")]
            for it in t["items"] if t.get("items") else []:
                if not it["q"].startswith("Gap ("):
                    ours.append(it["q"].replace(" — ", " "))
                ours += [o["t"] for o in it.get("opts", [])]
            if t.get("example"):
                ours.append(t["example"].replace(" — ", " ").replace("……………………. ", ""))
        paper = re.sub(r"\b(LISTENING|READING|USE OF ENGLISH|WRITING|Task \d( \(\d+ points\))?|Time: \d+ minutes \(\d+ points\)|Example:?)", " ", self.paper)
        # Ответ образца Task 3 в бумаге напечатан дважды: строкой «0 Naturally» и в самом пропуске.
        ours.append("Naturally")
        a, b = w(" ".join(ours)), w(paper)
        extra = [x for x in set(a + b) if a.count(x) != b.count(x)]
        self.assertEqual(sorted(extra), [], [(x, a.count(x), b.count(x)) for x in sorted(extra)])

    def test_recording_is_official_and_tasks_stop_at_each_other(self):
        self.assertEqual(self.r["v"]["audio"], "media/listening-mun-msk-22-23.mp3")
        self.assertTrue((ROOT / self.r["v"]["audio"]).is_file())
        self.assertEqual(self.tasks["mock-l1"]["audio"]["from"], 0)
        self.assertEqual(self.tasks["mock-l2"]["audio"]["from"], 419)
        self.assertEqual(self.r["stops"], [419, None])

    def test_writing_is_the_essay_without_a_title_box(self):
        w = self.tasks["mock-w1"]
        self.assertEqual(w["type"], "writing")
        self.assertEqual(w["words"], {"min": 200, "max": 250, "accMin": 180, "accMax": 275})
        self.assertNotIn("needsTitle", w)
        self.assertEqual(sum(c["max"] for c in w["criteria"]), 20)
        self.assertIn("(t.needsTitle ? '<input class=\"inp\" id=\"wTitle\"", HTML)

    def test_every_task_has_a_short_how_to_card_closed_in_the_timed_exam(self):
        for tid in self.tasks:
            how = self.r["how"][tid]
            self.assertTrue(how["what"], tid)
            self.assertGreaterEqual(len(how["steps"]), 2, tid)
        self.assertTrue(self.r["stages"]["mun-msk-22-23"]["note"])
        self.assertIn("(FULLMODE ? '' : ' open')", HTML)


class Mock2324(unittest.TestCase):
    """Пробник 16 ноября (учитель 06.11: «да давай другой год»): 2023/24, 10–11 классы. Самая свежая работа, которую Варя почти не видела:
    2025/26 и 2024/25 уже были на уроках и в домашках. Ключи — из файла ответов, Reading Task 1 — с отрисованных страниц (жирный)."""
    KEYS = {
        "p-l1-2324": list("BABBBBABAB"), "p-l2-2324": list("BBACA"),
        "p-r1-2324": list("ACBDAABBCD"), "p-r2-2324": list("HDJAEKCIFG"),
        "p-u1-2324": ["far", "have", "too", "V", "of", "within", "a", "V", "made", "be", "being", "of", "V", "remains", "it"],
        "p-u2-2324": ["for Suzy to reach", "will have gone off", "such terrible weather that", "take plenty of exercise/do plenty of exercise/have plenty of exercise/get plenty of exercise/take plenty of exercises/do plenty of exercises/have plenty of exercises/get plenty of exercises", "set off",
                 "was Vicki's favourite subject", "if it is sunny/if it gets sunny", "about time that he took/about time that he had/about time that he showed/about time that he expressed/about time he started taking/about time he started having/about time her husband took",
                 "would rather have gone", "would have the rubbish taken/would have the rubbish thrown/would have the rubbish cleaned"],
        "p-u3-2324": ["coproduction/co-production", "nervous", "refuel", "miscalculated", "disappearance", "discomfort", "underestimated",
                 "supersonic", "superhero", "overconfident"],
        "p-u4-2324": list("JEKAHMLFGB"),
    }

    @classmethod
    def setUpClass(cls):
        files = ["data/variant-mun-msk-25-26.js", "data/variant-mun-msk-23-24.js", "data/practice-mun.js", "data/explain-mun.js", "data/howto-mun.js", "data/lessons.js", "js/check.js"]
        src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] + ["""JSON.stringify((function(){
          var V = window.VARIANTS.filter(function(x){ return x.id === "mun-msk-23-24"; })[0], C = window.Check, full = {};
          V.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.type === "writing") return;
            var sheet = {}; t.items.forEach(function(it){ sheet[it.n] = t.type === "choice" ? it.a[0] : it.accept[0]; });
            var s = C.score(t, sheet); full[t.id] = [s.got, s.max]; }); });
          return { v: V, full: full, ex: window.EXPLAIN, how: window.HOWTO.tasks, stops: [C.stopAfter(V, 0), C.stopAfter(V, 500)], practice: JSON.stringify(window.PRACTICE),
                   l6: window.LESSONS.filter(function(l){ return l.id === "l6"; })[0] }; })());"""])
        cls.r = json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)
        cls.tasks = {t["id"]: t for p in cls.r["v"]["parts"] for t in p["tasks"]}

    def test_whole_paper_as_on_the_day_and_full_marks_with_the_key(self):
        parts = [(p["title"], p["minutes"], p["max"]) for p in self.r["v"]["parts"]]
        self.assertEqual(parts, [("Listening", 15, 15), ("Reading", 45, 20), ("Use of English", 60, 45), ("Writing", 60, 20)])
        self.assertEqual(self.r["v"]["title"], "Mock exam · Municipal 2023/24")
        self.assertEqual(self.r["v"]["audio"], "media/listening-mun-msk-23-24.mp3")
        self.assertTrue((ROOT / self.r["v"]["audio"]).is_file())
        self.assertEqual(self.r["stops"], [500, None])
        for tid, (got, mx) in self.r["full"].items():
            self.assertEqual(got, mx, tid)
        self.assertEqual(self.r["l6"]["links"][0]["href"], "#/full/p-l1-2324")

    def test_official_keys(self):
        for tid, want in self.KEYS.items():
            t = self.tasks[tid]
            got = [it["a"] if t["type"] == "choice" else it["accept"] for it in t["items"]]
            self.assertEqual(len(got), len(want), tid)
            for i, (g, w) in enumerate(zip(got, want)):
                self.assertEqual(sorted(norm(x).lower() for x in g), sorted(norm(x).lower() for x in re.split(r"[/;]", w)), (tid, i + 1))

    def test_words_are_the_official_ones_both_ways(self):
        w = lambda s: sorted(x for x in re.findall(r"[a-z]{2,}|[0-9]{3,}", norm(s).lower())
                             if x not in ("task", "points", "time", "minutes", "true", "false", "items", "questions", "for", "of", "use", "english", "the", "example"))
        ours = []
        for t in self.tasks.values():
            for k in ("intro", "textTitle", "textSubtitle", "premise", "outro", "pointsLabel", "example"):
                if t.get(k) and not (t["id"] == "p-r2-2324" and k == "textTitle"):
                    ours.append(t[k].replace(" — ", " ").replace("…………………….", ""))
            ours += t.get("points", []) + t.get("text", [])
            ours += [o["t"] for o in t.get("opts", []) if o["t"] not in ("True", "False")]
            for e in t.get("examples", []):
                ours += [e["show"], e.get("answer", "")]
            for it in t.get("items", []):
                if not it["q"].startswith("Gap ("):
                    ours.append(it["q"].replace(" — ", " "))
                ours += [o["t"] for o in it.get("opts", [])]
        paper = (ROOT / "tests" / "fixtures" / "mock-mun-2324.txt").read_text(encoding="utf-8")
        paper = re.sub(r"\b(LISTENING|READING|USE OF ENGLISH|WRITING)\b", " ", paper)
        a, b = w(" ".join(ours)), w(paper)
        diff = sorted({x for x in a + b if a.count(x) != b.count(x)})
        self.assertEqual(diff, [], [(x, a.count(x), b.count(x)) for x in diff])

    def test_answers_are_not_one_tap_away_during_the_timed_exam(self):
        # Ревью PR 70: «Show how to solve» заканчивается ответом и открывался в полном экзамене.
        self.assertIn("if (ex && (!FULLMODE || checked))", HTML)
        self.assertIn("(FULLMODE ? '' : ' open')", HTML)

    def test_every_task_has_a_card_and_listening_breakdowns_quote_the_recording(self):
        for tid in self.tasks:
            self.assertGreaterEqual(len(self.r["how"][tid]["steps"]), 2, tid)
        def text(s):
            s = unicodedata.normalize("NFC", s).replace("’", "'").replace("`", "'").replace("“", "").replace("”", "")
            return re.sub(r"\s+", " ", re.sub(r"-\s*\n\s*", "-", s))
        script = text((ROOT / "tests" / "fixtures" / "listening-mun-2324-script.txt").read_text(encoding="utf-8"))
        for tid in ("p-l1-2324", "p-l2-2324"):
            for it in self.tasks[tid]["items"]:
                e = self.r["ex"][tid][str(it["n"])]
                self.assertIn("Answer: " + it["a"][0], e)
                for q in re.findall(r'"([^"]+)"', e):
                    self.assertIn(text(q), script, (tid, it["n"]))

    def test_nothing_else_in_the_app_gives_this_paper_away(self):
        self.assertNotIn("2324", self.r["practice"])
        phrases = ["Naoise", "Lena Pillars", "Bismarck", "Mérimée", "Lewis Carroll", "Steve and Kelly", "for Suzy to reach", "will have gone off", "such terrible weather",
                   "set off a chain", "Gretna", "Athens of the North", "spin doctor", "Joneses", "p-l1-2324"]
        allowed = {"variant-mun-msk-23-24.js", "explain-mun.js", "howto-mun.js", "dict.js"}
        for f in sorted((ROOT / "data").glob("*.js")) + sorted((ROOT / "js").glob("*.js")):
            if f.name in allowed:
                continue
            text = f.read_text(encoding="utf-8").lower()
            found = [p for p in phrases if p.lower() in text]
            if f.name == "lessons.js":
                found = [p for p in found if p != "p-l1-2324"]  # ссылка урока 16 ноября
            self.assertEqual(found, [], f.name)


if __name__ == "__main__":
    unittest.main()
