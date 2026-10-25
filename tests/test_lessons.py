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
        self.assertEqual(len(set(r["pics"])), 12, "12 картинок учителя — каждая на своём месте")
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
TASK_FILES = ["data/variant-mun-msk-25-26.js", "data/practice-mun.js"]
# Учитель 22.10: «поменяем местами» — на уроке разбираем текст 2025/26 про будильник (m-r2),
# а пирог Цветаевой 2024/25 — домашнее задание на 15 минут (отработка p-r2-2425).
IN_CLASS, HOMEWORK = "m-r2", "p-r2-2425"


def render_step(lesson_id, step, clicks=(), typed=(), with_store=False, events=()):
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
    js = stub + "".join((ROOT / f).read_text(encoding="utf-8") for f in TASK_FILES) + (ROOT / "data" / "lessons.js").read_text(encoding="utf-8") + """
      var o = {}; o["LID"] = STEP; store["olymp-lessons"] = JSON.stringify({step: o});
    """.replace("LID", lesson_id).replace("STEP", str(step)) + (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8") + """
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
      JSON.parse(EVENTS).forEach(function(ev){
        var ds = {}; ds[ev[1]] = ev[2];
        if (ev[0] === "type") { var el = {dataset: ds, value: ev[3], tagName: "INPUT", classList: {contains: function(){ return false; }}};
                                inputs.forEach(function(h){ h({target: el}); }); }
        else { var btn = {dataset: ds, closest: function(sel){ return sel === "button" ? btn : null; }}; handlers.forEach(function(h){ h({target: btn}); }); }
      });
      var html = window.App.routes.lesson(["lesson", "LID"]);
      WITH ? JSON.stringify({html: html, store: store}) : html;
    """.replace("CLICKS", json.dumps(clicks_js)).replace("TYPED", json.dumps(json.dumps(list(typed)))) \
       .replace("WITH", "true" if with_store else "false").replace("EVENTS", json.dumps(json.dumps(list(events)))).replace("LID", lesson_id)
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
    if out.returncode:
        raise AssertionError(out.stderr[-500:])
    return json.loads(out.stdout) if with_store else out.stdout


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
        self.assertNotIn("Check", html.split("ls-paper", 1)[1].split("ls-nav")[0], "проверки нет: ключ 2024/25 совпадает с 2025/26 в шести пропусках")

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
        self.assertEqual(sum(st["minutes"] for st in self.steps), 50)
        for stage in ["warm-up", "presentation", "practice", "production", "wrap-up"]:
            self.assertIn(stage, [st["stage"] for st in self.steps])
        imgs = [st["image"] for st in self.steps]
        self.assertEqual(len(set(imgs)), len(imgs))

    def test_every_task_says_what_to_do(self):
        games = ["talk", "gapfill", "jury", "storymap", "upgrade", "writebox", "counter", "task"]
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

    def test_the_real_task_and_how_the_jury_scores(self):
        i, k, sheet = self.find("wpaper")[0]
        self.assertEqual(sheet.get("task"), "m-w1")
        jury = json.dumps([b for b in self.steps[i]["blocks"] if b["type"] == "vtable"], ensure_ascii=False)
        for x in ["0 mistakes", "7 or more", "180", "275", "0 for the whole story"]:
            self.assertIn(x, jury)

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

    def test_plan_on_the_official_2024_25_task(self):
        i, k, sheet = [x for x in self.find("wpaper") if not x[2].get("task")][0]
        ours = " ".join([sheet["intro"], sheet["premise"], sheet["pointsLabel"]] + sheet["points"] + [sheet["outro"]])
        official = (ROOT / "tests" / "fixtures" / "writing-mun-2425.txt").read_text(encoding="utf-8")
        w = lambda t: re.findall(r"[a-z0-9]+", t.lower().replace("’", "'"))
        self.assertEqual(w(ours), w(official))
        self.assertTrue(self.find("storymap"))
        m = self.find("storymap")[0]
        key = "l3:%d:%d" % (m[0], m[1])
        out = render_step("l3", m[0], events=[["type", "lsnote", key + ":twist", "The dog finds the keys"]], with_store=True)
        self.assertIn("The dog finds the keys", out["html"])
        self.assertIn("The dog finds the keys", out["store"]["olymp-lessons"], "план помнится")

    def test_upgrade_versions_are_for_the_teacher(self):
        # Свою версию оценивает учитель; образцы — у неё, на экране их нет совсем.
        i, k, u = self.find("upgrade")[0]
        self.assertGreaterEqual(len(u["items"]), 6)
        html = render_step("l3", i)
        self.assertEqual([it["model"] for it in u["items"] if it["model"] in html], [])
        self.assertNotIn("data-lsmodel", html)

    def test_writing_box_like_at_the_olympiad(self):
        i, k, w = self.find("writebox")[0]
        html = render_step("l3", i)
        box = re.search(r"<textarea[^>]*data-lsnote=\"l3:%d:%d:text\"[^>]*>" % (i, k), html).group(0)
        self.assertIn('spellcheck="false"', box)
        self.assertIn("Anita had just arrived at her house when she realized she didn't have her keys.", html.replace("&#39;", "'"))
        self.assertIn("words", html)

    def test_the_jury_counter_turns_mistakes_into_points(self):
        i, k, c = self.find("counter")[0]
        key = "l3:%d:%d" % (i, k)
        html = render_step("l3", i, events=[["click", "lscount", key + ":gram:1"]] * 3 + [["click", "lscount", key + ":spell:1"]])
        self.assertRegex(html, r"Grammar[^<]*</b>\s*<span[^>]*>3 mistakes → 2 points")
        self.assertRegex(html, r"Spelling[^<]*</b>\s*<span[^>]*>1 mistake → 3 points")

    def test_homework_and_exam_box_without_spellcheck(self):
        links = [x["href"] for b in self.steps[-1]["blocks"] if b["type"] == "links" for x in b["items"]]
        self.assertIn("#/t/m-w1", links)
        # Олимпиада — на компьютере в тестирующей системе: подсказок орфографии там нет.
        self.assertRegex(HTML, r'id="wText"[^>]*spellcheck="false"')
        self.assertRegex(HTML, r'id="wTitle"[^>]*spellcheck="false"')


if __name__ == "__main__":
    unittest.main()
