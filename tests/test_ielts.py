"""Вкладка IELTS: разговорная практика по темам IELTS Speaking (учитель 25.11.2026).

После муниципального этапа — «а-ля репетиционная разговорная практика», одна тема на урок:
сначала Success and ambition. Урок — тем же движком, что и вкладка Lesson (js/lesson-ui.js),
но уроки свои (data/ielts.js) и список свой: олимпиадные уроки там не смешиваются.
"""
import json
import pathlib
import re
import unittest

from test_lessons import ROOT, render_step

HTML = (ROOT / "index.html").read_text(encoding="utf-8")
IELTS_SRC = (ROOT / "data" / "ielts.js").read_text(encoding="utf-8") if (ROOT / "data" / "ielts.js").exists() else ""


def ielts(lesson_id, step, **kw):
    return render_step(lesson_id, step, pre=IELTS_SRC, **kw)


def data():
    out = ielts("l7", 0, expose="{lessons: window.IELTS, tasks: window.PRACTICE['ielts-1'] && window.PRACTICE['ielts-1'].all}")
    return out["exposed"]


class IeltsTab(unittest.TestCase):
    def test_tab_after_lesson_and_script_before_engine(self):
        tabs = re.findall(r'\{ href: "(#/[a-z]*)", icon: "[^"]+", label: "([^"]+)"', HTML)
        self.assertEqual(tabs[:2], [("#/lesson", "Lesson"), ("#/ielts", "IELTS")])
        self.assertIn('src="data/ielts.js?v=', HTML)
        self.assertLess(HTML.index('src="data/ielts.js?v='), HTML.index('src="js/lesson-ui.js?v='))

    def test_lists_are_separate(self):
        out = ielts("l7", 0, expose="{ielts: window.App.routes.ielts(['ielts']), lesson: window.App.routes.lesson(['lesson'])}")["exposed"]
        self.assertIn('href="#/ielts/i1"', out["ielts"])
        self.assertNotIn("#/lesson/", out["ielts"])
        self.assertNotIn("i1", re.findall(r'href="#/lesson/([^"]+)"', out["lesson"]))
        self.assertIn('href="#/lesson/l7"', out["lesson"])
        # Проверка PR 87: урок IELTS открывается только во вкладке IELTS, а не под подсвеченной вкладкой Lesson.
        typed = ielts("i1", 0, expose="window.App.routes.lesson(['lesson', 'i1'])")["exposed"]
        self.assertNotIn("Success and ambition</h1>", typed)

    def test_lesson_page_leads_back_to_ielts(self):
        out = ielts("i1", 0, expose="window.App.routes.ielts(['ielts', 'i1'])")["exposed"]
        self.assertIn('href="#/ielts"', out)
        self.assertNotIn('href="#/lesson"', out)
        self.assertIn("Success and ambition", out)
        last = len(data()["lessons"][0]["steps"]) - 1
        end = ielts("i1", last, expose="window.App.routes.ielts(['ielts', 'i1'])")["exposed"]
        self.assertIn('<a class="ghost" href="#/ielts"', end, "Finish ведёт в список IELTS")


class SuccessAndAmbition(unittest.TestCase):
    def setUp(self):
        d = data()
        self.l = [x for x in d["lessons"] if x["id"] == "i1"][0]
        self.tasks = {t["id"]: t for t in d["tasks"]}

    def test_one_goal_and_one_hour(self):
        self.assertEqual(len(self.l["aims"]), 1)
        self.assertTrue(self.l["aims"][0].startswith("🎯 Goal:"))
        mins = sum(s["minutes"] for s in self.l["steps"] if not s.get("home"))
        self.assertEqual(mins, 60)

    def test_sections_in_order(self):
        self.assertEqual([s["title"] for s in self.l["steps"]],
                         ["Chat", "How IELTS Speaking works", "Picture talk", "Words", "Upgrade the answer", "Part 2", "Part 3", "Fix it", "Homework"])
        hw = self.l["steps"][-1]
        self.assertTrue(hw.get("home"))
        self.assertEqual(hw.get("tries"), 2)

    def test_words_match_has_twelve_expressions_with_valid_keys(self):
        t = self.tasks["i1-words"]
        keys = [o["k"] for o in t["opts"]]
        self.assertEqual(len(t["items"]), 12)
        self.assertEqual(sorted(it["a"][0] for it in t["items"]), sorted(keys), "каждое значение — ровно одному выражению")

    def test_homework_hints_do_not_give_the_answer(self):
        t = self.tasks["i1-home"]
        block = [b for b in self.l["steps"][-1]["blocks"] if b["type"] == "minitask"][0]
        opts = {o["k"]: o["t"] for o in t["opts"]}
        for it in t["items"]:
            hint, why = block["help"][str(it["n"])]
            self.assertNotIn(opts[it["a"][0]].lower(), hint.lower(), it["n"])
            self.assertTrue(why)
            self.assertIn("______", it["q"])

    def test_every_section_renders_in_english(self):
        for i in range(len(self.l["steps"])):
            html = ielts("i1", i, expose="window.App.routes.ielts(['ielts', 'i1'])")["exposed"]
            self.assertIn("Section %d of %d" % (i + 1, len(self.l["steps"])), html)
            self.assertNotRegex(html, "[А-Яа-яЁё]", "на экране только английский")
            self.assertNotIn("undefined", html)

    def test_homework_two_tries(self):
        hw = len(self.l["steps"]) - 1
        k = [j for j, b in enumerate(self.l["steps"][-1]["blocks"]) if b["type"] == "minitask"][0]
        key = "i1:%d:%d" % (hw, k)
        page = "window.App.routes.ielts(['ielts', 'i1'])"
        wrong = [["type", "lmsel", "%s:%d" % (key, n), "A"] for n in range(8)]  # «A» не подходит ни к одному пропуску
        first = ielts("i1", hw, events=wrong + [["click", "lstry", key]], expose=page)["exposed"]
        self.assertEqual(first.count('class="why hint"'), 8, "первая ошибка — подсказка")
        self.assertNotIn("✗ Answer", first, "ответа после первой попытки нет")
        second = ielts("i1", hw, events=wrong + [["click", "lstry", key], ["click", "lstry", key]], expose=page)["exposed"]
        self.assertIn("✗ Answer", second)


if __name__ == "__main__":
    unittest.main()
