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
// Учитель 22.10, позже: «поменяем местами» — на уроке разбираем и печатаем текст 2025/26 про будильник
// (лист берёт его из самого задания m-r2), а пирог Цветаевой 2024/25 — домашнее задание на 15 минут.
// Разбор и вопрос — на пропусках 2 и 6: в пироге у них другие буквы (общие у двух ключей — 1, 3, 4, 5, 9, 10).
// Учитель 23.10: урок перенесён на 23.10, и в него — герундий и инфинитив, не отдельно, а на том же тексте:
// таблица-напоминание (тему проходили, заново не объясняем), фразы из текста, выбор формы, формат Task 2.
// Минуты шагов — время на уроке: домашнее задание на уроке только объясняем.
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
      id: "l2", date: "2026-10-23", title: "Reading: missing sentences", emoji: "📖",
      cover: img("m02-reading"),
      aims: [
        "🗣️ Talk about mornings and sleep.",
        "📄 Work on a real Reading Task 2: what you have to do.",
        "🪝 Solve gaps together and learn to find \"hooks\".",
        "🧩 Gerund or infinitive: practise them in the text and in Task 2 format.",
        "🏠 Homework: one more real task in 15 minutes."
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
          stage: "presentation", title: "Meet Reading Task 2", minutes: 8, image: img("m02-reading"),
          blocks: [
            { type: "text", text: "📄 **This is a real olympiad task** — Reading Task 2 from the Moscow municipal stage 2025/26, word for word. Your task at the olympiad has the same format. Look at it first: what do you see?" },
            { type: "paper", task: "m-r2", title: "Read the text and fill in the gaps", source: "Real task · Moscow municipal stage 2025/26 · Reading · Task 2" },
            { type: "list", title: "📋 What you have to do", items: [
              "The text has **10 gaps**: (1), (2) … (10). One sentence is missing from each gap.",
              "Under the text there are **11 sentences: A–K**.",
              "Choose **one sentence for each gap**. Tap the gap in the text (or its box in the table) and type the letter.",
              "You can use every letter **only once**. **One sentence is extra** — it does not fit any gap.",
              "**1 point** for each correct gap — **10 points** for the task."
            ] },
            { type: "text", text: "⏱️ At the olympiad, Reading has **45 minutes** for two tasks (20 points) — so about **20 minutes** for this one." }
          ]
        },
        {
          stage: "presentation", title: "Solve one gap together", minutes: 6, image: img("m08-brain"),
          blocks: [
            { type: "brief", title: "Together: gap 2", items: [
              "This is gap 2 of the alarm clock text you have just seen, and three of the sentences A–K.",
              "Press **👀 Show** to open the next step: the sentence before the gap, the sentence after it, then the right letter."
            ] },
            { type: "walk", gap: 2, answer: "C",
              context: "I’d heard of sunrise alarm clocks some time before but little did I suspect they could resolve my waking woes. So, here they are. [2]. The light interacts with our circadian rhythms, as the sun does when it rises, so we wake up biologically prepared for the day.",
              opts: [
                { k: "C", t: "Essentially, they’re a combination of alarm clock and light-therapy device that glows with increasing brightness as your wake-up time approaches." },
                { k: "G", t: "If waking up feels like a struggle every morning, a sunrise alarm clock might be just the thing to ease the transition." },
                { k: "J", t: "The clock sets off with a slowly dimming light and gentle sounds that tell my body and brain it’s time for bed." }
              ],
              steps: [
                { q: "👀 Read the sentences **before** the gap. What do we expect next?",
                  a: "The writer says **here they are** — they = sunrise alarm clocks. So next we expect to learn **what they are**." },
                { q: "👀 Read the sentence **after** the gap. Which words are hooks?",
                  a: "**The light** — \"the\" means the light was already mentioned. So the missing sentence must talk about **light**." },
                { q: "🔎 Now read sentences C, G and J. Which one says what sunrise alarm clocks are AND talks about light?",
                  a: "**C)** Essentially, **they’re** a combination of alarm clock and light-therapy device that **glows**…" },
                { q: "✅ Check the hooks on both sides of the gap.",
                  a: "here **they** are → **they’re** a combination · **glows** → **The light** interacts. G is about sunrise alarm clocks, but it says nothing about light. J has light, but it is about going to bed. Write **2 – C** and cross out C. 🪝 Words like these connect a missing sentence to the text around it. We call them **hooks**." }
              ] },
            { type: "brief", title: "Your turn: gap 6", items: [
              "Read the text around gap 6 below.",
              "Find the hook and tap the sentence that fits."
            ] },
            { type: "quiz", items: [
              { q: "Gap 6. \"Research backs up my personal experiences with sunrise alarm clocks. (6) ______. So using a sunrise alarm clock can be an easy but powerful way to regulate your body’s circadian rhythm so you feel more rested during the day and more ready for sleep at night.\" Which sentence fits gap 6?",
                opts: [
                  "A. They say exposure to bright light in the morning can help boost the production of serotonin, a hormone that regulates mood, and suppresses the production of melatonin, the hormone that helps us feel sleepy.",
                  "D. Therefore, your day no longer begins with eyes on-screen – and the road from here to doom scrolling is about the length of a thumbprint.",
                  "H. A healthy sleep-wake cycle is crucial for quality sleep, and quality sleep is essential for our health."
                ], a: 0,
                why: "**A**: **They say** — they = the researchers (Research backs up…). Bright light in the morning helps your body, **so** a clock with light can regulate your body’s rhythm. D starts with **Therefore**, but there is nothing about phones before the gap. H is true, but the sentence after the gap begins with **So** — it needs a fact about light first." }
            ] },
            { type: "text", text: "🪝 **Four kinds of hooks** — look for them in every Reading Task 2:" },
            { type: "hooks", items: [
              { h: "👉 Reference words", t: "she, they, these, those, it, this, such, here — they point back to something said before. I bought a new phone. **It** was cheap. (it = the phone)" },
              { h: "🔗 Linkers", t: "however, but, so, therefore, also, instead — they show the logic: contrast, result, addition. **However** → the next idea is the opposite." },
              { h: "🔁 Repeated words", t: "the same word, a synonym or a word from the same topic: a **phone** → this **gadget**, **lunch** → the **meal**." },
              { h: "⚙️ Grammar", t: "singular or plural, tense: **it is** — one thing; **they are** — more than one." }
            ] },
            { type: "meme", style: "drake", no: "Reading only the sentence before the gap", yes: "Reading the sentence before AND after the gap" }
          ]
        },
        {
          stage: "practice", title: "Practice: hooks", minutes: 8, image: img("m09-focus"),
          blocks: [
            { type: "brief", title: "Hook hunt", items: [
              "Read the short text below.",
              "Find **6 hooks**: words that point back (like **it**, **these**) and linkers (like **however**, **so**).",
              "Tap each hook. Green = right. If a word shakes, it is not a hook — try another one."
            ], example: "\"I love my cat. **It** sleeps all day.\" — **It** points back to \"my cat\"." },
            { type: "hookhunt",
              text: "My grandmother never used an alarm clock. She woke up with the sun. But that was easy in a small village. Such a quiet life is rare today. Cities are noisy. They never really sleep. Therefore, most of us need an alarm.",
              hooks: ["She", "But", "that", "Such", "They", "Therefore"] },
            { type: "brief", title: "Sort the hooks", items: [
              "Two of the four kinds of hooks: 👉 words that **point back** to something said before, and 🔗 words that **link ideas** (contrast, result, addition).",
              "Drag each word into the right box.",
              "On a phone or tablet: tap the word, then tap the box."
            ], example: "**those** → 👉 Points back · **but** → 🔗 Links ideas" },
            { type: "sort",
              buckets: [{ id: "ref", label: "👉 Points back" }, { id: "link", label: "🔗 Links ideas" }],
              cards: [
                { t: "this", b: "ref" }, { t: "however", b: "link" }, { t: "they", b: "ref" }, { t: "as a result", b: "link" },
                { t: "such", b: "ref" }, { t: "also", b: "link" }, { t: "these", b: "ref" }, { t: "therefore", b: "link" },
                { t: "it", b: "ref" }, { t: "instead", b: "link" }
              ] },
            { type: "brief", title: "Mini reading task", items: [
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
          stage: "practice", title: "Grammar in the text: -ing or to?", minutes: 12, image: img("m04-smort"),
          blocks: [
            { type: "text", text: "🧩 The alarm clock text is full of **-ing forms and infinitives** — and Use of English Task 2 tests them every year. You know the rules: let's practise!" },
            { type: "vtable", title: "📋 Remember: -ing or to?", cols: [
              { h: "➕ -ing only", lines: [
                "enjoy, avoid, mind, finish, suggest, consider, imagine, deny, admit, miss, practise, risk, keep",
                "can't help, can't stand, give up, put off, it's (not) worth, there's no point in",
                "**After a preposition:** instead of, after, before, without, look forward to, be used to, object to, succeed in, have difficulty (in)"
              ] },
              { h: "🎯 to + verb only", lines: [
                "want, would like, decide, hope, plan, agree, refuse, manage, offer, promise, afford, expect, learn, seem, pretend, fail, tend, arrange, deserve, claim, prove",
                "**After nouns and adjectives:** a way to…, the first to…, easy to…, too … to…, … enough to…"
              ] },
              { h: "🔹 Verb without to", lines: [
                "**Modals:** can, could, must, should, might, will",
                "let, make: **make me laugh**, **let me go** — but passive: be made **to** do",
                "had better, would rather: **I'd rather stay** · **would rather + somebody + past**: I'd rather you **didn't**",
                "help: **help (to) do** — both are correct; but can't help **doing** = can't stop yourself"
              ] },
              { h: "🔀 Both — same meaning", lines: [
                "begin, start, continue, like, love, hate, prefer",
                "But **would like / love / hate / prefer** + to do: I'd love **to come**."
              ] },
              { h: "⚠️ Both — the meaning changes", lines: [
                "**remember / forget doing** = a memory of the past · **remember / forget to do** = a task: don't forget it",
                "**stop doing** = quit · **stop to do** = stop in order to do something",
                "**try doing** = do it as an experiment · **try to do** = make an effort",
                "**regret doing** = be sorry about the past · **regret to tell / inform** = be sorry about bad news",
                "**go on doing** = continue · **go on to do** = do something next"
              ] },
              { h: "🏆 Olympiad level: passive and perfect forms", lines: [
                "**being done** — passive: avoid **being recognised**",
                "**having done** — perfect: regret **having bought**",
                "**to have done** — perfect infinitive: claimed **not to have been**, is said **to have had**"
              ], note: "Real answers from Use of English Task 2, Moscow municipal stage 2022/23–2025/26." }
            ] },
            { type: "brief", title: "Find them in the task", items: [
              "All the phrases below are from the alarm clock text or its sentences A–K.",
              "Drag each phrase into the right box: **-ing** or **infinitive** (to do or do).",
              "On a phone or tablet: tap the phrase, then tap the box."
            ], example: "**I enjoy reading** → ➕ -ing · **I decided to go** → 🎯 infinitive" },
            { type: "sort",
              buckets: [{ id: "ing", label: "➕ -ing (gerund)" }, { id: "inf", label: "🎯 infinitive (to do / do)" }],
              cards: [
                { t: "instead of doing it", b: "ing" }, { t: "proved to fall", b: "inf" }, { t: "the process of waking up", b: "ing" },
                { t: "want to wake up", b: "inf" }, { t: "after using", b: "ing" }, { t: "powerful way to regulate", b: "inf" },
                { t: "instead of slipping back", b: "ing" }, { t: "help boost", b: "inf" }, { t: "If waking up feels like a struggle", b: "ing" },
                { t: "To wind down at night", b: "inf" }
              ] },
            { type: "brief", title: "-ing or to?", items: [
              "Read the sentence and tap the right form.",
              "The first four sentences come from the alarm clock text and its sentences A–K.",
              "Read why: the rule is in the table above."
            ] },
            { type: "quiz", items: [
              { q: "Sunrise alarm clocks soon proved ___ into this exclusive category.", opts: ["to fall", "falling"], a: 0,
                why: "**prove** + to do — like seem, manage, decide." },
              { q: "Instead of ___ it abruptly to a jarring beep in a pitch-dark room, a sunrise alarm clock slowly and gradually lights up my space.", opts: ["doing", "to do"], a: 0,
                why: "After a preposition (instead of, after, before, without, of) — always **-ing**." },
              { q: "I stay awake once the alarm goes off instead of ___ back into sleep.", opts: ["slipping", "to slip"], a: 0,
                why: "**instead of** is a preposition, so **-ing**." },
              { q: "This is what I really appreciate when I want ___ up long before sunrise.", opts: ["to wake", "waking"], a: 0,
                why: "**want** + to do." },
              { q: "Remember ___ your alarm before you go to bed!", opts: ["to set", "setting"], a: 0,
                why: "**remember to do** = don't forget a task (it is still in the future). **remember doing** = a memory of the past." },
              { q: "I'll never forget ___ up at dawn on that camping trip last summer.", opts: ["waking", "to wake"], a: 0,
                why: "**forget doing** = a memory of the past: it happened, and you will always remember it." },
              { q: "She stopped ___ coffee after 4 pm, and now she sleeps better.", opts: ["drinking", "to drink"], a: 0,
                why: "**stop doing** = quit. **stop to do** = stop in order to do something." },
              { q: "I've given up ___ my phone as an alarm.", opts: ["using", "to use"], a: 0,
                why: "**give up** + -ing — like enjoy, avoid, keep." }
            ] },
            { type: "brief", title: "Olympiad format", items: [
              "This is Use of English Task 2: complete the second sentence so that it means the same as the first one.",
              "Use the word given — don't change it — and exactly the number of words in brackets, **including the word given**.",
              "Don't use short forms: write **do not**, not don't.",
              "Type your answer and press **✓ Check**."
            ] },
            { type: "transform", items: [
              { q: "I'm sorry that I pressed snooze five times.", word: "regret", before: "I", after: "snooze five times.", n: 3, accept: ["regret having pressed"],
                note: "Task 2 checks the -ing form here: regret **having done** — like the real olympiad answer regret **having bought**." },
              { q: "My sister always gets up at six, so early mornings are normal for her.", word: "used", before: "My sister", after: "up early.", n: 4, accept: ["is used to getting"], note: "get up → **getting** up: be used to + -ing." },
              { q: "Don't forget to turn off the light before you go to sleep.", word: "remember", before: "", after: "the light before you go to sleep.", n: 4, accept: ["remember to turn off", "remember to switch off", "remember to turn out", "remember to put out"] },
              { q: "He said he hadn't fallen asleep in the lesson.", word: "denied", before: "He", after: "asleep in the lesson.", n: 3, accept: ["denied having fallen"] },
              { q: "There's no point in buying an expensive alarm clock.", word: "worth", before: "It", after: "an expensive alarm clock.", n: 4, accept: ["is not worth buying"] },
              { q: "I couldn't stop myself from pressing snooze again.", word: "help", before: "I", after: "snooze again.", n: 4, accept: ["could not help pressing"] }
            ] }
          ]
        },
        {
          stage: "production", title: "Homework: Reading Task 2", minutes: 3, image: img("m10-lock-in"),
          blocks: [
            { type: "text", text: "🏠 **Homework:** one more real task — **Reading Task 2** from the Moscow municipal stage **2024/25**, a text about the Tsvetaeva apple pie. The same format as the alarm clock text: 10 gaps, 11 sentences A–K, one is extra." },
            { type: "brief", title: "The homework task · 15 minutes", items: [
              "Start the timer below, then open the task.",
              "Read the whole text quickly: what is it about? (2 minutes)",
              "Read sentences A–K. Look for hooks: this, they, these, however, so…",
              "For each gap, read the sentence **before** and the sentence **after** it. Choose a letter.",
              "Do the easy gaps first. You can use every letter **only once**.",
              "One sentence is extra: at the end, check that it does not fit anywhere.",
              "When the time is up, press **✓ Check answers** and read **💡 Show how to solve** under every wrong gap."
            ] },
            { type: "timer", minutes: 15, label: "15 minutes for the task" },
            { type: "task", task: "p-r2-2425", label: "Open the homework task" }
          ]
        },
        {
          stage: "feedback", title: "Check and discuss", minutes: 3, image: img("m01-queen"),
          blocks: [
            { type: "brief", title: "Check the homework", items: [
              "Open the homework task and press **✓ Check answers** at the bottom.",
              "How many points out of 10?",
              "For every wrong gap, read **💡 Show how to solve** under it and find the hook you missed.",
              "Then come back and answer the three questions below."
            ] },
            { type: "task", task: "p-r2-2425", label: "Open the homework task" },
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
              "Hooks: reference words, linkers, repeated words, grammar.",
              "Gerund or infinitive: after a preposition → -ing; want, decide, prove → to; remember, stop, try, regret — the meaning changes."
            ] },
            { type: "reveal", label: "🎟️ Exit ticket: name the four kinds of hooks", text: "Reference words (this, they…), linkers (however, so…), repeated words or synonyms, grammar (tense, singular / plural)." },
            { type: "links", title: "📝 Homework", items: [
              { href: "#/t/p-r2-2425", label: "📖 Reading Task 2 · the Tsvetaeva apple pie · 2024/25", note: "15 minutes — step 6 of this lesson" },
              { href: "#/grammar/t/b1-gerund-infinitive", label: "🧩 Grammar · Gerund or infinitive", note: "10 questions" },
              { href: "#/t/m-r1", label: "📖 Reading Task 1 · Municipal 2025/26", note: "20 minutes, like at the olympiad" },
              { href: "#/t/p-u3-2425", label: "🧱 Practice · Use of English Task 3 · 2024/25", note: "word formation" },
              { href: "#/t/p-u4-2425", label: "🏛️ Practice · Use of English Task 4 · 2024/25", note: "culture" },
              { href: "#/lexis/t/lx-wf-adjectives", label: "🔥 Lexis · Word formation: adjectives and adverbs", note: "10 questions" }
            ] }
          ]
        }
      ]
    },
    // Учитель 25.10: «урок, где я как учитель незаменима», а не повторяла то, с чем ученица разберётся сама.
    // Writing на олимпиаде судят по числу ошибок (0 → 4, 1–2 → 3, 3–4 → 2, 5–6 → 1, 7+ → 0), и считать их
    // может только учитель: поэтому урок — про жюри, план, прокачку фраз и письмо с разбором. Warm-up — на
    // ридинге (порядок предложений по крючкам) и герундии / инфинитиве прошлого урока. Рассказ для жюри —
    // наш, учебный: в нём нет одного пункта задания и спрятаны ошибки по критериям (ключ — в score/mistakes).
    // Картинки шагов — временные, из прошлых уроков: учитель ищет свои.
    {
      id: "l3", date: "2026-10-26", title: "Writing: a story", emoji: "✍️", cover: img("m03-studying"),
      aims: [
        "🗣️ Warm up: -ing or to? and a story in the right order.",
        "⚖️ Be the jury: score a story like the real jury.",
        "✍️ Plan, upgrade and write — and count your mistakes."
      ],
      steps: [
        {
          stage: "warm-up", title: "Warm-up", minutes: 8, image: img("m05-you-can"),
          blocks: [
            { type: "brief", title: "Talk: -ing or to?", items: [
              "Answer each question in a full sentence.",
              "Use the verb pattern from the question: **avoid doing**, **decided to**…"
            ] },
            { type: "talk", items: [
              "What do you usually **avoid doing** the night before an exam? Why?",
              "What have you **decided to** change this school year?",
              "What do you **regret not doing** last summer?",
              "What do you **remember doing** on your first day at school?",
              "What are you **looking forward to** this winter?",
              "What would you never **stop doing**, even if you were very busy?"
            ] },
            { type: "brief", title: "A story in the right order", items: [
              "The six sentences of a short story are mixed up.",
              "Put them in order: look for the hooks, like in Reading Task 2.",
              "Press **✓ Check**. Then tell the story in your own words."
            ] },
            { type: "gapfill",
              text: "[1] [2] [3] [4] [5] [6]",
              cards: [
                { k: "A", t: "Feeling his way along the wall, he finally found a torch in the kitchen drawer." },
                { k: "B", t: "Inside it was a letter in his grandfather's handwriting." },
                { k: "C", t: "Tom had always hated the dark, and that night the lights went off at exactly midnight." },
                { k: "D", t: "He never told anyone what the letter said — but from that night on, he was no longer afraid of the dark." },
                { k: "E", t: "However, when he switched it on, the light fell on something he had never seen before: a small wooden box." },
                { k: "F", t: "Hardly had he read the first line when the lights came back on." }
              ],
              key: { "1": "C", "2": "A", "3": "E", "4": "B", "5": "F", "6": "D" },
              why: {
                "1": "C opens the story: who (Tom), when (that night) and the problem (the dark).",
                "2": "A: \"Feeling his way along the wall\" — because the lights went off.",
                "3": "E: \"when he switched IT on\" — it = the torch.",
                "4": "B: \"Inside IT\" — it = the small wooden box.",
                "5": "F: \"the first line\" — of the letter. Hardly had … when = at that very moment.",
                "6": "D: the ending goes back to the beginning — \"that night\", \"afraid of the dark\"."
              } }
          ]
        },
        {
          stage: "presentation", title: "The real task and the jury", minutes: 5, image: img("m01-queen"),
          blocks: [
            { type: "text", text: "📄 **This is the real Writing task** from the Moscow municipal stage 2025/26, word for word. At the olympiad you have **60 minutes** and can get up to **20 points**." },
            { type: "wpaper", task: "m-w1", source: "Real task · Moscow municipal stage 2025/26 · Writing" },
            { type: "list", title: "📋 What you have to do", items: [
              "Write a story for the magazine: **200–250 words**. The title counts too.",
              "The story must **end with** the given sentence, word for word.",
              "Give it a **title** that fits the story.",
              "Include **a rich relative** and **a beautiful house**.",
              "Then check every sentence: mistakes cost points."
            ] },
            { type: "vtable", title: "⚖️ How the jury scores: 5 criteria × 4 points", cols: [
              { h: "1️⃣ Task completion · 4", lines: [
                "4 things: the given sentence, a title that fits, a rich relative, a beautiful house.",
                "Each missing thing = −1 point.",
                "**0 here = 0 for the whole story.**"
              ] },
              { h: "2️⃣ Organisation · 4", lines: ["A logical plot, correct linking words, paragraphs."] },
              { h: "3️⃣ Vocabulary · 4", lines: ["Wrong words and word combinations."] },
              { h: "4️⃣ Grammar · 4", lines: ["Grammar mistakes. The same rule broken twice counts once."] },
              { h: "5️⃣ Spelling and punctuation · 4", lines: ["Typos count too!"] },
              { h: "📉 Mistakes → points (criteria 2–5)", lines: [
                "0 mistakes → 4", "1–2 mistakes → 3", "3–4 mistakes → 2", "5–6 mistakes → 1", "7 or more → 0"
              ], note: "Fewer than 180 words = 0 for the whole story. More than 275 words: only the first 250 words are checked." }
            ] }
          ]
        },
        {
          stage: "practice", title: "Be the jury", minutes: 10, image: img("m04-smort"),
          blocks: [
            { type: "brief", title: "Be the jury", items: [
              "Read the story below. It was written for the same task (2025/26).",
              "Give it points for each criterion: tap 0–4.",
              "Then press **⚖️ Show the jury's verdict** and compare."
            ] },
            { type: "jury", title: "The Uncle Nobody Talked About",
              story: [
                "Jim had lived in London for three years, and he hadn't been home once. He worked in a small café, shared a tiny flat with two other students and didn't knew anybody in the city. He was too busy to call his parents, and they were too proud to call him.",
                "One rainy evening a man in an expensive coat came into the café and ordered a coffee. He said Jim that he was looking for \"a young man called Jim Parker\". Jim was shocked: the man was his uncle Robert, a rich buisnessman who had left the family twenty years before.",
                "However, Robert told him a story nobody in the family had ever told Jim. Years ago he and Jim's father had had a terrible argument about money. Since then they didn't speak. \"If I would have called him earlier, everything would be different,\" Robert said quietly. It was a wierd feeling to see this proud man so sad.",
                "Before leaving, Robert gave Jim an envelope. \"Give this to your father,\" he said. \"I wrote it last week, but I am too proud to send it.\" Jim put it on the table and went outside to make a photo of the rainy street for his mother. When he came back, the envelope had fallen on the floor and opened. Jim happened to see the letter and decided to book a ticket for the first train heading home."
              ],
              score: { task: 3, org: 3, lex: 3, gram: 2, spell: 3 },
              mistakes: {
                task: ["There is no beautiful house: one of the four things from the task is missing."],
                org: [{ wrong: "However, Robert told him", right: "Then Robert told him", why: "however shows contrast, but there is no contrast here." }],
                lex: [
                  { wrong: "He said Jim that", right: "He told Jim that", why: "say something, but tell somebody." },
                  { wrong: "make a photo", right: "take a photo", why: "we take photos." }
                ],
                gram: [
                  { wrong: "didn't knew", right: "didn't know", why: "after did / didn't — the base form." },
                  { wrong: "Since then they didn't speak", right: "Since then they hadn't spoken", why: "since + a perfect tense; in a story about the past — Past Perfect." },
                  { wrong: "If I would have called", right: "If I had called", why: "third conditional: if + Past Perfect." }
                ],
                spell: [
                  { wrong: "buisnessman", right: "businessman" },
                  { wrong: "wierd", right: "weird" }
                ]
              } }
          ]
        },
        {
          stage: "practice", title: "Plan together", minutes: 7, image: img("m08-brain"),
          blocks: [
            { type: "text", text: "🗺️ Now a new story: the real task from 2024/25. Before writing, we plan." },
            { type: "wpaper", source: "Real task · Moscow municipal stage 2024/25 · Writing",
              intro: "You see the following notice in an English youth magazine and decide to send your story.",
              premise: "Stories Wanted. Write a story for our magazine. The story must begin with the sentence: Anita had just arrived at her house when she realized she didn't have her keys.",
              pointsLabel: "The story must have a title and must include:",
              points: ["a neighbour", "a dog"],
              outro: "Write 200-250 words (the title is included in the word count)." },
            { type: "brief", title: "Plan the story", items: [
              "Your story must **begin** with the sentence above.",
              "Fill in the story map: a short note in each box.",
              "Plan 4–5 paragraphs: the opening → the problem → the twist → the ending.",
              "Be ready to change your plan if a better idea comes!"
            ] },
            { type: "storymap", fields: [
              { id: "title", label: "📝 Title" },
              { id: "who", label: "👤 Anita: who is she? (age, job, character)" },
              { id: "problem", label: "🧩 The problem: why are the keys so important today?" },
              { id: "neighbour", label: "🏠 The neighbour: who is it? Does he or she help?" },
              { id: "dog", label: "🐕 The dog: whose dog is it and what does it do?" },
              { id: "twist", label: "⚡ The twist: what does nobody expect?" },
              { id: "ending", label: "🏁 The ending: how does it all end?" }
            ] }
          ]
        },
        {
          stage: "practice", title: "Upgrade studio", minutes: 8, image: img("m06-succeed"),
          blocks: [
            { type: "brief", title: "Upgrade the sentences", items: [
              "Make each sentence sound like a strong olympiad story. Use the tool in capitals.",
              "Type your version.",
              "Then press **💡 One possible version** and compare. Yours can be even better!"
            ] },
            { type: "upgrade", items: [
              { plain: "She was very scared.", tool: "a stronger word", model: "She was terrified." },
              { plain: "She came home. Then she saw that the door was open.", tool: "Past Perfect + when", model: "She had just come home when she saw that the door was open." },
              { plain: "As soon as she opened the door, the dog started barking.", tool: "Hardly had … when", model: "Hardly had she opened the door when the dog started barking." },
              { plain: "She looked out of the window and saw her neighbour.", tool: "a clause with -ing", model: "Looking out of the window, she saw her neighbour." },
              { plain: "She had left the keys at work. She was very sorry about it.", tool: "regret + having done", model: "She regretted having left the keys at work." },
              { plain: "The dog was very clever. It found the keys in five minutes.", tool: "so … that", model: "The dog was so clever that it found the keys in five minutes." },
              { plain: "She didn't want to wake the baby, so she walked very quietly.", tool: "avoid + -ing", model: "She tiptoed past the door to avoid waking the baby." }
            ] }
          ]
        },
        {
          stage: "production", title: "Write and get feedback", minutes: 10, image: img("m10-lock-in"),
          blocks: [
            { type: "brief", title: "Write the opening", items: [
              "Start with the given sentence: it is already in the box.",
              "Write the first paragraph: **60–80 words**. Use your plan and your upgraded sentences.",
              "There is no spell-check here, just like at the olympiad: check your typing yourself."
            ] },
            { type: "writebox", start: "Anita had just arrived at her house when she realized she didn't have her keys.", min: 60, max: 80 },
            { type: "brief", title: "Read it to the jury", items: [
              "Read your paragraph aloud.",
              "The jury counts the mistakes for each criterion — and you see your points."
            ] },
            { type: "counter", crits: [
              { id: "org", t: "Organisation" },
              { id: "lex", t: "Vocabulary" },
              { id: "gram", t: "Grammar" },
              { id: "spell", t: "Spelling and punctuation" }
            ] }
          ]
        },
        {
          stage: "wrap-up", title: "Wrap-up and homework", minutes: 2, image: img("m12-proud"),
          blocks: [
            { type: "list", title: "🌟 Today you learnt", items: [
              "The jury counts mistakes: 0 → 4, 1–2 → 3, 3–4 → 2, 5–6 → 1, 7 or more → 0.",
              "Task completion first: the given sentence, a title that fits, both things from the task.",
              "Upgrade tools: Past Perfect, Hardly had … when, -ing clauses, regret having done, so … that."
            ] },
            { type: "brief", title: "My three mistakes", items: [
              "Look at the jury counter.",
              "Name your three typical mistakes from today — and say how to avoid them."
            ] },
            { type: "links", title: "📝 Homework", items: [
              { href: "#/t/m-w1", label: "✍️ Writing · Story · Municipal 2025/26", note: "60 minutes, 200–250 words, no spell-check" }
            ] }
          ]
        }
      ]
    },
    { id: "l4", date: "2026-11-02", title: "Writing: an essay on a quotation · Culture", emoji: "📚", cover: img("m04-smort"),
      aims: ["How to comment on a quotation.", "Examples from history and literature.", "Use of English Task 4: culture."] },
    { id: "l5", date: "2026-11-09", title: "Mock exam: review", emoji: "📝", cover: img("m05-you-can"),
      aims: ["We check the mock exam together.", "Your weakest part: extra practice."] },
    { id: "l6", date: "2026-11-16", title: "Final practice before the olympiad", emoji: "🏔️", cover: img("m06-succeed"),
      aims: ["Quick practice of every task.", "Time and strategy on the day."] }
  ];
})();
