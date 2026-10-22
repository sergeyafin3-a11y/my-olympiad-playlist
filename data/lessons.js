// Занятия по плану подготовки к муниципальному этапу (21.11.2026): по одному в неделю, 50 минут.
// Урок — шаги по PPP (warm-up → presentation → practice → production → feedback → wrap-up).
// Всё на английском и обращено к ученице: учитель показывает приложение через демонстрацию экрана,
// а объясняет сам — поэтому здесь нет комментариев для учителя (они у учителя отдельно).
// Учитель 19.10: «скучно» — поэтому игры (выбросить слово, найти крючки, разложить по корзинам,
// перетащить предложения в пропуски), разговор в warm-up и картинки. Картинки — мемы в стиле
// affirmation memes, которые учитель выбрала и прислала сама (22.10), лежат в media/memes. Свои упражнения придуманы нами,
// настоящее олимпиадное задание идёт целиком в production. Типы блоков рисует js/lesson-ui.js.
// Учитель 22.10: «ни хера непонятно, что нужно делать». Поэтому порядок такой: сначала настоящее
// задание прошлого года целиком (paper) и что с ним делать, потом один пропуск вместе по шагам (walk),
// и только потом упражнения — у каждого своя рамка «What to do» (brief).
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
        "📄 See a real Reading Task 2 and what you have to do.",
        "🪝 Solve one gap together and learn to find \"hooks\".",
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
          stage: "presentation", title: "Meet Reading Task 2", minutes: 4, image: img("m02-reading"),
          blocks: [
            { type: "text", text: "📄 **This is a real olympiad task** — Reading Task 2 from the Moscow municipal stage 2024/25, word for word. Your task at the olympiad has the same format. Look at it first: what do you see?" },
            { type: "paper", source: "Real task · Moscow municipal stage 2024/25 · Reading · Task 2",
              instruction: "For items 1–10, read the passage below and choose which of the sentences A–K fit into the numbered gaps in the text. There is one extra sentence which does not fit in any of the gaps.",
              paras: [
                "Tsvetaeva apple pie (tsvetaevski pirog) is a neat little dessert familiar to both Russian home bakers and poetry lovers. [1].",
                "One of the unofficial stories has it that the pie was loved by the family of Marina Tsvetaeva and often baked and served by Marina and her sister Anastasia at tea time, when they were young ladies and spent their holidays and summers at a dacha in Tarusa with relatives and closest friends. [2].",
                "In reality, there is no paper trail to confirm this story. [3]. She admitted she was generally hopeless and awful at cooking and housekeeping, too. [4].",
                "In her memoirs, Anastasia recalls a large cozy garden with apple trees and a veranda. [5]. Indeed, sour cream was and is the most important ingredient of the pie, along with apples.",
                "[6]. That is why Russian fans of Tsvetaeva's poetry usually celebrate her birthday by making her favorite apple pie.",
                "[7]. In fact, adding sour cream into the dough makes the piecrust tenderer and richer in taste. And the same goes with the filling. Some say that sour cream is a good Slavic alternative to cream cheese. [8].",
                "The best apple varieties for Tsvetaeva apple pie are Antonovka or Bogatyr, which can be picked in late autumn. [9]. Although the traditional version of the pie calls for apples, sour cream base also goes perfectly with lots of other fruits and especially berries. So why not try adding strawberries into the recipe, the most summerish berries?",
                "The pie is equally delicious when served warm or cooled. [10]. Enjoy a slice with a cup of black tea!"
              ],
              opts: [
                { k: "A", t: "It gives desserts a very similar signature sourish hint with a unique creamy consistency." },
                { k: "B", t: "The latter would often say the pies were so good, with sweet filling (or 'zalivka') and contrasting tang from the apples, that the recipe spread across the country bearing Marina's name." },
                { k: "C", t: "Today, the peculiarity of the pie still lies in its delicate sour cream dough." },
                { k: "D", t: "Marina Tsvetaeva herself was born on one of those apple-scented October days, when the sky is motionless and fallen leaves are blanketed by the first frosty fog." },
                { k: "E", t: "According to another theory, which sounds more plausible, the pie came from the Tsvetaevs' neighbors." },
                { k: "F", t: "Some say that chilling it in the fridge for 3-5 hours makes it even tenderer and creamier in texture." },
                { k: "G", t: "It is unclear how it came to be associated with Marina Tsvetaeva, a famous poetess, incredibly talented and rebellious, living in the early twentieth century Russia." },
                { k: "H", t: "In addition to the traditional recipe with apples, there are also more other variants with fruit and berry fillings, like pears and strawberries." },
                { k: "I", t: "There would always be a samovar on the ready and the table would be laid with sweet pies made with delicious sour cream." },
                { k: "J", t: "These have a slightly sour taste, which goes so well with the thin shortcrust pastry and delicate sour cream based filling." },
                { k: "K", t: "By Marina's own admission, she could only write poetry and was completely useless in the kitchen." }
              ] },
            { type: "list", title: "📋 What you have to do", items: [
              "The text has **10 gaps**: (1), (2) … (10). One sentence is missing from each gap.",
              "Under the text there are **11 sentences: A–K**.",
              "Choose **one sentence for each gap**. Tap the gap in the text (or its box in the table) and type the letter.",
              "You can use every letter **only once**. **One sentence is extra** — it does not fit any gap.",
              "**1 point** for each correct gap — **10 points** for the task."
            ] },
            { type: "text", text: "⏱️ At the olympiad, Reading has **45 minutes** for two tasks (20 points) — so about **20 minutes** for this one. Today you will try it in **15**." }
          ]
        },
        {
          stage: "presentation", title: "Solve one gap together", minutes: 6, image: img("m08-brain"),
          blocks: [
            { type: "brief", title: "Together: gap 6", items: [
              "This is gap 6 of the pie text you have just seen, and three of the sentences A–K.",
              "Press **👀 Show** to open the next step: the sentence before the gap, the sentence after it, then the right letter."
            ] },
            { type: "walk", gap: 6, answer: "D",
              context: "Indeed, sour cream was and is the most important ingredient of the pie, along with apples. [6]. That is why Russian fans of Tsvetaeva's poetry usually celebrate her birthday by making her favorite apple pie.",
              opts: [
                { k: "C", t: "Today, the peculiarity of the pie still lies in its delicate sour cream dough." },
                { k: "D", t: "Marina Tsvetaeva herself was born on one of those apple-scented October days, when the sky is motionless and fallen leaves are blanketed by the first frosty fog." },
                { k: "H", t: "In addition to the traditional recipe with apples, there are also more other variants with fruit and berry fillings, like pears and strawberries." }
              ],
              steps: [
                { q: "👀 Read the sentence **before** the gap. What is it about?",
                  a: "Sour cream and apples, the most important things in the pie. In the text, gap 6 starts a **new paragraph**, so the missing sentence can start a new idea." },
                { q: "👀 Read the sentence **after** the gap. Which words are hooks?",
                  a: "**That is why** — the missing sentence must give the **reason**. **her birthday** — so the missing sentence is probably about the day she was born." },
                { q: "🔎 Now read sentences C, D and H. Which one gives a reason to bake the pie on her birthday?",
                  a: "**D)** Marina Tsvetaeva herself was **born** on one of those **apple-scented** October days…" },
                { q: "✅ Check the hooks on both sides of the gap.",
                  a: "was **born** → her **birthday** · D gives the reason → **That is why** · apple-scented days → her favorite **apple pie**. C and H are about the pie, not about her birthday. Write **6 – D** and cross out D. 🪝 Words like these connect a missing sentence to the text around it. We call them **hooks**." }
              ] },
            { type: "brief", title: "Your turn: gap 8", items: [
              "Read the text before gap 8 below. After gap 8 a new paragraph starts.",
              "Find the hook and tap the sentence that fits."
            ] },
            { type: "quiz", items: [
              { q: "Gap 8. \"In fact, adding sour cream into the dough makes the piecrust tenderer and richer in taste. And the same goes with the filling. Some say that sour cream is a good Slavic alternative to cream cheese. (8) ______.\" Which sentence fits gap 8?",
                opts: [
                  "A. It gives desserts a very similar signature sourish hint with a unique creamy consistency.",
                  "C. Today, the peculiarity of the pie still lies in its delicate sour cream dough.",
                  "F. Some say that chilling it in the fridge for 3-5 hours makes it even tenderer and creamier in texture."
                ], a: 0,
                why: "**A**: **It** = sour cream, and **very similar** = like cream cheese. C starts a new idea with \"Today\" and does not continue the cream cheese idea. F is a trap: it starts with **Some say** again, but there \"it\" is the pie in the fridge — and the sentence before the gap is about sour cream." }
            ] },
            { type: "text", text: "🪝 **Four kinds of hooks** — look for them in every Reading Task 2:" },
            { type: "hooks", items: [
              { h: "👉 Reference words", t: "she, they, these, it, this, such, the latter — they point back to something said before. I bought a new phone. **It** was cheap. (it = the phone)" },
              { h: "🔗 Linkers", t: "however, but, so, therefore, that is why, in fact, also, instead — they show the logic: contrast, result, addition. **However** → the next idea is the opposite." },
              { h: "🔁 Repeated words", t: "the same word, a synonym or a word from the same topic: a **phone** → this **gadget**, she was **born** → her **birthday**." },
              { h: "⚙️ Grammar", t: "singular or plural, tense: **it is** — one thing; **they are** — more than one." }
            ] },
            { type: "meme", style: "drake", no: "Reading only the sentence before the gap", yes: "Reading the sentence before AND after the gap" }
          ]
        },
        {
          stage: "practice", title: "Practice: hooks", minutes: 8, image: img("m09-focus"),
          blocks: [
            { type: "brief", title: "Exercise 1 of 3 · Hook hunt", items: [
              "Read the short text below.",
              "Find **6 hooks**: words that point back (like **it**, **these**) and linkers (like **however**, **so**).",
              "Tap each hook. Green = right. If a word shakes, it is not a hook — try another one."
            ], example: "\"I love my cat. **It** sleeps all day.\" — **It** points back to \"my cat\"." },
            { type: "hookhunt",
              text: "My grandmother never used an alarm clock. She woke up with the sun. But that was easy in a small village. Such a quiet life is rare today. Cities are noisy. They never really sleep. Therefore, most of us need an alarm.",
              hooks: ["She", "But", "that", "Such", "They", "Therefore"] },
            { type: "brief", title: "Exercise 2 of 3 · Sort the hooks", items: [
              "Two of the four kinds of hooks: 👉 words that **point back** to something said before, and 🔗 words that **link ideas** (contrast, result, addition).",
              "Drag each word into the right box.",
              "On a phone or tablet: tap the word, then tap the box."
            ], example: "**the latter** → 👉 Points back · **but** → 🔗 Links ideas" },
            { type: "sort",
              buckets: [{ id: "ref", label: "👉 Points back" }, { id: "link", label: "🔗 Links ideas" }],
              cards: [
                { t: "this", b: "ref" }, { t: "however", b: "link" }, { t: "they", b: "ref" }, { t: "as a result", b: "link" },
                { t: "such", b: "ref" }, { t: "also", b: "link" }, { t: "these", b: "ref" }, { t: "therefore", b: "link" },
                { t: "it", b: "ref" }, { t: "instead", b: "link" }
              ] },
            { type: "brief", title: "Exercise 3 of 3 · Mini Task 2", items: [
              "This is Reading Task 2, but small: a text with **3 gaps** and **4 sentences** (A–D). One sentence is extra.",
              "Drag one sentence into each gap (or tap the sentence, then tap the gap).",
              "For each gap, read the sentence before AND after it: find the hooks.",
              "Press **✓ Check** and read why each answer is right."
            ] },
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
            { type: "text", text: "🏆 Now your turn: **Reading Task 2** from the Moscow municipal stage **2025/26** — \"How I learned to love my alarm clock\". The same format as the pie text: 10 gaps, 11 sentences A–K, one is extra." },
            { type: "brief", title: "The olympiad task · 15 minutes", items: [
              "Start the timer below, then open the task.",
              "Read the whole text quickly: what is it about? (2 minutes)",
              "Read sentences A–K. Look for hooks: this, they, these, however, so…",
              "For each gap, read the sentence **before** and the sentence **after** it. Choose a letter.",
              "Do the easy gaps first. You can use every letter **only once**.",
              "One sentence is extra: at the end, check that it does not fit anywhere.",
              "Don't open **💡 Show how to solve** and don't press **✓ Check answers** yet — we check together in the next step."
            ] },
            { type: "timer", minutes: 15, label: "15 minutes for the task" },
            { type: "task", task: "m-r2", label: "Open Reading Task 2" }
          ]
        },
        {
          stage: "feedback", title: "Check and discuss", minutes: 5, image: img("m01-queen"),
          blocks: [
            { type: "brief", title: "Check your answers", items: [
              "Open the task and press **✓ Check answers** at the bottom.",
              "How many points out of 10?",
              "For every wrong gap, read **💡 Show how to solve** under it and find the hook you missed.",
              "Then come back and answer the three questions below."
            ] },
            { type: "task", task: "m-r2", label: "Back to Reading Task 2" },
            { type: "talk", items: [
              "🙂 Which gap was the easiest? Which hook helped you?",
              "🤯 Which gap was the hardest? Why?",
              "🕵️ Which sentence was extra? Why does it not fit anywhere?"
            ] }
          ]
        },
        {
          stage: "wrap-up", title: "Wrap-up and homework", minutes: 3, image: img("m12-proud"),
          blocks: [
            { type: "meme", style: "me", top: "Me at the start of the lesson:", a: "🤔", bottom: "Me after finding all the hooks:", b: "🕵️‍♀️✨" },
            { type: "list", title: "🌟 Today you learnt", items: [
              "Reading Task 2: a text with 10 gaps and 11 sentences A–K. One sentence is extra.",
              "Read the sentence before AND after the gap.",
              "Hooks: reference words, linkers, repeated words, grammar."
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
