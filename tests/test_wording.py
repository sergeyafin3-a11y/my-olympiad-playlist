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
        # Results, Writing и Speaking — в index.html, остальные вкладки — в своих файлах
        self.assertGreaterEqual(html.count('class="howto"'), 2)
        for name in ["lexis-ui.js", "grammar-ui.js", "vocab-ui.js"]:
            self.assertIn('class="howto"', (ROOT / "js" / name).read_text(encoding="utf-8"), name)

    def test_task_shows_steps(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('class="steps"', html)


class Name(unittest.TestCase):
    def test_app_is_called_lexicon_legend(self):
        # Приложение — не только для олимпиады, поэтому название общее.
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("<title>Lexicon Legend</title>", html)
        self.assertIn("<h1>Lexicon<br>Legend</h1>", html)
        self.assertNotIn("Olympiad Playlist", html)


class HomeHint(unittest.TestCase):
    def test_home_has_no_long_instruction(self):
        # Учитель попросила убрать с главной строку «Do the full exam like at the olympiad…».
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertNotIn("Do the <b>full exam</b>", html)


if __name__ == "__main__":
    unittest.main()
