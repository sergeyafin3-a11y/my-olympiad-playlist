window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-wf-nouns",
    group: "Word formation",
    title: "Nouns: -ment, -ness, -ity, -ion, -ance / -ence, -hood, -ship",
    rule: {
      intro: "Проверяют, умеешь ли ты превратить глагол или прилагательное в существительное. Смотри на место пропуска: после артикля, the ... of, притяжательного местоимения или прилагательного нужно существительное; затем проверь, нужно ли число множественное.",
      blocks: [
        { h: "От глагола", rows: [
          ["-ment", "develop → development, invest → investment, agree → agreement"],
          ["-ion / -tion / -sion", "construct → construction, attend → attention, admit → admission"],
          ["-ance / -ence", "perform → performance, exist → existence, refer → reference"]
        ] },
        { h: "От прилагательного", rows: [
          ["-ness", "nervous → nervousness, kind → kindness, aware → awareness"],
          ["-ity", "major → majority, similar → similarity, curious → curiosity"],
          ["-ance / -ence (из -ant / -ent)", "important → importance, patient → patience, confident → confidence"]
        ] },
        { h: "От существительного (абстрактное понятие)", rows: [
          ["-hood", "child → childhood, neighbour → neighbourhood"],
          ["-ship", "friend → friendship, champion → championship, leader → leadership"]
        ] }
      ],
      tips: [
        "Следи за орфографией при смене основы: curious → curiosity (выпадает u), generous → generosity, explain → explanation.",
        "Если перед пропуском стоит a/an или глагол в ед. числе — нужна форма ед. числа; если «many», «several», «are» — ставь -s: similarity → similarities.",
        "-ance или -ence? Ориентируйся на прилагательное: different → difference, relevant → relevance; для глаголов просто запоминай: perform → performance, exist → existence."
      ]
    },
    items: [
      { type: "text", q: "Last year the government announced a huge ___ in renewable energy. (INVEST)", accept: ["investment"], why: "После «a huge» нужно существительное: invest + -ment." },
      { type: "text", q: "Her ___ to detail made her the best editor on the school newspaper. (ATTEND)", accept: ["attention"], why: "Устойчивое attention to detail; attend → attention." },
      { type: "text", q: "Despite his ___, the young chess player beat the grandmaster in twenty moves. (NERVOUS)", accept: ["nervousness"], why: "После his нужно существительное: прилагательное + -ness." },
      { type: "text", q: "The ___ of the city's population speaks at least two languages. (MAJOR)", accept: ["majority"], why: "The majority of — «большинство»; major + -ity." },
      { type: "text", q: "Many adults remember their ___ by the sea as the happiest time of their lives. (CHILD)", accept: ["childhood"], why: "Период жизни — суффикс -hood: childhood." },
      { type: "text", q: "The two physicists formed a close ___ that lasted for over forty years. (FRIEND)", accept: ["friendship"], why: "Отношения — суффикс -ship: friendship." },
      { type: "text", q: "Experts noticed a striking ___ between the two ancient manuscripts. (SIMILAR)", accept: ["similarity"], why: "После «a striking» — существительное в ед. числе: similar + -ity." },
      { type: "text", q: "Astronomers still argue about the ___ of life on the moons of Jupiter. (EXIST)", accept: ["existence"], why: "Exist → existence (именно -ence, не -ance)." },
      { type: "choice", q: "The team's ___ in the final was so poor that the coach resigned the next day.", opts: ["performing", "performance", "performer", "performation"], a: 1, why: "Нужно абстрактное существительное «выступление»: perform → performance." },
      { type: "choice", q: "The ___ of the new bridge was halted because of heavy flooding.", opts: ["constructment", "construction", "constructiveness", "constructivity"], a: 1, why: "Процесс строительства — construction; остальные варианты либо не существуют, либо значат «конструктивность»." }
    ]
  },
  {
    id: "lx-wf-adjectives",
    group: "Word formation",
    title: "Adjectives and adverbs: -ful, -less, -ous, -able, -ive, -ic, -ly",
    rule: {
      intro: "Проверяют образование прилагательных и наречий. Перед существительным или после be/seem/become нужно прилагательное; при глаголе, прилагательном или в начале предложения как комментарий — наречие на -ly.",
      blocks: [
        { h: "Прилагательные от существительных", rows: [
          ["-ful / -less", "power → powerful, use → useful / useless, end → endless"],
          ["-ous", "danger → dangerous, fame → famous, mystery → mysterious"],
          ["-ic / -ical", "hero → heroic, science → scientific, economy → economic / economical"]
        ] },
        { h: "Прилагательные от глаголов", rows: [
          ["-able / -ible", "wash → washable, understand → understandable, rely → reliable"],
          ["-ive", "create → creative, inform → informative, attract → attractive"]
        ] },
        { h: "Наречия на -ly", rows: [
          ["прилагательное + -ly", "careful → carefully, remarkable → remarkably"],
          ["-y → -ily", "lucky → luckily, steady → steadily, happy → happily"]
        ] }
      ],
      tips: [
        "Пары с разным значением — любимая ловушка олимпиады: economic (экономический) vs economical (экономный), historic (исторически важный) vs historical (относящийся к истории).",
        "Иногда нужно два шага: LUCK → lucky → luckily; REMARK → remarkable → remarkably. Не останавливайся на первом.",
        "-ful и -less дают противоположные смыслы: the map was useless (бесполезна), а не useful — читай контекст до конца."
      ]
    },
    items: [
      { type: "text", q: "The old map turned out to be completely ___: every road on it had changed. (USE)", accept: ["useless"], why: "По смыслу карта бесполезна: use + -less." },
      { type: "text", q: "Local scientists still consider the volcano extremely ___. (DANGER)", accept: ["dangerous"], why: "Consider smth + прилагательное: danger + -ous." },
      { type: "text", q: "She gave such a ___ speech that half the audience was in tears. (POWER)", accept: ["powerful"], why: "Перед существительным speech — прилагательное: power + -ful." },
      { type: "text", q: "The firefighter's ___ rescue of three children was shown on the evening news. (HERO)", accept: ["heroic"], why: "Прилагательное к rescue: hero → heroic." },
      { type: "text", q: "The jacket is waterproof and fully ___ in an ordinary washing machine. (WASH)", accept: ["washable"], why: "«Такой, который можно стирать» — суффикс -able." },
      { type: "text", q: "Our new art teacher is very ___ and always comes up with unusual projects. (CREATE)", accept: ["creative"], why: "После very — прилагательное: create → creative." },
      { type: "text", q: "The expedition was ___ successful: all twelve climbers reached the summit and returned safely. (REMARK)", accept: ["remarkably"], why: "Перед прилагательным successful нужно наречие: remark → remarkable → remarkably." },
      { type: "text", q: "___, nobody was injured when the old tree fell onto the school bus. (LUCK)", accept: ["Luckily", "luckily"], why: "Наречие-комментарий в начале предложения: luck → lucky → luckily." },
      { type: "choice", q: "The museum guide's explanation was ___ even to the youngest visitors.", opts: ["understandable", "understanding", "understood", "understandful"], a: 0, why: "«Понятный» — understandable; understanding значит «чуткий, понимающий»." },
      { type: "choice", q: "Buying a season ticket is far more ___ than paying for every single match.", opts: ["economic", "economical", "economics", "economist"], a: 1, why: "Economical — «экономный, выгодный»; economic — «относящийся к экономике»." }
    ]
  },
  {
    id: "lx-wf-prefixes",
    group: "Word formation",
    title: "Negative prefixes and verbs: un-, in-/im-/il-/ir-, dis-, mis-, -en, -ise",
    rule: {
      intro: "Проверяют, видишь ли ты, что по смыслу нужно отрицание или глагол. Сначала реши, положительный или отрицательный смысл требует контекст, затем выбери правильную приставку; для глаголов не забудь время и окончание.",
      blocks: [
        { h: "Отрицательные приставки", rows: [
          ["un-", "clear → unclear, suited → unsuited, able → unable"],
          ["in- / im- (перед m, p) / il- (перед l) / ir- (перед r)", "patient → impatient, legal → illegal, relevant → irrelevant, visible → invisible"],
          ["dis-", "agree → disagree, able → disable, appear → disappear"],
          ["mis- (= неправильно)", "use → misuse, interpret → misinterpret, understand → misunderstand"]
        ] },
        { h: "Глаголы из прилагательных и существительных", rows: [
          ["-en", "strong → strengthen, wide → widen, short → shorten"],
          ["-ise / -ize", "modern → modernise / modernize, glory → glorify (-ify)"]
        ] }
      ],
      tips: [
        "Получив глагол, поставь его в нужную форму: The bridge must be strengthened (пассив → причастие), Students disagreed last year (прошедшее).",
        "mis- — не «не», а «неправильно»: misuse a word = употреблять неверно; disuse — «неиспользование».",
        "Британское -ise и американское -ize одинаково правильны: modernise = modernize. Главное — последовательность в одном тексте."
      ]
    },
    items: [
      { type: "text", q: "In most countries it is ___ to drive a car without a licence. (LEGAL)", accept: ["illegal"], why: "Перед l приставка il-: illegal." },
      { type: "text", q: "The instructions were so ___ that nobody managed to assemble the bookshelf. (CLEAR)", accept: ["unclear"], why: "По смыслу инструкция непонятная: un- + clear." },
      { type: "text", q: "His answer was completely ___: he had obviously not read the book at all. (RELEVANT)", accept: ["irrelevant"], why: "Перед r приставка ir-: irrelevant." },
      { type: "text", q: "Last spring many students ___ with the new dress code and signed a petition against it. (AGREE)", accept: ["disagreed"], why: "Нужна противоположность и прошедшее время: disagree → disagreed." },
      { type: "text", q: "Many people ___ the word \"literally\": they use it to mean the exact opposite, \"figuratively\". (USE)", accept: ["misuse"], why: "Mis- = «неправильно» (употреблять в неверном значении); present simple с people: misuse." },
      { type: "text", q: "The old bridge must be ___ before heavy lorries are allowed to cross it. (STRONG)", accept: ["strengthened"], why: "Глагол strengthen (-en) в пассиве: must be strengthened." },
      { type: "text", q: "The city council plans to ___ its public transport system by 2030. (MODERN)", accept: ["modernise", "modernize"], why: "После plans to — инфинитив глагола: modern + -ise/-ize." },
      { type: "text", q: "The ___ fans started whistling when the concert was delayed for an hour. (PATIENT)", accept: ["impatient"], why: "Перед p приставка im-: impatient." },
      { type: "choice", q: "The journalist ___ the results of the study, so the newspaper had to publish a correction.", opts: ["misinterpreted", "disinterpreted", "uninterpreted", "ininterpreted"], a: 0, why: "«Истолковал неверно» — mis- + interpret, прошедшее время." },
      { type: "choice", q: "Please do not ___ the alarm system while the museum is open to visitors.", opts: ["unable", "disable", "inable", "misable"], a: 1, why: "Нужен глагол «отключить» — disable; unable — прилагательное." }
    ]
  },
  {
    id: "lx-wf-context",
    group: "Word formation",
    title: "In a text: olympiad-style gaps",
    rule: {
      intro: "Как на ВсОШ: связный текст, в каждом пропуске — слово от данного корня В НУЖНОЙ ГРАММАТИЧЕСКОЙ ФОРМЕ. Определи часть речи, затем форму: число, время, причастие, степень сравнения.",
      blocks: [
        { h: "Алгоритм на каждый пропуск", rows: [
          ["1. Часть речи", "артикль/прилагательное → существительное; перед существительным → прилагательное; при глаголе → наречие"],
          ["2. Смысл: плюс или минус?", "suit → suited или unsuited? Читай предложение целиком"],
          ["3. Грамматическая форма", "explore → explorers (мн. ч.), glory → glorified (причастие), reliable → more reliable (сравнение)"]
        ] },
        { h: "Сигналы формы", rows: [
          ["Множественное число", "two, several, many, these, глагол без -s: two rival explorers"],
          ["Причастие II", "be / have + ___: was glorified, had been discovered"],
          ["Сравнительная степень", "than, far / much / even + ___: far more reliable than"]
        ] }
      ],
      tips: [
        "Самая частая потеря баллов на олимпиаде — правильное слово в неправильной форме: explorer вместо explorers засчитано не будет.",
        "Слово «than» после пропуска — почти всегда сигнал сравнительной степени: effective → more effective.",
        "Корень может требовать двух преобразований: KNOW → knowledge, GLORY → glorify → glorified."
      ]
    },
    items: [
      { type: "text", q: "In 1911 two rival ___ set out to become the first people to reach the South Pole. (EXPLORE)", accept: ["explorers"], why: "«Two rival» требует существительного во мн. числе: explore → explorer → explorers." },
      { type: "text", q: "The Norwegian Roald Amundsen had prepared ___ for the journey, testing every piece of equipment in advance. (CARE)", accept: ["carefully"], why: "При глаголе prepared — наречие: care → careful → carefully." },
      { type: "text", q: "He relied on sledge dogs, which proved far ___ than the motor sledges of his British rival. (RELY)", accept: ["more reliable"], why: "«Far ... than» — сравнительная степень: reliable → more reliable." },
      { type: "text", q: "Robert Scott's men, meanwhile, struggled through ___ blizzards and suffered from terrible frostbite. (END)", accept: ["endless"], why: "Прилагательное к blizzards со смыслом «бесконечные»: end + -less." },
      { type: "text", q: "Their ponies were completely ___ to the extreme cold and died within weeks. (SUIT)", accept: ["unsuited", "unsuitable"], why: "По смыслу пони не годились для холода — нужна отрицательная приставка un-." },
      { type: "text", q: "When Scott finally reached the Pole and saw the Norwegian flag, his ___ was enormous. (DISAPPOINT)", accept: ["disappointment"], why: "После his — существительное: disappoint + -ment." },
      { type: "text", q: "On the way back the men grew ___ weaker as food and fuel ran out. (STEADY)", accept: ["steadily"], why: "Перед прилагательным weaker — наречие: steady → steadily." },
      { type: "text", q: "Although none of them survived, Scott was later ___ as a national hero in Britain. (GLORY)", accept: ["glorified"], why: "Пассив was + причастие II: glory → glorify → glorified." },
      { type: "text", q: "Historians now believe that Amundsen owed his victory less to luck than to his ___ of Inuit survival methods. (KNOW)", accept: ["knowledge"], why: "После his — существительное: know → knowledge." },
      { type: "text", q: "The race shows that careful planning is often ___ than courage alone. (EFFECT)", accept: ["more effective"], why: "Перед than — сравнительная степень прилагательного: effective → more effective." }
    ]
  }
);
