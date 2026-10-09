"""«Как решать»: у каждого задания варианта есть понятное объяснение по-русски.

На уроке 09.10 учитель не смогла понять по экрану, что делать в Hidden animals,
в смешанном Task 3 и в устной части: задания были перенесены дословно, а
объяснений не было. Теперь объяснение — обязательная часть каждого задания.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run_js(body):
    src = "\n".join([
        "var window = this;",
        (ROOT / "data" / "variant-mun-msk-25-26.js").read_text(encoding="utf-8"),
        (ROOT / "data" / "variant.js").read_text(encoding="utf-8"),
        (ROOT / "data" / "howto.js").read_text(encoding="utf-8"),
        (ROOT / "data" / "howto-mun.js").read_text(encoding="utf-8"),
        "JSON.stringify((function(){ var V = window.VARIANT, H = window.HOWTO; " + body + "})());",
    ])
    out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


class HowTo(unittest.TestCase):
    def test_every_task_explains_what_and_how(self):
        r = run_js("""
          var bad = [];
          V.parts.forEach(function(p){ p.tasks.forEach(function(t){
            var h = H.tasks[t.id];
            if (!h) { bad.push(t.id + ": нет объяснения"); return; }
            if (!h.what) bad.push(t.id + ": нет «что проверяют»");
            if (!h.steps || h.steps.length < 2) bad.push(t.id + ": меньше двух шагов");
          }); });
          return bad;
        """)
        self.assertEqual(r, [])

    def test_explanations_do_not_leak_answers(self):
        # Объяснение учит решать, а не подсказывает ответ: ни одного слова из ответов на ввод.
        r = run_js("""
          // Сверяем объяснение задания с ответами ЭТОГО же задания: слово «listen» в советах
          // к аудированию — не подсказка к анаграмме LISTEN из другого задания.
          var leaks = [];
          window.VARIANTS.forEach(function(VV){ VV.parts.forEach(function(p){ p.tasks.forEach(function(t){
            var h = H.tasks[t.id]; if (!h) return;
            var txt = " " + JSON.stringify(h).toLowerCase().replace(/[^a-z' ]+/g, " ") + " ";
            (t.items || []).forEach(function(it){
              var acc = t.type === "pair" ? [].concat.apply([], it.accept) : (t.type === "text" ? it.accept : []);
              acc.forEach(function(a){ a = String(a).toLowerCase(); if (a.length >= 4 && txt.indexOf(" " + a + " ") >= 0) leaks.push(t.id + ": " + a); });
            });
          }); }); });
          return leaks;
        """)
        self.assertEqual(r, [])

    def test_stage_is_named_and_marked_as_hardest(self):
        r = run_js("return H.stage;")
        self.assertIn("заключительный", r["title"].lower())
        self.assertTrue(r["note"])

    def test_page_shows_it(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/howto.js?v=', html)
        self.assertIn('class="how"', html)
        # Плашку этапа на главной учитель попросила убрать (11.10): на экране её нет.
        self.assertNotIn("variantSwitch() + stageNote()", html)


if __name__ == "__main__":
    unittest.main()
