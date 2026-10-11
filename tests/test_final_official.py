"""Финал ВсОШ 2025/26 — как в официальных карточках и критериях (сверка 11.10).

Ключи и тексты сверены и совпали; здесь — то, что сверка нашла неполным:
порядок заданий у второго участника Speaking, строки карточек, сноски критериев,
плеер, который проигрывал следующее задание без остановки.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


def run_js(body):
    files = ["data/variant-mun-msk-25-26.js", "data/variant.js", "data/howto.js", "js/check.js"]
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] +
                    ["JSON.stringify((function(){ var V = window.VARIANT, C = window.Check, H = window.HOWTO; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


def task(tid):
    return """var T = null; V.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.id === "%s") T = t; }); });""" % tid


class Speaking(unittest.TestCase):
    def test_second_student_listens_first_then_gives_the_monologue(self):
        # Карточка Set 2: Task 1 — слушать партнёра и задать вопросы, Task 2 — свой монолог.
        r = run_js(task("speaking-1") + "return T.cards.map(function(c){ return !!c.partnerFirst; });")
        self.assertEqual(r, [False, True])
        self.assertIn("card.partnerFirst", HTML)

    def test_card_lines_from_the_official_card(self):
        r = run_js(task("speaking-1") + "return {t: T.timing, places: T.cards.map(function(c){ return c.place; }), sub: T.cards.map(function(c){ return c.fact[c.fact.length - 1][2]; })};")
        self.assertEqual(r["t"]["total"], "10 minutes")
        self.assertIn("depending on the duration of a video clip", r["t"]["monologue"])
        self.assertEqual(r["places"], ["Новый Орлеан", "МАСЛЕНИЦА"])
        self.assertEqual(r["sub"], ["Символ культурного наследия:"] * 2)
        self.assertIn("YOUR ANSWERS WILL BE RECORDED", (ROOT / "data" / "variant.js").read_text(encoding="utf-8"))
        self.assertIn("Presentation and questions", HTML)

    def test_criteria_footnotes(self):
        r = run_js(task("speaking-1") + "return T.note;")
        for part in ["50%", "WH-questions", "partner's fact file", "look it up on the Internet"]:
            self.assertIn(part, r)


class Writing(unittest.TestCase):
    def test_copying_note(self):
        r = run_js(task("writing-1") + "return T.note;")
        self.assertIn("30%", r)


class HowTo(unittest.TestCase):
    def test_example_zero_uses_the_official_definition(self):
        r = run_js('return H.tasks["uoe-1"].example;')
        self.assertIn("used to symbolise desolation or an awkward silence", r)


class Player(unittest.TestCase):
    def test_each_task_stops_where_the_next_one_starts(self):
        # Task 2 официально звучит ОДИН раз — без остановки плеер сразу играл Task 3.
        r = run_js("return [C.stopAfter(V, 0), C.stopAfter(V, 622), C.stopAfter(V, 864), C.stopAfter(V, 973)];")
        self.assertEqual(r, [622, 864, None, None])
        self.assertIn("C.stopAfter(V, sec)", HTML.replace("window.Check", "C"))

    def test_stop_is_recomputed_from_any_position(self):
        # Ревью PR 25: после паузы ▶ играл Task 2 и без остановки Task 3; перемотка за границу
        # ставила паузу в случайном месте и отключала остановку совсем.
        r = run_js("return [C.stopAfter(V, 622), C.stopAfter(V, 700), C.stopAfter(V, 10), C.stopAfter(V, 900)];")
        self.assertEqual(r, [864, 864, 622, None])
        for hook in ['addEventListener("play", resyncStop)', 'addEventListener("seeked", resyncStop)']:
            self.assertIn(hook, HTML)


if __name__ == "__main__":
    unittest.main()
