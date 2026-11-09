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


HTML_INDEX = (ROOT / "index.html").read_text(encoding="utf-8")


def run_js(body):
    files = ["data/variant-mun-msk-25-26.js", "data/variant-mun-msk-23-24.js", "data/variant-mun-msk-22-23.js", "data/practice-mun.js", "data/explain-mun.js", "data/lessons.js"]
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
        # Урок Reading перенесён учителем с 19.10 на 22.10, а затем на 23.10 («занятие, оказывается, сегодня»).
        self.assertIn("2026-10-23", dates)
        self.assertNotIn("2026-10-22", dates)
        self.assertTrue(all(d < "2026-11-21" for d in dates))
        self.assertTrue(all(x[2] for x in r))

    def test_todays_lesson_is_a_full_50_minute_ppp_lesson(self):
        r = run_js("""
          var l = L.filter(function(x){ return x.date === "2026-10-23"; })[0];
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
          var bad = t.items.filter(function(it){ return (E["m-r2"][it.n] || "").indexOf("Answer: " + it.a[0]) < 0; }).map(function(it){ return it.n; });
          // Домашний пирог: тот же «💡 Show how to solve» под каждым пропуском.
          var h = null; Object.keys(P).forEach(function(k){ P[k].forEach(function(x){ if (x.id === "p-r2-2425") h = x; }); });
          if (!h) return ["no p-r2-2425"];
          return bad.concat(h.items.filter(function(it){ return (E["p-r2-2425"] && E["p-r2-2425"][it.n] || "").indexOf("Answer: " + it.a[0]) < 0; }).map(function(it){ return "pie " + it.n; }));
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
        # в warm-up — спикинг». Картинки — мемы, которые выбрала учитель (media/memes).
        r = run_js("""
          var bad = [], kinds = {}, pics = [];
          L.forEach(function(l){
            // Учитель 22.10 прислала свои мемы-картинки (affirmation memes) — они лежат в media/memes.
            if (!/^media\\/memes\\/.+\\.jpg$/.test(l.cover || "")) bad.push(l.id + " cover"); else pics.push(l.cover);
            (l.steps || []).forEach(function(s, i){
              if (!/^media\\/memes\\/.+\\.jpg$/.test(s.image || "")) bad.push(l.id + " step " + i + " image"); else pics.push(s.image);
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
          return {bad: bad, kinds: Object.keys(kinds).sort(), warm: warm, pics: pics};
        """)
        self.assertEqual(r["bad"], [])
        self.assertEqual([p for p in r["pics"] if not (ROOT / p).is_file()], [])
        # Картинки — только те, что прислала учитель (media/memes), и каждая где-то стоит.
        # m18 — в запасе: раздел «итог», где она стояла, учитель 27.10 убрала; пойдёт в следующий урок.
        SPARE = {"media/memes/m18-all-good.jpg", "media/memes/m06-succeed.jpg"}
        files = sorted("media/memes/" + f.name for f in (ROOT / "media" / "memes").glob("*.jpg"))
        self.assertEqual(sorted(set(r["pics"]) | SPARE), files, "каждая картинка учителя — на своём месте")
        # Обложка урока видна только в списке уроков, поэтому может стать и картинкой шага;
        # но внутри урока шаги друг друга не повторяют.
        steps = run_js("return L.map(function(l){ return (l.steps || []).map(function(s){ return s.image; }); });")
        self.assertEqual([s for s in steps if len(set(s)) != len(s)], [])
        # Учитель: «зумерское, мемы, стикеры» — мемы в формате эмодзи и текста (без чужих фото).
        for k in ["thisorthat", "speak", "binword", "hookhunt", "sort", "gapfill", "meme"]:
            self.assertIn(k, r["kinds"])
        self.assertIn("speak", r["warm"])
        # Мемы показываются целиком, без обрезки и без наших стикеров поверх надписей.
        self.assertIn("object-fit:contain", (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8"))
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


# Официальный ключ Reading Task 2 муниципального этапа Москвы 2024/25
# (ans-engl-10-11-mun-msk-24-25.pdf, всош.цпм.рф): пропуски 1–10, лишнее — H.
KEY_2425 = "GBKEIDCAJF"
TASK_FILES = ["data/variant-mun-msk-25-26.js", "data/variant-mun-msk-22-23.js", "data/practice-mun.js", "data/explain-mun.js"]
# Учитель 22.10: «поменяем местами» — на уроке разбираем текст 2025/26 про будильник (m-r2),
# а пирог Цветаевой 2024/25 — домашнее задание на 15 минут (отработка p-r2-2425).
IN_CLASS, HOMEWORK = "m-r2", "p-r2-2425"


def render_step(lesson_id, step, clicks=(), typed=(), with_store=False, events=(), init=None, pre="", expose=None):
    """HTML шага урока, как его рисует js/lesson-ui.js; clicks — data-атрибуты кнопок, нажатых по порядку,
    typed — [data-pin поля, что напечатали] по порядку."""
    stub = """
      var window = this, store = {}, handlers = [], inputs = [];
      var el = function(){ return {textContent: "", appendChild: function(){}, classList: {add: function(){}, remove: function(){}}}; };
      var document = {createElement: el, head: {appendChild: function(){}}, body: {appendChild: function(){}},
                      addEventListener: function(t, f){ if (t === "click") handlers.push(f); if (t === "input") inputs.push(f); }, querySelectorAll: function(){ return []; },
                      querySelector: function(){ return null; }};
      var localStorage = {getItem: function(k){ return store[k] || null; }, setItem: function(k, v){ store[k] = v; }};
      var location = {hash: "#/lesson/LID"};
      window.addEventListener = function(){}; var setInterval = function(){}; window.scrollTo = function(){};
      window.App = {esc: function(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); },
                    render: function(){}, keepScroll: function(f){ f(); }, routes: {}, words: {}};
    """.replace("LID", lesson_id)
    clicks_js = json.dumps(list(clicks))
    js = stub + pre + "".join((ROOT / f).read_text(encoding="utf-8") for f in TASK_FILES) + (ROOT / "data" / "lessons.js").read_text(encoding="utf-8") + """
      var o = {}; o["LID"] = STEP; var st0 = INIT; st0.step = o; store["olymp-lessons"] = JSON.stringify(st0);
    """.replace("LID", lesson_id).replace("STEP", str(step)).replace("INIT", json.dumps(init or {})) + (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8") + """
      JSON.parse(TYPED).forEach(function(t){
        var ds = {}; if (t.length === 3) ds[t[0]] = t[1]; else ds.pin = t[0];
        var el = {dataset: ds, value: t[t.length - 1], tagName: "INPUT", classList: {contains: function(){ return false; }}};
        inputs.forEach(function(h){ h({target: el}); });
      });
      JSON.parse(CLICKS).forEach(function(c){
        var ds = {}; ds[c[0]] = c[1];
        var btn = {dataset: ds, closest: function(sel){ return sel === "button" ? btn : null; }};
        handlers.forEach(function(h){ h({target: btn}); });
      });
      var btns = {};
      JSON.parse(EVENTS).forEach(function(ev){
        var ds = {}; ds[ev[1]] = ev[2];
        if (ev[0] === "type") { var el = {dataset: ds, value: ev[3], tagName: "INPUT", classList: {contains: function(){ return false; }}};
                                inputs.forEach(function(h){ h({target: el}); }); }
        else {
          var id = ev[1] + "=" + ev[2], btn = btns[id];
          if (!btn) { btn = btns[id] = {dataset: ds, textContent: ""}; btn.closest = function(sel){ return sel === "button" ? btn : null; }; }
          handlers.forEach(function(h){ h({target: btn}); });
        }
      });
      var html = window.App.routes.lesson(["lesson", "LID"]);
      WITH ? JSON.stringify({html: html, store: store, exposed: EXPOSE}) : html;
    """.replace("CLICKS", json.dumps(clicks_js)).replace("TYPED", json.dumps(json.dumps(list(typed)))) \
       .replace("WITH", "true" if with_store or expose else "false").replace("EXPOSE", expose or "null").replace("EVENTS", json.dumps(json.dumps(list(events)))).replace("LID", lesson_id)
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
    if out.returncode:
        raise AssertionError(out.stderr[-500:])
    return json.loads(out.stdout) if with_store or expose else out.stdout


SHEET = "l2:1:1"  # лист настоящего задания: урок l2, шаг 2, блок 2


def sheet_session(actions, paper=None):
    """Шаг 2 урока l2 с моделью страницы: поля пропусков и таблицы — объекты с value и классами,
    события ввода, клавиш, фокуса и кликов идут в обработчики js/lesson-ui.js как в браузере.
    actions: ["input", n, "pin"|"cell", текст] · ["key", n, где, code, key] · ["click", атрибут, значение]."""
    init = {"step": {"l2": 1}}
    if paper is not None:
        init["paper"] = paper
    js = """
      var window = this, store = {}, H = {}, els = [], active = null, btns = {}, prevented = [];
      store["olymp-lessons"] = INIT;
      function on(t, f){ (H[t] = H[t] || []).push(f); }
      function fire(t, ev){ (H[t] || []).forEach(function(h){ h(ev); }); }
      function mk(cls, pin, val){
        var cl = {}; cls.split(" ").forEach(function(c){ if (c) cl[c] = 1; });
        var el = {tagName: "INPUT", dataset: {pin: pin}, value: val, cl: cl,
          classList: {contains: function(c){ return !!cl[c]; }, toggle: function(c, f){ if (f) cl[c] = 1; else delete cl[c]; },
                      add: function(c){ cl[c] = 1; }, remove: function(c){ delete cl[c]; }},
          focus: function(){ active = el; fire("focusin", {target: el}); }, select: function(){ el.selected = true; }};
        return el;
      }
      var el0 = function(){ return {textContent: "", appendChild: function(){}, classList: {add: function(){}, remove: function(){}}}; };
      var document = {createElement: el0, head: {appendChild: function(){}}, body: {appendChild: function(){}}, addEventListener: on,
        querySelectorAll: function(sel){ var m = /^\\[data-pin\\^="([^"]+)"\\]$/.exec(sel); return m ? els.filter(function(x){ return x.dataset.pin.indexOf(m[1]) === 0; }) : []; },
        querySelector: function(sel){ var m = /^\\.ls-cell\\[data-pin="([^"]+)"\\]$/.exec(sel);
          return m ? els.filter(function(x){ return x.cl["ls-cell"] && x.dataset.pin === m[1]; })[0] || null : null; }};
      var localStorage = {getItem: function(k){ return store[k] || null; }, setItem: function(k, v){ store[k] = v; }};
      var location = {hash: "#/lesson/l2"};
      window.addEventListener = function(){}; var setInterval = function(){}; window.scrollTo = function(){};
      function paint(){
        var html = window.App.routes.lesson(["lesson", "l2"]);
        els = []; html.replace(/<input class="([^"]*)" data-pin="([^"]+)"[^>]*value="([^"]*)"/g, function(_, c, p, v){ els.push(mk(c, p, v)); });
        return html;
      }
      window.App = {esc: function(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); },
                    render: function(){ paint(); }, keepScroll: function(f){ f(); }, routes: {}, words: {}};
    """.replace("INIT", json.dumps(json.dumps(init)))
    js += "".join((ROOT / f).read_text(encoding="utf-8") for f in TASK_FILES + ["data/lessons.js", "js/lesson-ui.js"])
    js += """
      paint();
      function find(n, kind){ return els.filter(function(x){ return x.dataset.pin === "SHEET:" + n && x.cl[kind === "cell" ? "ls-cell" : "ls-pin"]; })[0]; }
      JSON.parse(ACTIONS).forEach(function(a){
        if (a[0] === "input") { var el = find(a[1], a[2]); el.value = a[3]; fire("input", {target: el}); }
        if (a[0] === "key") { var ev = {target: find(a[1], a[2]), code: a[3], key: a[4], repeat: !!a[5], defaultPrevented: false, preventDefault: function(){ ev.defaultPrevented = true; }};
                              fire("keydown", ev); prevented.push(ev.defaultPrevented); }
        if (a[0] === "click") { var id = a[1] + "=" + a[2], b = btns[id];
          if (!b) { b = btns[id] = {dataset: {}, textContent: ""}; b.dataset[a[1]] = a[2]; b.closest = function(sel){ return sel === "button" ? b : null; }; }
          fire("click", {target: b}); }
      });
      var val = {}, dup = [];
      els.forEach(function(x){ var n = x.dataset.pin.split(":").pop(); (val[n] = val[n] || []).push(x.value); if (x.cl.dup) dup.push(n); });
      JSON.stringify({val: val, dup: dup.sort(), active: active ? [active.dataset.pin, active.cl["ls-cell"] ? "cell" : "pin"] : null,
                      store: store, prevented: prevented, btn: Object.keys(btns).map(function(k){ return btns[k].textContent; }).join(" ")});
    """.replace("SHEET", SHEET).replace("ACTIONS", json.dumps(json.dumps(actions)))
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
    if out.returncode:
        raise AssertionError(out.stderr[-800:])
    return json.loads(out.stdout)


class ReadingLessonIsClear(unittest.TestCase):
    """Учитель 22.10 про урок Reading: «ни хера непонятно — даёшь задание максимально кратко,
    не пишешь, что нужно делать. Сначала покажи, как выглядит настоящее задание: вот такой
    текст, нужно с ним сделать вот это. Потом коротенькие упражнения. Последовательно, без каши,
    чтобы было понятно, что от меня требуется в каждом задании»."""

    def l2(self):
        return run_js("""
          var l = L.filter(function(x){ return x.id === "l2"; })[0], t = null;
          V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") t = x; }); });
          var key = {}; t.items.forEach(function(it){ key[it.n] = it.a[0]; });
          var opts = {}; t.opts.forEach(function(o){ opts[o.k] = o.t; });
          return {steps: l.steps, intro: t.intro, key: key, opts: opts, text: t.text};
        """)

    def test_right_after_the_warm_up_the_real_task_and_what_to_do(self):
        r = self.l2()
        meet = r["steps"][1]
        types = [b["type"] for b in meet["blocks"]]
        self.assertIn("paper", types, "сразу после разминки — настоящее задание целиком, как на олимпиаде")
        paper = [b for b in meet["blocks"] if b["type"] == "paper"][0]
        # Текст — из самого задания 2025/26: тот же, что на его странице, без копии в уроке.
        self.assertEqual(paper.get("task"), IN_CLASS)
        self.assertIn("2025/26", paper["source"])
        self.assertEqual(re.findall(r"\((\d+)\)", " ".join(r["text"])), [str(n) for n in range(1, 11)])
        self.assertEqual(sorted(r["opts"]), list("ABCDEFGHIJK"))
        # Ниже задания — что с ним делать, простыми пунктами; ключа на экране нет.
        after = types[types.index("paper") + 1:]
        self.assertIn("list", after)
        todo = [b for b in meet["blocks"] if b["type"] == "list"][0]
        self.assertIn("What you have to do", todo["title"])
        self.assertGreaterEqual(len(todo["items"]), 4)

    def test_the_pie_text_is_the_homework(self):
        r = self.l2()
        tasks = lambda st: [b["task"] for b in r["steps"][st]["blocks"] if b["type"] == "task"]
        stages = [st["stage"] for st in r["steps"]]
        self.assertEqual(tasks(stages.index("production")), [HOMEWORK])
        self.assertEqual(tasks(stages.index("feedback")), [HOMEWORK])
        self.assertIn("Homework", r["steps"][stages.index("production")]["title"])
        links = [x["href"] for b in r["steps"][-1]["blocks"] if b["type"] == "links" for x in b["items"]]
        self.assertEqual(links[0], "#/t/" + HOMEWORK)

    def test_the_homework_is_the_official_text_word_for_word(self):
        # Ревью PR 35: «neat» → «nice» проходило все тесты. Сверяем по словам с текстом официального
        # PDF (tests/fixtures/reading2-mun-2425.txt — выписка из tasks-engl-10-11-mun-msk-24-25.pdf).
        t = run_js("""var t = null; Object.keys(P).forEach(function(k){ P[k].forEach(function(x){ if (x.id === "%s") t = x; }); });
                      return {intro: t.intro, text: t.text, opts: t.opts, key: t.items.map(function(it){ return it.a[0]; }).join(""), src: t.source};""" % HOMEWORK)
        def words(x):
            return re.findall(r"[a-z0-9]+", x.lower().replace("’", "'").replace("‘", "'"))
        official = (ROOT / "tests" / "fixtures" / "reading2-mun-2425.txt").read_text(encoding="utf-8")
        ours = " ".join([t["intro"]] + [p.replace("_", " ") for p in t["text"]] + [o["k"] + ") " + o["t"] for o in t["opts"]])
        self.assertEqual(words(ours), words(official))
        self.assertEqual(t["key"], KEY_2425)
        self.assertIn("2024/25", t["src"])

    def test_one_gap_solved_together_step_by_step_before_any_exercise(self):
        r = self.l2()
        together = r["steps"][2]
        self.assertEqual(together["stage"], "presentation")
        walk = [b for b in together["blocks"] if b["type"] == "walk"]
        self.assertEqual(len(walk), 1, "один пропуск того же текста решаем вместе, по шагам")
        w = walk[0]
        self.assertIn("[" + str(w["gap"]) + "]", w["context"])
        self.assertEqual(w["answer"], r["key"][str(w["gap"])], "ответ разбора — по официальному ключу 2025/26")
        # Ревью PR 35: в 2024/25 и 2025/26 у шести пропусков одинаковые буквы (3 — K, 9 — J…).
        # Разобранный на уроке пропуск не должен совпадать с ответом домашнего пирога.
        self.assertNotEqual(w["answer"], KEY_2425[w["gap"] - 1], "разбор подсказал бы ответ домашнего задания")
        self.assertGreaterEqual(len(w["steps"]), 3)
        self.assertTrue(all(s["q"] and s["a"] for s in w["steps"]))
        # Потом пропуск сам: верный вариант — по официальному ключу.
        quiz = [b for b in together["blocks"] if b["type"] == "quiz"][0]["items"][0]
        gap = int(re.search(r"Gap (\d+)", quiz["q"]).group(1))
        self.assertTrue(quiz["opts"][quiz["a"]].startswith(r["key"][str(gap)] + "."))
        self.assertNotEqual(KEY_2425[gap - 1], r["key"][str(gap)], "пропуск «сама» подсказал бы ответ домашнего задания")
        self.assertNotIn("extra sentence of this task", json.dumps(together))
        kinds = [b["type"] for s in r["steps"][:3] for b in s["blocks"]]
        for game in ["hookhunt", "sort", "gapfill"]:
            self.assertNotIn(game, kinds, "упражнения — после того, как поняли задание")

    def test_every_exercise_says_what_to_do(self):
        r = self.l2()
        # Разминку учитель одобрила как есть (22.10: «вармап хороший»), её не трогаем; но любая игра
        # после неё — со своим «What to do».
        games = ["walk", "quiz", "hookhunt", "sort", "gapfill", "task", "binword", "thisorthat", "speak", "transform"]
        bad, briefs = [], 0
        for i, s in enumerate(r["steps"][1:], 1):
            seen_brief = False
            for k, b in enumerate(s["blocks"]):
                if b["type"] == "brief":
                    briefs += 1
                    seen_brief = True
                    if not (b.get("title") and len(b.get("items", [])) >= 2):
                        bad.append("%d:%d brief" % (i, k))
                elif b["type"] in games:
                    # Своё «What to do» перед каждым упражнением: второе упражнение не живёт под чужим.
                    if not seen_brief:
                        bad.append("%d:%d %s без What to do" % (i, k, b["type"]))
                    if b["type"] != "task":
                        seen_brief = False
        self.assertEqual(bad, [])
        self.assertGreaterEqual(briefs, 6)

    def test_the_lesson_does_not_give_away_the_real_task(self):
        # Домашний пирог (2024/25) Варя решает в production — до него в уроке нет ни его предложений, ни букв.
        # Ревью PR 35: сравнивали только начало предложения и по исходнику с ** и фигурными
        # кавычками — цитата из середины или «**They say** …» проходили. Теперь: строки урока
        # до production, по словам, любые 6 слов подряд.
        def words(t):
            return re.findall(r"[a-z0-9]+", t.lower().replace("’", "'"))
        def runs(ws):
            return {" ".join(ws[i:i + 6]) for i in range(len(ws) - 5)}
        r = run_js("""
          var t = null, m = null; Object.keys(P).forEach(function(k){ P[k].forEach(function(x){ if (x.id === "HOMEWORK") t = x; }); });
          V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") m = x; }); });
          var l = L.filter(function(x){ return x.id === "l2"; })[0], before = [];
          for (var i = 0; l.steps[i].stage !== "production"; i++) before.push(l.steps[i]);
          var key = {}; m.items.forEach(function(it){ key[it.n] = it.a[0]; });
          return {real: t.opts.map(function(o){ return o.t; }).concat(t.text), lesson: JSON.stringify(before), key: key};
        """.replace("HOMEWORK", HOMEWORK))
        real = set()
        for piece in r["real"]:
            real |= runs(words(piece))
        lesson = words(r["lesson"].replace("**", " ").replace("\\", " "))
        self.assertEqual(sorted(runs(lesson) & real), [])
        # Пропуски, у которых в 2024/25 и 2025/26 одна и та же буква, урок до задания не называет.
        text = r["lesson"].lower()
        shared = [n for n in range(1, 11) if KEY_2425[n - 1] == r["key"][str(n)]]
        self.assertEqual(sorted(set(shared)), [1, 3, 4, 5, 9, 10])
        # Крючки, которыми решается домашний пирог, а в тексте про будильник их нет: «the latter» (B),
        # «that is why» (после D), «in fact» (после C). До задания урок ими не учит — ревью PR 36.
        self.assertEqual([w for w in ["the latter", "that is why", "in fact"] if w in text], [])
        # Шаг 2 больше не обещает решить текст за 15 минут: на уроке его разбираем, на время — дома пирог.
        self.assertNotIn("today you will try it", text)
        hits = [n for n in shared if re.search(r"\bgaps? %d\b|\b%d\s*[–=-]\s*%s\b" % (n, n, KEY_2425[n - 1].lower()), text)]
        self.assertEqual(hits, [])

    def test_hints_stay_hidden_until_asked(self):
        # Ревью PR 35, второй круг: блоки шага видны все сразу, и подсказки под разбором
        # («born → birthday», «It gives desserts a very similar…») выдавали ответ до «Show».
        # Слова верного предложения, которых нет ни в тексте вокруг пропуска, ни в других
        # вариантах, не встречаются в шаге за пределами самого упражнения.
        r = self.l2()
        blocks = r["steps"][2]["blocks"]
        paper = r["opts"]
        def words(t):
            return {w for w in re.findall(r"[a-z]+", t.lower()) if len(w) >= 5}
        leaks = []
        for k, b in enumerate(blocks):
            if b["type"] == "walk":
                right, around = paper[b["answer"]], b["context"] + " ".join(o["t"] for o in b["opts"] if o["k"] != b["answer"])
                # Варианты разбора — те же предложения, что на листе задания, слово в слово.
                self.assertEqual([o["t"] for o in b["opts"]], [paper[o["k"]] for o in b["opts"]])
            elif b["type"] == "quiz":
                it = b["items"][0]
                right = it["opts"][it["a"]]
                around = it["q"] + " ".join(o for j, o in enumerate(it["opts"]) if j != it["a"])
                for o in it["opts"]:
                    self.assertEqual(o[3:], paper[o[0]])
            else:
                continue
            secret = words(right) - words(around)
            rest = json.dumps([x for j, x in enumerate(blocks) if j != k and x["type"] not in ("walk", "quiz")]).lower()
            leaks += sorted(w for w in secret if re.search(r"\b%s\b" % w, rest))
        self.assertEqual(leaks, [])

    def test_the_real_task_is_drawn_like_the_olympiad_sheet(self):
        html = render_step("l2", 1)
        self.assertIn("ls-paper", html)
        self.assertIn("How I learned to love my alarm clock", html)
        for n in range(1, 11):
            self.assertIn("(%d) <input" % n, html)
        self.assertEqual(len(re.findall(r'<b>[A-K]\)</b>', html)), 11)
        self.assertIn("ls-grid", html)

    def test_the_real_task_can_be_typed_in(self):
        # Учитель 22.10: «чтобы в этом реальном задании можно было печатать — тыкать в тексте
        # и в табличке внизу», а не смотреть на картинку.
        html = render_step("l2", 1)
        for n in range(1, 11):
            # Поле в пропуске текста и клетка таблицы под тем же номером.
            self.assertEqual(len(re.findall(r'<input[^>]*data-pin="%s:%d"' % (SHEET, n), html)), 2, n)
        # Учитель 26.10 попросила проверку на листе (домашнее: ученица проверяет себя сама) — см. CheckAnswers.

    def test_typing_in_the_text_and_in_the_table_is_one_answer(self):
        r = sheet_session([
            ["input", 6, "pin", "d"],          # в пропуске текста
            ["input", 7, "cell", "d"],         # в таблице: дальше курсор сам в клетку 8
            ["input", 8, "cell", "z"],         # не A–K — не печатается
            ["input", 2, "pin", "\u0412"],     # русская «В» с экранной клавиатуры — латинская B
        ])
        self.assertEqual(r["val"]["6"], ["D", "D"], "буква из текста — и в таблице")
        self.assertEqual(r["val"]["7"], ["D", "D"])
        self.assertEqual(r["val"]["8"], ["", ""])
        self.assertEqual(r["val"]["2"], ["B", "B"])
        self.assertEqual(r["active"], [SHEET + ":8", "cell"])
        self.assertEqual(r["dup"], ["6", "6", "7", "7"], "одна буква в двух пропусках — подсвечена")
        self.assertEqual(json.loads(r["store"]["olymp-lessons"])["paper"][SHEET], {"6": "D", "7": "D", "2": "B"})
        fixed = sheet_session([["input", 6, "pin", "d"], ["input", 7, "cell", "d"], ["input", 7, "pin", "c"]])
        self.assertEqual(fixed["dup"], [], "исправила повтор — подсветка ушла")
        self.assertEqual(fixed["val"]["7"], ["C", "C"])

    def test_one_gap_holds_one_letter(self):
        # Ревью PR 36: где maxlength не держит (Android, диктовка), в пропуск попадало «DE»;
        # а с maxlength вторая буква в полном поле терялась. Новая буква заменяет старую.
        r = sheet_session([["input", 1, "pin", "d"], ["input", 1, "pin", "dk"], ["input", 2, "pin", "kd"], ["input", 3, "pin", "de"]])
        self.assertEqual(r["val"]["1"], ["K", "K"])
        self.assertEqual(r["val"]["2"], ["D", "D"])
        self.assertEqual(r["val"]["3"], ["E", "E"])
        self.assertNotIn('maxlength="1"', render_step("l2", 1))

    def test_russian_keyboard_layout_types_the_key_she_pressed(self):
        # Ревью PR 36: в русской раскладке клавиша D печатает «в», а по виду это B — в пропуск
        # уходила не та буква. На физической клавиатуре берём клавишу (code), а не символ.
        r = sheet_session([["key", 4, "pin", "KeyD", "\u0432"], ["key", 5, "cell", "KeyF", "\u0430"], ["key", 9, "pin", "KeyZ", "\u044f"]])
        self.assertEqual(r["val"]["4"], ["D", "D"])
        self.assertEqual(r["val"]["5"], ["F", "F"])
        self.assertEqual(r["val"]["9"], ["", ""], "Z — не A–K")
        self.assertEqual(r["prevented"], [True, True, True], "русская буква в поле не попадает")
        latin = sheet_session([["key", 4, "pin", "KeyD", "d"]])
        self.assertEqual(latin["prevented"], [False], "латиницу не трогаем — она придёт обычным вводом")

    def test_holding_a_key_does_not_fill_the_table(self):
        # Ревью PR 36: зажатая клавиша — автоповтор — шла по клеткам и заполняла всю таблицу.
        r = sheet_session([["input", 1, "cell", "d"], ["key", 2, "cell", "KeyD", "d", True], ["key", 2, "cell", "KeyD", "\u0432", True]])
        self.assertEqual(r["val"]["1"], ["D", "D"])
        self.assertEqual(r["val"]["2"], ["", ""])
        self.assertEqual(r["prevented"], [True, True])

    def test_a_wrong_key_keeps_the_letter(self):
        # Ревью PR 36: в латинской раскладке Z или цифра стирали сохранённую букву, в русской — нет.
        r = sheet_session([["input", 3, "pin", "k"], ["input", 3, "pin", "z"], ["input", 4, "pin", "e"], ["input", 4, "pin", "7"]])
        self.assertEqual(r["val"]["3"], ["K", "K"])
        self.assertEqual(r["val"]["4"], ["E", "E"])
        gone = sheet_session([["input", 3, "pin", "k"], ["input", 3, "pin", ""]])
        self.assertEqual(gone["val"]["3"], ["", ""], "стёрла сама — пусто")

    def test_clear_asks_twice_and_then_clears(self):
        r = sheet_session([["input", 3, "pin", "k"], ["click", "lspclear", SHEET]])
        self.assertEqual(r["val"]["3"], ["K", "K"], "одно касание — ещё не стёрто")
        self.assertIn("Tap again", r["btn"])
        r = sheet_session([["input", 3, "pin", "k"], ["click", "lspclear", SHEET], ["click", "lspclear", SHEET]])
        self.assertEqual(r["val"]["3"], ["", ""])
        self.assertNotIn(SHEET, json.loads(r["store"]["olymp-lessons"])["paper"])

    def test_broken_saved_answers_do_not_break_the_sheet(self):
        for bad in [[], "ABC", {SHEET: "ABC"}, {SHEET: {"1": "constructor", "2": "D"}}, {SHEET: []}]:
            r = sheet_session([["input", 5, "pin", "e"]], paper=bad)
            self.assertEqual(r["val"]["5"], ["E", "E"], bad)
            self.assertEqual(r["val"]["1"], ["", ""], bad)
            self.assertEqual(json.loads(r["store"]["olymp-lessons"])["paper"][SHEET].get("5"), "E", bad)

    def test_solving_together_opens_one_step_at_a_time(self):
        before = render_step("l2", 2)
        self.assertIn("data-lswalk", before)
        r = self.l2()
        w = [b for b in r["steps"][2]["blocks"] if b["type"] == "walk"][0]
        first_a = w["steps"][0]["a"].split("**")[0][:25]
        self.assertNotIn(first_a, before, "ответ первого шага — только по нажатию")
        second_q = w["steps"][1]["q"].split("**")[-1][:20]
        self.assertNotIn(second_q, before, "следующий шаг — только после «Show»")
        # Один вопрос — без номера «1.»: рядом «Gap 8», номера путаются.
        self.assertNotRegex(before, r"<b>1\.</b> Gap")
        key = "l2:2:%d" % [b["type"] for b in r["steps"][2]["blocks"]].index("walk")
        after = render_step("l2", 2, [["lswalk", key]])
        self.assertIn(first_a, after)
        done = render_step("l2", 2, [["lswalk", key]] * len(w["steps"]))
        self.assertIn("Gap %d = %s" % (w["gap"], w["answer"]), done)
        self.assertIn("What to do", before)


class PageDoesNotJump(unittest.TestCase):
    """Учитель 26.10: «нажимаю на слово — вся страница едет вниз, приходится возвращаться к заданию».
    Урок после нажатия перерисовывается целиком; картинка раздела в новой разметке на миг без высоты
    (в Safari — пока не догрузилась), и всё ниже неё съезжает. Новая картинка держит высоту старой."""

    def test_the_section_picture_keeps_its_height_after_a_tap(self):
        ui = (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8")
        self.assertNotIn("A.keepScroll(A.render)", ui, "все перерисовки урока — через stay()")
        self.assertNotRegex(ui, r'class="ls-hero" src="\' \+ esc\(s\.image\) \+ \'" alt="" loading="lazy"')
        js = """
          var window = this, store = {}, handlers = [], renders = 0, scrolled = [];
          var heroA = {offsetHeight: 300, complete: true, style: {}};
          var heroB = {offsetHeight: 0, complete: false, style: {}, on: null, addEventListener: function(t, f){ heroB.on = f; }};
          var el = function(){ return {textContent: "", appendChild: function(){}, classList: {add: function(){}, remove: function(){}}}; };
          var document = {createElement: el, head: {appendChild: function(){}}, body: {appendChild: function(){}},
            addEventListener: function(t, f){ if (t === "click") handlers.push(f); }, querySelectorAll: function(){ return []; },
            querySelector: function(sel){ return sel === ".ls-hero" ? (renders ? heroB : heroA) : null; }};
          var localStorage = {getItem: function(k){ return store[k] || null; }, setItem: function(k, v){ store[k] = v; }};
          var location = {hash: "#/lesson/l3"};
          window.addEventListener = function(){}; var setInterval = function(){}; window.scrollY = 700;
          window.scrollTo = function(x, y){ scrolled.push(y); };
          window.App = {esc: function(s){ return String(s); }, render: function(){ renders++; }, keepScroll: function(f){ f(); }, routes: {}, words: {}};
        """ + (ROOT / "data" / "lessons.js").read_text(encoding="utf-8") + (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8") + """
          renders = 0;  // модуль урока сам рисует страницу при загрузке — считаем с нажатия
          var btn = {dataset: {lswalk: "l2:2:1"}, closest: function(sel){ return sel === "button" ? btn : null; }};
          handlers.forEach(function(h){ h({target: btn}); });
          var held = heroB.style.height;
          if (heroB.on) heroB.on();
          JSON.stringify({renders: renders, held: held, after: heroB.style.height, scrolled: scrolled});
        """
        out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
        self.assertEqual(out.returncode, 0, out.stderr[-400:])
        r = json.loads(out.stdout)
        self.assertEqual(r["renders"], 1)
        self.assertEqual(r["held"], "300px", "пока картинка грузится, она держит прежнюю высоту")
        self.assertEqual(r["after"], "", "догрузилась — своя высота")
        self.assertEqual(r["scrolled"], [700], "и прокрутка — на том же месте")


class AnswersSurviveAReload(unittest.TestCase):
    """Учитель 26.10: «почему ты обновляешь страницу? У меня все ответы сбрасываются. И у неё так же —
    она проходит уроки, а ничего не сохраняется?» Выбор в вопросах, найденные слова, разложенные
    карточки и перефразирования жили только до перезагрузки. Теперь — в памяти браузера, как план и тексты."""

    def saved(self, out):
        st = json.loads(out["store"]["olymp-lessons"])
        return {k: st[k] for k in ("games", "picked") if k in st}

    def test_found_mistake_is_still_found_after_a_reload(self):
        r = run_js("""var l = L.filter(function(x){ return x.id === "l3"; })[0], out = null;
          l.steps.forEach(function(s, i){ s.blocks.forEach(function(b, k){ if (b.type === "spot") out = [i, k, b.items[0].at, b.items[0].cat]; }); }); return out;""")
        i, k, at, cat = r
        key = "l3:%d:%d" % (i, k)
        out = render_step("l3", i, events=[["click", "lsspot", key + ":0:%d" % at]], with_store=True)
        again = render_step("l3", i, init=self.saved(out))
        self.assertIn(cat + " mistake — correct it aloud", again)

    def test_quiz_answer_and_typed_rewrite_are_kept(self):
        r = run_js("""var l = L.filter(function(x){ return x.id === "l2"; })[0], q = null, t = null;
          l.steps.forEach(function(s, i){ s.blocks.forEach(function(b, k){ if (b.type === "quiz" && !q) q = [i, k]; if (b.type === "transform") t = [i, k, b.items[0].accept[0]]; }); });
          return {q: q, t: t};""")
        qi, qk = r["q"]
        out = render_step("l2", qi, events=[["click", "lspick", "l2:%d:%d:0:0" % (qi, qk)]], with_store=True)
        self.assertIn('class="why"', render_step("l2", qi, init=self.saved(out)))
        ti, tk, ans = r["t"]
        key = "l2:%d:%d:0" % (ti, tk)
        out = render_step("l2", ti, events=[["type", "tfin", key, ans], ["click", "tfcheck", key]], with_store=True)
        again = render_step("l2", ti, init=self.saved(out))
        self.assertIn('value="%s"' % ans, again)
        self.assertIn('class="ls-tf right"', again)


class ClearAnswers(unittest.TestCase):
    """Учитель 26.10: «на каждой странице — кнопка „стереть ответы“: сейчас я себя проверяю, а завтра
    показываю экран ученице — ответы должны стереться». Внизу каждого раздела — «стереть этот раздел»
    и «стереть весь урок», обе со второго касания."""

    def spot(self):
        return run_js("""var l = L.filter(function(x){ return x.id === "l3"; })[0], out = null;
          l.steps.forEach(function(s, i){ s.blocks.forEach(function(b, k){ if (b.type === "spot") out = [i, k, b.items[0].at]; }); }); return out;""")

    def test_every_section_has_both_buttons(self):
        n = run_js('return L.filter(function(x){ return x.id === "l3"; })[0].steps.length;')
        for i in range(n):
            html = render_step("l3", i)
            self.assertIn('data-lsclear="l3:%d:"' % i, html)
            self.assertIn('data-lsclear="l3:"', html)

    def test_clear_this_section_asks_twice(self):
        i, k, at = self.spot()
        tap = ["click", "lsspot", "l3:%d:%d:0:%d" % (i, k, at)]
        once = render_step("l3", i, events=[tap, ["click", "lsclear", "l3:%d:" % i]], with_store=True)
        self.assertIn("correct it aloud", once["html"], "одно касание — ещё не стёрто")
        twice = render_step("l3", i, events=[tap, ["click", "lsclear", "l3:%d:" % i], ["click", "lsclear", "l3:%d:" % i]], with_store=True)
        self.assertNotIn("correct it aloud", twice["html"])
        games = json.loads(twice["store"]["olymp-lessons"]).get("games", {})
        self.assertEqual([g for g in games if g.startswith("l3:%d:" % i)], [])

    def test_clear_the_whole_lesson_keeps_other_lessons(self):
        i, k, at = self.spot()
        ev = [["click", "lsspot", "l3:%d:%d:0:%d" % (i, k, at)], ["type", "lsnote", "l3:3:1:twist", "A fake letter"],
              ["click", "lsclear", "l3:"], ["click", "lsclear", "l3:"]]
        out = render_step("l3", i, events=ev, with_store=True, init={"paper": {"l2:1:1": {"3": "K"}}})
        st = json.loads(out["store"]["olymp-lessons"])
        left = [k2 for part in ("games", "picked", "notes", "paper") for k2 in st.get(part, {}) if k2.startswith("l3:")]
        self.assertEqual(left, [])
        self.assertEqual(st["paper"]["l2:1:1"], {"3": "K"}, "другие уроки не трогаем")


class CheckAnswers(unittest.TestCase):
    """Учитель 26.10: «почему нет кнопки check answers? Домашка отправлена — она должна сама знать, правильно
    или нет, а если нет — почему, куда посмотреть и как исправить. Её ответы пусть сохранятся, а кнопка
    сразу даст фидбэк. И так везде, и в уроках: две кнопки — check answers и стереть»."""

    def key(self):
        return run_js("""var t = null; V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") t = x; }); });
          var k = {}; t.items.forEach(function(it){ k[it.n] = it.a[0]; }); return {key: k, ex: E["m-r2"]};""")

    def test_the_reading_sheet_checks_what_she_already_typed(self):
        r = self.key()
        typed = {str(n): r["key"][str(n)] for n in range(1, 11)}
        typed["2"] = "G" if r["key"]["2"] != "G" else "B"   # одна ошибка
        del typed["5"]                                        # один пропуск пуст
        before = render_step("l2", 1, init={"paper": {SHEET: typed}})
        self.assertIn('data-lspcheck="%s"' % SHEET, before)
        self.assertNotIn("Show how to solve", before, "до проверки — без подсказок")
        html = render_step("l2", 1, init={"paper": {SHEET: typed}}, events=[["click", "lspcheck", SHEET]])
        self.assertIn("8 / 10", html)
        self.assertRegex(html, r'class="ls-cell wrong[^"]*" data-pin="%s:2"' % SHEET)
        self.assertRegex(html, r'class="ls-cell right[^"]*" data-pin="%s:1"' % SHEET)
        # Под неверным и пустым пропуском — как решать (официальный разбор), под верным — нет.
        self.assertEqual(html.count("Show how to solve"), 2)
        self.assertIn(r["ex"]["2"].split("\n")[0][:30].replace('"', "&quot;"), html)

    def test_checking_keeps_the_answers(self):
        r = self.key()
        typed = {"1": r["key"]["1"], "3": "D"}
        out = render_step("l2", 1, init={"paper": {SHEET: typed}}, events=[["click", "lspcheck", SHEET]], with_store=True)
        self.assertEqual(json.loads(out["store"]["olymp-lessons"])["paper"][SHEET], typed)

    def test_check_answers_at_the_bottom_where_there_is_something_to_check(self):
        steps = run_js("""return L.filter(function(x){ return x.id === "l2" || x.id === "l3"; }).map(function(l){
          return l.steps.map(function(s){ return s.blocks.some(function(b){
            return ["gapfill", "transform", "upgrade", "matchsheet"].indexOf(b.type) >= 0 || (b.type === "paper" && b.task); }); }); });""")
        for lid, flags in zip(["l2", "l3"], steps):
            for i, can in enumerate(flags):
                html = render_step(lid, i)
                self.assertEqual('data-lscheckall="%s:%d"' % (lid, i) in html, can, (lid, i))
        self.assertIn(True, steps[0])
        self.assertIn(True, steps[1])

    def test_check_all_checks_every_task_in_the_section(self):
        r = run_js("""var l = L.filter(function(x){ return x.id === "l2"; })[0], out = null;
          l.steps.forEach(function(s, i){ s.blocks.forEach(function(b){ if (b.type === "transform") out = [i, b.items.length]; }); }); return out;""")
        i, n = r
        html = render_step("l2", i, events=[["click", "lscheckall", "l2:%d" % i]])
        self.assertEqual(len(re.findall(r'class="ls-tf (right|wrong)"', html)), n)



class GrammarInTheReadingLesson(unittest.TestCase):
    """Учитель 23.10: «вставим в сегодняшний урок герундий и инфинитив — чтобы не отдельно,
    а переплеталось с ридингом. Заново не объяснять, только практика. И табличку: после каких
    глаголов строго герундий, после каких строго инфинитив, после каких и то и то»."""

    def setUp(self):
        self.r = run_js("""
          var l = L.filter(function(x){ return x.id === "l2"; })[0], t = null;
          V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") t = x; }); });
          return {steps: l.steps, text: t.text.concat(t.opts.map(function(o){ return o.t; })).join(" ")};
        """)
        self.i = [k for k, st in enumerate(self.r["steps"]) if any(b["type"] == "vtable" for b in st["blocks"])]
        self.assertEqual(len(self.i), 1, "один шаг грамматики с таблицей")
        self.i = self.i[0]
        self.step = self.r["steps"][self.i]

    def blocks(self, kind):
        return [b for b in self.step["blocks"] if b["type"] == kind]

    def test_right_after_the_hooks_and_before_the_homework(self):
        stages = [st["stage"] for st in self.r["steps"]]
        hooks = [k for k, st in enumerate(self.r["steps"]) if any(b["type"] == "hookhunt" for b in st["blocks"])][0]
        self.assertEqual(self.i, hooks + 1)
        self.assertLess(self.i, stages.index("production"))
        self.assertIn("-ing or to", self.step["title"])

    def test_the_reminder_table(self):
        cols = {c["h"]: " ".join(c["lines"]).lower() for c in self.blocks("vtable")[0]["cols"]}
        def col(word):
            hit = [h for h in cols if word in h]
            self.assertEqual(len(hit), 1, word)
            return cols[hit[0]]
        for v in ["enjoy", "avoid", "deny", "admit", "suggest", "give up", "look forward to", "can't help"]:
            self.assertIn(v, col("-ing only"), v)
        for v in ["want", "decide", "manage", "refuse", "pretend", "afford", "claim"]:
            self.assertIn(v, col("to + verb only"), v)
        for v in ["let", "make", "would rather", "help"]:
            self.assertIn(v, col("without to"), v)
        for v in ["begin", "start", "like", "prefer"]:
            self.assertIn(v, col("same meaning"), v)
        for v in ["remember", "forget", "stop", "try", "regret", "go on"]:
            self.assertIn(v, col("meaning changes"), v)
        # Один глагол не может быть сразу «только -ing» и «только to».
        def verbs(t):
            return {w.strip(" .") for w in re.split(r"[,:]", re.sub(r"\*\*[^*]+\*\*", "", t)) if w.strip(" .")}
        self.assertEqual(verbs(col("-ing only")) & verbs(col("to + verb only")), set())

    def test_the_phrases_to_sort_are_from_the_alarm_clock_text(self):
        text = self.r["text"].lower().replace("’", "'")
        cards = self.blocks("sort")[0]["cards"]
        self.assertEqual([c["t"] for c in cards if c["t"].lower() not in text], [])
        self.assertEqual(sorted({c["b"] for c in cards}), ["inf", "ing"])

    def test_choose_the_form(self):
        items = self.blocks("quiz")[0]["items"]
        self.assertGreaterEqual(len(items), 6)
        for it in items:
            self.assertEqual(len(it["opts"]), 2, it["q"])
            self.assertIn("___", it["q"])
            self.assertTrue(it["why"])

    def test_olympiad_format_transformations(self):
        # Формат Use of English Task 2: слово не меняется, число слов — как в скобках, без сокращений.
        items = self.blocks("transform")[0]["items"]
        self.assertGreaterEqual(len(items), 5)
        for it in items:
            self.assertTrue(it["q"] and it["word"] and "after" in it, it)
            for a in it["accept"]:
                self.assertEqual(len(a.split()), it["n"], a)
                self.assertIn(it["word"].lower(), a.lower().split(), a)
                self.assertNotIn("'", a, "без сокращений")
                self.assertNotIn("’", a)

    def test_typed_answer_is_checked(self):
        k = [b["type"] for b in self.step["blocks"]].index("transform")
        key = "l2:%d:%d" % (self.i, k)
        right = render_step("l2", self.i, typed=[["tfin", key + ":0", "  Regret Having pressed. "]], clicks=[["tfcheck", key + ":0"]])
        self.assertRegex(right, r'class="ls-tf right"')
        wrong = render_step("l2", self.i, typed=[["tfin", key + ":0", "regret pressing"]], clicks=[["tfcheck", key + ":0"]])
        self.assertRegex(wrong, r'class="ls-tf wrong"')
        self.assertIn("regret having pressed", wrong, "после проверки — верный ответ")
        before = render_step("l2", self.i)
        self.assertNotIn("regret having pressed", before, "ответ не виден до проверки")

    def test_review_of_pr_38(self):
        # Ревью PR 38: слово-подсказку тоже считают; turn out / put out — тоже верно; «forget ___ up»
        # без «прошлого» читалось и как будущее; в таблице не было can't help doing, be made to do,
        # would rather + somebody + past; фразы — не только из текста, но и из предложений A–K.
        tf = self.blocks("transform")[0]
        self.assertIn("including the word given", json.dumps(self.step["blocks"]))
        self.assertIn("remember to turn out", tf["items"][2]["accept"])
        self.assertIn("remember to put out", tf["items"][2]["accept"])
        self.assertTrue(tf["items"][0].get("note") and tf["items"][1].get("note"))
        forget = [it["q"] for it in self.blocks("quiz")[0]["items"] if "forget" in it["q"]][0]
        self.assertIn("last summer", forget)
        table = json.dumps(self.blocks("vtable")[0])
        for x in ["can't help **doing**", "be made **to** do", "would rather + somebody + past"]:
            self.assertIn(x, table)
        self.assertIn("sentences A–K", json.dumps(self.blocks("brief")[0], ensure_ascii=False))

    def test_editing_an_answer_clears_its_old_result(self):
        # Ревью PR 38: исправила ответ после Check, нажала Check у другого — старый ✓/✗ менялся без проверки.
        k = [b["type"] for b in self.step["blocks"]].index("transform")
        key = "l2:%d:%d" % (self.i, k)
        html = render_step("l2", self.i, events=[["type", "tfin", key + ":5", "could not help pressing"], ["click", "tfcheck", key + ":5"],
                                                 ["type", "tfin", key + ":5", "could not help press"], ["click", "tfcheck", key + ":0"]])
        boxes = re.findall(r'class="(ls-tf[^"]*)"', html)
        self.assertEqual(boxes[5], "ls-tf")
        self.assertEqual(boxes[0], "ls-tf wrong")
        self.assertIn(self.blocks("transform")[0]["items"][0]["note"].split("**")[0][:20], html, "после проверки — пояснение")

    def test_grammar_homework(self):
        links = [x["href"] for b in self.r["steps"][-1]["blocks"] if b["type"] == "links" for x in b["items"]]
        self.assertIn("#/grammar/t/b1-gerund-infinitive", links)
        self.assertIn("b1-gerund-infinitive", (ROOT / "data" / "grammar" / "grammar-b1.js").read_text(encoding="utf-8"))


class TasksHaveNumbers(unittest.TestCase):
    """Учитель 24.10: домашнее задание она пишет коротко — «Lesson → урок → Section 5 → Task 3».
    Поэтому на экране у каждого задания внутри раздела — свой номер, а шаг урока зовётся Section."""

    def titles(self, step):
        html = render_step("l2", step)
        return re.findall(r"📋 (Task \d+ · [^<]+)<", html), html

    def test_every_task_in_a_section_has_a_number(self):
        t, html = self.titles(1)
        self.assertEqual(t[0].split(" · ")[0], "Task 1", "настоящее задание в разделе 2 — Task 1")
        self.assertLess(html.index("Task 1 ·"), html.index("ls-paper"))
        self.assertIn("Section 2 of", html)
        self.assertEqual([x.split(" · ")[0] for x in self.titles(3)[0]], ["Task 1", "Task 2", "Task 3"])
        self.assertIn("Task 2 · Sort the hooks", self.titles(3)[0])
        self.assertEqual([x.split(" · ")[0] for x in self.titles(4)[0]], ["Task 1", "Task 2", "Task 3"])
        self.assertEqual([x.split(" · ")[0] for x in self.titles(5)[0]], ["Task 1"])

    def test_no_old_exercise_labels(self):
        src = (ROOT / "data" / "lessons.js").read_text(encoding="utf-8")
        self.assertNotRegex(src, r"Exercise \d of \d")
        # «Task 3 · Mini Task 2» путало бы номера: мини-задание названо иначе.
        self.assertNotIn("Mini Task 2", src)



def scale(n):
    """Шкала жюри муниципального этапа (Writing, критерии 2–5): ошибки → баллы."""
    return 4 if n == 0 else 3 if n <= 2 else 2 if n <= 4 else 1 if n <= 6 else 0


def words(t):
    return re.findall(r"[A-Za-z0-9][A-Za-z0-9'’-]*", t)


class WritingLesson(unittest.TestCase):
    """Урок 26.10 «Writing: a story». Учитель 25.10: «урок, где я как учитель незаменима» — а не
    повторяла как попугай то, с чем ученица разберётся сама. Writing на олимпиаде судят по числу
    ошибок, и считать их может только учитель: поэтому урок — про жюри, план, прокачку фраз
    и письмо с разбором; warm-up — на ридинге и герундии / инфинитиве прошлого урока."""

    def setUp(self):
        self.r = run_js("""
          var l = L.filter(function(x){ return x.id === "l3"; })[0], t = null;
          V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-w1") t = x; }); });
          return {l: l, w: t};
        """)
        self.steps = self.r["l"].get("steps") or []
        self.assertTrue(self.steps, "урок 26.10 собран по шагам")

    def find(self, kind):
        return [(i, k, b) for i, st in enumerate(self.steps) for k, b in enumerate(st["blocks"]) if b["type"] == kind]

    def test_a_50_minute_lesson_on_26_october(self):
        self.assertEqual(self.r["l"]["date"], "2026-10-26")
        # Домашние разделы «at home» в минуты урока не входят.
        self.assertLessEqual(sum(st["minutes"] for st in self.steps if not st.get("home")), 50)
        self.assertTrue(self.steps[-1].get("home"))
        self.assertEqual(self.steps[-1]["stage"], "homework")
        # Учитель 27.10: письмо — домашнее (разделы 4–6), «итог» убран.
        for stage in ["warm-up", "presentation", "practice", "homework"]:
            self.assertIn(stage, [st["stage"] for st in self.steps])
        imgs = [st["image"] for st in self.steps]
        self.assertEqual(len(set(imgs)), len(imgs))

    def test_one_task_in_class_another_at_home(self):
        # Учитель 26.10: «каша — слишком много текстов; возьми один и штудируй на уроке, другой — на дом;
        # чтобы было примитивно понятно, что делаем на уроке, а что дома». На уроке — задание 2025/26
        # (Jim), дома — 2024/25 (Anita): прокачка фраз, план и весь рассказ.
        cls = json.dumps([st for st in self.steps if not st.get("home")], ensure_ascii=False)
        for w in ["Anita", "neighbour", "a dog"]:
            self.assertNotIn(w, cls)
        self.assertEqual([b.get("task") for st in self.steps if not st.get("home") for b in st["blocks"] if b["type"] == "wpaper"], ["m-w1"])
        self.assertNotIn('"upgrade"', cls)
        # Класс: своя карта сюжета — для задания про Jim (богатый родственник, красивый дом, письмо).
        plan = [b for st in self.steps for b in st["blocks"] if b["type"] == "storymap"][0]
        ids = [f["id"] for f in plan["fields"]]
        for f in ["relative", "house", "letter"]:
            self.assertIn(f, ids)

    def test_no_narration_on_screen(self):
        # Учитель 26.10: «ты пишешь комментарии — „это реальное задание, у тебя 60 минут, 20 поинтов“. Тут не
        # надо, это я должна объяснять как учитель». На экране — задания и материал, без пояснений: ни текстов-
        # комментариев, ни «Today you learnt», ни «как на олимпиаде» в рамках «What to do».
        blocks = [b for st in self.steps for b in st["blocks"]]
        self.assertEqual([b["text"][:40] for b in blocks if b["type"] == "text"], [])
        self.assertEqual([b["title"] for b in blocks if b["type"] == "list" and "learnt" in b["title"]], [])
        talk = json.dumps([b for b in blocks if b["type"] in ("brief", "list")], ensure_ascii=False).lower()
        for x in ["olympiad", "jury takes points", "just like", "20 points", "you will see it"]:
            self.assertNotIn(x, talk)

    def test_plan_and_story_at_home_then_an_essay(self):
        # Учитель 27.10: «на дом — раздел 4: спланировать свою историю, потом написать; в разделе 5 — не конец,
        # а всю историю: само задание из раздела 2, поле на 200–250 слов, чек-лист и критерии, без Т9, и кнопка
        # „отправить ответ“. Раздел „итог“ убрать; шестым — homework: второй тип задания (эссе), расписанный так
        # же подробно, с официальным примером и полем для текста».
        titles = [st["title"] for st in self.steps]
        self.assertEqual(len(self.steps), 6)
        self.assertNotIn("Wrap-up", titles)
        self.assertEqual([st.get("home", False) for st in self.steps], [False, False, False, True, True, True])
        story = self.steps[4]["blocks"]
        kinds = [b["type"] for b in story]
        self.assertEqual([b.get("task") for b in story if b["type"] == "wpaper"], ["m-w1"])
        for k in ["writebox", "list", "vtable"]:
            self.assertIn(k, kinds)
        box = [b for b in story if b["type"] == "writebox"][0]
        self.assertEqual((box["min"], box["max"]), (200, 250))
        self.assertFalse(box.get("start"), "рассказ кончается заданной фразой — начало пустое")
        self.assertTrue(box.get("send"))
        self.assertLess(kinds.index("writebox"), kinds.index("list"), "чек-лист и критерии — под полем")
        self.assertIn("Checklist", json.dumps([b for b in story if b["type"] == "list"]))
        self.assertIn("jury", json.dumps([b for b in story if b["type"] == "vtable"]))

    def test_the_essay_homework(self):
        essay = self.steps[5]["blocks"]
        sheet = [b for b in essay if b["type"] == "wpaper"][0]
        ours = " ".join([sheet["intro"], sheet["quote"], sheet["author"], sheet["outro"], sheet["pointsLabel"]] + sheet["points"])
        official = (ROOT / "tests" / "fixtures" / "essay-mun-2324.txt").read_text(encoding="utf-8")
        w = lambda t: re.findall(r"[a-z0-9]+", t.lower().replace("’", "'"))
        self.assertEqual(w(ours), w(official), "задание — официальное 2023/24, слово в слово")
        self.assertIn("2023/24", sheet["source"])
        recipe = [b for b in essay if b["type"] == "vtable" and "recipe" in b["title"].lower()][0]
        budget = [int(x) for c in recipe["cols"] for x in re.findall(r"≈(\d+) words", c["h"])]
        self.assertEqual(len(budget), 4)
        self.assertTrue(200 <= sum(budget) <= 250, budget)
        jury = json.dumps([b for b in essay if b["type"] == "vtable" and "jury" in b["title"].lower()], ensure_ascii=False)
        for x in ["literature or history", "0 for the whole essay", "slang", "7 or more", "180", "275"]:
            self.assertIn(x, jury)
        check = json.dumps([b for b in essay if b["type"] == "list" and "checklist" in b["title"].lower()], ensure_ascii=False)
        for x in ["own words", "example", "conclusion", "200–250"]:
            self.assertIn(x, check)
        box = [b for b in essay if b["type"] == "writebox"][0]
        self.assertEqual((box["min"], box["max"]), (200, 250))
        self.assertTrue(box.get("send"))

    def test_no_autocorrect_in_the_writing_boxes(self):
        # «Отключи Т9»: ни подсказок орфографии, ни автоисправления, ни заглавных сами собой — как в тестирующей системе.
        for i, k, b in self.find("writebox"):
            html = render_step("l3", i)
            box = re.search(r"<textarea[^>]*data-lsnote=\"l3:%d:%d:text\"[^>]*>" % (i, k), html).group(0)
            for attr in ['spellcheck="false"', 'autocorrect="off"', 'autocapitalize="off"', 'autocomplete="off"']:
                self.assertIn(attr, box, (i, attr))

    def test_send_to_the_teacher(self):
        i, k, b = self.find("writebox")[0]
        key = "l3:%d:%d" % (i, k)
        html = render_step("l3", i)
        self.assertIn('data-lssend="%s"' % key, html)
        text = "The Letter on the Table\nJim had never liked letters."
        # Телефон: меню «Поделиться» (Telegram, WhatsApp…) — уходит заголовок задания, текст и число слов.
        js = """
          var shared = null;
          var navigator = {share: function(o){ shared = o; return {then: function(ok){ ok(); return this; }}; }};
        """
        out = render_step("l3", i, events=[["type", "lsnote", key + ":text", text], ["click", "lssend", key]], with_store=True, pre=js, expose="shared")
        self.assertIn(text, out["exposed"]["text"])
        self.assertIn(b["send"], out["exposed"]["text"])
        self.assertIn("10 words", out["exposed"]["text"])
        self.assertIn("Sent", out["html"])
        # Нет меню «Поделиться» и буфера — подсказка скопировать самой; пустое поле — не отправлять.
        manual = render_step("l3", i, events=[["type", "lsnote", key + ":text", text], ["click", "lssend", key]])
        self.assertIn("copy it", manual)
        empty = render_step("l3", i, events=[["click", "lssend", key]])
        self.assertIn("The box is empty", empty)

    def test_the_teachers_pictures(self):
        # Учитель 25.10 прислала картинки к уроку (Pinterest); по смыслу: энергия — разминка, «улыбайся
        # и терпи» — правила жюри, кот с картой — жюри, доска с нитками — план, тетрадка — пишем, котёнок — итог.
        imgs = [st["image"].split("/")[-1] for st in self.steps]
        want = {0: "m13-positive-energy.jpg", 1: "m14-smile-and-endure.jpg", 2: "m15-cards-say.jpg",
                3: "m16-plot-board.jpg", 4: "m17-writing-tears.jpg", 5: "m19-too-blessed.jpg"}
        self.assertEqual({i: imgs[i] for i in want}, want)

    def test_every_task_says_what_to_do(self):
        games = ["talk", "gapfill", "jury", "storymap", "upgrade", "writebox", "counter", "task", "spot"]
        bad = []
        for i, st in enumerate(self.steps):
            seen = False
            for k, b in enumerate(st["blocks"]):
                if b["type"] == "brief":
                    seen = True
                elif b["type"] in games:
                    if not seen:
                        bad.append("%d:%d %s" % (i, k, b["type"]))
                    if b["type"] != "task":
                        seen = False
        self.assertEqual(bad, [])

    def test_warm_up_practises_last_lesson(self):
        warm = self.steps[0]["blocks"]
        talk = [b for b in warm if b["type"] == "talk"][0]["items"]
        patterns = ["avoid doing", "decided to", "regret not doing", "remember doing", "looking forward to", "stop doing"]
        self.assertGreaterEqual(sum(1 for p in patterns if any(p in q for q in talk)), 5)
        story = [b for b in warm if b["type"] == "gapfill"][0]
        # После проверки на экране — вопрос «почему?», а не готовые объяснения: объясняет ученица, ведёт учитель.
        self.assertTrue(story.get("askWhy"))
        gi = [k for k, b in enumerate(warm) if b["type"] == "gapfill"][0]
        checked = render_step("l3", 0, events=[["click", "lscheck", "l3:0:%d" % gi]])
        self.assertIn("Why?", checked)
        self.assertNotIn(story["why"]["1"][:30], checked)
        self.assertEqual(sorted(story["key"]), [str(n) for n in range(1, 7)])
        self.assertEqual(len(set(story["key"].values())), 6)
        self.assertTrue(all(story["why"].get(g) for g in story["key"]))
        # Ревью PR 41: «However» без противопоставления жюри через 15 минут считает ошибкой — в разминке его нет.
        self.assertEqual([c["t"] for c in story["cards"] if c["t"].startswith("However")], [])
        # История для разминки — тоже про задание урока: кончается заданной фразой 2025/26.
        last = [c["t"] for c in story["cards"] if c["k"] == story["key"]["6"]][0]
        self.assertEqual(last, self.r["w"]["premise"].split("must end with the sentence: ")[1])

    def test_a_five_minute_recipe(self):
        # Учитель 26.10: «как опытный репетитор — чтобы за 5 минут поняла, как это писать, легко узнала
        # про крючки и что оценивается». В разделе 2: рецепт из 4 абзацев (слова в сумме — в 200–250),
        # план с конца, крючки для рассказа, чек-лист на последние минуты, шкала жюри.
        i = self.find("wpaper")[0][0]
        blocks = self.steps[i]["blocks"]
        recipe = [b for b in blocks if b["type"] == "vtable" and "recipe" in b["title"].lower()][0]
        budget = [int(x) for c in recipe["cols"] for x in re.findall(r"≈(\d+) words", c["h"])]
        self.assertEqual(len(budget), 4)
        self.assertTrue(200 <= sum(budget) <= 250, budget)
        self.assertIn("backwards", json.dumps(recipe))
        hooks = [b for b in blocks if b["type"] == "list" and "hooks" in b["title"].lower()][0]
        for x in ["Hardly had", "Little did", "Past Perfect", "Suddenly"]:
            self.assertIn(x, json.dumps(hooks))
        check = [b for b in blocks if b["type"] == "list" and "checklist" in b["title"].lower()][0]
        for x in ["word for word", "title", "200–250", "rich relative", "beautiful house"]:
            self.assertIn(x, json.dumps(check, ensure_ascii=False))
        kinds = [b["type"] for b in blocks]
        self.assertLess(kinds.index("wpaper"), blocks.index(recipe))

    def test_the_real_task_and_how_the_jury_scores(self):
        i, k, sheet = self.find("wpaper")[0]
        self.assertEqual(sheet.get("task"), "m-w1")
        jury = json.dumps([b for b in self.steps[i]["blocks"] if b["type"] == "vtable"], ensure_ascii=False)
        for x in ["0 mistakes", "7 or more", "180", "275", "0 for the whole story"]:
            self.assertIn(x, jury)

    def test_spot_the_mistake(self):
        # Учитель 25.10: «добавь задание „найди ошибку“ — это очень важно». Перед рассказом для жюри:
        # предложения с одной ошибкой того рода, за который жюри снимает баллы. На экране — только
        # критерий; исправление ученица говорит вслух, ключ у учителя.
        i, k, b = self.find("spot")[0]
        self.assertLess(i, self.find("jury")[0][0] + 1)
        self.assertGreaterEqual(len(b["items"]), 8)
        for it in b["items"]:
            w = it["text"].split(" ")
            self.assertEqual(re.sub(r"[.,!?]", "", w[it["at"]]), it["wrong"], it["text"])
            self.assertIn(it["cat"], ["Grammar", "Vocabulary", "Spelling and punctuation"])
            self.assertTrue(it["right"])
        # Учитель 25.10: предложения — ещё и идеи для рассказа из раздела 2 (задание 2025/26: Jim, богатый
        # родственник, красивый дом, письмо): ищет ошибку и заодно собирает сюжет.
        story = ["Jim", "house", "letter", "rich", "aunt", "uncle", "grandmother"]
        self.assertEqual([it["text"] for it in b["items"] if not any(w in it["text"] for w in story)], [])
        self.assertIn("idea", json.dumps(self.steps[i]["blocks"][k - 1]))
        key = "l3:%d:%d" % (i, k)
        it = b["items"][0]
        miss = render_step("l3", i, events=[["click", "lsspot", key + ":0:%d" % ((it["at"] + 1) % len(it["text"].split(" ")))]])
        self.assertNotIn("mistake — correct it", miss)
        hit = render_step("l3", i, events=[["click", "lsspot", key + ":0:%d" % it["at"]]])
        self.assertIn(it["cat"] + " mistake — correct it aloud", hit)
        self.assertNotIn(it["right"], hit.replace(it["text"], ""), "исправление — у учителя")

    def test_the_story_for_the_jury(self):
        i, k, j = self.find("jury")[0]
        story = " ".join(j["story"])
        end = self.r["w"]["premise"].split("must end with the sentence: ")[1]
        self.assertTrue(j["story"][-1].endswith(end), "заканчивается заданной фразой")
        n = len(words(j["title"])) + len(words(story))
        self.assertTrue(200 <= n <= 250, n)
        # Не хватает одного пункта — красивого дома; остальное в рассказе есть.
        self.assertNotIn("beautiful", story.lower())
        self.assertNotIn("house", story.lower())
        self.assertIn("rich", story.lower())
        # Ревью PR 41: «Years ago … had had» — в рассказе о прошлом нужно «earlier / before»: эта ошибка
        # не была в ключе, и жюри поставило бы не 14. В рассказе — только ошибки из ключа.
        self.assertNotIn(" ago", story)
        self.assertEqual(j["score"]["task"], 4 - len(j["mistakes"]["task"]))
        for c in ["org", "lex", "gram", "spell"]:
            self.assertEqual(j["score"][c], scale(len(j["mistakes"][c])), c)
            for m in j["mistakes"][c]:
                self.assertIn(m["wrong"], story, m)

    def test_the_jury_verdict_opens_on_request(self):
        # Учитель 25.10: «важно, чтобы я не просто читала то, что на экране, — чтобы без меня никак».
        # Вердикт на экране — только баллы жюри и сколько ошибок; какие именно — ищут с учителем.
        i, k, j = self.find("jury")[0]
        key = "l3:%d:%d" % (i, k)
        before = render_step("l3", i)
        self.assertIn("data-lsjury", before)
        self.assertNotIn("Jury: 2", before)
        after = render_step("l3", i, events=[["click", "lsjury", key + ":gram:3"], ["click", "lsverdict", key]])
        self.assertRegex(after, r'class="on"[^>]*data-lsjury="%s:gram:3"' % key)
        self.assertIn("Jury: 2", after)
        self.assertIn("3 mistakes", after)
        for c in ["org", "lex", "gram", "spell"]:
            for m in j["mistakes"][c]:
                self.assertNotIn(m["right"], after, "исправления — у учителя, не на экране")

    def test_jury_total_is_zero_without_task_completion(self):
        i, k, j = self.find("jury")[0]
        key = "l3:%d:%d" % (i, k)
        ev = [["click", "lsjury", key + ":task:0"]] + [["click", "lsjury", key + ":%s:4" % c] for c in ["org", "lex", "gram", "spell"]]
        self.assertIn("Your score: 0 / 20", render_step("l3", i, events=ev))

    def test_jury_picks_and_the_plan_survive_a_reload(self):
        m = self.find("storymap")[0]
        mk = "l3:%d:%d" % (m[0], m[1])
        out = render_step("l3", m[0], events=[["type", "lsnote", mk + ":twist", "The letter is a fake"]], with_store=True)
        self.assertIn("The letter is a fake", out["html"])
        self.assertIn("The letter is a fake", out["store"]["olymp-lessons"], "план помнится")
        j = self.find("jury")[0]
        jk = "l3:%d:%d" % (j[0], j[1])
        out = render_step("l3", j[0], events=[["click", "lsjury", jk + ":gram:2"]], with_store=True)
        self.assertEqual(json.loads(out["store"]["olymp-lessons"])["notes"][jk]["pick"]["gram"], 2)

    def test_homework_and_exam_box_without_spellcheck(self):
        # Ревью PR 41: на дом не задание 2025/26 — по нему написан рассказ для жюри.
        links = [x["href"] for st in self.steps for b in st["blocks"] if b["type"] == "links" for x in b["items"]]
        self.assertNotIn("#/t/m-w1", links)
        # Олимпиада — на компьютере в тестирующей системе: подсказок орфографии там нет.
        self.assertRegex(HTML, r'id="wText"[^>]*spellcheck="false"')
        self.assertRegex(HTML, r'id="wTitle"[^>]*spellcheck="false"')


class EssayAndCultureLesson(unittest.TestCase):
    """Урок 6.11 «Writing: an essay on a quotation · Culture». Учитель 05.11: весь про эссе по цитате; на экране
    только задания, коротко, без пометок, кто что читает и кто что печатает. Письмо — всё эссе целиком. Культура — не
    выдуманное упражнение, а настоящий Task 4 2021/22. Домашнее — Listening: официальные записи и как решать."""

    def setUp(self):
        self.l = run_js('return L.filter(function(x){ return x.id === "l4"; })[0];')
        self.steps = self.l.get("steps") or []
        self.assertTrue(self.steps, "урок собран по разделам")

    def find(self, kind):
        return [(i, k, b) for i, st in enumerate(self.steps) for k, b in enumerate(st["blocks"]) if b["type"] == kind]

    def test_one_goal_and_time_for_questions(self):
        # Учитель 06.11: «цель у конкретного урока… за час уложились… на все вопросы ответила… в домашке только то, что реально надо».
        self.assertEqual(self.l["date"], "2026-11-06")
        self.assertEqual(self.l["title"], "Writing: an essay on a quotation")
        self.assertEqual([st["title"] for st in self.steps], [
            "Homework check", "Warm-up", "The task: an essay", "Build the essay", "Write the essay", "Check the essay",
            "Homework: Grammar", "Homework: Use of English", "Homework: Listening"])
        self.assertEqual([st.get("home", False) for st in self.steps], [False] * 6 + [True] * 3)
        self.assertEqual(sum(st["minutes"] for st in self.steps if not st.get("home")), 60, "ровно час: вопросы снимаются по ходу разбора")
        imgs = [st["image"] for st in self.steps]
        self.assertEqual(len(set(imgs)), len(imgs))
        self.assertIn("Goal", self.l["aims"][0])

    def test_the_essay_is_checked_in_class(self):
        step = self.steps[5]
        self.assertEqual([b["type"] for b in step["blocks"]], ["brief", "list"])
        self.assertIn("Checklist", step["blocks"][1]["title"])

    def test_new_pictures_instead_of_repeated_ones(self):
        # Учитель 06.11: «вместо повторяющихся картинок добавь эти».
        titles = {st["title"]: st["image"] for st in self.steps}
        self.assertIn("m21-strong", titles["Warm-up"])
        self.assertIn("m22-wont-give-up", titles["Write the essay"])
        self.assertIn("m20-slay-queen", titles["Check the essay"])
        self.assertIn("m23-can-do-you", titles["Homework: Grammar"])
        self.assertIn("m29-brain-tangled", titles["The task: an essay"])
        self.assertIn("m32-sometimes-i-think", titles["Build the essay"])
        self.assertIn("m30-head-swells", titles["Homework: Use of English"])
        self.assertIn("m24-me-when-english", self.l["cover"])
        other = run_js('return L.filter(function(x){ return x.id === "l5" || x.id === "l6"; });')
        self.assertEqual([st["image"].split("/")[-1] for st in other[0]["steps"]],
                         ["m40-warmup-30-seconds.jpg", "m25-in-english-please.jpg", "m27-help-me.jpg", "m28-bite-laptop.jpg", "m26-rock-dog.jpg", "m31-go-for-success.jpg"])
        self.assertIn("m31-go-for-success", other[1]["cover"])

    def test_homework_story_is_first_marked_without_explanations(self):
        # Учитель 06.11: разбор домашки до warm-up. Рассказ ученицы дословно, красным и жёлтым выделено, но объясняет учитель сама:
        # ни подсказок по нажатию, ни объяснений на экране. В конце оценка по критериям жюри. Объяснения — в шпаргалке учителя.
        step = self.steps[0]
        self.assertEqual([b["type"] for b in step["blocks"]], ["brief", "marked", "brief", "marked"])
        b = step["blocks"][1]
        official = (ROOT / "tests" / "fixtures" / "homework-story-2526.txt").read_text(encoding="utf-8").strip().split("\n\n")
        self.assertEqual(b["title"], official[0], "заголовок дословно")
        ours = ["".join(x if isinstance(x, str) else x["t"] for x in p) for p in b["paras"]]
        self.assertEqual(ours, official[1:], "текст дословно, со всеми её ошибками")
        marks = [x for p in b["paras"] for x in p if not isinstance(x, str)]
        # Учитель 06.11: «каким цветом какая ошибка» и все цвета, даже те, которых в тексте нет.
        self.assertEqual([m["c"] for m in marks], ["lex", "org", "spell", "lex", "org", "style", "style", "lex"])
        self.assertEqual([(k["c"], k["t"]) for k in b["key"]], [("task", "Task completion"), ("org", "Organisation and logic"), ("lex", "Vocabulary"),
            ("gram", "Grammar"), ("spell", "Spelling and punctuation"), ("style", "Style: better to say it another way")])
        for m in marks:
            self.assertEqual(sorted(m), ["c", "t"], "только текст и цвет: объясняет учитель")
        self.assertEqual([(r["t"], r["p"], r["max"]) for r in b["score"]], [("Task completion", 4, 4), ("Organisation", 3, 4), ("Vocabulary", 2, 4), ("Grammar", 4, 4), ("Spelling and punctuation", 3, 4)])
        html = render_step("l4", 0).replace("&#39;", "'")
        self.assertEqual(len(re.findall(r'<mark class="ls-c-lex">', html)), 3)
        self.assertEqual(len(re.findall(r'<mark class="ls-c-org">', html)), 2)
        self.assertEqual(len(re.findall(r'<mark class="ls-c-spell">', html)), 1)
        self.assertEqual(len(re.findall(r'<mark class="ls-c-style">', html)), 2 + 3)
        self.assertEqual(len(re.findall(r'<mark class="ls-c-task">', html)), 3)
        for c, nums in (("task", "—"), ("org", "2, 5"), ("lex", "1, 4, 8"), ("gram", "—"), ("spell", "3"), ("style", "6, 7"),
                        ("task", "2, 3, 4"), ("org", "—"), ("lex", "—"), ("spell", "—"), ("style", "1, 5, 6")):
            self.assertRegex(html, r'<span class="sw ls-c-%s"></span><span>[^<]+</span><b>%s</b>' % (c, nums))
        ui = (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8")
        for c in ("task", "org", "lex", "gram", "spell", "style"):
            self.assertIn(".ls-c-%s{" % c, ui, "у каждого типа свой цвет")
        self.assertIn("16 / 20", html)
        # Учитель 06.11: второе домашнее задание, эссе 2023/24, следом за рассказом, тем же способом.
        e = step["blocks"][3]
        essay = (ROOT / "tests" / "fixtures" / "homework-essay-2324.txt").read_text(encoding="utf-8").strip().split("\n\n")
        self.assertEqual(["".join(x if isinstance(x, str) else x["t"] for x in p) for p in e["paras"]], essay, "текст дословно")
        self.assertEqual([x["c"] for p in e["paras"] for x in p if not isinstance(x, str)], ["style", "task", "task", "task", "style", "style"])
        self.assertEqual([x["t"] for p in e["paras"] for x in p if not isinstance(x, str) and sorted(x) != ["c", "t"]], [])
        self.assertEqual([(r["t"], r["p"], r["max"]) for r in e["score"]], [("Task completion", 3, 4), ("Organisation", 4, 4), ("Vocabulary", 4, 4), ("Grammar", 4, 4), ("Spelling and punctuation", 4, 4)])
        self.assertIn("19 / 20", html)
        self.assertLess(html.index("16 / 20"), html.index("19 / 20"), "эссе идёт следом за рассказом")
        self.assertIn("📋 Task 2 · Your essay", html)
        for fix in ("Kutuzov", "War and Peace", "quotation is"):
            self.assertNotIn(fix, html, "исправления — у учителя")
        self.assertNotRegex(html, r"data-ls(check|spot|note)", "тыкать не во что")
        for fix in ("cruel", "friends", "a minute longer", "property"):
            self.assertNotIn(fix, html, "как исправить — говорит учитель")
        self.assertTrue(self.l["aims"][-1].endswith("Sections 7–9."))

    def test_no_labels_about_who_does_what(self):
        # «Не надо помечать и выделять, это как ярлык». На экране нет ни «учитель читает», ни «напиши в чат».
        src = json.dumps(self.steps, ensure_ascii=False).lower()
        for w in ["your teacher", "in the chat", "reads", "listen and fix", "listen to your"]:
            self.assertNotIn(w, src.split("how to do listening")[0], w)
        kinds = {b["type"] for st in self.steps for b in st["blocks"]}
        self.assertEqual(kinds & {"speak", "talk", "counter"}, set())

    def test_warm_up_is_only_talent_or_hard_work(self):
        self.assertEqual([b["type"] for b in self.steps[1]["blocks"]], ["brief", "thisorthat"])
        self.assertEqual(self.steps[1]["blocks"][0]["title"], "Talent or hard work?")

    def test_every_task_says_what_to_do_shortly(self):
        games = ["matchsheet", "thisorthat", "sort", "spot", "quiz", "writebox", "storymap", "task"]
        bad = []
        for i, st in enumerate(self.steps):
            seen = False
            for k, b in enumerate(st["blocks"]):
                if b["type"] == "brief":
                    seen = True
                    if not b["items"]:
                        bad.append("%d:%d пустая рамка" % (i, k))
                elif b["type"] in games:
                    if not seen:
                        bad.append("%d:%d %s" % (i, k, b["type"]))
                    if b["type"] != "task":
                        seen = False
        self.assertEqual(bad, [])
        decode = [b for b in self.steps[2]["blocks"] if b["type"] == "brief"][0]
        self.assertEqual(decode["items"], ["Choose the right answer according to the quotation."])
        self.assertEqual([b["title"] for b in self.steps[2]["blocks"] if b["type"] == "list"], [], "лишний текст убран")

    def test_no_narration_on_screen(self):
        blocks = [b for st in self.steps for b in st["blocks"]]
        self.assertEqual([b["text"][:40] for b in blocks if b["type"] == "text"], [])
        talk = json.dumps([b for b in blocks if b["type"] in ("brief", "list")], ensure_ascii=False).lower()
        for x in ["olympiad", "20 points", "just like"]:
            self.assertNotIn(x, talk)

    def test_the_essay_is_the_official_2021_22_task(self):
        sheets = [b for i, k, b in self.find("wpaper")]
        self.assertGreaterEqual(len(sheets), 2, "и в разделе с заданием, и там, где пишем")
        official = (ROOT / "tests" / "fixtures" / "essay-mun-2122.txt").read_text(encoding="utf-8")
        w = lambda t: re.findall(r"[a-z0-9]+", t.lower().replace("’", "'"))
        for s in sheets:
            self.assertIn("2021/22", s["source"])
            ours = " ".join([s["intro"], s["quote"], s["author"], s["outro"], s["pointsLabel"]] + s["points"])
            self.assertEqual(w(ours), w(official))

    def test_the_whole_essay_is_written_in_class(self):
        i, k, b = self.find("writebox")[0]
        self.assertFalse(self.steps[i].get("home"))
        self.assertEqual((b["min"], b["max"]), (200, 250))
        self.assertTrue(b.get("send"))
        html = render_step("l4", i)
        self.assertIn("essay: 200–250", html)
        box = re.search(r'<textarea[^>]*data-lsnote="l4:%d:%d:text"[^>]*>' % (i, k), html).group(0)
        for attr in ['spellcheck="false"', 'autocorrect="off"', 'autocapitalize="off"', 'autocomplete="off"']:
            self.assertIn(attr, box)
        self.assertEqual(self.find("counter"), [], "только поле и счётчик слов")

    def test_culture_is_the_official_task_4(self):
        # Учитель 06.11: вместо нашего набора про Россию — настоящий Task 4. На олимпиаде за 5 лет в нём только Британия и США.
        i, k, b = self.find("matchsheet")[0]
        self.assertEqual(b["task"], "p-u4-2122", "текст берётся из самого задания, копии в уроке нет")
        for extra in ("opts", "items", "instruction"):
            self.assertNotIn(extra, b)
        self.assertIn("Real task", b["source"])
        self.assertIn("2021/22", b["source"])
        self.assertIn("Task 4", b["source"])
        self.assertEqual(self.steps[i]["title"], "Homework: Use of English")
        src = (ROOT / "data" / "lessons.js").read_text(encoding="utf-8")
        for made_up in ("National Unity Day", "Maslenitsa", "Task 4 format"):
            self.assertNotIn(made_up, src)
        t = run_js("""var t = null; Object.keys(P).forEach(function(x){ P[x].forEach(function(y){ if (y.id === "p-u4-2122") t = y; }); }); return t;""")
        key = "l4:%d:%d" % (i, k)
        html = render_step("l4", i).replace("&#39;", "'")
        self.assertIn(t["intro"], html)
        self.assertIn('data-lmsel="%s:0"' % key, html)
        for o in t["opts"]:
            self.assertIn(o["t"], html, "все явления — на экране, как на бланке")
        for it in t["items"]:
            self.assertIn(it["q"], html)
        self.assertNotRegex(html, r'class="ls-lmr (right|wrong)"')
        first = t["items"][0]["a"][0]
        out = render_step("l4", i, events=[["type", "lmsel", key + ":0", first], ["click", "lscheck", key]], with_store=True)
        self.assertEqual(len(re.findall(r'class="ls-lmr right"', out["html"])), 1)
        self.assertEqual(len(re.findall(r'class="ls-lmr wrong"', out["html"])), 9)
        again = render_step("l4", i, init={"games": json.loads(out["store"]["olymp-lessons"])["games"]})
        self.assertRegex(again, r'<option value="%s" selected>' % first)
        html = render_step("l4", i, events=[["click", "lscheckall", "l4:%d" % i]])
        self.assertEqual(len(re.findall(r'class="ls-lmr wrong"', html)), 10)

    def test_informal_words_are_found(self):
        i, k, b = self.find("spot")[0]
        informal = {"super", "guys", "kinda", "really", "cool", "gotta"}
        for it in b["items"]:
            self.assertEqual(re.sub(r"[.,!?]", "", it["text"].split(" ")[it["at"]]), it["wrong"], it["text"])
            self.assertEqual(len([w for w in re.findall(r"[a-z]+", it["text"].lower()) if w in informal]), 1, it["text"])
        key = "l4:%d:%d" % (i, k)
        html = render_step("l4", i, events=[["click", "lsspot", key + ":0:%d" % b["items"][0]["at"]]])
        self.assertIn("Style mistake — find a better word.", html)
        self.assertNotIn(b["items"][0]["right"], html)

    def test_examples_in_the_essay_tasks_are_real_and_from_russia(self):
        text = json.dumps(self.steps, ensure_ascii=False)
        for name in ["Lomonosov", "Mendeleev", "Oblomov"]:
            self.assertIn(name, text)
        cards = self.find("sort")[0][2]["cards"]
        self.assertEqual([c["t"] for c in cards if "fully agree" in c["t"] and c["b"] != "intro"], [])

    def test_homework_is_listening_with_tips_and_official_audio(self):
        home = self.steps[-1]
        self.assertTrue(home.get("home"))
        tips = json.dumps(home["blocks"][0], ensure_ascii=False)
        self.assertIn("How to do Listening", tips)
        for x in ["twice", "once", "synonyms", "NOT"]:
            self.assertIn(x, tips)
        links = [b for b in home["blocks"] if b["type"] == "task"]
        self.assertEqual(len(links), 2, "в домашке один вариант; остальные — к следующим урокам")
        got = run_js("""var o = {}; Object.keys(P).forEach(function(k){ P[k].forEach(function(t){ o[t.id] = {section: t.section, src: t.audio && t.audio.src, source: t.source}; }); }); return o;""")
        for b in links:
            t = got[b["task"]]
            self.assertEqual(t["section"], "listening", b["task"])
            self.assertIn("official", t["source"])
            self.assertTrue((ROOT / t["src"]).is_file(), t["src"])
        self.assertEqual(len({got[b["task"]]["src"] for b in links}), 1)
        # Работа 2023/24 теперь пробник, поэтому в домашке Listening другого года.
        self.assertIn("2024/25", links[0]["label"])
        for b in links:
            self.assertNotRegex(b["label"], r"Task \d", "номера Task — только у рамок раздела")

    def test_homework_grammar_is_a_rule_and_only_official_items(self):
        # Учитель 06.11: «каверзную тему, которая часто используется… в домашку, просто с правилом, чтобы напомнить»,
        # «не рандомные задания». Тема посчитана по Task 2 за 5 лет: wish / would rather / it is time / if — 9 пунктов из 50,
        # каждый год; это больше любой другой темы. Все пункты дословно из официальных заданий.
        step = self.steps[6]
        self.assertTrue(step.get("home"))
        self.assertEqual([b["type"] for b in step["blocks"]], ["vtable", "brief", "transform"])
        rule = json.dumps(step["blocks"][0], ensure_ascii=False)
        for x in ["wish", "would rather", "It is time", "If", "But for"]:
            self.assertIn(x, rule)
        official = run_js("""var o = [];
          window.VARIANTS.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.id === "m-u2" || t.id === "p-u2-2324") o = o.concat(t.items); }); }); });
          P["m-u2"].forEach(function(t){ o = o.concat(t.items); }); return o;""")
        official.append({"q": "Moira says she prefers to do her homework on her own. — rather — Moira says that ___ ____ _____ _____ do her homework with someone else. (4 words)",
                         "accept": ["she would rather not"]})  # 2021/22, Task 2, п. 7; в приложении этого года нет
        official.append({"q": "Albert’s wife says he has to start being interested in his children’s lives. — about — Albert’s wife says it is ___ ____ ____ ____ ___ an interest in his children’s lives. (5 words)", "accept": ["about time that he took", "about time that he had", "about time that he showed", "about time that he expressed", "about time he started taking", "about time he started having", "about time her husband took"]})  # 2023/24, Task 2, п. 8; в пробнике заменён, потому что был здесь
        official.append({"q": "I wish Jack had bought tickets for Venice but we went to Paris instead. — rather — Jack bought us tickets to Paris but I __ ___ ___ ___ to Venice. (4 words)", "accept": ["would rather have gone"]})  # 2023/24, Task 2, п. 9; в пробнике заменён, потому что был здесь
        items = step["blocks"][2]["items"]
        self.assertEqual(len(items), 7)
        for it in items:
            hit = [o for o in official if o["q"].startswith(it["q"] + " — ")]
            self.assertEqual(len(hit), 1, it["q"])
            first, word, second = hit[0]["q"].split(" — ")
            self.assertEqual(word, it["word"])
            before, after = re.split(r"(?:\s*_+\s*)+", second)
            self.assertEqual(before, it["before"])
            self.assertEqual(after.split(" (")[0], it["after"])
            self.assertIn("(%d words)" % it["n"], after)
            self.assertEqual(it["accept"], hit[0]["accept"])
            self.assertTrue(it.get("note"), "почему — после проверки, дома учителя рядом нет")
        # Ревью PR 57: «it did not happen» рядом с «had not been so much noise» путало (шум-то был); but for — и про сейчас, и про прошлое.
        noise = [it for it in items if it["accept"] == ["had not been so much"]][0]
        self.assertNotIn("did not happen", noise["note"])
        self.assertIn("there was a lot of noise", noise["note"])
        self.assertIn("if there were not", rule)
        self.assertIn("if there had not been", rule)
        # В примерах правила нет ответов на задание.
        for it in items:
            self.assertNotIn(it["accept"][0], rule, it["accept"][0])
        i = 6
        html = render_step("l4", i, events=[["click", "lscheckall", "l4:%d" % i]])
        self.assertEqual(len(re.findall(r'class="ls-tf wrong"', html)), 7)
        self.assertIn("Task 1 · ", html)

    def test_homework_use_of_english_prepares_for_each_task_with_official_grade_10_11_items(self):
        # Учитель 06.11: «задания, которые готовят к таким заданиям», «как репетитор»; «она в 10 классе». Подводки — на официальной
        # работе 10–11 классов 2021/22, которой ещё не было в приложении: лишнее слово и почему; модели Task 2;
        # сначала часть речи, потом слово; настоящий Task 4. Школьного этапа и 9 класса нет.
        step = self.steps[7]
        kinds = [b["type"] for b in step["blocks"]]
        self.assertEqual(kinds, ["brief", "spot", "list", "brief", "transform", "brief", "sort", "vtable", "brief", "transform", "brief", "matchsheet"])
        norm = lambda t: re.sub(r"\s+", " ", t.replace("’", "'")).strip()
        paper = norm((ROOT / "tests" / "fixtures" / "uoe-mun-2122.txt").read_text(encoding="utf-8"))
        spot = step["blocks"][1]
        self.assertEqual([it["wrong"] for it in spot["items"]], ["all", "far", "being", "such", "so", "out", "up", "make"], "официальный ключ")
        for it in spot["items"]:
            self.assertEqual(re.sub(r"[.,!?]", "", it["text"].split(" ")[it["at"]]), it["wrong"], it["text"])
            self.assertIn(norm(it["text"]), paper)
            self.assertTrue(it.get("why"))
        t2 = step["blocks"][4]["items"]
        self.assertEqual([it["accept"][0] for it in t2], ["there is hardly any petrol", "to work as a volunteer", "on the point of leaving",
            "cut down on the amount", "had no idea cars cost", "lack of leadership that caused", "will be followed by", "to be unable to keep", "pleasure to take you on"])
        for it in t2:
            self.assertIn(norm(it["q"]), paper)
            for x in it["accept"]:
                self.assertEqual(len(x.split()), it["n"], x)
                self.assertIn(it["word"], x.split())
            self.assertTrue(it.get("note"))
        self.assertEqual({c["b"] for c in step["blocks"][6]["cards"]}, {"noun", "adj", "adv"})
        t3 = step["blocks"][9]["items"]
        self.assertEqual([it["accept"][0] for it in t3], ["addition", "unprecedented", "typically", "drawing", "services", "rigidly", "permissible", "competition", "self-employed", "perception"])
        self.assertEqual([it["word"] for it in t3], ["ADD", "PRECEDENT", "TYPICAL", "DRAW", "SERVE", "RIGID", "PERMIT", "COMPETE", "EMPLOY", "PERCEIVE"])
        for it in t3:
            self.assertEqual(it["n"], 1)
            self.assertTrue(it.get("note"))
            for part in (it["before"], it["after"]):
                if part.strip(" ,."):
                    self.assertIn(norm(part).lstrip(", "), paper)
        i = 7
        html = render_step("l4", i, events=[["click", "lscheckall", "l4:%d" % i]])
        self.assertEqual(len(re.findall(r'class="ls-tf wrong"', html)), 19)
        self.assertNotIn("(1 words)", html)
        src = (ROOT / "data" / "lessons.js").read_text(encoding="utf-8") + (ROOT / "data" / "practice-mun.js").read_text(encoding="utf-8")
        for banned in ("p-sch-", "School 2026/27", "grade 9", "Grade 9", "2526-9", "2425-9"):
            self.assertNotIn(banned, src)
        html = render_step("l4", i, events=[["click", "lsspot", "l4:%d:1:0:%d" % (i, spot["items"][0]["at"])]])
        self.assertIn("mix up", html)

    def test_review_of_pr_69(self):
        step = self.steps[7]
        why = {it["wrong"]: it["why"] for it in step["blocks"][1]["items"]}
        self.assertNotIn("cannot stand", why["so"])
        self.assertNotIn("nothing goes between", why["all"])
        notes = {it["word"]: it["note"] for it in step["blocks"][4]["items"] + step["blocks"][9]["items"]}
        self.assertNotIn("After it, the past form", notes["idea"])
        self.assertNotIn("**un-** = never", notes["PRECEDENT"])
        noun = " ".join(step["blocks"][7]["cols"][0]["lines"])
        self.assertIn("-ing", noun)
        self.assertNotIn("drawing", noun, "это ответ следующего задания")
        employ = [it for it in step["blocks"][9]["items"] if it["word"] == "EMPLOY"][0]
        self.assertIn("barristers", employ["q"])

    def test_official_culture_task_2021_22(self):
        t = run_js("""var t = null; Object.keys(P).forEach(function(k){ P[k].forEach(function(x){ if (x.id === "p-u4-2122") t = x; }); });
                      return {opts: t.opts, items: t.items, intro: t.intro, ex: E["p-u4-2122"]};""")
        official = (ROOT / "tests" / "fixtures" / "task4-mun-2122.txt").read_text(encoding="utf-8")
        w = lambda s: sorted(re.findall(r"[a-z0-9]+", s.lower().replace("’", "'")))
        ours = " ".join([t["intro"]] + [o["t"] for o in t["opts"]] + [it["q"] for it in t["items"]])
        self.assertEqual(w(ours), w(official), "слова — как в официальном файле")
        self.assertEqual([it["a"][0] for it in t["items"]], list("JEKAHMLFGB"))
        self.assertEqual([o["k"] for o in t["opts"]], list("ABCDEFGHIJKLMN"))
        for it in t["items"]:
            self.assertIn("Answer: " + it["a"][0], t["ex"][str(it["n"])])


class ExamWalkthroughLesson(unittest.TestCase):
    """Учитель 09.11: урок идёт по работе подряд, но задания настоящие, их решают: Listening с отрезком записи и Reading — минимум по 2 пункта
    в каждом Task, Use of English: Task 1, 2, 4 — по 3, Task 3 — 5, Writing — 2 новых задания для устного плана. Только то, что Варя ещё не решала."""
    EXPECTED = [[], [("m-l1", [5, 6]), ("m-l2", [3, 4])], [("mock-r1", [4, 5]), ("mock-r2", [16, 17])],
                [("mock-u1", [3, 7, 12]), ("mock-u2", [2, 5, 7]), ("mock-u3", [1, 2, 3, 4, 5]), ("mock-u4", [2, 5, 9])], [], []]

    def setUp(self):
        self.l = run_js('return L.filter(function(x){ return x.id === "l5"; })[0];')
        self.steps = self.l["steps"]

    def test_lesson_starts_with_a_warm_up_not_with_the_exam(self):
        # Учитель 09.11: «чтобы не сразу с лисинга начинать»: её картинка и короткое повторение; весь урок в пределах часа.
        st = self.steps[0]
        self.assertEqual(st["stage"], "warm-up")
        self.assertEqual([b["type"] for b in st["blocks"]], ["brief", "brief", "quiz"])
        self.assertTrue((ROOT / st["image"]).is_file())
        html = render_step("l5", 0)
        self.assertIn('class="ls-hero ls-full" src="%s"' % st["image"], html)
        self.assertIn("📋 Task 1 · 30 second challenge", html)
        self.assertIn("📋 Task 2 · Quick revision", html)
        self.assertGreaterEqual(len(st["blocks"][2]["items"]), 5)
        self.assertLessEqual(sum(x["minutes"] for x in self.steps if not x.get("home")), 55)
        ui = (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8")
        self.assertIn('st.l5rev !== 2', ui, "номера разделов сдвинулись: старые ответы не должны попасть в другие задания")

    def test_real_tasks_in_the_order_of_the_paper(self):
        self.assertEqual(self.l["date"], "2026-11-09")
        self.assertEqual([st["title"] for st in self.steps], ["Warm-up", "Listening", "Reading", "Use of English", "Writing", "Homework: Mock exam"])
        got = [[(b["task"], b["items"]) for b in st["blocks"] if b["type"] == "minitask"] for st in self.steps]
        self.assertEqual(got, self.EXPECTED)
        self.assertLessEqual(sum(st["minutes"] for st in self.steps if not st.get("home")), 55, "из часа остаётся запас на вопросы")

    def test_nothing_here_was_set_in_earlier_lessons(self):
        # Проверка PR 09.11: Reading Task 1 2025/26 был в домашке 23 октября, поэтому здесь другой год.
        earlier = json.dumps(run_js('return L.filter(function(x){ return x.date < "2026-11-09"; });'), ensure_ascii=False)
        for st in self.steps:
            for b in st["blocks"]:
                if b["type"] == "minitask":
                    self.assertNotIn('"%s"' % b["task"], earlier)
                    self.assertNotIn('#/t/%s"' % b["task"], earlier)

    def test_listening_has_a_short_official_clip_for_its_items(self):
        # Учитель 09.11: в Task 2 играло объяснение задания. Запись сжата неравномерно, браузер при перемотке промахивается,
        # и тем сильнее, чем дальше от начала. Поэтому у каждого отрезка свой короткий файл и перематывать нечего.
        one, two = [b["audio"] for b in self.steps[1]["blocks"]]
        self.assertEqual((one["src"], one["from"], one["stop"]), ("media/lesson-nov9-listening-1.mp3", 0, 32.49))
        self.assertEqual((two["src"], two["from"], two["stop"]), ("media/lesson-nov9-listening-2.mp3", 0, 25.2))
        for a in (one, two):
            self.assertLess((ROOT / a["src"]).stat().st_size, 500000, "короткий отрезок, а не вся запись")
        html = render_step("l5", 1)
        self.assertRegex(html, r'data-play="0"[^>]*data-src="media/lesson-nov9-listening-1\.mp3"[^>]*data-stop="32\.49"')
        self.assertRegex(html, r'data-play="0"[^>]*data-src="media/lesson-nov9-listening-2\.mp3"[^>]*data-stop="25\.2"')
        ui = HTML_INDEX
        self.assertIn("b.dataset.src", ui)

    def test_items_can_be_answered_and_checked(self):
        t = run_js("""var o = {}; window.VARIANTS.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(x){ o[x.id] = x; }); }); }); return o;""")
        for i, st in enumerate(self.steps[1:4], 1):
            html = render_step("l5", i).replace("&#39;", "'").replace("&quot;", '"')
            n = 0
            for k, b in enumerate(st["blocks"]):
                n += 1
                self.assertIn("📋 Task %d · %s" % (n, b["title"]), html)
                task = t[b["task"]]
                self.assertIn(task["intro"], html)
                for num in b["items"]:
                    item = [x for x in task["items"] if x["n"] == num][0]
                    if not item["q"].startswith("Gap"):
                        self.assertIn(item["q"], html)
                    for o in item.get("opts") or []:
                        self.assertIn(o["t"], html)
                self.assertIn('data-lscheck="l5:%d:%d"' % (i, k), html)
            self.assertNotIn("Answer:", html, "до проверки ответов нет")
        reading = render_step("l5", 2).replace("&#39;", "'")
        self.assertIn(t["mock-r1"]["textTitle"], reading)
        self.assertIn(t["mock-r1"]["text"][3], reading, "абзац, по которому отвечаем")
        self.assertNotIn(t["mock-r1"]["text"][4], reading, "только этот абзац")
        for para in t["mock-r2"]["text"][2:4]:
            self.assertIn(para.split(" (1")[0], reading)
        self.assertIn("(16)", reading)
        self.assertNotIn("(12)", reading, "только абзацы этих пропусков")
        out = render_step("l5", 3, events=[["type", "lmsel", "l5:3:3:0", "E"], ["click", "lscheck", "l5:3:3"]], with_store=True)
        self.assertEqual(len(re.findall(r'class="ls-lmr right"', out["html"])), 1)
        self.assertEqual(len(re.findall(r'class="ls-lmr wrong"', out["html"])), 2)
        html = render_step("l5", 3, events=[["click", "lscheck", "l5:3:2"]])
        self.assertIn("Answer: <b>excellent</b>", html)
        html = render_step("l5", 3, events=[["click", "lscheckall", "l5:3"]])
        self.assertEqual(len(re.findall(r'class="ls-lmr wrong"', html)), 3)
        self.assertIn("✓ Check answers", html)
        self.assertIn("Clear answers", html)

    def test_writing_is_two_new_tasks_to_plan_aloud(self):
        st = self.steps[4]
        self.assertEqual([b["type"] for b in st["blocks"]], ["brief", "wpaper", "wpaper", "bank"])
        story, essay = st["blocks"][1], st["blocks"][2]
        self.assertIn("Tom had a very special reason", story["premise"])
        self.assertIn("Stories Wanted", story["premise"])
        self.assertEqual(essay["quote"], "No two persons ever read the same book.")
        self.assertEqual(essay["author"], "Edmund Wilson")
        html = render_step("l5", 4)
        self.assertNotIn("<textarea", html, "план устно")
        self.assertNotIn("m-w1", json.dumps(st, ensure_ascii=False), "тот рассказ Варя уже написала")
        self.assertNotIn("Grade 9", html, "учитель 09.11: подпись убрать")

    def test_examples_for_any_quotation_are_plain_text_under_the_tasks(self):
        # Учитель 09.11: под Writing — примеры для цитат, на английском: произведение и автор, что доказывает, кратко сам пример.
        # Русская классика — под принятыми английскими названиями; только школьная программа.
        b = self.steps[4]["blocks"][-1]
        items = [it for g in b["groups"] for it in g["items"]]
        self.assertGreaterEqual(len(b["groups"]), 6)
        self.assertGreaterEqual(len(items), 20)
        self.assertEqual(len({it["work"] for it in items}), len(items))
        self.assertNotRegex(json.dumps(b, ensure_ascii=False), "[А-Яа-яЁё]", "всё на английском")
        html = render_step("l5", 4)
        for n, it in enumerate(items, 1):
            for field in ("work", "author", "proves", "text"):
                self.assertIn(it[field], html)
            self.assertLessEqual(len(it["text"].split()), 40, "кратко: " + it["work"])
            self.assertIn("<b>%d. “%s”</b> by %s" % (n, it["work"], it["author"]), html)
        for g in b["groups"]:
            self.assertIn(g["theme"], html)
        self.assertEqual(html.count("<b>Proves:</b>"), len(items))
        self.assertEqual(html.count("<b>Example:</b>"), len(items))
        self.assertNotIn("<details", html[html.index("Proves:"):], "просто текстом")
        self.assertNotIn("📋 Task 2", html, "это не задание")

    def test_mock_exam_stays_homework_and_16_november_is_for_mistakes(self):
        step = self.steps[-1]
        self.assertEqual(step["minutes"], 180)
        self.assertEqual([b["type"] for b in step["blocks"]], ["brief", "links"])
        self.assertEqual(step["blocks"][1]["items"][0]["href"], "#/full/p-l1-2324")
        text = json.dumps(step["blocks"], ensure_ascii=False)
        for x in ["2023/24", "one device", "Check answers", "Try again", "screenshot", "16 November"]:
            self.assertIn(x, text)
        l6 = run_js('return L.filter(function(x){ return x.id === "l6"; })[0];')
        self.assertEqual(l6["date"], "2026-11-16")
        self.assertIn("mistakes", " ".join(l6["aims"]))
        self.assertNotIn("links", l6)
        l4 = run_js('return L.filter(function(x){ return x.id === "l4"; })[0];')
        self.assertNotIn("mock", json.dumps(l4, ensure_ascii=False).lower())
        self.assertIn("l.summary || l.links", (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8"))

class RecordingsJumpExactly(unittest.TestCase):
    """Учитель 09.11: в Task 2 играло не то место. MP3 с плавающим битрейтом браузер перематывает по оценке и промахивается на десятки секунд,
    поэтому всё, куда приложение прыгает кнопкой, лежит в файле, где перемотка точная."""

    @staticmethod
    def mp3_bitrates(path):
        d = path.read_bytes()
        i = 10 + ((d[6] & 127) << 21 | (d[7] & 127) << 14 | (d[8] & 127) << 7 | (d[9] & 127)) if d[:3] == b"ID3" else 0
        v1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
        v2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
        rates = {3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000]}
        seen, first = set(), True
        while i + 4 <= len(d):
            v, layer, b, sr, pad = (d[i + 1] >> 3) & 3, (d[i + 1] >> 1) & 3, d[i + 2] >> 4, (d[i + 2] >> 2) & 3, (d[i + 2] >> 1) & 1
            if d[i] != 0xFF or d[i + 1] & 0xE0 != 0xE0 or v == 1 or layer != 1 or b in (0, 15) or sr == 3:
                i += 1
                continue
            br = (v1 if v == 3 else v2)[b]
            if not first:  # первый кадр — служебный заголовок, его битрейт ничего не значит
                seen.add(br)
            first = False
            i += (144 if v == 3 else 72) * br * 1000 // rates[v][sr] + pad
        return seen

    def test_every_jump_target_is_in_a_file_with_exact_seeking(self):
        srcs = run_js("""var o = [];
          window.VARIANTS.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(t){ if (t.audio && t.audio.from > 0) o.push(t.audio.src || v.audio); }); }); });
          Object.keys(window.PRACTICE).forEach(function(k){ Object.keys(window.PRACTICE[k]).forEach(function(x){ window.PRACTICE[k][x].forEach(function(t){ if (t.audio && t.audio.from > 0) o.push(t.audio.src); }); }); });
          return o;""")
        self.assertGreaterEqual(len(set(srcs)), 4)
        for src in sorted(set(srcs)):
            path = ROOT / src
            self.assertTrue(path.is_file(), src)
            if path.suffix == ".mp3":
                self.assertEqual(len(self.mp3_bitrates(path)), 1, src + ": плавающий битрейт, браузер промахнётся")


if __name__ == "__main__":
    unittest.main()
