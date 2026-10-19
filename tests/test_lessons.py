"""Вкладка Lesson: занятия по плану подготовки к муниципальному этапу (21.11.2026), по датам.

Учитель 19.10: урок как на платформе вроде ProgressMe — по шагам (PPP: presentation, practice,
production), 50 минут, всё на английском и без комментариев для учителя (это приложение ученицы,
учитель показывает его через демонстрацию экрана), с настоящими олимпиадными заданиями внутри.
"""
import json
import pathlib
import re
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


def run_js(body):
    files = ["data/variant-mun-msk-25-26.js", "data/practice-mun.js", "data/explain-mun.js", "data/lessons.js"]
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] +
                    ["JSON.stringify((function(){ var L = window.LESSONS, V = window.VARIANTS[0], P = window.PRACTICE['mun-msk-25-26'], E = window.EXPLAIN; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


class Lessons(unittest.TestCase):
    def test_lesson_tab_comes_first(self):
        tabs = re.findall(r'\{ href: "(#/[a-z]*)", icon: "[^"]+", label: "([^"]+)"', HTML)
        self.assertEqual([t[0] for t in tabs], ["#/lesson", "#/", "#/lexis", "#/grammar", "#/words", "#/results"])
        for f in ["data/lessons.js", "js/lesson-ui.js"]:
            self.assertIn('src="' + f + '?v=', HTML)

    def test_plan_dates_until_the_olympiad(self):
        r = run_js("return L.map(function(l){ return [l.id, l.date, l.title, (l.steps || []).length]; });")
        dates = [x[1] for x in r]
        self.assertEqual(dates, sorted(dates))
        self.assertIn("2026-10-19", dates)
        self.assertTrue(all(d < "2026-11-21" for d in dates))
        self.assertTrue(all(x[2] for x in r))

    def test_todays_lesson_is_a_full_50_minute_ppp_lesson(self):
        r = run_js("""
          var l = L.filter(function(x){ return x.date === "2026-10-19"; })[0];
          return {mins: l.steps.reduce(function(a, s){ return a + s.minutes; }, 0), kinds: l.steps.map(function(s){ return s.stage; }),
                  blocks: l.steps.map(function(s){ return s.blocks.length; })};
        """)
        self.assertEqual(r["mins"], 50)
        for st in ["warm-up", "presentation", "practice", "production", "wrap-up"]:
            self.assertIn(st, r["kinds"])
        self.assertTrue(all(n >= 1 for n in r["blocks"]))

    def test_quizzes_valid_and_links_lead_to_real_tasks(self):
        r = run_js("""
          var bad = [], ids = {};
          V.parts.forEach(function(p){ p.tasks.forEach(function(t){ ids[t.id] = 1; }); });
          Object.keys(P).forEach(function(k){ P[k].forEach(function(t){ ids[t.id] = 1; }); });
          L.forEach(function(l){ (l.steps || []).forEach(function(s){ s.blocks.forEach(function(b){
            if (b.type === "quiz") b.items.forEach(function(it, i){
              if (!(it.opts && it.opts.length >= 2 && it.a >= 0 && it.a < it.opts.length && it.why)) bad.push(l.id + " quiz " + i); });
            if (b.type === "task" && !ids[b.task]) bad.push(l.id + " task " + b.task);
            if (b.type === "links") b.items.forEach(function(x){ var m = /^#\\/t\\/(.+)$/.exec(x.href); if (m && !ids[m[1]]) bad.push(l.id + " link " + x.href); });
          }); }); (l.links || []).forEach(function(x){ var m = /^#\\/t\\/(.+)$/.exec(x.href); if (m && !ids[m[1]]) bad.push(l.id + " link " + x.href); });
          });
          return bad;
        """)
        self.assertEqual(r, [])

    def test_real_task_has_a_breakdown_for_every_gap(self):
        r = run_js("""
          var t = null; V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") t = x; }); });
          return t.items.filter(function(it){ return (E["m-r2"][it.n] || "").indexOf("Answer: " + it.a[0]) < 0; }).map(function(it){ return it.n; });
        """)
        self.assertEqual(r, [])

    def test_all_in_english_no_teacher_notes(self):
        src = (ROOT / "data" / "lessons.js").read_text(encoding="utf-8")
        lines = [l for l in src.splitlines() if not l.strip().startswith("//")]
        self.assertEqual([l for l in lines if re.search(r"[А-Яа-яЁё]", l)], [])
        self.assertNotRegex(src.lower(), r"teacher note|for the teacher|tip for teacher")

    def test_task_page_leads_back_to_the_lesson(self):
        self.assertIn("window.App.taskTop", HTML)
        self.assertIn("Back to the lesson", (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
