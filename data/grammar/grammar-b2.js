window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "b2-conditional-3", level: "B2", title: "Third conditional",
    rule: {
      intro: "Третий тип условных — сожаление или рассуждение о прошлом, которое уже не изменить: условие не выполнилось, и результат тоже остался в прошлом.",
      blocks: [
        { h: "Третий тип (прошлое → прошлое)", rows: [
          ["If + Past Perfect, would have + V3", "If I had studied harder, I would have passed."],
          ["could / might have + V3", "If we had left earlier, we might have caught the train."],
          ["отрицание", "If it hadn't rained, we wouldn't have cancelled the match."],
          ["вопрос", "What would you have done if you had missed the bus?"]
        ] },
        { h: "Инверсия вместо if", rows: [
          ["Had + подлежащее + V3", "Had I known about the party, I would have come."],
          ["Had + not (без сокращения)", "Had she not helped me, I would have failed."]
        ] }
      ],
      tips: [
        "Не ставьте would в часть с if: не «If I would have known», а «If I had known, I would have told you».",
        "Третий тип часто звучит как упрёк или сожаление: «If you had told me, I would have helped» = жаль, что ты не сказал.",
        "В инверсии нет сокращения hadn't в начале: «Had I not seen it…», а не «Hadn't I seen it…» — частая ловушка олимпиад."
      ]
    },
    items: [
      { type: "choice", q: "If I ___ harder, I would have passed the exam.", opts: ["studied", "had studied", "would study"], a: 1, why: "Нереальное прошлое: в части с if — Past Perfect." },
      { type: "choice", q: "If she had taken the map, she ___ lost in the old town.", opts: ["wouldn't get", "wouldn't have got", "won't get"], a: 1, why: "Результат в прошлом: would have + V3." },
      { type: "text", q: "If we ___ (leave) earlier, we wouldn't have missed the train.", accept: ["had left", "'d left", "d left"], why: "Третий тип: if + Past Perfect." },
      { type: "text", q: "If he ___ (not / break) his leg, he would have played in the final.", accept: ["hadn't broken", "had not broken"], why: "Условие в прошлом, которое не выполнилось: if + Past Perfect." },
      { type: "choice", q: "If you had asked me, I ___ you with your project.", opts: ["would help", "would have helped", "had helped"], a: 1, why: "Главная часть третьего типа: would have + V3." },
      { type: "text", q: "Our team ___ (win) the match if the goalkeeper hadn't been injured.", accept: ["would have won", "'d have won", "d have won", "could have won", "might have won"], why: "Главная часть третьего типа: would/could/might have + V3." },
      { type: "choice", q: "___ I known about the concert, I would have bought tickets.", opts: ["If", "Had", "Have", "Should"], a: 1, why: "Инверсия вместо if в третьем типе: Had I known…" },
      { type: "choice", q: "If you ___ me the wrong answer, I wouldn't have failed the test.", opts: ["didn't tell", "hadn't told", "wouldn't tell"], a: 1, why: "Условие в прошлом — Past Perfect в части с if." },
      { type: "text", q: "I ___ (not / be) late if my alarm had gone off.", accept: ["wouldn't have been", "would not have been"], why: "Результат в прошлом в отрицании: wouldn't have + V3." },
      { type: "choice", q: "What would you have done if you ___ the last bus?", opts: ["missed", "had missed", "would miss"], a: 1, why: "Вопрос в третьем типе: if-часть всё равно в Past Perfect." }
    ]
  },
  {
    id: "b2-wish", level: "B2", title: "wish / if only",
    rule: {
      intro: "wish и if only выражают сожаление или желание, чтобы было иначе. Время глагола после них «сдвигается» на шаг назад; if only звучит эмоциональнее.",
      blocks: [
        { h: "Сожаление о настоящем", rows: [
          ["wish + Past Simple", "I wish I had more free time."],
          ["wish + were (для всех лиц)", "I wish I were taller."],
          ["wish + could + V (умение)", "I wish I could play the guitar."]
        ] },
        { h: "Сожаление о прошлом", rows: [
          ["wish + Past Perfect", "I wish I hadn't said that."],
          ["if only + Past Perfect", "If only we had booked the tickets earlier!"]
        ] },
        { h: "Раздражение, желание перемены", rows: [
          ["wish + someone + would + V", "I wish you would stop talking during the film."],
          ["о погоде и ситуациях", "I wish it would stop raining."]
        ] }
      ],
      tips: [
        "Нельзя «I wish I would…» о себе: would — только про других людей или ситуации. Правильно: «I wish I could swim», а не «I wish I would swim».",
        "Русское «жаль, что…» переводится через противоположное: «Жаль, что я не пошёл» → «I wish I had gone».",
        "После wish в формальной речи — were для всех лиц: «I wish he were here». Was допустимо в разговоре."
      ]
    },
    items: [
      { type: "choice", q: "I wish I ___ the guitar — then I'd join your band.", opts: ["can play", "could play", "could have played"], a: 1, why: "Сожаление о настоящем умении: wish + could + V." },
      { type: "text", q: "I wish I ___ (not / say) that to Mia yesterday.", accept: ["hadn't said", "had not said"], why: "Сожаление о прошлом: wish + Past Perfect." },
      { type: "choice", q: "I wish you ___ tapping your pen. It's driving me crazy!", opts: ["would stop", "will stop", "had stopped"], a: 0, why: "Раздражение от чужого поведения: wish + would + V." },
      { type: "text", q: "If only I ___ (have) more free time this week!", accept: ["had"], why: "Желание о настоящем: if only + Past Simple." },
      { type: "choice", q: "She wishes she ___ to the party last Saturday.", opts: ["went", "had gone", "would go"], a: 1, why: "Прошлое (last Saturday): wish + Past Perfect." },
      { type: "text", q: "I wish it ___ (stop) raining — we want to play football.", accept: ["would stop", "'d stop", "d stop"], why: "Желание, чтобы ситуация изменилась: wish + would + V." },
      { type: "choice", q: "I wish I ___ in Moscow — then I could go to all the big concerts.", opts: ["live", "lived", "would live"], a: 1, why: "Нереальное настоящее: wish + Past Simple. Would о себе не используется." },
      { type: "choice", q: "If only we ___ the tickets earlier — now they're sold out!", opts: ["booked", "had booked", "would book"], a: 1, why: "Сожаление о прошлом действии: if only + Past Perfect." },
      { type: "text", q: "My brother wishes he ___ (be) taller.", accept: ["were", "was"], why: "Настоящее: wish + were (формально) или was (разговорно)." },
      { type: "choice", q: "Which sentence is correct?", opts: ["I wish I would be older.", "I wish I were older.", "I wish I am older."], a: 1, why: "О себе и о состоянии — wish + were; would о себе нельзя." }
    ]
  },
  {
    id: "b2-passive-advanced", level: "B2", title: "Passive (all tenses) and have something done",
    rule: {
      intro: "Пассив ставит в центр действие или его объект, а не исполнителя. Формула одна для всех времён: be в нужном времени + V3. Have something done — когда действие за вас делает кто-то другой.",
      blocks: [
        { h: "be + V3 во всех временах", rows: [
          ["Present Continuous", "The stadium is being built."],
          ["Present Perfect", "The song has been streamed a million times."],
          ["Past Perfect", "All the pizza had been eaten."],
          ["Future / модальные", "The results will be announced tomorrow. Essays must be handed in."]
        ] },
        { h: "Have / get something done", rows: [
          ["have + объект + V3", "I had my hair cut yesterday."],
          ["get + объект + V3 (разговорно)", "We need to get the car repaired."],
          ["неприятность с вами", "She had her phone stolen."]
        ] },
        { h: "Безличный пассив", rows: [
          ["It is said that…", "It is said that the castle is haunted."],
          ["be said to + V / to have been V3", "The castle is said to have been built in the 12th century."]
        ] }
      ],
      tips: [
        "Не путайте «I cut my hair» (сам) и «I had my hair cut» (в парикмахерской). По-русски оба — «я подстригся».",
        "В Continuous-пассиве обязательно being: «is being repaired», а не «is repairing» (это актив: «чинит сам»).",
        "О прошлом в безличном пассиве — перфектный инфинитив: «He is believed to have left», а не «to leave»."
      ]
    },
    items: [
      { type: "choice", q: "The new stadium ___ at the moment.", opts: ["is building", "is being built", "has been building"], a: 1, why: "Процесс сейчас в пассиве: is being + V3." },
      { type: "text", q: "The results of the olympiad ___ (announce) tomorrow.", accept: ["will be announced", "are going to be announced", "are being announced", "are to be announced"], why: "Будущее в пассиве: will be + V3 (или be going to be + V3)." },
      { type: "text", q: "By the time we arrived, all the pizza ___ (eat).", accept: ["had been eaten"], why: "До момента в прошлом — Past Perfect Passive: had been + V3." },
      { type: "choice", q: "I ___ at the salon yesterday.", opts: ["had my hair cut", "had cut my hair", "have my hair cut"], a: 0, why: "Услуга от другого человека в прошлом: had + объект + V3." },
      { type: "choice", q: "This song ___ by millions of people since it came out last month.", opts: ["has been streamed", "was streamed", "is streamed", "had been streamed"], a: 0, why: "since + результат к настоящему: Present Perfect Passive." },
      { type: "text", q: "We're going to ___ (the car / repair) next week.", accept: ["have the car repaired", "get the car repaired"], why: "Это сделает механик: have/get + объект + V3." },
      { type: "choice", q: "When I got to the lab, the experiment ___, so I watched.", opts: ["was being carried out", "was carrying out", "had carried out"], a: 0, why: "Процесс в прошлом в пассиве: was being + V3." },
      { type: "text", q: "She ___ (her phone / steal) on the metro yesterday.", accept: ["had her phone stolen", "got her phone stolen"], why: "Неприятность, случившаяся с человеком: had + объект + V3." },
      { type: "choice", q: "The essays must ___ by Friday.", opts: ["be handed in", "been handed in", "handed in"], a: 0, why: "После модального глагола: be + V3." },
      { type: "text", q: "The castle is said ___ (build) in the 12th century.", accept: ["to have been built"], why: "О прошлом после is said — перфектный пассивный инфинитив: to have been + V3." }
    ]
  },
  {
    id: "b2-reported-questions", level: "B2", title: "Reported questions, requests and commands",
    rule: {
      intro: "В косвенном вопросе порядок слов прямой, как в утверждении, вспомогательного do нет, а время обычно сдвигается назад. Просьбы и приказы передаются через инфинитив.",
      blocks: [
        { h: "Вопросы", rows: [
          ["Wh-вопрос: asked + where/what + подлежащее + глагол", "She asked me where I lived."],
          ["Общий вопрос: asked + if / whether", "He asked if I had finished the project."],
          ["will → would", "Ann asked if I would come to her party."]
        ] },
        { h: "Просьбы и приказы", rows: [
          ["tell / ask + someone + to + V", "The teacher told us to switch off our phones."],
          ["отрицание: not to + V", "Mum told me not to be late."]
        ] },
        { h: "Сдвиг времён и слов", rows: [
          ["Present → Past, Past → Past Perfect", "\"Did you see it?\" → He asked if I had seen it."],
          ["yesterday → the day before, tomorrow → the next day", "She asked what I was doing the next day."]
        ] }
      ],
      tips: [
        "Главная ошибка — вопросительный порядок слов: не «She asked where did I live», а «She asked where I lived». Знак вопроса в конце тоже не нужен.",
        "Русское «спросил, пойду ли я» — это if/whether, а не «that»: «He asked if I would go».",
        "Offer, suggest, refuse передают смысл целиком: «Shall I help?» → «He offered to help»."
      ]
    },
    items: [
      { type: "choice", q: "She asked me where ___.", opts: ["did I live", "I lived", "do I live"], a: 1, why: "В косвенном вопросе прямой порядок слов без did." },
      { type: "choice", q: "He asked me ___ I had finished the project.", opts: ["that", "if", "what"], a: 1, why: "Общий вопрос (да/нет) передаётся через if/whether." },
      { type: "text", q: "\"Did you see the match yesterday?\" → He asked me ___ the match the day before.", accept: ["if I had seen", "whether I had seen", "if I'd seen", "whether I'd seen", "if I saw", "whether I saw"], why: "Past Simple обычно сдвигается в Past Perfect (в разговорной речи можно оставить saw); вопрос да/нет — if/whether." },
      { type: "choice", q: "The teacher told us ___ our phones.", opts: ["to switch off", "switch off", "that switch off"], a: 0, why: "Приказ: tell + someone + to + V." },
      { type: "text", q: "\"Don't be late!\" → Mum told me ___ late.", accept: ["not to be"], why: "Отрицательный приказ: not to + V." },
      { type: "choice", q: "\"Could you help me with the bags?\" → She asked me ___ her with the bags.", opts: ["to help", "help", "helping", "that I help"], a: 0, why: "Просьба: ask + someone + to + V." },
      { type: "text", q: "\"What are you doing?\" → My sister asked me what I ___ (do).", accept: ["was doing"], why: "Present Continuous сдвигается в Past Continuous, порядок прямой." },
      { type: "choice", q: "He wanted to know ___.", opts: ["when does the film start", "when the film started", "when did the film start"], a: 1, why: "Прямой порядок слов и сдвиг времени: when the film started." },
      { type: "choice", q: "\"Shall I open the window?\" → He ___ open the window.", opts: ["offered to", "asked to", "told me to"], a: 0, why: "Shall I…? — это предложение помощи: offer to + V." },
      { type: "text", q: "\"Will you come to my party?\" → Ann asked me if I ___ to her party.", accept: ["would come", "'d come", "d come"], why: "will в косвенной речи становится would." }
    ]
  },
  {
    id: "b2-future-continuous-perfect", level: "B2", title: "Future Continuous and Future Perfect",
    rule: {
      intro: "Future Continuous — действие будет в процессе в определённый момент будущего. Future Perfect — действие завершится к определённому моменту будущего.",
      blocks: [
        { h: "Future Continuous: will be + V-ing", rows: [
          ["процесс в момент будущего", "This time tomorrow I'll be lying on the beach."],
          ["вежливый вопрос о планах", "Will you be using the laptop this evening?"]
        ] },
        { h: "Future Perfect: will have + V3", rows: [
          ["завершится к моменту (by …)", "By the end of June we will have finished our exams."],
          ["отрицание", "I won't have finished the essay by Monday."]
        ] },
        { h: "Future Perfect Continuous: will have been + V-ing", rows: [
          ["сколько времени к моменту будущего", "By the time he's 18, Max will have been playing for the team for three years."],
          ["с глаголами состояния — Future Perfect", "Next month they will have been married for ten years."]
        ] }
      ],
      tips: [
        "By + момент будущего — частый сигнал Future Perfect, когда важно, что к этому моменту всё уже будет завершено: «By 9 I will have finished it». Обещание «I'll do it by 9» тоже правильно — это просто другое значение.",
        "После when, by the time, before в будущем — Present Simple: «By the time you get home…», а не «will get».",
        "Will you be …ing? звучит вежливее, чем Will you …?: спрашиваем о планах, а не просим."
      ]
    },
    items: [
      { type: "choice", q: "This time tomorrow I ___ on the beach.", opts: ["will lie", "will be lying", "will have lain"], a: 1, why: "Процесс в конкретный момент будущего — Future Continuous." },
      { type: "choice", q: "By the end of June, we ___ all our exams.", opts: ["will finish", "will have finished", "will be finishing"], a: 1, why: "by + момент будущего → завершённость: Future Perfect." },
      { type: "text", q: "Don't call me at 8 — I ___ (watch) the final.", accept: ["will be watching", "'ll be watching", "ll be watching", "am going to be watching", "'m going to be watching", "m going to be watching"], why: "В 8 часов действие будет в процессе — Future Continuous." },
      { type: "text", q: "By 2040, scientists ___ (find) a cure for this disease, I hope.", accept: ["will have found", "'ll have found", "ll have found"], why: "Завершится к моменту в будущем — Future Perfect." },
      { type: "choice", q: "___ using the laptop this evening? I need to borrow it.", opts: ["Will you be", "Will you have", "Are you going"], a: 0, why: "Вежливый вопрос о планах — Future Continuous: Will you be + V-ing." },
      { type: "choice", q: "By the time you get home, I ___ dinner.", opts: ["will have cooked", "will cook", "cook"], a: 0, why: "by the time + завершённость к моменту — Future Perfect." },
      { type: "text", q: "Next month, they ___ (be) married for ten years.", accept: ["will have been", "'ll have been", "ll have been"], why: "Длительность к моменту будущего с глаголом состояния be — Future Perfect." },
      { type: "choice", q: "This time next week we ___ over the Alps on our way to Rome.", opts: ["will be flying", "will have flown", "fly"], a: 0, why: "This time next week — процесс в момент будущего: Future Continuous." },
      { type: "choice", q: "By the time he's 18, Max ___ for the national team for three years.", opts: ["will have been playing", "will be playing", "will play"], a: 0, why: "Длительность (for three years) к моменту будущего — Future Perfect Continuous." },
      { type: "text", q: "I ___ (not / finish) the essay by Monday — it's too long.", accept: ["won't have finished", "will not have finished"], why: "by Monday + не будет завершено — отрицательный Future Perfect." }
    ]
  },
  {
    id: "b2-modals-deduction", level: "B2", title: "Modals of deduction: must / might / can’t (have)",
    rule: {
      intro: "Модальные глаголы помогают делать выводы: насколько мы уверены, что что-то правда. Для настоящего — модальный + V, для прошлого — модальный + have + V3.",
      blocks: [
        { h: "Настоящее", rows: [
          ["must + V — уверен, что да", "Her lights are on. She must be at home."],
          ["might / may / could + V — возможно", "She might be asleep."],
          ["can't + V — уверен, что нет", "That can't be Tom — he's in London."]
        ] },
        { h: "Прошлое", rows: [
          ["must have + V3", "The ground is wet. It must have rained."],
          ["might / may / could have + V3", "I might have left my keys at school."],
          ["can't / couldn't have + V3", "He can't have seen us — he didn't say hello."]
        ] },
        { h: "Процесс", rows: [
          ["must be + V-ing", "He must be sleeping — it's 3 a.m."],
          ["might have been + V-ing", "She might have been training when you called."]
        ] }
      ],
      tips: [
        "Противоположность must в выводах — can't, а не mustn't: «He can't be serious», не «He mustn't be serious» (mustn't — запрет).",
        "«Должно быть, он ушёл» — must have left, а не «must leave» или «should have left» (should have = упрёк: «надо было»).",
        "Couldn't have + V3 тоже значит уверенность «не мог», а could have + V3 — «мог бы, но не сделал» или «возможно»."
      ]
    },
    items: [
      { type: "choice", q: "Her lights are on. She ___ be at home.", opts: ["must", "can't", "mustn't"], a: 0, why: "Логичный вывод «точно да» — must." },
      { type: "choice", q: "That ___ be Tom — he's in London this week.", opts: ["must", "can't", "might"], a: 1, why: "Уверенность «точно нет» — can't." },
      { type: "text", q: "The ground is wet. It ___ (rain) last night.", accept: ["must have rained", "must've rained"], why: "Уверенный вывод о прошлом: must have + V3." },
      { type: "choice", q: "I can't find my keys. I ___ have left them at school — I'm not sure.", opts: ["must", "might", "can't"], a: 1, why: "«Не уверен» — только возможность: might have + V3." },
      { type: "text", q: "He ___ (not / see) us — he didn't say hello.", accept: ["can't have seen", "cannot have seen", "couldn't have seen", "could not have seen"], why: "Уверенность «точно не» о прошлом: can't / couldn't have + V3." },
      { type: "choice", q: "She got 100% on the test. She ___ have studied a lot.", opts: ["must", "can't", "should"], a: 0, why: "Вывод «наверняка» о прошлом — must have; should have — это упрёк." },
      { type: "choice", q: "Which sentence means \"I'm sure he isn't telling the truth\"?", opts: ["He mustn't be telling the truth.", "He can't be telling the truth.", "He might not be telling the truth."], a: 1, why: "Уверенное «нет» — can't; mustn't — запрет, might not — лишь возможность." },
      { type: "text", q: "Lisa isn't answering her phone. She ___ (sleep) right now — I'm not sure. (use a modal)", accept: ["might be sleeping", "may be sleeping", "could be sleeping"], why: "«Не уверен» → возможность; процесс сейчас: might/may/could be + V-ing." },
      { type: "choice", q: "You ___ be tired after that marathon! Sit down.", opts: ["must", "can't", "might not"], a: 0, why: "Очевидный вывод — must." },
      { type: "text", q: "The window was locked from the inside. The thief ___ (not / get in) through it.", accept: ["can't have got in", "cannot have got in", "couldn't have got in", "could not have got in", "can't have gotten in", "cannot have gotten in", "couldn't have gotten in", "could not have gotten in"], why: "Невозможность в прошлом: can't / couldn't have + V3." }
    ]
  },
  {
    id: "b2-inversion", level: "B2", title: "Inversion: Never have I…, Not only…, Hardly…",
    rule: {
      intro: "Инверсия — вопросительный порядок слов в утверждении после отрицательных или ограничительных наречий в начале. Делает речь книжной и выразительной; любимая тема олимпиад.",
      blocks: [
        { h: "Отрицательные наречия", rows: [
          ["Never / Rarely / Seldom + aux + S + V", "Never have I seen such a sunset."],
          ["Little + did + S + V", "Little did she know that the party was for her."],
          ["Under no circumstances + aux + S", "Under no circumstances should you open this door."]
        ] },
        { h: "Not only … but also", rows: [
          ["Not only + aux + S + V, but … also", "Not only did she pass the exam, but she also got top marks."]
        ] },
        { h: "Сразу как только", rows: [
          ["Hardly / Scarcely + had + S + V3 + when", "Hardly had I got home when it started to rain."],
          ["No sooner + had + S + V3 + than", "No sooner had we sat down than the film started."]
        ] },
        { h: "Only / Not until", rows: [
          ["Only after / Only then + aux + S", "Only after the match did I realise how tired I was."],
          ["Not until + придаточное + aux + S", "Not until I moved to London did I understand it."]
        ] }
      ],
      tips: [
        "В Past Simple нужен did: «Not only did he win», а не «Not only he won» и не «Not only won he».",
        "Пары нельзя путать: Hardly … when, No sooner … than. «No sooner had I… when» — ошибка.",
        "После Only after / Not until инверсия идёт во второй части предложения: «Only after I left did I remember», а не «did I leave»."
      ]
    },
    items: [
      { type: "choice", q: "Never ___ such a beautiful sunset.", opts: ["I have seen", "have I seen", "I saw"], a: 1, why: "После Never в начале — инверсия: have I seen." },
      { type: "choice", q: "Not only ___ the exam, but she also got the highest score.", opts: ["she passed", "did she pass", "passed she"], a: 1, why: "Not only + did + подлежащее + V." },
      { type: "choice", q: "Hardly ___ home when it started to rain.", opts: ["I had got", "had I got", "did I get"], a: 1, why: "Hardly … when: Past Perfect с инверсией — had I got." },
      { type: "text", q: "No sooner ___ (we / sit) down than the film started.", accept: ["had we sat"], why: "No sooner + had + подлежащее + V3 … than." },
      { type: "text", q: "Rarely ___ (he / be) late for training.", accept: ["is he", "was he", "has he been"], why: "После Rarely — инверсия: is he / was he / has he been." },
      { type: "choice", q: "Hardly had the concert begun ___ the lights went out.", opts: ["than", "when", "that"], a: 1, why: "Hardly сочетается с when (than — пара к No sooner)." },
      { type: "choice", q: "Only after the match ___ how tired I was.", opts: ["I realised", "did I realise", "I did realise"], a: 1, why: "Only after … — инверсия в главной части: did I realise." },
      { type: "text", q: "Not until I moved to London ___ (I / understand) how big a city can be.", accept: ["did I understand"], why: "Not until + придаточное, затем инверсия: did I understand." },
      { type: "choice", q: "Little ___ that the party was for her.", opts: ["she knew", "did she know", "knew she"], a: 1, why: "Little в начале (= совсем не) — инверсия с did." },
      { type: "text", q: "Under no circumstances ___ (you / should / open) this door.", accept: ["should you open"], why: "Under no circumstances + модальный + подлежащее + V." }
    ]
  },
  {
    id: "b2-participle-clauses", level: "B2", title: "Participle clauses",
    rule: {
      intro: "Причастный оборот заменяет придаточное предложение и делает текст короче. Аналог русских причастных и деепричастных оборотов; подлежащее у оборота и главной части должно быть одно и то же.",
      blocks: [
        { h: "Present Participle (V-ing)", rows: [
          ["одновременное действие / причина", "Hearing the news, she burst into tears."],
          ["вместо who/which + Continuous", "The boy sitting next to Anna is my cousin."],
          ["отрицание: Not + V-ing", "Not knowing what to say, I stayed silent."]
        ] },
        { h: "Past Participle (V3) — пассивное значение", rows: [
          ["вместо which was / were + V3", "The photos taken on our trip are amazing."],
          ["в начале предложения", "Built in 1889, the Eiffel Tower is visited by millions."]
        ] },
        { h: "Perfect Participle (Having + V3)", rows: [
          ["действие закончилось раньше", "Having finished my homework, I went out."],
          ["длительность до другого действия", "Having waited for an hour, we decided to walk."]
        ] }
      ],
      tips: [
        "«Висячий» оборот — грубая ошибка: «Walking down the street, a dog bit me» значит, что по улице шла собака. Правильно: «Walking down the street, I was bitten by a dog».",
        "V-ing — активное значение (тот, кто делает), V3 — пассивное (то, что сделали): «a boring film» / «a book written by a teen».",
        "Отрицание ставится перед причастием: «Not having read the book…», а не «Having not…» (второй вариант встречается, но первый надёжнее)."
      ]
    },
    items: [
      { type: "choice", q: "___ the homework, I went out with my friends.", opts: ["Having finished", "Finished", "Being finished"], a: 0, why: "Действие завершилось раньше другого — Having + V3." },
      { type: "choice", q: "The boy ___ next to Anna is my cousin.", opts: ["sitting", "who sitting", "sits"], a: 0, why: "Причастие V-ing заменяет who is sitting." },
      { type: "choice", q: "___ in 1889, the Eiffel Tower is visited by millions every year.", opts: ["Built", "Building", "Having built"], a: 0, why: "Башню построили — пассивное значение: V3." },
      { type: "text", q: "___ (not / know) what to say, I stayed silent.", accept: ["not knowing"], why: "Отрицательный причастный оборот: Not + V-ing." },
      { type: "choice", q: "___ the news, she burst into tears.", opts: ["Hearing", "Heard", "To hear"], a: 0, why: "Одновременное активное действие того же подлежащего — V-ing." },
      { type: "text", q: "The book ___ (write) by a 16-year-old became a bestseller.", accept: ["written"], why: "Книгу написали — пассивное значение: V3 (= which was written)." },
      { type: "choice", q: "Which sentence is correct?", opts: ["Walking down the street, a dog bit me.", "Walking down the street, I was bitten by a dog.", "Walked down the street, I was bitten by a dog."], a: 1, why: "Подлежащее оборота и главной части совпадает (I); активное действие — V-ing." },
      { type: "text", q: "___ (wait) for the bus for an hour, we decided to walk.", accept: ["having waited", "having been waiting"], why: "Длительное действие до другого — Having + V3 (или Having been + V-ing)." },
      { type: "choice", q: "Students ___ to take part in the olympiad must register by Friday.", opts: ["wishing", "wished", "wish"], a: 0, why: "V-ing заменяет who wish: активное значение." },
      { type: "text", q: "The photos ___ (take) on our trip are amazing.", accept: ["taken"], why: "Фотографии сделаны — пассив: V3 (= which were taken)." }
    ]
  },
  {
    id: "b2-linkers", level: "B2", title: "Linking words: although / despite / however / whereas",
    rule: {
      intro: "Слова-связки показывают противопоставление. Главное — что идёт после связки: целое предложение, существительное или запятая.",
      blocks: [
        { h: "+ предложение (подлежащее + глагол)", rows: [
          ["although / even though / though", "Although it was raining, we went for a walk."],
          ["whereas / while — сравнение двух фактов", "Tom is outgoing, whereas his brother is shy."]
        ] },
        { h: "+ существительное или V-ing", rows: [
          ["despite + noun / V-ing", "Despite the rain, we went out. Despite feeling tired, she ran."],
          ["in spite of + noun / V-ing", "In spite of the cold, we swam."],
          ["despite the fact that + предложение", "Despite the fact that he was ill, he played."]
        ] },
        { h: "Связь между предложениями", rows: [
          ["However, … (в начале, с запятой)", "I studied hard. However, I didn't pass."],
          ["…, however, … (в середине)", "My sister, however, prefers art."]
        ] }
      ],
      tips: [
        "Не бывает «despite of»: либо despite, либо in spite of. «Despite the cold», а не «Despite of the cold».",
        "Although не ставится перед существительным: «Although the rain» — ошибка; правильно «Despite the rain» или «Although it rained».",
        "However не соединяет два предложения запятой как but: «I tried, however I failed» — ошибка; нужна точка или точка с запятой: «I tried; however, I failed»."
      ]
    },
    items: [
      { type: "choice", q: "___ it was raining, we went for a walk.", opts: ["Despite", "Although", "However"], a: 1, why: "Дальше идёт целое предложение (it was raining) — although." },
      { type: "choice", q: "___ the rain, we went for a walk.", opts: ["Although", "Despite", "Even though"], a: 1, why: "Дальше существительное — despite." },
      { type: "choice", q: "I love science. My sister, ___, prefers art.", opts: ["however", "although", "despite"], a: 0, why: "Связка между предложениями в середине, в запятых — however." },
      { type: "choice", q: "Tom is very outgoing, ___ his brother is shy.", opts: ["whereas", "despite", "however"], a: 0, why: "Сравнение двух фактов внутри одного предложения — whereas." },
      { type: "text", q: "Despite ___ (feel) tired, she finished the race.", accept: ["feeling"], why: "После despite — V-ing." },
      { type: "choice", q: "In spite ___ the fact that he was ill, he played in the final.", opts: ["of", "that", "the"], a: 0, why: "Устойчивое выражение: in spite of." },
      { type: "text", q: "I studied hard. ___, I didn't pass. (one word, starts with H)", accept: ["however"], why: "Связь между двумя предложениями в начале второго — However с запятой." },
      { type: "choice", q: "Which sentence is correct?", opts: ["Despite of the cold, we swam.", "Despite the cold, we swam.", "Although the cold, we swam."], a: 1, why: "Despite без of; although требует предложения." },
      { type: "text", q: "Kate was the best player on the team ___ being the youngest. (one word)", accept: ["despite"], why: "Перед V-ing одним словом — despite." },
      { type: "choice", q: "___ he's only 15, he already speaks three languages.", opts: ["Even though", "Despite", "However", "In spite of"], a: 0, why: "Дальше предложение (he's only 15) — even though." }
    ]
  }
);
