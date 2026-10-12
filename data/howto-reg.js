// «Как решать» для регионального этапа ВсОШ 2025/26: карточки к каждому заданию — простым английским.
// Примеры — только из образцов (0) самого задания или придуманные вне задания: ответы не выдаём
// (правило то же, что проверяет tests/test_howto.py). Разбор каждого вопроса Use of English — в data/explain-reg.js.
// Аудиозапись этапа не опубликована: карточки аудирования говорят, как слушать по официальному скрипту,
// и держат официальное число прослушиваний (Task 1 — дважды, Task 2 — один раз, интервью Task 3 — дважды).
(function () {
  var H = window.HOWTO = window.HOWTO || { tasks: {} };
  H.tasks = H.tasks || {};
  H.stages = H.stages || {};

  H.stages["reg-2025-26"] = {
    title: "Regional stage 2025/26",
    note: "These are last year's (2025/26) tasks of the regional stage — the stage after the municipal one. It is much harder than the municipal stage: the texts and tasks are at about C1 level, and they are similar to the final. There are two days. The written day has Listening and Reading (1 hour 15 minutes, 40 points), Use of English (45 minutes, 20 points) and Writing (60 minutes, 20 points). Speaking is on a separate day (about 10 minutes with a partner, 20 points). The maximum is 100 points. The official Listening recording is not published, so your teacher reads the transcript aloud, or the computer voice reads it. It is OK if a lot is difficult: the goal is to learn how these tasks work."
  };

  // Общий шаг для трёх заданий на аудирование: записи нет, читаем официальный скрипт.
  var NO_AUDIO = "The official recording is not published — only its transcript. Ask your teacher (or a friend) to read the transcript aloud to you, or press the \"Computer voice\" button. Do not open the transcript before you answer: then it is reading, not listening.";

  H.tasks["r-l1"] = {
    what: "Listening: a business journalist talks about how companies are responsible for their actions. Is each sentence true or false?",
    steps: [
      NO_AUDIO,
      "Before the listening starts, read sentences 1–10. Underline key words: numbers, years, money, \"all\", \"more… than\", \"as big as\".",
      "You hear the text TWICE, as at the real olympiad. Listen the first time and mark your answers.",
      "Listen the second time and check the answers you are not sure about. (The computer voice reads the text once — press the button again for the second time.)",
      "A (True) = the speaker says the same thing in other words. B (False) = the speaker says something different, or does not say it at all.",
      "Open the transcript only after you answer, and check your mistakes with it."
    ],
    example: "An example that is NOT from the task: you hear \"Our school started a recycling project last year, and now most classes take part.\" The sentence \"All classes take part in the project\" → B (False): most is not all.",
    tip: "There is no \"Not given\" here. If the speaker does not say it, choose B (False). Many false sentences change only one detail: a number, a date, \"all\" instead of \"some\", or a comparison (\"as big as\", \"more than\")."
  };

  H.tasks["r-l2"] = {
    what: "Listening: Amy and Ben talk about Ben's friends who moved to another country. Choose A, B or C.",
    steps: [
      NO_AUDIO,
      "Before the listening starts, read questions 11–15 and all the options A, B, C.",
      "You hear the conversation ONLY ONCE, as at the real olympiad — so the teacher reads it only once, too. Answer while you listen, do not wait for the end.",
      "The questions go in the same order as the conversation.",
      "The speaker often says the idea in other words. The option with the same word as the text is not always right — check the meaning."
    ],
    example: "An example that is NOT from the task: you hear \"I was so nervous before the exam, but in the end it was easy.\" The question \"How did she feel after the exam?\" A nervous, B relieved, C bored → B: \"nervous\" was before the exam, not after it.",
    tip: "Question 11 asks what is NOT TRUE: two options are true, choose the false one. When a question asks about the most important moment or reason, the speaker may name several things. Listen for words like \"but\", \"actually\" or \"the main thing\" that show which one matters most."
  };

  H.tasks["r-lr3"] = {
    what: "Reading + listening together: compare the ideas in an article about international students in Russia and in an interview with one student.",
    steps: [
      "10 minutes: read the article \"International Students Tell Us What It's Like to Study in Russia\" (it is below). Underline each student's ideas: why Russia, money, language, people.",
      NO_AUDIO + " The interview has two people (a presenter and a student), so two people can read it.",
      "You hear the interview TWICE, as at the real olympiad.",
      "For each sentence 16–25, decide where this idea is. A = in the article AND in the interview. B = only in the article. C = only in the interview. D = in neither of them.",
      "Check each sentence two times: \"Is it in the article?\" (you can look at the text again) and \"Is it in the interview?\". Then choose the letter."
    ],
    example: "An example that is NOT from the task: an article about a school trip says \"the food was cheap\". In an interview a student says \"the food was cheap and very tasty\". \"The food was cheap\" → A (both). \"The food was tasty\" → C (only the interview). \"The food was free\" → D (neither).",
    tip: "In the article many students speak, in the interview only one. \"The student\" in a sentence can be any student from the article. Similar words are not the same idea: if a speaker mentions an idea only to say that it is wrong, this idea is NOT expressed. Strong words like always, never, only, all must be in the material, too."
  };

  H.tasks["r-r4"] = {
    what: "Reading: a long article in seven parts (A)–(G). For each sentence 26–40, find the part of the text where this idea is.",
    steps: [
      "Listening and Reading is one part: 1 hour 15 minutes for all four tasks. Leave enough time for this task — it has 15 questions.",
      "Read the title and the short text under it: they tell you what the article is about.",
      "Read the whole text once. After each part, write 3–4 key words: what is this part about?",
      "Read sentence 26. It says the idea in other, more difficult words. Think of simpler words for it, then find the part with the same idea.",
      "One part can be the answer for several sentences. Start with the sentences you are sure about."
    ],
    example: "An example that is NOT from the task: the sentence is \"a habit that started in childhood\". In the text, look for \"since I was a child\", \"as a kid\", \"ever since school\" — the same idea in other words.",
    tip: "Do not choose a part only because it has the same word as the sentence. The idea must be the same: who does it, why, and with what result. If two parts look possible, read both again and choose the one that says exactly this idea."
  };

  H.tasks["r-u1"] = {
    what: "Crossword: a text about a car that flies has 7 gaps. Each gap has a definition in brackets. Find the word and write it in the crossword.",
    steps: [
      "Read the whole text first. Understand the story: from cars and private jets to a car that can fly.",
      "For each gap, read the definition. It is like a definition from an English–English dictionary. Its form shows the part of speech: \"to do something…\" → a verb, \"the state of…\" or \"a person who…\" → a noun, \"very…\" or \"full of…\" → an adjective.",
      "Now read the sentence with the gap. The word must fit the grammar: after he/she/it a verb needs -s; after \"they\" or a plural noun — no -s; before a noun — often an adjective; after an adjective — a noun. Some gaps are part of a fixed phrase: look at the words just before and after the gap.",
      "Look at the crossword. Count the cells: this is the number of letters. Use the letters that are already in the grid, and the letters of example 0 (EXCLUSIVE goes down and gives one letter to words 4, 1 and 6).",
      "Start with the word you are sure about. Its letters help the words that cross it: for example, 3 crosses 1 and 5, 2 crosses 5, 7 crosses 6.",
      "Type each word in its box. Spelling counts: one wrong letter = 0 points for that word."
    ],
    example: "Example 0: \"the (0) … (expensive and only for people who are rich or of a high social class) form of transportation\" — before the noun \"form\" we need an adjective, and the grid has 9 cells going down → EXCLUSIVE. Another example, NOT from the task: \"(a person who travels to a place for pleasure)\", 7 cells, letters _ O _ _ I _ T → TOURIST.",
    tip: "If a word does not fit the cells, check the form: maybe you need -s, -ing or a different ending. The text is from an article, so the answers are formal, \"academic\" words — think of words you know from science and news texts."
  };

  H.tasks["r-u2"] = {
    what: "Compound adjectives: each adjective is cut in two halves. Match the first half (8–14) with the second half (A–O). A short scenario shows the meaning.",
    steps: [
      "A compound adjective is two words with a hyphen: a body part + an -ing word. It often describes a strong feeling or a strong action.",
      "Example 0 is done: eye- + N (opening). Cross out N — every second half is used only once.",
      "Read the scenario first. Decide what feeling it describes: fear, surprise, excitement, sadness, or a strong physical action.",
      "Then say each possible pair aloud: first half + second half. Does it sound like a real word? Does it fit the scenario?",
      "Work by elimination: start with the pairs you know for sure and cross out those letters. There are more second halves than you need — some are extra."
    ],
    example: "Example 0: \"eye- · A documentary that completely changed the way you view the education system\" → eye-opening (it shows you something new and surprising) → N. Another example, NOT from the task: nail- + biting → \"a nail-biting match\" = so exciting that you feel nervous until the end.",
    tip: "Some first halves can join two different second halves, and the two adjectives mean different things. The scenario decides: read it again before you choose."
  };

  H.tasks["r-u3"] = {
    what: "Culture: match six famous British people (15–20) with their descriptions A–M. Some descriptions are extra.",
    steps: [
      "This task tests what you know about British culture, history and science, not grammar.",
      "Example 0 is done: Queen Elizabeth II → H. Cross out H.",
      "Read every description and find the key clues: the job (actor, scientist, musician, philosopher…), famous works, films, TV shows, bands, places, dates and partners.",
      "First match the people you know for sure. Then work by elimination with the others.",
      "Be careful: some descriptions are about people with the same job. Then a job is not enough — find a detail you know: a film, a book, a song, a show or a famous partner."
    ],
    example: "Example 0: Queen Elizabeth II → H: \"monarch for 70 years and 214 days\", \"the longest-reigning British monarch\", \"the coronation in 1953\". Another example, NOT from the task: \"an English writer of plays like Hamlet and Romeo and Juliet\" → William Shakespeare.",
    tip: "There are 13 descriptions for 6 people + the example, so 6 descriptions are extra. After Check, read all the descriptions and the explanations — this kind of task comes again at the next olympiad."
  };

  H.tasks["r-w1"] = {
    what: "Writing: a review of a festival of young people's startups for a youth magazine, 200–250 words, with a title.",
    steps: [
      "A review describes an event and gives your opinion. Talk to the reader, use strong adjectives and your own feelings. If the text is not a review of the festival, you get 0 for the whole work.",
      "List the 9 content points — ALL of them must be in your review: 1) a title, 2) an introduction, 3) the most surprising futuristic startup, 4) what makes it unique, 5) its impact on society in the years to come, 6) possible challenges for young startups, 7) and 8) quotes from TWO visitors (each quote is a separate point), 9) your feelings: are such festivals important for young people?",
      "Plan your paragraphs: title → introduction (what, where, who) → the startup and what makes it unique → its impact on society in the future → challenges for young startups + the two quotes → your feelings and a short conclusion.",
      "Write the quotes as direct speech with quotation marks, and say who the visitor is.",
      "Count your words: 200–250 (the title counts too). Fewer than 180 words = 0 points. After 275 words only the first 250 are checked.",
      "Read it again: are all 9 points there? Check tenses, spelling, commas and full stops. Write it yourself: a copied text gets 0."
    ],
    example: "A quote that is NOT from the task: \"I never thought a school student could build a robot like this,\" said Anna, a teacher who visited the festival with her class.",
    tip: "Check the list before you finish. If even one of the 9 points is missing (for example, you give only one quote), Task completion gets 0 — and then the whole review gets 0. Task completion gives 10 of the 20 points: it is the most important criterion."
  };

  H.tasks["r-s1"] = {
    what: "Speaking: a report about a great Russian writer for a school conference, using a fact file, and questions with a partner.",
    steps: [
      "Choose your card. Set 1 (Tolstoy) and Set 3 (Dostoevsky) are Student 1: you speak first, then you listen to your partner and ask. Set 2 (Pushkin) and Set 4 (Chekhov) are Student 2: you FIRST listen to your partner and ask 2 questions, and then you speak. The teacher plays your partner.",
      "15 minutes to prepare. The fact file is in English: do not learn it by heart, turn the short notes into your own sentences.",
      "Make a plan with the 4 points: 1) biography, 2) main literary works, 3) films and theatre productions based on the works, 4) why the writer is important for Russian culture. Then the personal part: how the writer's works influenced you, a project for your school to celebrate the writer, and advice on how to prepare this event.",
      "Talk for 3–4 minutes. Start with a short introduction for the conference, go through the 4 points, then the personal part, then a short ending. You can write notes, but you cannot read them while you speak: reading for more than half of the time = 0 for the whole answer.",
      "Answer your partner's 2 questions with facts from the fact file. If the fact file does not have the answer, give your best guess. Never say \"Sorry, I don't know, I'll look it up\" — that gets 0.",
      "When you listen to your partner, do not look at your partner's fact file. Ask 2 questions about facts your partner did NOT mention. Only WH-questions (What, When, Where, Why, How, Which, Who) count. Yes/no questions and questions about your partner's opinion do not count."
    ],
    example: "Questions that are NOT from the task. Not accepted: \"Did he have children?\" (a yes/no question), \"What do you think about his books?\" (your partner's opinion). Accepted: \"Where did he spend his last years?\", \"Which of his books was translated first?\"",
    tip: "Use linking phrases to move from point to point: \"First of all…\", \"Moving on to his works…\", \"As for films and theatre…\", \"Finally…\". Practise with a timer: aim for 3–4 minutes."
  };
})();
