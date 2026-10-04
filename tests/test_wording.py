"""Понятный интерфейс: простые английские слова, подсказка на каждой вкладке, шаги в задании.

Учитель попросил, чтобы всё было «примитивно понятно» и ничего не надо было искать:
поэтому без «плейлистных» метафор (tracks, now playing) и с одной строкой
«что здесь делать» на каждом экране-вкладке.
"""
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = [ROOT / "index.html"] + sorted((ROOT / "js").glob("*-ui.js"))


def visible_text(src):
    # имена CSS-классов — не текст для ученицы
    src = re.sub(r'class="[^"]*"', "", src)
    src = re.sub(r"\.[a-z-]+\{", "{", src)
    return src


class Wording(unittest.TestCase):
    def test_no_playlist_jargon(self):
        bad = []
        for f in FILES:
            txt = visible_text(f.read_text(encoding="utf-8"))
            for word in [r"\btracks?\b", r"now playing", r"Made for you", r"oral round", r">Practice<"]:
                for m in re.finditer(word, txt, flags=re.I):
                    bad.append("%s: %s" % (f.name, m.group(0)))
        self.assertEqual(bad, [])

    def test_every_tab_explains_itself(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        # главная (Exam) и Results — в index.html, остальные вкладки — в своих файлах
        self.assertGreaterEqual(html.count('class="howto"'), 2)
        for name in ["lexis-ui.js", "grammar-ui.js", "vocab-ui.js"]:
            self.assertIn('class="howto"', (ROOT / "js" / name).read_text(encoding="utf-8"), name)

    def test_task_shows_steps(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('class="steps"', html)


if __name__ == "__main__":
    unittest.main()
