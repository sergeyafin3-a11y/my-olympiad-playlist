"""Автообновление: открытая страница сама узнаёт, что вышла новая версия, и перезагружается.

11.10 учитель видела уже удалённую подсказку: GitHub Pages разрешает браузеру
10 минут держать старую index.html. Метки ?v= у скриптов это не лечат —
сама страница старая. Поэтому страница сверяет свою версию с version.json.
"""
import json
import pathlib
import re
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import bump_version  # noqa: E402


class AutoUpdate(unittest.TestCase):
    def test_page_and_version_file_agree_with_the_content(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        m = re.search(r'<meta name="app-version" content="([0-9a-f]{10})">', html)
        self.assertIsNotNone(m, "в index.html нет метки версии")
        v = json.loads((ROOT / "version.json").read_text(encoding="utf-8"))["v"]
        self.assertEqual(m.group(1), v, "version.json и страница расходятся — запусти tools/bump_version.py")
        self.assertEqual(v, bump_version.page_version(), "версия устарела — запусти tools/bump_version.py")

    def test_page_checks_for_a_newer_version(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('fetch("version.json', html)
        self.assertIn("no-store", html)
        # Ревью: при заблокированном sessionStorage страница перезагружалась бы без конца.
        self.assertIn('q.get("r") === j.v', html)


if __name__ == "__main__":
    unittest.main()
