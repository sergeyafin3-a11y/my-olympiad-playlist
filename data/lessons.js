// Занятия по плану подготовки к муниципальному этапу (21.11.2026): по одному в неделю, 50 минут.
// Урок — шаги по PPP (warm-up → presentation → practice → production → feedback → wrap-up).
// Всё на английском и обращено к ученице: учитель показывает приложение через демонстрацию экрана,
// а объясняет сам — поэтому здесь нет комментариев для учителя (они у учителя отдельно).
// Учитель 19.10: «скучно» — поэтому игры (выбросить слово, найти крючки, разложить по корзинам,
// перетащить предложения в пропуски), разговор в warm-up и картинки. Картинки — мемы в стиле
// affirmation memes, которые учитель выбрала и прислала сама (22.10), лежат в media/memes. Свои упражнения придуманы нами,
// настоящее олимпиадное задание идёт целиком в production. Типы блоков рисует js/lesson-ui.js.
(function () {
  function img(name) { return "media/memes/" + name + ".jpg"; }
  window.LESSONS = [
    {
      id: "l1", date: "2026-10-12", title: "Use of English: the extra word and key word transformations", emoji: "🧩",
      cover: img("m11-succeed-happy"),
      summary: "We checked Use of English (all four tasks) and learnt how to solve Task 1 and Task 2.",
      links: [
        { href: "#/t/m-u1", label: "🗑️ Task 1 · Extra word" },
        { href: "#/t/m-u2", label: "🔁 Task 2 · Key word transformations" },
        { href: "#/t/p-u1-2425", label: "✏️ Practice · Task 1 · 2024/25" },
        { href: "#/t/p-u2-2425", label: "✏️ Practice · Task 2 · 2024/25" }
      ]
    },
    {
      id: "l2", date: "2026-10-22", title: "Reading: missing sentences", emoji: "📖",
      cover: img("m02-reading"),
      aims: [
        "🗣️ Talk about mornings and sleep.",
        "🪝 Learn how Reading Task 2 works and how to find \"hooks\".",
        "🏆 Do a real olympiad task in 15 minutes."
      ],
      steps: [
        {
          stage: "warm-up", title: "Warm-up", minutes: 7, image: img("m07-morning"),
          blocks: [
            { type: "meme", style: "pov", text: "POV: your alarm goes off for the fifth time and you still press snooze", emoji: "😵‍💫" },
            { type: "text", text: "**This or that?** Choose one — then answer the question." },
            { type: "thisorthat", items: [
              { a: "☀️ Early bird", b: "🌙 Night owl", ask: "Why? Give two reasons." },
              { a: "⏰ Alarm clock", b: "📱 Phone alarm", ask: "Which one is better for your sleep? Why?" },
              { a: "😴 Snooze", b: "🚀 Get up right away", ask: "What happens to you when you press snooze?" }
            ] },
            { type: "speak", title: "🎤 Talk for one minute: my perfect morning", seconds: 60,
              plan: ["What time do you wake up?", "What do you do first?", "What helps you feel awake?", "Why is this morning perfect for you?"],
              phrases: ["first of all", "after that", "what really helps me is", "that's why"] },
            { type: "text", text: "**Bin the extra word!** 🗑️ Last week's Use of English: tap the word that should not be there — or tap ✓ if the sentence is correct." },
            { type: "binword", items: [
              { text: "They have been finished the project.", extra: "been", why: "They have finished the project — Present Perfect, active." },
              { text: "If I will see her, I'll tell her.", extra: "will", why: "After if we use the present: If I see her…" },
              { text: "Despite the rain, we went for a walk.", extra: null, why: "Every word is needed. Despite the rain = in spite of the rain." },
              { text: "We discussed about the plan.", extra: "about", why: "discuss something — no preposition." }
            ] }
          ]
        },
        {
          stage: "presentation", title: "How Reading Task 2 works", minutes: 10, image: img("m08-brain"),
          blocks: [
            { type: "text", text: "📖 **At the olympiad:** Reading — 45 minutes, 20 points, two tasks. **Task 2:** a text with 10 gaps and 11 sentences (A–K). One sentence is extra." },
            { type: "text", text: "🧩 Every sentence is connected to the text around it, like a puzzle piece. We call these connections **hooks**:" },
            { type: "hooks", items: [
              { h: "👉 Reference words", t: "this, that, these, such, it, they, one — they point back to something said just before. In the missing sentence they point to the sentence before the gap; in the sentence after the gap they point to the missing sentence." },
              { h: "🔗 Linkers", t: "however, but, so, therefore, as a result, also, instead — they show the logic: contrast, result, addition." },
              { h: "🔁 Repeated words", t: "the same word, a synonym or a word from the same topic before or after the gap." },
              { h: "⚙️ Grammar", t: "tense, singular or plural, a question and its answer." }
            ] },
            { type: "meme", style: "drake", no: "Reading only the sentence before the gap", yes: "Reading the sentence before AND after the gap" },
            { type: "text", text: "🔎 **Hook hunt!** Tap the 6 reference words and linkers in this text." },
            { type: "hookhunt",
              text: "My grandmother never used an alarm clock. She woke up with the sun. But that was easy in a small village. Such a quiet life is rare today. Cities are noisy. They never really sleep. Therefore, most of us need an alarm.",
              hooks: ["She", "But", "that", "Such", "They", "Therefore"] },
            { type: "steps", title: "How to solve", items: [
              "Read the whole text quickly for the main idea (2 minutes).",
              "Read sentences A–K. Underline the hooks.",
              "For each gap, read the sentence BEFORE and the sentence AFTER the gap.",
              "Fill the gaps you are sure about first. Cross out the letters you have used.",
              "The extra sentence must not fit anywhere — check it at the end.",
              "Read the whole text again with your answers: does it sound logical?"
            ] }
          ]
        },
        {
          stage: "practice", title: "Hooks in action", minutes: 8, image: img("m09-focus"),
          blocks: [
            { type: "text", text: "🗂️ **Sort the hooks.** Drag each word to the right box (or tap the word, then tap the box)." },
            { type: "sort",
              buckets: [{ id: "ref", label: "👉 Points back" }, { id: "link", label: "🔗 Links ideas" }],
              cards: [
                { t: "this", b: "ref" }, { t: "however", b: "link" }, { t: "they", b: "ref" }, { t: "as a result", b: "link" },
                { t: "such", b: "ref" }, { t: "also", b: "link" }, { t: "these", b: "ref" }, { t: "therefore", b: "link" },
                { t: "it", b: "ref" }, { t: "instead", b: "link" }
              ] },
            { type: "text", text: "🧩 **Mini Task 2.** Drag the sentences into the gaps. One sentence is extra!" },
            { type: "gapfill",
              text: "Teenagers often go to bed late. [1] Their brains start producing the sleep hormone melatonin about two hours later than adults' brains. [2] In some countries, schools now start at nine or even ten in the morning. [3] Students who sleep more get better marks and feel happier.",
              cards: [
                { k: "A", t: "This is not just a bad habit — it is biology." },
                { k: "B", t: "Because of this late body clock, some scientists say school should start later." },
                { k: "C", t: "The first results are impressive." },
                { k: "D", t: "However, most teenagers love getting up at six." }
              ],
              key: { "1": "A", "2": "B", "3": "C" },
              why: {
                "1": "A: \"This\" = going to bed late. The next sentence explains the biology.",
                "2": "B: \"this late body clock\" = melatonin comes two hours later. The next sentence shows what schools do.",
                "3": "C: \"results\" of the later start → students get better marks.",
                "D": "D is extra: it contradicts the text (a teenager's body clock makes early mornings hard), and the sentence after each gap does not follow from it."
              } }
          ]
        },
        {
          stage: "production", title: "Olympiad task", minutes: 17, image: img("m10-lock-in"),
          blocks: [
            { type: "text", text: "🏆 Now a real task from the Moscow municipal stage 2025/26: **Reading Task 2** — \"How I learned to love my alarm clock\". Use your hooks!" },
            { type: "timer", minutes: 15, label: "15 minutes for the task" },
            { type: "task", task: "m-r2", label: "Open Reading Task 2" }
          ]
        },
        {
          stage: "feedback", title: "Check and discuss", minutes: 5, image: img("m01-queen"),
          blocks: [
            { type: "text", text: "✅ Press **✓ Check answers** in the task. Then read **💡 Show how to solve** under the gaps you got wrong." },
            { type: "talk", items: [
              "🙂 Which gap was the easiest? Which hook helped you?",
              "🤯 Which gap was the hardest? Why?",
              "🕵️ Which sentence was extra? Why does it not fit anywhere?"
            ] },
            { type: "task", task: "m-r2", label: "Back to Reading Task 2" }
          ]
        },
        {
          stage: "wrap-up", title: "Wrap-up and homework", minutes: 3, image: img("m12-proud"),
          blocks: [
            { type: "meme", style: "me", top: "Me at the start of the lesson:", a: "🤔", bottom: "Me after finding all the hooks:", b: "🕵️‍♀️✨" },
            { type: "list", title: "🌟 Today you learnt", items: [
              "Reading Task 2: 10 gaps, 11 sentences, one sentence is extra.",
              "Hooks: reference words, linkers, repeated words, grammar.",
              "Read the sentence before AND after the gap."
            ] },
            { type: "reveal", label: "🎟️ Exit ticket: name the four kinds of hooks", text: "Reference words (this, they…), linkers (however, so…), repeated words or synonyms, grammar (tense, singular / plural)." },
            { type: "links", title: "📝 Homework", items: [
              { href: "#/t/m-r1", label: "📖 Reading Task 1 · Municipal 2025/26", note: "20 minutes, like at the olympiad" },
              { href: "#/t/p-u3-2425", label: "🧱 Practice · Use of English Task 3 · 2024/25", note: "word formation" },
              { href: "#/t/p-u4-2425", label: "🏛️ Practice · Use of English Task 4 · 2024/25", note: "culture" },
              { href: "#/lexis/t/lx-wf-adjectives", label: "🔥 Lexis · Word formation: adjectives and adverbs", note: "10 questions" }
            ] }
          ]
        }
      ]
    },
    { id: "l3", date: "2026-10-26", title: "Writing: a story", emoji: "✍️", cover: img("m03-studying"),
      aims: ["How a story is checked: the five criteria.", "Plan a story that ends with a given sentence.", "Useful words for telling a story."] },
    { id: "l4", date: "2026-11-02", title: "Writing: an essay on a quotation · Culture", emoji: "📚", cover: img("m04-smort"),
      aims: ["How to comment on a quotation.", "Examples from history and literature.", "Use of English Task 4: culture."] },
    { id: "l5", date: "2026-11-09", title: "Mock exam: review", emoji: "📝", cover: img("m05-you-can"),
      aims: ["We check the mock exam together.", "Your weakest part: extra practice."] },
    { id: "l6", date: "2026-11-16", title: "Final practice before the olympiad", emoji: "🏔️", cover: img("m06-succeed"),
      aims: ["Quick practice of every task.", "Time and strategy on the day."] }
  ];
})();
