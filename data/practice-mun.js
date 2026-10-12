// Тренировочные наборы Use of English к муниципальному варианту (Москва, 10–11 классы).
// Источник — официальные файлы ЦПМ прошлых лет: tasks-/ans-…-2023-24 и tasks-/ans-…-2024-25 (PDF).
// Тексты, инструкции, примеры и ключи перенесены дословно; спорные места сверены по отрисованным
// страницам, а не только по извлечённому тексту. 2022/23 сюда не взят намеренно — он оставлен
// для пробного экзамена; 2025/26 уже есть в приложении как сам вариант.
//
// Форма — та же, что у заданий m-u1…m-u4 в variant-mun-msk-25-26.js, чтобы экран и подсчёт
// работали без правок: Task 1–3 — type "text" с accept, Task 4 — type "choice" с opts A–N.
//
// Что сделано с текстом и почему:
// - Переносы строк бумаги склеены пробелом: в бумаге это перенос по ширине колонки, а не абзац.
//   Слова, разорванные переносом («well-/paying», «self-/defeating»), склеены как в оригинале.
// - Опечатки оригинала оставлены как есть (2023/24: «It you have a tattoo», «prints ads»,
//   «formally», «denotation», «A peson who…»): учитель просил ничего не придумывать.
//   В Task 1 это не «лишние слова» — ключ на них не указывает.
// - Варианты ключа через «/» разнесены по accept, как в m-u2; «favo(u)rite» — два написания.
// - В 2024/25 Task 4, вариант B, в PDF стоят кириллические «с» и «а» в «сhancellor» и
//   «аrchbishop» (на странице не отличить от латиницы). Заменены латинскими: иначе слово не
//   найдётся ни поиском, ни словарём.
(function () {
  function tx(n, q, accept) { return { n: n, q: q, accept: accept }; }
  function ch(n, q, a) { return { n: n, q: q, a: a }; }

  var SRC_2324 = "Moscow municipal stage 2023/24 (official)";
  var SRC_2425 = "Moscow municipal stage 2024/25 (official)";

  // Образец Task 2 одинаков в оба года.
  var T2_EXAMPLE = "0. The pool isn’t deep enough to swim in. — too — The pool ____ ______ _____ ______ swim in. (4 words) — is too shallow to";

  // 2023/24 Task 4: в инструкции написано «A – M», но в списке 14 явлений A–N, и N в ключ не входит —
  // так в обоих официальных файлах. Инструкция оставлена дословно, список — полностью.
  var PHEN_2324 = [
    { k: "A", t: "To do the same things as the people around you to appear as successful as they are" },
    { k: "B", t: "What is right or wrong for one sex is right or wrong for the other as well" },
    { k: "C", t: "The capital of Ireland" },
    { k: "D", t: "Attract more attention and praise than other people in a particular situation" },
    { k: "E", t: "A work of fiction which is so bad and has so little meaning that its main value is in the paper it’s written on" },
    { k: "F", t: "MPs who are their parties’ spokespeople" },
    { k: "G", t: "A work of detective fiction, presented mainly as a puzzle" },
    { k: "H", t: "The area that an MP represents in Parliament" },
    { k: "I", t: "A peson who treats acute and chronic illnesses and provides preventive care and health education to patients of all ages" },
    { k: "J", t: "It was long famous as the goal of eloping English couples seeking hasty marriage. They were obliged to cross the border into Scotland." },
    { k: "K", t: "The westernmost peninsula of the county of Cornwall." },
    { k: "L", t: "The capital of Scotland" },
    { k: "M", t: "A person who is a close adviser to a politician or political party and whose job is to make them look good in the media" },
    { k: "N", t: "a large gathering of people in a public place in support of an MP" }
  ];

  // 2024/25 Task 4: явления A–N, лишние по ключу — B, E, H, J.
  // Последняя фраза B в PDF стоит отдельной строкой без отступа, но относится к B.
  var PHEN_2425 = [
    { k: "A", t: "It was the first major civil engineering work of Isambard Kingdom Brunel, an engineering genius and innovator. In 1833 the 27-year-old engineer was chosen to superintend the construction of the Bristol-London part, which would retain until consolidation into the nationwide system in 1948. It was the first major civil engineering work to be designed, directed, and completed by Brunel." },
    { k: "B", t: "He was chancellor to Henry II of England and then archbishop of Canterbury. He repeatedly clashed with his sovereign over the relationship between the Crown and Church. He was murdered in Canterbury Cathedral. He is sometimes referred to as Saint Thomas of Canterbury." },
    { k: "C", t: "a network of houses and other places that a group of people in the US used to illegally help slaves to become free by helping them to escape to the northern US and Canada in the period before the Civil War" },
    { k: "D", t: "an accomplished cavalry commander, then head of Parliament's New Model Army, and finally Lord Protector of England, Scotland, and Ireland. The latter title was awarded to him for life after the bloody conclusion of the English Civil Wars and the execution of King Charles I of England." },
    { k: "E", t: "an area where the air pressure is very low" },
    { k: "F", t: "some school teachers’ humorous rhyme of Henry VIII’s record number of wives" },
    { k: "G", t: "a Bavarian immigrant who arrived in San Francisco in 1850 during the Gold Rush, bringing dry goods for sale to miners. Hearing of the miners’ need for durable pants, he hired a tailor to make garments out of tent canvas." },
    { k: "H", t: "the Vikings" },
    { k: "I", t: "the Romans" },
    { k: "J", t: "some school teachers’ humorous rhyme of Charles I Stuart’s wives" },
    { k: "K", t: "From his laboratories emanated the phonograph, the carbon-button transmitter for the telephone speaker and microphone, the incandescent lamp, the first commercial electric light and power system, an experimental electric railroad, and key elements of motion-picture apparatus." },
    { k: "L", t: "It lasted from 1929 to 1941 and was a severe economic downturn caused by an overextended stock market and a drought that struck the South of the country. Despite the government’s help, it was the increased production needed for World War II that finally ended it." },
    { k: "M", t: "He was Lord Chancellor to Henry VIII of England who was executed for his refusal to endorse Henry's break of the Church in England from the Catholic Church in Rome. His most famous work today being Utopia which includes a philosophical description of an ideal society set on an island." },
    { k: "N", t: "not having a problem or difficulty any longer" }
  ];

  window.PRACTICE = window.PRACTICE || {};
  window.PRACTICE["mun-msk-25-26"] = {
    "m-u1": [
      {
        // Ключ — с. 8–10 файла ответов 2023/24. «V» (верная строка) — в 4, 8 и 13.
        // Строка 12: ключ — «of» («aware of when»); оставлено, как в официальном ключе.
        id: "p-u1-2324", section: "uoe", type: "text",
        title: "Practice · Task 1 · Moscow municipal 2023/24",
        source: SRC_2324,
        intro: "For Questions 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).",
        examples: [
          { label: "0", show: "Advertising will change profoundly over the next couple of decades, although there’s a good chance you won’t notice the difference, since the most meaningful changes won’t be visible to the casual observer.", answer: "V", correct: true },
          { label: "00", show: "It’s the changes that are happening underground that will count, and they’re the ones we should be aware of. Advertising in the future will be such stealthily and eerily, targeted, disturbingly omnipresent and inescapable.", answer: "such", near: "be such stealthily", strike: "such" }
        ],
        items: [
          tx(1, "Technology, naturally, will be the engine. User-tracking software that records your TV and Internet viewing habits in minute detail - and crosses it with your purchasing history - will allow the advertiser to know that you have children, that you eat meat, that your native tongue is Spanish and that your dishwasher is however far many years old.", ["far"]),
          tx(2, "That way you will be shown commercials for mini-vans, cheeseburgers, and replacement dishwashers, all in Spanish, and not for sports cars, tofu and replacement refrigerators, in English. In fact, this technology already exists. Refined with data that track what kinds of online ads you tend to click on – funny, sentimental, fact-laden – every commercial will have hit home.", ["have"]),
          tx(3, "Say what you will, that’s a nifty trick. In the future, people won’t be bothered with advertising messages irrelevant to them. They’ll tend to like advertising too better because it’s so carefully tailored to their tastes and will begin to feel less like an intrusion.", ["too"]),
          tx(4, "This works for the advertiser too because fewer dollars will be wasted. While it’s a little dispiriting to think we can be so predictably manipulated, maybe that’s a fair price to pay to avoid the pollution of messages you don’t care about.", ["v"]),
          tx(5, "Nevertheless, it seems clear that the advertising outlets that exist today - TV and audio commercials, prints ads, billboards and taxi tops – will be inadequate for accommodating all the commercial messages that are agitating to get out of.", ["of"]),
          tx(6, "Advertising will therefore inevitably slip beyond within the boundaries of the 30-second commercial and the full-page ad and migrate to the rest of the world, including entertainment, journalism and art.", ["within"]),
          tx(7, "You can glimpse the future now. A product placement in movies is an obvious instance of where advertising has slipped outside its traditional container into entertainment.", ["a"]),
          tx(8, "The music channels which are an entertainment medium designed specially to sell records are another classic example. Every time an artist mentions a brand in their lyrics, advertising slips into art.", ["v"]),
          tx(9, "It you have a tattoo of your team’s name, you’re already there. If you wear a T-shirt with a logo on it, you’re also there but with less pain. Eventually, every surface that can display a message will be made appropriated for advertising.", ["made"]),
          tx(10, "A backlash is inevitable. Perhaps people will be pay a premium to live in advertising-free zones.", ["be"]),
          tx(11, "People get very nervous when they see the line being blurring between advertising and other forms of content; they think advertising is some kind of infection that pollutes the purity of art, ruins objectivity and distracts from the pleasure of entertainment.", ["being"]),
          tx(12, "Yet this is missing the point. Surely consumers are smart and perfectly aware of when they’re being sold something; surely people who go to company websites are happy to find worthwhile information there and are capable of distinguishing between a commercial message and an editorial one.", ["of"]),
          tx(13, "In the main, art and journalism have long relied on direct subsidy from private sources. Don’t think for a minute that commercial interests didn’t enter into it.", ["v"]),
          tx(14, "The genuinely disturbing aspect remains of advertising is that it has begun to take over what was formally the property of the community. Take, for example, the popular Boston Garden park, naturally named after the city. It is now known as the “Fleet Center”, after the sponsoring bank. A little town in the Pacific Northwest just renamed itself after a dotcom company in return for a generous denotation.", ["remains"]),
          tx(15, "I won’t mention the name here, since I figure advertising should be paid for it. That’s when advertising has gone too far: when it’s become something we are, rather than something we see.", ["it"])
        ]
      },
      {
        // Ключ — с. 8–10 файла ответов 2024/25. «V» — только в 8.
        // Фрагмент 5 в бумаге — одна ячейка вместе с абзацем «Quite a lot of people…»
        // (начало ответа колумниста), поэтому он входит в строку 5 целиком.
        id: "p-u1-2425", section: "uoe", type: "text",
        title: "Practice · Task 1 · Moscow municipal 2024/25",
        source: SRC_2425,
        textTitle: "How can I improve my conversation skills?",
        intro: "For questions 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).",
        examples: [
          { label: "0", show: "I’m ignored when I try to chat to people. How do you do conversation? I don’t understand how it works. I can only ever communicate factual information such as “A coffee and a croissant, please.”", answer: "V", correct: true },
          { label: "00", show: "Other people seem to rattle on about anything and everything, constantly jumping from one topic to another, but I can never follow. If I ever feel that I have something to contribute and try to join in they simply ignore me or change the latter subject.", answer: "latter", near: "the latter subject", strike: "latter" }
        ],
        items: [
          tx(1, "If I will try to initiate a conversation, for example by complimenting someone on their obviously expensive camera, they will initially respond but after about 60 seconds turn away as soon as they realise that I am “trying to make conversation”.", ["will"]),
          tx(2, "On the other one hand, I am able to express myself very well in writing. Even more paradoxically I make a good living as a translator (in written form), translating from various European languages.", ["one"]),
          tx(3, "Partly this is because I take a very analytical approach to language and so I am able to dig too deep into the meaning of what the writer is trying to convey.", ["too"]),
          tx(4, "I also get along very well with animals, using a body language. For instance, I can get dogs to follow me around, walk to heel, sit or lie down merely by using gestures.", ["a"]),
          tx(5, "But it would be far nice to take my conversational skills a little bit higher. Any tips? Quite a lot of people aren’t as skilled at conversation as they think, so you are not alone. What’s great is that you are curious and asking the question.", ["far"]),
          tx(6, "Some people are being stuck on transmit (“rambling”) and think talking about themselves is good chat. Some think interrogating the other person is the way to go. But conversation is the turning together of two people. A lot of people mistake talking for conversation.", ["being"]),
          tx(7, "I wouldn’t necessarily always blame yourself either; a fruitful conversation does it require input from two people, not just one left doing the heavy lifting.", ["it"]),
          tx(8, "I went to psychotherapist and skilled conversationalist Chris Mills with whom I did a podcast on the art of listening which is a great bedrock of conversation.", ["v"]),
          tx(9, "Mills pondered on at “the difference between small talk and delivering factual information. The fundamental for a conversation to be successful is that it has to make emotional contact and a list of facts (“croissant and coffee”) on their own won’t do that. It has to have emotional zing.”", ["at"]),
          tx(10, "So to layer on what you already do you could add, “the croissants look great – do you make them here?” or “this coffee hits the spot, what a blend is it?”", ["a"]),
          tx(11, "These things won’t trigger a massive conversation because baristas often have a queue to serve over, but they are stepping stones and good practice points.", ["over"]),
          tx(12, "We also have had to be realistic about how far some conversations, in certain settings, can go. I think it’s entirely realistic that after 60 seconds someone will call time on talking about a camera. Even the most skilled conversationalist would struggle.", ["had"]),
          tx(13, "That said by some people need fewer triggers. Some spill more slowly. Being interested and curious – which you clearly are – is a great springboard for conversation; we are after all hard-wired for connection.", ["by"]),
          tx(14, "“To have a conversation you have to be able to imagine how what you’re saying is going to land with the other person. And that takes after empathy,” says Mills. Observation is also a great tool for conversation: just hearing what others talk about. There’s a reason talking about the weather is a stalwart in so many countries. It’s a connection, it’s non-committal, it’s not too personal and you can test the water with the other person.", ["after"]),
          tx(15, "But like I am said, you have to be realistic. Some conversations will never go beyond a few exchanges. Listen carefully to what people are saying and instead of facts maybe think about feelings. So if someone says, “We’re going on holiday to X” try something like “have you ever been before? Are you excited about going?” Good luck!", ["am"])
        ]
      }
    ],

    "m-u2": [
      {
        // Ключ — таблица на с. 11 файла ответов 2023/24. В бумаге задания пронумерованы «1. (19)»:
        // 1–10 — номер задания, (19)–(28) — номер в листе ответов; на экране второй номер только путал — убран.
        id: "p-u2-2324", section: "uoe", type: "text",
        title: "Practice · Task 2 · Moscow municipal 2023/24",
        source: SRC_2324,
        intro: "For items 1–10, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from two to five words. The number of words is specified in the brackets. Do not use short forms. Please mind both grammar and spelling. There is an example at the beginning (0).",
        example: T2_EXAMPLE,
        items: [
          tx(1, "Suzy couldn’t reach the picture without a ladder. — for — The picture was too high up ___ ___ ____ ____ without a ladder. (4 words)", ["for Suzy to reach"]),
          tx(2, "Those eggs will be rotten by now. — off — Those eggs ___ ___ __ __ by now. (4 words)", ["will have gone off"]),
          tx(3, "The weather was so terrible that we stayed inside and played cards. — such — It was __ ___ ___ ___ we stayed inside and played cards. (4 words)", ["such terrible weather that"]),
          tx(4, "It’s important to exercise a lot if you want to stay fit. — plenty — It’s important to ___ ___ ___ ___ if you want to stay fit. (4 words)",
            ["take plenty of exercise", "do plenty of exercise", "have plenty of exercise", "get plenty of exercise",
             "take plenty of exercises", "do plenty of exercises", "have plenty of exercises", "get plenty of exercises"]),
          tx(5, "The Wall Street Crash caused a chain reaction in stock markets around the world. — off — The Wall Street Crash __ ___ a chain reaction in stock markets around the world. (2 words)", ["set off"]),
          tx(6, "Vicki liked physics best at school. — favourite — Physics ___ ___ ___ ___ at school. (4 words)", ["was Vicki’s favourite subject"]),
          tx(7, "I hope it’ll be sunny tomorrow, then we can go to the seaside. — if — We can go to the seaside __ __ ___ ___ tomorrow. (4 words)", ["if it is sunny", "if it gets sunny"]),
          tx(8, "Albert’s wife says he has to start being interested in his children’s lives. — about — Albert’s wife says it is ___ ____ ____ ____ ___ an interest in his children’s lives. (5 words)",
            ["about time that he took", "about time that he had", "about time that he showed", "about time that he expressed",
             "about time he started taking", "about time he started having", "about time her husband took"]),
          tx(9, "I wish Jack had bought tickets for Venice but we went to Paris instead. — rather — Jack bought us tickets to Paris but I __ ___ ___ ___ to Venice. (4 words)", ["would rather have gone"]),
          tx(10, "The council officer promised to get someone to remove the rubbish. — have — The council officer promised he __ __ ___ ___ ___ away. (5 words)",
            ["would have the rubbish taken", "would have the rubbish thrown", "would have the rubbish cleaned"])
        ]
      },
      {
        // Ключ — таблица на с. 12 файла ответов 2024/25. Номера 19–28 — как в бумаге («Задание 19.» …),
        // инструкция тоже говорит «For items 19–28».
        id: "p-u2-2425", section: "uoe", type: "text",
        title: "Practice · Task 2 · Moscow municipal 2024/25",
        source: SRC_2425,
        intro: "For items 19–28, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from three to five words. The number of words is specified in the brackets. Do not use short forms. Please mind both grammar and spelling. There is an example at the beginning (0).",
        example: T2_EXAMPLE,
        items: [
          tx(19, "Lisa met her friends at her favourite restaurant, Milanos, yesterday. — whose — Lisa, _____ _____ ______ ______ Milanos, met her friends there yesterday. (4 words)", ["whose favourite restaurant is", "whose favorite restaurant is"]),
          tx(20, "The waitress told Ben he could take anything from the salad bar. — help — “_____ ______ _____ the salad bar,” the waitress said. (3 words)", ["Help yourself to"]),
          tx(21, "Despite all difficulties, he managed to win the race. — odds — ______ ______ ______ , he managed to win the race. (3 words)", ["Against all odds"]),
          tx(22, "James arranged for his luggage to be flown home. — had — James _____ _____ _____ ______ home. (4 words)", ["had his luggage flown"]),
          tx(23, "We didn’t stay long at the party because it was very noisy. — so — If there _____ _____ ______ ______ ______ noise, we might have stayed longer at the party. (5 words)", ["had not been so much"]),
          tx(24, "The number of people applying for university grants fell last year. — fall — There ____ ____ ____ ______ ______ number of people applying for university grants last year. (5 words)", ["was a fall in the"]),
          tx(25, "Would you mind helping me carry this heavy box to the car? — grateful — This box is really heavy so I ____ ____ ____ ____ you could help me carry it to the car. (4 words)", ["would be grateful if"]),
          tx(26, "“Excuse me madam, but is this your bag?” the policeman asked. — belong — “Excuse me madam, but ____ _____ _____ _____ ____ you?” the policeman asked. (5 words)", ["does this bag belong to"]),
          tx(27, "The man claimed that he had been nowhere near the factory at the time of the break-in. — to — The man claimed ____ _____ _____ _____ anywhere near the factory at the time of the break-in. (4 words)", ["not to have been"]),
          tx(28, "Trevor found it very difficult to persuade his boss to give him a pay rise. — difficulty — Trevor ____ _____ _____ ____ _____ his boss to give him a pay rise. (5 words)", ["had great difficulty in persuading", "had such great difficulty persuading"])
        ]
      }
    ],

    "m-u3": [
      {
        // Ключ — с. 12 файла ответов 2023/24. Пропуск в бумаге обозначен «…» — так и оставлено.
        id: "p-u3-2324", section: "uoe", type: "text",
        title: "Practice · Task 3 · Moscow municipal 2023/24",
        source: SRC_2324,
        intro: "For items 1 – 10 read the text below. Use the word given in capitals to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
        example: "0. French (0) … Franky Zapata became the first person to cross the English Channel on a jet-powered flyboard. INVENT — inventor",
        items: [
          tx(1, "The flyboard is a (1) … between Franky and the French army, who think his invention could have military uses in the future. PRODUCTION", ["coproduction", "co-production"]),
          tx(2, "Preflight, Franky was a little (2) … because he hadn’t had time to do all the tests he wanted to do, but once he began flying, he felt fine. NERVE", ["nervous"]),
          tx(3, "The flyboard only has enough kerosene for ten minutes of flight so he had to (3) … the board on a ship in the middle of the trip. FUEL", ["refuel"]),
          tx(4, "Unfortunately, the first time he tried to do this he (4) … his landing and fell into the sea. He went under the waves for a second. CALCULATE", ["miscalculated"]),
          tx(5, "His team were glad to see him after his (5) … . APPEAR", ["disappearance"]),
          tx(6, "However, there was a lot of (6) … for Franky because his helmet filled with seawater and he had to drink it to be able to continue breathing. COMFORT", ["discomfort"]),
          tx(7, "He realized he had (7) … the size of the ship he would need to land on and used a bigger one for his second attempt. ESTIMATE", ["underestimated"]),
          tx(8, "He travelled in a total distance of 22 miles and reached a maximum speed of approximately 160 kph. That isn’t exactly (8) … but it’s not bad for a small flyboard. SONIC", ["supersonic"]),
          tx(9, "Flying without wings, he looked like a (9) … . HERO", ["superhero"]),
          tx(10, "Next, he says he’s going to build a flying car. Some people think he’s (10) … when he says that the car will fly at a speed of 400 kph! CONFIDENT", ["overconfident"])
        ]
      },
      {
        // Ключ — с. 13 файла ответов 2024/25. Ответа к образцу (0) нет ни в бумаге заданий,
        // ни в файле ответов — поэтому в образце только предложение и слово INVEST, без ответа.
        id: "p-u3-2425", section: "uoe", type: "text",
        title: "Practice · Task 3 · Moscow municipal 2024/25",
        source: SRC_2425,
        intro: "For items 1–10 read the text below. Use the word given in capitals to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
        example: "0. When I was 11, my parents decided to send me to a private school. However, it was very difficult for them to afford it: my dad was from a working-class background and it was an “(0) _______________”. He had high hopes that private school would lead to the life he never had: a good degree and a stable, well-paying job. INVEST",
        items: [
          tx(1, "(1) _______________ my childhood, I was acutely aware that they struggled to keep up with the fees and was very conscious that my dad was working in horrendous conditions in dangerous parts of the world for my sake. THROUGH", ["Throughout"]),
          tx(2, "I turned out to be utterly (2) _______________ and was encouraged by the school to pursue a career in the arts (rather than the traditional medicine, law or Stem subjects). This disappointed my dad and made my mum very anxious. ACADEMIC", ["non-academic", "unacademic"]),
          tx(3, "A little over a decade since leaving school, working in the arts has shattered me. I’m hyper-aware of the privileged position private school put me in, and the worlds it opened up culturally, but now I am trying to find a way out to something more financially and mentally (3) _______________. SUSTAIN", ["sustainable"]),
          tx(4, "My dad is not fit enough to work, (4) _______________ with no pension, and I am terrified I can’t support my parents as they age because of the path I chose at 17. My dad still regularly jokes that I was “expensive”, but I now feel like a failed investment. I have extremely low self-esteem. EMPLOY", ["unemployed"]),
          tx(5, "I loved my job, but even my parents aside, I couldn’t afford to stay in it. The (5) _______________ of accumulated private school fees and my student loans has left a cloud of debt looming over my head. COMBINE", ["combination"]),
          tx(6, "How do I reconcile with this guilt? I’m sure your parents were trying to do their best but (6) _______________ reminding you of that is corrosive and self-defeating. CONSTANT", ["constantly"]),
          tx(7, "It wasn’t about seeing who you really are either, or understanding that academic (7) _______________ doesn’t always lead to happiness. In fact it rarely seems to if it’s the sole aim. ACHIEVE", ["achievement"]),
          tx(8, "What does lead to internal happiness is seeing ourselves reflected back by the people we love, and being accepted for who we are, (8) _______________ that is. EVER", ["whatever"]),
          tx(9, "What you really need is self-acceptance. It’s a (9) _______________ lesson, as an adult child, to learn you can be angry with your parents, resent them, appreciate them, and love them all at the same time. VALUE", ["valuable"]),
          tx(10, "You are not a failed investment because you were never invested in. Your parents’ (10) _______________ were. EXPECT", ["expectations"])
        ]
      }
    ],

    "m-u4": [
      {
        // Ключ — таблица на с. 13 файла ответов 2023/24: J E K A H M L F G B; лишние — C, D, I, N.
        id: "p-u4-2324", section: "uoe", type: "choice", opts: PHEN_2324, longOpts: true,
        title: "Practice · Task 4 · Moscow municipal 2023/24",
        source: SRC_2324,
        intro: "For items 1 – 10, match the items 1 – 10 to the phenomena A – M. There are some extra phenomena which do not match.",
        items: [
          ch(1, "Gretna Green", ["J"]),
          ch(2, "pulp fiction", ["E"]),
          ch(3, "Land’s End", ["K"]),
          ch(4, "To keep up with the Joneses", ["A"]),
          ch(5, "constituency", ["H"]),
          ch(6, "spin doctor", ["M"]),
          ch(7, "The Athens of the North", ["L"]),
          ch(8, "front benchers", ["F"]),
          ch(9, "whodunit", ["G"]),
          ch(10, "What’s sauce for the goose is sauce for the gander.", ["B"])
        ]
      },
      {
        // Ключ — таблица на с. 15 файла ответов 2024/25: D I K L G N F C M A.
        // Пункт 2 — две строки стихотворения и подпись: строки разделены « / », подпись — « — ».
        id: "p-u4-2425", section: "uoe", type: "choice", opts: PHEN_2425, longOpts: true,
        title: "Practice · Task 4 · Moscow municipal 2024/25",
        source: SRC_2425,
        intro: "For items 1–10, match the items 1–10 to the phenomena A–N. There are some extra phenomena which do not match.",
        items: [
          ch(1, "Oliver Cromwell", ["D"]),
          ch(2, "But _____________came with a heavy hand, / And bridged and roaded and ruled the land…. — R. Kipling", ["I"]),
          ch(3, "Thomas Edison", ["K"]),
          ch(4, "The Great Depression", ["L"]),
          ch(5, "Levi Strauss", ["G"]),
          ch(6, "out of the woods", ["N"]),
          ch(7, "1) divorced, 2) beheaded, 3) died, 4) divorced, 5) beheaded, 6) survived.", ["F"]),
          ch(8, "Underground Railroad", ["C"]),
          ch(9, "Sir Thomas More", ["M"]),
          ch(10, "The Great Western Railroad", ["A"])
        ]
      }
    ]
  };
})();
