"""Навигация: разделы переключаются вкладками внизу, а не лежат одним списком на главной."""
import pathlib
import re
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class Tabs(unittest.TestCase):
    def test_tab_bar_lists_every_section_in_order(self):
        tabs = re.findall(r'\{ href: "(#/[a-z]*)", icon: "[^"]+", label: "([^"]+)"', HTML)
        self.assertEqual([t[0] for t in tabs], ["#/", "#/lexis", "#/grammar", "#/words", "#/results"])
        self.assertIn('class="tabbar"', HTML)

    def test_home_no_longer_stacks_practice_sections(self):
        self.assertNotIn('<h2 class="list-h">Practice</h2>', HTML)

    def test_bottom_bars_stack_above_the_tab_bar(self):
        # плеер и полоса «Check answers» не должны прятаться под вкладками
        self.assertIn("--tabbar", HTML)
        player = re.search(r"\.player\{[^}]*\}", HTML).group(0)
        actions = re.search(r"\.actions\{[^}]*\}", HTML).group(0)
        self.assertIn("var(--tabbar)", player)
        self.assertIn("var(--dock)", actions)


if __name__ == "__main__":
    unittest.main()
