// Вкладка IELTS: разговорная практика по темам IELTS Speaking. Учитель 25.11.2026: после муниципального этапа —
// «репетиционная разговорная практика», одна тема на урок, «без воды»; ученица B2, цель — C1 и высокий балл IELTS.
// Урок 60 минут: разговор о неделе, как устроен Speaking, картинки, слова, «апгрейд» ответа, Part 2, Part 3, разбор ошибок.
// Всё на английском, без пояснений учителю: ключи, образцы ответов и вопросы для разговора — в шпаргалке teacher/15-….
// Уроки рисует js/lesson-ui.js (тот же движок, что вкладка Lesson); задания с проверкой — в PRACTICE["ielts-1"],
// вкладка Exam этот ключ не показывает.
(function () {
  function img(name) { return "media/memes/" + name + ".jpg"; }
  var TRIES = { type: "list", title: "📌 How it works", items: ["After each task, press ✓ Check answers.", "Red? Read the 💡 hint and try again.", "After the second try, you see the right answer and why."] };

  window.PRACTICE = window.PRACTICE || {};
  window.PRACTICE["ielts-1"] = { all: [
    { id: "i1-words", type: "choice", title: "Words", intro: "Match the expressions 1–12 to the meanings A–L.",
      opts: [
        { k: "A", t: "very fierce competition: people do not care who they hurt" },
        { k: "B", t: "do more than people expect from you" },
        { k: "C", t: "something that has a good side and a bad side" },
        { k: "D", t: "a person who is very successful, or is going to be" },
        { k: "E", t: "an important person, but only in a small group or place" },
        { k: "F", t: "work from early morning until late at night and get very tired" },
        { k: "G", t: "success always takes years of hard work, even when it looks sudden" },
        { k: "H", t: "a person who becomes successful later in life than most people" },
        { k: "I", t: "stop trying because you are happy with what you have already done" },
        { k: "J", t: "the most important thing, the only thing that matters" },
        { k: "K", t: "the tiring, endless fight for money and a better job" },
        { k: "L", t: "total exhaustion after too much work or stress" }
      ],
      items: [
        { n: 1, q: "a high-flyer", a: ["D"] },
        { n: 2, q: "a late bloomer", a: ["H"] },
        { n: 3, q: "cut-throat competition", a: ["A"] },
        { n: 4, q: "the rat race", a: ["K"] },
        { n: 5, q: "burn the candle at both ends", a: ["F"] },
        { n: 6, q: "burnout", a: ["L"] },
        { n: 7, q: "go the extra mile", a: ["B"] },
        { n: 8, q: "rest on your laurels", a: ["I"] },
        { n: 9, q: "a double-edged sword", a: ["C"] },
        { n: 10, q: "the be-all and end-all", a: ["J"] },
        { n: 11, q: "a big fish in a small pond", a: ["E"] },
        { n: 12, q: "there's no such thing as an overnight success", a: ["G"] }
      ] },
    { id: "i1-home", type: "choice", title: "Choose the expression", intro: "Choose the expression A–L that fits each gap.",
      opts: [
        { k: "A", t: "a high-flyer" }, { k: "B", t: "a late bloomer" }, { k: "C", t: "cut-throat competition" },
        { k: "D", t: "the rat race" }, { k: "E", t: "burn the candle at both ends" }, { k: "F", t: "burnout" },
        { k: "G", t: "go the extra mile" }, { k: "H", t: "rest on your laurels" }, { k: "I", t: "a double-edged sword" },
        { k: "J", t: "the be-all and end-all" }, { k: "K", t: "a big fish in a small pond" }, { k: "L", t: "no such thing as an overnight success" }
      ],
      items: [
        { n: 1, q: "She was average at school, found her passion at thirty and is now a top surgeon. She is ______.", a: ["B"] },
        { n: 2, q: "He won one tournament and stopped training. You can't ______ if you want to stay at the top.", a: ["H"] },
        { n: 3, q: "Social media is ______: it helps you find your people, but it can also make you anxious.", a: ["I"] },
        { n: 4, q: "After months of studying until 2 a.m., she reached total ______ and could not open a book.", a: ["F"] },
        { n: 5, q: "The band played in small pubs for ten years before their first hit. There's ______.", a: ["L"] },
        { n: 6, q: "If you want a great reference, ______: stay late, help others and do more than you are asked.", a: ["G"] },
        { n: 7, q: "Exams matter, but they are not ______ of your life.", a: ["J"] },
        { n: 8, q: "In my village team I was ______; at the national camp I was nobody.", a: ["K"] }
      ] }
  ] };

  var HELP = {
    1: ["Look at her age. When did her success come?", "A late bloomer becomes successful later in life than most people."],
    2: ["He stopped after one win. Which expression is about stopping because you are happy with the past?", "To rest on your laurels = to stop trying because you are happy with what you have already done."],
    3: ["The sentence gives one good side and one bad side.", "A double-edged sword has a good side and a bad side."],
    4: ["You need a noun. What happens to you after too much work?", "Burnout = total exhaustion after too much work or stress."],
    5: ["Ten years before the first hit: was their success sudden?", "Success that looks sudden takes years: there's no such thing as an overnight success."],
    6: ["Read the end of the sentence: “do more than you are asked”.", "To go the extra mile = to do more than people expect from you."],
    7: ["Are exams the only thing that matters in life?", "The be-all and end-all = the most important thing, the only thing that matters."],
    8: ["Compare the village team and the national camp.", "A big fish in a small pond is important, but only in a small group or place."]
  };

  window.IELTS = [
    {
      id: "i1", date: "2026-11-30", title: "Success and ambition", emoji: "🚀", cover: img("m31-go-for-success"),
      aims: ["🎯 Goal: talk about success for 2 minutes — with advanced grammar and 12 new expressions."],
      steps: [
        {
          stage: "warm-up", title: "Chat", minutes: 5, image: img("m24-me-when-english"),
          blocks: [
            { type: "brief", title: "Your week", items: ["Tell your teacher about your week.", "Full answers: what happened, how you felt, why."] }
          ]
        },
        {
          stage: "presentation", title: "How IELTS Speaking works", minutes: 3,
          blocks: [
            { type: "vtable", title: "🎤 IELTS Speaking: 11–14 minutes, 3 parts", cols: [
              { h: "Part 1 · 4–5 min", lines: ["Questions about you: home, studies, hobbies."] },
              { h: "Part 2 · 3–4 min", lines: ["A task card with 4 points.", "1 minute to prepare, 2 minutes to speak."] },
              { h: "Part 3 · 4–5 min", lines: ["A discussion: bigger, harder questions on the same topic."] }
            ] },
            { type: "list", title: "⚖️ You get marks for", items: [
              "**Fluency and coherence:** speak without long pauses and link your ideas.",
              "**Vocabulary:** less common words and idioms, used naturally.",
              "**Grammar:** a range of structures and few mistakes.",
              "**Pronunciation:** clear and easy to understand."
            ] }
          ]
        },
        {
          stage: "warm-up", title: "Picture talk", minutes: 7, image: img("m06-succeed"),
          blocks: [
            { type: "brief", title: "Picture talk", items: ["What is the message?", "Do you agree? Why / why not?"] },
            { type: "meme", style: "me", a: "🏆", top: "What people see: **an overnight success**", b: "😩", bottom: "What it took: **5 years, 300 rejections, 1,000 late nights**" },
            { type: "meme", style: "drake", no: "Sleep, rest, weekends", yes: "Hustle 24/7 🔥" },
            { type: "meme", style: "pov", text: "POV: a relative asks you **what you want to be in ten years**", emoji: "😶" }
          ]
        },
        {
          stage: "presentation", title: "Words", minutes: 10,
          blocks: [
            { type: "minitask", title: "Match", task: "i1-words", items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], source: "IELTS Speaking · Success and ambition" },
            { type: "brief", title: "Use them", items: ["Choose 3 expressions that describe you or someone you know.", "Explain why and give an example."] }
          ]
        },
        {
          stage: "practice", title: "Upgrade the answer", minutes: 7,
          blocks: [
            { type: "brief", title: "Band 6 → band 8", items: ["Read the band-6 answer.", "Make it band 8: use 2 expressions from Section 4 and 1 structure from the box."] },
            { type: "list", title: "🗣️ Band-6 answers", items: [
              "**Is it important to be ambitious?** — Yes, I think it is important. Ambitious people work hard and they get good results. But sometimes it is bad, because they are very tired.",
              "**Does success make people happy?** — I think success makes people happy, but not always. Some successful people are not happy. Money is not everything."
            ] },
            { type: "list", title: "🧱 Grammar for band 8", items: [
              "What I find most … is …",
              "If I hadn't …, I wouldn't be …",
              "Not only … but also …",
              "I wish I had …",
              "It's not so much … as …"
            ] },
            { type: "storymap", fields: [{ id: "a1", label: "1 · Your band-8 answer" }, { id: "a2", label: "2 · Your band-8 answer" }] }
          ]
        },
        {
          stage: "production", title: "Part 2", minutes: 10, image: img("m12-proud"),
          blocks: [
            { type: "brief", title: "Card 1", items: ["1 minute to prepare: make short notes.", "Speak for 2 minutes. Don't read your notes.", "Then listen to Card 2 and ask 2 questions: What…? Why…? How…?"] },
            { type: "timer", minutes: 1, label: "Prepare: 1 minute" },
            { type: "speak", title: "Describe an achievement you are proud of.", seconds: 120,
              plan: ["You should say: what it was", "when it happened", "what difficulties you faced", "and explain why it matters to you."],
              phrases: ["What I'm most proud of is…", "It all started when…", "Looking back,…", "If I hadn't…, I wouldn't…"] },
            { type: "list", title: "Card 2 · Describe a time you failed at something but learnt from it.", items: ["You should say: what you tried to do", "what went wrong", "what you did next", "and explain what you learnt."] }
          ]
        },
        {
          stage: "production", title: "Part 3", minutes: 12,
          blocks: [
            { type: "brief", title: "Discussion", items: ["Answer each question: your opinion, a reason, an example.", "Use the phrases below."] },
            { type: "talk", items: [
              "Is success mostly about talent, hard work or luck?",
              "Does social media change what young people think success is?",
              "Is it better to be a big fish in a small pond?",
              "Should schools rank students by their results?",
              "Will AI change what counts as a successful career?"
            ] },
            { type: "list", title: "🪝 Phrases for a discussion", items: [
              "Broadly speaking, …",
              "It depends on how you define …",
              "There's a lot to be said for …",
              "I'd go as far as to say …",
              "To play devil's advocate, …",
              "On the flip side, …"
            ] }
          ]
        },
        {
          stage: "feedback", title: "Fix it", minutes: 4,
          blocks: [
            { type: "brief", title: "Your sentences", items: ["Your teacher types 5 sentences from today.", "Find the mistake and fix it."] },
            { type: "storymap", fields: [1, 2, 3, 4, 5].map(function (n) { return { id: "s" + n, label: "Sentence " + n }; }) }
          ]
        },
        {
          stage: "homework", home: true, title: "Homework", minutes: 20, tries: 2,
          blocks: [
            TRIES,
            { type: "minitask", title: "Choose the expression", task: "i1-home", help: HELP, items: [1, 2, 3, 4, 5, 6, 7, 8], source: "IELTS Speaking · Success and ambition" },
            { type: "brief", title: "Part 2 at home", items: ["Write a plan: 5–6 key words, not sentences.", "Speak for 2 minutes with the timer. Then do it again, better.", "Don't read your notes."] },
            { type: "speak", title: "Describe a person you know who is very ambitious.", seconds: 120,
              plan: ["You should say: who this person is", "what they want to achieve", "what they do to get there", "and explain if you would like to be like them."],
              phrases: ["a high-flyer", "go the extra mile", "burn the candle at both ends", "Not only … but also …"] },
            { type: "storymap", fields: [{ id: "plan", label: "Your plan: 5–6 key words" }] }
          ]
        }
      ]
    }
  ];
})();
