"""Плеер аудио внизу: только на экране задания с аудио и с кнопкой «закрыть».

12.10 учитель: плеер появлялся в Listening и потом висел на всех разделах,
закрыть его было нельзя.
"""
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class Player(unittest.TestCase):
    def test_player_has_a_close_button(self):
        self.assertIn('id="plClose"', HTML)

    def test_player_hides_and_stops_outside_listening_tasks(self):
        self.assertIn("function syncPlayer(", HTML)
        self.assertIn("syncPlayer(", HTML[HTML.index("function render()"):HTML.index("function render()") + 1500])


if __name__ == "__main__":
    unittest.main()
