"""Кэш браузера: после обновления страница не должна смешиваться со старыми скриптами.

GitHub Pages отдаёт файлы с max-age=600: десять минут браузер может держать
старый js/*.js рядом с новым index.html — и разделы падают. Поэтому у каждого
своего скрипта в index.html метка ?v=<версия>, а версия — отпечаток содержимого
всех этих файлов: поменялся любой — меняется метка, и браузер берёт свежий.
Обновить метку: python3 tools/bump_version.py
"""
import pathlib
import re
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))
import bump_version  # noqa: E402


class CacheBusting(unittest.TestCase):
    def test_every_local_script_carries_the_current_version(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        srcs = re.findall(r'<script src="([^"]+)"', html)
        local = [s for s in srcs if not s.startswith("http")]
        self.assertGreater(len(local), 5)
        want = bump_version.fingerprint()
        for s in local:
            self.assertRegex(s, r"\?v=[0-9a-f]{10}$", s)
            self.assertTrue(s.endswith("?v=" + want),
                            "%s: версия устарела, запусти python3 tools/bump_version.py" % s)


if __name__ == "__main__":
    unittest.main()
