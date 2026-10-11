window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "b1-perfect-vs-past", level: "B1", title: "Present Perfect vs Past Simple (for / since)",
    rule: {
      intro: "Present Perfect connects the past with now: the result or the experience is important, not the time. Past Simple is a finished action at a known time in the past (yesterday, last year, in 2020, ago).",
      blocks: [
        { h: "Forms", rows: [
          ["Present Perfect: have/has + V3", "I have finished my homework."],
          ["Past Simple: V2 / did", "I finished my homework an hour ago."],
          ["a question about time — only Past Simple", "When did you finish it?"]
        ] },
        { h: "Signal words", rows: [
          ["Present Perfect: ever, never, just, already, yet, so far", "Have you ever been to Italy?"],
          ["Past Simple: yesterday, last…, …ago, in 2019, when…", "We went to Italy last summer."]
        ] },
        { h: "for and since", rows: [
          ["for + a period (how long)", "I've known her for five years."],
          ["since + a starting point (from when)", "I've known her since 2021."],
          ["ago — only with Past Simple", "I met her five years ago."]
        ] }
      ],
      tips: [
        "In Russian you say \"I live here three years\" in the present, but in English you need Present Perfect: I have lived here for three years (not I live here for three years).",
        "If you name a time in the past, you can't use Present Perfect: I saw him yesterday (not I have seen him yesterday).",
        "From 2020 until now = since 2020 (not from 2020): She has played tennis since 2020."
      ]
    },
    items: [
      { type: "choice", q: "We ___ to Spain last summer.", opts: ["have been", "went", "have gone"], a: 1, why: "Last summer is a known time in the past, so we use Past Simple." },
      { type: "choice", q: "She has lived in Moscow ___ 2019.", opts: ["for", "since", "ago"], a: 1, why: "2019 is the starting point, so we use since." },
      { type: "choice", q: "I've known Max ___ ten years.", opts: ["since", "for", "during"], a: 1, why: "Ten years is a length of time, so we use for." },
      { type: "choice", q: "When ___ you buy that jacket?", opts: ["have", "did", "do"], a: 1, why: "A question with when asks about a moment in the past. Use only Past Simple." },
      { type: "choice", q: "Have you ever ___ sushi?", opts: ["ate", "eaten", "eat"], a: 1, why: "After have we need the third form: eat — ate — eaten." },
      { type: "text", q: "I love this film! I ___ (see) it three times so far.", accept: ["have seen", "'ve seen"], why: "So far means experience up to now: Present Perfect. See — saw — seen." },
      { type: "text", q: "Tom ___ (finish) his project two days ago.", accept: ["finished"], why: "Ago always needs Past Simple." },
      { type: "text", q: "They ___ (be) friends since primary school.", accept: ["have been", "'ve been"], why: "Since + the start of a period that still goes on: Present Perfect." },
      { type: "choice", q: "The concert started ten minutes ___.", opts: ["ago", "for", "since"], a: 0, why: "Ago means \"before now\". It comes after a period of time and goes with Past Simple." },
      { type: "text", q: "My brother ___ (not / call) me since Monday.", accept: ["hasn't called", "has not called"], why: "Since Monday is a period up to now: Present Perfect. He → has." }
    ]
  },
  {
    id: "b1-perfect-continuous", level: "B1", title: "Present Perfect Continuous",
    rule: {
      intro: "Present Perfect Continuous shows an action that started in the past and is still going on (or has just stopped, and you can see the signs). The focus is on the process and how long it lasts.",
      blocks: [
        { h: "Form", rows: [
          ["have/has been + V-ing", "I have been learning English for six years."],
          ["negative", "She hasn't been sleeping well."],
          ["question", "How long have you been waiting?"]
        ] },
        { h: "When we use it", rows: [
          ["still going on (for / since / how long)", "We've been playing since 3 o'clock."],
          ["you can see signs of a recent action", "Your eyes are red. Have you been crying?"]
        ] },
        { h: "Continuous or Simple?", rows: [
          ["the process, how long", "I've been writing songs all day."],
          ["the result, how many", "I've written three songs today."],
          ["state verbs — only Simple", "I've known him for years."]
        ] }
      ],
      tips: [
        "In Russian you say \"I wait already an hour\" in the present, but in English: I have been waiting for an hour (not I am waiting for an hour).",
        "Know, like, want, believe, own, and have (meaning \"own\") are not used in Continuous: I've had this phone for two years (not I've been having).",
        "If you say how many results, use Present Perfect Simple: She has read 50 pages (not has been reading 50 pages)."
      ]
    },
    items: [
      { type: "choice", q: "You look tired. ___ you been running?", opts: ["Have", "Has", "Did"], a: 0, why: "A question in Present Perfect Continuous: Have + you + been + V-ing." },
      { type: "text", q: "I ___ (wait) for the bus for twenty minutes!", accept: ["have been waiting", "'ve been waiting", "have waited", "'ve waited"], why: "For twenty minutes up to now: Present Perfect Continuous (best) or Simple." },
      { type: "choice", q: "She ___ three songs this morning.", opts: ["has been writing", "has written", "have written"], a: 1, why: "We say how many results (three songs), so Present Perfect Simple. She → has." },
      { type: "choice", q: "I ___ Anna since we were five.", opts: ["have been knowing", "have known", "am knowing"], a: 1, why: "Know is a state verb. It is not used in Continuous." },
      { type: "choice", q: "Your hands are covered in paint! What ___?", opts: ["you have been doing", "have you been doing", "you been doing"], a: 1, why: "In a question, have comes before the subject: What have you been doing?" },
      { type: "text", q: "Why are you out of breath? ___ (you / run)?", accept: ["have you been running"], why: "We see signs of a recent action (you are breathing fast), so we ask in Present Perfect Continuous." },
      { type: "text", q: "We ___ (practise) this dance for three months, but it still isn't perfect.", accept: ["have been practising", "'ve been practising", "have been practicing", "'ve been practicing", "have practised", "'ve practised", "have practiced", "'ve practiced"], why: "For three months, still going on: Present Perfect Continuous (Simple is also OK)." },
      { type: "choice", q: "How long ___ learning English?", opts: ["are you", "have you been", "did you"], a: 1, why: "How long + an action up to now: have you been + V-ing." },
      { type: "choice", q: "I've been ___ my phone for an hour and I still can't find it.", opts: ["look for", "looking for", "looked for"], a: 1, why: "After been in this tense we need the V-ing form." },
      { type: "text", q: "She ___ (not / sleep) well lately.", accept: ["hasn't been sleeping", "has not been sleeping", "hasn't slept", "has not slept"], why: "Lately is a period up to now: hasn't been sleeping (or hasn't slept)." }
    ]
  },
  {
    id: "b1-past-perfect", level: "B1", title: "Past Perfect",
    rule: {
      intro: "Past Perfect is the \"past before the past\": an action happened before another moment or action in the past.",
      blocks: [
        { h: "Form", rows: [
          ["had + V3 (for all persons)", "She had left before I came."],
          ["negative", "We hadn't seen the film before."],
          ["question", "Had you ever flown before that trip?"]
        ] },
        { h: "When we use it", rows: [
          ["before another action in the past", "When I got to the station, the train had left."],
          ["by the time / before / after / already", "By the time we arrived, the party had finished."],
          ["a reason in the past", "I was tired because I had trained all day."]
        ] },
        { h: "Compare", rows: [
          ["first I arrived, then she left", "When I arrived, she left."],
          ["she left before I arrived", "When I arrived, she had left."]
        ] }
      ],
      tips: [
        "Russian has only one past tense, so people often forget Past Perfect: The film had already started when we came (not already started).",
        "Don't mix it up with Present Perfect: if everything is in the past, use had, not have: I knew he had been there.",
        "If actions go in order, one after another, Past Simple is enough: I got up, had breakfast and left."
      ]
    },
    items: [
      { type: "choice", q: "By the time we arrived, the film ___.", opts: ["started", "had started", "has started"], a: 1, why: "The film started before we arrived, so Past Perfect." },
      { type: "choice", q: "I didn't recognise him because he ___ a beard.", opts: ["grew", "had grown", "has grown"], a: 1, why: "The beard grew before we met, so Past Perfect." },
      { type: "text", q: "When I got to the station, the train ___ (already / leave).", accept: ["had already left", "'d already left"], why: "The train left before I came: had + already + V3." },
      { type: "text", q: "She was nervous because she ___ (never / fly) before.", accept: ["had never flown", "'d never flown"], why: "Experience before a moment in the past: had never + V3 (fly — flew — flown)." },
      { type: "choice", q: "After they ___ dinner, they watched a film.", opts: ["had had", "have had", "has had"], a: 0, why: "Dinner was before the film, and all of it is in the past: Past Perfect, had + had." },
      { type: "text", q: "We were hungry because we ___ (not / eat) all day.", accept: ["hadn't eaten", "had not eaten"], why: "A reason before a moment in the past: had not + V3." },
      { type: "choice", q: "___ you ever been abroad before you moved to London?", opts: ["Have", "Had", "Did"], a: 1, why: "Experience before another past event (the move): Past Perfect, Had you ever been…" },
      { type: "choice", q: "I ___ the exam because I had studied hard.", opts: ["passed", "had passed", "have passed"], a: 0, why: "Passing the exam is the later action, so Past Simple. The studying came first (had studied)." },
      { type: "text", q: "The kitchen was a mess because the kids ___ (bake) a cake.", accept: ["had baked", "'d baked", "had been baking", "'d been baking"], why: "They baked before we saw the mess: Past Perfect (had baked), or Past Perfect Continuous (had been baking) to show the process." },
      { type: "choice", q: "Which sentence is correct?", opts: ["When I arrived, Kate had gone home, so I didn't see her.", "When I arrived, Kate has gone home, so I didn't see her.", "When I had arrived, Kate went home, so I didn't see her."], a: 0, why: "Kate left before I arrived, so had gone. You can't use has gone in a story about the past." }
    ]
  },
  {
    id: "b1-used-to-would", level: "B1", title: "used to / would / be used to",
    rule: {
      intro: "Used to and would talk about past habits that are not true now. Be used to + V-ing means you are familiar with something now, it is normal for you.",
      blocks: [
        { h: "used to + V", rows: [
          ["a habit or state in the past", "I used to have long hair."],
          ["negative: didn't use to", "He didn't use to like fish."],
          ["question: Did … use to?", "Did you use to play the piano?"]
        ] },
        { h: "would + V", rows: [
          ["only repeated actions", "Every summer we would go to the sea."],
          ["not with states", "I used to live in Omsk. (not I would live)"]
        ] },
        { h: "be / get used to + V-ing", rows: [
          ["be used to: it is normal for you", "I'm used to getting up early."],
          ["get used to: it is becoming normal", "You'll get used to the cold."]
        ] }
      ],
      tips: [
        "In negatives and questions after did, write use to without d: Did you use to…? (not Did you used to…?)",
        "After be used to, use -ing or a noun: I'm used to living alone (not I'm used to live).",
        "Would is not used with state verbs (live, have, like, be): I used to have a cat."
      ]
    },
    items: [
      { type: "choice", q: "I ___ play football every day when I was little.", opts: ["used to", "use to", "was used to"], a: 0, why: "A past habit in a positive sentence: used to + V." },
      { type: "choice", q: "Did you ___ have long hair?", opts: ["used to", "use to", "using to"], a: 1, why: "After did, use to has no -d." },
      { type: "choice", q: "We ___ live in Kazan.", opts: ["would", "used to", "are used to"], a: 1, why: "Live is a state, so would doesn't work. Are used to needs -ing." },
      { type: "choice", q: "I'm used to ___ up early.", opts: ["get", "getting", "got"], a: 1, why: "Be used to + V-ing." },
      { type: "text", q: "At first it was hard, but now I'm used to ___ (wear) a school uniform.", accept: ["wearing"], why: "Be used to + V-ing: wearing." },
      { type: "text", q: "My grandma ___ (not / use to) like pizza, but now she loves it.", accept: ["didn't use to", "did not use to", "used not to"], why: "Negative: didn't use to + V (the formal form used not to is also OK)." },
      { type: "choice", q: "When we were kids, my dad ___ read us a story every night.", opts: ["would", "was used to", "is used to"], a: 0, why: "A repeated action in the past: would + V." },
      { type: "text", q: "Don't worry, you'll soon get used to ___ (speak) English all day.", accept: ["speaking"], why: "Get used to + V-ing: speaking." },
      { type: "choice", q: "Max ___ have a dog, but it ran away.", opts: ["used to", "would", "is used to"], a: 0, why: "Have (own) is a state, so would doesn't work. Is used to doesn't fit the meaning." },
      { type: "text", q: "I ___ (use to) hate vegetables, but now I eat salad every day.", accept: ["used to"], why: "The positive form is used to." }
    ]
  },
  {
    id: "b1-conditionals-1-2", level: "B1", title: "First and second conditionals",
    rule: {
      intro: "First conditional is a real possible situation in the future. Second conditional is an unreal or unlikely situation in the present or future (\"if I were…, I would…\").",
      blocks: [
        { h: "First conditional", rows: [
          ["If + Present Simple, will + V", "If it rains, we'll stay at home."],
          ["when / as soon as / unless — also Present", "I'll text you when I get home."]
        ] },
        { h: "Second conditional", rows: [
          ["If + Past Simple, would + V", "If I had more money, I would travel more."],
          ["were for all persons (in speech, was is also used with I / he / she)", "If I were you, I would apologise."]
        ] },
        { h: "Compare", rows: [
          ["real, it can happen", "If I win the match, I'll be happy."],
          ["a dream, unlikely", "If I won the lottery, I'd buy an island."]
        ] }
      ],
      tips: [
        "After if and when, don't use will for the future: If you come, I'll show you (not If you will come).",
        "After if, use the past form, not would: If I knew the answer, I would tell you (not \"If I would know\").",
        "Unless = if not, so you don't need another negative after it: Unless you hurry, you'll be late."
      ]
    },
    items: [
      { type: "choice", q: "If it ___ tomorrow, we'll stay at home.", opts: ["will rain", "rains", "rained"], a: 1, why: "First conditional: after if, use Present Simple." },
      { type: "choice", q: "If I ___ you, I would apologise.", opts: ["am", "were", "will be"], a: 1, why: "Second conditional, the fixed phrase If I were you." },
      { type: "choice", q: "If I had a million dollars, I ___ a house by the sea.", opts: ["will buy", "would buy", "bought"], a: 1, why: "Second conditional: If + Past Simple, would + V." },
      { type: "text", q: "If you ___ (study) hard, you will pass the exam.", accept: ["study"], why: "First conditional: the if part uses Present Simple." },
      { type: "text", q: "If I ___ (have) more free time, I would learn to play the guitar.", accept: ["had"], why: "Second conditional: the if part uses Past Simple." },
      { type: "text", q: "We ___ (miss) the bus if we don't hurry.", accept: ["will miss", "'ll miss"], why: "First conditional: the main part uses will + V." },
      { type: "choice", q: "I'll call you as soon as I ___ home.", opts: ["will get", "get", "would get"], a: 1, why: "After as soon as, talking about the future, use Present Simple." },
      { type: "choice", q: "What would you do if you ___ a famous singer?", opts: ["are", "were", "will be"], a: 1, why: "An unreal situation: Second conditional, if + were." },
      { type: "text", q: "If she ___ (not / be) so shy, she would make friends more easily.", accept: ["weren't", "were not", "wasn't", "was not"], why: "Second conditional: if + Past Simple (were not; in speech also was not)." },
      { type: "choice", q: "Unless you ___ now, you'll be late.", opts: ["leave", "don't leave", "will leave"], a: 0, why: "Unless already means \"if not\", and after it we use Present Simple." }
    ]
  },
  {
    id: "b1-passive-basic", level: "B1", title: "Passive: Present and Past Simple",
    rule: {
      intro: "We use the passive when the action or the thing it happens to is important, not who does it. If we need to say who does it, we use by.",
      blocks: [
        { h: "Form: be + V3", rows: [
          ["Present Simple: am/is/are + V3", "English is spoken all over the world."],
          ["Past Simple: was/were + V3", "The bridge was built in 1900."],
          ["by + the doer", "The song was written by Billie Eilish."]
        ] },
        { h: "Negatives and questions", rows: [
          ["isn't / aren't / wasn't / weren't + V3", "The room wasn't cleaned yesterday."],
          ["Is / Are / Was / Were … + V3?", "Were the tickets sold online?"]
        ] },
        { h: "Verbs with a preposition", rows: [
          ["the preposition stays after V3", "This band is talked about a lot."]
        ] }
      ],
      tips: [
        "Don't forget be: The window was broken (not The window broken).",
        "Russian says \"they stole a bike from me\", but in English: My bike was stolen (not I was stolen a bike).",
        "Choose is/are or was/were by the subject: The cakes were made by my mum."
      ]
    },
    items: [
      { type: "choice", q: "This song ___ by millions of people every day.", opts: ["listens to", "is listened to", "listened"], a: 1, why: "People listen to the song: Present Simple Passive. The preposition to stays." },
      { type: "choice", q: "The Mona Lisa ___ by Leonardo da Vinci.", opts: ["painted", "was painted", "is painted"], a: 1, why: "The picture was painted in the past: Past Simple Passive." },
      { type: "text", q: "English ___ (speak) in many countries.", accept: ["is spoken"], why: "A fact in the present: is + V3 (speak — spoke — spoken)." },
      { type: "text", q: "The new sports centre ___ (open) last month.", accept: ["was opened"], why: "Last month: Past Simple Passive, was + V3." },
      { type: "choice", q: "My bike ___ yesterday!", opts: ["stole", "was stolen", "is stolen"], a: 1, why: "The bike didn't steal anything; someone stole it, so was stolen." },
      { type: "text", q: "These phones ___ (make) in China.", accept: ["are made"], why: "The subject is plural, present time: are + V3." },
      { type: "choice", q: "The letters ___ by the postman this morning.", opts: ["were delivered", "was delivered", "delivered"], a: 0, why: "\"Letters\" is plural, past time: were + V3." },
      { type: "text", q: "The windows ___ (not / clean) last week.", accept: ["weren't cleaned", "were not cleaned"], why: "Negative in Past Simple Passive: were not + V3." },
      { type: "choice", q: "___ the tickets sold online?", opts: ["Do", "Are", "Is"], a: 1, why: "In a passive question, be goes first. \"Tickets\" is plural, so Are." },
      { type: "choice", q: "Harry Potter was written ___ J. K. Rowling.", opts: ["by", "with", "from"], a: 0, why: "In the passive, the doer comes after by." }
    ]
  },
  {
    id: "b1-relative-clauses", level: "B1", title: "Relative clauses: who / which / that / where / whose",
    rule: {
      intro: "Relative clauses tell us which person or thing we mean with the words who, which, that, where and whose.",
      blocks: [
        { h: "Words", rows: [
          ["who — people", "The boy who lives next door is my friend."],
          ["which — things, animals", "The bike which I bought is red."],
          ["that — people and things (informal)", "The film that we saw was great."],
          ["where — a place", "This is the school where my mum works."],
          ["whose — belonging to someone", "I met a girl whose dad is a pilot."]
        ] },
        { h: "With commas (extra information)", rows: [
          ["only who / which, not that", "My brother, who lives in Kazan, is a doctor."]
        ] },
        { h: "When you can leave the word out", rows: [
          ["if it is the object (a subject comes after it)", "The film (that) we saw was great."],
          ["if it is the subject, you can't leave it out", "The girl who won is my sister."]
        ] }
      ],
      tips: [
        "Don't repeat the pronoun inside the clause: The book which I read (not The book which I read it).",
        "Whose and who's are different words: whose shows who something belongs to, who's = who is.",
        "Don't use that after a comma: Moscow, which is huge, … (not Moscow, that is huge)."
      ]
    },
    items: [
      { type: "choice", q: "The girl ___ sits next to me is from Spain.", opts: ["which", "who", "whose"], a: 1, why: "It is about a person, and the word is the subject of the clause: who." },
      { type: "choice", q: "This is the café ___ we first met.", opts: ["which", "where", "who"], a: 1, why: "A place where something happened: where." },
      { type: "choice", q: "I have a friend ___ brother plays in a band.", opts: ["who", "whose", "who's"], a: 1, why: "The brother belongs to the friend: whose." },
      { type: "text", q: "The book ___ is on the table is mine.", accept: ["which", "that"], why: "A thing, no commas: which or that." },
      { type: "choice", q: "My sister, ___ lives in Paris, is a designer.", opts: ["that", "who", "which"], a: 1, why: "With commas you can't use that. For a person, use who." },
      { type: "choice", q: "Moscow, ___ is the capital of Russia, is a huge city.", opts: ["that", "which", "where"], a: 1, why: "With commas, use which. Where doesn't fit because the word is the subject here." },
      { type: "text", q: "Do you know the man ___ car is parked outside?", accept: ["whose"], why: "The car belongs to the man: whose." },
      { type: "text", q: "This is the town ___ my grandparents were born.", accept: ["where", "in which"], why: "A place: where (or formal in which)." },
      { type: "choice", q: "In which sentence can the relative pronoun be left out?", opts: ["The boy who won the race is my cousin.", "The film that we watched was boring.", "The dog which bit me was huge."], a: 1, why: "Here that is the object (we watched the film), so you can leave it out." },
      { type: "text", q: "I like people ___ are honest.", accept: ["who", "that"], why: "For people: who or that." }
    ]
  },
  {
    id: "b1-gerund-infinitive", level: "B1", title: "Gerund or infinitive",
    rule: {
      intro: "Some verbs are followed by -ing (gerund), others by to + V (infinitive). You need to learn these lists by heart.",
      blocks: [
        { h: "+ V-ing", rows: [
          ["enjoy, mind, avoid, finish, suggest, keep, practise", "I enjoy playing the guitar."],
          ["after prepositions", "She's good at drawing."]
        ] },
        { h: "+ to V", rows: [
          ["want, decide, hope, plan, agree, promise, refuse, learn", "We decided to go to the cinema."],
          ["would like / would love", "I'd like to try sushi."]
        ] },
        { h: "+ V without to", rows: [
          ["make, let, can, must, should", "My parents let me stay up late."]
        ] },
        { h: "The meaning changes", rows: [
          ["stop doing — not do it any more", "He stopped eating sweets."],
          ["stop to do — stop in order to do something", "He stopped to buy a drink."],
          ["remember/forget to do — about a thing you need to do", "Remember to call Mum!"],
          ["remember/forget doing — about a thing you already did", "I remember meeting him."]
        ] }
      ],
      tips: [
        "After a preposition, always use -ing: I'm interested in learning Spanish (not in learn).",
        "After let and make, don't use to: Mum made me tidy my room (not made me to tidy).",
        "Enjoy + -ing, not the infinitive: I enjoy swimming (not I enjoy to swim)."
      ]
    },
    items: [
      { type: "choice", q: "I enjoy ___ to music.", opts: ["listen", "to listen", "listening"], a: 2, why: "Enjoy + V-ing." },
      { type: "choice", q: "She decided ___ a new language.", opts: ["learning", "to learn", "learn"], a: 1, why: "Decide + to V." },
      { type: "text", q: "Would you mind ___ (open) the window?", accept: ["opening"], why: "Mind + V-ing." },
      { type: "text", q: "We hope ___ (visit) London next year.", accept: ["to visit"], why: "Hope + to V." },
      { type: "choice", q: "He's good at ___ basketball.", opts: ["play", "to play", "playing"], a: 2, why: "After the preposition at: V-ing." },
      { type: "choice", q: "I stopped ___ a drink because I was thirsty.", opts: ["to buy", "buying", "buy"], a: 0, why: "I stopped in order to buy something: stop to do." },
      { type: "text", q: "Remember ___ (lock) the door when you leave!", accept: ["to lock"], why: "A thing you need to do in the future: remember to do." },
      { type: "text", q: "I'll never forget ___ (meet) my favourite singer last year.", accept: ["meeting"], why: "A memory of something that already happened: forget doing." },
      { type: "choice", q: "My parents let me ___ to the party.", opts: ["go", "to go", "going"], a: 0, why: "Let + V without to." },
      { type: "choice", q: "Avoid ___ too much sugar.", opts: ["to eat", "eating", "eat"], a: 1, why: "Avoid + V-ing." }
    ]
  },
  {
    id: "b1-reported-statements", level: "B1", title: "Reported speech: statements",
    rule: {
      intro: "Reported speech tells what another person said. If the verb said/told is in the past, the tense usually moves one step back. Pronouns and words of time and place change to fit the meaning.",
      blocks: [
        { h: "Tense changes", rows: [
          ["Present Simple → Past Simple", "\"I like it.\" → She said she liked it."],
          ["Present Continuous → Past Continuous", "\"I'm reading.\" → He said he was reading."],
          ["Present Perfect / Past Simple → Past Perfect", "\"I've finished.\" → She said she had finished."],
          ["will → would, can → could", "\"I'll help.\" → He said he would help."]
        ] },
        { h: "Words of time and place", rows: [
          ["now → then, today → that day", "She said she was busy that day."],
          ["tomorrow → the next day, yesterday → the day before", "He said he would come the next day."],
          ["here → there, this → that", "She said that bag was hers."]
        ] },
        { h: "say or tell", rows: [
          ["say (that) …", "He said (that) he was tired."],
          ["tell + a person + (that) …", "He told me (that) he was tired."]
        ] }
      ],
      tips: [
        "Tell needs the person you speak to: She told me… (not She told that…). Say has no person: She said that…",
        "In reported speech, use normal word order and no quotation marks: He said he was hungry (not He said: I am hungry).",
        "Don't forget to change pronouns: \"I love my dog\" → She said she loved her dog."
      ]
    },
    items: [
      { type: "choice", q: "\"I'm hungry,\" Tom said yesterday. → Tom said he ___ hungry.", opts: ["is", "was", "will be"], a: 1, why: "Present Simple moves to Past Simple: am → was." },
      { type: "choice", q: "\"I will help you tomorrow,\" he said last month. → He said he ___ help me the next day.", opts: ["will", "would", "can"], a: 1, why: "Will → would." },
      { type: "text", q: "\"I can swim,\" Anna said. → Anna said she ___ swim.", accept: ["could", "can"], why: "Usually can → could. You can keep can if it is still true: Anna can still swim." },
      { type: "text", q: "\"I saw the film,\" Max said. → Max said he ___ the film.", accept: ["had seen", "'d seen", "saw"], why: "Past Simple → Past Perfect (in speech you can keep saw)." },
      { type: "choice", q: "She ___ me that she was busy.", opts: ["said", "told", "spoke"], a: 1, why: "There is a person (me), so told." },
      { type: "choice", q: "\"We are leaving tomorrow,\" they said last week. → They said they were leaving ___.", opts: ["tomorrow", "the next day", "yesterday"], a: 1, why: "The words were said a week ago, so tomorrow → the next day." },
      { type: "text", q: "\"I have finished my homework,\" Lisa said. → Lisa said she ___ her homework.", accept: ["had finished", "'d finished"], why: "Present Perfect → Past Perfect." },
      { type: "text", q: "\"I don't like jazz,\" Kate said. → Kate said she ___ jazz.", accept: ["didn't like", "did not like", "doesn't like", "does not like"], why: "Usually don't like → didn't like. You can keep the tense if it is still true." },
      { type: "choice", q: "\"This is my bag,\" he said. → He said that ___ was his bag.", opts: ["this", "that", "these"], a: 1, why: "This → that in reported speech." },
      { type: "text", q: "\"I am watching TV,\" Dan said. → Dan said he ___ TV.", accept: ["was watching"], why: "Present Continuous → Past Continuous: am watching → was watching." }
    ]
  }
);
