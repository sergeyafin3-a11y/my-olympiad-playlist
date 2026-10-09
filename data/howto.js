// «Как решать»: объяснения к каждому заданию варианта — простым английским (по просьбе учителя),
// коротко, с разобранным примером. Сами задания в data/variant.js остаются дословно официальными.
// Примеры — только из образцов (0, 00) самого задания или придуманные нами вне задания: ответы не выдаём.
// Разбор каждого вопроса с ответом — в data/explain.js, он спрятан за кнопкой.
(function () {
  window.HOWTO = {
    stage: {
      title: "Final stage 2025/26 (заключительный этап)",
      note: "This is the last and the hardest stage of the olympiad — only the best students in Russia write it. The tasks here are harder and stranger than at the school and municipal stages. It is OK if a lot is difficult: this is the \"super level\"."
    },
    tasks: {
      "lr-1": {
        what: "Listening: is each sentence true or false?",
        steps: [
          "Before the recording starts, read all 10 sentences. Underline key words: dates, names, \"only\", \"no\".",
          "Listen the first time and choose your answers.",
          "Listen the second time and check the answers you are not sure about.",
          "A (True) = the speaker says the same thing. B (False) = the speaker says something different."
        ],
        tip: "Be careful with small words like only, all, never, first, no — they can change the meaning."
      },
      "lr-2": {
        what: "Listening: how do two friends feel, and what do they want, in a conversation?",
        steps: [
          "Before the recording starts, read questions 11–15 and the options A, B, C.",
          "You hear the conversation ONLY ONCE — answer while you listen.",
          "Listen to the voice and the feelings, not only to the words."
        ],
        tip: "Question 11 says DOESN'T: find what Alice does NOT do."
      },
      "lr-3": {
        what: "Reading + listening together: compare the ideas in an article and in an interview with its author.",
        steps: [
          "10 minutes: read the article \"The dawn of the post-literate society\" (it is below).",
          "Press ▶ and listen to the interview with the author. You hear it twice.",
          "For each sentence 16–25, decide where this idea is.",
          "A = in the article AND in the interview. B = only in the article. C = only in the interview. D = in neither of them."
        ],
        example: "The idea is in the article, but the author does not talk about it in the interview → B. He talks about it only in the interview → C.",
        tip: "Choose D if the idea is not in the article and not in the interview — even if similar words appear somewhere."
      },
      "lr-4a": {
        what: "Word formation in a text: make new words for gaps 26–30.",
        steps: [
          "First read the whole text — it is below.",
          "You get 5 words: false, muse, settle, shift, plausible. They are mixed up — first decide which word goes into which gap by meaning.",
          "Change the word so it fits: you may need a suffix, a prefix, or both.",
          "Check the form: maybe you need a plural."
        ],
        example: "An example that is NOT from the task: \"The idea was completely ___ (PRACTICE)\". After \"completely\" we need an adjective, and the meaning is \"not possible to do\" → impractical.",
        tip: "Look at the words around the gap: before a noun you need an adjective; after an article with no noun after it, you need a noun; next to a verb you often need an adverb. Always check the meaning of the whole sentence."
      },
      "lr-4b": {
        what: "Reading: true, false or not given?",
        steps: [
          "Find the place in the text that the sentence is about.",
          "A (True) = the text says the same. B (False) = the text says the opposite.",
          "C (Not given) = the text does not say anything about it."
        ],
        tip: "The main difference: False = the text says the OPPOSITE. Not given = the text says NOTHING."
      },
      "lr-4c": {
        what: "Reading: choose the best answer.",
        steps: [
          "Read the question and find the right paragraph.",
          "Compare each option with the text. Cross out options that say more than the text or something different.",
          "The right answer usually says the same thing as the text, but in other words."
        ],
        tip: "An option with the same words as the text is often a trap — check the meaning, not the words."
      },
      "uoe-1": {
        what: "Word game: two words that are the same except for a hidden animal.",
        steps: [
          "Each line has two definitions joined by \"and\". First guess the short word.",
          "Then guess the long word. The long word = the short word + an animal put inside it (at the start, in the middle or at the end).",
          "Write the two words one under the other and compare the letters. The extra letters are the animal.",
          "Type both words in the two boxes."
        ],
        example: "Example 0: \"Fell\" = tumbled; \"a plant that rolls in the desert\" = tumbleweed. tumbl + EWE + ed = tumbleweed. EWE = a female sheep.",
        tip: "The animal can be very short (3–5 letters). Stuck? Tap \"💡 Show how to solve\" under a question to see the full answer, step by step."
      },
      "uoe-2": {
        what: "Picture puzzles: guess an idiom or a saying from letters in a box.",
        steps: [
          "Look not only at the letters, but at HOW they are placed: up, down, cut into parts, repeated, or missing.",
          "The position is a word too: up, down, over, between, \"missing\"…",
          "The note in brackets tells you what to look for: an idiom or a saying.",
          "Say out loud what you see — often the answer is just a description of the picture."
        ],
        example: "Example 0: \"HE ADA CHE\" — the word HEADACHE is cut (split) → SPLITTING HEADACHE. Example 00: the letter T is above the I in LIVING, so \"IT\" goes UP → LIVING IT UP.",
        tip: "Stuck? Tap \"💡 Show how to solve\" under a puzzle to see how it works."
      },
      "uoe-3": {
        what: "Idioms about the theatre and the stage: put the right idiom (A–P) into each sentence.",
        steps: [
          "Read the list of idioms A–P and remember what they mean.",
          "Read each sentence and understand what is missing.",
          "Check that the idiom fits the grammar of the sentence (verb form, words around the gap)."
        ],
        example: "Example 0: \"She will still be ___, clinging to his arm at premieres\" → K \"in the limelight\" (everybody is looking at her).",
        tip: "There are more idioms than gaps — you do not need all of them."
      },
      "uoe-4": {
        what: "Anagrams: make two different words from the same letters, one for each gap.",
        steps: [
          "Look at the letters and think which words you can make from them.",
          "The first word goes into the first gap, the second word into the second gap — the order matters.",
          "Both words must fit the meaning and the grammar."
        ],
        example: "Example 0: letters SREIA → \"Let no panic ARISE…, instead RAISE the question\" → ARISE / RAISE.",
        tip: "Each word uses every letter exactly once."
      },
      "uoe-5": {
        what: "History and culture: match groups of people from Britain and the USA with their descriptions.",
        steps: [
          "This task tests knowledge of history and culture, not language.",
          "First match the ones you know for sure (for example, writers or poets by their names).",
          "Then work by elimination: two descriptions are extra."
        ],
        tip: "If you do not know some of them — after Check, read all the descriptions and the explanations. They will help at the next olympiad."
      },
      "writing-1": {
        what: "Writing: a short story from the given beginning, 220–250 words, with a title.",
        steps: [
          "Remember the 4 things your story must have: why the person came to the library, three riddles, the answers (important truths), how the book changed the person's life.",
          "Think of a title.",
          "Write: beginning → the three riddles one by one → ending. Watch the word counter.",
          "Read it again: are all 4 things there? Any mistakes?"
        ],
        tip: "No title or a missing point = fewer points. Fewer than 198 words = 0 points."
      },
      "speaking-1": {
        what: "Speaking: a short talk (like a tour guide) about a festival, using a fact file, and questions with a partner.",
        steps: [
          "Choose your card: Mardi Gras (New Orleans) or Maslenitsa.",
          "The fact file is in RUSSIAN on purpose: you read the facts in Russian and tell them in English, in your own words.",
          "15 minutes to prepare: a plan with 4 parts (history, events, street culture, why it matters) + your opinion. You cannot read your notes while you speak.",
          "Talk for 3–3.5 minutes. Then answer 2 questions from your partner (the teacher plays your partner).",
          "Then you ask your partner 2 questions — only Wh-questions (what, when, why…)."
        ],
        tip: "At the real olympiad you speak along with a short video about the festival. Watch the video on this screen first."
      }
    }
  };
})();
