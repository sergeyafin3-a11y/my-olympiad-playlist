// Региональный этап ВсОШ по английскому языку, 2025/26 (в шапке бумаг — «2026 г.»), 9–11 классы.
// Тексты заданий и ключи перенесены дословно из официальных файлов архива ЦПМ (2025-26/reg/engl):
// tasks-engl-9-11-pism-reg-25-26.pdf (письменный тур), tasks-engl-9-11-ustn-reg-25-26.pdf (карточки),
// anskrit-engl-9-11-pism-reg-25-26.pdf (ключи и критерии письма), script-engl-9-11-pism-reg-25-26.pdf
// (скрипт аудио), krit-engl-9-11-ustn-reg-25-26.pdf (критерии устного тура).
// Ключ Listening & Reading на с. 1 anskrit — сетка с закрашенными клетками; снят с отрисованной
// страницы, а не с извлечённого текста (в тексте заливка теряется). Ключи Use of English напечатаны текстом.
// Аудиозапись регионального этапа в архиве не опубликована, поэтому у заданий на аудирование нет
// поля audio, а есть script — официальный текст записи именно этого задания. В script взята только
// звучащая речь: инструкции (они уже в intro), «(pause 20 seconds)», «Now we begin» и т. п. не включены —
// приложение читает script голосом компьютера, и паузы вслух звучали бы как текст.
// Кроссворд (Use of English, Task 1) — картинка media/reg-crossword.png, вырезанная из с. 9 файла заданий
// вместе с напечатанными подсказками-буквами.
(function () {
  var TF = [{ k: "A", t: "True" }, { k: "B", t: "False" }];
  // Варианты A–D интегрированного задания — словами из его инструкции, как в финале.
  var ABCD_INT = [
    { k: "A", t: "in both materials" },
    { k: "B", t: "only in the reading text" },
    { k: "C", t: "only in the audio-recording" },
    { k: "D", t: "in neither of the materials" }
  ];
  // Reading Task 4: ответ — буква фрагмента текста (A)–(G).
  var PARTS = ["A", "B", "C", "D", "E", "F", "G"].map(function (k) { return { k: k, t: "Part (" + k + ")" }; });
  // Use of English Task 2: вторые половины составных прилагательных, столбец B таблицы.
  // «A. watering» стоит в строке образца 0, но это обычный вариант — в ответах его нет.
  var HALVES = [
    { k: "A", t: "watering" }, { k: "B", t: "pounding" }, { k: "C", t: "tapping" },
    { k: "D", t: "crushing" }, { k: "E", t: "boggling" }, { k: "F", t: "crawling" },
    { k: "G", t: "tingling" }, { k: "H", t: "switching" }, { k: "I", t: "curdling" },
    { k: "J", t: "wrenching" }, { k: "K", t: "raising" }, { k: "L", t: "churning" },
    { k: "M", t: "racking" }, { k: "N", t: "opening" }, { k: "O", t: "dropping" }
  ];
  // Use of English Task 3: описания A–M из правого столбца; H — ответ образца (Queen Elizabeth II).
  var PEOPLE = [
    { k: "A", t: "This person was a prominent English philosopher and physician recognized as the \"father of liberalism\". He played a crucial role in the Enlightenment period by making substantial contributions to social contract theory, epistemology, and political philosophy. His ideas had a profound impact on subsequent philosophers and intellectuals like Voltaire, Rousseau, Hume, and Kant. His work on the theory of mind, particularly the concept of tabula rasa, formed the basis for contemporary understandings of identity and self. His support for private property as a Natural Law principle continues to be a fundamental part of his intellectual legacy." },
    { k: "B", t: "This person is a talented English actor, comedian, and writer celebrated for his iconic roles in sitcoms and films. He first gained fame on the BBC sketch comedy show Not the Nine O'clock News and went on to star in hit sitcoms like Blackadder and Mr. Bean. His versatile acting skills have been showcased in a variety of films, earning him critical acclaim. Throughout his career, he has received numerous awards and accolades for his outstanding contributions to British comedy, solidifying his status as a prominent figure in the entertainment industry." },
    { k: "C", t: "This person is a well-known English television presenter, journalist, and writer recognized for his expertise in motoring. He rose to fame as the host of Top Gear and later served as a co-host on The Grand Tour. Additionally, he contributes columns to The Sunday Times and The Sun. He has hosted game shows such as Who Wants to Be a Millionaire? as well as different reality shows. He has also created numerous TV programs and written books on subjects such as history and engineering. His distinctive and sometimes controversial style has garnered mixed reactions from audiences and critics alike." },
    { k: "D", t: "This person was a renowned British actress who achieved fame as a film and fashion icon. Her breakthrough came with the film \"Roman Holiday,\" for which she made history by winning an Oscar, a Golden Globe, and a BAFTA for a single role. She continued her success with roles in acclaimed movies like \"Sabrina,\" \"Breakfast at Tiffany's,\" and \"My Fair Lady.\" Apart from her acting career, she was also recognized for her humanitarian efforts with UNICEF, receiving praise for her contributions and posthumously awarded a Grammy for her spoken-word recordings." },
    { k: "E", t: "This person is a renowned English singer and the charismatic leader of the Rolling Stones. With his unique voice and dynamic stage presence, he has captivated audiences for over six decades. His collaboration with Keith Richards has resulted in a plethora of hit songs that have left a lasting impact on the music industry. He has achieved chart-topping success both as a member of the Rolling Stones and as a solo artist. His influence has been recognized with inductions into the Rock and Roll Hall of Fame and the UK Music Hall of Fame, as well as a knighthood for his significant contributions to popular music." },
    { k: "F", t: "This person was an acclaimed English theoretical physicist, cosmologist, and author renowned for his pioneering contributions in theoretical physics. He directed research at the Centre for Theoretical Cosmology at the University of Cambridge and held the esteemed Lucasian Professor of Mathematics position for thirty years. He made substantial impacts in the areas of general relativity, black hole radiation, and cosmology. His book \"A Brief History of Time\" achieved bestseller status, and he received numerous accolades for his scientific accomplishments." },
    { k: "G", t: "This person is a renowned British broadcaster, biologist, natural historian, and writer known for his distinguished career in the media industry. He has held key positions at the BBC, including controller of BBC Two and director of programming for BBC Television. He is famous for hosting various nature documentaries and series, receiving numerous awards and accolades for his work. He is a strong advocate for environmental causes, emphasizing the importance of biodiversity, renewable energy, and conservation efforts. His contributions to nature documentaries and environmental advocacy have established him as a respected figure in the field." },
    { k: "H", t: "This person held the title of monarch for an impressive 70 years and 214 days, making them the longest-reigning British monarch. Throughout the reign, they skillfully managed significant political changes, such as decolonization, the Troubles in Northern Ireland, and the UK's participation in and withdrawal from the European Communities. Notable events during their reign included the coronation in 1953 and various jubilee celebrations." },
    { k: "I", t: "This person was a British actress renowned for her memorable performances on stage and screen. She achieved two Academy Awards for Best Actress for her roles in \"Gone with the Wind\" and \"A Streetcar Named Desire,\" along with a Tony Award for her Broadway work. Over a 30-year career, she portrayed a diverse array of characters, spanning from Shakespearean heroines to modern comedy roles. Her partnership with Laurence Olivier in both stage and film cemented her lasting impact on the entertainment world." },
    { k: "J", t: "This person was a versatile English scholar known for his groundbreaking work in mathematics, computer science, logic, cryptography, philosophy, and biology. His notable achievements include formalizing the fundamental concepts of algorithms and computation through the invention of the machine that was named after him. He played a pivotal role in deciphering German codes during World War II while working at Bletchley Park. After the war, he focused on designing the Automatic Computing Engine and contributed to the advancement of Manchester computers. Additionally, his research on morphogenesis and chemical reactions significantly influenced diverse scientific disciplines." },
    { k: "K", t: "This person was an English philosopher and statesman who made significant contributions to science, methodology, and literature. He served as Attorney General and Lord Chancellor of England under King James I, advocating for natural philosophy guided by the scientific method. He emphasized the importance of inductive reasoning and careful observation in scientific knowledge, laying the groundwork for the scientific method and influencing the Scientific Revolution. He was also a patron of libraries and developed a system for cataloguing books." },
    { k: "L", t: "This person is a highly regarded English actor recognized for his exceptional performances on screen and stage. He has received critical acclaim and numerous accolades, including a BAFTA TV Award, a Primetime Emmy Award, and a Laurence Olivier Award. He is known for portraying memorable characters like Sherlock Holmes in the series \"Sherlock\" and Dr. Stephen Strange in the Marvel Cinematic Universe. His wide-ranging acting abilities are evident in his work across Shakespearean theater, period dramas, and blockbuster movies, highlighting his versatility and skill in the entertainment industry." },
    { k: "M", t: "This British musician is celebrated for his significant impact on the music industry. Rising to fame in the 1970s, he is known for his distinctive music style and captivating performances. Teaming up with lyricist Bernie Taupin, he formed a successful songwriting duo. He has produced a string of hit albums and singles, earning both critical acclaim and commercial success over several decades. Additionally, he has demonstrated his talent in composing music for stage productions and films. A dedicated fundraiser for HIV/AIDS charities, this person has been honored with numerous prestigious awards for his musical achievements and philanthropic efforts." }
  ];

  // Устный тур: план монолога, мнение и правила одинаковы на всех четырёх карточках.
  var PLAN = ["Biography", "Main literary works", "Screen adaptations and theatrical productions based on the works", "The significance and contribution of this writer to Russian culture"];
  var OPINION = "Explain the impact of the writer’s works on you personally. Say what project you could offer to carry out at your school to commemorate his genius and give some advice on how to prepare for the proposed event.";
  var QA = "Answer 2 QUESTIONS from your partner – ‘a fellow student’- who wants to get ADDITIONAL INFORMATION that you have not mentioned in your presentation about the writer. Make sure your answers are based on the information from the fact file. If there is NO relevant information in the fact file, base your answer on your best guess.";
  function talk(set) {
    return "Your School is organizing an international conference dedicated to the great cultural mission of famous Russian writers. You are to deliver a report about one of the most outstanding Russian authors. Present the key points of " + set + " to your fellow students, who are interested in organizing a special event to celebrate the genius of the greatest representatives of Russian literature:";
  }
  // Задание «слушаешь партнёра»: на карточке это два пункта («1. Listen…», «2. Questions/ Answers…»),
  // здесь они слиты в одну строку так же, как в финале.
  function partner(set) {
    return "Listen to the presentation of your partner (" + set + "). Questions/ Answers: Time: 2 - 3 minutes. Ask 2 QUESTIONS about the writer to get ADDITIONAL INFORMATION not mentioned in the presentation. Yes/No questions and questions about the opinion of your partner are NOT accepted.";
  }
  var H_BIO = "Biography", H_WORKS = "Main Literary Works", H_SCREEN = "Screen Adaptations and Theatrical Productions", H_SIGN = "The Significance and Contribution to Russian Culture";

  function ch(n, q, a, opts) { var i = { n: n, q: q, a: a }; if (opts) i.opts = opts; return i; }
  function abc(list) { return list.map(function (t, j) { return { k: "ABCD"[j], t: t }; }); }
  function tx(n, q, accept) { return { n: n, q: q, accept: accept }; }

  window.VARIANTS = window.VARIANTS || [];
  window.VARIANTS.push({
    id: "reg-2025-26",
    title: "Regional 2025/26",
    subtitle: "All-Russian Olympiad · regional stage · grades 9–11",
    source: { name: "Official task archive · Centre for Pedagogical Excellence (Moscow)", url: "https://xn--b1ayi3a.xn--l1afu.xn--p1ai/upload/files/Arhive_tasks/2025-26/reg/engl/" },
    sections: [
      { id: "listening", title: "Listening", color: "#5B7CFF", icon: "🎧" },
      { id: "reading", title: "Reading", color: "#FF5C39", icon: "📖" },
      { id: "uoe", title: "Use of English", color: "#FFC93D", icon: "🧩" },
      { id: "writing", title: "Writing", color: "#3DDC97", icon: "✍️" },
      { id: "speaking", title: "Speaking", color: "#C77DFF", icon: "🎤" }
    ],
    parts: [
      {
        // «Time: 1 hour 15 minutes», 40 заданий по 1 баллу (anskrit: «Максимальное количество баллов … 40»).
        id: "lr", title: "Listening and Reading", minutes: 75, max: 40,
        tasks: [
          {
            id: "r-l1", section: "listening", title: "Task 1 · Corporate Social Responsibility", type: "choice", opts: TF,
            intro: "For items 1-10 listen to a business journalist talking about how businesses are increasingly having to accept responsibility for the impacts that result from their activities and decide whether the statements (1-10) are TRUE (A), or FALSE (B) according to the text you hear. You will hear the text TWICE.",
            script: "Well, Corporate Social Responsibility or CSR is a concept that is changing the way that companies conduct their business operations at home and abroad. It encourages companies to adopt practices that are based on principles of good conduct in relation to issues such as sustainable development, climate change, human rights and ethical business. I suppose you can really trace the beginnings of the CSR story back to some quite specific events which sort of lifted the curtain on businesses, if you like, and showed the darker side of some business operations rather than just the silver lining. Of course, I’m not suggesting that companies were better in the past - clearly that wasn’t the case. Just think of what was going on during the Industrial Revolution in Europe.\n" +
              "Anyway, one really big shock was Exxon Valdez in Alaska. On March 24, 1989, the oil tanker Exxon Valdez ran into a reef, spilling crude oil into Alaskan waters. The oil tanker went aground in a remote territory where there aren’t a lot of people. But that doesn't mean that it wasn't a major disaster for the environment. In fact, it’s estimated that 10.8 million gallons of petroleum were released into the sea and the effects of that were catastrophic for the marine environment in that part of the world and also for the people who made their living from the sea. Tourism spending decreased by 35% in southwest Alaska in the year following the spill and visitor spending resulted in a loss of $19 million to the Alaskan economy. Two years after the Exxon Valdez spill, the economic losses to recreational fishing were estimated to be $31 million. It’s true that damages were awarded only in 2008, in other words 20 years after the events, the Supreme Court of the United States had the final word and reduced the settlement to 500 million dollars which is not a lot compared to the 5 billion that was awarded after the first court hearing.\n" +
              "Well, the lessons from this catastrophe haven't been lost on corporations and that is the positive side of this and indeed of Corporate Social Responsibility in general. Companies have to look very carefully at what they do in different parts of their business operations and they have to put strategies in place which will minimize the risks that they are running. Does that mean that similar tragedies couldn’t happen again today? Well, I don’t think you can say that but certainly companies today are more aware of what could go wrong and that is one step towards making sure that the worst doesn't actually ever happen.",
            items: [
              ch(1, "CSR is a department in a company responsible for sustainable development and climate change.", ["B"]),
              ch(2, "During Industrial Revolution in Europe companies were more ethical and environmentally-friendly than now.", ["B"]),
              ch(3, "There were no immediate victims among people as the tanker went aground in a remote territory.", ["A"]),
              ch(4, "The tanker spilled about 11 million gallons of oil.", ["A"]),
              ch(5, "The accident affected all indigenous people of Alaska.", ["B"]),
              ch(6, "The damage to visiting tourism was as big as to recreational fishing in Alaska.", ["B"]),
              ch(7, "People who suffered in the accident got their compensation in 2008.", ["A"]),
              ch(8, "Initially the court ruled the company to pay 5 billion dollars.", ["A"]),
              ch(9, "The accident decreased the settlement of people living in the area.", ["B"]),
              ch(10, "Modern companies are implementing risk management strategies to prevent critical events.", ["A"])
            ]
          },
          {
            id: "r-l2", section: "listening", title: "Task 2 · Friends who moved to France", type: "choice",
            intro: "For items 11-15 listen to the conversation. Choose the correct answer (A, B or C) to answer questions 11-15. You will hear the text only ONCE.",
            script: "Amy: Ben, do you know anyone who’s gone to live abroad?\n" +
              "Ben: Yes, Amy. I've got these friends, a couple, who moved to a little village in France, down in the south-west, about ten or twelve years ago now - yeah, they’ve been there a pretty long time!\n" +
              "A: It sounds as if they must be well settled in. What do they do?\n" +
              "B: Well, they bought quite a big house in the village and set up a kind of walking holiday business. You know, people come in small groups and stay with them for a day or two, and then walk from village to village, staying in small hotels and guesthouses, and getting all their luggage transported for them.\n" +
              "A: Interesting, and how have they found it?\n" +
              "B: They seem to be doing very well. It took a while to get the business going - the first two or three years were a bit of a struggle, I think - but now they’re established, and they’ve got good relationships with the walking holiday companies. I mean they don’t make a fortune, and they make most of their money in the spring and the summer, and winter can be quiet, but then they do get to live in a beautiful French village!\n" +
              "A: And have they fitted in well? I mean, do they feel they belong now?\n" +
              "B: Yes, they’ve really had no problems. They both spoke French already, which was obviously a huge help, and they tried right from the start to be part of the village, you know, getting to know people and going to festivals and events and stuff like that. But the real difference was when they had a baby - I think that’s when they were really accepted, and people realized that they were there to stay, and the baby was a real star in the village!\n" +
              "A: So they’re planning to stay?\n" +
              "B: Well I think so, yes. I mean they’ve actually bought a couple more houses and they’re renovating them, and last year they opened a restaurant which was the first one in the village, and the first night it opened they gave everyone a free four-course dinner, which went down very well! I think they’re going to stay. And it’s been good for the village too, I mean it was really a tiny village, but now they get visitors and a little bar opened up in summer, and even a little shop, and it seems to have come back to life a bit, which has to be a good thing.",
            items: [
              ch(11, "What is NOT TRUE about Ben’s friends?", ["C"], abc(["They’ve been living in France about 10-12 years.", "They have moved to the countryside.", "They have chosen south-east of the country."])),
              ch(12, "What do Ben’s friends do for a living?", ["C"], abc(["Buy and sell houses.", "Run a chain of small hotels.", "Organise walking holidays."])),
              ch(13, "Ben’s friends’ business is", ["A"], abc(["seasonal.", "extremely profitable.", "unsuccessful."])),
              ch(14, "Ben thinks his friends fitted in well as soon as", ["B"], abc(["they got to know people in the area.", "they gave birth to their baby.", "attended all the festivals and events in the area."])),
              ch(15, "What changes have the couple brought to the area they live now?", ["B"], abc(["Renovation of bars and restaurants.", "More visitors.", "Free food on a regular basis."]))
            ]
          },
          {
            // Строка «Now listen…» (afterText) — в бумаге стоит после текста, перед вопросами 16–25.
            id: "r-lr3", section: "listening", title: "Task 3 · Integrated listening and reading", type: "choice", opts: ABCD_INT,
            readMinutes: 10,
            intro: "Read the text below, then listen to an interview with an international student doing his Master’s degree in Russia. You will notice that some ideas coincide and some differ in them. Answer questions 16-25 by choosing A if the idea is expressed in both materials, B if it can be found only in the reading text, C if it can be found only in the audio-recording, and D if neither of the materials expresses the idea.",
            textTitle: "International Students Tell Us What It’s Like to Study in Russia",
            text: [
              "Back in July 2022 I was lucky enough to go on a week-long trip to Russia to attend the Island 10-22 higher education conference in Moscow, spending half of the trip in Moscow and the other half in St Petersburg. In both cities I met and chatted with a diverse range of international students from different countries. Why did they choose to study in Russia, and what advice would they give to international students considering it? Read on to find out what they had to say on their experiences.",
              "So, first things first: why choose Russia rather than any other study destination? What does Russia offer that other countries don’t? One major attraction mentioned by several students was the diversity of the country. For example, Osei Richard from Ghana told us: “I wanted to meet new people, it’s a new experience and a new culture. I really liked Russian culture, and Russians seem to be nice and frank people. The education is also one of the best for me.”",
              "Nawar, from Syria, said he was attracted by the extra resources and investment into scientific research in Russia, explaining, “I decided to go abroad to have better opportunities. I chose Russia in particular because it offers more opportunities for students like me, and because life in general is cheaper in Russia, compared to Europe or America. And they also provide scholarships to international students, so I can study here for free.”",
              "We heard very mixed opinions on how affordable it is to study in Russia. Osei Richard found Moscow very expensive, describing people in the capital as “crazy about money”, whereas in St Petersburg, Sarah and Mathias from the US said they found it very affordable and less stressful. Himanshu, from India, who is pursuing a PhD at the Moscow Institute of Physics and Technology, said, “The only problem is housing, especially in Moscow, which is very costly. But the university provides dormitories at a very low price, which is fantastic.”",
              "If languages aren’t your forte and you’d prefer to study in Russia in English, the good news is that many universities now offer English-taught courses, especially at postgraduate level. But if you do study in English, how easy is it to get by in Russia with little to no knowledge of Russian? Nawar told us: “When I came here, I couldn’t speak Russian, and I didn’t meet many people who spoke English. But people were very helpful and tried to help me in every step during my first days. They were generous and very kind.” Himanshu, from India, added: “After six months I knew the basics to communicate with people, such as how to ask for directions. For everyday life that was sufficient.”"
            ],
            afterText: "Now listen to the interview and then do the tasks (questions 16-25), comparing the text above and the interview. You will hear the text TWICE.",
            script: "Presenter: Michelangelo Cerracchio came to St Petersburg University from Italy to pursue a master’s degree in Strategic and Arms Control Studies. Why did you choose international relations as your field of academic interest?\n" +
              "Michelangelo Cerracchio: My area of academic interest is geopolitics and the interactions between states. As I studied the international system, I came to recognise Russia as a great power. This sparked my personal interest in gaining a deeper understanding of the Russian psyche and mentality. In fact, it has become my passion.\n" +
              "P: How exactly did you come up with the idea of coming to Russia?\n" +
              "MC: My father, a little worried about the political situation, asked me why I wanted to study in St Petersburg. I told him one main reason—I wanted to understand the Russian way of thinking. All his fears vanished and he gave me his full support.\n" +
              "P: Why did you choose St Petersburg?\n" +
              "MC: St Petersburg is a very historic city. I knew it as a truly poetic place, and its architecture has deep connections with Italy. For me, Moscow feels like Milan, while St Petersburg feels more like Naples. Moscow is all about money and rushing everywhere – people there are very focused on finances. St Petersburg seems to be a more relaxed city.\n" +
              "P: What are your impressions of learning Russian, since you have a lot of experience in learning foreign languages?\n" +
              "MC: Languages are crucial to me because they represent the soul and mentality of a country. I always knew that Russian is a hard one and I never imagined that I would make so much progress in just a few months. The Cyrillic alphabet is like a mirror: some words in Italian and Russian are almost identical because of Latin and Greek influences, just encoded in a different alphabet. That is why Russian looks to me like a puzzle to be solved.\n" +
              "P: What do you think of the Russian lifestyle? Have you come across any stereotypes?\n" +
              "MC: After coming here, I discovered that Russians really like Italians. I can’t recall a single moment when a Russian didn’t smile upon hearing that I was Italian—and particularly from Rome. Russians truly love and appreciate Italy. I feel at home here, even more than in Canada. I love Canada, but I felt like an outsider there. Russian people are so warm and always ready to help that they have become \"a piece of my heart\"—they remind me of home. Some say that Russians tend to be bossy, unsmiling, or cold-hearted. But in fact, after getting to know them, I’ve realised that they are genuinely open-hearted and sincere. And this feeling grows stronger with each day I spend here.",
            items: [
              ch(16, "The student thinks people in Moscow are obsessed with money.", ["A"]),
              ch(17, "The student thinks people in Russia are unsmiling.", ["D"]),
              ch(18, "The student chose to study in Russia to understand the Russian mentality.", ["C"]),
              ch(19, "The student thinks that Russians are helpful.", ["A"]),
              ch(20, "The student chose to study in Russia because it was affordable.", ["B"]),
              ch(21, "International students always have to pay for their education in Russia.", ["D"]),
              ch(22, "International students, bad at languages, can study in English in Russia.", ["B"]),
              ch(23, "The Russian language reflects the Russian way of thinking.", ["C"]),
              ch(24, "It took a student half a year to learn how to navigate in basic Russian.", ["B"]),
              ch(25, "The student thinks Russia is similar to Canada.", ["D"])
            ]
          },
          {
            // В бумаге после текста — заголовок «Questions 26-40» и вопрос «In which part…»; он перенесён в intro.
            id: "r-r4", section: "reading", title: "Task 4 · The Sound of Silence", type: "choice", opts: PARTS,
            intro: "Read the text and answer questions 26-40 below. In which part of the text is the following mentioned?",
            textTitle: "The Sound of Silence",
            textSubtitle: "After realising how much I talked and interrupted other people, I decided I needed to make a drastic change. Starting to listen changed my relationships – and made me happier. (Ioan Jones)",
            text: [
              "(A) I like to talk as much as the next man – and men like to talk. A now-famous study by the University of California, noted that, in a series of recorded public conversations between men and women, 48 interruptions occurred, 46 of which came from men. Men in public spaces, according to research, talk more than women, talk over women, and talk down to women, contributing to the rise of neologisms such as manologuing, bropropriating and mansplaining. So, aware that men tend to dominate and disrupt, aware that the world at large feels unbearably loud, aware that I, too, often add to that noise, I decided to learn to keep my mouth shut – starting in the general hellscape of social media.",
              "(B) I have often felt compelled, on seeing an idiotic post, to point out its idiocy, as though I alone had noticed it. It’s a compulsion encouraged by the reward-based models of social media platforms. Users think of an interesting thought or response (trigger), send a post (behaviour), receive likes and re-posts (reward). Dopamine arrives as part of the feedback loop and we repeat the cycle. I’ve had social media for the majority of my life. It seemed obvious that, as I slouched into my mid-30s, I needed a cleanse.",
              "(C) Talking less in real life proved a tougher ordeal. My family are rough around the edges, my friends are on the wrong side of unruly: the people I love seldom get each other to finish sentences. My communication coach told me that the compulsion to talk often stems from the desire to escape silence, “Most people speak to avoid discomfort – not because they have something essential to say.” That rang true: the urge to avoid awkward silences has always felt urgent. “You express yourself, which is good, but then feel the need to defend what you have just expressed, then defend that against an imagined response, then apologise for talking too much, then apologise for apologising.” She then offered advice: “People who can tolerate uncomfortable silences are typically better listeners. Be an active listener”.",
              "(D) That meant practice, embracing real-world silence despite every fibre of my British being pushing me to discuss the weather. I noticed two responses to my newfound silence: most people ranted – bless them – or I faced unimaginable awkwardness. I stood by a bus stop with my mum’s friend and lasted roughly 20 seconds until I finally broke: “Weather’s weird, isn’t it?” I said. I’m still practising. Suffering awkward silences has been an odd learning curve: horrific at first, only slightly less horrific later on, still horrific now but perhaps not as horrific.",
              "(E) Talking less is not just about limiting the compulsion to talk. It’s also about changing the ways in which we converse. One of my main problems was conversational narcissism: the art of bringing every discussion back to me. I’m very good at it. I started to notice my interruptions, the creative ways I managed to bring the conversation back to my favourite topic: me. I noticed how, instead of listening, my mind would embark on wild and weird adventures, fighting against the odds to relate everything back to my experience. My wife recalled the time that I said, to my embarrassment: “That reminds me of me.”",
              "(F) I started practising more active listening. Active listening has become a buzzword, abused by droves of middle managers, corporate gurus and lifestyle coaches. Listening, to them, depends on the right sort of nod, mirrored questions and choreographed body language, always in pursuit of a goal: to make a sale, gain a promotion, secure a date, and so on. It is listening as performance. Emphasis remains on the outcome, not the process. But active listening, in its initial form, focuses on the talker.",
              "(G) All my efforts have not been fruitless. A couple of months passed and I noticed that my contributions at work have become more impactful and my appetite for collaboration has increased. My wife and I, after an initial unnerving period, in which she found my quiet vaguely haunting, now seem to communicate in more fruitful ways, largely based on my conscious use of support rather than shift responses. “I appreciate you asking more questions,” she said. I have found, in general, with friends and family and strangers, that the compulsion to talk has reduced, the itch to interrupt has lessened, the capacity to listen has grown. And the rest, as Hamlet said, is silence."
            ],
            items: [
              ch(26, "a personal tendency to prolong remarks in order to justify them", ["C"]),
              ch(27, "fewer but more thoughtful remarks that produced stronger effects", ["G"]),
              ch(28, "expressions emerging from gender dominated interactions", ["A"]),
              ch(29, "a popular term being overused in professional and self-help contexts", ["F"]),
              ch(30, "the same imperfection common among relatives and companions", ["C"]),
              ch(31, "thoughts often wandering toward finding personal connections", ["E"]),
              ch(32, "feeling less urge to speak over others and being better able to pay attention", ["G"]),
              ch(33, "a resolution to speak less beginning with online platforms", ["A"]),
              ch(34, "opposite reaction to one’s quietness", ["D"]),
              ch(35, "a mechanism that encourages repeated engagement online", ["B"]),
              ch(36, "a style of interaction often centered on oneself", ["E"]),
              ch(37, "an urge of immediate response to online content", ["B"]),
              ch(38, "data showing the frequency of conversation disruptions", ["A"]),
              ch(39, "a suggestion that excessive speech may be driven by unease rather than necessity", ["C"]),
              ch(40, "resisting a cultural impulse to talk about trivial topics", ["D"])
            ]
          }
        ]
      },
      {
        // «Time: 45 minutes», три задания, 20 вопросов по 1 баллу.
        id: "uoe", title: "Use of English", minutes: 45, max: 20,
        tasks: [
          {
            // Определения в скобках — вопросы; сама сетка с подсказками-буквами — картинка.
            // По критериям орфография учитывается: ответ с ошибкой — 0 баллов. Других вариантов в ключе нет.
            // У текста в бумаге нет заголовка; textTitle — только подпись для блока с текстом.
            id: "r-u1", section: "uoe", title: "Task 1 · Crossword: a car that flies", type: "text",
            intro: "For items 1-7, using the definitions in the brackets, do the crossword puzzle. The first example (0) is done for you.",
            examples: [
              { label: "0", show: "expensive and only for people who are rich or of a high social class", answer: "exclusive" }
            ],
            figure: { src: "media/reg-crossword.png", alt: "Crossword grid" },
            textTitle: "Text for items 1-7",
            text: [
              "In the early 20th century the private car was the (0) … (expensive and only for people who are rich or of a high social class) form of transportation that only the wealthiest could afford. In (1) … (happening or coming after something else) decades, it was the private jet that took (2) … (the condition of being more important than somebody/something else and therefore coming or being dealt with first) as the ultimate status symbol. As the 21st century progresses, it could be a very different kind of invention that gets favored by the super-rich - one that (3) … (includes something so that it forms a part of something) both of these modes of transportation in one vehicle... a car that flies.",
              "In 2012, an American company launched its special project to the world - the first ever vehicle to be approved by both the US highways and aviation authorities. Called the Transition, it has two seats, four wheels, and wings that (4) … (pull something back into the main part of something) when not in use. In a test flight shortly before it went on display at the New York International Auto Show, the (5) … (the first design of something from which other forms are copied or developed) vehicle flew at 1,400 feet for eight minutes, so it may prove to be a useful way to beat traffic jams.",
              "Yet, there are still some (6) … (done with difficulty, or involving repeated problems or mistakes) blocks - the space needed for takeoff could prove to be a problem. And with an added vertical (7) … (a measurement of something in a particular direction, especially its height, length, or width), the laws of the road could become considerably more complex. Not to mention that when the Transition is finally put on the market for sale, its price tag, much like the hi-tech vehicle itself, is expected to go sky-high."
            ],
            items: [
              tx(1, "happening or coming after something else", ["subsequent"]),
              tx(2, "the condition of being more important than somebody/something else and therefore coming or being dealt with first", ["precedence"]),
              tx(3, "includes something so that it forms a part of something", ["incorporates"]),
              tx(4, "pull something back into the main part of something", ["retract"]),
              tx(5, "the first design of something from which other forms are copied or developed", ["prototype"]),
              tx(6, "done with difficulty, or involving repeated problems or mistakes", ["stumbling"]),
              tx(7, "a measurement of something in a particular direction, especially its height, length, or width", ["dimension"])
            ]
          },
          {
            // Таблица в бумаге: A — первая половина (0, 8–14), B — вторые половины A–O, C — сценарий.
            // Сценарий стоит в той же строке, что и первая половина, поэтому он входит в вопрос.
            id: "r-u2", section: "uoe", title: "Task 2 · Compound adjectives", type: "choice", opts: HALVES,
            intro: "For items 8-14, compound adjectives have been split in half and shuffled. Match the correct first half (8–14) with its second half (A–O). The most suitable scenarios that describe them best are provided. There are more halves than you need. The first example is done for you.",
            examples: [
              { label: "0", show: "eye- · A documentary that completely changed the way you view the education system", answer: "N (opening)" }
            ],
            items: [
              ch(8, "spine- · A scene in a thriller where the villain suddenly appears behind the hero", ["G"]),
              ch(9, "blood- · The sound of a scream in an abandoned asylum during a ghost tour", ["I"]),
              ch(10, "toe- · A dance beat at a concert that made the entire crowd move", ["C"]),
              ch(11, "bone- · A football player colliding with another at full speed", ["D"]),
              ch(12, "hair- · A breathtaking moment in skydiving when the chute opens", ["K"]),
              ch(13, "heart- · A chase scene in a spy film where the main character barely escapes", ["B"]),
              ch(14, "jaw- · Watching a gymnast do a triple backflip with perfect landing", ["O"])
            ]
          },
          {
            id: "r-u3", section: "uoe", title: "Task 3 · Famous British people", type: "choice", opts: PEOPLE, longOpts: true,
            intro: "For items 15-20, match some famous British people in the left column with their descriptions in the right column. There are extra descriptions that you will not need. The first example is done for you.",
            examples: [
              { label: "0", show: "Queen Elizabeth II", answer: "H" }
            ],
            items: [
              ch(15, "Elton John", ["M"]),
              ch(16, "Alan Turing", ["J"]),
              ch(17, "Rowan Atkinson", ["B"]),
              ch(18, "David Attenborough", ["G"]),
              ch(19, "Audrey Hepburn", ["D"]),
              ch(20, "John Locke", ["A"])
            ]
          }
        ]
      },
      {
        id: "writing", title: "Writing", minutes: 60, max: 20,
        tasks: [
          {
            // Критерии — «Дополнительная схема оценивания задания Writing» в anskrit: К1 решение задачи 10,
            // К2 организация 2, К3 лексика 3, К4 грамматика 3, К5 орфография и пунктуация 2 (итого 20).
            // Объём 200–250 слов, допустимо 180–275; от 276 проверяются первые 250; заголовок входит в подсчёт.
            id: "r-w1", section: "writing", title: "Review · A festival of young people’s startups", type: "writing",
            intro: "Your town is organizing a festival of young people’s startups that are aimed at shaping a better future world.",
            premise: "A young people’s magazine has asked you to visit the festival and write a review.",
            outro: "Write 200-250 words. Provide the title.",
            pointsLabel: "The review must contain:",
            points: [
              "introduction",
              "description of the most surprising futuristic startup",
              "explanation of what makes it unique",
              "reflections on the impact of the startup on society in years to come",
              "possible challenges faced by young startups",
              "quotes from two visitors to the festival about the startups",
              "personal feelings about whether such festivals are important for young people."
            ],
            words: { min: 200, max: 250, accMin: 180, accMax: 275 },
            needsTitle: true,
            titleInCount: true,
            criteria: [
              { id: "task", t: "Task completion", max: 10 },
              { id: "org", t: "Organisation of the text", max: 2 },
              { id: "lex", t: "Vocabulary", max: 3 },
              { id: "gram", t: "Grammar", max: 3 },
              { id: "spell", t: "Spelling and punctuation", max: 2 }
            ],
            note: "If Task completion gets 0 points, the whole work gets 0. Task completion gets 0 if the text is not a review of the festival, if the 9 content points are not all there (the title and every point of the list; quotes from two visitors count as two points), if there are fewer than 180 words, or if more than 30% of the text is copied (the same as a published or Internet text). Fewer than 180 words = 0 points. If there are more than 275 words, only the first 250 words are checked. The title counts as words too."
          }
        ]
      },
      {
        id: "speaking", title: "Speaking", max: 20,
        tasks: [
          {
            // Порядок заданий на карточках: у Student 1 (Set 1, Set 3) сначала свой монолог,
            // у Student 2 (Set 2, Set 4) сначала он слушает партнёра — отсюда partnerFirst.
            // Факт-файлы на этом этапе английские; «Numerous screen and stage adaptations:"» — с кавычкой, как в бумаге.
            id: "r-s1", section: "speaking", title: "Great Russian Writers Treasure Trove", type: "speaking",
            timing: { prep: 15, total: "10 minutes", monologue: "3 – 4 minutes", questions: "2 - 3 minutes", monoSec: 240 },
            // В критериях регионального этапа нет правила «0 за монолог — 0 за всё» (в финале оно есть).
            zeroGate: null,
            cards: [
              {
                id: "tolstoy", label: "Set 1 Student 1 · Leo Tolstoy", place: "# 1. Leo Tolstoy – A Moral Voice of World Literature",
                task: talk("Set 1: Leo Tolstoy"), plan: PLAN, opinion: OPINION, qa: QA,
                partner: partner("Set 2: Alexander Pushkin"),
                fact: [
                  [H_BIO, [
                    "Born: September 9, 1828, Yasnaya Polyana estate.",
                    "Orphaned, raised by relatives.",
                    "Received a home education.",
                    "Entered Kazan University: studied law and oriental languages, did not complete his degree.",
                    "A soldier in the Crimean War.",
                    "Life of introspection and transformation.",
                    "A Christian anarchist and moral philosopher.",
                    "Rejected wealth and status.",
                    "Advocated for simplicity, non-violence, and spiritual awakening.",
                    "Died: 1910",
                    "Left behind a literary and philosophical legacy influencing global thought."]],
                  [H_WORKS, [
                    "“War and Peace” – a narrative blending history, philosophy, and human drama.",
                    "“Anna Karenina” – a psychological novel on love, betrayal, and the role of women in Russian society.",
                    "“The Death of Ivan Ilyich”, “Resurrection”, and “The Kreutzer Sonata” – shorter works on mortality, guilt, and the search for truth.",
                    "Essays on education, religion, and ethics reflect his own moral philosophy."], "The most influential novels:"],
                  [H_SCREEN, [
                    "“War and Peace” - a Soviet-era film epic (Sergei Bondarchuk’s 1960s version won an Oscar) and later adapted into international films and series.",
                    "“Anna Karenina” adapted by directors around the world.",
                    "His stories, dramatized in theatre, highlight the complexity of human choices and moral dilemmas.",
                    "Tolstoy's themes are relevant to global audiences."], "Numerous screen and stage adaptations:\""],
                  [H_SIGN, [
                    "one of the greatest novelists in world history;",
                    "shaped Russian national consciousness;",
                    "influenced political and spiritual movements worldwide;",
                    "realistic style and psychological insight transformed the novel as a literary form ;",
                    "deeply impacted figures such as Mahatma Gandhi and Martin Luther King Jr.;",
                    "teachings on education contributed to pedagogical reforms."]]
                ]
              },
              {
                id: "pushkin", label: "Set 2 Student 2 · Alexander Pushkin", place: "# 2. Alexander Pushkin – The Father of Russian Literature", partnerFirst: true,
                task: talk("Set 2: Alexander Pushkin"), plan: PLAN, opinion: OPINION, qa: QA,
                partner: partner("Set 1: Leo Tolstoy"),
                fact: [
                  [H_BIO, [
                    "Born: June 6, 1799, Moscow.",
                    "From a noble family with African roots (his great-grandfather, Abram Gannibal, was an African prince).",
                    "Elite education at the Tsarskoye Selo Lyceum.",
                    "Exceptional literary talent from a young age.",
                    "Involved in liberal intellectual circles in conflict with the authorities.",
                    "Was exiled several times.",
                    "Remained loyal to his artistic mission.",
                    "Death: 1837, at the age of 37, from wounds in a duel for his wife's honor."]],
                  [H_WORKS, [
                    "“Eugene Onegin” – a novel in verse - a cornerstone of Russian literary style.",
                    "“The Bronze Horseman” – a poetic reflection on Peter the Great and fate.",
                    "“Boris Godunov” – a historical tragedy that prefigured modern Russian drama.",
                    "Short stories and fairy tales, such as “The Queen of Spades,” “The Captain’s Daughter,” and “The Tale of the Golden Cockerel.”"], "Most renowned works:"],
                  [H_SCREEN, [
                    "“Eugene Onegin”, transformed into opera (by Tchaikovsky), ballets, and films.",
                    "“Boris Godunov” - an opera by Mussorgsky, later performed at the Metropolitan Opera.",
                    "Russian theatres stage dramatizations of his tales and historical works highlight their timeless relevance.",
                    "His fairy tales, with magical and moral themes, adapted into animated films, educate and entertain children."], "Countless adaptations worldwide:"],
                  [H_SIGN, [
                    "The founder of modern Russian literature and the Russian literary language (rich, flexible, capable of conveying deep emotion and complex thought).",
                    "Freed Russian verse from artificial constraints.",
                    "His works reflect national history, folklore, human psychology, and moral values.",
                    "Through his poetry, prose, and drama Russian literature was brought to the world stage."]]
                ]
              },
              {
                id: "dostoevsky", label: "Set 3 Student 1 · Fyodor Dostoevsky", place: "# 3. Fyodor Dostoevsky – The Explorer of the Human Soul",
                task: talk("Set 3: Fyodor Dostoevsky"), plan: PLAN, opinion: OPINION, qa: QA,
                partner: partner("Set 4: Anton Chekhov"),
                fact: [
                  [H_BIO, [
                    "Born: November 11, 1821, Moscow.",
                    "Strict religious upbringing.",
                    "Graduated from the Military Engineering Academy in St. Petersburg, pursued a literary career.",
                    "“Poor Folk” - debut, then arrested for participating in a radical intellectual group.",
                    "Sentenced to death, at the last moment his punishment was changed to a four-year Siberian labor camp.",
                    "Exile experience shaped his worldview and writing.",
                    "After his release, traveled through Europe, struggling with poverty, epilepsy, and gambling addiction.",
                    "Despite hardships created some of the most profound psychological novels in world literature.",
                    "Died: 1881, left a legacy to challenge and inspire."]],
                  [H_WORKS, [
                    "“Poor Folk” – a powerful novel, a heartbreaking exploration of love, dignity and survival.",
                    "“Crime and Punishment” – the psychological journey of a young man who seeks redemption after committing a murder.",
                    "“The Karamazov Brothers” – a philosophical novel about faith, doubt, morality, and family conflict.",
                    "“The Idiot” – a portrait of a pure man whose goodness is tested by a corrupt society.",
                    "“Demons” (also translated as “The Devils” or “The Possessed”) – a critique of political extremism and nihilism in 19th-century Russia."], "Most significant works:"],
                  [H_SCREEN, [
                    "“Crime and Punishment” - adapted over 20 times for the screen, including international versions in Japan, France, and Hollywood.",
                    "“The Karamazov Brothers” - a Broadway play and an Oscar-nominated film.",
                    "His stories regularly performed in Russian and international theaters for their deep psychological drama and philosophical weight.",
                    "Directors like Akira Kurosawa and Andrei Tarkovsky were influenced by Dostoevsky’s themes in their work."], "Numerous adaptations:"],
                  [H_SIGN, [
                    "One of the greatest figures in Russian and world literature.",
                    "Wrote about the spiritual and ethical struggles of humanity.",
                    "Elevated the Russian novel to global prominence.",
                    "Influenced psychology, theology, and philosophy.",
                    "Writers like Kafka, Camus, Sartre, and Freud acknowledged their debt to his insights into the human condition.",
                    "Shaped Russian national identity by exploring its moral and existential dilemmas."]]
                ]
              },
              {
                // «Main Literary Works» у Чехова в бумаге без маркеров — два абзаца, Plays и Short Stories.
                id: "chekhov", label: "Set 4 Student 2 · Anton Chekhov", place: "# 4. Anton Chekhov – The Master of Subtle Drama and Human Truth", partnerFirst: true,
                task: talk("Set 4: Anton Chekhov"), plan: PLAN, opinion: OPINION, qa: QA,
                partner: partner("Set 3: Fyodor Dostoevsky"),
                fact: [
                  [H_BIO, [
                    "Born: January 29, 1860, Taganrog.",
                    "From a modest background - supported his family from a young age.",
                    "Studied medicine at Moscow University.",
                    "Worked as a doctor throughout his life, writing some of the most important literary works.",
                    "Medical profession provided deep insight into human suffering and psychology.",
                    "Suffering from tuberculosis, remained committed to both healing and writing about people with compassion and clarity.",
                    "Died: 1904, at the age of 44."]],
                  [H_WORKS, [
                    "Plays: 1) “The Seagull”, 2) “Uncle Vanya”, 3) “Three Sisters”, 4) “The Cherry Orchard” – introduced a new kind of drama based on mood, character, and subtext rather than action.",
                    "Short Stories: 1) “The Lady with the Dog,” 2) “Ward No. 6,” 3) “The Bet,” 4) “The Darling” – revealed the complexities of ordinary people with profound empathy and subtle irony."]],
                  [H_SCREEN, [
                    "Directors - Konstantin Stanislavski, Lee Strasberg and Peter Brook used Chekhov’s works for new acting methods.",
                    "Film adaptations range from faithful versions like “The Cherry Orchard” (1999) to modern reinterpretations.",
                    "Japanese director Ryusuke Hamaguchi’s Oscar-winning “Drive My Car” is based on Chekhovian storytelling techniques."]],
                  [H_SIGN, [
                    "The father of the modern short story.",
                    "Changed Russian and global literature focusing on the inner lives of characters rather than dramatic events.",
                    "His plays introduced a new type of realism in theatre: dialogue, silence, and what’s left unsaid reveal the deepest emotions.",
                    "Portrayed rural life, social change, and the emotional struggles of individuals with compassion.",
                    "His influence is seen in writers like Hemingway, Raymond Carver, and many modern screenwriters."]]
                ]
              }
            ],
            notesRule: "You can make notes during the preparation time, but YOU ARE NOT ALLOWED TO READ them during the presentation.",
            recorded: "YOUR ANSWERS WILL BE RECORDED",
            // Критерии — «Карточка члена жюри» и протокол в krit: монолог 6, диалог 5, организация 3,
            // лексика 2, грамматика 2, фонетика 2 (итого 20).
            criteria: [
              { id: "mono", t: "Task completion · monologue", max: 6 },
              { id: "dia", t: "Task completion · dialogue", max: 5 },
              { id: "org", t: "Organisation of speech", max: 3 },
              { id: "lex", t: "Vocabulary", max: 2 },
              { id: "gram", t: "Grammar", max: 2 },
              { id: "phon", t: "Pronunciation", max: 2 }
            ],
            note: "Speak, do not read: if you read your talk from your notes for more than 50% of your monologue time, your whole answer gets 0. Questions: ask only special (WH-) questions on the topic of the talk, for information your partner did not give in the presentation; general (yes/no) questions and questions about your partner's opinion do not count. Listen to your partner: you may not read your partner's fact file during the talk — if you do, your question does not count. Answers: \"Sorry, I don't know, I'll look it up on the Internet and come to you later.\" gets 0; answer with information from the fact file, and if the fact file does not have it, a possible (not absurd) answer is accepted even if it is not exactly right."
          }
        ]
      }
    ]
  });
})();
