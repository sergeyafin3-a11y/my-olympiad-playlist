"""Отработка под каждым заданием Use of English муниципального этапа (просьба учителя 12.10).

Не придуманные задания, а официальные задания муниципального этапа Москвы прошлых лет
(2023/24 и 2024/25) в том же формате и с официальными ключами. 2022/23 не берём — он для пробника.
Отработка не идёт в баллы экзамена.

Ключи ниже — из отдельной, ранее сверенной с PDF выгрузки (не из файла данных), поэтому тест
ловит ошибку переноса.
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
    "2324": {
        "m-u1": ["far", "have", "too", "V", "of", "within", "a", "V", "made", "be", "being", "of", "V", "remains", "it"],
        "m-u2": ["for Suzy to reach", "will have gone off", "such terrible weather that", "take plenty of exercise/do plenty of exercise/have plenty of exercise/get plenty of exercise/take plenty of exercises/do plenty of exercises/have plenty of exercises/get plenty of exercises", "set off",
                 "was Vicki's favourite subject", "if it is sunny/if it gets sunny", "about time that he took/about time that he had/about time that he showed/about time that he expressed/about time he started taking/about time he started having/about time her husband took",
                 "would rather have gone", "would have the rubbish taken/would have the rubbish thrown/would have the rubbish cleaned"],
        "m-u3": ["coproduction/co-production", "nervous", "refuel", "miscalculated", "disappearance", "discomfort", "underestimated",
                 "supersonic", "superhero", "overconfident"],
        "m-u4": list("JEKAHMLFGB"),
    },
    "2425": {
        "m-u1": ["will", "one", "too", "a", "far", "being", "it", "V", "at", "a", "over", "had", "by", "after", "am"],
        "m-u2": ["whose favourite restaurant is/whose favorite restaurant is", "Help yourself to", "Against all odds", "had his luggage flown",
                 "had not been so much", "was a fall in the", "would be grateful if", "does this bag belong to", "not to have been",
                 "had great difficulty in persuading/had such great difficulty persuading"],
        "m-u3": ["Throughout", "non-academic/unacademic", "sustainable", "unemployed", "combination", "constantly", "achievement",
                 "whatever", "valuable", "expectations"],
        "m-u4": list("DIKLGNFCMA"),
        # Reading Task 2 (пирог Цветаевой): учитель 22.10 задала его на дом вместо задания 2025/26.
        "m-r2": list("GBKEIDCAJF"),
    },
    # Задание по культуре 2021/22: в бумаге без букв, буквы A–N — по порядку строк (как у соседних лет).
    "2122": {"m-u4": list("JEKAHMLFGB"),
             # Listening 2021/22: ключ в бумаге — словами и True/False; буквы A, B, C — по порядку строк бланка.
             "m-l1": list("BBAABBABAA"), "m-l2": list("BCAAC")},
}
# Listening с отрисованных страниц ответов: у 2023/24 и 2024/25 верный вариант выделен жирным.
KEYS["2324"].update({"m-l1": list("BABBBBABAB"), "m-l2": list("BBACA")})
KEYS["2425"].update({"m-l1": list("AABBABABBA"), "m-l2": list("BACBC")})


def run_js(body):
    files = ["data/variant-mun-msk-25-26.js", "data/practice-mun.js", "js/check.js"]
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] +
                    ["JSON.stringify((function(){ var P = window.PRACTICE['mun-msk-25-26'], C = window.Check, V = window.VARIANTS[0]; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


def norm(s):
    return re.sub(r"\s+", " ", str(s).strip().lower().replace("’", "'"))


class Practice(unittest.TestCase):
    def test_sets_under_each_use_of_english_task(self):
        r = run_js("""
          var out = {};
          Object.keys(P).forEach(function(k){ out[k] = P[k].map(function(t){ return [t.id, t.type, t.items.length, t.source || ""]; }); });
          var parent = {}; V.parts.forEach(function(p){ p.tasks.forEach(function(t){ parent[t.id] = t.type; }); });
          return {sets: out, parent: parent};
        """)
        self.assertEqual(sorted(r["sets"]), ["m-l1", "m-l2", "m-r2", "m-u1", "m-u2", "m-u3", "m-u4"])
        for tid, sets in r["sets"].items():
            self.assertGreaterEqual(sum(s[2] for s in sets), 10 if tid == "m-r2" else 15, tid)
            for sid, typ, n, src in sets:
                self.assertEqual(typ, r["parent"][tid], sid)
                self.assertRegex(src, r"official")

    def test_official_keys(self):
        r = run_js("""
          var out = {};
          Object.keys(P).forEach(function(k){ P[k].forEach(function(t){
            var y = /2021\\/22/.test(t.source) ? "2122" : /2023\\/24/.test(t.source) ? "2324" : /2024\\/25/.test(t.source) ? "2425" : "?";
            out[y + ":" + k] = t.items.slice().sort(function(a, b){ return a.n - b.n; }).map(function(it){ return t.type === "choice" ? it.a : it.accept; });
          }); });
          return out;
        """)
        for year, tasks in KEYS.items():
            for tid, want in tasks.items():
                got = r[year + ":" + tid]
                self.assertEqual(len(got), len(want), (year, tid))
                for i, (g, w) in enumerate(zip(got, want)):
                    # Весь набор допустимых ответов — как в официальном ключе: ни потерянных, ни придуманных.
                    alts = sorted(norm(a) for a in re.split(r"[/;]", w))
                    self.assertEqual(sorted(norm(x) for x in g), alts, (year, tid, i + 1))

    def test_full_marks_with_the_key_and_ids_do_not_clash(self):
        r = run_js("""
          var bad = [], ids = {};
          V.parts.forEach(function(p){ p.tasks.forEach(function(t){ ids[t.id] = 1; }); });
          Object.keys(P).forEach(function(k){ P[k].forEach(function(t){
            if (ids[t.id]) bad.push("dup " + t.id); ids[t.id] = 1;
            var sheet = {}; t.items.forEach(function(it){ sheet[it.n] = t.type === "choice" ? it.a[0] : it.accept[0]; });
            var s = C.score(t, sheet); if (s.got !== s.max) bad.push(t.id + " " + s.got + "/" + s.max);
          }); });
          return bad;
        """)
        self.assertEqual(r, [])

    def test_page_shows_practice_under_each_task_and_keeps_it_out_of_points(self):
        self.assertIn('src="data/practice-mun.js?v=', HTML)
        self.assertIn("PRACTICE", HTML)
        self.assertIn("✏️ Practice", HTML)
        # В баллы и в полный экзамен идут только задания варианта (TASKS), не отработка.
        self.assertIn("function sum(list)", HTML)
        self.assertNotIn("PTASKS.forEach(function (t) { TASKS.push", HTML)

    def test_every_text_has_a_heading(self):
        # Ревью PR 36: у пирога в бумаге нет заголовка, и страница показывала пустой «📄».
        r = run_js("""var bad = []; Object.keys(P).forEach(function(k){ P[k].forEach(function(t){
          if (t.text && !t.textTitle) bad.push(t.id); }); }); return bad;""")
        self.assertEqual(r, [])

    def test_practice_stays_outside_the_timed_exam(self):
        # Ревью PR 29: #/full/<отработка> падал в fullBar; ссылки на отработку уводили из экзамена на время;
        # «Continue: Use of English · Practice» на главной не говорил, что продолжить.
        self.assertIn('FULLMODE = parts[0] === "full" && !PARENT[parts[1]]', HTML)
        self.assertIn("if (PRACTICE[t.id] && !FULLMODE)", HTML)
        self.assertIn("PARENT[last.id] ? last.title", HTML)


class ListeningPractice(unittest.TestCase):
    """Учитель 05.11: на дом — Listening, несколько вариантов, «аудиозаписи официальные» и как это делать.
    Записи, задания и ключи — официальные за 2021/22, 2023/24 и 2024/25 (2022/23 — для пробника)."""
    YEARS = {"2122": "2021/22", "2324": "2023/24", "2425": "2024/25"}

    def sets(self):
        files = ["data/variant-mun-msk-25-26.js", "data/practice-mun.js", "data/explain-mun.js", "data/howto-mun.js"]
        src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in files] +
                        ["JSON.stringify({l1: window.PRACTICE['mun-msk-25-26']['m-l1'], l2: window.PRACTICE['mun-msk-25-26']['m-l2'], ex: window.EXPLAIN, how: window.HOWTO.tasks});"])
        return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)

    def by_year(self):
        r = self.sets()
        out = {}
        for kind in ("l1", "l2"):
            for t in r[kind]:
                y = [k for k, v in self.YEARS.items() if v in t["source"]][0]
                out[(y, kind)] = t
        self.assertEqual(sorted(out), sorted((y, k) for y in self.YEARS for k in ("l1", "l2")))
        return out, r

    def test_words_are_the_official_ones(self):
        w = lambda s: re.findall(r"[a-z0-9]+", unicodedata.normalize("NFC", s).lower().replace("’", "'").replace("`", "'"))
        sets, _ = self.by_year()
        for (y, kind), t in sets.items():
            ours = [t["intro"]]
            for it in t["items"]:
                ours += [str(it["n"]), it["q"]] + [o["t"] for o in it.get("opts", [])]
            official = (ROOT / "tests" / "fixtures" / ("listening-mun-%s-task%s.txt" % (y, kind[1]))).read_text(encoding="utf-8")
            self.assertEqual(w(" ".join(ours)), w(official), (y, kind))

    def test_each_task_plays_its_own_official_recording(self):
        sets, _ = self.by_year()
        for y, year in self.YEARS.items():
            one, two = sets[(y, "l1")]["audio"], sets[(y, "l2")]["audio"]
            self.assertEqual(one["src"], two["src"])
            self.assertTrue((ROOT / one["src"]).is_file(), one["src"])
            self.assertIn(year[2:].replace("/", "-"), one["src"])
            self.assertIn(year, one["title"])
            self.assertEqual(one["from"], 0)
            self.assertEqual(one["stop"], two["from"], "Task 1 кончается там, где начинается Task 2")
            self.assertNotIn("stop", two, "Task 2 — до конца записи")
            self.assertIn("twice", one["label"])
            self.assertIn("once", two["label"])

    def test_every_question_has_a_breakdown_quoting_the_recording(self):
        def text(s):
            s = unicodedata.normalize("NFC", s).replace("’", "'").replace("`", "'").replace("“", "").replace("”", "")
            return re.sub(r"\s+", " ", re.sub(r"-\s*\n\s*", "-", s))
        sets, r = self.by_year()
        for (y, kind), t in sets.items():
            script = text((ROOT / "tests" / "fixtures" / ("listening-mun-%s-script.txt" % y)).read_text(encoding="utf-8"))
            for it in t["items"]:
                e = r["ex"][t["id"]][str(it["n"])]
                self.assertIn("Answer: " + it["a"][0], e, (t["id"], it["n"]))
                self.assertNotRegex(e, "[а-яё]")
                quotes = re.findall(r'"([^"]+)"', e)
                self.assertTrue(quotes, (t["id"], it["n"]))
                for q in quotes:
                    self.assertIn(text(q), script, (t["id"], it["n"]))

    def test_breakdown_does_not_claim_what_the_recording_does_not_say(self):
        # Ревью PR 57: «no rule about designer labels» в записи нет; менеджер на вопрос про лейблы говорит «Yes».
        _, r = self.by_year()
        e = r["ex"]["p-l2-2425"]["4"]
        self.assertNotIn("no rule about designer labels", e)
        self.assertIn("Staff can wear some of our fashions.", e)

    def test_lesson_link_opens_a_task_of_another_stage(self):
        # Ревью PR 57: отработка есть только у муниципального этапа. Выбран другой этап — ссылка из домашки молча открывала главную.
        a = HTML.index("function variantOf(id)")
        b = HTML.index("\n  }\n", a) + 4
        src = "var window = this; var LIST = [{id: 'a', parts: [{tasks: [{id: 't1'}]}]}, {id: 'b', parts: [{tasks: [{id: 't2'}]}]}, {id: 'c'}];" \
              "window.PRACTICE = {a: {t1: [{id: 'p1'}]}};" + HTML[a:b] + \
              "JSON.stringify([variantOf('p1').id, variantOf('t1').id, variantOf('t2').id, variantOf('zz') || null]);"
        out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout
        self.assertEqual(json.loads(out), ["a", "a", "b", None])
        render = HTML[HTML.index("function render()"):HTML.index("function render()") + 900]
        self.assertIn("variantOf(parts[1])", render)
        # Если браузер не сохранил выбор, перезагрузка не должна идти по кругу: reload — только после успешной записи.
        self.assertRegex(render, r"try \{ localStorage\.setItem\(VKEY, other\.id\); location\.reload\(\); return; \}")

    def test_how_to_card_describes_this_recording(self):
        # Карточка задания 2025/26 говорит про пилота и Сан-Франциско: на чужой записи она бы обманывала.
        sets, r = self.by_year()
        for t in sets.values():
            how = r["how"][t["id"]]
            self.assertNotIn("pilot talks", how["what"])
            self.assertNotIn("San Francisco", how["what"])
            self.assertTrue(how["steps"])


if __name__ == "__main__":
    unittest.main()
