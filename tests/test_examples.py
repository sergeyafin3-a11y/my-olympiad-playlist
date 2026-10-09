"""Образцы «найди лишнее слово»: лишнее слово отмечено прямо в тексте, а не только ответом под ним."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


class ExtraWordExamples(unittest.TestCase):
    def test_example_00_marks_the_extra_word_inside_the_sentence(self):
        src = "\n".join(["var window = this;", (ROOT / "data" / "variant-mun-msk-25-26.js").read_text(encoding="utf-8"),
                         "JSON.stringify(window.VARIANTS[0].parts[2].tasks[0].examples);"])
        ex = json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout)
        e00 = [e for e in ex if e["label"] == "00"][0]
        self.assertEqual(e00["strike"], "a")
        self.assertIn(e00["near"], e00["show"])
        self.assertIn(" a ", " " + e00["near"] + " ")
        e0 = [e for e in ex if e["label"] == "0"][0]
        self.assertTrue(e0.get("correct"))

    def test_page_draws_the_mark(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('class="xw"', html)
        self.assertIn("function exampleText(", html)


if __name__ == "__main__":
    unittest.main()
