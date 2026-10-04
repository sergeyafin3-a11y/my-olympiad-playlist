window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "a1-to-be", level: "A1", title: "To be: am / is / are",
    rule: {
      intro: "Глагол to be значит «быть, являться, находиться». В русском его обычно опускают («Я ученик»), а в английском он обязателен: I am a student.",
      blocks: [
        { h: "Утверждение", rows: [
          ["I + am", "I am (I'm) fifteen."],
          ["he / she / it + is", "She is (She's) my best friend."],
          ["we / you / they + are", "They are (They're) at school."]
        ] },
        { h: "Отрицание: + not", rows: [
          ["am not", "I'm not tired."],
          ["is not = isn't", "It isn't cold today."],
          ["are not = aren't", "We aren't late."]
        ] },
        { h: "Вопрос: глагол вперёд", rows: [
          ["Am I ...?", "Am I right?"],
          ["Is he / she / it ...?", "Is your brother at home?"],
          ["Are you / we / they ...?", "Are you ready? — Yes, I am. / No, I'm not."]
        ] }
      ],
      tips: [
        "Не пропускай глагол, как в русском: не «She my sister», а She is my sister.",
        "Возраст — тоже через to be: не «I have 15 years», а I am 15 (years old).",
        "В кратком положительном ответе сокращать нельзя: Yes, I am (не «Yes, I'm»)."
      ]
    },
    items: [
      { type: "choice", q: "She ___ a doctor.", opts: ["am", "is", "are"], a: 1, why: "She — третье лицо единственного числа, поэтому is." },
      { type: "choice", q: "My friends ___ at the cinema now.", opts: ["is", "am", "are"], a: 2, why: "My friends — это they (множественное число), поэтому are." },
      { type: "choice", q: "I ___ fifteen years old.", opts: ["am", "is", "are"], a: 0, why: "С I всегда am. Возраст выражается через to be." },
      { type: "text", q: "They ___ (not / be) at home.", accept: ["aren't", "are not"], why: "They + are, отрицание — are not (aren't)." },
      { type: "text", q: "___ (be) you ready for the test?", accept: ["are"], why: "В вопросе глагол to be ставится перед подлежащим: Are you...?" },
      { type: "text", q: "It ___ (not / be) cold today.", accept: ["isn't", "is not"], why: "It + is, отрицание — is not (isn't)." },
      { type: "choice", q: "___ your brother good at football?", opts: ["Am", "Is", "Are"], a: 1, why: "Your brother — это he, поэтому вопрос начинается с Is." },
      { type: "choice", q: "Where ___ my headphones?", opts: ["is", "are", "am"], a: 1, why: "Headphones — множественное число, поэтому are." },
      { type: "text", q: "I ___ (not / be) hungry.", accept: ["am not", "'m not"], why: "С I отрицание — am not. Формы «amn't» нет." },
      { type: "choice", q: "— Are you from Moscow? — Yes, I ___.", opts: ["am", "'m", "is"], a: 0, why: "В кратком положительном ответе не сокращают: Yes, I am." }
    ]
  },
  {
    id: "a1-present-simple", level: "A1", title: "Present Simple",
    rule: {
      intro: "Present Simple — для привычек, регулярных действий и фактов: что ты делаешь обычно, всегда, каждый день.",
      blocks: [
        { h: "Утверждение", rows: [
          ["I / you / we / they + глагол", "I play the guitar."],
          ["he / she / it + глагол-s", "She plays the guitar."],
          ["-es после s, sh, ch, x, o", "He watches TV. She goes to school."],
          ["согласная + y → -ies", "study → She studies English."]
        ] },
        { h: "Отрицание: do / does + not", rows: [
          ["I / you / we / they + don't", "We don't like tea."],
          ["he / she / it + doesn't", "He doesn't like tea."]
        ] },
        { h: "Вопрос: Do / Does вперёд", rows: [
          ["Do + I / you / we / they", "Do you live near here?"],
          ["Does + he / she / it", "Does she speak French? — Yes, she does."]
        ] },
        { h: "Слова-подсказки", rows: [
          ["always, usually, often", "I usually get up at 7."],
          ["sometimes, never", "He never eats fish."],
          ["every day / week", "We have English every day."]
        ] }
      ],
      tips: [
        "Не забывай -s у he / she / it: не «He like music», а He likes music.",
        "После does / doesn't глагол без -s: не «Does she plays?», а Does she play?",
        "Не ставь am / is / are перед обычным глаголом: не «I am go to school», а I go to school."
      ]
    },
    items: [
      { type: "choice", q: "My sister ___ pop music.", opts: ["like", "likes", "liking"], a: 1, why: "My sister — это she, поэтому глагол с -s: likes." },
      { type: "choice", q: "We ___ to school by bus.", opts: ["go", "goes", "going"], a: 0, why: "С we глагол без окончания: go." },
      { type: "text", q: "He ___ (watch) TV every evening.", accept: ["watches"], why: "После ch добавляется -es: watches." },
      { type: "text", q: "She ___ (not / play) the guitar.", accept: ["doesn't play", "does not play"], why: "Для she отрицание — doesn't + глагол без -s." },
      { type: "choice", q: "___ your parents speak English?", opts: ["Do", "Does", "Are"], a: 0, why: "Your parents — это they, поэтому вопрос с Do." },
      { type: "text", q: "My dad ___ (fly) to Kazan twice a month.", accept: ["flies"], why: "Согласная + y → -ies: fly → flies." },
      { type: "choice", q: "Tom ___ have a smartphone.", opts: ["don't", "doesn't", "isn't"], a: 1, why: "Tom — это he, отрицание с обычным глаголом — doesn't." },
      { type: "text", q: "___ (do) Anna live near the school?", accept: ["does"], why: "Anna — это she, поэтому вопрос начинается с Does." },
      { type: "choice", q: "Does she ___ coffee in the morning?", opts: ["drinks", "drink", "drinking"], a: 1, why: "После does глагол без -s: drink." },
      { type: "text", q: "I ___ (not / like) horror films.", accept: ["don't like", "do not like"], why: "Для I отрицание — don't + глагол." }
    ]
  },
  {
    id: "a1-there-is-are", level: "A1", title: "There is / There are",
    rule: {
      intro: "There is / there are говорят, что где-то что-то есть или находится. По-русски такое предложение часто начинается с места: «В комнате есть стол» — There is a table in the room.",
      blocks: [
        { h: "Утверждение", rows: [
          ["There is + единственное число", "There is a park near my house."],
          ["There is + неисчисляемое", "There is some milk in the fridge."],
          ["There are + множественное число", "There are two cafes in our street."]
        ] },
        { h: "Отрицание и вопрос", rows: [
          ["There isn't a / any ...", "There isn't a TV in my room."],
          ["There aren't any ...", "There aren't any shops here."],
          ["Is there ...? / Are there ...?", "Is there a bank near here? — Yes, there is."],
          ["How many ... are there?", "How many students are there in your class?"]
        ] }
      ],
      tips: [
        "Не начинай с места без there: не «In my room is a bed», а There is a bed in my room.",
        "Is или are выбирай по первому существительному после there: There is a cat. There are two cats.",
        "В вопросах и отрицаниях с множественным числом — any: Are there any good shops here?"
      ]
    },
    items: [
      { type: "choice", q: "There ___ a big park near my house.", opts: ["is", "are", "am"], a: 0, why: "A park — единственное число, поэтому there is." },
      { type: "choice", q: "There ___ three cafes in our street.", opts: ["is", "are", "be"], a: 1, why: "Three cafes — множественное число, поэтому there are." },
      { type: "text", q: "There ___ (be) some milk in the fridge.", accept: ["is"], why: "Milk — неисчисляемое, с ним there is." },
      { type: "text", q: "There ___ (not / be) any students in the classroom.", accept: ["aren't", "are not"], why: "Students — множественное число: there aren't any." },
      { type: "choice", q: "___ there a bank near here?", opts: ["Is", "Are", "Does"], a: 0, why: "A bank — единственное число, вопрос: Is there...?" },
      { type: "choice", q: "How many students ___ there in your class?", opts: ["is", "are", "do"], a: 1, why: "После how many — множественное число, поэтому are there." },
      { type: "text", q: "___ (be) there any good shops in your town?", accept: ["are"], why: "Shops — множественное число, вопрос: Are there...?" },
      { type: "choice", q: "There ___ any bread left.", opts: ["isn't", "aren't", "not"], a: 0, why: "Bread — неисчисляемое, поэтому there isn't." },
      { type: "text", q: "There ___ (not / be) a TV in my room.", accept: ["isn't", "is not"], why: "A TV — единственное число: there isn't (is not)." },
      { type: "choice", q: "— Is there a swimming pool at your school? — No, there ___.", opts: ["isn't", "aren't", "not is"], a: 0, why: "Краткий ответ повторяет is: No, there isn't." }
    ]
  },
  {
    id: "a1-articles", level: "A1", title: "Articles: a / an / the",
    rule: {
      intro: "В русском артиклей нет, а в английском перед существительным почти всегда что-то стоит. A / an — «какой-то один», the — «тот самый, понятно какой».",
      blocks: [
        { h: "A или an — по звуку", rows: [
          ["a + согласный звук", "a book, a university [ju:]"],
          ["an + гласный звук", "an apple, an hour [aʊə]"]
        ] },
        { h: "A / an — один из многих, впервые", rows: [
          ["профессия", "My mum is a teacher."],
          ["впервые упоминаем", "I have a cat."]
        ] },
        { h: "The — понятно, о чём речь", rows: [
          ["уже упоминали", "I have a cat. The cat is black."],
          ["единственный в своём роде", "the sun, the moon"],
          ["понятно из ситуации", "Close the door, please."],
          ["музыкальные инструменты", "She plays the piano."]
        ] },
        { h: "Без артикля", rows: [
          ["спорт и игры", "We play football."],
          ["вообще, во множ. числе или неисчисляемое", "I like music. Cats are cute."]
        ] }
      ],
      tips: [
        "Не пропускай артикль перед профессией: не «He is doctor», а He is a doctor.",
        "Выбирай a / an по звуку, а не по букве: an hour, но a university.",
        "С играми артикля нет, с инструментами — the: play football, но play the guitar."
      ]
    },
    items: [
      { type: "choice", q: "I have ___ umbrella.", opts: ["a", "an", "the"], a: 1, why: "Umbrella начинается с гласного звука и упоминается впервые: an." },
      { type: "choice", q: "My mum is ___ teacher.", opts: ["a", "an", "— (ничего)"], a: 0, why: "Перед профессией нужен a; teacher начинается с согласного звука." },
      { type: "choice", q: "Look at ___ moon! It's so bright tonight.", opts: ["a", "an", "the"], a: 2, why: "Луна одна, поэтому the moon." },
      { type: "text", q: "I want to buy ___ (a / an) orange.", accept: ["an"], why: "Orange начинается с гласного звука: an orange." },
      { type: "choice", q: "She plays ___ piano very well.", opts: ["a", "the", "— (ничего)"], a: 1, why: "С музыкальными инструментами — the: play the piano." },
      { type: "choice", q: "I have a cat and a dog. ___ cat is black.", opts: ["A", "An", "The"], a: 2, why: "Кошку уже упомянули, теперь это «та самая» кошка: the." },
      { type: "text", q: "He's ___ (a / an) honest boy.", accept: ["an"], why: "В honest буква h не читается, слово начинается с гласного звука: an." },
      { type: "choice", q: "My brother plays ___ football every weekend.", opts: ["a", "the", "— (ничего)"], a: 2, why: "С названиями спортивных игр артикль не ставится: play football." },
      { type: "text", q: "My cousin studies at ___ (a / an) university in Kazan.", accept: ["a"], why: "University начинается со звука [ju:] — согласного, поэтому a." },
      { type: "choice", q: "Can you close ___ door, please? It's cold.", opts: ["a", "an", "the"], a: 2, why: "Из ситуации понятно, о какой двери речь: the door." }
    ]
  },
  {
    id: "a1-plurals-this-these", level: "A1", title: "Plurals; this / that / these / those",
    rule: {
      intro: "Множественное число обычно образуется с -s. This / these — «это / эти» (рядом), that / those — «то / те» (далеко).",
      blocks: [
        { h: "Правила -s / -es / -ies", rows: [
          ["обычно + s", "book → books"],
          ["s, ss, sh, ch, x + es", "box → boxes, bus → buses"],
          ["согласная + y → ies", "city → cities (но boy → boys)"],
          ["f / fe → ves", "knife → knives, leaf → leaves"]
        ] },
        { h: "Исключения — учить наизусть", rows: [
          ["man / woman", "men / women"],
          ["child / person", "children / people"],
          ["foot / tooth / mouse", "feet / teeth / mice"]
        ] },
        { h: "Рядом и далеко", rows: [
          ["this + ед. число (рядом)", "This is my phone."],
          ["these + мн. число (рядом)", "These apples are sweet."],
          ["that + ед. число (далеко)", "Who is that girl over there?"],
          ["those + мн. число (далеко)", "Look at those birds!"]
        ] }
      ],
      tips: [
        "Не добавляй -s к исключениям: не «childs», «mans», а children, men.",
        "These / those — только с множественным числом: не «these book», а these books.",
        "People — уже множественное число: People are friendly here (не «people is»)."
      ]
    },
    items: [
      { type: "text", q: "one child — two ___", accept: ["children"], why: "Исключение: child → children." },
      { type: "text", q: "one box — three ___", accept: ["boxes"], why: "После x добавляется -es: boxes." },
      { type: "choice", q: "one man — two ___", opts: ["mans", "men", "mens"], a: 1, why: "Исключение: man → men." },
      { type: "choice", q: "___ is my phone. (It's here, in my hand.)", opts: ["This", "These", "Those"], a: 0, why: "Один предмет рядом — this." },
      { type: "choice", q: "Look at ___ birds over there in the sky!", opts: ["this", "these", "those"], a: 2, why: "Много птиц, и они далеко — those." },
      { type: "choice", q: "___ apples here are very sweet.", opts: ["This", "These", "That"], a: 1, why: "Много яблок, и они рядом (here) — these." },
      { type: "text", q: "one city — two ___", accept: ["cities"], why: "Согласная + y → -ies: cities." },
      { type: "text", q: "one knife — two ___", accept: ["knives"], why: "-fe → -ves: knives." },
      { type: "choice", q: "Who is ___ girl over there?", opts: ["this", "that", "those"], a: 1, why: "Одна девушка, и она далеко (over there) — that." },
      { type: "choice", q: "My ___ are cold and wet after the long walk.", opts: ["foot", "foots", "feet"], a: 2, why: "Исключение: foot → feet; глагол are подсказывает множественное число." }
    ]
  },
  {
    id: "a1-possessives", level: "A1", title: "Possessive adjectives and ’s",
    rule: {
      intro: "Притяжательные слова отвечают на вопрос «чей?». В английском нет общего «свой»: для каждого лица — своё слово.",
      blocks: [
        { h: "Притяжательные местоимения", rows: [
          ["I → my", "my phone"],
          ["you → your", "your bag"],
          ["he → his, she → her", "his bike, her name"],
          ["it → its", "The dog is eating its food."],
          ["we → our, they → their", "our school, their flat"]
        ] },
        { h: "Притяжательный падеж ’s", rows: [
          ["имя / ед. число + 's", "Kate's phone, my brother's room"],
          ["мн. число на -s + '", "my parents' car"],
          ["мн. число без -s + 's", "the children's toys"]
        ] }
      ],
      tips: [
        "Нет слова «свой»: «Она любит свою собаку» — She loves her dog, «Мы любим свою школу» — We love our school.",
        "Its (чей?) и it's (= it is) — разные слова: The cat likes its toy. It's cute.",
        "Не говори «the phone of Kate» — проще и естественнее Kate's phone."
      ]
    },
    items: [
      { type: "choice", q: "This is my sister. ___ name is Masha.", opts: ["Her", "His", "She"], a: 0, why: "Сестра — she, «её» — her." },
      { type: "choice", q: "We love ___ school.", opts: ["our", "us", "we"], a: 0, why: "We → our: «наша (своя) школа»." },
      { type: "choice", q: "Is this ___ bag, Tom?", opts: ["you", "your", "yours"], a: 1, why: "Перед существительным — your." },
      { type: "text", q: "This is ___ (Kate) phone.", accept: ["Kate's"], why: "Принадлежность человеку: имя + 's — Kate's phone." },
      { type: "choice", q: "My ___ room is very big. (my mum and dad)", opts: ["parent's", "parents'", "parents"], a: 1, why: "Parents — мн. число на -s, добавляем только апостроф: parents'." },
      { type: "text", q: "They live in a small flat. ___ (they) flat is near the river.", accept: ["their"], why: "They → their." },
      { type: "choice", q: "The dog is eating ___ food.", opts: ["it's", "its", "it"], a: 1, why: "«Свою» для животного или предмета — its; it's = it is." },
      { type: "text", q: "My ___ (brother) friends are funny. (I have only one brother.)", accept: ["brother's"], why: "Один брат: brother + 's — my brother's friends." },
      { type: "choice", q: "Ann and ___ brother are in my class.", opts: ["she", "her", "hers"], a: 1, why: "Брат Ани — «её брат»: her brother." },
      { type: "text", q: "Is this ___ (you) pencil?", accept: ["your"], why: "You → your." }
    ]
  },
  {
    id: "a1-can", level: "A1", title: "Can / can’t",
    rule: {
      intro: "Can значит «могу, умею». Им говорят о способностях, возможностях и просьбах.",
      blocks: [
        { h: "Форма одна для всех", rows: [
          ["подлежащее + can + глагол", "I can swim. She can swim."],
          ["can't = cannot", "He can't drive."]
        ] },
        { h: "Вопрос и краткий ответ", rows: [
          ["Can + подлежащее + глагол?", "Can you play the guitar?"],
          ["Yes, ... can. / No, ... can't.", "Yes, I can. / No, I can't."]
        ] },
        { h: "Просьба и разрешение", rows: [
          ["Can you ...?", "Can you help me, please?"],
          ["Can I ...?", "Can I open the window?"]
        ] }
      ],
      tips: [
        "После can нет to и нет -s: не «She can to speak» и не «She cans speak», а She can speak.",
        "В отрицании не нужен don't: не «I don't can», а I can't.",
        "Слитно пишется cannot, сокращение — can't."
      ]
    },
    items: [
      { type: "choice", q: "My little brother ___ swim.", opts: ["can", "cans", "can to"], a: 0, why: "Can не меняется по лицам и не требует to." },
      { type: "choice", q: "She can ___ three languages.", opts: ["speak", "speaks", "to speak"], a: 0, why: "После can — глагол без to и без -s." },
      { type: "text", q: "I ___ (not / can) ride a horse.", accept: ["can't", "cannot", "can not"], why: "Отрицание: can't (cannot)." },
      { type: "choice", q: "___ you help me with my homework, please?", opts: ["Can", "Are", "Does"], a: 0, why: "Просьба: Can you...? + глагол." },
      { type: "text", q: "Penguins ___ (not / can) fly.", accept: ["can't", "cannot", "can not"], why: "Неспособность: can't (cannot)." },
      { type: "choice", q: "— Can your dad cook? — Yes, he ___.", opts: ["can", "cans", "does"], a: 0, why: "Краткий ответ повторяет can: Yes, he can." },
      { type: "text", q: "___ (can) I open the window?", accept: ["can"], why: "Просьба о разрешении: Can I...?" },
      { type: "choice", q: "We can't ___ to the party on Saturday.", opts: ["come", "coming", "to come"], a: 0, why: "После can't — глагол в начальной форме без to." },
      { type: "choice", q: "Sorry, I ___ hear you. The music is too loud.", opts: ["can't", "don't can", "not can"], a: 0, why: "Отрицание с can — только can't, без don't." },
      { type: "text", q: "My cat ___ (can) jump very high.", accept: ["can"], why: "Can одинаков для всех лиц: my cat can." }
    ]
  },
  {
    id: "a1-prepositions-time", level: "A1", title: "Prepositions of time: in / on / at",
    rule: {
      intro: "In, on, at показывают время. Выбор зависит от того, что это: точное время, день или период побольше.",
      blocks: [
        { h: "AT — точка во времени", rows: [
          ["время по часам", "at 9 o'clock, at half past three"],
          ["устойчивые выражения", "at night, at the weekend, at Christmas"]
        ] },
        { h: "ON — дни и даты", rows: [
          ["дни недели", "on Monday, on Friday evening"],
          ["даты", "on 15 March, on my birthday"]
        ] },
        { h: "IN — периоды побольше", rows: [
          ["части суток", "in the morning, in the evening"],
          ["месяцы, времена года", "in May, in winter"],
          ["годы, века", "in 2010, in the 21st century"]
        ] }
      ],
      tips: [
        "Дни недели — с on: не «in Monday», а on Monday.",
        "Утро и вечер — in the morning / in the evening, но ночь — at night.",
        "Если есть конкретный день — on: in the evening, но on Friday evening."
      ]
    },
    items: [
      { type: "choice", q: "My birthday is ___ May.", opts: ["in", "on", "at"], a: 0, why: "Месяцы — с in." },
      { type: "choice", q: "The lesson starts ___ 9 o'clock.", opts: ["in", "on", "at"], a: 2, why: "Время по часам — с at." },
      { type: "choice", q: "We don't go to school ___ Sunday.", opts: ["in", "on", "at"], a: 1, why: "Дни недели — с on." },
      { type: "text", q: "I usually do my homework ___ (in / on / at) the evening.", accept: ["in"], why: "Части суток — in the evening." },
      { type: "text", q: "We go skiing ___ (in / on / at) winter.", accept: ["in"], why: "Времена года — с in." },
      { type: "text", q: "The concert is ___ (in / on / at) 15 March.", accept: ["on"], why: "Даты — с on." },
      { type: "choice", q: "I don't use my phone ___ night.", opts: ["in", "on", "at"], a: 2, why: "Устойчивое выражение: at night." },
      { type: "choice", q: "My grandparents moved here ___ 1998.", opts: ["in", "on", "at"], a: 0, why: "Годы — с in." },
      { type: "text", q: "What do you do ___ (in / on / at) the weekend?", accept: ["at", "on"], why: "В британском английском — at the weekend, в американском — on the weekend." },
      { type: "choice", q: "Let's meet ___ Friday evening.", opts: ["in", "on", "at"], a: 1, why: "Есть конкретный день (Friday), поэтому on." }
    ]
  }
);
