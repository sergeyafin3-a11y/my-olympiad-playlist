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
    },
}


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
        self.assertEqual(sorted(r["sets"]), ["m-u1", "m-u2", "m-u3", "m-u4"])
        for tid, sets in r["sets"].items():
            self.assertGreaterEqual(sum(s[2] for s in sets), 15, tid)
            for sid, typ, n, src in sets:
                self.assertEqual(typ, r["parent"][tid], sid)
                self.assertRegex(src, r"official")

    def test_official_keys(self):
        r = run_js("""
          var out = {};
          Object.keys(P).forEach(function(k){ P[k].forEach(function(t){
            var y = /2023\\/24/.test(t.source) ? "2324" : /2024\\/25/.test(t.source) ? "2425" : "?";
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

    def test_practice_stays_outside_the_timed_exam(self):
        # Ревью PR 29: #/full/<отработка> падал в fullBar; ссылки на отработку уводили из экзамена на время;
        # «Continue: Use of English · Practice» на главной не говорил, что продолжить.
        self.assertIn('FULLMODE = parts[0] === "full" && !PARENT[parts[1]]', HTML)
        self.assertIn("if (PRACTICE[t.id] && !FULLMODE)", HTML)
        self.assertIn("PARENT[last.id] ? last.title", HTML)


if __name__ == "__main__":
    unittest.main()
