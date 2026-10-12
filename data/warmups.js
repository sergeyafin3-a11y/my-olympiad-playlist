// Разминки (warm-ups) на 5–10 минут: перед уроком или перед заданием олимпиады.
// talk — разговор на тему из настоящих текстов вариантов (муниципальный, региональный, финал);
//   target — к какой части олимпиады он ведёт (для фильтра):
//   на муниципальном этапе нет устной части, поэтому разговор и есть тренировка Speaking,
//   а заодно ученица заранее слышит слова будущего текста.
// drill — пять-восемь коротких заданий на навык конкретного задания олимпиады.
//   Предложения придуманы нами, а не взяты из олимпиадных заданий: задания остаются нерешёнными.
//   Исключение — «Culture flash»: факты из официальных Task 4 прошлых лет, их и надо знать.
(function () {
  window.WARMUPS = [
    // ---------- разговор ----------
    {
      id: "t-speech", kind: "talk", section: "talk", target: "uoe", icon: "🎙️", minutes: 10,
      title: "Speaking in public",
      before: "Municipal 2025/26 · Use of English Task 1 (The King's Speech)",
      goal: "Talk about fear and confidence. The text about the film \"The King's Speech\" uses these words.",
      steps: ["The teacher asks the questions one by one. Answer in 2–3 sentences.", "Try to use at least three words from the list.", "At the end, say one thing you learnt about your partner."],
      questions: [
        "Do you get nervous when you speak in front of your class? What happens to you?",
        "What helps you to feel calm before an important speech or exam?",
        "Who is the best speaker you know? Why do people listen to them?",
        "Would you like to be famous? What would be good and bad about it?",
        "Have you seen a film about a real person? Tell us about it.",
        "Is it easier to speak to a big crowd or to one important person? Why?"
      ],
      words: ["confidence", "to stammer", "to overcome a fear", "embarrassment", "a speech", "an audience", "to broadcast", "a monarch"]
    },
    {
      id: "t-jobs", kind: "talk", section: "talk", target: "listening", icon: "✈️", minutes: 10,
      title: "Dream jobs",
      before: "Municipal 2025/26 · Listening Task 1 (a pilot)",
      goal: "Talk about jobs and careers before you listen to a pilot's story.",
      steps: ["Answer each question in 2–3 sentences.", "Give a reason for every answer: because…, that's why…", "Use words from the list."],
      questions: [
        "What did you want to be when you were a child? Do you still want it?",
        "Which job do you think is the most exciting? Which is the most difficult?",
        "Would you like a job where you travel a lot? Why or why not?",
        "What is more important in a job: money, interesting work or free time?",
        "Can a person change careers at 30 or 40? Do you know someone who did it?",
        "What skills does a pilot need? And a teacher?"
      ],
      words: ["a career", "to train as", "a qualification", "experience", "to be promoted", "a captain", "to dream of", "rewarding"]
    },
    {
      id: "t-roots", kind: "talk", section: "talk", target: "reading", icon: "🌳", minutes: 10,
      title: "Family roots",
      before: "Municipal 2025/26 · Reading Task 1 (ancestral roots)",
      goal: "Talk about family history and identity before reading a text about ancestors.",
      steps: ["Answer the questions about your family — you can keep some things private.", "Use the past tenses: was, used to, had…", "Use words from the list."],
      questions: [
        "How much do you know about your grandparents' lives?",
        "Is there a family story that people tell again and again?",
        "Would you like to find out more about your ancestors? How could you do it?",
        "What makes you feel that you belong to a place or a group?",
        "Which family traditions would you like to keep when you are an adult?"
      ],
      words: ["ancestors", "roots", "identity", "heritage", "to trace", "a descendant", "to belong", "a tradition"]
    },
    {
      id: "t-sleep", kind: "talk", section: "talk", target: "reading", icon: "⏰", minutes: 10,
      title: "Mornings and sleep",
      before: "Municipal 2025/26 · Reading Task 2 (alarm clocks)",
      goal: "Talk about sleep habits before reading a text about alarm clocks.",
      steps: ["Answer in 2–3 sentences.", "Compare: on school days… but at the weekend…", "Use words from the list."],
      questions: [
        "Are you a morning person or a night person?",
        "How do you wake up: an alarm clock, a phone, your parents?",
        "What do you do in the first ten minutes after you wake up?",
        "How many hours do you sleep on school days? Is it enough?",
        "Do you use your phone in bed? Is it a problem?"
      ],
      words: ["to wake up", "to oversleep", "to snooze", "a routine", "rhythm", "to be exhausted", "a deep sleep", "to go off (about an alarm)"]
    },
    {
      id: "t-music", kind: "talk", section: "talk", target: "uoe", icon: "🎻", minutes: 10,
      title: "Music and the brain",
      before: "Municipal 2025/26 · Use of English Task 3 (Einstein and the violin)",
      goal: "Talk about music and learning before a text about Einstein, who played the violin.",
      steps: ["Answer in 2–3 sentences.", "Give examples from your life.", "Use words from the list."],
      questions: [
        "Do you play a musical instrument? Would you like to?",
        "Does music help you to study, or does it stop you from thinking?",
        "Should all children learn to play an instrument at school? Why?",
        "Do you know any scientists or writers who had a hobby in art or music?",
        "What kind of music do you listen to when you feel sad or tired?"
      ],
      words: ["an instrument", "a violinist", "to focus", "a string quartet", "creative", "a scientist", "to practise", "a daydream"]
    },
    {
      id: "t-festivals", kind: "talk", section: "talk", target: "speaking", icon: "🎉", minutes: 10,
      title: "Festivals and traditions",
      before: "Final 2025/26 · Speaking (Mardi Gras and Maslenitsa)",
      goal: "Describe a festival like a guide — the same skill as in the final's Speaking.",
      steps: ["Choose a festival you know well.", "Speak for 1–2 minutes: history, what people do, food, music, why it matters.", "Then answer two questions from the teacher."],
      questions: [
        "What is your favourite holiday or festival? Why?",
        "How did people celebrate it in the past, and how do they celebrate it now?",
        "Which festival from another country would you like to see?",
        "Why do people need festivals?",
        "Should old traditions change, or should we keep them as they are?"
      ],
      words: ["to celebrate", "a parade", "a costume", "a custom", "to originate", "a symbol", "cultural heritage", "a crowd"]
    },
    {
      id: "t-writers", kind: "talk", section: "talk", target: "speaking", icon: "📚", minutes: 10,
      title: "Great Russian writers",
      before: "Regional 2025/26 · Speaking (Tolstoy, Pushkin, Dostoevsky, Chekhov)",
      goal: "Talk about writers and books in English — the topic of the regional Speaking.",
      steps: ["Choose one writer you read at school.", "Say: when he lived, his main works, a film or play based on them, why he is important.", "Then say what his books mean to you."],
      questions: [
        "Which Russian writer do you like most? Why?",
        "Which book from school did you not like at first, but liked later?",
        "Have you seen a film or a play based on a Russian classic? Was it as good as the book?",
        "Why do people in other countries read Russian literature?",
        "How could your school celebrate a famous writer?"
      ],
      words: ["a novel", "a short story", "a poet", "a screen adaptation", "a character", "a masterpiece", "to be published", "a contribution"]
    },
    {
      id: "t-startups", kind: "talk", section: "talk", target: "writing", icon: "🚀", minutes: 10,
      title: "Startups and the future",
      before: "Regional 2025/26 · Writing (a review of a startup festival)",
      goal: "Talk about new ideas and inventions before writing a review.",
      steps: ["Answer in 2–3 sentences.", "Say what you think will happen: I think… will…, In ten years…", "Use words from the list."],
      questions: [
        "Which invention of the last ten years is the most useful?",
        "If you started a company, what would it do?",
        "What problems of the world could young people solve?",
        "Why do many new companies fail?",
        "Would you like to visit a festival of startups? What would you ask the inventors?"
      ],
      words: ["a startup", "an investor", "innovative", "futuristic", "a challenge", "to launch", "an impact", "unique"]
    },
    {
      id: "t-silence", kind: "talk", section: "talk", target: "reading", icon: "🤫", minutes: 10,
      title: "Talking and listening",
      before: "Regional 2025/26 · Reading Task 4 (The Sound of Silence)",
      goal: "Talk about conversations: who talks, who listens, and why silence can be useful.",
      steps: ["Answer in 2–3 sentences.", "Agree or disagree with your partner: I see your point, but…", "Use words from the list."],
      questions: [
        "Are you a good listener? How do you know?",
        "Do you know people who talk too much in meetings or in class?",
        "Is silence in a conversation uncomfortable for you?",
        "Do people interrupt each other more online or face to face?",
        "What makes a good conversation?"
      ],
      words: ["to interrupt", "silence", "a pause", "to dominate", "to pay attention", "a listener", "to express an opinion", "awkward"]
    },
    {
      id: "t-business", kind: "talk", section: "talk", target: "listening", icon: "🌍", minutes: 10,
      title: "Companies and the planet",
      before: "Regional 2025/26 · Listening Task 1 (corporate responsibility)",
      goal: "Talk about business and the environment before listening to a business journalist.",
      steps: ["Answer in 2–3 sentences.", "Give an example for each answer.", "Use words from the list."],
      questions: [
        "Do you choose products from companies that care about nature?",
        "Who should pay when a company damages the environment?",
        "Can big companies make the world better? How?",
        "What environmental problem worries you most?",
        "What can a school do to be more eco-friendly?"
      ],
      words: ["responsibility", "an oil spill", "pollution", "compensation", "sustainable", "to damage", "the environment", "a risk"]
    },
    {
      id: "t-abroad", kind: "talk", section: "talk", target: "listening", icon: "🧳", minutes: 10,
      title: "Living and studying abroad",
      before: "Regional 2025/26 · Listening Task 2 and Task 3",
      goal: "Talk about moving to another country before a conversation and an interview on this topic.",
      steps: ["Answer in 2–3 sentences.", "Use the second conditional: If I lived in…, I would…", "Use words from the list."],
      questions: [
        "Would you like to study in another country? Which one and why?",
        "What would you miss most if you moved abroad?",
        "What is difficult for foreign students in Russia?",
        "Is it easier to move abroad alone or with your family?",
        "What should a person learn before they move to a new country?"
      ],
      words: ["abroad", "to settle", "to adapt", "homesick", "a culture shock", "a scholarship", "the local language", "an exchange student"]
    },
    {
      id: "t-ads", kind: "talk", section: "talk", target: "uoe", icon: "📢", minutes: 10,
      title: "Advertising everywhere",
      before: "Municipal 2023/24 · Use of English Task 1 (advertising)",
      goal: "Talk about adverts and media — a common olympiad topic.",
      steps: ["Answer in 2–3 sentences.", "Use: In my opinion…, On the one hand… on the other hand…", "Use words from the list."],
      questions: [
        "Which advert do you remember best? Why?",
        "Do adverts make you buy things?",
        "Is it OK when bloggers advertise products?",
        "Should there be adverts in schools or in children's programmes?",
        "Would you like to live in a place without any adverts?"
      ],
      words: ["an advert", "a brand", "a sponsor", "to persuade", "a consumer", "a logo", "a commercial", "to target"]
    },
    {
      id: "t-smalltalk", kind: "talk", section: "talk", target: "speaking", icon: "☕", minutes: 5,
      title: "Small talk",
      before: "Municipal 2024/25 · Use of English Task 1 (conversation skills)",
      goal: "Practise starting and keeping a conversation — a 5-minute start of any lesson.",
      steps: ["The teacher starts with a simple question.", "Answer and ask a question back every time: And you?, What about you?", "Keep the conversation going for 5 minutes."],
      questions: [
        "How was your week?",
        "What was the best moment of your weekend?",
        "What are you looking forward to?",
        "What did you watch or read recently?",
        "What is the weather like today, and how does it change your mood?"
      ],
      words: ["by the way", "actually", "to look forward to", "it depends", "I see what you mean", "really?", "how come?", "that sounds…"]
    },

    // ---------- навык ----------
    {
      id: "d-extra", kind: "drill", section: "uoe", icon: "🔍", minutes: 5,
      title: "Spot the extra word",
      before: "Use of English · Task 1 (extra word) — Municipal",
      goal: "Find the one word that should not be there — fast.",
      steps: ["Read the sentence aloud.", "Find the extra word: often a preposition, an auxiliary verb (be, have, do), an article or a second -ing form. Some sentences are correct.", "Check with the answer."],
      items: [
        { q: "She is used to getting up early, so she doesn't mind it at all.", a: "Correct (V)." },
        { q: "We discussed about the problem for an hour.", a: "about — we discuss something, without a preposition." },
        { q: "They have been finished the project.", a: "been — they have finished (Present Perfect, active)." },
        { q: "If I will see her, I'll give her the book.", a: "will — after if we use the present: If I see her." },
        { q: "It was such a good film that we watched it twice.", a: "Correct (V)." },
        { q: "The teacher made us to rewrite the essay.", a: "to — make somebody do something." },
        { q: "This book is more better than the film.", a: "more — better is already the comparative (good → better)." },
        { q: "Despite of the rain, we went for a walk.", a: "of — despite the rain (or: in spite of the rain)." }
      ]
    },
    {
      id: "d-paraphrase", kind: "drill", section: "listening", icon: "🎧", minutes: 5,
      title: "Same or different?",
      before: "Listening Task 1 and Reading — true / false",
      goal: "Train the main skill of true/false tasks: the same idea in other words.",
      steps: ["The teacher reads sentence A, the student reads sentence B.", "Does sentence A tell us that sentence B is true? Yes (True) or no (False)? Explain which words show it."],
      items: [
        { q: "A: He has never been to London. — B: He went to London once.", a: "False: never ≠ once." },
        { q: "A: Only 18 of the 20 students passed the test. — B: Not everybody passed the test.", a: "True: two students did not pass." },
        { q: "A: The museum opened in the 19th century. — B: The museum is more than a hundred years old.", a: "True: the 19th century ended more than 100 years ago." },
        { q: "A: She left the job because she wanted to travel. — B: She was fired from her job.", a: "False: she left because she wanted to; nobody fired her." },
        { q: "A: The tickets were cheaper than we expected. — B: We paid less than we thought.", a: "True: the same idea in other words." },
        { q: "A: The project was successful at first, but later it failed. — B: The project was never successful.", a: "False: it was successful at first." }
      ]
    },
    {
      id: "d-wordform", kind: "drill", section: "uoe", icon: "🧱", minutes: 7,
      title: "Word families",
      before: "Use of English · Task 3 (word formation) — Municipal",
      goal: "Choose the right part of speech and add the right prefix or suffix.",
      steps: ["Look at the words around the gap: which part of speech do you need?", "Check the meaning: do you need a negative word (un-, in-, dis-, im-)? A plural?", "Say the word and spell it."],
      items: [
        { q: "She speaks with great ___ about her work. (ENTHUSIASTIC)", a: "enthusiasm — after \"great\" we need a noun." },
        { q: "The results were completely ___ — nobody expected them. (PREDICT)", a: "unpredictable — adjective + negative prefix." },
        { q: "Nobody made him help — he did it ___. (VOLUNTARY)", a: "voluntarily — an adverb (how he did it): by his own choice." },
        { q: "The town is famous for its beautiful ___. (ARCHITECT)", a: "architecture — a noun: the style of buildings." },
        { q: "The new rules will improve the ___ of children on the roads. (SAFE)", a: "safety — after \"the\" and before \"of\" we need a noun." },
        { q: "There are many ___ between the two stories. (SIMILAR)", a: "similarities — a noun, plural (\"many\")." },
        { q: "His behaviour was so rude that it was completely ___ for a teacher. (ACCEPT)", a: "unacceptable — an adjective; \"so rude\" shows the negative meaning." },
        { q: "We need to ___ our knowledge before the exam. (WIDE)", a: "widen — a verb (to + verb); -en makes verbs: wide → widen." }
      ]
    },
    {
      id: "d-transform", kind: "drill", section: "uoe", icon: "🔁", minutes: 7,
      title: "Key word transformations",
      before: "Use of English · Task 2 — Municipal",
      goal: "Say the same thing with the key word. Use 3–5 words, do not change the key word.",
      steps: ["Find the structure the key word needs.", "Check the tense.", "Count the words: contractions are not allowed."],
      items: [
        { q: "If you don't hurry, you'll miss the bus. — UNLESS — You'll miss the bus ___.", a: "unless you hurry" },
        { q: "The weather was so bad that we stayed at home. — SUCH — It was ___ that we stayed at home.", a: "such bad weather" },
        { q: "I'm sure she forgot about the meeting. — MUST — She ___ about the meeting.", a: "must have forgotten" },
        { q: "You should start revising for the exam now. — TIME — It's ___ revising for the exam.", a: "time you started" },
        { q: "It wasn't necessary for him to come, so he stayed at home. — NEED — He ___ come.", a: "did not need to (also: had no need to)" },
        { q: "She started learning Spanish three years ago. — BEEN — She ___ Spanish for three years.", a: "has been learning" }
      ]
    },
    {
      id: "d-glue", kind: "drill", section: "reading", icon: "🧩", minutes: 5,
      title: "Glue words",
      before: "Reading Task 2 (missing sentences) — Municipal",
      goal: "Find the \"hooks\" — words that connect a sentence with the text before it.",
      steps: ["Read the first sentence.", "Choose which second sentence fits best and say which word is the hook (this, however, also, such, they…)."],
      items: [
        { q: "\"Many teenagers sleep with their phones.\" Next: (a) However, this can harm their sleep. (b) This is why phones were invented.", a: "(a) — \"this\" = sleeping with phones; \"however\" shows a contrast." },
        { q: "\"The museum is free on Sundays.\" Next: (a) As a result, it is very crowded on that day. (b) For example, it is closed on Mondays.", a: "(a) — \"as a result\" shows a consequence of free entry." },
        { q: "\"Some people learn languages with apps.\" Next: (a) Others prefer a teacher. (b) They never learnt a language.", a: "(a) — \"some… others\" is a pair." },
        { q: "\"The town has two big problems.\" Next: (a) The first is traffic. (b) It is also very green.", a: "(a) — \"the first\" starts the list of the two problems." },
        { q: "\"She was tired after the trip.\" Next: (a) Nevertheless, she went straight to the meeting. (b) Therefore, she went straight to the meeting.", a: "(a) — \"nevertheless\" = in spite of being tired." }
      ]
    },
    {
      id: "d-culture", kind: "drill", section: "culture", icon: "🏛️", minutes: 7,
      title: "Culture flash",
      before: "Use of English · Task 4 (culture) — Municipal",
      goal: "Facts from the official Task 4 of the Moscow municipal stage in 2022/23 and 2023/24. Say the answer before you open it.",
      steps: ["The teacher reads the question.", "Answer in one sentence.", "These topics came up in past years, so they are worth knowing."],
      items: [
        { q: "What is the Smithsonian?", a: "A research institution and group of museums in the USA, founded with money left by an English scientist (James Smithson)." },
        { q: "What is the Ashmolean?", a: "A museum of the University of Oxford — the oldest public museum of art, archaeology and natural history in Britain." },
        { q: "Where is Land's End?", a: "At the far western end of Cornwall, in the south-west of England." },
        { q: "Which city is called \"the Athens of the North\"?", a: "Edinburgh, the capital of Scotland." },
        { q: "What is the Fringe?", a: "An arts festival in Edinburgh every August, for about three weeks." },
        { q: "Where do you kiss the Blarney Stone, and what does it give you?", a: "At Blarney Castle in Ireland; the legend says it gives you the gift of eloquence (speaking well)." },
        { q: "What is Gretna Green famous for?", a: "A Scottish village where English couples used to come to marry quickly." },
        { q: "What does a spin doctor do?", a: "Advises a politician or a party and makes them look good in the media." },
        { q: "What does \"to keep up with the Joneses\" mean?", a: "To buy and do the same things as the people around you, so that you look as successful as they are." },
        { q: "What is a whodunit?", a: "A detective story that is like a puzzle: who did the crime?" }
      ]
    },
    {
      id: "d-definitions", kind: "drill", section: "uoe", icon: "🔤", minutes: 5,
      title: "Definition race",
      before: "Use of English · Task 1 (crossword) — Regional",
      goal: "Say the word from its English definition — the skill of the regional crossword.",
      steps: ["The teacher reads the definition and the first letter.", "Say the word as fast as you can and spell it."],
      items: [
        { q: "a person who travels to see a place for pleasure (t…)", a: "tourist" },
        { q: "very old and from a long time ago (a…)", a: "ancient" },
        { q: "to make something smaller in size or amount (r…)", a: "reduce" },
        { q: "a thing that you have done successfully with effort (a…)", a: "achievement (also: accomplishment)" },
        { q: "not common; happening only a few times (r…)", a: "rare" },
        { q: "to say that you will certainly do something (p…)", a: "promise" }
      ]
    },
    {
      id: "d-compounds", kind: "drill", section: "uoe", icon: "🔗", minutes: 5,
      title: "Compound adjectives",
      before: "Use of English · Task 2 (compound adjectives) — Regional",
      goal: "Make an adjective from two parts that describes a person or a situation.",
      steps: ["Read the situation.", "Make the compound adjective from the two parts in brackets.", "Say it in a sentence."],
      items: [
        { q: "A person who is calm and does not get angry easily. (easy / going)", a: "easy-going" },
        { q: "A person who always behaves politely. (well / mannered)", a: "well-mannered" },
        { q: "A person who thinks only about themselves. (self / centred)", a: "self-centred" },
        { q: "An advert that you notice at once because it is bright and unusual. (eye / catching)", a: "eye-catching" },
        { q: "A person who often forgets things because they think about something else. (absent / minded)", a: "absent-minded" },
        { q: "A student who works very hard. (hard / working)", a: "hard-working" }
      ]
    },
    {
      id: "d-story", kind: "drill", section: "writing", icon: "✍️", minutes: 10,
      title: "Story starters",
      before: "Writing · a story — Municipal",
      goal: "Plan a story in 2 minutes from a first or a last sentence, like the municipal Writing.",
      steps: ["Read the sentence.", "Say the plan in 4 steps: start → problem → what happened → end. If it is the last sentence, your story must lead to it.", "Say one sentence with a past tense and one linking word (suddenly, as soon as, by the time).", "Remember: the real task also asks for a title and some things that must be in the story."],
      items: [
        { q: "First sentence: \"The phone rang in the middle of the night.\"", a: "Example plan: who called → bad or surprising news → the character's decision → a calm or happy end. Many plans are possible — check the 4 steps and the past tenses." },
        { q: "Last sentence: \"…and that is why I will never open a strange email again.\"", a: "Example plan: an email with a prize → the character clicks → problems (lost money or data) → the lesson. The story must end with the given words." },
        { q: "First sentence: \"Nobody noticed the old man with the map.\"", a: "Example plan: a street or a station → the narrator helps him → the map leads to a surprise → what the narrator learnt." },
        { q: "Last sentence: \"She finally understood why her grandmother had kept the key.\"", a: "Example plan: an old key is found → a mystery → a box or a letter → the answer about the grandmother. Use the Past Perfect for earlier events." },
        { q: "First sentence: \"It was supposed to be an ordinary school trip.\"", a: "Example plan: the trip starts → something goes wrong (lost, storm, closed museum) → the class solves it → why it became the best trip." }
      ]
    },
    {
      id: "d-quote", kind: "drill", section: "writing", icon: "💬", minutes: 10,
      title: "Quote chat",
      before: "Writing · comment on a quotation — Municipal (2022/23, 2023/24)",
      goal: "Explain a quotation and give your opinion with an example — the plan of the essay task.",
      steps: ["Say what the quotation means in your own words.", "Agree or disagree and give one reason.", "Give one example from a book, history or your life."],
      items: [
        { q: "\"A journey of a thousand miles begins with a single step.\" (Lao Tzu)", a: "Meaning: every big goal starts with one small action. Example idea: learning a language starts with the first ten words. (This quotation was the municipal Writing task in 2022/23.)" },
        { q: "\"Education is the most powerful weapon which you can use to change the world.\" (Nelson Mandela)", a: "Meaning: knowledge gives people the power to change their lives and their country. Example idea: a person from a poor family who becomes a doctor." },
        { q: "\"The only way to do great work is to love what you do.\" (Steve Jobs)", a: "Meaning: we are best at things we love. Possible disagreement: sometimes we must do great work that we do not love. Give an example." },
        { q: "\"Knowledge is power.\" (usually attributed to Francis Bacon)", a: "Meaning: people who know more can make better decisions and have more influence. Example idea: a scientist, an inventor, or a person who reads the news critically." },
        { q: "\"The best way to predict the future is to create it.\" (often attributed to Peter Drucker)", a: "Meaning: do not wait — act and build your future. Example idea: a young person who starts a startup or a school project." }
      ]
    }
  ];
})();
