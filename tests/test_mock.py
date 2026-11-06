"""Пробник: настоящая работа муниципального этапа 2022/23 целиком (учитель 06.11: «да» — к уроку 9 ноября).

Год держали для пробника, поэтому его нет ни в отработке, ни в уроках. Слова сверяются с официальным файлом
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
    files = ["data/variant-mun-msk-25-26.js", "data/variant-mun-msk-22-23.js", "data/variant-reg-25-26.js", "data/variant.js",
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
        self.assertEqual(self.r["order"], ["mun-msk-25-26", "mun-msk-22-23", "reg-2025-26", "final-2025-26"])
        self.assertIn("Mock exam", self.r["v"]["title"])
        self.assertIn("2022/23", self.r["v"]["title"])
        self.assertTrue(self.r["v"].get("mock"))
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

    def test_every_task_has_a_short_how_to_card_closed_in_the_mock(self):
        for tid in self.tasks:
            how = self.r["how"][tid]
            self.assertTrue(how["what"], tid)
            self.assertGreaterEqual(len(how["steps"]), 2, tid)
        self.assertTrue(self.r["stages"]["mun-msk-22-23"]["note"])
        self.assertIn("(V.mock ? '' : ' open')", HTML)

    def test_nothing_else_in_the_app_gives_the_mock_away(self):
        # Ревью PR 62: цитата эссе и пункты Task 4 были в разминках, ответ Task 2 — в таблице урока 23.10, пословица — в разборе.
        phrases = ["Lost Gardens of Heligan", "thousand miles", "Blarney", "Smithsonian", "Ashmolean", "the Fringe", "Anorak", "on the dole",
                   "Early to bed", "East is East", "Haseltine", "being recognised", "long hair that", "bound to get", "been driving for",
                   "more than enough of", "sufficient amount", "unless I finish", "must have done", "said to have taken", "Leonardo"]
        for f in sorted((ROOT / "data").glob("*.js")) + sorted((ROOT / "js").glob("*.js")):
            if f.name in ("variant-mun-msk-22-23.js", "dict.js"):
                continue
            text = f.read_text(encoding="utf-8").lower()
            self.assertEqual([p for p in phrases if p.lower() in text], [], f.name)
        # Год называем только как пробник: не «задания 2022/23» в разминках и таблицах.
        for name in ("warmups.js", "lessons.js", "explain-mun.js"):
            text = (ROOT / "data" / name).read_text(encoding="utf-8")
            lines = [l for l in text.split("\n") if "2022/23" in l and "Mock exam" not in l and not l.strip().startswith("//")]
            self.assertEqual(lines, [], name)

    def test_lesson_of_9_november_says_to_do_it_first(self):
        self.assertEqual(self.r["l5"]["date"], "2026-11-09")
        self.assertIn("Mock exam · Municipal 2022/23", " ".join(self.r["l5"]["aims"]))


if __name__ == "__main__":
    unittest.main()
