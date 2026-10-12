"""Весь интерфейс и все объяснения — на английском (просьба учителя 11.10).

Русский остаётся только там, где он часть задачи:
- встроенный словарик переводов (data/dict.js) — ради него он и нужен;
- факт-файл Speaking финала — в официальном задании он на русском намеренно:
  участник читает факты по-русски и рассказывает их по-английски (и его заголовок place);
- образец 0 в Hidden animals финала: «(ewe – овца)» стоит так в официальном задании.
"""
import json
import pathlib
import re
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
CYR = re.compile(r"[А-Яа-яЁё]")
DATA = ["data/variant-mun-msk-25-26.js", "data/variant-reg-25-26.js", "data/variant.js", "data/howto.js", "data/howto-mun.js",
        "data/howto-reg.js", "data/explain.js", "data/explain-mun.js", "data/explain-reg.js", "data/videos.js",
        "data/grammar/grammar-a1.js", "data/grammar/grammar-a2.js", "data/grammar/grammar-b1.js", "data/grammar/grammar-b2.js",
        "data/lexis/lexis-wf.js", "data/lexis/lexis-pv.js", "data/lexis/lexis-wp.js"]


def russian_in_data():
    walk = """
      var bad = [];
      function walk(x, path) {
        if (/\\.place$/.test(path) || /\\.fact(\\.|$)/.test(path) || /\\.fact_en(\\.|$)/.test(path)) return;
        if (typeof x === "string") { if (/[А-Яа-яЁё]/.test(x.replace("(ewe – овца)", ""))) bad.push(path + ": " + x.slice(0, 80)); return; }
        if (x && typeof x === "object") Object.keys(x).forEach(function (k) { walk(x[k], path + "." + k); });
      }
      ["VARIANTS", "HOWTO", "EXPLAIN", "VIDEOS", "GRAMMAR", "LEXIS"].forEach(function (k) { walk(window[k], k); });
      return bad;
    """
    src = "\n".join(["var window = this;"] + [(ROOT / f).read_text(encoding="utf-8") for f in DATA] +
                    ["JSON.stringify((function(){" + walk + "})());"])
    return json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)


def strip_comments(src):
    # Комментарии в коде — по-русски по правилам проекта, это не текст для ученицы.
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"<!--.*?-->", "", src, flags=re.S)
    return "\n".join(re.sub(r"(^|\s)//.*$", "", line) for line in src.splitlines())


class English(unittest.TestCase):
    def test_no_russian_in_tasks_rules_and_explanations(self):
        bad = russian_in_data()
        self.assertEqual(bad[:40], [], "%d strings in Russian" % len(bad))

    def test_no_russian_in_screens(self):
        bad = []
        for f in [ROOT / "index.html"] + sorted((ROOT / "js").glob("*.js")):
            for n, line in enumerate(strip_comments(f.read_text(encoding="utf-8")).splitlines(), 1):
                if CYR.search(line):
                    bad.append("%s:%d %s" % (f.name, n, line.strip()[:100]))
        self.assertEqual(bad, [])

    def test_official_fact_file_stays_as_in_the_exam(self):
        # Официальная карточка финала: факт-файл на русском. Не «исправлять».
        src = (ROOT / "data" / "variant.js").read_text(encoding="utf-8")
        self.assertIn("Происхождение и история праздника", src)
        self.assertIn("Масленица", src)


if __name__ == "__main__":
    unittest.main()
