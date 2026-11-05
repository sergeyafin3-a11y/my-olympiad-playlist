"""Плеер аудио внизу: только на экране задания с аудио и с кнопкой «закрыть».

12.10 учитель: плеер появлялся в Listening и потом висел на всех разделах,
закрыть его было нельзя.
"""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
HTML = (ROOT / "index.html").read_text(encoding="utf-8")


class Player(unittest.TestCase):
    def test_player_has_a_close_button(self):
        self.assertIn('id="plClose"', HTML)

    def test_player_hides_and_stops_outside_listening_tasks(self):
        self.assertIn("function syncPlayer(", HTML)
        self.assertIn("syncPlayer(", HTML[HTML.index("function render()"):HTML.index("function render()") + 1500])

    def test_practice_plays_its_own_recording_and_stops_at_its_own_border(self):
        # Учитель 05.11: на дом Listening прошлых лет. У них свой файл; границы варианта 2025/26 к ним не относятся.
        self.assertIn('au.getAttribute("src") !== src', HTML)
        self.assertIn("C.stopAfter(V, sec, clip)", HTML)
        self.assertIn("C.stopAfter(V, au.currentTime, clip)", HTML)
        self.assertIn("byId(b.dataset.task).audio", HTML)
        self.assertIn('(t.audio.src || V.audio) === au.getAttribute("src")', HTML)
        check = (ROOT / "js" / "check.js").read_text(encoding="utf-8")
        variant = (ROOT / "data" / "variant-mun-msk-25-26.js").read_text(encoding="utf-8")
        src = "var window = this;\n" + variant + "\n" + check + """
          var V = window.VARIANTS[0], C = window.Check, clip = {src: "x.mp3", stop: 500};
          JSON.stringify([C.stopAfter(V, 0), C.stopAfter(V, 400), C.stopAfter(V, 0, clip), C.stopAfter(V, 400, clip), C.stopAfter(V, 500, clip), C.stopAfter(V, 0, {src: "x.mp3"})]);"""
        out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout
        self.assertEqual(json.loads(out), [371, None, 500, 500, None, None])


if __name__ == "__main__":
    unittest.main()
