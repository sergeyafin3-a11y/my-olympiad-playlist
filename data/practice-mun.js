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
  function ch(n, q, a, opts) { var it = { n: n, q: q, a: a }; if (opts) it.opts = opts; return it; }
  function abc(list) { return list.map(function (t, j) { return { k: "ABC"[j], t: t }; }); }
  var TF = [{ k: "A", t: "True" }, { k: "B", t: "False" }];

  var SRC_2324 = "Moscow municipal stage 2023/24 (official)";
  var SRC_2425 = "Moscow municipal stage 2024/25 (official)";
  var SRC_2122 = "Moscow municipal stage 2021/22 (official)";

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
      },
      {
        // Домашнее урока 6.11. Текст — с. 13 заданий 2021/22, ключ — с. 3 ответов. В бумаге строки без букв:
        // A–N поставлены по порядку строк, как у соседних лет. Лишние — C, D, I, N. Слова оригинала не тронуты.
        id: "p-u4-2122", section: "uoe", type: "choice", longOpts: true,
        title: "Practice · Task 4 · Moscow municipal 2021/22",
        source: SRC_2122,
        opts: [
          { k: "A", t: "a summer event in Wales at which there are competitions in singing, poetry, and music" },
          { k: "B", t: "someone whose job is to help children cross a road safely on their way to school" },
          { k: "C", t: "an annual summer event that takes place in Edinburgh when there are many performances of plays and music, and other forms of entertainment" },
          { k: "D", t: "a word associated with determination, refusal to surrender and courage" },
          { k: "E", t: "the three basic things that children must learn in school" },
          { k: "F", t: "a system of electing a politician, a government etc. in which the person or party who gets the most votes wins" },
          { k: "G", t: "when people do not want a particular activity or building near their home, it’s infrequently referred to as the British phenomenon" },
          { k: "H", t: "a person, team that is weaker than the others, is always expected to be unsuccessful, and that is often treated badly" },
          { k: "I", t: "someone who indulges in a compulsive, fact-collecting hobby" },
          { k: "J", t: "a nickname for the Bank of England" },
          { k: "K", t: "a series of concerts of classical music which take place every summer at the Albert Hall in London, over a period of several weeks" },
          { k: "L", t: "it is supposed to be the perfect example of the British concept of fair play" },
          { k: "M", t: "the most famous law court in the UK, officially called the Central Criminal Court" },
          { k: "N", t: "The three newer civic universities" }
        ],
        intro: "Match the items to the phenomena. There are some extra phenomena which do not match.",
        items: [
          ch(1, "The Old Lady of Threadneedle Street", ["J"]),
          ch(2, "The three Rs", ["E"]),
          ch(3, "The Proms", ["K"]),
          ch(4, "Royal National Eisteddfod", ["A"]),
          ch(5, "underdog", ["H"]),
          ch(6, "The Old Bailey", ["M"]),
          ch(7, "cricket", ["L"]),
          ch(8, "first-past-the-post", ["F"]),
          ch(9, "nimbyism", ["G"]),
          ch(10, "The lollipop lady", ["B"])
        ]
      }
    ],
    // Listening: официальные записи, задания и ключи (учитель 05.11: на дом, несколько вариантов).
    // from/stop — по паузам записи: Task 2 начинается с его инструкции, 25 секунд на чтение вопросов — как на олимпиаде.
    // Номера пунктов — как в бумаге (2024/25: 2–6); номера МЭШ в скобках и «Задание N» убраны. Обратные кавычки бумаги —
    // обычные апострофы. В 2021/22 у вариантов нет букв: A, B, C — по порядку строк.
    "m-l1": [
      {
        id: "p-l1-2324", section: "listening", type: "choice", opts: TF,
        title: "Practice · Task 1 · Moscow municipal 2023/24", source: SRC_2324,
        audio: { src: "media/listening-mun-msk-23-24.mp3", from: 0, stop: 500, label: "Task 1 · talk (twice)", title: "Municipal 2023/24" },
        intro: "For items 1–10 listen to a talk about famous people who tried to learn Russian and decide whether the statements (1–10) are TRUE (A), or FALSE (B) according to the text you hear. You will hear the text twice.",
        items: [
          ch(1, "A lot of people have been determined to learn Russian because of its challenging nature.", ["B"]),
          ch(2, "Otto von Bismarck had studied Russian before he was sent to Russia as an official representative of Prussia.", ["A"]),
          ch(3, "Otto von Bismarck considered studying Russian grammar as difficult as fighting the French Army.", ["B"]),
          ch(4, "The Russian emperor complimented Otto von Bismarck on the unwillingness to show his true knowledge of Russian.", ["B"]),
          ch(5, "Prosper Mérimée lacked fluency in Latin.", ["B"]),
          ch(6, "Varvara taught Prosper Mérimée to translate from Russian into French.", ["B"]),
          ch(7, "Prosper Mérimée was stunned by the ability of the Russian language to convey subtle shades of meaning.", ["A"]),
          ch(8, "Lewis Carroll was professionally interested in religious beliefs of the Russians.", ["B"]),
          ch(9, "Comments about difficult Russian words didn’t discourage Lewis Carroll from studying the language.", ["A"]),
          ch(10, "Lewis Carroll wasn’t good enough at Russian to be able to bargain with the Russian merchants.", ["B"])
        ]
      },
      {
        id: "p-l1-2425", section: "listening", type: "choice", opts: TF,
        title: "Practice · Task 1 · Moscow municipal 2024/25", source: SRC_2425,
        audio: { src: "media/listening-mun-msk-24-25.mp3", from: 0, stop: 378, label: "Task 1 · talk (twice)", title: "Municipal 2024/25" },
        intro: "For items 1–10 listen to a talk about a woman pilot and decide whether the statements (1–10) are TRUE, or FALSE according to the text you hear. You will hear the text twice.",
        items: [
          ch(1, "The speaker outlined his talk.", ["A"]),
          ch(2, "Amelia Earhart moved to Chicago as soon as her father was given the sack.", ["A"]),
          ch(3, "Amelia Earhart graduated from Columbia University in 1920.", ["B"]),
          ch(4, "Amelia’s parents in California bought her first plane.", ["B"]),
          ch(5, "After setting a world record Amelia Earhart was employed as a social worker.", ["A"]),
          ch(6, "Amelia Earhart is famous for being the only woman to fly solo non-stop across the Atlantic.", ["B"]),
          ch(7, "Before flying across the Atlantic Amelia Earhart used to write articles.", ["A"]),
          ch(8, "The only reason that prevented Amelia Earhart from flying to Paris was unfavourable weather conditions.", ["B"]),
          ch(9, "After circumnavigating the world in 1937, Amelia Earhart published two books.", ["B"]),
          ch(10, "Amelia Earhart was awarded by American and French governments.", ["A"])
        ]
      },
      {
        id: "p-l1-2122", section: "listening", type: "choice", opts: TF,
        title: "Practice · Task 1 · Moscow municipal 2021/22", source: SRC_2122,
        audio: { src: "media/listening-mun-msk-21-22.mp3", from: 0, stop: 499, label: "Task 1 · talk (twice)", title: "Municipal 2021/22" },
        intro: "For items 1–10 listen to the introduction to a radio show about the American entertainer, Liberace, and decide whether the statements (1–10) are TRUE, or FALSE according to the text you hear. You will hear the text twice.",
        items: [
          ch(1, "Liberace has been dominating world entertainment for four decades.", ["B"]),
          ch(2, "Liberace’s mother was born in Italy.", ["B"]),
          ch(3, "Liberace’s father occasionally made a living working at a factory.", ["A"]),
          ch(4, "Liberace’s mother considered playing music a useless pastime.", ["A"]),
          ch(5, "Liberace started playing piano at the age of eight.", ["B"]),
          ch(6, "Liberace started playing pop music after World War II.", ["B"]),
          ch(7, "Liberace wasn’t a modest person.", ["A"]),
          ch(8, "Liberace first appeared on the radio in 1952.", ["B"]),
          ch(9, "Liberace’s concerts were famous for a warm atmosphere.", ["A"]),
          ch(10, "Some people didn’t accept Liberace’s style and laughed at it.", ["A"])
        ]
      }
    ],
    "m-l2": [
      {
        id: "p-l2-2324", section: "listening", type: "choice",
        title: "Practice · Task 2 · Moscow municipal 2023/24", source: SRC_2324,
        audio: { src: "media/listening-mun-msk-23-24.mp3", from: 500, label: "Task 2 · dialogue (once)", title: "Municipal 2023/24" },
        intro: "For items 11–15 listen to the dialogue. Choose the correct answer (A, B or C) to answer questions 11–15. You will hear the text only once.",
        items: [
          ch(11, "Kelly’s week was", ["B"], abc(["quite usual.", "very slow and boring.", "really nice."])),
          ch(12, "What is NOT TRUE about Steve’s dinner?", ["B"], abc(["He will enjoy French cuisine.", "He will go to the restaurant on Saturday.", "It won’t take him long to get to the restaurant."])),
          ch(13, "Steve feels certain that at the weekend he will", ["A"], abc(["prepare food for his friends.", "go to the cinema.", "have a lie-in."])),
          ch(14, "On Friday evening Kelly is going to", ["C"], abc(["meet up her former colleagues.", "attend her friends’ party.", "spend a night at home."])),
          ch(15, "Steve finally says that a boat is", ["A"], abc(["an awesome place for a party.", "a cosy place for a party.", "a tiny place for a party."]))
        ]
      },
      {
        id: "p-l2-2425", section: "listening", type: "choice",
        title: "Practice · Task 2 · Moscow municipal 2024/25", source: SRC_2425,
        audio: { src: "media/listening-mun-msk-24-25.mp3", from: 378, label: "Task 2 · conversation (once)", title: "Municipal 2024/25" },
        intro: "For items 2–6 listen to a conversation between the manager of the fashion department and Chloe, a new salesperson. Choose the correct answer to answer the questions 2–6. You will hear the text only once.",
        items: [
          ch(2, "During her first week at the store Chloe managed to", ["B"], abc(["deal with plenty of customers.", "deal with a few difficult customers.", "deal with hardly any other trainees."])),
          ch(3, "The manager thinks the best sales people", ["A"], abc(["are more than just fashion experts.", "should answer questions about their section only.", "are able to sell cosmetics and jewelry."])),
          ch(4, "The sales staff at the department", ["C"], abc(["have to wear uniform.", "are obliged to wear designer labels.", "can be models for the store fashions."])),
          ch(5, "Which advice is NOT given to Chloe?", ["B"], abc(["Find out about other departments in the store.", "Pressurise customers to buy something.", "Give customers a lot of attention."])),
          ch(6, "What is NOT TRUE about Chloe?", ["C"], abc(["She is the right person for sales.", "She has little sales experience.", "She isn’t grateful to the manager for the advice."]))
        ]
      },
      {
        id: "p-l2-2122", section: "listening", type: "choice",
        title: "Practice · Task 2 · Moscow municipal 2021/22", source: SRC_2122,
        audio: { src: "media/listening-mun-msk-21-22.mp3", from: 499, label: "Task 2 · dialogue (once)", title: "Municipal 2021/22" },
        intro: "For items 11–15 listen to the dialogue. Choose the correct answer to answer questions 11–15. You will hear the text only once.",
        items: [
          ch(11, "Rika DID NOT", ["B"], abc(["give someone her autograph.", "win the judo competition.", "sell books."])),
          ch(12, "Rika says that to do judo you need to", ["C"], abc(["be big.", "be strong.", "maintain balance."])),
          ch(13, "Rika started doing judo", ["A"], abc(["to defend herself.", "to bully big kids.", "to fight with her brother."])),
          ch(14, "Rika practises the techniques", ["A"], abc(["every day.", "two times a week.", "every week."])),
          ch(15, "Rika had a bad injury", ["C"], abc(["a few weeks ago.", "a couple of months ago.", "a year ago."]))
        ]
      }
    ],
    // Reading Task 2 2024/25 — домашнее задание урока 22.10 (учитель поменяла местами: на уроке —
    // текст 2025/26 про будильник, на дом — пирог Цветаевой). Текст, инструкция и ключ — с. 6–7
    // заданий и с. 7 ответов 2024/25; переносы строк склеены, слова оригинала не тронуты.
    "m-r2": [
      {
        id: "p-r2-2425", section: "reading", type: "choice", longOpts: true,
        title: "Practice · Task 2 · Moscow municipal 2024/25",
        // У текста в бумаге нет заголовка; textTitle — только подпись для блока с текстом.
        textTitle: "Text for items 1–10",
        source: SRC_2425,
        opts: [
          { k: "A", t: "It gives desserts a very similar signature sourish hint with a unique creamy consistency." },
          { k: "B", t: "The latter would often say the pies were so good, with sweet filling (or ‘zalivka’) and contrasting tang from the apples, that the recipe spread across the country bearing Marina’s name." },
          { k: "C", t: "Today, the peculiarity of the pie still lies in its delicate sour cream dough." },
          { k: "D", t: "Marina Tsvetaeva herself was born on one of those apple-scented October days, when the sky is motionless and fallen leaves are blanketed by the first frosty fog." },
          { k: "E", t: "According to another theory, which sounds more plausible, the pie came from the Tsvetaevs’ neighbors." },
          { k: "F", t: "Some say that chilling it in the fridge for 3-5 hours makes it even tenderer and creamier in texture." },
          { k: "G", t: "It is unclear how it came to be associated with Marina Tsvetaeva, a famous poetess, incredibly talented and rebellious, living in the early twentieth century Russia." },
          { k: "H", t: "In addition to the traditional recipe with apples, there are also more other variants with fruit and berry fillings, like pears and strawberries." },
          { k: "I", t: "There would always be a samovar on the ready and the table would be laid with sweet pies made with delicious sour cream." },
          { k: "J", t: "These have a slightly sour taste, which goes so well with the thin shortcrust pastry and delicate sour cream based filling." },
          { k: "K", t: "By Marina’s own admission, she could only write poetry and was completely useless in the kitchen." }
        ],
        intro: "For items 1–10, read the passage below and choose which of the sentences A–K fit into the numbered gaps in the text. There is one extra sentence which does not fit in any of the gaps.",
        text: [
          "Tsvetaeva apple pie (tsvetaevski pirog) is a neat little dessert familiar to both Russian home bakers and poetry lovers. (1) ______.",
          "One of the unofficial stories has it that the pie was loved by the family of Marina Tsvetaeva and often baked and served by Marina and her sister Anastasia at tea time, when they were young ladies and spent their holidays and summers at a dacha in Tarusa with relatives and closest friends. (2) ______.",
          "In reality, there is no paper trail to confirm this story. (3) ______. She admitted she was generally hopeless and awful at cooking and housekeeping, too. (4) ______.",
          "In her memoirs, Anastasia recalls a large cozy garden with apple trees and a veranda. (5) ______. Indeed, sour cream was and is the most important ingredient of the pie, along with apples.",
          "(6) ______. That is why Russian fans of Tsvetaeva’s poetry usually celebrate her birthday by making her favorite apple pie.",
          "(7) ______. In fact, adding sour cream into the dough makes the piecrust tenderer and richer in taste. And the same goes with the filling. Some say that sour cream is a good Slavic alternative to cream cheese. (8) ______.",
          "The best apple varieties for Tsvetaeva apple pie are Antonovka or Bogatyr, which can be picked in late autumn. (9) ______. Although the traditional version of the pie calls for apples, sour cream base also goes perfectly with lots of other fruits and especially berries. So why not try adding strawberries into the recipe, the most summerish berries?",
          "The pie is equally delicious when served warm or cooled. (10) ______. Enjoy a slice with a cup of black tea!"
        ],
        // Ключ — с. 7 файла ответов 2024/25: G B K E I D C A J F; лишнее предложение — H.
        items: [
          ch(1, "Gap (1)", ["G"]), ch(2, "Gap (2)", ["B"]), ch(3, "Gap (3)", ["K"]), ch(4, "Gap (4)", ["E"]), ch(5, "Gap (5)", ["I"]),
          ch(6, "Gap (6)", ["D"]), ch(7, "Gap (7)", ["C"]), ch(8, "Gap (8)", ["A"]), ch(9, "Gap (9)", ["J"]), ch(10, "Gap (10)", ["F"])
        ]
      }
    ]
  };
  // Самые свежие официальные работы (учитель 06.11: «максимально свежие»): муниципальный этап 2025/26 и 2024/25 для 9 класса —
  // тот же формат и те же авторы, что у 10–11 классов; школьный этап 2026/27 — другой формат, но самая новая работа.
  // Файлы tasks-/ans-…-9-mun-msk-25-26, -24-25 и -9-11-sch-msk-26-27 с vos.olimpiada.ru. Текст и ключи дословно; «(0)» в Task 3 2024/25
  // в ответах отдельно не указан, но назван в следующем предложении работы («creativity crisis»). Обратные кавычки заменены апострофами.
  var SRC_2526_9 = "Moscow municipal stage 2025/26, grade 9 (official)";
  var SRC_2425_9 = "Moscow municipal stage 2024/25, grade 9 (official)";
  var SRC_SCH = "Moscow school stage 2026/27 (official)";
  var ROOT = window.PRACTICE["mun-msk-25-26"];
  var INTRO_U1 = "For Questions 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).";

  ROOT["m-u1"].push({
      id: "p-u1-2526-9", section: "uoe", type: "text", title: "Practice · Task 1 · Municipal 2025/26, grade 9", source: SRC_2526_9,
      intro: INTRO_U1, textTitle: "Cultural behaviour in business",
      examples: [
        { label: "0", show: "Much of today’s business is conducted across international borders, and while the majority of the global business community might share the use of English as a common language,", correct: true },
        { label: "00", show: "the nuances and expectations of business communication might differ far greatly from culture to culture.", strike: "far", near: "differ far greatly", answer: "far" }
      ],
      items: [
        tx(1, "A lack of understanding of the cultural norms and practices of our business acquaintances can result in so unfair judgements, misunderstandings and breakdowns in communication.", ["so"]),
        tx(2, "Here are three basic areas of differences in the business etiquette around the world that could help stand you in a good stead when you next find yourself working with representatives of different cultures.", ["a"]),
        tx(3, "Addressing someone. When discussing this topic in a training course, a German trainee and a British trainee got into a mostly hot debate about whether it was appropriate for someone with a doctorate to use the corresponding title on their business card.", ["mostly"]),
        tx(4, "The British trainee maintained that anyone who wasn’t a medical doctor expecting to be addressed as ‘Dr’ was disgustingly pompous and full of themselves. The German trainee, however, argued that the hard work and years of education having put into earning that PhD should give them full rights to expect to be addressed as ‘Dr’.", ["having"]),
        tx(5, "This stark difference in opinion over something that could be conceived as if minor and thus easily overlooked goes to show that we often attach meaning to even the most mundane practices.", ["if"]),
        tx(6, "When things that we are used to are done differently, it could spark the strongest reactions in us.", ["v"]),
        tx(7, "While many Continental Europeans and Latin Americans prefer to be addressed with a title, for example Mr or Ms and their surname when meeting someone in a business context for the first time, unlike Americans, and increasingly the British, now tend to prefer using their first names.", ["unlike"]),
        tx(8, "The best thing to do is to listen and observe it how your conversation partner addresses you and, if you are still unsure, do not be afraid to ask them how they would like to be addressed.", ["it"]),
        tx(9, "Smiling. In a piece of research done on smiles across cultures, the researchers found that smiling individuals were being considered more intelligent than non-smiling people in countries such as Germany, Switzerland, China and Malaysia.", ["being"]),
        tx(10, "However, in countries like Russia, Japan, South Korea and Iran, pictures of smiling faces were rated as less likely intelligent than the non-smiling ones. Meanwhile, in countries like India, Argentina and the Maldives, smiling was associated with dishonesty.", ["likely"]),
        tx(11, "Eye contact. American or British people might be looking their client in the eye to show that they are paying a full attention to what is being said, but if that client is from Japan or Korea, they might find this direct eye contact awkward or even disrespectful.", ["a"]),
        tx(12, "In parts of South America and Africa, prolonged eye contact could also be seen as challenging authority. In the Middle East, eye contact across genders is considered inappropriate, although eye contact within a gender could signify honesty and truthfulness.", ["v"]),
        tx(13, "Having an increased awareness of the possible differences in expectations and behaviour can help us avoid cases of miscommunication, but it is vital that we will also remember that cultural stereotypes can be detrimental to building good business relationships.", ["will"]),
        tx(14, "Although national cultures could play a part in shaping up the way we behave and think, we are also largely influenced by the region we come from, the communities we associate with, our age and gender, our corporate culture and our individual experiences of the world.", ["up"]),
        tx(15, "The knowledge of the potential differences should therefore be not something we keep at the back of our minds, rather than something that we use to pigeonhole the individuals of an entire nation.", ["not"])
      ]
  }, {
      id: "p-u1-2425-9", section: "uoe", type: "text", title: "Practice · Task 1 · Municipal 2024/25, grade 9", source: SRC_2425_9,
      intro: "For questions 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).",
      examples: [
        { label: "0", show: "A Tokyo developer will demolish down a building for spoiling the view. Why doesn’t Britain care about beauty?", strike: "down", near: "demolish down a", answer: "down" },
        { label: "00", show: "Politicians and planners are allowing the Thames to become an urban canyon –avarice always seems to win out.", correct: true }
      ],
      items: [
        tx(1, "A Japanese developer has been announced it will demolish a new tower of luxury flats in Tokyo only weeks from completing. The reason? The 10-storey building was blocking beautiful views of Mount Fuji.", ["been"]),
        tx(2, "The idea a developer would reach such a decision in Britain is inconceivable. In London, flats are usually built to make a profit. If they have a beautiful view, good luck to those who buying them. To hell with anyone else’s beauty.", ["who"]),
        tx(3, "One of what was the government’s last decision greenlighting a huge 20-storey concrete slab that is being about to rise on the banks of the Thames next to the National Theatre.", ["being"]),
        tx(4, "It is hideous, and will dominate the once-glorious view of the St Paul’s cathedral from Waterloo Bridge. Paradoxically, its developer is a Japanese Corporation Mitsubishi.", ["the"]),
        tx(5, "Beauty is a word you never hear in British election campaigns. They are about money and little else. In Tokyo, the dignified regulation of the public sector does matters.", ["does"]),
        tx(6, "Maintaining the beauty of the environment is not a nimby fad but a duty expected of government in the public’s interest and pleasure.", ["v"]),
        tx(7, "The current collapse of planning control in the capital has seen two Nine Elms towers to rise almost 60 storeys, making Big Ben look like a toothpick in comparison. Last week, another “luxury” monster was announced up-river, near Battersea Park.", ["to"]),
        tx(8, "The company behind the scheme is spotted a subsidiary of Cerberus Capital Management, run by an American billionaire, Stephen Feinberg.", ["spotted"]),
        tx(9, "These towers now are litter the Thames, being mostly foreign-owned and empty. A Guardian survey of one Vauxhall tower revealed just 10% of its occupants are British.", ["are"]),
        tx(10, "The new Battersea tower could hardly be more out of place. It will soar as a ghostly presence over the visually delicate neighbourhood of Chelsea. It will also tower over the secluded acres of the park and continue the conversion of the Thames into an utterly urban canyon.", ["utterly"]),
        tx(11, "I cannot imagine another world city that would permit such visual outrages. Parisians laugh with derision at what has been done to London’s skyline. Romans are astonished. Americans ask, but who is in charge?", ["v"]),
        tx(12, "No one consults London’s citizens in any meaningful way on these planning decisions. They are visible assertions of the power of a greed.", ["a"]),
        tx(13, "High-buildings policy in the capital is supposedly overseen by the mayor, at present Sadiq Khan. Like his predecessors, Ken Livingstone and Boris Johnson, he has no sense of beauty. Government ministers also hardly refuse to interfere because their party coffers are stuffed by the building lobby.", ["hardly"]),
        tx(14, "In Tokyo, we see democracy working. The Fuji affair is that of a community demanding that the beauty of its surroundings shall be respected by elected authority.", ["shall"]),
        tx(15, "The sadness is that no British politician has the guts to tell Mitsubishi to show London the deference to beauty demanded in Japan.", ["v"])
      ]
  });

  ROOT["m-u2"].push({
      id: "p-u2-2526-9", section: "uoe", type: "text", title: "Practice · Task 2 · Municipal 2025/26, grade 9", source: SRC_2526_9,
      intro: "For items 1–10, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from three to five words. Please mind both grammar and spelling. Do not use contractions. There is an example at the beginning (0).",
      example: "0. The pool isn’t deep enough to swim in. — too — The pool ……………………. swim in. — is too shallow to",
      items: [
        tx(1, "Bob was making fun of me when he said there was a snake on my bed. — leg — Bob _____ ______ _____ _____ when he said there was a snake on my bed. (4 words).", ["was pulling my leg"]),
        tx(2, "When he had finished his first book, he later wrote seven more. — went — When he had finished his first book, he____ ___ ___ ___ seven more. (4 words)", ["went on to write"]),
        tx(3, "I am sorry to tell you that you have failed the test. — regret — I __ ___ ___ you that you have failed the test. (3 words)", ["regret to tell", "regret to inform"]),
        tx(4, "People say that the company is having problems. — said — The company ___ ____ ___ ___ ____ problems. (5 words)", ["is said to be having"]),
        tx(5, "I think I should leave. — better — I think I __ __ __ . (3 words)", ["had better leave"]),
        tx(6, "Please be quiet, (but I do not expect you will). — wish — I ___ ____ ____ ___ quiet. (4 words)", ["wish you would be"]),
        tx(7, "My sister is in hospital where they are taking her appendix out. — having — My sister is in hospital ___ ____ ____ ___ out. (4 words)", ["having her appendix taken"]),
        tx(8, "If you want a day off, you will have to find someone to replace you. — stand — If you want a day off, you will have to find someone ___ ___ ____ ___ you. (4 words)", ["to stand in for"]),
        tx(9, "I was sorry I could not stay longer. — like — I ___ ___ ____ ____ ____ longer. (5 words)", ["would like to have stayed"]),
        tx(10, "I do not think she wants us to mention the subject. — rather — I think she ___ ____ ___ ___ ___mention the subject. (5 words)", ["would rather we did not"])
      ]
  }, {
      id: "p-u2-2425-9", section: "uoe", type: "text", title: "Practice · Task 2 · Municipal 2024/25, grade 9", source: SRC_2425_9,
      intro: "For items 19–28, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from three to five words. The number of words is specified in the brackets. Do not use short forms. Please mind both grammar and spelling. There is an example at the beginning (0).",
      example: "0. The pool isn’t deep enough to swim in. — too — The pool ____ ______ _____ ______ swim in. (4 words) — is too shallow to",
      items: [
        tx(19, "Richard says he prefers to do his homework on his own. — rather — Richard says that _____ ______ ______ ______ do his homework with other people. (4 words)", ["he would rather not"]),
        tx(20, "They will ask a professional chef to do all the cooking. — have — They will ____ _____ _____ _____ _____ by a professional chef. (5 words)", ["have all the cooking done"]),
        tx(21, "Scientists claim that they have found a cure for cancer! — to — Scientists claim ____ _____ _____ a cure for cancer! (3 words)", ["to have found"]),
        tx(22, "Pam said she had never seen the missing ticket. — having — Pam _____ _____ _____ the missing ticket. (3 words)", ["denied having seen"]),
        tx(23, "It took Colin five minutes to find his car keys. — searching — Colin ____ ____ ____ ____ _____ his car keys. (5 words)", ["spent five minutes searching for"]),
        tx(24, "A short meeting of the cast will take place after today’s rehearsal. — by — Today’s rehearsal _____ _____ _____ _____ a short meeting of the cast. (4 words)", ["will be followed by"]),
        tx(25, "I’ll be happy to show you round the sights of my city when you come to visit me. — take — It’ll be a ____ ____ ____ _____ _____ a sightseeing tour of my city when you come to visit me. (5 words)", ["pleasure to take you on", "pleasure to take you for"]),
        tx(26, "The artist painted fabulous pictures of the rainforest although he had never travelled outside his hometown. — spite — The artist painted fabulous pictures of the rainforest ____ ____ _____ ____ _____ travelled outside his hometown. (5 words)", ["in spite of never having", "in spite of having never"]),
        tx(27, "If you ask me, feng shui doesn't work. — far — _____ ____ ____ _____ ________ concerned, feng shui doesn't work. (5 words)", ["As far as I am"]),
        tx(28, "You have to be very patient to work as a primary school teacher these days. — deal — Working as a primary school teacher calls ___ ___ ____ ___ ___ patience these days. (5 words)", ["for a great deal of", "for a good deal of"])
      ]
  });

  ROOT["m-u3"].push({
      id: "p-u3-2526-9", section: "uoe", type: "text", title: "Practice · Task 3 · Municipal 2025/26, grade 9", source: SRC_2526_9,
      intro: "For items 1–10 read the text below. Use the word given in capitals to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
      textTitle: "Five horror film clichés",
      example: "0. Of all the genres that exist, horror is perhaps one of the most conventional. Many horror films rely on (0) ____ plot devices, also called tropes, to make their audience frightened. SPECIFY — specific",
      items: [
        tx(1, "When a trope is used too much, it can become a cliché. Here are some of the most used, and perhaps abused, clichés in horror films. No matter what kind of house it is, the (1) ____ is a scary place in horror films. BASE", ["basement"]),
        tx(2, "That’s usually where something is hiding or where the evil (2) ____ has hidden their tools. In older horror films, when protagonists were in desperation, it was difficult or impossible for them to call for help or call the police. PSYCHE", ["psychopath", "psycho"]),
        tx(3, "Mobile phones have made that situation a bit less believable now. How to maintain (3) ____ then? SUSPEND", ["suspense"]),
        tx(4, "No phone (4) ____! If you’re a hero in a horror film, it’s almost certain that at a key moment, just when you absolutely need to call for help, your phone battery will die just as you are making the call. COVER", ["coverage"]),
        tx(5, "Horror films love (5) ____ places. INHABIT", ["uninhabited", "uninhabitable", "uninhabitated"]),
        tx(6, "This could be a(n) (6) ____ hospital, a scary empty house or a ghost town. ABANDON", ["abandoned"]),
        tx(7, "The hero has been driving for hours. It’s night-time and it’s beginning to rain. Suddenly he sees a person on the side of the road. Maybe the company will keep him (7) ____? In horror films, giving anybody a ride is asking for trouble. The hero always does it, and it always ends badly. WAKE", ["awake", "awaken", "awakened"]),
        tx(8, "This horror film cliché was especially popular with horror films of the late 20th century. It starts with a group of teenagers all enjoying (8) ____, and it ends with everyone dead except one girl. THEY", ["themselves"]),
        tx(9, "What’s the (9) ____? At the beginning the girl is usually innocent, shy and not particularly strong. SOLVE", ["solution"]),
        tx(10, "In the end, she has become the toughest and most (10) ____ person in the world. The last girl almost always wins in the end. RESOURCE", ["resourceful"])
      ]
  }, {
      id: "p-u3-2425-9", section: "uoe", type: "text", title: "Practice · Task 3 · Municipal 2024/25, grade 9", source: SRC_2425_9,
      intro: "For items 1–10 read the text below. Use the word given in capitals to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
      example: "0. ‘(0) ____ crisis’ looms for English schools due to arts cuts. The number of GCSE music and drama students fell over last decade, research finds. CREATE — Creativity",
      items: [
        tx(1, "Schools in England face a “creativity crisis” with the number of creative arts students and teachers down by as much as 20 per cent in some subjects after a decade of (1) ____. INVEST", ["underinvestment"]),
        tx(2, "Pupils’ (2) ____ in the creative arts is considered by many to be a key factor in their recovery from the pandemic yet specific government funding for music, arts and cultural programmes will equate to just £9.40 per pupil this year. ENGAGE", ["engagement"]),
        tx(3, "The new analysis of government data shows that the number of GCSE music and drama students has fallen by a (3) ____ over the last decade, a trend mirrored by a drop in the number of drama teachers. FIVE", ["fifth"]),
        tx(4, "School reforms have caused pupils to move away from arts subjects such as dance, music and art, and towards more traditional (4) ____ subjects such as geography and English. ACADEMY", ["academic"]),
        tx(5, "In (5) ____ education, there was an outcry in May from artists and musicians who accused the government of neglecting the country’s “cultural national health” after becoming aware of plans for a 50% funding cut to arts subjects at universities, which could come into effect from this autumn. FAR", ["further"]),
        tx(6, "The shadow schools minister, Peter Kyle, said the government’s refusal to back school arts threatened children’s recovery from the pandemic and the country’s future (6) ____. PROSPER", ["prosperity"]),
        tx(7, "He said creative industries contribute £11bn to the UK economy, but warned that this would be under threat if fewer pupils had the chance to learn such skills. “After a decade of failure on school arts, the Conservatives are out of step with parents’ (7) ____.” PRIORITISE", ["priorities"]),
        tx(8, "The study of music is an area of particular concern, with critics warning that it is (8) ____ becoming the preserve of wealthier families. INCREASE", ["increasingly"]),
        tx(9, "Music provision for children in key stage 3 (ages 11-14) has been reduced, the report finds, and primary-level (9) ____ teachers are offered shrinking amounts of musical training. TRAIN", ["trainee"]),
        tx(10, "Responding to a parliamentary question from Labour, the school standards minister, Catherine McKinnell, said the government values the arts and supports the creative arts (10) ____ the education system. THROUGH", ["throughout"])
      ]
  }, {
      id: "p-sch-2627-1", section: "uoe", type: "text", otherFormat: true, title: "Practice · School 2026/27: word formation", source: SRC_SCH,
      intro: "For items 1–8, read the text below. Use the word given in capitals at the end of each line to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
      example: "0. APPROXIMATE — APPROXIMATELY",
      textTitle: "A chunky digital cat is here to help you stop doomscrolling",
      textSubtitle: "Cat Gatekeeper plops an adorable, orange tabby on your screen when it's time to go touch grass.",
      text: [
        "Every day, the average American spends nearly 2.5 hours scrolling through social media. Cats, on the other hand, waste (0) ____ (APPROXIMATE) no time on the internet. Which species generally appears less stressed and anxious?",
        "Sure, this may not be the most (1) ____ (SCIENCE) analysis about mental health and screen time, but it’s never a bad idea to try limiting the amount of idle time wasted in front of a computer or smartphone. And while there are plenty of apps and devices promising to reduce your social media (2) ____ (CONSUME), their results are often (3) ____ (EVEN) and many require (4) ____ (COST) fees. Knowing this, a developer in Japan released a completely free Chrome browser (5) ____ (EXTEND) designed to throttle your doomscrolling. Their secret weapon is Cat Gatekeeper.",
        "“You know that cat who always shows up right when you’re trying to work? We’ve (6) ____ (CREATE) that classic cat-owner experience in your browser,” the creators explain on its description page. “Let’s face it—humans are just (7) ____ (SERVE) to their cats. We are powerless against their charm… Let their (8) ____ (ADORE) heal you while you take a proper break.”"
      ],
      items: [
        tx(1, "(1) SCIENCE", ["scientific", "scientifical"]), tx(2, "(2) CONSUME", ["consumption"]), tx(3, "(3) EVEN", ["uneven"]), tx(4, "(4) COST", ["costly"]),
        tx(5, "(5) EXTEND", ["extension"]), tx(6, "(6) CREATE", ["recreated"]), tx(7, "(7) SERVE", ["servants", "subservient", "servile"]), tx(8, "(8) ADORE", ["adorableness", "adorability", "adoration"])
      ]
  }, {
      id: "p-sch-2627-2", section: "uoe", type: "text", otherFormat: true, title: "Practice · School 2026/27: mixed-up words", source: SRC_SCH,
      intro: "For items 1–6, read the text further and for each gap unscramble the word given in CAPITAL LETTERS. There is an example at the beginning (0).",
      example: "0. POLARUP — POPULAR",
      textTitle: "A chunky digital cat (part 2)",
      text: [
        "Cat Gatekeeper currently works with some of the most (0) ____ (POLARUP) timewasters like TikTok and VK. The timer is customizable, but its (1) ____ (FAULTED) setting allots a (generous) 60 minutes of social media frivolity. After overstepping your time limit, the screen is suddenly hijacked by a very hefty tabby who promptly plops down in front of your browser (2) ____ (OWNWID) for five minutes, preventing you from accessing your feed. After your respite, the (3) ____ (TAILIGD) feline presumably moves on to their next distraction, thus letting you return to posting. Pretty simple stuff.",
        "However, there is some leeway to Cat Gatekeeper. The (4) ____ (MERIT) resets if you swap over to another website tab, and it’s exclusively designed for the preset social media (5) ____ (SALTPROMF). If that sounds like an easy way to (6) ____ (TEACH) the system—well, cats can’t do everything for us, can they?"
      ],
      items: [
        tx(1, "(1) FAULTED", ["default"]), tx(2, "(2) OWNWID", ["window"]), tx(3, "(3) TAILIGD", ["digital"]),
        tx(4, "(4) MERIT", ["timer"]), tx(5, "(5) SALTPROMF", ["platforms"]), tx(6, "(6) TEACH", ["cheat"])
      ]
  }, {
      id: "p-sch-2627-3", section: "uoe", type: "text", otherFormat: true, title: "Practice · School 2026/27: misspelled words", source: SRC_SCH,
      intro: "For items 1–5, read the article up to the end and find 5 misspelled words and spell them correctly. There is an example at the beginning (0).",
      example: "0. TRUSTWORTHY",
      textTitle: "A chunky digital cat (part 3)",
      text: [
        "Cat Gatekeeper looks trastworthy from a security standpaint, too. The free extension doesn’t feature ads, and promises that “no date is collected or transmitted externally.” An independent review on Reddit also provided Cat Gatekeeper’s source code, which only needs local storage permission to truck its own settings.",
        "At any rate, it’s worth giving it a shoot. Cat Gatekeeper may not solve your social media dependancy, but it might at least force you to break up with a brief “cat nap,” so to speak."
      ],
      items: [
        tx(1, "Misspelled word 1", ["standpoint"]), tx(2, "Misspelled word 2", ["data"]), tx(3, "Misspelled word 3", ["track"]),
        tx(4, "Misspelled word 4", ["shot"]), tx(5, "Misspelled word 5", ["dependency"])
      ]
  }, {
      id: "p-sch-2627-4", section: "uoe", type: "text", otherFormat: true, title: "Practice · School 2026/27: one word, three sentences", source: SRC_SCH,
      intro: "For items 29–34, think of one word that fits all the three sentences. There is an example at the beginning (0).",
      example: "0. A) Anyone can tell that he's blind as a ____, but he won’t wear glasses. B) He used a _____ to hit the ball. C) The old lady has ___s in the belfry. — bat",
      items: [
        tx(29, "A) Before the exam, we were running around like headless ____. B) He ignored the warnings for years, and now the ____ have come home to roost. C) He is going to ask her out, unless he ____ out at the last moment.", ["chickens"]),
        tx(30, "A) He’s a big ___ in a small pond in his hometown. B) He’s a nice guy, but a bit of a cold ___. C) I can drive a car, but a truck is a different kettle of ___.", ["fish"]),
        tx(31, "A) The new law looks strict, but it’s just a paper ___. B) She walked into the exam with the eye of the ___. C) Once he joined the project, he had to ride the ___ to the end.", ["tiger"]),
        tx(32, "A) After traveling across Asia, he felt he’d really seen the ___. B) We need to talk about the ___ in the room — the company’s financial problems. C) The old mansion is a white ___ — it costs a fortune to maintain.", ["elephant"]),
        tx(33, "A) The scammer saw him as an easy ___. B) In that debate, he was a real clay ___ for the press. C) No one trusted him after he turned stool ___ and gave evidence against his friends.", ["pigeon"]),
        tx(34, "A) Sean never acts the ___—he's always serious. B) That guy just gets my ___ every time he opens his mouth. C) His unhappy childhood was the ___ he used to rationalize every failure and shortcoming.", ["goat"])
      ]
  });

  ROOT["m-u4"].push({
      id: "p-u4-2526-9", section: "uoe", type: "choice", longOpts: true, title: "Practice · Task 4 · Municipal 2025/26, grade 9", source: SRC_2526_9,
      intro: "For items 1–10, match the items 1–10 to the phenomena A–N. There are some extra phenomena which do not match.",
      opts: [
        { k: "A", t: "During the Industrial Revolution, this area was full of factories and coal mines. The air became dark with smoke and soot from all the industry. It's located just west of the big city of Birmingham." },
        { k: "B", t: "R. Kipling’s timeless guidance on how to live a fulfilling life. It explores the qualities of virtue, morality, and masculinity." },
        { k: "C", t: "the phrase used by R. Kipling to describe the sense of moral obligation among British empire builders" },
        { k: "D", t: "\"New York won the game\" meaning a sports team from New York won the game" },
        { k: "E", t: "Its name comes from the Dutch word Groenwijck, which means \"Green District\". For a long time, it was known as a home for artists and a center for new ideas. It is a unique part of Manhattan." },
        { k: "F", t: "It is a famous spot in south-east London, England. It is well-known for its amazing maritime history, meaning its connection to the sea and ships. It's also where the 0° longitude Meridian gets its name." },
        { k: "G", t: "The old medieval city of Edinburgh had long been an issue of concern. Its dilapidated housing was prone to fires, disease, overcrowding, crime and collapse. It used to be a medieval city of slums and sewers." },
        { k: "H", t: "one of the most prominent British architects of the 19th century. Some of his most famous works include Marble Arch, the Royal Mews, and Buckingham Palace." },
        { k: "I", t: "He is best known for designing 52 churches in London after the Great Fire of London in 1666. His most famous work is St Paul's Cathedral, which was finished in 1710." },
        { k: "J", t: "The flat, watery area in East Anglia" },
        { k: "K", t: "It was written by Thomas Paine in 1775 and 1776. It encouraged people in the Thirteen Colonies to seek independence from Great Britain. It was published without its author's name. This was right at the start of the American Revolution. It quickly became incredibly popular." },
        { k: "L", t: "Built in stages between 1767 and 1850, James Craig’s design helped Edinburgh transform itself from ‘auld reekie’ to this grand state. He designed a plan which was distinguished by elegant views, classical order and plenty of light." },
        { k: "M", t: "correctional facility instead of prison" },
        { k: "N", t: "It was published by Benjamin Franklin in America from 1732 to 1758. Besides the usual information, it also included witty sayings, proverbs, and advice. These sayings often taught lessons about hard work and saving money." }
      ],
      items: [
        ch(1, "Greenwich", ["F"]), ch(2, "John Nash", ["H"]), ch(3, "The Athens of the north", ["L"]), ch(4, "Common Sense", ["K"]), ch(5, "euphemism", ["M"]),
        ch(6, "Greenwich village", ["E"]), ch(7, "synecdoche", ["D"]), ch(8, "The Black Country", ["A"]), ch(9, "The Fens", ["J"]), ch(10, "the white man’s burden", ["C"])
      ]
  }, {
      id: "p-u4-2425-9", section: "uoe", type: "choice", longOpts: true, title: "Practice · Task 4 · Municipal 2024/25, grade 9", source: SRC_2425_9,
      intro: "For items 1–10, match the items 1–10 to the phenomena A–N. There are some extra phenomena which do not match.",
      opts: [
        { k: "A", t: "John Keats’ poetical credo" },
        { k: "B", t: "a true friend who stays with you through thick and thin" },
        { k: "C", t: "Robert Burns’ famous poem" },
        { k: "D", t: "the situation in which too much attention is given to buying and owning things" },
        { k: "E", t: "he was chosen to design the Clifton Suspension Bridge. From this Bristol connection came the chance to create the Great Western Railway which came into Windsor in 1849. His legacy can be seen in his railways, bridges and steamships he contributed to a golden age in Britain’s history." },
        { k: "F", t: "Oklahoma is nicknamed so because of the settlers who moved into the Unassigned Lands before the designated commencement of the Land Rush of 1889." },
        { k: "G", t: "he was one of the most important engineers and scientists in history. His work on the modern steam engine kick-started the entire Industrial Revolution at home in Great Britain and in the rest of the world." },
        { k: "H", t: "The Progressive Party (a.k.a. the Bull Moose Party) adopted the idea when it chose Roosevelt as its candidate in the 1912 presidential election. It appeals to the near- universal desire for fairness." },
        { k: "I", t: "an annual summer event that takes place in August in Ireland where there are many performances of plays and music, and other forms of entertainment" },
        { k: "J", t: "an American inventor and computer engineer who was part of the team that developed some of the key components to early computers in the 1980s." },
        { k: "K", t: "a Welsh summer event dedicated to music, literature and performing arts. It runs over the first week in August. It is held in a new venue every year, occasionally the event has been held in England. It features about 6,000 competitors who compete in a number of categories, including Folk Songs, Brass Bands, String Music, Choral Section, Vocal Section, and others." },
        { k: "L", t: "an English mathematician who has been called the first computer programmer for writing an algorithm, or a set of operating instructions, for the early computing machine built by Charles Babbage in 1821." },
        { k: "M", t: "someone who is a good friend when it is easy to be one and who stops being one when you are having problems" },
        { k: "N", t: "Oklahoma is nicknamed so because people here habitually show up for dinner before the invitation is even sent." }
      ],
      items: [
        ch(1, "The Sooner State", ["F"]), ch(2, "A Square Deal", ["H"]), ch(3, "Ada Lovelace", ["L"]), ch(4, "The Eisteddfod", ["K"]), ch(5, "fair-weather friend", ["M"]),
        ch(6, "Isambard Kingdom Brunel", ["E"]), ch(7, "consumerism", ["D"]),
        ch(8, "A thing of beauty is a joy for ever: Its loveliness increases; it will never Pass into nothingness…", ["A"]),
        ch(9, "James Watt", ["G"]), ch(10, "Wherever I wander, wherever I rove, The hills of the Highlands for ever I love.", ["C"])
      ]
  });
})();
