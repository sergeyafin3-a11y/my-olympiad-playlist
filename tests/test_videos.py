"""Устная часть: у каждой карточки есть видео и честная пометка, что это не олимпиадный ролик."""
import json
import pathlib
import subprocess
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent


class Videos(unittest.TestCase):
    def test_each_speaking_card_has_a_video(self):
        src = "\n".join(["var window = this;",
                         (ROOT / "data" / "variant.js").read_text(encoding="utf-8"),
                         (ROOT / "data" / "videos.js").read_text(encoding="utf-8"),
                         """JSON.stringify(window.VARIANT.parts[3].tasks[0].cards.map(function(c){
                              var v = window.VIDEOS[c.id] || [];
                              return [c.id, v.length, v.every(function(x){ return /^https:\\/\\//.test(x.url) && !!x.label; })];
                            }));"""])
        out = json.loads(subprocess.run(["osascript", "-l", "JavaScript", "-e", src],
                                        capture_output=True, text=True, check=True).stdout)
        for cid, n, ok in out:
            self.assertGreaterEqual(n, 1, cid)
            self.assertTrue(ok, cid)

    def test_screen_shows_videos_and_says_they_are_not_official(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('src="data/videos.js?v=', html)
        self.assertIn('class="videos"', html)
        self.assertIn("not the official olympiad video", html)


if __name__ == "__main__":
    unittest.main()
