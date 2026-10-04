window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "b1-perfect-vs-past", level: "B1", title: "Present Perfect vs Past Simple (for / since)",
    rule: {
      intro: "Present Perfect связывает прошлое с настоящим: важен результат или опыт, а не время. Past Simple — законченное действие в конкретный момент прошлого (yesterday, last year, in 2020, ago).",
      blocks: [
        { h: "Формы", rows: [
          ["Present Perfect: have/has + V3", "I have finished my homework."],
          ["Past Simple: V2 / did", "I finished my homework an hour ago."],
          ["вопрос со временем — только Past Simple", "When did you finish it?"]
        ] },
        { h: "Слова-подсказки", rows: [
          ["Present Perfect: ever, never, just, already, yet, so far", "Have you ever been to Italy?"],
          ["Past Simple: yesterday, last…, …ago, in 2019, when…", "We went to Italy last summer."]
        ] },
        { h: "for и since", rows: [
          ["for + период (сколько длится)", "I've known her for five years."],
          ["since + точка начала (с какого момента)", "I've known her since 2021."],
          ["ago — только с Past Simple", "I met her five years ago."]
        ] }
      ],
      tips: [
        "«Я живу здесь три года» — не Present Simple: I have lived here for three years (не I live here for three years).",
        "Если назван момент в прошлом, Present Perfect нельзя: I saw him yesterday (не I have seen him yesterday).",
        "«С 2020 года» — since 2020, а не from 2020: She has played tennis since 2020."
      ]
    },
    items: [
      { type: "choice", q: "We ___ to Spain last summer.", opts: ["have been", "went", "have gone"], a: 1, why: "Last summer — конкретное время в прошлом, значит Past Simple." },
      { type: "choice", q: "She has lived in Moscow ___ 2019.", opts: ["for", "since", "ago"], a: 1, why: "2019 — точка начала, поэтому since." },
      { type: "choice", q: "I've known Max ___ ten years.", opts: ["since", "for", "during"], a: 1, why: "Ten years — длительность периода, поэтому for." },
      { type: "choice", q: "When ___ you buy that jacket?", opts: ["have", "did", "do"], a: 1, why: "Вопрос с when спрашивает о моменте в прошлом — только Past Simple." },
      { type: "choice", q: "Have you ever ___ sushi?", opts: ["ate", "eaten", "eat"], a: 1, why: "После have нужна третья форма: eat — ate — eaten." },
      { type: "text", q: "I love this film! I ___ (see) it three times so far.", accept: ["have seen", "'ve seen"], why: "So far — опыт до настоящего момента: Present Perfect, see — saw — seen." },
      { type: "text", q: "Tom ___ (finish) his project two days ago.", accept: ["finished"], why: "Ago всегда требует Past Simple." },
      { type: "text", q: "They ___ (be) friends since primary school.", accept: ["have been", "'ve been"], why: "Since + начало периода, который длится до сих пор, — Present Perfect." },
      { type: "choice", q: "The concert started ten minutes ___.", opts: ["ago", "for", "since"], a: 0, why: "Ago означает «тому назад» и стоит после промежутка времени с Past Simple." },
      { type: "text", q: "My brother ___ (not / call) me since Monday.", accept: ["hasn't called", "has not called"], why: "Since Monday — период до настоящего момента: Present Perfect, he → has." }
    ]
  },
  {
    id: "b1-perfect-continuous", level: "B1", title: "Present Perfect Continuous",
    rule: {
      intro: "Present Perfect Continuous показывает действие, которое началось в прошлом и длится до сих пор (или только что закончилось и видны его следы). Акцент — на процессе и длительности.",
      blocks: [
        { h: "Форма", rows: [
          ["have/has been + V-ing", "I have been learning English for six years."],
          ["отрицание", "She hasn't been sleeping well."],
          ["вопрос", "How long have you been waiting?"]
        ] },
        { h: "Когда используется", rows: [
          ["длится до сих пор (for / since / how long)", "We've been playing since 3 o'clock."],
          ["видны следы недавнего действия", "Your eyes are red. Have you been crying?"]
        ] },
        { h: "Continuous или Simple?", rows: [
          ["процесс, сколько времени", "I've been writing songs all day."],
          ["результат, сколько штук", "I've written three songs today."],
          ["глаголы состояния — только Simple", "I've known him for years."]
        ] }
      ],
      tips: [
        "«Я жду уже час» — не Present Continuous: I have been waiting for an hour (не I am waiting for an hour).",
        "Know, like, want, believe, own не ставятся в Continuous: I've had this phone for two years (не I've been having).",
        "Если называется количество результата, нужен Present Perfect Simple: She has read 50 pages (не has been reading 50 pages)."
      ]
    },
    items: [
      { type: "choice", q: "You look tired. ___ you been running?", opts: ["Have", "Has", "Did"], a: 0, why: "Вопрос в Present Perfect Continuous: Have + you + been + V-ing." },
      { type: "text", q: "I ___ (wait) for the bus for twenty minutes!", accept: ["have been waiting", "'ve been waiting", "have waited", "'ve waited"], why: "For twenty minutes до настоящего момента — Present Perfect Continuous (лучше всего) или Simple." },
      { type: "choice", q: "She ___ three songs this morning.", opts: ["has been writing", "has written", "have written"], a: 1, why: "Названо количество результата (три песни) — Present Perfect Simple; she → has." },
      { type: "choice", q: "I ___ Anna since we were five.", opts: ["have been knowing", "have known", "am knowing"], a: 1, why: "Know — глагол состояния, в Continuous не ставится." },
      { type: "choice", q: "Your hands are covered in paint! What ___?", opts: ["you have been doing", "have you been doing", "you been doing"], a: 1, why: "В вопросе have стоит перед подлежащим: What have you been doing?" },
      { type: "text", q: "Why are you out of breath? ___ (you / run)?", accept: ["have you been running"], why: "Видны следы недавнего действия (одышка) — Present Perfect Continuous в вопросе." },
      { type: "text", q: "We ___ (practise) this dance for three months, but it still isn't perfect.", accept: ["have been practising", "'ve been practising", "have been practicing", "'ve been practicing", "have practised", "'ve practised", "have practiced", "'ve practiced"], why: "For three months до сих пор — Present Perfect Continuous (Simple тоже допустим)." },
      { type: "choice", q: "How long ___ learning English?", opts: ["are you", "have you been", "did you"], a: 1, why: "How long + действие до настоящего момента — have you been + V-ing." },
      { type: "choice", q: "I've been ___ my phone for an hour and I still can't find it.", opts: ["look for", "looking for", "looked for"], a: 1, why: "После been в этом времени нужна форма V-ing." },
      { type: "text", q: "She ___ (not / sleep) well lately.", accept: ["hasn't been sleeping", "has not been sleeping", "hasn't slept", "has not slept"], why: "Lately — период до настоящего момента: hasn't been sleeping (или hasn't slept)." }
    ]
  },
  {
    id: "b1-past-perfect", level: "B1", title: "Past Perfect",
    rule: {
      intro: "Past Perfect — «предпрошедшее» время: действие произошло раньше другого момента или действия в прошлом.",
      blocks: [
        { h: "Форма", rows: [
          ["had + V3 (для всех лиц)", "She had left before I came."],
          ["отрицание", "We hadn't seen the film before."],
          ["вопрос", "Had you ever flown before that trip?"]
        ] },
        { h: "Когда используется", rows: [
          ["раньше другого действия в прошлом", "When I got to the station, the train had left."],
          ["by the time / before / after / already", "By the time we arrived, the party had finished."],
          ["причина в прошлом", "I was tired because I had trained all day."]
        ] },
        { h: "Сравни", rows: [
          ["When I arrived, she left. (сначала я пришёл, потом она ушла)", "When I arrived, she left."],
          ["When I arrived, she had left. (она ушла раньше)", "When I arrived, she had left."]
        ] }
      ],
      tips: [
        "В русском одно прошедшее время, поэтому Past Perfect часто забывают: The film had already started when we came (не already started).",
        "Не путай с Present Perfect: если всё в прошлом, нужен had, а не have: I knew he had been there.",
        "Если действия идут по порядку одно за другим, хватит Past Simple: I got up, had breakfast and left."
      ]
    },
    items: [
      { type: "choice", q: "By the time we arrived, the film ___.", opts: ["started", "had started", "has started"], a: 1, why: "Фильм начался раньше нашего прихода — Past Perfect." },
      { type: "choice", q: "I didn't recognise him because he ___ a beard.", opts: ["grew", "had grown", "has grown"], a: 1, why: "Борода выросла до момента встречи — Past Perfect." },
      { type: "text", q: "When I got to the station, the train ___ (already / leave).", accept: ["had already left", "'d already left"], why: "Поезд ушёл раньше, чем я пришёл: had + already + V3." },
      { type: "text", q: "She was nervous because she ___ (never / fly) before.", accept: ["had never flown", "'d never flown"], why: "Опыт до момента в прошлом: had never + V3 (fly — flew — flown)." },
      { type: "choice", q: "After they ___ dinner, they watched a film.", opts: ["had had", "have had", "has had"], a: 0, why: "Ужин был раньше фильма, всё в прошлом — Past Perfect: had + had." },
      { type: "text", q: "We were hungry because we ___ (not / eat) all day.", accept: ["hadn't eaten", "had not eaten"], why: "Причина до момента в прошлом — had not + V3." },
      { type: "choice", q: "___ you ever been abroad before you moved to London?", opts: ["Have", "Had", "Did"], a: 1, why: "Опыт до другого события в прошлом (переезд) — Past Perfect: Had you ever been…" },
      { type: "choice", q: "I ___ the exam because I had studied hard.", opts: ["passed", "had passed", "have passed"], a: 0, why: "Сдача экзамена — позднее действие, для него Past Simple; раньше была учёба (had studied)." },
      { type: "text", q: "The kitchen was a mess because the kids ___ (bake) a cake.", accept: ["had baked", "'d baked", "had been baking", "'d been baking"], why: "Пекли раньше, чем мы увидели беспорядок, — Past Perfect." },
      { type: "choice", q: "Which sentence is correct?", opts: ["When I arrived, Kate had gone home, so I didn't see her.", "When I arrived, Kate has gone home, so I didn't see her.", "When I had arrived, Kate went home, so I didn't see her."], a: 0, why: "Кейт ушла раньше моего прихода — had gone. Has gone нельзя в рассказе о прошлом." }
    ]
  },
  {
    id: "b1-used-to-would", level: "B1", title: "used to / would / be used to",
    rule: {
      intro: "Used to и would рассказывают о привычках прошлого, которых больше нет. Be used to + V-ing значит «привык к чему-то» сейчас.",
      blocks: [
        { h: "used to + V", rows: [
          ["привычка или состояние в прошлом", "I used to have long hair."],
          ["отрицание: didn't use to", "He didn't use to like fish."],
          ["вопрос: Did … use to?", "Did you use to play the piano?"]
        ] },
        { h: "would + V", rows: [
          ["только повторяющиеся действия", "Every summer we would go to the sea."],
          ["с состояниями нельзя", "I used to live in Omsk. (не I would live)"]
        ] },
        { h: "be / get used to + V-ing", rows: [
          ["быть привыкшим", "I'm used to getting up early."],
          ["привыкать", "You'll get used to the cold."]
        ] }
      ],
      tips: [
        "В отрицании и вопросе после did — use to без d: Did you use to…? (не Did you used to…?)",
        "После be used to нужен -ing или существительное: I'm used to living alone (не I'm used to live).",
        "Would не употребляется с глаголами состояния (live, have, like, be): I used to have a cat."
      ]
    },
    items: [
      { type: "choice", q: "I ___ play football every day when I was little.", opts: ["used to", "use to", "was used to"], a: 0, why: "Привычка в прошлом в утвердительном предложении — used to + V." },
      { type: "choice", q: "Did you ___ have long hair?", opts: ["used to", "use to", "using to"], a: 1, why: "После did — use to без окончания -d." },
      { type: "choice", q: "We ___ live in Kazan.", opts: ["would", "used to", "are used to"], a: 1, why: "Live — состояние, с ним would не употребляется; are used to требует -ing." },
      { type: "choice", q: "I'm used to ___ up early.", opts: ["get", "getting", "got"], a: 1, why: "Be used to + V-ing." },
      { type: "text", q: "At first it was hard, but now I'm used to ___ (wear) a school uniform.", accept: ["wearing"], why: "Be used to + V-ing: wearing." },
      { type: "text", q: "My grandma ___ (not / use to) like pizza, but now she loves it.", accept: ["didn't use to", "did not use to", "used not to"], why: "Отрицание: didn't use to + V (формально также used not to)." },
      { type: "choice", q: "When we were kids, my dad ___ read us a story every night.", opts: ["would", "was used to", "is used to"], a: 0, why: "Повторяющееся действие в прошлом — would + V." },
      { type: "text", q: "Don't worry, you'll soon get used to ___ (speak) English all day.", accept: ["speaking"], why: "Get used to + V-ing: speaking." },
      { type: "choice", q: "Max ___ have a dog, but it ran away.", opts: ["used to", "would", "is used to"], a: 0, why: "Have (иметь) — состояние, would нельзя; is used to по смыслу не подходит." },
      { type: "text", q: "I ___ (use to) hate vegetables, but now I eat salad every day.", accept: ["used to"], why: "Утвердительная форма — used to." }
    ]
  },
  {
    id: "b1-conditionals-1-2", level: "B1", title: "First and second conditionals",
    rule: {
      intro: "First conditional — реальное условие в будущем. Second conditional — нереальная или маловероятная ситуация в настоящем или будущем («если бы…»).",
      blocks: [
        { h: "First conditional", rows: [
          ["If + Present Simple, will + V", "If it rains, we'll stay at home."],
          ["when / as soon as / unless — тоже Present", "I'll text you when I get home."]
        ] },
        { h: "Second conditional", rows: [
          ["If + Past Simple, would + V", "If I had more money, I would travel more."],
          ["were для всех лиц (было бы правильно)", "If I were you, I would apologise."]
        ] },
        { h: "Сравни", rows: [
          ["реально, может случиться", "If I win the match, I'll be happy."],
          ["мечта, маловероятно", "If I won the lottery, I'd buy an island."]
        ] }
      ],
      tips: [
        "После if и when в будущем нет will: If you come, I'll show you (не If you will come).",
        "«Если бы я знал» — не If I would know, а If I knew: If I knew the answer, I would tell you.",
        "Unless = if not, поэтому после него не нужно ещё одно отрицание: Unless you hurry, you'll be late."
      ]
    },
    items: [
      { type: "choice", q: "If it ___ tomorrow, we'll stay at home.", opts: ["will rain", "rains", "rained"], a: 1, why: "First conditional: после if — Present Simple." },
      { type: "choice", q: "If I ___ you, I would apologise.", opts: ["am", "were", "will be"], a: 1, why: "Second conditional, устойчивое If I were you." },
      { type: "choice", q: "If I had a million dollars, I ___ a house by the sea.", opts: ["will buy", "would buy", "bought"], a: 1, why: "Second conditional: If + Past Simple, would + V." },
      { type: "text", q: "If you ___ (study) hard, you will pass the exam.", accept: ["study"], why: "First conditional: в части с if — Present Simple." },
      { type: "text", q: "If I ___ (have) more free time, I would learn to play the guitar.", accept: ["had"], why: "Second conditional: в части с if — Past Simple." },
      { type: "text", q: "We ___ (miss) the bus if we don't hurry.", accept: ["will miss", "'ll miss"], why: "First conditional: в главной части will + V." },
      { type: "choice", q: "I'll call you as soon as I ___ home.", opts: ["will get", "get", "would get"], a: 1, why: "После as soon as о будущем — Present Simple." },
      { type: "choice", q: "What would you do if you ___ a famous singer?", opts: ["are", "were", "will be"], a: 1, why: "Нереальная ситуация — Second conditional: if + were." },
      { type: "text", q: "If she ___ (not / be) so shy, she would make friends more easily.", accept: ["weren't", "were not", "wasn't", "was not"], why: "Second conditional: if + Past Simple (were not; в разговорной речи was not)." },
      { type: "choice", q: "Unless you ___ now, you'll be late.", opts: ["leave", "don't leave", "will leave"], a: 0, why: "Unless уже значит «если не», и после него Present Simple." }
    ]
  },
  {
    id: "b1-passive-basic", level: "B1", title: "Passive: Present and Past Simple",
    rule: {
      intro: "Пассивный залог нужен, когда важно действие или его объект, а не тот, кто его совершил. Исполнитель, если нужен, вводится через by.",
      blocks: [
        { h: "Форма: be + V3", rows: [
          ["Present Simple: am/is/are + V3", "English is spoken all over the world."],
          ["Past Simple: was/were + V3", "The bridge was built in 1900."],
          ["by + исполнитель", "The song was written by Billie Eilish."]
        ] },
        { h: "Отрицания и вопросы", rows: [
          ["isn't / wasn't + V3", "The room wasn't cleaned yesterday."],
          ["Is/Was … + V3?", "Were the tickets sold online?"]
        ] },
        { h: "Глаголы с предлогом", rows: [
          ["предлог остаётся после V3", "This band is talked about a lot."]
        ] }
      ],
      tips: [
        "Не забывай be: The window was broken (не The window broken).",
        "Русское «у меня украли велосипед» — My bike was stolen (не I was stolen a bike).",
        "Is/are или was/were выбираются по подлежащему: The cakes were made by my mum."
      ]
    },
    items: [
      { type: "choice", q: "This song ___ by millions of people every day.", opts: ["listens to", "is listened to", "listened"], a: 1, why: "Песню слушают — Present Simple Passive, предлог to сохраняется." },
      { type: "choice", q: "The Mona Lisa ___ by Leonardo da Vinci.", opts: ["painted", "was painted", "is painted"], a: 1, why: "Картину написали в прошлом — Past Simple Passive." },
      { type: "text", q: "English ___ (speak) in many countries.", accept: ["is spoken"], why: "Факт в настоящем — is + V3 (speak — spoke — spoken)." },
      { type: "text", q: "The new sports centre ___ (open) last month.", accept: ["was opened"], why: "Last month — Past Simple Passive: was + V3." },
      { type: "choice", q: "My bike ___ yesterday!", opts: ["stole", "was stolen", "is stolen"], a: 1, why: "Велосипед сам не крадёт, его украли — was stolen." },
      { type: "text", q: "These phones ___ (make) in China.", accept: ["are made"], why: "Подлежащее во множественном числе, настоящее — are + V3." },
      { type: "choice", q: "The letters ___ by the postman this morning.", opts: ["were delivered", "was delivered", "delivered"], a: 0, why: "Letters — множественное число, прошлое — were + V3." },
      { type: "text", q: "The windows ___ (not / clean) last week.", accept: ["weren't cleaned", "were not cleaned"], why: "Отрицание в Past Simple Passive: were not + V3." },
      { type: "choice", q: "___ the tickets sold online?", opts: ["Do", "Are", "Is"], a: 1, why: "Вопрос в пассиве: be выносится вперёд; tickets — множественное, поэтому Are." },
      { type: "choice", q: "Harry Potter was written ___ J. K. Rowling.", opts: ["by", "with", "from"], a: 0, why: "Исполнитель в пассиве вводится предлогом by." }
    ]
  },
  {
    id: "b1-relative-clauses", level: "B1", title: "Relative clauses: who / which / that / where / whose",
    rule: {
      intro: "Придаточные определительные уточняют, о ком или о чём идёт речь (русские «который», «где», «чей»).",
      blocks: [
        { h: "Слова", rows: [
          ["who — люди", "The boy who lives next door is my friend."],
          ["which — предметы, животные", "The bike which I bought is red."],
          ["that — люди и предметы (неформально)", "The film that we saw was great."],
          ["where — место", "This is the school where my mum works."],
          ["whose — чей", "I met a girl whose dad is a pilot."]
        ] },
        { h: "С запятыми (дополнительная информация)", rows: [
          ["только who / which, that нельзя", "My brother, who lives in Kazan, is a doctor."]
        ] },
        { h: "Когда слово можно опустить", rows: [
          ["если оно — дополнение (после него идёт подлежащее)", "The film (that) we saw was great."],
          ["если оно — подлежащее, опускать нельзя", "The girl who won is my sister."]
        ] }
      ],
      tips: [
        "Не повторяй местоимение внутри придаточного: The book which I read (не The book which I read it).",
        "Whose и who's — разные слова: whose = «чей», who's = who is.",
        "После запятой that не ставится: Moscow, which is huge, … (не Moscow, that is huge)."
      ]
    },
    items: [
      { type: "choice", q: "The girl ___ sits next to me is from Spain.", opts: ["which", "who", "whose"], a: 1, why: "Речь о человеке, и слово — подлежащее придаточного: who." },
      { type: "choice", q: "This is the café ___ we first met.", opts: ["which", "where", "who"], a: 1, why: "Место, где что-то произошло, — where." },
      { type: "choice", q: "I have a friend ___ brother plays in a band.", opts: ["who", "whose", "who's"], a: 1, why: "«Чей брат» — whose." },
      { type: "text", q: "The book ___ is on the table is mine.", accept: ["which", "that"], why: "Предмет, без запятых — which или that." },
      { type: "choice", q: "My sister, ___ lives in Paris, is a designer.", opts: ["that", "who", "which"], a: 1, why: "С запятыми that нельзя; о человеке — who." },
      { type: "choice", q: "Moscow, ___ is the capital of Russia, is a huge city.", opts: ["that", "which", "where"], a: 1, why: "С запятыми — which; where не подходит, потому что слово здесь подлежащее." },
      { type: "text", q: "Do you know the man ___ car is parked outside?", accept: ["whose"], why: "«Чья машина» — whose." },
      { type: "text", q: "This is the town ___ my grandparents were born.", accept: ["where", "in which"], why: "Место — where (или формально in which)." },
      { type: "choice", q: "In which sentence can the relative pronoun be left out?", opts: ["The boy who won the race is my cousin.", "The film that we watched was boring.", "The dog which bit me was huge."], a: 1, why: "That здесь дополнение (we watched the film), поэтому его можно опустить." },
      { type: "text", q: "I like people ___ are honest.", accept: ["who", "that"], why: "О людях — who или that." }
    ]
  },
  {
    id: "b1-gerund-infinitive", level: "B1", title: "Gerund or infinitive",
    rule: {
      intro: "После одних глаголов идёт -ing (герундий), после других — to + V (инфинитив). Это нужно запоминать списками.",
      blocks: [
        { h: "+ V-ing", rows: [
          ["enjoy, mind, avoid, finish, suggest, keep, practise", "I enjoy playing the guitar."],
          ["после предлогов", "She's good at drawing."]
        ] },
        { h: "+ to V", rows: [
          ["want, decide, hope, plan, agree, promise, refuse, learn", "We decided to go to the cinema."],
          ["would like / would love", "I'd like to try sushi."]
        ] },
        { h: "+ V без to", rows: [
          ["make, let, can, must, should", "My parents let me stay up late."]
        ] },
        { h: "Смысл меняется", rows: [
          ["stop doing — перестать", "He stopped eating sweets."],
          ["stop to do — остановиться, чтобы", "He stopped to buy a drink."],
          ["remember/forget to do — не забыть сделать", "Remember to call Mum!"],
          ["remember/forget doing — помнить, что сделал", "I remember meeting him."]
        ] }
      ],
      tips: [
        "После предлога всегда -ing: I'm interested in learning Spanish (не in learn).",
        "После let и make частица to не нужна: Mum made me tidy my room (не made me to tidy).",
        "Enjoy + -ing, а не инфинитив: I enjoy swimming (не I enjoy to swim)."
      ]
    },
    items: [
      { type: "choice", q: "I enjoy ___ to music.", opts: ["listen", "to listen", "listening"], a: 2, why: "Enjoy + V-ing." },
      { type: "choice", q: "She decided ___ a new language.", opts: ["learning", "to learn", "learn"], a: 1, why: "Decide + to V." },
      { type: "text", q: "Would you mind ___ (open) the window?", accept: ["opening"], why: "Mind + V-ing." },
      { type: "text", q: "We hope ___ (visit) London next year.", accept: ["to visit"], why: "Hope + to V." },
      { type: "choice", q: "He's good at ___ basketball.", opts: ["play", "to play", "playing"], a: 2, why: "После предлога at — V-ing." },
      { type: "choice", q: "I stopped ___ a drink because I was thirsty.", opts: ["to buy", "buying", "buy"], a: 0, why: "Остановился, чтобы купить, — stop to do." },
      { type: "text", q: "Remember ___ (lock) the door when you leave!", accept: ["to lock"], why: "Не забыть сделать в будущем — remember to do." },
      { type: "text", q: "I'll never forget ___ (meet) my favourite singer last year.", accept: ["meeting"], why: "Вспоминание о том, что уже было, — forget doing." },
      { type: "choice", q: "My parents let me ___ to the party.", opts: ["go", "to go", "going"], a: 0, why: "Let + V без to." },
      { type: "choice", q: "Avoid ___ too much sugar.", opts: ["to eat", "eating", "eat"], a: 1, why: "Avoid + V-ing." }
    ]
  },
  {
    id: "b1-reported-statements", level: "B1", title: "Reported speech: statements",
    rule: {
      intro: "Косвенная речь пересказывает чужие слова. Если глагол said/told в прошедшем, время обычно сдвигается на шаг назад, а местоимения и слова времени и места меняются по смыслу.",
      blocks: [
        { h: "Сдвиг времён", rows: [
          ["Present Simple → Past Simple", "\"I like it.\" → She said she liked it."],
          ["Present Continuous → Past Continuous", "\"I'm reading.\" → He said he was reading."],
          ["Present Perfect / Past Simple → Past Perfect", "\"I've finished.\" → She said she had finished."],
          ["will → would, can → could", "\"I'll help.\" → He said he would help."]
        ] },
        { h: "Слова времени и места", rows: [
          ["now → then, today → that day", "She said she was busy that day."],
          ["tomorrow → the next day, yesterday → the day before", "He said he would come the next day."],
          ["here → there, this → that", "She said that bag was hers."]
        ] },
        { h: "say или tell", rows: [
          ["say (that) …", "He said (that) he was tired."],
          ["tell + кому + (that) …", "He told me (that) he was tired."]
        ] }
      ],
      tips: [
        "Tell требует, кому сказали: She told me… (не She told that…); say — без человека: She said that…",
        "В косвенной речи прямой порядок слов и без кавычек: He said he was hungry (не He said: I am hungry).",
        "Не забывай менять местоимения: \"I love my dog\" → She said she loved her dog."
      ]
    },
    items: [
      { type: "choice", q: "\"I'm hungry,\" Tom said yesterday. → Tom said he ___ hungry.", opts: ["is", "was", "will be"], a: 1, why: "Present Simple сдвигается в Past Simple: am → was." },
      { type: "choice", q: "\"I will help you,\" he said. → He said he ___ help me.", opts: ["will", "would", "can"], a: 1, why: "Will → would." },
      { type: "text", q: "\"I can swim,\" Anna said. → Anna said she ___ swim.", accept: ["could"], why: "Can → could." },
      { type: "text", q: "\"I saw the film,\" Max said. → Max said he ___ the film.", accept: ["had seen", "'d seen", "saw"], why: "Past Simple → Past Perfect (в разговорной речи можно оставить saw)." },
      { type: "choice", q: "She ___ me that she was busy.", opts: ["said", "told", "spoke"], a: 1, why: "Есть адресат (me) — told." },
      { type: "choice", q: "\"We are leaving tomorrow,\" they said last week. → They said they were leaving ___.", opts: ["tomorrow", "the next day", "yesterday"], a: 1, why: "Слова сказаны неделю назад, поэтому tomorrow → the next day." },
      { type: "text", q: "\"I have finished my homework,\" Lisa said. → Lisa said she ___ her homework.", accept: ["had finished", "'d finished"], why: "Present Perfect → Past Perfect." },
      { type: "text", q: "\"I don't like jazz,\" Kate said. → Kate said she ___ jazz.", accept: ["didn't like", "did not like", "doesn't like", "does not like"], why: "Обычно сдвиг: don't like → didn't like (без сдвига можно, если это всё ещё правда)." },
      { type: "choice", q: "\"This is my bag,\" he said. → He said that ___ was his bag.", opts: ["this", "that", "these"], a: 1, why: "This → that в косвенной речи." },
      { type: "text", q: "\"I am watching TV,\" Dan said. → Dan said he ___ TV.", accept: ["was watching"], why: "Present Continuous → Past Continuous: am watching → was watching." }
    ]
  }
);
