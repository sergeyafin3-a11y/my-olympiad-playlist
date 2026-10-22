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
        # Урок Reading перенесён учителем с 19.10 на четверг 22.10.
        self.assertIn("2026-10-22", dates)
        self.assertTrue(all(d < "2026-11-21" for d in dates))
        self.assertTrue(all(x[2] for x in r))

    def test_todays_lesson_is_a_full_50_minute_ppp_lesson(self):
        r = run_js("""
          var l = L.filter(function(x){ return x.date === "2026-10-22"; })[0];
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


def render_step(lesson_id, step, clicks=()):
    """HTML шага урока, как его рисует js/lesson-ui.js; clicks — data-атрибуты кнопок, нажатых по порядку."""
    stub = """
      var window = this, store = {}, handlers = [];
      var el = function(){ return {textContent: "", appendChild: function(){}, classList: {add: function(){}, remove: function(){}}}; };
      var document = {createElement: el, head: {appendChild: function(){}}, body: {appendChild: function(){}},
                      addEventListener: function(t, f){ if (t === "click") handlers.push(f); }, querySelectorAll: function(){ return []; }};
      var localStorage = {getItem: function(k){ return store[k] || null; }, setItem: function(k, v){ store[k] = v; }};
      var location = {hash: "#/lesson/LID"};
      window.addEventListener = function(){}; var setInterval = function(){}; window.scrollTo = function(){};
      window.App = {esc: function(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); },
                    render: function(){}, keepScroll: function(f){ f(); }, routes: {}, words: {}};
    """.replace("LID", lesson_id)
    clicks_js = json.dumps(list(clicks))
    js = stub + (ROOT / "data" / "lessons.js").read_text(encoding="utf-8") + """
      var o = {}; o["LID"] = STEP; store["olymp-lessons"] = JSON.stringify({step: o});
    """.replace("LID", lesson_id).replace("STEP", str(step)) + (ROOT / "js" / "lesson-ui.js").read_text(encoding="utf-8") + """
      JSON.parse(CLICKS).forEach(function(c){
        var ds = {}; ds[c[0]] = c[1];
        var btn = {dataset: ds, closest: function(sel){ return sel === "button" ? btn : null; }};
        handlers.forEach(function(h){ h({target: btn}); });
      });
      window.App.routes.lesson(["lesson", "LID"]);
    """.replace("CLICKS", json.dumps(clicks_js)).replace("LID", lesson_id)
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", js], capture_output=True, text=True)
    if out.returncode:
        raise AssertionError(out.stderr[-500:])
    return out.stdout


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
          return {steps: l.steps, intro: t.intro, key: key};
        """)

    def test_right_after_the_warm_up_the_real_task_and_what_to_do(self):
        r = self.l2()
        meet = r["steps"][1]
        types = [b["type"] for b in meet["blocks"]]
        self.assertIn("paper", types, "сразу после разминки — настоящее задание целиком, как на олимпиаде")
        paper = [b for b in meet["blocks"] if b["type"] == "paper"][0]
        # Инструкция — слово в слово официальная (та же, что у задания 2025/26 в приложении).
        self.assertEqual(paper["instruction"], r["intro"])
        self.assertIn("2024/25", paper["source"])
        text = " ".join(paper["paras"])
        self.assertEqual(re.findall(r"\[(\d+)\]", text), [str(n) for n in range(1, 11)])
        self.assertEqual([o["k"] for o in paper["opts"]], list("ABCDEFGHIJK"))
        self.assertIn("By Marina's own admission", paper["opts"][10]["t"])
        # Ниже задания — что с ним делать, простыми пунктами; ключа на экране нет.
        after = types[types.index("paper") + 1:]
        self.assertIn("list", after)
        todo = [b for b in meet["blocks"] if b["type"] == "list"][0]
        self.assertIn("What you have to do", todo["title"])
        self.assertGreaterEqual(len(todo["items"]), 4)

    def test_the_sheet_is_the_official_text_word_for_word(self):
        # Ревью PR 35: «neat» → «nice» проходило все тесты. Сверяем по словам с текстом официального
        # PDF (tests/fixtures/reading2-mun-2425.txt — выписка из tasks-engl-10-11-mun-msk-24-25.pdf).
        paper = [b for b in self.l2()["steps"][1]["blocks"] if b["type"] == "paper"][0]
        def words(t):
            return re.findall(r"[a-z0-9]+", t.lower().replace("’", "'").replace("‘", "'"))
        official = (ROOT / "tests" / "fixtures" / "reading2-mun-2425.txt").read_text(encoding="utf-8")
        ours = " ".join([paper["instruction"]] + paper["paras"] + [o["k"] + ") " + o["t"] for o in paper["opts"]])
        self.assertEqual(words(ours.replace("[", "(").replace("]", ")")), words(official))

    def test_one_gap_solved_together_step_by_step_before_any_exercise(self):
        r = self.l2()
        together = r["steps"][2]
        self.assertEqual(together["stage"], "presentation")
        walk = [b for b in together["blocks"] if b["type"] == "walk"]
        self.assertEqual(len(walk), 1, "один пропуск того же текста решаем вместе, по шагам")
        w = walk[0]
        self.assertIn("[" + str(w["gap"]) + "]", w["context"])
        self.assertEqual(w["answer"], KEY_2425[w["gap"] - 1], "ответ разбора — по официальному ключу")
        # Ревью PR 35: в 2024/25 и 2025/26 у шести пропусков одинаковые буквы (3 — K, 9 — J…).
        # Разобранный пропуск не должен совпадать с ответом задания, которое Варя решает потом.
        self.assertNotEqual(w["answer"], r["key"][str(w["gap"])], "разбор подсказал бы ответ задания 2025/26")
        self.assertGreaterEqual(len(w["steps"]), 3)
        self.assertTrue(all(s["q"] and s["a"] for s in w["steps"]))
        # Потом пропуск сам: верный вариант — по официальному ключу.
        quiz = [b for b in together["blocks"] if b["type"] == "quiz"][0]["items"][0]
        gap = int(re.search(r"Gap (\d+)", quiz["q"]).group(1))
        self.assertTrue(quiz["opts"][quiz["a"]].startswith(KEY_2425[gap - 1] + "."))
        self.assertNotEqual(KEY_2425[gap - 1], r["key"][str(gap)], "пропуск «сама» подсказал бы ответ задания 2025/26")
        # Какое предложение лишнее в 2024/25 — не говорим: в 2025/26 эта буква — чей-то ответ.
        self.assertNotIn("extra sentence of this task", json.dumps(together))
        kinds = [b["type"] for s in r["steps"][:3] for b in s["blocks"]]
        for game in ["hookhunt", "sort", "gapfill"]:
            self.assertNotIn(game, kinds, "упражнения — после того, как поняли задание")

    def test_every_exercise_says_what_to_do(self):
        r = self.l2()
        # Разминку учитель одобрила как есть (22.10: «вармап хороший»), её не трогаем; но любая игра
        # после неё — со своим «What to do».
        games = ["walk", "quiz", "hookhunt", "sort", "gapfill", "task", "binword", "thisorthat", "speak"]
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
        # Задание 2025/26 Варя решает в production — до него в уроке нет ни его предложений, ни букв.
        # Ревью PR 35: сравнивали только начало предложения и по исходнику с ** и фигурными
        # кавычками — цитата из середины или «**They say** …» проходили. Теперь: строки урока
        # до production, по словам, любые 6 слов подряд.
        def words(t):
            return re.findall(r"[a-z0-9]+", t.lower().replace("’", "'"))
        def runs(ws):
            return {" ".join(ws[i:i + 6]) for i in range(len(ws) - 5)}
        r = run_js("""
          var t = null; V.parts.forEach(function(p){ p.tasks.forEach(function(x){ if (x.id === "m-r2") t = x; }); });
          var l = L.filter(function(x){ return x.id === "l2"; })[0], before = [];
          for (var i = 0; l.steps[i].stage !== "production"; i++) before.push(l.steps[i]);
          var key = {}; t.items.forEach(function(it){ key[it.n] = it.a[0]; });
          return {real: t.opts.map(function(o){ return o.t; }).concat(t.text), lesson: JSON.stringify(before), key: key};
        """)
        real = set()
        for piece in r["real"]:
            real |= runs(words(piece))
        lesson = words(r["lesson"].replace("**", " ").replace("\\", " "))
        self.assertEqual(sorted(runs(lesson) & real), [])
        # Пропуски, у которых в 2024/25 и 2025/26 одна и та же буква, урок до задания не называет.
        text = r["lesson"].lower()
        shared = [n for n in range(1, 11) if KEY_2425[n - 1] == r["key"][str(n)]]
        self.assertEqual(sorted(set(shared)), [1, 3, 4, 5, 9, 10])
        hits = [n for n in shared if re.search(r"\bgaps? %d\b|\b%d\s*[–=-]\s*%s\b" % (n, n, KEY_2425[n - 1].lower()), text)]
        self.assertEqual(hits, [])

    def test_hints_stay_hidden_until_asked(self):
        # Ревью PR 35, второй круг: блоки шага видны все сразу, и подсказки под разбором
        # («born → birthday», «It gives desserts a very similar…») выдавали ответ до «Show».
        # Слова верного предложения, которых нет ни в тексте вокруг пропуска, ни в других
        # вариантах, не встречаются в шаге за пределами самого упражнения.
        r = self.l2()
        blocks = r["steps"][2]["blocks"]
        paper = {o["k"]: o["t"] for b in r["steps"][1]["blocks"] if b["type"] == "paper" for o in b["opts"]}
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
        for n in range(1, 11):
            self.assertIn("(%d) ________" % n, html)
        self.assertEqual(len(re.findall(r'<b>[A-K]\)</b>', html)), 11)
        self.assertIn("ls-grid", html)

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


if __name__ == "__main__":
    unittest.main()
