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
  // Блоки эссе по цитате — одни и те же в домашнем разделе урока l3 и в уроке l4.
  var ESSAY_RECIPE = { type: "vtable", title: "🧭 The recipe: an essay in 4 paragraphs", cols: [
              { h: "1️⃣ Introduction · ≈50 words", lines: ["Say what the quotation means in your own words — don't just copy it.", "Say if you agree."] },
              { h: "2️⃣ Your opinion · ≈70 words", lines: ["Your position and two reasons: Firstly… Secondly…"] },
              { h: "3️⃣ Examples · ≈70 words", lines: ["One or two real examples from literature or history.", "Name them — the book, the writer, the person, the event — and show how they prove your point."] },
              { h: "4️⃣ Conclusion · ≈40 words", lines: ["Say your position again in new words.", "No new ideas here."] }
            ], note: "Each point of the plan is checked: a missing point = −1 for Task completion." };
  var ESSAY_PHRASES = { type: "list", title: "🪝 Useful phrases", items: [
              "**Introduction:** The author means that… · In other words… · I fully / partly agree with this idea.",
              "**Reasons:** Firstly… · Secondly… · What is more… · This is because…",
              "**Examples:** A good example of this is… · This is clearly shown in … by … · History shows that…",
              "**Conclusion:** To sum up… · All things considered… · That is why I believe that…"
            ] };
  var ESSAY_JURY = { type: "vtable", title: "⚖️ How the jury scores an essay: 5 criteria × 4 points", cols: [
              { h: "1️⃣ Task completion · 4", lines: [
                "4 things: an introduction that explains the author's idea; your opinion with reasons; examples from literature or history; a conclusion that supports your opinion.",
                "Each missing thing = −1 point.",
                "**0 here = 0 for the whole essay.**"
              ] },
              { h: "2️⃣ Organisation · 4", lines: ["An introduction and a conclusion, correct linking words, paragraphs."] },
              { h: "3️⃣ Vocabulary and style · 4", lines: ["Wrong words are mistakes — and so are informal words and slang."] },
              { h: "4️⃣ Grammar · 4", lines: ["Grammar mistakes."] },
              { h: "5️⃣ Spelling and punctuation · 4", lines: ["Typos count too!"] },
              { h: "📉 Mistakes → points (criteria 2–5)", lines: [
                "0 mistakes → 4", "1–2 mistakes → 3", "3–4 mistakes → 2", "5–6 mistakes → 1", "7 or more → 0"
              ], note: "Fewer than 180 words = 0 for the whole essay. More than 275 words: only the first 250 words are checked." }
            ] };
  var ESSAY_CHECK = { type: "list", title: "✅ Checklist: the last 3 minutes", items: [
              "The introduction explains the quotation in **your own words**.",
              "Your **opinion** and reasons for it.",
              "At least one real **example** from literature or history.",
              "A **conclusion** that says your opinion again.",
              "**200–250 words**, 4 paragraphs, a neutral style.",
              "Read it twice: once for grammar, once for spelling."
            ] };
  // Как решать Listening (домашнее урока l4): формат — как в официальных заданиях муниципального этапа.
  var LISTENING_HOWTO = { type: "vtable", title: "🎧 How to do Listening", cols: [
    { h: "1️⃣ Before you press play", lines: [
      "Read all the statements and questions first.",
      "Underline the key words: names, numbers, dates, only, always, never.",
      "Look for NOT in a question: DID NOT means you need the one thing that did not happen.",
      "Guess the topic: what will the speaker talk about?"
    ] },
    { h: "2️⃣ While you listen", lines: [
      "The questions usually go in the same order as the recording. Lost one? Go on to the next.",
      "Do not wait for the same words: the recording uses synonyms.",
      "The same words in the recording and in an answer are often a trap: listen to the whole idea."
    ] },
    { h: "🪝 Hooks: what changes the answer", lines: [
      "**but, however, actually, at first, in fact**: the speaker is going to change direction.",
      "**only, every, always, never, all**: one small exception makes the statement FALSE.",
      "**Numbers and time:** for a decade, three thousand hours, since childhood. Check them exactly."
    ] },
    { h: "1️⃣ Task 1 · True or False · you hear it twice", lines: [
      "First time: mark the answers you are sure about.",
      "Second time: check the others."
    ] },
    { h: "2️⃣ Task 2 · A, B or C · you hear it once", lines: [
      "Answer at once and go on: there is no second time.",
      "Not sure? Choose one anyway: a wrong answer takes no points away."
    ] }
  ] };
  var ESSAY_KING = { type: "wpaper", source: "Real task · Moscow municipal stage 2021/22 · Writing",
    intro: "Comment on the following quotation.",
    quote: "Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work.",
    author: "Stephen King",
    outro: "Write 200–250 words.",
    pointsLabel: "Use the following plan:",
    points: [
      "make an introduction, explaining how you understand the author’s point of view;",
      "express your personal opinion and give reasons to support it;",
      "give examples from literature or history to illustrate your reasons;",
      "make a conclusion restating your position."
    ] };
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
                "**being done** — passive: avoid **being seen**",
                "**having done** — perfect: regret **having bought**",
                "**to have done** — perfect infinitive: claimed **not to have been**, is said **to have had**"
              ], note: "The last two lines are real answers from Use of English Task 2, Moscow municipal stage 2024/25 and 2025/26." }
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
    // Учитель 25.10, вдогонку: «чтобы я не просто читала то, что на экране, — чтобы без меня никак». Поэтому ключи
    // (порядок истории и почему, ошибки рассказа, образцы фраз) лежат в данных для учителя и тестов, но на экран
    // не выводятся: ученица ищет и объясняет, учитель ведёт и подтверждает по своей шпаргалке.
    // Ревью PR 41: на дом — не задание 2025/26 (рассказ для жюри написан по нему, и его можно было бы сдать,
    // исправив разобранные ошибки), а своя история про Аниту из раздела 6 — целиком, 200–250 слов.
    // Учитель 26.10: «каша — слишком много текстов; один штудируем на уроке, другой — на дом, и чтобы было
    // примитивно понятно, что на уроке, а что дома». На уроке всё — задание 2025/26 (Jim): разминка-скелет,
    // жюри, свой план, последний абзац. Дома — отдельный раздел (home: true, не в 50 минутах) — задание
    // 2024/25 (Anita): прокачка фраз, план, весь рассказ за 60 минут.
    // Учитель 26.10: «не пиши комментарии — „реальное задание, 60 минут, 20 поинтов“: это я объясняю как учитель».
    // Поэтому текстов-пояснений и «Today you learnt» нет; в рамках «What to do» — только что сделать. Всё, что
    // говорит учитель, — в её шпаргалке.
    // Учитель 27.10 (после урока): на дом — раздел 4 (свой план) и 5 (весь рассказ: задание, поле на 200–250 слов
    // без автоисправления, чек-лист, критерии, «Send to my teacher»); раздел «итог» убран; шестой — домашнее эссе
    // по цитате (второй тип Writing, официальное задание 2023/24) с рецептом, фразами и критериями жюри для эссе.
    // Картинки — учителя (25.10, Pinterest), расставлены по смыслу.
    {
      id: "l3", date: "2026-10-26", title: "Writing: a story", emoji: "✍️", cover: img("m03-studying"),
      aims: [
        "🗣️ Warm up: -ing or to? And a story in the right order.",
        "⚖️ One real task: spot the mistakes and be the jury.",
        "🏠 Homework: plan and write your story (Sections 4–5) and an essay on a quotation (Section 6)."
      ],
      steps: [
        {
          stage: "warm-up", title: "Warm-up", minutes: 7, image: img("m13-positive-energy"),
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
              "Press **✓ Check** and explain each choice. Then tell the story in your own words."
            ] },
            { type: "gapfill", askWhy: true,
              text: "[1] [2] [3] [4] [5] [6]",
              cards: [
                { k: "A", t: "One morning a lawyer phoned him: his rich aunt Margaret had left him her beautiful house by the sea." },
                { k: "B", t: "The lawyer emailed him photos of the house to help him with the sale." },
                { k: "C", t: "Jim had been working in Manchester for five years and hardly ever called home." },
                { k: "D", t: "Jim happened to see the letter and decided to book a ticket for the first train heading home." },
                { k: "E", t: "Jim decided to sell it at once: he was far too busy to go back." },
                { k: "F", t: "In one of the photos, a letter in his aunt's handwriting was lying on the kitchen table, addressed to him." }
              ],
              key: { "1": "C", "2": "A", "3": "E", "4": "B", "5": "F", "6": "D" },
              why: {
                "1": "C opens the story: who (Jim), where (Manchester) and the problem (he hardly ever calls home).",
                "2": "A: \"him\" = Jim; the news that starts the story — the rich relative and the beautiful house.",
                "3": "E: \"sell IT\" — it = the house from A.",
                "4": "B: \"the sale\" — because Jim wants to sell the house.",
                "5": "F: \"one of the photos\" — the photos from B; now there is a letter.",
                "6": "D: the given last sentence — \"the letter\" from F; \"happened to see\" = by chance, in a photo."
              } }
          ]
        },
        {
          stage: "presentation", title: "The task and the recipe", minutes: 7, image: img("m14-smile-and-endure"),
          blocks: [
            { type: "wpaper", task: "m-w1", source: "Real task · Moscow municipal stage 2025/26 · Writing" },
            { type: "vtable", title: "🧭 The recipe: a story in 4 paragraphs", cols: [
              { h: "📝 Title · 2–5 words", lines: ["It must fit the story — and make the reader curious.", "Example: **The Letter on the Table**"] },
              { h: "1️⃣ The hook · ≈50 words", lines: ["Who, where, when — and something unusual.", "Start with action or a line of dialogue, not \"Once upon a time\"."] },
              { h: "2️⃣ The build-up · ≈60 words", lines: ["The rich relative and the beautiful house come in.", "Describe them: two or three strong adjectives."] },
              { h: "3️⃣ The turning point · ≈60 words", lines: ["Something changes: a surprise, a problem, a secret.", "Suddenly… · Hardly had he… when…"] },
              { h: "4️⃣ The ending · ≈50 words", lines: ["Everything leads to the given sentence.", "The given sentence is the very last line — word for word."] }
            ], note: "🔙 Plan backwards: start from the last sentence. What must happen just before it? And before that?" },
            { type: "list", title: "🪝 Story hooks: words that make a story work", items: [
              "**Openings:** It was the last thing Jim expected. · Jim had never liked letters. · \"Who are you?\" Jim asked.",
              "**Time:** at first, then, a moment later, by the time, eventually, in the end.",
              "**Surprise:** Suddenly… · To his surprise… · Little did he know that…",
              "**Tenses:** Past Simple for events, Past Continuous for the background, Past Perfect for what happened before.",
              "**Strong structures:** Hardly had he opened the door when… · Never had he seen such a house. · Not until he read the letter did he understand."
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
            ] },
            { type: "list", title: "✅ Checklist: the last 3 minutes", items: [
              "The given sentence is the last line — **word for word**.",
              "A **title** that fits the story.",
              "The **rich relative** ✓ and the **beautiful house** ✓",
              "**200–250 words** (the title counts too).",
              "4 paragraphs.",
              "Read it twice: once for tenses, once for spelling."
            ] }
          ]
        },
        {
          stage: "practice", title: "Mistakes and the jury", minutes: 14, image: img("m15-cards-say"),
          blocks: [
            { type: "brief", title: "Spot the mistake", items: [
              "Each sentence has one mistake.",
              "Tap the wrong word, then say the whole sentence correctly.",
              "Every sentence is also an idea for the story in Section 2. Which ideas would you use?"
            ] },
            { type: "spot", items: [
              { text: "Jim has lived in Manchester since five years, far away from his family.", at: 5, wrong: "since", right: "has lived in Manchester for five years", cat: "Grammar" },
              { text: "His rich aunt said him that the house would one day be his.", at: 3, wrong: "said", right: "His rich aunt told him", cat: "Vocabulary" },
              { text: "Aunt Margaret has bought the beautiful house by the sea forty years ago.", at: 2, wrong: "has", right: "Aunt Margaret bought the beautiful house", cat: "Grammar" },
              { text: "If Jim will not come home, the house will go to strangers.", at: 2, wrong: "will", right: "If Jim does not come home", cat: "Grammar" },
              { text: "Hardly had Jim opened the envelope than he recognised his grandmother's handwriting.", at: 6, wrong: "than", right: "when he recognised", cat: "Grammar" },
              { text: "His lawyer suggested to sell the old house, but Jim refused.", at: 3, wrong: "to", right: "suggested selling the old house", cat: "Grammar" },
              { text: "It was the most loveliest house Jim had ever seen.", at: 3, wrong: "most", right: "the loveliest house", cat: "Grammar" },
              { text: "Jim was so boring in the big empty house that he started reading old letters.", at: 3, wrong: "boring", right: "so bored in the big empty house", cat: "Vocabulary" },
              { text: "The letter was written by his rich uncle, who had dissapeared years before.", at: 10, wrong: "dissapeared", right: "disappeared", cat: "Spelling and punctuation" },
              { text: "Its strange, but the house still smelled of his grandmother's cakes.", at: 0, wrong: "Its", right: "It's strange", cat: "Spelling and punctuation" }
            ] },
            { type: "brief", title: "Be the jury", items: [
              "Read the story below. It was written for the same task (2025/26).",
              "Give it points for each criterion: tap 0–4.",
              "Then press **⚖️ Show the jury's verdict**: compare the points and find every mistake."
            ] },
            { type: "jury", title: "The Uncle Nobody Talked About",
              story: [
                "Jim had lived in London for three years, and he hadn't been home once. He worked in a small café, shared a tiny flat with two students and didn't knew anybody in the city. He was too busy to call his parents, and they were too proud to call him.",
                "One evening a man in an expensive coat came into the café and ordered a coffee. He said Jim that he was looking for \"a young man called Jim Parker\". \"I'm your uncle Robert,\" he added. Jim was shocked: he had heard about his father's rich brother, a buisnessman who had left the family twenty years before.",
                "However, Robert told him a story nobody in the family had ever told Jim. Many years earlier, he and Jim's father had had a terrible argument about money. Since then they didn't speak. \"If I would have called him earlier, everything would be different,\" Robert said quietly. It was a wierd feeling to see this proud man so sad.",
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
                  { wrong: "If I would have called", right: "If I had called", why: "an if-clause about the past: if + Past Perfect, never would have." }
                ],
                spell: [
                  { wrong: "buisnessman", right: "businessman" },
                  { wrong: "wierd", right: "weird" }
                ]
              } }
          ]
        },
        {
          stage: "homework", home: true, title: "Plan your story", minutes: 15, image: img("m16-plot-board"),
          blocks: [
            { type: "brief", title: "Plan your story", items: [
              "Plan **your own** story for the task in Section 2 — not the jury's story!",
              "Fill in the story map: a short note in each box.",
              "Use the recipe from Section 2: 4 paragraphs, plan backwards from the last sentence.",
              "Be ready to change your plan if a better idea comes!"
            ] },
            { type: "storymap", fields: [
              { id: "title", label: "📝 Title" },
              { id: "who", label: "👤 Jim: who is he, where does he live, why isn't he at home?" },
              { id: "relative", label: "💰 The rich relative: who is it and how is he or she connected to Jim?" },
              { id: "house", label: "🏡 The beautiful house: where is it and why is it important?" },
              { id: "letter", label: "✉️ The letter: who wrote it, and how does Jim happen to see it?" },
              { id: "twist", label: "⚡ The twist: what does nobody expect?" },
              { id: "ending", label: "🏁 How do we get to the last sentence?" }
            ] }
          ]
        },
        {
          stage: "homework", home: true, title: "Write your story", minutes: 60, image: img("m17-writing-tears"),
          blocks: [
            { type: "wpaper", task: "m-w1", source: "Real task · Moscow municipal stage 2025/26 · Writing" },
            { type: "brief", title: "Write the whole story", items: [
              "Use your plan from Section 4.",
              "Write the whole story: **200–250 words**. Put the title on the first line.",
              "The story must **end with** the given sentence, word for word.",
              "Start the timer: **60 minutes**. Check your typing yourself: there is no spell-check or autocorrect here.",
              "Then go through the checklist below and press **📤 Send to my teacher**."
            ] },
            { type: "timer", minutes: 60, label: "60 minutes for the story" },
            { type: "writebox", min: 200, max: 250, label: "story", send: "Writing homework · Story (2025/26)" },
            { type: "list", title: "✅ Checklist: the last 3 minutes", items: [
              "The given sentence is the last line — **word for word**.",
              "A **title** that fits the story.",
              "The **rich relative** ✓ and the **beautiful house** ✓",
              "**200–250 words** (the title counts too).",
              "4 paragraphs.",
              "Read it twice: once for tenses, once for spelling."
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
          stage: "homework", home: true, title: "Homework: an essay", minutes: 60, image: img("m19-too-blessed"),
          blocks: [
            { type: "wpaper", source: "Real task · Moscow municipal stage 2023/24 · Writing",
              intro: "Comment on the following quotation.",
              quote: "A leader is best when people barely know he exists, when his work is done, his aim fulfilled, they will say: we did it ourselves.",
              author: "Lao Tzu",
              outro: "Write 200–250 words.",
              pointsLabel: "Use the following plan:",
              points: [
                "make an introduction, explaining how you understand the author’s point of view;",
                "express your personal opinion and give reasons to support it;",
                "give examples from literature or history to illustrate your reasons;",
                "make a conclusion restating your position."
              ] },
            { type: "list", title: "📋 What you have to do", items: [
              "This is the second type of the Writing task: an **essay on a quotation**.",
              "Write **200–250 words** and follow the plan in the task — **all four points**.",
              "Give at least one example from **literature or history**: a real book, writer, person or event.",
              "Write in a **neutral style**: no slang. Short forms (don't) and rhetorical questions are allowed."
            ] },
            ESSAY_RECIPE,
            ESSAY_PHRASES,
            ESSAY_JURY,
            ESSAY_CHECK,
            { type: "brief", title: "Write the essay", items: [
              "Start the timer: **60 minutes**.",
              "Write your essay in the box: **200–250 words**.",
              "Go through the checklist above and press **📤 Send to my teacher**."
            ] },
            { type: "timer", minutes: 60, label: "60 minutes for the essay" },
            { type: "writebox", min: 200, max: 250, label: "essay", send: "Writing homework · Essay (2023/24)" }
          ]
        }
      ]
    },
    // Урок 6.11: одна цель — эссе по цитате 2021/22 (Стивен Кинг), которое не теряет баллы за содержание. Учитель 06.11: «цель у конкретного урока»,
    // «за час уложились», «на все вопросы ответила». На уроке 52 минуты заданий и 8 минут на вопросы. На экране — только задания.
    // Дома только нужное: грамматика, подводки к Use of English и один Listening. Пробник — домашка урока 9 ноября, по работе 2023/24.
    {
      id: "l4", date: "2026-11-06", title: "Writing: an essay on a quotation", emoji: "📚", cover: img("m24-me-when-english"),
      aims: [
        "🎯 Goal: an essay on a quotation that keeps all the points for Task completion.",
        "✍️ One real quotation: build the essay, write it, check it.",
        "🏠 Homework: Sections 6–8."
      ],
      steps: [
        {
          stage: "warm-up", title: "Warm-up", minutes: 3, image: img("m21-strong"),
          blocks: [
            { type: "brief", title: "Talent or hard work?", items: [
              "Tap one side in each row.",
              "Give one reason."
            ] },
            { type: "thisorthat", items: [
              { a: "⭐ Talent", b: "💪 Hard work", ask: "Which one matters more? Give one reason." },
              { a: "🍀 Luck", b: "🧠 Practice", ask: "Give one example from your life." }
            ] }
          ]
        },
        {
          stage: "presentation", title: "The task: an essay", minutes: 6, image: img("m29-brain-tangled"),
          blocks: [
            ESSAY_KING,
            { type: "brief", title: "Decode the quotation", items: [
              "Choose the right answer according to the quotation."
            ] },
            { type: "quiz", items: [
              { q: "\"Talent is cheaper than table salt.\" What does King mean?",
                opts: ["Talent is common: many people have it.", "Talent is not useful at all.", "Salt is more important than talent."], a: 0,
                why: "Salt is cheap because there is a lot of it. Talent is the same: it is **common**, so it is not enough." },
              { q: "\"What separates the talented individual from the successful one…\" What is this part about?",
                opts: ["The difference between someone who has talent and someone who achieves something.", "Why talented people never succeed.", "How to find talented people."], a: 0,
                why: "**separate** = make different. There are two people: one has talent, the other achieves something." },
              { q: "What is King's main idea?",
                opts: ["Success comes from hard work, not just from talent.", "You need talent before you can work hard.", "Hard work is useless without talent."], a: 0,
                why: "The last words give it: **a lot of hard work** is what makes the difference." }
            ] },
            ESSAY_JURY
          ]
        },
        {
          stage: "practice", title: "Build the essay", minutes: 13, image: img("m32-sometimes-i-think"),
          blocks: [
            ESSAY_RECIPE,
            ESSAY_PHRASES,
            { type: "brief", title: "Sort into paragraphs", items: [
              "These sentences are from one essay on King's quotation. They are mixed up.",
              "Drag each sentence into the right box: Introduction, Your opinion, Examples or Conclusion.",
              "On a phone or tablet: tap the sentence, then tap the box. A wrong box shakes."
            ] },
            { type: "sort", long: true,
              buckets: [{ id: "intro", label: "1️⃣ Introduction" }, { id: "op", label: "2️⃣ Your opinion" }, { id: "ex", label: "3️⃣ Examples" }, { id: "con", label: "4️⃣ Conclusion" }],
              cards: [
                { t: "To sum up, talent may open the door, but hard work takes you through it.", b: "con" },
                { t: "Stephen King says that talent is as common as salt.", b: "intro" },
                { t: "Firstly, talent without practice soon fades.", b: "op" },
                { t: "A good example of this is Mikhail Lomonosov, a fisherman's son who left home on foot to study in Moscow.", b: "ex" },
                { t: "In other words, being gifted is only the starting point.", b: "intro" },
                { t: "Secondly, hard work teaches patience.", b: "op" },
                { t: "That is why I believe that King is right.", b: "con" },
                { t: "Goncharov's Oblomov shows the opposite: a clever man who wastes his life doing nothing.", b: "ex" },
                { t: "There are two main reasons for my opinion.", b: "op" }
              ] },
            { type: "brief", title: "Too informal!", items: [
              "In an essay, informal words are mistakes.",
              "Each sentence has one word that is too informal. Tap it and find a better word."
            ] },
            { type: "spot", then: "find a better word.", items: [
              { text: "Talent is super important, but it is not enough.", at: 2, wrong: "super", right: "very / extremely", cat: "Style" },
              { text: "A lot of guys believe that talent is a gift.", at: 3, wrong: "guys", right: "people", cat: "Style" },
              { text: "King's idea is kinda true.", at: 3, wrong: "kinda", right: "partly / largely", cat: "Style" },
              { text: "Lomonosov was a cool scientist.", at: 3, wrong: "cool", right: "brilliant / great", cat: "Style" },
              { text: "You gotta work hard to succeed.", at: 1, wrong: "gotta", right: "have to / must", cat: "Style" }
            ] },
            { type: "brief", title: "Choose the example", items: [
              "An example must be real and must prove your point.",
              "Read the sentence from an essay. Tap the example that proves it."
            ] },
            { type: "quiz", items: [
              { q: "You write: \"Success comes from hard work.\" Which example from history proves it?",
                opts: ["Dmitri Mendeleev spent years collecting facts about the elements before he created the periodic table.", "Alexander Pushkin died after a duel in 1837.", "My friend practises the guitar every day."], a: 0,
                why: "**Mendeleev** is real history, and it proves the point. The duel is true, but it proves nothing here. A friend is not literature or history." },
              { q: "You write: \"Talent without work is wasted.\" Which example from literature proves it?",
                opts: ["In Goncharov's novel, the clever and kind Oblomov does nothing and wastes his life, while his hard-working friend Stolz succeeds.", "Leo Tolstoy wrote War and Peace.", "My favourite book is about a clever boy."], a: 0,
                why: "**Oblomov** is a real novel, and it proves the point. The fact about Tolstoy proves nothing here. A book with no title and no writer is not a real example." }
            ] }
          ]
        },
        {
          stage: "production", title: "Write the essay", minutes: 20, image: img("m22-wont-give-up"),
          blocks: [
            ESSAY_KING,
            { type: "brief", title: "Write the whole essay", items: [
              "Write the whole essay: **200–250 words**, 4 paragraphs.",
              "When you finish, press **📤 Send to my teacher**."
            ] },
            { type: "writebox", min: 200, max: 250, label: "essay", send: "Essay (2021/22)" }
          ]
        },
        {
          stage: "feedback", title: "Check the essay", minutes: 10, image: img("m20-slay-queen"),
          blocks: [
            { type: "brief", title: "Check the essay", items: [
              "Go through the checklist.",
              "Find what is missing and fix it."
            ] },
            ESSAY_CHECK
          ]
        },
        // Учитель 06.11: «каверзную тему, которая часто используется… в домашку, просто с правилом, чтобы напомнить».
        // Тема посчитана по официальному Task 2 за 5 лет: 9 пунктов из 50, каждый год; больше любой другой темы.
        // Пункты — дословно из официальных заданий 2021/22, 2023/24, 2024/25, 2025/26 (2022/23 не взят).
        {
          stage: "homework", home: true, title: "Homework: Grammar", minutes: 10, image: img("m23-can-do-you"),
          blocks: [
            { type: "vtable", title: "🧩 Wish, would rather, it is time, if", cols: [
              { h: "wish", lines: [
                "**wish + Past Simple**: now. I wish I knew her name.",
                "**wish + had + V3**: the past, I am sorry about it. I wish I had read the book.",
                "**wish + would**: I am annoyed and I want a change. I wish the music would end."
              ] },
              { h: "would rather", lines: [
                "**would rather (not) + verb**, no **to**. I would rather walk.",
                "**would rather have + V3**: the past. I would rather have stayed at home.",
                "**would rather + another person + Past Simple**: now. I would rather you came early."
              ] },
              { h: "It is time", lines: [
                "**It is time / about time / high time + somebody + Past Simple**: now. It is high time you started."
              ] },
              { h: "if", lines: [
                "**If + Past Simple, would + verb**: not true now. If I had a car, I would drive.",
                "**If + had + V3, would have + V3**: it did not happen. If I had known, I would have come.",
                "**But for + noun** = if there were not (now), if there had not been (past). But for the rain, we would have won."
              ] }
            ] },
            { type: "brief", title: "Complete the second sentence", items: [
              "Use the word given. Do not change it.",
              "Use exactly the number of words in brackets, **including the word given**. Do not use short forms.",
              "Type your answer and press **✓ Check**."
            ] },
            { type: "transform", items: [
              { q: "I’m afraid it will never stop snowing, it’s infuriating.", word: "wish", before: "I", after: "snowing.", n: 4, accept: ["wish it would stop"],
                note: "**wish + would**: I am annoyed and I want a change." },
              { q: "Moira says she prefers to do her homework on her own.", word: "rather", before: "Moira says that", after: "do her homework with someone else.", n: 4, accept: ["she would rather not"],
                note: "**would rather not + verb**, no **to**." },
              { q: "I wish Jack had bought tickets for Venice but we went to Paris instead.", word: "rather", before: "Jack bought us tickets to Paris but I", after: "to Venice.", n: 4, accept: ["would rather have gone"],
                note: "**would rather have + V3**: it is about the past, and it did not happen." },
              { q: "I do not think she wants us to eat in her car.", word: "rather", before: "I think she", after: "eat in her car.", n: 5, accept: ["would rather we did not", "would rather not let us"],
                note: "**would rather + another person + Past Simple**: the form is past, but the time is now." },
              { q: "Albert’s wife says he has to start being interested in his children’s lives.", word: "about", before: "Albert’s wife says it is", after: "an interest in his children’s lives.", n: 5,
                accept: ["about time that he took", "about time that he had", "about time that he showed", "about time that he expressed", "about time he started taking", "about time he started having", "about time her husband took"],
                note: "**It is about time + somebody + Past Simple**: the form is past, but the time is now." },
              { q: "We didn’t stay long at the party because it was very noisy.", word: "so", before: "If there", after: "noise, we might have stayed longer at the party.", n: 5, accept: ["had not been so much"],
                note: "**If + had + V3**: an unreal past. In fact, there was a lot of noise. **Noise** cannot be counted: so **much** noise." },
              { q: "There was a strong wind which caused the fire to spread quickly.", word: "so", before: "The fire", after: "quickly but for a strong wind.", n: 5, accept: ["would not have spread so"],
                note: "**But for** a strong wind = if there had not been a strong wind. The result in the past: **would not have + V3**." }
            ] }
          ]
        },
        // Учитель 06.11: «задания, которые готовят к таким заданиям», «как репетитор», «она в 10 классе». Подводки к каждому заданию Use of
        // English на официальной работе 10–11 классов 2021/22, которой ещё не было в приложении: пункты и ключи дословно, пояснения наши.
        // Task 4 2021/22 перенесён сюда с урока: урок — про одно эссе. 2025/26 Варя решала 12.10; 2024/25 и 2023/24 остаются на следующие домашки.
        {
          stage: "homework", home: true, title: "Homework: Use of English", minutes: 45, image: img("m30-head-swells"),
          blocks: [
            { type: "brief", title: "Extra words", items: [
              "In each line, one word should not be there.",
              "Tap it and read why."
            ] },
            { type: "spot", items: [
              { text: "The joke in the cartoon intentionally mixed all up a safe, childlike, rural world (the characters from Milne’s books and the footbridge) and the supposedly dangerous world of urban youth (their hoods and the suggestion to hang about).", at: 7, wrong: "all", right: "", cat: "Extra word", why: "**mix up** is a phrasal verb. Its long object comes after **up**, and **all** has no job here." },
              { text: "A yob is a far rude, noisy and sometimes aggressive and violent boy or young man.", at: 4, wrong: "far", right: "", cat: "Extra word", why: "**far** goes with a comparative: far ruder. Here we need only: a rude boy." },
              { text: "Apparently, the public was being intimidated by them.", at: 4, wrong: "being", right: "", cat: "Extra word", why: "This is how people felt at that time: **was intimidated**. The continuous form is not needed." },
              { text: "With the help of this neologism underwolves (that is, a word which the writer has invented and you cannot find in a dictionary) the author intends to depict an image of poor and untrustworthy people and also dangerous such like wolves.", at: 38, wrong: "such", right: "", cat: "Extra word", why: "**dangerous like wolves** is enough. **such like** is wrong here." },
              { text: "Even the Prime Minister indicated so mild approval for the Bluewater ban.", at: 5, wrong: "so", right: "", cat: "Extra word", why: "**so** does not go before an adjective + uncountable noun. **so much noise** is different: **much** is a quantity word. Here we need only: mild approval." },
              { text: "It was at this time that the term ASBO (Anti-Social Behaviour Order, which legally bans a person out from certain areas) became part of the everyday British lexicon.", at: 17, wrong: "out", right: "", cat: "Extra word", why: "The pattern is **ban somebody from a place**." },
              { text: "The government was accused of making up scapegoats of the boys in the hoods.", at: 6, wrong: "up", right: "", cat: "Extra word", why: "The pattern is **make scapegoats of somebody**. **Make up** means invent." },
              { text: "Naturally, the author intended to make pun on the meaning of hoodie.", at: 5, wrong: "make", right: "", cat: "Extra word", why: "Here **pun** is a verb: **to pun on** a word." }
            ] },
            { type: "list", title: "🔎 What is usually extra", items: [
              "**Small words:** so, such, far, all, hardly. Is the sentence correct without the word?",
              "**Articles:** a, the. Look for uncountable nouns and names.",
              "**Verb words:** does, is, been, being, having, will. Check the verb form.",
              "**Particles and prepositions:** up, out, of. Check the phrasal verb or the pattern.",
              "**In the real task some lines are correct:** if no word makes a line wrong, type V."
            ] },
            { type: "brief", title: "Key word transformations", items: [
              "First think: which pattern does the key word need?",
              "Type the missing words. Do not change the key word. Use exactly the number of words in brackets.",
              "Press **✓ Check** and read the note."
            ] },
            { type: "transform", items: [
              { q: "I have just noticed that the car has almost run out of petrol.", word: "hardly", before: "I have just noticed that", after: "left in the car.", n: 5, accept: ["there is hardly any petrol"],
                note: "**hardly any** + noun = almost no." },
              { q: "Sally once worked for a charity organization on a voluntary basis.", word: "as", before: "Sally used", after: "with a charity organization.", n: 5, accept: ["to work as a volunteer"],
                note: "**used to** + verb = in the past, not now. **work as** + a job." },
              { q: "Rachel was about to leave the office when her boss asked her to type up a letter.", word: "point", before: "Rachel was", after: "the office when her boss asked her to type up a letter.", n: 5, accept: ["on the point of leaving"],
                note: "**be on the point of + -ing** = be about to do it." },
              { q: "Kevin has decided to eat less mayonnaise this month.", word: "down", before: "Kevin has decided to", after: "of mayonnaise he eats this month.", n: 5, accept: ["cut down on the amount", "cut down on the quantity"],
                note: "**cut down on** = use less of something." },
              { q: "I did not know that the cars were so expensive in this country.", word: "idea", before: "I", after: "so much in this country.", n: 5, accept: ["had no idea cars cost"],
                note: "**have no idea** = not know. **had** puts it in the past, so the next verb is past too: cars **cost** (cost – cost – cost)." },
              { q: "Most of the problems arose because there was no leadership on the committee.", word: "caused", before: "It was the", after: "most of the problems on the committee.", n: 5, accept: ["lack of leadership that caused", "absence of leadership that caused"],
                note: "**It was the … that caused …** puts the main idea first. No leadership = a **lack of leadership**." },
              { q: "A short meeting of the cast will take place after today’s rehearsal.", word: "by", before: "Today’s rehearsal", after: "a short meeting of the cast.", n: 4, accept: ["will be followed by"],
                note: "If B comes after A, then A **will be followed by** B." },
              { q: "It is thought that one in every five people cannot control how much they spend.", word: "unable", before: "One in every five people is thought", after: "their spending under control.", n: 5, accept: ["to be unable to keep"],
                note: "**is thought to be** + adjective. **keep something under control**." },
              { q: "I’ll be happy to show you round the sights of my city when you come to visit me.", word: "take", before: "It will be a", after: "a sightseeing tour of my city when you come to visit me.", n: 5, accept: ["pleasure to take you on", "pleasure to take you for"],
                note: "**It will be a pleasure to** + verb. **take somebody on a tour**." }
            ] },
            { type: "brief", title: "Word formation: part of speech first", items: [
              "Before you form a word, decide what the gap needs.",
              "Drag each gap into the right box: noun, adjective or adverb.",
              "On a phone or tablet: tap the gap, then tap the box."
            ] },
            { type: "sort", long: true,
              buckets: [{ id: "noun", label: "📦 Noun" }, { id: "adj", label: "🎨 Adjective" }, { id: "adv", label: "⚡ Adverb" }],
              cards: [
                { t: "In ___, British lawyers do not often advertise their services directly.", b: "noun" },
                { t: "a reason for this ___ public relations campaign", b: "adj" },
                { t: "___, the former are the ones who deal with the public", b: "adv" },
                { t: "including the ___ up of documents", b: "noun" },
                { t: "the solicitor hires the ___ of the other kind of lawyer", b: "noun" },
                { t: "the roles of the two kinds of lawyer were kept ___ apart", b: "adv" },
                { t: "it became ___ both for members of the public…", b: "adj" },
                { t: "the two kinds of lawyer came into ___ with each other", b: "noun" },
                { t: "they are mostly ___ and have a prestige similar to that of doctors", b: "adj" },
                { t: "Because of this popular ___, the country’s solicitors felt…", b: "noun" }
              ] },
            { type: "vtable", title: "🧩 Typical word endings", cols: [
              { h: "📦 Noun", lines: ["-tion, -ment, -ness, -ity, -ance, -ence", "A person: -er, -or, -ist, -ant, -ee", "Also -ing, -al: a building, arrival"] },
              { h: "🎨 Adjective", lines: ["-ous, -ive, -ful, -less, -able, -ible, -al, -ed, -ing"] },
              { h: "⚡ Adverb", lines: ["-ly"] },
              { h: "🚫 Negative meaning", lines: ["un-, in-, im-, dis-, mis-, under-"] }
            ] },
            { type: "brief", title: "Word formation: now type the word", items: [
              "Use the word in capitals to form the word the gap needs.",
              "Type one word. Spelling counts.",
              "Press **✓ Check** and read the note."
            ] },
            { type: "transform", items: [
              { word: "ADD", before: "In", after: ", British lawyers do not often advertise their services directly.", n: 1, accept: ["addition"],
                note: "After a preposition we need a noun. **In addition** = also." },
              { word: "PRECEDENT", before: "But there was a reason for this", after: "public relations campaign.", n: 1, accept: ["unprecedented", "unprecedential"],
                note: "An adjective before the noun **campaign**. **unprecedented** = never seen before." },
              { word: "TYPICAL", before: "", after: ", the former are the ones who deal with the public; anybody who needs a lawyer goes to see a solicitor.", n: 1, accept: ["typically"],
                note: "At the start, before a comma: an adverb." },
              { word: "DRAW", before: "They handle most legal matters for their clients, including the", after: "up of documents (such as wills, divorce papers and contracts), communicating with other parties and presenting their client’s case in a magistrates’ court.", n: 1, accept: ["drawing"],
                note: "After **the** we need a noun: draw up a document → the **drawing** up." },
              { word: "SERVE", before: "But if a case is to be heard in a higher court, the solicitor hires the", after: "of the other kind of lawyer - a barrister.", n: 1, accept: ["services", "service"],
                note: "After **the** we need a noun: **services**." },
              { word: "RIGID", before: "Until recently, the roles of the two kinds of lawyer were kept", after: "apart.", n: 1, accept: ["rigidly"],
                note: "An adverb before **apart**: strictly." },
              { word: "PERMIT", before: "But in the years around the turn of the century, it became", after: "both for members of the public to approach barristers directly, without going through a solicitor first, and also for solicitors to present cases in some higher courts, without hiring a barrister.", n: 1, accept: ["permissible", "permissive"],
                note: "After **became** we need an adjective: allowed." },
              { word: "COMPETE", before: "As a result, the two kinds of lawyer came into", after: "with each other for the first time.", n: 1, accept: ["competition"],
                note: "**come into competition with** somebody." },
              { q: "Now, in the popular image, barristers are in some sense ‘senior’ to solicitors.", word: "EMPLOY", before: "Unlike solicitors, they are mostly", after: "and have a prestige similar to that of doctors.", n: 1, accept: ["self-employed"],
                note: "**self-employed** = working for yourself, not for a company." },
              { word: "PERCEIVE", before: "Because of this popular", after: ", the country’s solicitors felt they needed to defend their territory by boosting their image.", n: 1, accept: ["perception"],
                note: "After the adjective **popular** we need a noun: what people think." }
            ] },
            { type: "brief", title: "Culture: match", items: [
              "Read the phenomena A–N.",
              "Choose a letter for each item 1–10. Four phenomena are extra.",
              "Press **✓ Check**."
            ] },
            { type: "matchsheet", task: "p-u4-2122", source: "Real task · Moscow municipal stage 2021/22 · Use of English · Task 4" }
          ]
        },
        {
          stage: "homework", home: true, title: "Homework: Listening", minutes: 20, image: img("m18-all-good"),
          blocks: [
            LISTENING_HOWTO,
            { type: "brief", title: "Listening", items: [
              "Read the tips above.",
              "Open the first part and press ▶. Do not stop the recording: it has its own pauses.",
              "Press **✓ Check answers**, then read **💡 Show how to solve** under the wrong ones."
            ] },
            { type: "task", task: "p-l1-2425", label: "2024/25 · True or False: Amelia Earhart" },
            { type: "task", task: "p-l2-2425", label: "2024/25 · A, B or C: Chloe and the manager" }
          ]
        }
      ]
    },
    // Урок 9.11 (учитель 06.11): не решаем работу, а идём по ней подряд: по одному пункту из каждого задания самой свежей работы 10–11 классов,
    // чтобы понимать порядок и что внутри. Текст берётся из самих заданий (блок sample), ключи и «почему» — в шпаргалке учителя. Writing: только задание,
    // разбираем устно; в 2025/26 это рассказ.
    {
      id: "l5", date: "2026-11-09", title: "Mock exam: review", emoji: "📝", cover: img("m05-you-can"),
      aims: [
        "🎯 Goal: see the whole exam in order and know what is inside every task.",
        "One item from every task: we look at it together."
      ],
      steps: [
        {
          stage: "presentation", title: "Listening", minutes: 8, image: img("m25-in-english-please"),
          blocks: [
            { type: "sample", title: "True or False", task: "m-l1", item: 5, source: "Real task · Moscow municipal stage 2025/26 · Listening" },
            { type: "sample", title: "A, B or C", task: "m-l2", item: 4, source: "Real task · Moscow municipal stage 2025/26 · Listening" }
          ]
        },
        {
          stage: "presentation", title: "Reading", minutes: 10, image: img("m27-help-me"),
          blocks: [
            { type: "sample", title: "Choose the best answer", task: "m-r1", item: 1, para: 0, source: "Real task · Moscow municipal stage 2025/26 · Reading" },
            { type: "sample", title: "Missing sentences", task: "m-r2", item: 1, para: 0, source: "Real task · Moscow municipal stage 2025/26 · Reading" }
          ]
        },
        {
          stage: "presentation", title: "Use of English", minutes: 20, image: img("m28-bite-laptop"),
          blocks: [
            { type: "sample", title: "Extra word", task: "m-u1", item: 4, source: "Real task · Moscow municipal stage 2025/26 · Use of English" },
            { type: "sample", title: "Key word transformations", task: "m-u2", item: 4, source: "Real task · Moscow municipal stage 2025/26 · Use of English" },
            { type: "sample", title: "Word formation", task: "m-u3", item: 4, source: "Real task · Moscow municipal stage 2025/26 · Use of English" },
            { type: "sample", title: "Culture: match", task: "m-u4", item: 1, source: "Real task · Moscow municipal stage 2025/26 · Use of English" }
          ]
        },
        {
          stage: "presentation", title: "Writing", minutes: 12, image: img("m26-rock-dog"),
          blocks: [
            { type: "brief", title: "The task", items: [
              "Read the task.",
              "Think: what will you write in each part?"
            ] },
            { type: "wpaper", task: "m-w1", source: "Real task · Moscow municipal stage 2025/26 · Writing" }
          ]
        },
        // Учитель 06.11: пробник дома до урока 16 ноября, на уроке разбираем ошибки. Работа 2023/24: самая свежая из тех, что Варя почти не видела.
        {
          stage: "homework", home: true, title: "Homework: Mock exam", minutes: 180, image: img("m31-go-for-success"),
          blocks: [
            { type: "brief", title: "Mock exam", items: [
              "Do it before our lesson on **16 November**.",
              "Do it all on one device. The timer starts as soon as you press the button.",
              "Do all 4 parts. It takes 3 hours.",
              "At the very end, press **✓ Check answers** on every task. Do not press **Try again**.",
              "Send a screenshot of **Results** and your essay to your teacher."
            ] },
            { type: "links", title: "📝 Mock exam · Municipal 2023/24", items: [
              { href: "#/full/p-l1-2324", label: "▶ Start the mock exam", note: "Listening · Reading · Use of English · Writing" }
            ] }
          ]
        }
      ]
    },
    { id: "l6", date: "2026-11-16", title: "Mock exam: your mistakes", emoji: "🏔️", cover: img("m31-go-for-success"),
      aims: ["We go through your mistakes in the mock exam."] }
  ];
})();
