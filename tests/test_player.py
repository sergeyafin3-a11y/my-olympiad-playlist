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

    def simulate(self, steps):
        """Настоящий код плеера из index.html на заглушке аудио: порядок событий — как у браузера."""
        a = HTML.index("// ---------- player ----------")
        b = HTML.index("window.App = {", a)
        check = (ROOT / "js" / "check.js").read_text(encoding="utf-8")
        variant = (ROOT / "data" / "variant-mun-msk-25-26.js").read_text(encoding="utf-8")
        src = "var window = this;\n" + variant + "\n" + check + """
          var V = window.VARIANTS[0], C = window.Check, els = {};
          function el(id) { if (!els[id]) els[id] = { dataset: {}, setAttribute: function(){}, classList: {add: function(){}, remove: function(){}}, innerHTML: "", textContent: "", hidden: true, addEventListener: function(){} }; return els[id]; }
          var ls = {}, au = { readyState: 0, currentTime: 0, seeking: false, paused: true, duration: 700, attr: null,
            getAttribute: function(){ return this.attr; },
            set src(v) { this.attr = v; this.readyState = 0; this.currentTime = 0; }, get src() { return this.attr || ""; },
            addEventListener: function(n, f){ (ls[n] = ls[n] || []).push(f); },
            play: function(){ this.paused = false; return { catch: function(){} }; }, pause: function(){ this.paused = true; } };
          function fire(n) { (ls[n] || []).slice().forEach(function(f){ f({}); }); }
          els.au = au;
          var esc = function(x){ return x; }, fmt = function(x){ return x; }, byId = function(){ return null; }, document = { body: { classList: {add: function(){}, remove: function(){}} } };
          function scenario() {  // не run: так osascript зовёт точку входа сам
            var $ = el;  // глобальный $ в osascript занят мостом ObjC
        """ + HTML[a:b] + """
            var clipRed = { src: "media/old.mp3", stop: 500, title: "Old" };
        """ + steps + """
          }
          JSON.stringify(scenario());"""
        out = subprocess.run(["osascript", "-l", "JavaScript", "-e", src], capture_output=True, text=True, check=True).stdout
        return json.loads(out)

    def test_task_2_plays_on_the_first_press(self):
        # Ревью PR 57: файл ещё не загружен, «play» приходит при currentTime = 0, граница считалась как 371 (начало Task 2),
        # потом перемотка на 371, и timeupdate до seeked сразу ставил на паузу: Task 2 не играл вообще.
        r = self.simulate("""
            playFrom(371, "Task 2");
            fire("play");
            au.readyState = 1; fire("loadedmetadata");
            au.seeking = true; fire("seeking"); au.seeking = false;
            fire("timeupdate"); fire("seeked");
            var first = au.paused;
            au.currentTime = 375; fire("timeupdate");
            return { first: first, later: au.paused, at: au.currentTime };""")
        self.assertEqual(r, {"first": False, "later": False, "at": 375})

    def test_task_1_of_the_variant_still_stops_at_task_2(self):
        r = self.simulate("""
            playFrom(0, "Task 1");
            fire("play"); au.readyState = 1; fire("loadedmetadata"); fire("seeked");
            au.currentTime = 370; fire("timeupdate"); var before = au.paused;
            au.currentTime = 371.2; fire("timeupdate");
            return { before: before, after: au.paused, at: au.currentTime, label: els.plLabel.innerHTML };""")
        self.assertEqual(r["before"], False)
        self.assertEqual(r["after"], True)
        self.assertEqual(r["at"], 371)
        self.assertIn("next task", r["label"])

    def test_practice_task_1_end_says_to_open_the_next_part(self):
        # Ревью PR 57: ▶ после конца Task 1 отработки играл Task 2 под вопросами Task 1 с подписью «twice».
        r = self.simulate("""
            playFrom(0, "Task 1", clipRed);
            fire("play"); au.readyState = 1; fire("loadedmetadata"); fire("seeked");
            au.currentTime = 500.3; fire("timeupdate");
            return { paused: au.paused, at: au.currentTime, label: els.plLabel.innerHTML };""")
        self.assertEqual(r["paused"], True)
        self.assertEqual(r["at"], 500)
        self.assertIn("Open the next part", r["label"])
        self.assertNotIn("Press ▶", r["label"])


if __name__ == "__main__":
    unittest.main()
