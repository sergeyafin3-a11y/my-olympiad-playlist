// «Как решать» для муниципального этапа (Москва, 2025/26): карточки к каждому заданию — простым английским.
// Примеры — только из образцов (0, 00) самого задания или придуманные вне задания: ответы не выдаём
// (это проверяет tests/test_howto.py). Разбор каждого вопроса Use of English — в data/explain-mun.js.
(function () {
  var H = window.HOWTO = window.HOWTO || { tasks: {} };
  H.tasks = H.tasks || {};
  H.stages = H.stages || {};

  H.stages["mun-msk-25-26"] = {
    title: "Municipal stage 2025/26 · Moscow (муниципальный этап)",
    note: "These are last year's (2025/26) tasks of the stage you write next, in November — the best practice for it. It has four parts: Listening (15 min, 15 points), Reading (45 min, 20 points), Use of English (60 min, 45 points) and Writing (60 min, 20 points). The maximum is 100 points. In Listening, Reading and Use of English every correct answer = 1 point, a wrong or empty answer = 0, so always write something. In Use of English tasks 1–3 spelling counts: one wrong letter = 0 points for that answer. Writing is checked by five criteria, 4 points each."
  };

  H.tasks["m-l1"] = {
    what: "Listening: a pilot talks about her job. Is each sentence true or false?",
    steps: [
      "Before the recording starts, read sentences 1–10. Underline key words: numbers, times, \"since her childhood\", \"every\", \"not allowed\".",
      "Listen the first time and mark your answers.",
      "Listen the second time and check the answers you are not sure about.",
      "A (True) = the speaker says the same thing in other words. B (False) = she says something different, or the sentence changes one detail."
    ],
    example: "An example that is NOT from the task: you hear \"I worked in a shop for one summer\". The sentence \"She worked in a shop for a few years\" → B (False): one summer is not a few years.",
    tip: "Many false sentences change only one small thing: who, how long, \"every\" instead of \"some\", or a feeling (bored instead of excited). Listen for that one detail."
  };

  H.tasks["m-l2"] = {
    what: "Listening: two friends talk on a boat trip in San Francisco. Choose A, B or C.",
    steps: [
      "The questions are numbered 2–6 — this is how they are numbered in the official paper.",
      "Before the recording starts, read the questions and all the options A, B, C.",
      "You hear the conversation ONLY ONCE — answer while you listen, do not wait for the end.",
      "For questions about feelings, listen to HOW the person speaks, not only to the words."
    ],
    tip: "Question 3 asks what is NOT TRUE: two options are true, choose the one that is false. Similar words (\"surprising\", \"unexpected\") can both sound right — choose the one that fits the speaker's words best."
  };

  H.tasks["m-r1"] = {
    what: "Reading: a long article. Choose the best answer A, B, C or D for questions 1–10.",
    steps: [
      "Read the title and the short text under it first: they tell you what the article is about.",
      "The questions go in the same order as the text. Question 1 is near the start, question 10 is near the end.",
      "For each question, find the right place in the text and read it carefully, two or three sentences around it.",
      "Compare every option with the text. Cross out options that say more than the text, say the opposite, or talk about something the text does not mention."
    ],
    example: "An example that is NOT from the task: the text says \"My father taught me to swim, but he never came to my races.\" The option \"He helped her at the start but did not follow her sport later\" is right — the same idea in other words.",
    tip: "Words like \"entirely\", \"mostly\", \"clearly\", \"never\" in an option are often a trap: the text usually says something softer."
  };

  H.tasks["m-r2"] = {
    what: "Reading: a text with 10 gaps. Put the right sentence A–K into each gap. One sentence is extra.",
    steps: [
      "Read the whole text first (without the sentences) to understand the story and its order.",
      "For each gap, read the sentence BEFORE it and the sentence AFTER it. The missing sentence must connect them.",
      "Look for links: pronouns (this, they, it, here), linking words (so, but, therefore, instead), and the same idea said again.",
      "Start with the gaps you are sure about. Cross out the sentences you have used.",
      "At the end, read the text again with your sentences: does every paragraph sound logical?"
    ],
    example: "An example that is NOT from the task: \"I bought a new bike last spring. ___ Now I ride it to school every day.\" The sentence \"At first I was afraid of the busy roads, but I soon got used to them\" fits: it connects buying the bike and riding it every day.",
    tip: "The extra sentence often looks good by topic, but it does not connect with the sentences around any gap — or it says the opposite of the author's opinion."
  };

  H.tasks["m-u1"] = {
    what: "Find the extra word: some lines of a film review have one word that must not be there. Other lines are correct.",
    steps: [
      "Read the whole line slowly. Then read it again and ask: is every word needed?",
      "Try to take out one word. If the sentence becomes correct and keeps its meaning, this is the extra word.",
      "Typical extra words: an article (a, the), a preposition, an extra auxiliary verb, a second -ing form, a pronoun, a linking word, or a small word that changes the meaning.",
      "If every word is needed, the line is correct — type V.",
      "Type only ONE word, exactly as it is in the line."
    ],
    example: "Example 0: the whole line is correct → V. Example 00: the line says \"a pure theatrical gusto\". Gusto (energy, enjoyment — увлечённость) is an uncountable noun here, so the article \"a\" is extra → a.",
    tip: "Usually 2–4 lines in a text are correct. Check the meaning too: sometimes the extra word makes the sentence say the opposite of the facts."
  };

  H.tasks["m-u2"] = {
    what: "Key word transformations: finish the second sentence so it means the same as the first. Use the word in bold.",
    steps: [
      "Read both sentences. Find what is different: the start of the sentence, the key word, the words after the gap.",
      "Think which grammar pattern the key word needs: a conditional, the passive, reported speech, wish, a modal verb, a phrasal verb, an infinitive or an -ing form…",
      "Write the missing part. Do not change the key word. Use the number of words shown in brackets.",
      "Count your words again. Contractions are not allowed: write \"do not\", not \"don't\". Check the spelling — it counts."
    ],
    example: "Example 0: \"The pool isn't deep enough to swim in.\" (too) → The pool is too shallow to swim in. Another example, NOT from the task: \"It's possible that he forgot the key.\" (may) → He may have forgotten the key.",
    tip: "Look at the time: a past action needs a past pattern (have + V3, had + V3). One wrong letter or one extra word = 0 points."
  };

  H.tasks["m-u3"] = {
    what: "Word formation: change the word in CAPITALS so it fits the gap in the same line.",
    steps: [
      "Read the whole sentence. Decide which part of speech you need: a noun, a verb, an adjective, an adverb or a participle.",
      "Look at the words around the gap: after \"a\" or \"the\" → a noun; before a noun → an adjective; after \"to\" or after \"and\" with another verb → a verb; after \"as\" or before \"by\" → often a past participle.",
      "Think about the meaning: do you need a person (-ist, -er), a negative word (in-, un-, dis-) or a plural?",
      "Write the word and check the spelling letter by letter."
    ],
    example: "Example 0: \"the secrets of the ___ in music\" (UNIVERSAL) → after \"the\" we need a noun → universe. Another example, NOT from the task: \"She is a famous ___\" (SCIENCE) → a person → scientist.",
    tip: "Sometimes you must change the word two times: noun → verb → participle. Both British (-ise) and American (-ize) spelling are OK if the key gives both."
  };

  H.tasks["m-u4"] = {
    what: "Culture and language: match 10 people, buildings, books and terms with their descriptions A–N. Some descriptions are extra.",
    steps: [
      "This task tests knowledge of British and American history, culture and literary terms.",
      "First match the ones you know for sure. Look for clues: dates, places, famous names, nicknames.",
      "For terms like metaphor or metonymy, remember what they mean and find an example that fits.",
      "Then work by elimination. Remember: some descriptions do not match any item."
    ],
    example: "Examples NOT from the task: a euphemism is a soft, polite word for something unpleasant (\"passed away\" instead of \"died\"). Metonymy is calling a thing by the name of something close to it (\"the Kremlin said\" = the Russian government said).",
    tip: "Two descriptions can be about the same person or style — read them to the end. After Check, read all the explanations: they help at the next olympiad."
  };

  H.tasks["m-w1"] = {
    what: "Writing: a story for a youth magazine, 200–250 words. It must END with the given sentence.",
    steps: [
      "Remember the 4 things that bring points: a title, a rich relative, a beautiful house, and the ending sentence copied exactly.",
      "Plan backwards: who is Jim, what is the letter, why does he want to go home? The letter must be important in your story.",
      "Write in paragraphs: beginning → problem → turning point → the last sentence.",
      "Count your words: 200–250 (the title counts too). Fewer than 180 words = 0 points. After 275 words only the first 250 are checked.",
      "Read it again: are all 4 things there? Check tenses, spelling, commas and full stops."
    ],
    tip: "Do not change even one word in the last sentence. Do not put a full stop after the title — it counts as a mistake. If the task is not done (0 for content), the whole story gets 0."
  };
})();
