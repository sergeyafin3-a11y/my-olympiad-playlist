window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-collocations", group: "Collocations & idioms",
    title: "Collocations: make / do, take / have, heavy rain, strong coffee…",
    rule: {
      intro: "Проверяют устойчивые сочетания: какой глагол или прилагательное «дружит» с данным существительным. Переводить дословно с русского нельзя — запоминай пары целиком.",
      blocks: [
        { h: "Make или do", rows: [
          ["make a mistake / a decision / a profit / a difference", "make — создаём результат: She made a mistake."],
          ["do homework / the shopping / someone a favour / one's best", "do — выполняем действие, работу: Could you do me a favour?"],
          ["make friends / an effort / a noise / progress", "He made a lot of progress this year."]
        ] },
        { h: "Take или have", rows: [
          ["take / have a break, a shower, a look", "оба варианта возможны (take — чаще AmE): Let's take a break."],
          ["take a photo / an exam / part in / place", "только take: The concert took place in May."],
          ["have breakfast / a party / a good time / fun", "только have: We had a great time."]
        ] },
        { h: "Прилагательное + существительное", rows: [
          ["heavy rain / traffic / smoker", "сильный (о количестве) — не strong rain: heavy traffic."],
          ["strong coffee / wind / accent", "крепкий, сильный: strong coffee."],
          ["high temperature, deep sleep, bitter disappointment", "high price, not expensive price."]
        ] }
      ],
      tips: [
        "Если не уверен в make/do: do — про работу и задания (do the washing), make — про то, что появляется в результате (make a cake).",
        "Не переводи «сильный» всегда как strong: «сильный дождь» — heavy rain, «сильная боль» — severe/sharp pain.",
        "Учи сочетания блоками в предложении: I made a decision, not I did a decision."
      ]
    },
    items: [
      { type: "choice", q: "Could you ___ me a favour and close the window?", opts: ["make", "do", "give", "take"], a: 1, why: "do someone a favour — устойчивое сочетание." },
      { type: "choice", q: "We were caught in ___ rain on the way home.", opts: ["heavy", "strong", "thick", "big"], a: 0, why: "Сильный дождь — heavy rain, не strong rain." },
      { type: "text", q: "She ___ two silly mistakes in the last exercise. (past tense)", accept: ["made"], why: "make a mistake → made." },
      { type: "text", q: "We need to ___ a final decision by Friday.", accept: ["make", "take", "reach", "come to"], why: "make a decision (BrE допускает и take a decision; также reach / come to a decision)." },
      { type: "choice", q: "I can't sleep if I drink ___ coffee in the evening.", opts: ["strong", "powerful", "heavy", "thick"], a: 0, why: "Крепкий кофе — strong coffee." },
      { type: "text", q: "Let's ___ a short break — we've been working for three hours.", accept: ["take", "have"], why: "take a break / have a break — оба верны." },
      { type: "choice", q: "He ___ all his homework in twenty minutes.", opts: ["did", "made", "took", "had"], a: 0, why: "do homework → did." },
      { type: "choice", q: "The company ___ a profit for the first time last year.", opts: ["did", "made", "took", "had"], a: 1, why: "make a profit → made (не do a profit)." },
      { type: "choice", q: "My grandfather was a ___ smoker; he got through two packs a day.", opts: ["heavy", "strong", "large", "thick"], a: 0, why: "Заядлый курильщик — heavy smoker." },
      { type: "text", q: "Don't worry, it doesn't ___ any difference to me.", accept: ["make"], why: "make a difference — иметь значение." }
    ]
  },
  {
    id: "lx-idioms", group: "Collocations & idioms",
    title: "Idioms: body, animals, colours, theatre",
    rule: {
      intro: "Идиомы нельзя понять по отдельным словам — значение у всего выражения. На олимпиаде обычно пропущено одно ключевое слово: вспомни выражение целиком.",
      blocks: [
        { h: "Части тела", rows: [
          ["not bat an eyelid", "глазом не моргнуть: He didn't bat an eyelid at the price."],
          ["catch someone red-handed", "поймать с поличным: She was caught red-handed."],
          ["pull someone's leg", "разыгрывать: Are you pulling my leg?"]
        ] },
        { h: "Животные", rows: [
          ["let the cat out of the bag", "проболтаться о секрете: Who let the cat out of the bag?"],
          ["a white elephant", "дорогая бесполезная вещь: The stadium became a white elephant."],
          ["the lion's share", "бо́льшая часть: He took the lion's share of the profit."]
        ] },
        { h: "Цвета и прочее", rows: [
          ["green with envy", "позеленеть от зависти: She was green with envy."],
          ["under the weather", "нездоровится: I'm a bit under the weather."],
          ["beat about the bush; a piece of cake", "ходить вокруг да около; проще простого"]
        ] },
        { h: "Театр", rows: [
          ["break a leg", "ни пуха ни пера (актёру перед выходом): Break a leg tonight!"],
          ["steal the show", "затмить всех: The child actor stole the show."],
          ["behind the scenes", "за кулисами, тайно: deals made behind the scenes"]
        ] }
      ],
      tips: [
        "Цвета в идиомах не совпадают с русскими: зависть — green (green with envy), а не жёлтая.",
        "Ищи подсказку в контексте: «на сцене», «перед спектаклем» → театральная идиома (break a leg).",
        "Учи идиому с примером-историей: The surprise was ruined when Tom let the cat out of the bag."
      ]
    },
    items: [
      { type: "choice", q: "\"Break a ___!\" the director whispered to the actors before the curtain went up.", opts: ["leg", "arm", "neck", "nail"], a: 0, why: "Break a leg — пожелание удачи актёру." },
      { type: "text", q: "I'm feeling a bit under the ___ today, so I'll stay at home.", accept: ["weather"], why: "under the weather — нездоровится." },
      { type: "choice", q: "When she saw the bill, she didn't bat an ___.", opts: ["eyelid", "ear", "eyebrow", "nose"], a: 0, why: "not bat an eyelid — глазом не моргнуть." },
      { type: "text", q: "Stop beating about the ___ and tell me what really happened.", accept: ["bush"], why: "beat about the bush — ходить вокруг да около." },
      { type: "choice", q: "The old castle is a ___ elephant: it costs a fortune to maintain and nobody uses it.", opts: ["white", "grey", "pink", "black"], a: 0, why: "white elephant — дорогая бесполезная вещь." },
      { type: "text", q: "The boy was caught red-___ taking biscuits from the jar.", accept: ["handed"], why: "red-handed — с поличным." },
      { type: "choice", q: "When she got the job, her rival was ___ with envy.", opts: ["green", "red", "blue", "yellow"], a: 0, why: "green with envy — зелёный от зависти." },
      { type: "text", q: "The youngest dancer stole the ___ — everyone was talking about her afterwards.", accept: ["show"], why: "steal the show — затмить всех." },
      { type: "choice", q: "After all that practice, the exam was a piece of ___ for her.", opts: ["cake", "pie", "bread", "biscuit"], a: 0, why: "a piece of cake — проще простого." },
      { type: "text", q: "Don't let the ___ out of the bag — the party is supposed to be a surprise!", accept: ["cat"], why: "let the cat out of the bag — выдать секрет." }
    ]
  },
  {
    id: "lx-one-word", group: "Word play",
    title: "One word, three sentences (homonyms)",
    rule: {
      intro: "Одно слово в одной и той же форме подходит во все три пропуска, но в каждом предложении значит своё. Ищи слово с несколькими значениями (омоним или многозначное).",
      blocks: [
        { h: "Как искать", rows: [
          ["Начни с самого «узкого» предложения", "в нём меньше вариантов: Strike a ___ to light the fire → match."],
          ["Проверь часть речи", "слово может быть и существительным, и глаголом: a match / to match."],
          ["Проверь форму", "форма одна на все три: если в одном нужно -s, то во всех."]
        ] },
        { h: "Частые многозначные слова", rows: [
          ["bank, spring, fair, light", "берег/банк; весна/пружина/родник; честный/светлый/ярмарка; лёгкий/свет/зажечь"],
          ["train, match, note, present", "поезд/тренироваться; спичка/матч/подходить; записка/нота/заметить; присутствующий/подарок/настоящее"],
          ["crane, bark, mean, play", "кран/журавль/вытягивать (шею); лаять/кора; значить/злой, жадный/среднее; играть/пьеса"]
        ] }
      ],
      tips: [
        "Подставь кандидата во все три предложения вслух — если хоть одно звучит странно, ищи дальше.",
        "Помни про редкие значения: crane one's neck — вытягивать шею, a fair — ярмарка.",
        "Ответ — одно слово без артикля: bank, а не the bank."
      ]
    },
    items: [
      { type: "text", q: "We had a picnic on the ___ of the river. / She opened a savings account at the local ___. / You can ___ on me — I'll be there.", accept: ["bank"], why: "bank — берег; банк; bank on — рассчитывать на." },
      { type: "text", q: "The box is so ___ that a child could carry it. / Turn off the ___ before you leave. / Could you ___ the candles on the cake?", accept: ["light"], why: "light — лёгкий; свет; зажечь." },
      { type: "text", q: "It isn't ___ that he gets more pocket money than me. / She has ___ hair and blue eyes. / We bought wooden toys at the village ___.", accept: ["fair"], why: "fair — справедливый; светлый; ярмарка." },
      { type: "text", q: "Strike a ___ to light the fire. / The football ___ was cancelled because of snow. / Her shoes don't ___ her dress.", accept: ["match"], why: "match — спичка; матч; сочетаться." },
      { type: "text", q: "Cherry trees blossom in late ___. / The old mattress has a broken ___. / We drank cold water from a mountain ___.", accept: ["spring"], why: "spring — весна; пружина; родник." },
      { type: "text", q: "We took the early ___ to Moscow. / Athletes ___ every day before the Olympics. / I lost my ___ of thought when the phone rang.", accept: ["train"], why: "train — поезд; тренироваться; ход (мыслей)." },
      { type: "text", q: "All the students were ___ at the meeting. / I bought her a birthday ___. / Live in the ___, not in the past.", accept: ["present"], why: "present — присутствующий; подарок; настоящее." },
      { type: "text", q: "What does this word ___? / Don't be so ___ to your little sister. / The ___ of 2, 4 and 6 is 4.", accept: ["mean"], why: "mean — значить; злой, вредный; среднее арифметическое." },
      { type: "text", q: "She left a ___ on the fridge. / The singer hit the high ___ perfectly. / Please ___ that the museum is closed on Mondays.", accept: ["note"], why: "note — записка; нота; обратить внимание." },
      { type: "text", q: "A huge ___ lifted the steel beams onto the roof. / The ___ is a tall bird with long legs. / People at the back had to ___ their necks to see the stage.", accept: ["crane"], why: "crane — подъёмный кран; журавль; вытягивать (шею)." }
    ]
  },
  {
    id: "lx-compounds-definitions", group: "Word play",
    title: "Compound words and words from definitions",
    rule: {
      intro: "Два типа заданий: угадать слово по определению и первой букве (число пропусков = число оставшихся букв) и собрать сложное прилагательное из нескольких слов.",
      blocks: [
        { h: "Слово по определению", rows: [
          ["Посчитай буквы", "p_________ = 10 букв → programmer"],
          ["Суффиксы людей", "-er/-or (commuter), -ist (scientist), -ant/-ent (patient)"],
          ["Сверь часть речи с определением", "«A person who…» → существительное-человек"]
        ] },
        { h: "Сложные прилагательные", rows: [
          ["число + существительное в ед. ч.", "a two-hour flight (не two-hours), a ten-storey building"],
          ["число + year + old", "a fifty-year-old man — через дефисы, year без -s"],
          ["прилагательное + существительное + -ed", "blue-eyed, left-handed, kind-hearted"],
          ["прилагательное/наречие + причастие", "hard-working, well-known, long-lasting"]
        ] }
      ],
      tips: [
        "В составном прилагательном перед существительным нет множественного числа: a five-minute walk, but The walk takes five minutes.",
        "Не забывай дефисы: a ten-year-old girl.",
        "Для определений проверь число пропусков — оно отсекает синонимы: c_____ (6) — cinema, а не cinematograph."
      ]
    },
    items: [
      { type: "text", q: "A person who writes computer programs: p_________", accept: ["programmer"], why: "programmer — программист (10 букв)." },
      { type: "text", q: "A book that lists words in alphabetical order and explains their meanings: d_________", accept: ["dictionary"], why: "dictionary — словарь." },
      { type: "text", q: "A person who is receiving medical treatment, especially in hospital: p______", accept: ["patient"], why: "patient — пациент." },
      { type: "text", q: "A building where people go to watch films: c_____", accept: ["cinema"], why: "cinema — кинотеатр." },
      { type: "text", q: "A person who travels a long distance to work every day: c_______", accept: ["commuter"], why: "commuter — тот, кто ездит на работу из пригорода." },
      { type: "text", q: "A flight that lasts two hours is a ___ flight. (TWO, HOUR)", accept: ["two-hour", "two hour"], why: "Число + существительное в ед. ч. через дефис: two-hour." },
      { type: "text", q: "A man who is fifty years old is a ___ man. (FIFTY, YEAR, OLD)", accept: ["fifty-year-old"], why: "fifty-year-old — year без -s, через дефисы." },
      { type: "text", q: "A girl with blue eyes is a ___ girl. (BLUE, EYE)", accept: ["blue-eyed"], why: "прилагательное + существительное + -ed: blue-eyed." },
      { type: "text", q: "A building with ten floors is a ___ building. (TEN, STOREY)", accept: ["ten-storey", "ten-story", "ten-storeyed", "ten-storied"], why: "ten-storey (AmE ten-story) — ед. ч. в сложном прилагательном." },
      { type: "text", q: "A person who always works very hard is a ___ person. (HARD, WORK)", accept: ["hard-working", "hardworking"], why: "hard-working — трудолюбивый." }
    ]
  },
  {
    id: "lx-error-hunt", group: "Error hunt",
    title: "Find the extra word",
    rule: {
      intro: "В каждом предложении ровно одно лишнее слово: если его убрать, предложение станет правильным. Впиши это слово.",
      blocks: [
        { h: "Типичные лишние слова", rows: [
          ["more better, most best", "сравнительная форма уже готова: better, the best"],
          ["no any", "двойное отрицание: There is no sugar / There isn't any sugar"],
          ["discuss about, enter into the room, tell to me", "глаголы без предлога: discuss the problem, enter the room"],
          ["can to, must to", "после модальных — инфинитив без to: Can you help me?"]
        ] },
        { h: "Артикли и вспомогательные", rows: [
          ["The life is short", "абстрактное понятие в общем смысле — без артикля: Life is short."],
          ["a few vs few", "a few — несколько (хорошо), few — мало (плохо): She has few friends, so she feels lonely."],
          ["did saw, has been lived", "один вспомогательный — одна нужная форма: I did see / I saw; has lived"]
        ] }
      ],
      tips: [
        "Убери кандидата и прочитай предложение заново: оно должно стать полностью правильным, а не «почти».",
        "Смотри на смысл: «so she feels lonely» требует few (мало), значит, лишнее — a.",
        "Проверяй глаголы с «русским» предлогом: обсуждать о, войти в — discuss, enter без предлога."
      ]
    },
    items: [
      { type: "text", q: "Find the extra word: She is more better at maths than her brother.", accept: ["more"], why: "better уже сравнительная степень." },
      { type: "text", q: "Find the extra word: There is no any sugar left in the jar.", accept: ["any"], why: "Двойное отрицание: There is no sugar left." },
      { type: "text", q: "Find the extra word: This is the most best film I have ever seen.", accept: ["most"], why: "best уже превосходная степень." },
      { type: "text", q: "Find the extra word: We discussed about the problem for over an hour.", accept: ["about"], why: "discuss something — без предлога." },
      { type: "text", q: "Find the extra word: I did saw him at the station yesterday.", accept: ["did"], why: "Либо I saw, либо I did see; с saw did лишний." },
      { type: "text", q: "Find the extra word: She has a few friends, so she often feels lonely.", accept: ["a"], why: "Смысл «мало» → few: She has few friends, so she feels lonely." },
      { type: "text", q: "Find the extra word: The life is too short to worry about such things.", accept: ["the"], why: "Life в общем смысле — без артикля." },
      { type: "text", q: "Find the extra word: He entered into the room without knocking.", accept: ["into"], why: "enter the room — без предлога." },
      { type: "text", q: "Find the extra word: Can you to help me carry this box?", accept: ["to"], why: "После can — инфинитив без to." },
      { type: "text", q: "Find the extra word: She has been lived in this town since 2010.", accept: ["been"], why: "Present Perfect: has lived." }
    ]
  }
);
