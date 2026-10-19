// Занятия по плану подготовки к муниципальному этапу (21.11.2026): по одному в неделю, 50 минут.
// Урок — шаги по PPP (warm-up → presentation → practice → production → feedback → wrap-up).
// Всё на английском и обращено к ученице: учитель показывает приложение через демонстрацию экрана,
// а объясняет сам — поэтому здесь нет комментариев для учителя (они у учителя отдельно).
// Упражнения presentation/practice придуманы нами, а не взяты из олимпиадных заданий: настоящее
// задание идёт целиком в production. Типы блоков рисует js/lesson-ui.js.
(function () {
  window.LESSONS = [
    {
      id: "l1", date: "2026-10-12", title: "Use of English: the extra word and key word transformations",
      summary: "We checked Use of English (all four tasks) and learnt how to solve Task 1 and Task 2.",
      links: [
        { href: "#/t/m-u1", label: "Task 1 · Extra word" },
        { href: "#/t/m-u2", label: "Task 2 · Key word transformations" },
        { href: "#/t/p-u1-2425", label: "Practice · Task 1 · 2024/25" },
        { href: "#/t/p-u2-2425", label: "Practice · Task 2 · 2024/25" }
      ]
    },
    {
      id: "l2", date: "2026-10-19", title: "Reading: missing sentences",
      aims: [
        "Remember last week's Use of English rules.",
        "Learn how Reading Task 2 works and how to find \"hooks\".",
        "Do a real olympiad task in 15 minutes."
      ],
      steps: [
        {
          stage: "warm-up", title: "Warm-up", minutes: 7,
          blocks: [
            { type: "text", text: "**Quick check.** Four questions about last week's Use of English. Answer fast!" },
            { type: "quiz", items: [
              { q: "Which word is extra? \"They have been finished the project.\"", opts: ["been", "have", "the"], a: 0,
                why: "They have finished the project (Present Perfect, active). \"been\" is extra." },
              { q: "Key word transformation: \"It's a pity I can't drive.\" WISH → I ___ drive.", opts: ["wish I could", "wish I can", "wish I would"], a: 0,
                why: "wish + past (could) for a wish about the present. \"wish I can\" is not possible." },
              { q: "Word formation: \"The results were ___ — nobody thought they would be so good.\" (EXPECT)", opts: ["unexpected", "expectation", "expected"], a: 0,
                why: "We need an adjective with the prefix un- (= not): nobody expected them → unexpected." },
              { q: "Extra word or a correct line? \"Despite the rain, we went for a walk.\"", opts: ["Correct (V)", "Extra: the", "Extra: for"], a: 0,
                why: "Every word is needed. Remember: despite the rain, but in spite of the rain." }
            ] },
            { type: "text", text: "**Talk.** Today's text is about mornings. Answer in two or three sentences." },
            { type: "talk", items: [
              "How do you wake up on school days?",
              "What is the worst sound to wake up to?",
              "Would you like to wake up with light instead of a sound? Why?"
            ] },
            { type: "words", items: ["an alarm clock", "to wake up", "sunrise", "a routine", "to feel rested"] }
          ]
        },
        {
          stage: "presentation", title: "How Reading Task 2 works", minutes: 10,
          blocks: [
            { type: "text", text: "**At the olympiad:** Reading — 45 minutes, 20 points, two tasks. **Task 2:** a text with 10 gaps and 11 sentences (A–K). One sentence is extra." },
            { type: "text", text: "Every sentence is connected to the text around it. We call these connections **hooks**. There are four kinds:" },
            { type: "hooks", items: [
              { h: "Reference words", t: "this, that, these, such, it, they, one, the same — they point back to something said just before. In the missing sentence they point to the sentence before the gap; in the sentence after the gap they point to the missing sentence." },
              { h: "Linkers", t: "however, but, so, therefore, as a result, also, instead, for example — they show the logic: contrast, result, addition." },
              { h: "Repeated words", t: "the same word, a synonym or a word from the same topic before or after the gap." },
              { h: "Grammar", t: "tense, singular or plural, a question and its answer." }
            ] },
            { type: "example", title: "Look at an example",
              text: "Many teenagers find it hard to get up early. ___ . This is why some scientists suggest starting school later.",
              opts: ["Their body clocks work differently from adults'.", "However, some of them love mornings."], a: 0,
              why: "After the gap: \"This is why…\" — we need a REASON before it. Sentence A gives the reason (the body clock). Sentence B has \"however\", a contrast, and does not explain \"this is why\"." },
            { type: "steps", title: "How to solve", items: [
              "Read the whole text quickly for the main idea (2 minutes).",
              "Read sentences A–K. Underline the hooks: reference words, linkers, names, numbers.",
              "For each gap, read the sentence BEFORE and the sentence AFTER the gap.",
              "Fill the gaps you are sure about first. Cross out the letters you have used.",
              "The extra sentence must not fit anywhere — check it at the end.",
              "Read the whole text again with your answers: does it sound logical?"
            ] }
          ]
        },
        {
          stage: "practice", title: "Find the hook", minutes: 8,
          blocks: [
            { type: "text", text: "Choose the sentence that fits the gap. Then say which word is the hook." },
            { type: "quiz", items: [
              { q: "I tried three different apps to learn Spanish. ___ . In the end, I found a teacher instead.",
                opts: ["None of them kept me motivated for long.", "Spanish is spoken in many countries.", "My teacher is from Madrid."], a: 0,
                why: "\"None of them\" = the three apps. \"In the end… instead\" shows that the apps did not work." },
              { q: "Most people check their phones as soon as they wake up. ___ . As a result, they feel stressed before breakfast.",
                opts: ["This habit fills their heads with news and messages.", "Phones were invented a long time ago.", "Breakfast is the most important meal."], a: 0,
                why: "\"This habit\" = checking the phone. \"As a result\" needs a reason before it." },
              { q: "The museum used to be free for everyone. ___ . Even so, it is still very popular.",
                opts: ["Now visitors have to pay ten pounds.", "It was also free on Sundays.", "Many people like free museums."], a: 0,
                why: "\"used to be free\" → now it is not free. \"Even so\" = in spite of the price." },
              { q: "Some students prefer to study in the morning. ___ . Both groups can do well if they study regularly.",
                opts: ["Others work best late at night.", "Morning is the best time for everyone.", "They usually wake up at six."], a: 0,
                why: "\"Some… others\" is a pair, and \"both groups\" needs two groups." },
              { q: "Scientists have found that short naps help memory. ___ . However, naps longer than an hour can make you feel worse.",
                opts: ["A twenty-minute nap can improve concentration.", "Nobody likes sleeping during the day.", "That is why naps are dangerous."], a: 0,
                why: "The gap adds more good news about short naps. Then \"however\" brings the contrast: long naps." },
              { q: "I bought a smart watch to track my sleep. ___ . Still, I sleep better now, simply because I go to bed earlier.",
                opts: ["To be honest, I rarely look at the data.", "Smart watches are quite expensive.", "It shows my heart rate and my steps."], a: 0,
                why: "\"Still\" shows a contrast: I rarely look at the data — but I sleep better anyway." }
            ] }
          ]
        },
        {
          stage: "production", title: "Olympiad task", minutes: 17,
          blocks: [
            { type: "text", text: "Now a real task from the Moscow municipal stage 2025/26: **Reading Task 2** — \"How I learned to love my alarm clock\". Use the steps from the presentation." },
            { type: "timer", minutes: 15, label: "15 minutes for the task" },
            { type: "task", task: "m-r2", label: "Open Reading Task 2" }
          ]
        },
        {
          stage: "feedback", title: "Check and discuss", minutes: 5,
          blocks: [
            { type: "text", text: "Press **✓ Check answers** in the task. Then read **💡 Show how to solve** under the gaps you got wrong." },
            { type: "talk", items: [
              "Which gap was the easiest? Which hook helped you?",
              "Which gap was the hardest? Why?",
              "Which sentence was extra? Why does it not fit anywhere?"
            ] },
            { type: "task", task: "m-r2", label: "Back to Reading Task 2" }
          ]
        },
        {
          stage: "wrap-up", title: "Wrap-up and homework", minutes: 3,
          blocks: [
            { type: "list", title: "Today you learnt", items: [
              "Reading Task 2: 10 gaps, 11 sentences, one sentence is extra.",
              "Hooks: reference words, linkers, repeated words, grammar.",
              "Read the sentence before AND after the gap."
            ] },
            { type: "reveal", label: "Exit question: name the four kinds of hooks", text: "Reference words (this, they…), linkers (however, so…), repeated words or synonyms, grammar (tense, singular / plural)." },
            { type: "links", title: "Homework", items: [
              { href: "#/t/m-r1", label: "Reading Task 1 · Municipal 2025/26", note: "20 minutes, like at the olympiad" },
              { href: "#/t/p-u3-2425", label: "Practice · Use of English Task 3 · 2024/25", note: "word formation" },
              { href: "#/t/p-u4-2425", label: "Practice · Use of English Task 4 · 2024/25", note: "culture" },
              { href: "#/lexis/t/lx-wf-adjectives", label: "Lexis · Word formation: adjectives and adverbs", note: "10 questions" }
            ] }
          ]
        }
      ]
    },
    { id: "l3", date: "2026-10-26", title: "Writing: a story", aims: ["How a story is checked: the five criteria.", "Plan a story that ends with a given sentence.", "Useful words for telling a story."] },
    { id: "l4", date: "2026-11-02", title: "Writing: an essay on a quotation · Culture", aims: ["How to comment on a quotation.", "Examples from history and literature.", "Use of English Task 4: culture."] },
    { id: "l5", date: "2026-11-09", title: "Mock exam: review", aims: ["We check the mock exam together.", "Your weakest part: extra practice."] },
    { id: "l6", date: "2026-11-16", title: "Final practice before the olympiad", aims: ["Quick practice of every task.", "Time and strategy on the day."] }
  ];
})();
