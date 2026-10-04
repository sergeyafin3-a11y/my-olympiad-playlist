window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "a2-present-simple-vs-continuous", level: "A2", title: "Present Simple vs Present Continuous",
    rule: {
      intro: "Present Simple — то, что бывает регулярно, привычки и факты. Present Continuous — то, что происходит прямо сейчас или в этот период.",
      blocks: [
        { h: "Present Simple: привычки и факты", rows: [
          ["I / you / we / they + V", "I play football on Saturdays."],
          ["he / she / it + V-s", "She walks to school every day."],
          ["отрицание: don't / doesn't + V", "He doesn't like coffee."],
          ["вопрос: Do / Does + подлежащее + V", "Do you live near here?"]
        ] },
        { h: "Present Continuous: сейчас", rows: [
          ["am / is / are + V-ing", "I'm doing my homework now."],
          ["отрицание: am not / isn't / aren't + V-ing", "They aren't watching TV."],
          ["вопрос: Am / Is / Are + подлежащее + V-ing", "Is it raining?"]
        ] },
        { h: "Слова-подсказки", rows: [
          ["Simple: always, usually, often, every day, on Mondays", "We often go to the cinema."],
          ["Continuous: now, at the moment, Look!, Listen!", "Look! The bus is coming."]
        ] }
      ],
      tips: [
        "Не забывайте -s у he/she/it: не \"She play tennis\", а \"She plays tennis\".",
        "Глаголы состояния (know, like, love, want, understand) обычно не ставят в Continuous: не \"I am knowing\", а \"I know\".",
        "В Continuous нужен глагол be: не \"I reading now\", а \"I'm reading now\"."
      ]
    },
    items: [
      { type: "choice", q: "Listen! Somebody ___ the piano upstairs.", opts: ["plays", "is playing", "play"], a: 1, why: "Listen! — действие происходит прямо сейчас, нужен Present Continuous." },
      { type: "choice", q: "My brother ___ football every Saturday.", opts: ["plays", "is playing", "play"], a: 0, why: "every Saturday — регулярное действие, Present Simple; he → plays." },
      { type: "choice", q: "I ___ what you mean.", opts: ["understand", "am understanding", "understands"], a: 0, why: "understand — глагол состояния, в Continuous не употребляется." },
      { type: "choice", q: "Look! It ___ outside. Take an umbrella.", opts: ["rains", "is raining", "rain"], a: 1, why: "Look! — дождь идёт сейчас, Present Continuous." },
      { type: "text", q: "She usually ___ (walk) to school.", accept: ["walks"], why: "usually — привычка, Present Simple; she → окончание -s." },
      { type: "text", q: "We ___ (not / watch) TV right now, we are doing our homework.", accept: ["aren't watching", "are not watching"], why: "right now — Present Continuous: are not + V-ing." },
      { type: "text", q: "How often ___ (you / go) to the cinema?", accept: ["do you go"], why: "How often — вопрос о регулярности, Present Simple: do + you + V." },
      { type: "choice", q: "At the moment Kate ___ for her exam.", opts: ["studies", "is studying", "study"], a: 1, why: "At the moment — сейчас, Present Continuous." },
      { type: "choice", q: "Water ___ at 100 degrees.", opts: ["boils", "is boiling", "boil"], a: 0, why: "Научный факт — Present Simple; water (it) → boils." },
      { type: "text", q: "Shh! The baby ___ (sleep).", accept: ["is sleeping"], why: "Shh! — действие происходит сейчас: is + sleeping." }
    ]
  },
  {
    id: "a2-past-simple", level: "A2", title: "Past Simple (regular and irregular verbs)",
    rule: {
      intro: "Past Simple — законченное действие в прошлом, часто с указанием времени: yesterday, last week, two days ago, in 2020.",
      blocks: [
        { h: "Утверждение", rows: [
          ["правильные: V + -ed", "We watched a film yesterday."],
          ["study → studied, stop → stopped", "I studied all evening."],
          ["неправильные: 2-я форма", "go → went, buy → bought, see → saw"]
        ] },
        { h: "Отрицание и вопрос", rows: [
          ["didn't + V (начальная форма)", "She didn't call me."],
          ["Did + подлежащее + V?", "Did you see the match?"],
          ["Wh- + did + подлежащее + V?", "Where did you go last summer?"]
        ] },
        { h: "Глагол be", rows: [
          ["I / he / she / it + was", "I was at home yesterday."],
          ["you / we / they + were", "Were you at the party?"]
        ] }
      ],
      tips: [
        "После did / didn't глагол в начальной форме: не \"Did you went?\", а \"Did you go?\"",
        "Не добавляйте -ed к неправильным глаголам: не \"goed\", а \"went\". Таблицу неправильных глаголов надо учить.",
        "С ago, yesterday, last … нужен Past Simple, а не Present Perfect: \"I saw him two days ago.\""
      ]
    },
    items: [
      { type: "choice", q: "We ___ to Sochi last summer.", opts: ["go", "went", "goed", "gone"], a: 1, why: "go — неправильный глагол, вторая форма — went." },
      { type: "text", q: "I ___ (buy) new headphones yesterday.", accept: ["bought"], why: "buy — неправильный глагол: buy → bought." },
      { type: "text", q: "She ___ (not / call) me last night.", accept: ["didn't call", "did not call"], why: "Отрицание: didn't + начальная форма глагола." },
      { type: "choice", q: "___ you see the match on Sunday?", opts: ["Do", "Did", "Were"], a: 1, why: "on Sunday — прошлое; вопрос с глаголом see строится через Did." },
      { type: "choice", q: "He didn't ___ his homework.", opts: ["do", "did", "does"], a: 0, why: "После didn't — начальная форма глагола." },
      { type: "text", q: "They ___ (stop) the car near the river.", accept: ["stopped"], why: "stop → stopped: после короткого ударного слога согласная удваивается." },
      { type: "choice", q: "Where ___ you yesterday evening?", opts: ["was", "were", "did"], a: 1, why: "Глагол be в прошлом: you → were." },
      { type: "text", q: "We ___ (study) for the test all weekend.", accept: ["studied"], why: "study → studied: y после согласной меняется на i." },
      { type: "choice", q: "My parents ___ married in 2005.", opts: ["get", "got", "getted"], a: 1, why: "in 2005 — прошлое; get → got." },
      { type: "choice", q: "I ___ a great film two days ago.", opts: ["see", "saw", "have seen", "seen"], a: 1, why: "ago — точное время в прошлом, нужен Past Simple: saw." }
    ]
  },
  {
    id: "a2-past-continuous", level: "A2", title: "Past Continuous",
    rule: {
      intro: "Past Continuous — действие, которое длилось в определённый момент в прошлом. Часто его прерывает короткое действие в Past Simple.",
      blocks: [
        { h: "Форма", rows: [
          ["I / he / she / it + was + V-ing", "I was reading at 9 p.m."],
          ["you / we / they + were + V-ing", "They were playing football."],
          ["wasn't / weren't + V-ing", "We weren't sleeping."],
          ["Was / Were + подлежащее + V-ing?", "What were you doing?"]
        ] },
        { h: "Когда использовать", rows: [
          ["процесс в момент прошлого", "At 8 p.m. yesterday I was having dinner."],
          ["длинное действие прерывается коротким (when)", "I was walking home when I met Max."],
          ["два процесса одновременно (while)", "While I was cooking, she was setting the table."]
        ] }
      ],
      tips: [
        "Длинный фон — Past Continuous, короткое событие — Past Simple: не \"I walked when I was meeting him\", а \"I was walking when I met him\".",
        "Следите за was/were: не \"they was\", а \"they were\".",
        "После while обычно идёт процесс: \"While we were listening to music, the lights went out.\""
      ]
    },
    items: [
      { type: "choice", q: "At 8 p.m. yesterday I ___ dinner.", opts: ["was having", "were having", "am having"], a: 0, why: "Процесс в момент прошлого; I → was + V-ing." },
      { type: "choice", q: "While we ___ to music, the lights went out.", opts: ["are listening", "were listening", "was listening"], a: 1, why: "Длинный процесс в прошлом; we → were + V-ing." },
      { type: "text", q: "She ___ (read) a book when I came in.", accept: ["was reading"], why: "Длинное действие, которое прервали: was + V-ing." },
      { type: "text", q: "They ___ (not / sleep) at midnight.", accept: ["weren't sleeping", "were not sleeping"], why: "Процесс в момент прошлого, отрицание: weren't + V-ing." },
      { type: "choice", q: "I was walking home when I ___ my old friend.", opts: ["was meeting", "met", "meet"], a: 1, why: "Короткое событие, прервавшее процесс, — Past Simple." },
      { type: "choice", q: "What ___ you doing at 10 o'clock last night?", opts: ["did", "were", "was"], a: 1, why: "Вопрос в Past Continuous: were + you + V-ing." },
      { type: "text", q: "It ___ (rain) when we left school.", accept: ["was raining"], why: "Фон в прошлом (шёл дождь): was + V-ing." },
      { type: "choice", q: "When the teacher came in, the students ___ loudly.", opts: ["are talking", "were talking", "was talking"], a: 1, why: "Процесс уже шёл, когда учитель вошёл; students → were." },
      { type: "choice", q: "Tom ___ his phone when he was riding his bike.", opts: ["dropped", "was dropping", "drops"], a: 0, why: "Уронить — короткое событие на фоне процесса, Past Simple." },
      { type: "text", q: "While Anna ___ (cook), her brother was setting the table.", accept: ["was cooking"], why: "Два процесса одновременно: was + V-ing." }
    ]
  },
  {
    id: "a2-comparatives", level: "A2", title: "Comparatives and superlatives",
    rule: {
      intro: "Сравнительная степень сравнивает два предмета (больше, лучше), превосходная выделяет один из группы (самый большой).",
      blocks: [
        { h: "Короткие прилагательные", rows: [
          ["adj + -er + than", "Moscow is bigger than Kazan."],
          ["the + adj + -est", "It's the hottest day of the year."],
          ["easy → easier → the easiest", "This test is easier."]
        ] },
        { h: "Длинные прилагательные", rows: [
          ["more + adj + than", "My phone is more expensive than yours."],
          ["the most + adj", "Maths is the most interesting subject."]
        ] },
        { h: "Исключения и as … as", rows: [
          ["good → better → the best", "This is the best pizza in town."],
          ["bad → worse → the worst", "Today is worse than yesterday."],
          ["(not) as + adj + as", "I'm not as tall as my brother."]
        ] }
      ],
      tips: [
        "Не смешивайте два способа: не \"more easier\", а \"easier\".",
        "После сравнительной степени — than, а не that или as: \"She is older than me.\"",
        "Перед превосходной степенью нужен the: не \"most beautiful city\", а \"the most beautiful city\"."
      ]
    },
    items: [
      { type: "choice", q: "This test is ___ than the last one.", opts: ["easy", "easier", "more easy", "easiest"], a: 1, why: "easy → easier: y меняется на i, добавляем -er." },
      { type: "text", q: "Moscow is ___ (big) than Kazan.", accept: ["bigger"], why: "big → bigger: согласная удваивается." },
      { type: "text", q: "This is the ___ (good) pizza in town.", accept: ["best"], why: "good → better → the best — исключение." },
      { type: "choice", q: "My phone is ___ than yours.", opts: ["more expensive", "expensiver", "most expensive"], a: 0, why: "Длинное прилагательное: more + adj + than." },
      { type: "choice", q: "Everest is ___ mountain in the world.", opts: ["the highest", "higher", "the most high"], a: 0, why: "Самая высокая из всех — превосходная степень: the highest." },
      { type: "text", q: "Today is ___ (bad) than yesterday.", accept: ["worse"], why: "bad → worse → the worst — исключение." },
      { type: "choice", q: "Maths is ___ interesting subject for me.", opts: ["most", "the most", "more"], a: 1, why: "Превосходная степень длинного прилагательного: the most + adj." },
      { type: "choice", q: "My sister is not as tall ___ me.", opts: ["than", "as", "that"], a: 1, why: "Конструкция as … as: not as tall as." },
      { type: "text", q: "It's the ___ (hot) day of the year.", accept: ["hottest"], why: "hot → the hottest: согласная удваивается." },
      { type: "choice", q: "Your English is getting ___!", opts: ["better and better", "more good", "gooder"], a: 0, why: "good → better; \"всё лучше и лучше\" — better and better." }
    ]
  },
  {
    id: "a2-will-going-to", level: "A2", title: "Future: will vs be going to",
    rule: {
      intro: "Will — решение, принятое в момент речи, обещание, предсказание-мнение. Be going to — план, который уже есть, и прогноз по видимым признакам.",
      blocks: [
        { h: "Форма", rows: [
          ["will / won't + V", "I'll help you. I won't tell anyone."],
          ["am / is / are + going to + V", "We're going to visit Paris."],
          ["isn't / aren't going to + V", "He isn't going to study medicine."]
        ] },
        { h: "Will", rows: [
          ["решение прямо сейчас", "The phone is ringing! — I'll answer it."],
          ["обещание, предложение помощи", "I promise I won't be late."],
          ["предсказание-мнение (I think, maybe)", "Maybe people will live on Mars."]
        ] },
        { h: "Be going to", rows: [
          ["заранее принятый план", "I've saved money. I'm going to buy a laptop."],
          ["прогноз по тому, что видим", "Look at those clouds! It's going to rain."]
        ] }
      ],
      tips: [
        "После will — глагол без to: не \"I will to go\", а \"I will go\".",
        "В going to нужен глагол be: не \"I going to\", а \"I'm going to\".",
        "Если решение уже принято до разговора, это going to: \"We've bought tickets. We're going to fly to Rome.\""
      ]
    },
    items: [
      { type: "choice", q: "Look at those black clouds! It ___ rain.", opts: ["will", "is going to", "rains"], a: 1, why: "Прогноз по видимым признакам (тучи) — be going to." },
      { type: "choice", q: "— I'm thirsty. — Wait, I ___ get you some water.", opts: ["will", "am going to", "going to"], a: 0, why: "Решение помочь принято прямо сейчас — will." },
      { type: "text", q: "We have bought tickets. We ___ (visit) Paris in May.", accept: ["are going to visit", "are visiting"], why: "Билеты уже куплены — это план: are going to visit (договорённость можно выразить и Present Continuous: are visiting)." },
      { type: "choice", q: "I promise I ___ tell anyone.", opts: ["won't", "not going to", "don't"], a: 0, why: "Обещание — will; отрицание: won't." },
      { type: "text", q: "The phone is ringing! — ___ (I / answer) it.", accept: ["I'll answer", "I will answer"], why: "Решение в момент речи — will: I'll answer." },
      { type: "choice", q: "She has saved money because she ___ buy a new laptop.", opts: ["will", "is going to", "going"], a: 1, why: "Деньги уже копит — план принят заранее, be going to." },
      { type: "choice", q: "Maybe people ___ live on Mars one day.", opts: ["will", "is going to", "are live"], a: 0, why: "Предположение без видимых признаков (maybe) — will." },
      { type: "text", q: "He ___ (be going to / not / study) medicine. He has decided to become a designer.", accept: ["isn't going to study", "is not going to study"], why: "Решение уже принято — be going to; отрицание: isn't going to." },
      { type: "choice", q: "Oh no, I forgot my wallet! — Don't worry, I ___ pay for you.", opts: ["will", "am going to", "pay"], a: 0, why: "Предложение помощи, решённое в момент речи, — will." },
      { type: "choice", q: "What ___ you going to do after school?", opts: ["are", "will", "do"], a: 0, why: "В going to нужен be: are you going to." }
    ]
  },
  {
    id: "a2-quantifiers", level: "A2", title: "some / any / much / many / a lot of",
    rule: {
      intro: "Эти слова обозначают количество. Выбор зависит от типа предложения и от того, можно ли предмет посчитать.",
      blocks: [
        { h: "some / any", rows: [
          ["some — утверждение", "I've got some friends in Spain."],
          ["any — вопрос и отрицание", "Are there any cafés here? There isn't any milk."],
          ["some — просьба и предложение", "Would you like some tea? Can I have some water?"]
        ] },
        { h: "much / many / a lot of", rows: [
          ["many + исчисляемые (мн. ч.)", "How many apples do you need?"],
          ["much + неисчисляемые", "We don't have much time."],
          ["a lot of — с любыми, чаще в утверждении", "There are a lot of people here."]
        ] }
      ],
      tips: [
        "Деньги, время, вода, информация — неисчисляемые: не \"many money\", а \"much money\".",
        "В утвердительном предложении лучше a lot of, а не much: не \"I have much homework\", а \"I have a lot of homework\".",
        "В вежливой просьбе и предложении — some, хотя это вопрос: \"Would you like some cake?\""
      ]
    },
    items: [
      { type: "choice", q: "There isn't ___ milk in the fridge.", opts: ["some", "any", "many"], a: 1, why: "Отрицание — any; milk неисчисляемое, many не подходит." },
      { type: "choice", q: "How ___ apples do you need?", opts: ["much", "many", "any"], a: 1, why: "apples — исчисляемые, How many." },
      { type: "choice", q: "How ___ money have you got?", opts: ["many", "much", "a lot"], a: 1, why: "money — неисчисляемое, How much." },
      { type: "text", q: "Can I have ___ (some / any) water, please?", accept: ["some"], why: "Вежливая просьба — some." },
      { type: "choice", q: "She has got ___ friends at school.", opts: ["a lot of", "much", "any"], a: 0, why: "Утверждение с исчисляемым существительным — a lot of." },
      { type: "text", q: "We don't have ___ (much / many) time.", accept: ["much"], why: "time — неисчисляемое, значит much." },
      { type: "text", q: "Are there ___ (some / any) good cafés near here?", accept: ["any"], why: "Обычный вопрос — any." },
      { type: "choice", q: "I don't eat ___ sweets.", opts: ["much", "many", "some"], a: 1, why: "sweets — исчисляемые во мн. ч., в отрицании — many." },
      { type: "choice", q: "There are ___ people in the park today.", opts: ["much", "a lot of", "any"], a: 1, why: "Утверждение, people исчисляемое — a lot of." },
      { type: "text", q: "Would you like ___ (some / any) tea?", accept: ["some"], why: "Предложение (Would you like…?) — some." }
    ]
  },
  {
    id: "a2-present-perfect", level: "A2", title: "Present Perfect: ever, never, just, already, yet",
    rule: {
      intro: "Present Perfect связывает прошлое с настоящим: важен результат или опыт, а не точное время.",
      blocks: [
        { h: "Форма", rows: [
          ["have / has + V3", "I have seen this film."],
          ["haven't / hasn't + V3", "She hasn't finished yet."],
          ["Have / Has + подлежащее + V3?", "Have you ever been to London?"]
        ] },
        { h: "Слова-маркеры", rows: [
          ["ever — когда-нибудь (вопрос)", "Have you ever eaten sushi?"],
          ["never — никогда", "I have never flown."],
          ["just — только что", "They have just arrived."],
          ["already — уже", "We have already seen it."],
          ["yet — ещё (отрицание), уже (вопрос); в конце", "I haven't done it yet. Have you finished yet?"]
        ] }
      ],
      tips: [
        "С точным временем в прошлом (yesterday, last year, ago) — Past Simple: не \"I have been there last year\", а \"I went there last year\".",
        "ever, never, just, already ставятся между have и V3, а yet — в конце: \"I have just eaten\", \"I haven't eaten yet\".",
        "been to — съездил и вернулся; gone to — уехал и ещё там: \"She has been to Italy\" (опыт)."
      ]
    },
    items: [
      { type: "choice", q: "Have you ___ been to London?", opts: ["ever", "never", "yet"], a: 0, why: "Вопрос об опыте «когда-нибудь» — ever." },
      { type: "text", q: "I have ___ (never / ever) eaten sushi.", accept: ["never"], why: "Утверждение «никогда не ел» — never." },
      { type: "choice", q: "She has ___ finished her homework. She's free now.", opts: ["just", "yet", "ever"], a: 0, why: "«Только что закончила» — just; yet ставится в конце, ever — в вопросах." },
      { type: "choice", q: "I haven't done my project ___.", opts: ["already", "yet", "just"], a: 1, why: "В отрицании в конце предложения — yet («ещё не»)." },
      { type: "text", q: "We ___ (already / see) this film.", accept: ["have already seen"], why: "have + already + V3: see → seen." },
      { type: "text", q: "He ___ (not / finish) the book yet.", accept: ["hasn't finished", "has not finished"], why: "he → has; отрицание: hasn't + V3." },
      { type: "choice", q: "Oh no! Somebody ___ my bike!", opts: ["has stolen", "have stolen", "stealed"], a: 0, why: "Важен результат сейчас; somebody → has; steal → stolen." },
      { type: "choice", q: "Has she ___ to Italy?", opts: ["be", "been", "was"], a: 1, why: "После has — третья форма: been." },
      { type: "text", q: "They ___ (just / arrive).", accept: ["have just arrived"], why: "have + just + V3: arrive → arrived." },
      { type: "choice", q: "I ___ to Paris last year.", opts: ["have been", "went", "have gone"], a: 1, why: "last year — точное время в прошлом, нужен Past Simple." }
    ]
  },
  {
    id: "a2-must-have-to-should", level: "A2", title: "must / have to / should",
    rule: {
      intro: "Must и have to выражают обязанность, should — совет. Mustn't — запрет, а don't have to — «не обязательно».",
      blocks: [
        { h: "Обязанность и запрет", rows: [
          ["must + V — надо (так считает говорящий, правило)", "I must call my grandma."],
          ["have to / has to + V — надо (из-за обстоятельств)", "She has to wear a uniform."],
          ["mustn't + V — нельзя", "You mustn't cross the road on a red light."],
          ["don't / doesn't have to + V — не обязательно", "I don't have to get up early on Sunday."]
        ] },
        { h: "Совет", rows: [
          ["should / shouldn't + V", "You should go to bed early."],
          ["Should I …? — просьба о совете", "Should I take an umbrella?"]
        ] },
        { h: "Прошлое и вопросы", rows: [
          ["had to + V — пришлось", "Yesterday I had to wait an hour."],
          ["Do / Does … have to …?", "Do we have to bring our books?"]
        ] }
      ],
      tips: [
        "После must и should — глагол без to: не \"You must to go\", а \"You must go\".",
        "mustn't ≠ don't have to: \"You mustn't run\" — нельзя, \"You don't have to run\" — можно не бежать.",
        "У must нет прошедшего времени — используйте had to: \"I had to stay at home.\""
      ]
    },
    items: [
      { type: "choice", q: "You look tired. You ___ go to bed early.", opts: ["should", "must to", "have"], a: 0, why: "Совет — should + глагол без to." },
      { type: "choice", q: "Students ___ use phones during exams. It's a school rule.", opts: ["mustn't", "don't have to", "shouldn't to"], a: 0, why: "Правило-запрет — mustn't («нельзя»)." },
      { type: "choice", q: "Tomorrow is Sunday, so I ___ get up early.", opts: ["mustn't", "don't have to", "haven't to"], a: 1, why: "«Не обязательно» — don't have to." },
      { type: "text", q: "She ___ (have to) wear a uniform at her school.", accept: ["has to"], why: "she → has to." },
      { type: "text", q: "You ___ (not / should) eat so much fast food.", accept: ["shouldn't", "should not"], why: "Совет «не стоит» — shouldn't + V." },
      { type: "choice", q: "___ we have to bring our books tomorrow?", opts: ["Do", "Must", "Should"], a: 0, why: "Вопрос с have to строится через Do." },
      { type: "text", q: "Yesterday I ___ (have to) wait for the bus for an hour.", accept: ["had to"], why: "Обязанность в прошлом — had to." },
      { type: "choice", q: "You ___ cross the road when the light is red. It's dangerous!", opts: ["mustn't", "don't have to", "must"], a: 0, why: "Опасно — значит запрет: mustn't." },
      { type: "choice", q: "He ___ study harder if he wants to pass.", opts: ["should", "shoulds", "should to"], a: 0, why: "should не меняется по лицам и стоит без to." },
      { type: "text", q: "My dad ___ (not / have to) work on Saturdays.", accept: ["doesn't have to", "does not have to"], why: "he → doesn't have to: «не обязан»." }
    ]
  }
);
