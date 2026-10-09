"""Несколько вариантов: муниципальный этап (Москва) и финал. Каждый задан целиком и объяснён.

Урок 09.10 показал: задание без объяснения на уроке не работает. Поэтому у каждого
задания каждого варианта обязательна карточка «How to solve», а у Use of English —
разбор каждого вопроса, сверенный с ключом.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ["data/variant-mun-msk-25-26.js", "data/variant.js", "data/howto.js", "data/howto-mun.js",
        "data/explain.js", "data/explain-mun.js", "js/check.js"]


def run_js(body):
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in DATA] +
                    ["JSON.stringify((function(){ var L = window.VARIANTS, H = window.HOWTO, E = window.EXPLAIN, C = window.Check; " + body + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


class Variants(unittest.TestCase):
    def test_municipal_first_final_second_ids_unique(self):
        r = run_js("""
          var ids = [];
          L.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(t){ ids.push(t.id); }); }); });
          return {variants: L.map(function(v){ return v.id; }), dup: ids.filter(function(x, i){ return ids.indexOf(x) !== i; })};
        """)
        self.assertEqual(r["variants"], ["mun-msk-25-26", "final-2025-26"])
        self.assertEqual(r["dup"], [])

    def test_every_task_of_every_variant_has_how_to_solve(self):
        r = run_js("""
          var bad = [];
          L.forEach(function(v){ v.parts.forEach(function(p){ p.tasks.forEach(function(t){
            var h = H.tasks[t.id];
            if (!h || !h.what || !h.steps || h.steps.length < 2) bad.push(t.id);
          }); }); });
          if (!(H.stages && H.stages["mun-msk-25-26"])) bad.push("stage note for municipal");
          return bad;
        """)
        self.assertEqual(r, [])

    def test_municipal_use_of_english_items_have_breakdowns_with_the_key(self):
        r = run_js("""
          var bad = [], v = L[0];
          v.parts.forEach(function(p){ p.tasks.forEach(function(t){
            if (t.section !== "uoe") return;
            t.items.forEach(function(it){
              var e = (E[t.id] || {})[it.n];
              if (!e) { bad.push(t.id + "#" + it.n + ": нет разбора"); return; }
              var up = e.toUpperCase();
              var ok = t.type === "choice" ? it.a.some(function(k){ return up.indexOf("ANSWER: " + k) >= 0; })
                                           : it.accept.some(function(a){ return up.indexOf(String(a).toUpperCase()) >= 0; });
              if (!ok) bad.push(t.id + "#" + it.n + ": нет ответа из ключа");
            });
          }); });
          return bad;
        """)
        self.assertEqual(r, [])

    def test_key_gives_full_marks_and_part_max_matches(self):
        r = run_js("""
          var v = L[0], out = [];
          v.parts.forEach(function(p){
            var got = 0, max = 0;
            p.tasks.forEach(function(t){
              if (t.type === "writing" || t.type === "speaking") { max += C.score(t, {}).max; return; }
              var sheet = {};
              t.items.forEach(function(it){ sheet[it.n] = t.type === "choice" ? it.a[0] : t.type === "pair" ? [it.accept[0][0], it.accept[1][0]] : it.accept[0]; });
              var r = C.score(t, sheet); got += r.got; max += r.max;
            });
            out.push([p.id, p.max, max, got]);
          });
          return out;
        """)
        for pid, declared, mx, got in r:
            self.assertEqual(declared, mx, pid)
        auto = [x for x in r if x[0] != "w"]
        for pid, _, mx, got in auto:
            self.assertEqual(got, mx, pid)

    def test_page_loads_both_and_can_switch(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/variant-mun-msk-25-26.js?v=', html)
        self.assertLess(html.index("variant-mun-msk-25-26.js"), html.index('src="data/variant.js'))
        self.assertIn("data-variant", html)
        self.assertTrue((ROOT / "media" / "listening-mun-msk-25-26.mp3").is_file())


if __name__ == "__main__":
    unittest.main()
