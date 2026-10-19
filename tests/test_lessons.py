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

    def test_lessons_have_pictures_and_games(self):
        # Учитель 19.10: «скучно, без картинок; больше интерактива, игр, чтобы что-то двигать;
        # в warm-up — спикинг». Картинки — бесплатные фото Unsplash (Pinterest — чужие права).
        r = run_js("""
          var bad = [], kinds = {};
          L.forEach(function(l){
            if (!/^https:\\/\\/images\\.unsplash\\.com\\/photo-/.test(l.cover || "")) bad.push(l.id + " cover");
            (l.steps || []).forEach(function(s, i){
              if (!/^https:\\/\\/images\\.unsplash\\.com\\/photo-/.test(s.image || "")) bad.push(l.id + " step " + i + " image");
              s.blocks.forEach(function(b){
                kinds[b.type] = 1;
                if (b.type === "sort") b.cards.forEach(function(c){ if (!b.buckets.some(function(x){ return x.id === c.b; })) bad.push("sort " + c.t); });
                if (b.type === "gapfill") Object.keys(b.key).forEach(function(g){
                  if (b.text.indexOf("[" + g + "]") < 0) bad.push("gap " + g);
                  if (!b.cards.some(function(c){ return c.k === b.key[g]; })) bad.push("gap card " + g);
                  if (!(b.why && b.why[g])) bad.push("gap why " + g); });
                if (b.type === "hookhunt") b.hooks.forEach(function(h){ if (b.text.indexOf(h) < 0) bad.push("hook " + h); });
                if (b.type === "binword") b.items.forEach(function(it){ if (it.extra && (" " + it.text + " ").indexOf(" " + it.extra + " ") < 0) bad.push("bin " + it.text); if (!it.why) bad.push("bin why"); });
              });
            });
          });
          var l2 = L.filter(function(x){ return x.id === "l2"; })[0];
          var warm = l2.steps[0].blocks.map(function(b){ return b.type; });
          return {bad: bad, kinds: Object.keys(kinds).sort(), warm: warm};
        """)
        self.assertEqual(r["bad"], [])
        # Учитель: «зумерское, мемы, стикеры» — мемы в формате эмодзи и текста (без чужих фото).
        for k in ["thisorthat", "speak", "binword", "hookhunt", "sort", "gapfill", "meme"]:
            self.assertIn(k, r["kinds"])
        self.assertIn("speak", r["warm"])
        self.assertIn("ls-sticker", (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8"))
        self.assertIn("thisorthat", r["warm"])
        ui = (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8")
        for hook in ["data-lsdrag", "data-lsdrop", "pointerdown", "elementFromPoint"]:
            self.assertIn(hook, ui)

    def test_every_step_renders_while_its_timer_runs(self):
        # Ревью PR 32: var left в игре «sort» затенял функцию таймера left(end) — шаг с идущим
        # таймером падал «left is not a function». Рисуем каждый шаг урока с запущенным таймером.
        stub = """
          var window = this, store = {};
          var el = function(){ return {textContent: "", appendChild: function(){}, classList: {add: function(){}, remove: function(){}}}; };
          var document = {createElement: el, head: {appendChild: function(){}}, body: {appendChild: function(){}},
                          addEventListener: function(){}, querySelectorAll: function(){ return []; }};
          var localStorage = {getItem: function(k){ return store[k] || null; }, setItem: function(k, v){ store[k] = v; }};
          var location = {hash: "#/lesson/l2"};
          window.addEventListener = function(){}; var setInterval = function(){};
          window.App = {esc: function(s){ return String(s); }, render: function(){}, keepScroll: function(f){ f(); }, routes: {}, words: {}};
        """
        src_files = [(ROOT / f).read_text(encoding="utf-8") for f in ["data/lessons.js"]]
        ui = (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8")
        js = stub + "\n".join(src_files) + """
          var errs = [];
          window.LESSONS.forEach(function(l){ (l.steps || []).forEach(function(s, i){
            var keys = [null];
            s.blocks.forEach(function(b, k){ if (b.type === "timer") keys.push(l.id + ":" + i + ":" + k); if (b.type === "speak") keys.push(l.id + ":" + i + ":" + k + "s"); });
            keys.forEach(function(key){
              var o = {}; o[l.id] = i;
              store["olymp-lessons"] = JSON.stringify({step: o, timer: key ? {key: key, end: Date.now() + 60000} : null});
              window.App.routes = {};
              (function(){ """ + ui + """ })();
              try { var html = window.App.routes.lesson(["lesson", l.id]); if (key && html.indexOf("ls-clock") < 0) errs.push(l.id + ":" + i + " no clock"); }
              catch (e) { errs.push(l.id + ":" + i + " timer " + key + ": " + e.message); }
            });
          }); });
          JSON.stringify(errs);
        """
        out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
        self.assertEqual(out.returncode, 0, out.stderr[-500:])
        self.assertEqual(json.loads(out.stdout), [])


if __name__ == "__main__":
    unittest.main()
