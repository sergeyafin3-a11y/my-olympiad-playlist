// Тренировочные наборы Use of English к муниципальному варианту (Москва, 10–11 классы).
// Источник — официальные файлы ЦПМ прошлых лет: tasks-/ans-…-2024-25 (PDF) и другие годы, указанные у наборов. Работа 2023/24 теперь пробник
// (data/variant-mun-msk-23-24.js), поэтому в отработке её нет, чтобы Варя не увидела задания заранее.
// Тексты, инструкции, примеры и ключи перенесены дословно; спорные места сверены по отрисованным
// страницам, а не только по извлечённому тексту. 2025/26 уже есть в приложении как сам вариант.
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

  var SRC_2425 = "Moscow municipal stage 2024/25 (official)";
  var SRC_2122 = "Moscow municipal stage 2021/22 (official)";

  // Образец Task 2 одинаков в оба года.
  var T2_EXAMPLE = "0. The pool isn’t deep enough to swim in. — too — The pool ____ ______ _____ ______ swim in. (4 words) — is too shallow to";

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
})();
