window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-pv-core", group: "Phrasal verbs", title: "Phrasal verbs: the essentials",
    rule: {
      intro: "Фразовый глагол — это глагол + частица, и смысл целого часто не выводится из частей. На олимпиаде нужно не только выбрать частицу, но и поставить глагол в правильную форму.",
      blocks: [
        { h: "Отказ, отмена, прекращение", rows: [
          ["put off", "отложить: The meeting was put off until Friday."],
          ["turn down", "отклонить (предложение), убавить: She turned down the offer."],
          ["give up", "бросить, сдаться: He gave up smoking last year."],
          ["run out of", "закончиться (о запасе): We've run out of coffee."]
        ] },
        { h: "Начало, продолжение, создание", rows: [
          ["take up", "начать заниматься (хобби): I took up chess at ten."],
          ["carry on", "продолжать: Carry on reading, please."],
          ["set up", "основать, организовать: They set up a charity in 2015."],
          ["bring up", "воспитать; поднять (тему): She was brought up by her aunt. / Don't bring up politics."]
        ] },
        { h: "Поиск, встреча, сходство", rows: [
          ["look into", "расследовать, изучить: The police are looking into the case."],
          ["come across", "случайно наткнуться: I came across an old photo."],
          ["take after", "быть похожим на старшего родственника: She takes after her mum."],
          ["get over", "оправиться, пережить: It took him weeks to get over the flu."]
        ] }
      ],
      tips: [
        "Сначала определи время по контексту, потом ставь форму: Yesterday she ___ (turn down) → turned down.",
        "take after — только про родственников старшего поколения и без Continuous: He takes after his dad (не is taking after).",
        "run out of требует of перед дополнением: We ran out of time. Без дополнения — of нет: Time is running out."
      ]
    },
    items: [
      { type: "text", q: "The final was ___ until Sunday because of the storm. (put / off)", accept: ["put off"], why: "put off — отложить; пассив was + V3, put — неправильный глагол (put-put-put)." },
      { type: "text", q: "Last week she ___ a job offer from a huge bank because the hours were insane. (turn / down)", accept: ["turned down"], why: "turn down — отклонить; last week → Past Simple." },
      { type: "text", q: "We've ___ milk — could you pop to the shop? (run / out of)", accept: ["run out of"], why: "run out of — израсходовать; Present Perfect: have + V3 (run)." },
      { type: "text", q: "Tom really ___ his father: they have the same laugh and the same temper. (take / after)", accept: ["takes after"], why: "take after — быть похожим на родственника; факт в настоящем → Present Simple, he → takes." },
      { type: "text", q: "It took her almost a year to ___ the break-up. (get / over)", accept: ["get over"], why: "get over — пережить, оправиться; после to — инфинитив." },
      { type: "text", q: "Last autumn Anna ___ yoga to cope with exam stress. (take / up)", accept: ["took up"], why: "take up — начать заниматься; last autumn → Past Simple took." },
      { type: "text", q: "Please don't ___ the subject of money at Grandma's birthday dinner. (bring / up)", accept: ["bring up"], why: "bring up — завести разговор о чём-то; после don't — инфинитив." },
      { type: "choice", q: "While tidying the attic, I came ___ a bundle of letters my grandfather had written during the war.", opts: ["across", "up with", "into", "off"], a: 0, why: "come across — случайно найти. come up with — придумать, come into — унаследовать, come off — отвалиться/удаться." },
      { type: "choice", q: "The fire brigade is still looking ___ the cause of the blaze.", opts: ["into", "after", "up to", "out"], a: 0, why: "look into — расследовать. look after — заботиться, look up to — уважать, look out — остерегаться." },
      { type: "choice", q: "Despite the pouring rain, the street musicians ___ playing as if nothing had happened.", opts: ["carried on", "turned down", "set up", "took after"], a: 0, why: "carry on doing — продолжать; despite подсказывает, что игра не прекратилась." }
    ]
  },
  {
    id: "lx-pv-advanced", group: "Phrasal verbs", title: "Phrasal verbs: olympiad level",
    rule: {
      intro: "Олимпиада любит трёхчастные глаголы (verb + adverb + preposition) и глаголы с несколькими значениями. Выучи их как единые слова — частицы в них не переставляются.",
      blocks: [
        { h: "Трёхчастные: частицы не разделяются", rows: [
          ["come up with", "придумать: She came up with a brilliant plan."],
          ["put up with", "терпеть, мириться: I can't put up with his rudeness."],
          ["live up to", "оправдать (ожидания): The film didn't live up to the hype."],
          ["get away with", "избежать наказания: He got away with lying."],
          ["brush up on", "освежить знания: I must brush up on my Spanish."],
          ["look up to", "уважать, равняться на: Kids look up to their coaches."],
          ["cut down on", "сократить потребление: Cut down on sugar."]
        ] },
        { h: "Двухчастные с хитрым смыслом", rows: [
          ["fall out (with sb)", "поссориться: They fell out over money."],
          ["make up", "помириться; выдумать; составлять: They kissed and made up. / He made up an excuse."],
          ["turn out", "оказаться: The rumour turned out to be true."],
          ["pull off", "провернуть, суметь сделать трудное: They pulled off a surprise win."],
          ["wear off", "пройти, ослабнуть (об эффекте): The anaesthetic wore off."]
        ] }
      ],
      tips: [
        "В трёхчастных глаголах дополнение стоит только в конце: put up with the noise, а не put the noise up with.",
        "fall out ↔ make up — пара антонимов: They fell out last month but have made up now.",
        "turn out + to be / that: It turned out that he was right. Не путай с turn up — появиться."
      ]
    },
    items: [
      { type: "text", q: "Who ___ the idea of last Friday's surprise party for Mr Ellis? (come / up with)", accept: ["came up with"], why: "come up with — придумать; вопрос о прошлом событии → Past Simple came." },
      { type: "text", q: "I can't ___ this drilling any longer — I'm moving to the library! (put / up with)", accept: ["put up with"], why: "put up with — терпеть; после can't — инфинитив." },
      { type: "text", q: "Sadly, the long-awaited sequel didn't ___ the hype: critics called it dull. (live / up to)", accept: ["live up to"], why: "live up to — оправдать ожидания; после didn't — инфинитив." },
      { type: "text", q: "He copied his essay from the internet and thought he had ___ it — until the teacher ran a plagiarism check. (get / away with)", accept: ["got away with", "gotten away with"], why: "get away with — остаться безнаказанным; Past Perfect: had + V3 (got, амер. gotten)." },
      { type: "text", q: "The painkiller is starting to ___, and my tooth hurts again. (wear / off)", accept: ["wear off"], why: "wear off — перестать действовать; после starting to — инфинитив." },
      { type: "text", q: "The forecast was gloomy, but in the end the day ___ to be warm and sunny. (turn / out)", accept: ["turned out"], why: "turn out to be — оказаться; рассказ о прошлом → turned out." },
      { type: "choice", q: "I need to brush up ___ my French before the exchange trip to Lyon.", opts: ["on", "with", "for", "at"], a: 0, why: "brush up on — освежить знания (можно и brush up sth без предлога, но с предлогом — только on)." },
      { type: "choice", q: "The two sisters ___ over their grandmother's house and haven't spoken since.", opts: ["fell out", "made up", "pulled off", "looked up"], a: 0, why: "fall out (over sth) — поссориться; «не разговаривают с тех пор» указывает на ссору, а не примирение." },
      { type: "choice", q: "Nobody believed the underdogs could win, but they ___ an incredible comeback in the last ten minutes.", opts: ["pulled off", "wore off", "fell out", "cut down"], a: 0, why: "pull off — суметь сделать что-то очень трудное." },
      { type: "choice", q: "Her doctor advised her to cut down ___ coffee and get more sleep.", opts: ["on", "from", "with", "off"], a: 0, why: "cut down on sth — сократить потребление чего-то." }
    ]
  },
  {
    id: "lx-prep-dependent", group: "Prepositions", title: "Dependent prepositions: rely on, keen on, aware of…",
    rule: {
      intro: "Многие глаголы, прилагательные и существительные требуют «своего» предлога, и он часто не совпадает с русским. Такие сочетания учат блоками.",
      blocks: [
        { h: "Глагол + предлог", rows: [
          ["rely on / depend on", "полагаться, зависеть: You can rely on me."],
          ["insist on + -ing", "настаивать: He insisted on paying."],
          ["congratulate sb on", "поздравить с: I congratulated her on her win."],
          ["accuse sb of / blame sb for", "обвинить в: They accused him of theft. / They blamed him for the crash."]
        ] },
        { h: "Прилагательное + предлог", rows: [
          ["keen on / fond of", "увлечённый, любящий: She's keen on chess."],
          ["aware of / capable of", "осведомлённый, способный: Are you aware of the risks?"],
          ["famous for / responsible for", "знаменитый, ответственный за: Parma is famous for its ham."],
          ["dependent on / independent of", "зависимый / независимый от: dependent on parents, independent of them."]
        ] },
        { h: "Существительное + предлог", rows: [
          ["reason for / cause of", "причина: the reason for the delay / the cause of the fire"],
          ["increase / decrease in", "рост, снижение (чего-то): an increase in prices"],
          ["solution to / key to", "решение, ключ к: a solution to the problem"]
        ] }
      ],
      tips: [
        "Русское «зависеть от» подталкивает к from, но в английском depend ON и dependent ON (а вот independent OF).",
        "reason FOR, но cause OF: the reason for the fire, но the cause of the fire.",
        "После предлога глагол идёт с -ing: She insisted on going, not on to go."
      ]
    },
    items: [
      { type: "text", q: "You can always rely ___ Kate — she has never let anyone down.", accept: ["on", "upon"], why: "rely on (upon) — полагаться на." },
      { type: "text", q: "Were you aware ___ the risks before you signed the contract?", accept: ["of"], why: "aware of — осведомлённый о." },
      { type: "text", q: "Ever since the trip to Iceland, my brother has been really keen ___ landscape photography.", accept: ["on"], why: "keen on — увлечённый чем-то." },
      { type: "text", q: "Air pollution is responsible ___ millions of premature deaths every year.", accept: ["for"], why: "responsible for — ответственный за, являющийся причиной." },
      { type: "text", q: "My grandfather insisted ___ paying for everyone's dinner.", accept: ["on", "upon"], why: "insist on + -ing — настаивать на." },
      { type: "text", q: "There has been a sharp increase ___ the number of tourists visiting Kazan.", accept: ["in"], why: "an increase in sth — рост чего-то (of ставится перед величиной: an increase of 20%)." },
      { type: "choice", q: "The little town of Gruyères is famous ___ its cheese.", opts: ["for", "of", "with", "by"], a: 0, why: "famous for — знаменитый чем-то." },
      { type: "choice", q: "At 25, he still felt embarrassed about being financially dependent ___ his parents.", opts: ["on", "from", "of", "to"], a: 0, why: "dependent on — зависимый от (но independent of)." },
      { type: "choice", q: "The professor congratulated her ___ winning the international prize.", opts: ["on", "at", "with", "about"], a: 0, why: "congratulate sb on sth — поздравить с чем-то." },
      { type: "choice", q: "The airline gave no explanation, and nobody knew the reason ___ the delay.", opts: ["for", "of", "to", "about"], a: 0, why: "the reason for — причина чего-то (сравни: the cause of)." }
    ]
  },
  {
    id: "lx-prep-none", group: "Prepositions", title: "Verbs with NO preposition: await, discuss, enter, marry, resemble…",
    rule: {
      intro: "Под влиянием русского («обсуждать о», «жениться на», «отвечать на») хочется вставить лишний предлог. На финале ВсОШ это классическое задание «найди лишнее слово».",
      blocks: [
        { h: "Глаголы без предлога", rows: [
          ["await sth", "ждать (= wait for): We await your reply. Но: We wait for your reply."],
          ["discuss sth", "обсуждать: We discussed the plan. (но a discussion about)"],
          ["enter a place", "войти: She entered the room. (enter into — вступить в соглашение)"],
          ["marry sb", "жениться, выйти замуж: He married Anna. (но get married to)"],
          ["resemble sb", "быть похожим: She resembles her aunt."],
          ["answer sb/sth", "ответить: Answer the question. (но reply to)"]
        ] },
        { h: "Ловушки с управлением", rows: [
          ["provide sb with sth / provide sth for sb", "обеспечить: provide students with laptops / provide laptops for students"],
          ["explain sth to sb", "объяснить кому-то: Explain it to me. Не explain me!"],
          ["listen to vs hear", "listen to — слушать (с предлогом), hear — слышать (без): Listen to me! / I heard a noise."],
          ["arrive in / at", "in — город, страна: arrive in Paris; at — здание, пункт: arrive at the station. Никогда arrive to."]
        ] }
      ],
      tips: [
        "Подставь «синоним-соперник»: wait FOR = await; get married TO = marry; reply TO = answer. У второго слова предлога нет.",
        "Существительное может иметь предлог, а глагол — нет: a discussion about the film, но discuss the film.",
        "В задании «find the extra word» проверь каждый предлог после глагола: He entered into the hall → into лишний."
      ]
    },
    items: [
      { type: "text", q: "Find the extra word: We are awaiting for your reply.", accept: ["for"], why: "await — без предлога (wait for = await)." },
      { type: "text", q: "Find the extra word: The committee discussed about the new rules for almost three hours.", accept: ["about"], why: "discuss sth — без предлога (но a discussion about)." },
      { type: "text", q: "Find the extra word: As soon as the headmaster entered into the hall, everyone fell silent.", accept: ["into"], why: "enter a place — без предлога; enter into — только о соглашениях и переговорах." },
      { type: "text", q: "Find the extra word: In 2019 she married with a famous violinist from Vienna.", accept: ["with"], why: "marry sb — без предлога (или get married to sb)." },
      { type: "text", q: "Find the extra word: With his red hair and freckles, he strongly resembles to his grandfather.", accept: ["to"], why: "resemble sb — без предлога." },
      { type: "text", q: "Find the extra word: Three weeks have passed, and nobody has answered to my letter.", accept: ["to"], why: "answer sth — без предлога (но reply to)." },
      { type: "choice", q: "The school provides every student ___ a laptop and a tablet.", opts: ["with", "for", "to", "by"], a: 0, why: "provide sb with sth; for — в обратном порядке: provide laptops for students." },
      { type: "choice", q: "Could you explain ___ how this ticket machine works?", opts: ["to me", "me", "me about", "at me"], a: 0, why: "explain sth to sb; explain me — типичная ошибка." },
      { type: "choice", q: "After a twelve-hour flight, we finally arrived ___ Buenos Aires late at night.", opts: ["in", "at", "to", "into"], a: 0, why: "arrive in + город/страна; at — здание или пункт; arrive to не бывает." },
      { type: "choice", q: "I thought I heard footsteps upstairs, so I stopped and ___ carefully.", opts: ["listened", "listened to", "heard to", "heard"], a: 0, why: "listen — слушать; to нужен только перед дополнением (listen to music), а здесь дополнения нет." }
    ]
  }
);
