// Муниципальный этап ВсОШ по английскому языку, Москва, 2025/26, 10–11 классы.
// Тексты заданий и ключи перенесены дословно из официальных файлов архива ЦПМ:
// tasks-/ans-/script-engl-10-11-mun-msk-25-26.pdf, аудио audio-engl-10-11-mun-msk-25-26.mp3.
// Верные варианты в Listening и Reading Task 1 в файле ответов выделены жирным —
// сверено по отрисованным страницам, а не по извлечённому тексту.
// Нумерация вопросов — как в бумаге: в каждом задании своя, с 1
// (Listening Task 2 в оригинале пронумерован 2–6 — так и оставлено).
// Use of English: в шапке раздела написано «40 points», но задания дают 15+10+10+10 = 45,
// и в разделе «Подсчёт баллов» файла ответов стоит 45 (итого 15+20+45+20 = 100). Взято 45.
// Метки аудио (секунды) найдены по паузам записи (RMS < 150 на окнах 0,1 с) и сверены со скриптом:
//   0–4,6 тишина; 4,6 — инструкция Task 1; 25,5–45,6 — «20 seconds to study»;
//   45,6–187,3 — рассказ Gina Purvis (1-й раз); 187,3–207,7 — «20 seconds to check»;
//   207,7–351,2 — «Now listen to the text again» + повтор; 351,2–371,5 — «20 seconds to check»;
//   371,5 — инструкция Task 2; 388,3–413,3 — «25 seconds to study»; 413,3–467,9 — диалог;
//   467,9–488,3 — «20 seconds to check»; 488,3 — «end of the listening… 1 minute»; 494,2–554,7 — минута тишины.
// Отсюда Task 1 — с 0, Task 2 — с 371 (начало его инструкции).
(function () {
  var TF = [{ k: "A", t: "True" }, { k: "B", t: "False" }];
  // Reading Task 2: предложения A–K, одно лишнее (по ключу — D).
  var CLOCK = [
    { k: "A", t: "They say exposure to bright light in the morning can help boost the production of serotonin, a hormone that regulates mood, and suppresses the production of melatonin, the hormone that helps us feel sleepy." },
    { k: "B", t: "I’m currently awakening to the pinkish hues of a “Spring Sunrise” lightscape, but you can choose from a variety of color schemes, as well as different waking-up sounds like chirping birds, flutes, chimes, bells and more." },
    { k: "C", t: "Essentially, they’re a combination of alarm clock and light-therapy device that glows with increasing brightness as your wake-up time approaches." },
    { k: "D", t: "Therefore, your day no longer begins with eyes on-screen – and the road from here to doom scrolling is about the length of a thumbprint." },
    { k: "E", t: "And I can tell you from my own experience that they have truly transformed my attitude about mornings and the process of waking up." },
    { k: "F", t: "I’m more energized though I’m still not jumping out of bed with enthusiasm, but I stay awake once the alarm goes off instead of slipping back into sleep." },
    { k: "G", t: "If waking up feels like a struggle every morning, a sunrise alarm clock might be just the thing to ease the transition." },
    { k: "H", t: "A healthy sleep-wake cycle is crucial for quality sleep, and quality sleep is essential for our health." },
    { k: "I", t: "This is what I really appreciate at times of the year when I need or want to wake up long before sunrise." },
    { k: "J", t: "The clock sets off with a slowly dimming light and gentle sounds that tell my body and brain it’s time for bed." },
    { k: "K", t: "It’s enjoyable – but only a few of the products change my lifestyle in the long run." }
  ];
  // Use of English Task 4: явления A–N, часть лишние.
  var PHEN = [
    { k: "A", t: "During her visit to the White House Abraham Lincoln reportedly greeted this lady by saying, \"So this is the little lady who made this big war.\"" },
    { k: "B", t: "\"I beat him with a stick.\"" },
    { k: "C", t: "She led people to the northern free states and Canada via the Underground Railroad. This helped her gain the name \"Moses of Her People\"." },
    { k: "D", t: "\"Wall Street\" meaning the entire U.S. economy or the stock market" },
    { k: "E", t: "The building we see today was designed by John Nash, one of the most prominent British architects of the late 18th and early 19th centuries. Indo-Saracenic architecture was very popular for public and government buildings in the British Raj. The exotic elements were sometimes used in England as well." },
    { k: "F", t: "This building was once the crowning glory of London’s Hyde Park, attracting audiences from far and wide. Built to house the Great Exhibition of 1851, it only stayed in central London for a year, before being dismantled and reconfigured for its new location in Kent, near London, where it remained for nearly 100 years." },
    { k: "G", t: "economical instead of cheap" },
    { k: "H", t: "He is best known for designing 52 churches in London after the Great Fire of London in 1666. His most famous work is St Paul's Cathedral, which was finished in 1710. Other important buildings he designed include the Royal Hospital Chelsea and the Old Royal Naval College in Greenwich." },
    { k: "I", t: "one of the most prominent British architects of the 19th century. Some of his most famous works include Marble Arch, the Royal Mews, and Buckingham Palace." },
    { k: "J", t: "She helped create many of the modern ways we think about nursing today. She became a leader of nurses who cared for injured soldiers during the Crimean War. She became known as \"The Lady with the Lamp.\"" },
    { k: "K", t: "It was published by Benjamin Franklin in America from 1732 to 1758. Besides the usual information, it also included witty sayings, proverbs, and advice. These sayings often taught lessons about hard work and saving money." },
    { k: "L", t: "He was the very first person to sign the Declaration of Independence. Because of his famous signature, people in the United States sometimes say his name when they mean \"signature.\"" },
    { k: "M", t: "\"I beat him in an argument.\"" },
    { k: "N", t: "It was written by Thomas Paine in 1775 and 1776. It encouraged people in the Thirteen Colonies to seek independence from Great Britain. It was published without its author's name. This was right at the start of the American Revolution. It quickly became incredibly popular." }
  ];

  function ch(n, q, a, opts) { var i = { n: n, q: q, a: a }; if (opts) i.opts = opts; return i; }
  function abc(list) { return list.map(function (t, j) { return { k: "ABCD"[j], t: t }; }); }
  function tx(n, q, accept) { return { n: n, q: q, accept: accept }; }

  window.VARIANTS = window.VARIANTS || [];
  window.VARIANTS.push({
    id: "mun-msk-25-26",
    title: "Municipal 2025/26 · Moscow",
    subtitle: "Всероссийская олимпиада · муниципальный этап · Москва · 10–11",
    audio: "media/listening-mun-msk-25-26.mp3",
    source: { name: "Архив заданий ВсОШ · Центр педагогического мастерства", url: "https://xn--b1ayi3a.xn--l1afu.xn--p1ai/upload/files/Arhive_tasks/2025-26/mun/engl/" },
    sections: [
      { id: "listening", title: "Listening", color: "#5B7CFF", icon: "🎧" },
      { id: "reading", title: "Reading", color: "#FF5C39", icon: "📖" },
      { id: "uoe", title: "Use of English", color: "#FFC93D", icon: "🧩" },
      { id: "writing", title: "Writing", color: "#3DDC97", icon: "✍️" }
    ],
    parts: [
      {
        id: "l", title: "Listening", minutes: 15, max: 15,
        tasks: [
          {
            id: "m-l1", section: "listening", title: "Task 1 · Gina Purvis, a pilot", type: "choice", opts: TF,
            audio: { from: 0, label: "Task 1 · talk (twice)" },
            intro: "For items 1–10 listen to a talk by Gina Purvis, a pilot, and decide whether the statements (1–10) are TRUE (A), or FALSE (B) according to the text you hear. You will hear the text twice.",
            items: [
              ch(1, "Gina has dreamt of being a pilot since her childhood.", ["B"]),
              ch(2, "Before becoming a pilot Gina worked as a vet for a few years.", ["B"]),
              ch(3, "For Gina, working as a teacher was enthusiasm-boosting experience.", ["B"]),
              ch(4, "Gina has been working for a commercial airline for the last decade.", ["A"]),
              ch(5, "Gina says that you can’t become a captain if you don’t have three thousand flying hours.", ["A"]),
              ch(6, "Before taking off Gina gets information from the airport information desk to know about problems there.", ["B"]),
              ch(7, "Gina thinks every pilot has to have a degree in maths.", ["B"]),
              ch(8, "Gina thinks pilots should be taught people management skills.", ["A"]),
              ch(9, "Passengers are not allowed on board until the pilot fixes a broken ice chiller.", ["B"]),
              ch(10, "Gina finds it magical to visit wonderful places.", ["B"])
            ]
          },
          {
            id: "m-l2", section: "listening", title: "Task 2 · Allie and Mark in San Francisco", type: "choice",
            audio: { from: 371, label: "Task 2 · conversation (once)" },
            intro: "For items 2–6 listen to a conversation. Choose the correct answer (A, B or C) to answer questions 2–6. You will hear the text only once.",
            items: [
              ch(2, "Allie thinks San Francisco is", ["C"], abc(["as beautiful as London.", "better than London.", "different from London."])),
              ch(3, "What is NOT TRUE about Allie?", ["B"], abc(["She isn’t keen on living in San Francisco.", "She couldn’t leave Europe to live in a different place.", "Her family lives in London."])),
              ch(4, "What does Mark say about Alcatraz?", ["C"], abc(["It is on the right of the boat.", "It was closed for visitors in 1963.", "It was a prison before 1963."])),
              ch(5, "Allie finds information about Alcatraz", ["A"], abc(["exciting.", "surprising.", "unexpected."])),
              ch(6, "At the end of the conversation Mark feels", ["C"], abc(["cold.", "embarrassed.", "pity."]))
            ]
          }
        ]
      },
      {
        id: "r", title: "Reading", minutes: 45, max: 20,
        tasks: [
          {
            id: "m-r1", section: "reading", title: "Task 1 · Discovering your ancestral roots", type: "choice",
            intro: "For items 1–10, read the passage below and choose option A, B, C or D which best fits according to the text.",
            textTitle: "Discovering your ancestral roots: a path to truly feel like yourself",
            textSubtitle: "Greta Solomon, a writer, gained a richer sense of self when she discovered her ancestors were gifted storytellers too.",
            text: [
              "I’ve always been proud of my identity as a person of Black Caribbean origin. My mother had left Jamaica aged 10 to join her father and stepmother in England. Similarly, my father left the tiny Caribbean island of Nevis as a teenager, to study maths and engineering. They met, married and settled in a suburb of London, where I was born and raised. I knew the stories of my paternal great-grandfather who was born at the tail end of slavery in St Kitts, the twin island to Nevis. He grew up to be a successful entrepreneur in the construction industry and was instrumental in setting up the first trade union in St Kitts. That was all well documented. But I knew nothing of my African ancestry before the transatlantic slave trade until I decided to take a DNA test that enables you to discover the specific ethnicity of your mother’s maternal line, up to 2,000 years ago. Three weeks later, I found out that I’m descended from the Fang and Tikar people of Cameroon and Gabon.",
              "So much of popular psychology focuses on the need to individuate and self-actualise. But the need to belong to a race, culture and community is an integral part of our sense of self. So, how is identity formed? “Identity development is an extremely complex process,” explains Dr Sarah Gaither. “These include where you’re living, messages your parents, peers or teachers give you, and encounters and experiences where someone may question you or notice something different about you. Usually, these encounters cause someone to go and learn about whatever that identity or difference may be. They either accept that part of themselves by learning to internalise it, or decide that the identity doesn’t match their sense of self.”",
              "Since the age of six, I’d known I was a writer, after a teacher praised a story I wrote. My mother had taught me the alphabet before I went to school and I quickly started reading. She helped nurture my love of literature by taking me to the library every week. By the age I knew I wanted to be a journalist. I was also fascinated by the mechanics of songwriting, and would listen to Madonna songs on repeat, pulling apart the lyrics to understand how to construct my own songs. I’ve been a working journalist for eight years, but I don’t think my Mum has ever read a single article I’ve written – she’s always showed zero interest in this core part of me.",
              "Discovering that the Tikar people of Cameroon were known for their artistry and storytelling made me realise my deep-rooted love of writing was grounded in something bigger than me. According to the Roots Revealed blog, many Tikar people were gifted in writing, acting, dancing and music. Despite my mother’s lack of interest I could believe there was a set of ancestors who would have embraced my writerly self and encouraged me to share my stories.",
              "Surely, finding and discovering your ancestral roots can bring a new way of thinking about your identities, and past and present belonging. But I was surprised to learn that from the point of view of science there is no such thing as race – it’s a social construct. A research carried out by Dr Keon West suggests that generally, people are good at the things they practise, regardless of their ancestry. He writes, “That said, it can be helpful to remember that the world is full of a large variety of diverse people, and that what is considered weird in one culture is perfectly normal in another. British men, according to stereotypes, notoriously hate dancing. A British man who can’t resist the call of dance might take comfort in discovering that he is part Cuban, Trinidadian or Russian, as this can remind him that there are places in the world where dancing is a normal, valued trait in men. This would transform him, in his own mind, from an odd Brit, to a dancer from a line of dancers.”",
              "After leaving her homeland, my mother never returned to Jamaica. She said the circumstances of her leaving were too sad to ever return. Shortly after taking that DNA test, I visited Jamaica for the first time, finally able to piece together some parts of my and my mother’s history. Of her life, I have fragments – photos, stories, hearsay – and events forever etched in my consciousness that remain largely unspoken. I think I will be able to put them all together and learn more about her. Knowing her genetic beginning (and mine) gives me something else I can grasp on to."
            ],
            items: [
              ch(1, "What does Greta highlight as missing from her knowledge about the family background?", ["C"], abc(["The specific career paths of her great-grandparents.", "Information about other relatives living in Europe.", "Details about her earlier roots before recorded family history.", "The reasons why their parents chose to marry in London."])),
              ch(2, "What does Greta’s great-grandfather seem to represent in the story?", ["A"], abc(["An example of someone who made a difference.", "A symbol of conflict between different cultures.", "A person who disconnected from their native region.", "A symbol of freedom for his former slave family on Nevis."])),
              ch(3, "According to Dr Gaither, what often leads people to reflect on who they are?", ["B"], abc(["Social pressure to discover our ancestral roots and form an idea of self.", "Facing situations others highlight something unusual about them.", "Unexpected meetings with people form one’s past.", "Advice from friends and family stories about one’s ancestors."])),
              ch(4, "What does Dr. Gaither suggest about how people form a sense of who they are?", ["D"], abc(["It happens naturally without external influence.", "It is mostly shaped by media and entertainment.", "It depends entirely on family traditions.", "It involves both personal reflection and outside input."])),
              ch(5, "What role did Greta’s mother play in her early interest in creative expression?", ["C"], abc(["She discouraged her from pursuing reading and writing.", "She pushed her to focus on journalism as a more serious job.", "She supported her early development but didn’t engage with her career.", "She enrolled her in music classes from a young age."])),
              ch(6, "What realisation did Greta have after learning about her heritage?", ["A"], abc(["Her passion may have been shaped by past generations.", "Her ancestors left a lot of written heritage.", "Her ancestors were talented songwriters and singers.", "Her family background has little influence on personal interests."])),
              ch(7, "What does Greta suggest about her relatives from earlier generations?", ["D"], abc(["They would have been critical about her writing.", "They would have welcomed her songwriting skills.", "They might have discouraged her artistic expression.", "They would have appreciated her talents and abilities."])),
              ch(8, "What does Greta find unexpected about scientific views on racial categories?", ["C"], abc(["That they are based on genetic facts.", "That they are shaped mainly by biology.", "That they are not grounded in biological evidence.", "That they clearly explain inherited behavior."])),
              ch(9, "How might learning about their background change a person’s view of themselves, according to Dr. West?", ["B"], abc(["They would stop doing things they used to enjoy.", "They might feel less isolated in their behavior.", "They would prefer to move to another country.", "They would be more interested in learning a new skill."])),
              ch(10, "What did Greta hope to gain by traveling to Jamaica?", ["B"], abc(["A chance to meet and reconnect with distant relatives.", "A deeper connection to her family’s background.", "A prospect of settling in Jamaica with her family.", "An opportunity to study Jamaican traditions"]))
            ]
          },
          {
            id: "m-r2", section: "reading", title: "Task 2 · How I learned to love my alarm clock", type: "choice", opts: CLOCK, longOpts: true,
            intro: "For items 1–10, read the passage below and choose which of the sentences A–K fit into the numbered gaps in the text. There is one extra sentence which does not fit in any of the gaps.",
            textTitle: "How I learned to love my alarm clock",
            text: [
              "Sleep is personal, and no single wake up device will suit everyone. Traditional alarms that blast you awake don’t always align with your body’s natural rhythms. (1) ______. For me, this device has benefited my sleep-wake cycle more than any other product – perhaps excluding my memory foam mattress.",
              "I’d heard of sunrise alarm clocks some time before but little did I suspect they could resolve my waking woes. So, here they are. (2) ______. The light interacts with our circadian rhythms, as the sun does when it rises, so we wake up biologically prepared for the day.",
              "As a person interested in tech, I often review fascinating and useful gadgets, from electric heaters to smart drinking fountains for cats. (3) ______. Sunrise alarm clocks soon proved to fall into this exclusive category.",
              "I’ve been a faithful user of sunrise alarm clocks for a year now. (4) ______. Instead of doing it abruptly to a jarring beep in a pitch-dark room, a sunrise alarm clock slowly and gradually lights up my space. The effect reminds me of the gentle feeling of waking up at dawn while camping in the middle of summer. (5) ______.",
              "Research backs up my personal experiences with sunrise alarm clocks. (6) ______. So using a sunrise alarm clock can be an easy but powerful way to regulate your body’s circadian rhythm so you feel more rested during the day and more ready for sleep at night. (7) ______. No one doubts that.",
              "Any sunrise clock has individual settings. (8) ______. To wind down at night I do the whole process in reverse. (9) ______. Consistent bedtime and wakeup routines are a great way to help reset your body’s sleep cycle and my sunrise clock is a huge part of mine!",
              "After using a sunrise alarm clock for a year, I’ve noticed I feel more alert in the mornings. (10) ______. It’s been a small change that’s made a big difference in how I start and end my day."
            ],
            // Ключ — таблица на с. 7 файла ответов: G C K E I A H B J F; лишнее предложение — D.
            items: [
              ch(1, "Gap (1)", ["G"]), ch(2, "Gap (2)", ["C"]), ch(3, "Gap (3)", ["K"]), ch(4, "Gap (4)", ["E"]), ch(5, "Gap (5)", ["I"]),
              ch(6, "Gap (6)", ["A"]), ch(7, "Gap (7)", ["H"]), ch(8, "Gap (8)", ["B"]), ch(9, "Gap (9)", ["J"]), ch(10, "Gap (10)", ["F"])
            ]
          }
        ]
      },
      {
        id: "u", title: "Use of English", minutes: 60, max: 45,
        tasks: [
          {
            // Ответ «V» — строка верна. Сравнение без учёта регистра, поэтому «v» и «Because» тоже засчитываются.
            id: "m-u1", section: "uoe", title: "Task 1 · The King's Speech: extra words", type: "text",
            intro: "For items 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).",
            examples: [
              { label: "0", show: "“The King's Speech” is a richly enjoyable, instantly absorbing true-life drama about the introverted stammerer King George VI and his exuberant Australian speech therapist Lionel Logue.", answer: "V", correct: true },
              { label: "00", show: "These characters are performed with a pure theatrical gusto by Colin Firth as the miserably afflicted monarch, Geoffrey Rush as the twinkly eyed speech coach and Helena Bonham Carter as the Queen.", answer: "a", near: "with a pure", strike: "a" }
            ],
            items: [
              tx(1, "The social and political background, having acutely observed and carefully woven into the film's fabric, is the Depression at home, the rise of fascism abroad, and the arrival of the mass media as a major force in our lives.", ["having"]),
              tx(2, "Central to the dramatic action are four crucial incidents: the death in 1936 of George V, the first monarch to use the radio to address his subjects; the accession to the throne of his eldest son as Edward VIII and his almost immediate abdication in order not to marry American double divorcee Wallis Simpson;", ["not"]),
              tx(3, "the crowning of his successor, George VI; and finally, in 1939, the outbreak of a war for which the king and queen became figureheads of immeasurable national significance alongside with their prime minister, Winston Churchill.", ["with"]),
              tx(4, "Although the film involves a man overcoming so a serious disability, it is neither triumphalist nor sentimental.", ["so"]),
              tx(5, "The themes are courage, responsibility, and the necessity to place duty above personal pleasure or its contentment.", ["its"]),
              tx(6, "The film begins with a brief prologue in which both Bertie as Duke of York (Colin Firth) and his contemporary audience endure agonies of embarrassment as he attempts to deliver a speech at Wembley Stadium during the 1924 Empire exhibition.", ["v"]),
              tx(7, "Firth's face is a picture of misery in the opening scene, under his top hat, as if being attending his own funeral.", ["being"]),
              tx(8, "It is his first public appearance, required to speak through a microphone to vast crowds at the empire exhibition at Wembley Stadium, and by via live radio to the nation.", ["by"]),
              tx(9, "His stammer means he can hardly get a word out of, and the nation cringes with embarrassment.", ["of"]),
              tx(10, "His formidable father makes clear to him that this is a new media age. It's not just a matter of looking frightfully regal on a horse; the monarch has required to be able to master the radio microphone.", ["required"]),
              tx(11, "The rest takes place between 1934 when his wife (Helena Bonham Carter) arranges for him appointment to see Logue, the unorthodox therapist, and shortly after the beginning of the war when he makes a crucial live broadcast to the world from Buckingham Palace.", ["appointment"]),
              tx(12, "Across a great social gulf, they become friends, the king gaining confidence and humanity, deeply affected by the first commoner he's befriended.", ["v"]),
              tx(13, "Slowly, Bertie opens up to his new friend about his unhappy childhood, and doesn't notice how his speech is getting improving.", ["getting"]),
              tx(14, "Not everyone's going to like this film: some may find it excessively royalist. Because George VI's talking cure is gripping.", ["Because"]),
              tx(15, "Overall, the film is a major achievement, with Firth presenting us with a great profile in courage. He finds as many different aspects of stammering as the number of ways of photographing sand explored by Freddie Young in Lawrence of Arabia or John Seale in The English Patient. And as they did so, he deserves an Oscar.", ["so"])
            ]
          },
          {
            // Ключ — таблица на с. 11 файла ответов; варианты через «/» разнесены по accept.
            // Критерии допускают расширение ключа в этом задании, но своих вариантов сюда не добавлено.
            id: "m-u2", section: "uoe", title: "Task 2 · Key word transformations", type: "text",
            intro: "For items 1–10, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from three to five words. Please mind both grammar and spelling. Do not use contractions. There is an example at the beginning (0).",
            example: "0. The pool isn’t deep enough to swim in. — too — The pool ……………………. swim in. — is too shallow to",
            items: [
              tx(1, "There was a strong wind which caused the fire to spread quickly. — so — The fire __ __ __ ___ __ quickly but for a strong wind. (5 words).", ["would not have spread so"]),
              tx(2, "After dropping out of Harvard, he later became one of the richest men in the world. — went — After dropping out of Harvard, he __ __ __ ___ one of the richest men in the world. (4 words)", ["went on to become", "went on to be"]),
              tx(3, "I have second thoughts about buying this dress; it does not look nice on me. — regret — I __ ___ __ this dress; it does not look nice on me. (3 words)", ["regret having bought"]),
              tx(4, "People say that the company had plenty of problems last year. — said — The company ___ ____ ___ ___ ___ plenty of problems last year. (5 words)", ["is said to have had"]),
              tx(5, "I’m trying to find someone with experience of looking after children. — used — I’m trying to find someone __ ___ __ __ __ after children. (5 words)", ["who is used to looking", "that is used to looking"]),
              tx(6, "I’m afraid it will never stop snowing, it’s infuriating. — wish — I __ __ __ ___ snowing. (4 words)", ["wish it would stop"]),
              tx(7, "His finger was shot off in the war. — had — He __ __ __ __ off in the war. (4 words)", ["had his finger shot"]),
              tx(8, "Don’t worry, the pain won’t last for very long. — wear — Don’t worry, the pain __ __ __ after a while. (3 words)", ["will wear off"]),
              tx(9, "The operation made it possible for him to walk again. — able — Since the operation he __ __ __ __ __ again. (5 words)", ["has been able to walk", "has become able to walk"]),
              tx(10, "I do not think she wants us to eat in her car. — rather — I think she ___ ____ ___ ___ ___ eat in her car. (5 words)", ["would rather we did not", "would rather not let us"])
            ]
          },
          {
            id: "m-u3", section: "uoe", title: "Task 3 · The Relative Beauty of the Violin", type: "text",
            intro: "For items 1–10 read the text below. Use the word given in capitals at the end of each line to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
            example: "0. Einstein sensed the secrets of the (0) ____ in music. UNIVERSAL — universe",
            items: [
              tx(1, "One day, the story goes, Albert Einstein was playing string quartets with his friend Fritz Kreisler, the great (1) ____ violinist. VIENNA", ["Viennese"]),
              tx(2, "Einstein went wrong. \"You know, Albert,\" said Kreisler, \"your trouble is that you can't count.\" It's a tale told in a (2) ____ of permutations. VARY", ["variety"]),
              tx(3, "But what's (3) ____ is that Einstein was also, in his spare time, an eager violinist. DISPUTABLE", ["indisputable", "undisputed", "undisputable"]),
              tx(4, "\"If I were not a (4) ____, I would probably be a musician,\" he was quoted as saying. \"I often think in music. I live my daydreams in music. I see my life in terms of music... I get most joy in life out of music.\" PHYSICS", ["physicist"]),
              tx(5, "Now there's a chance to explore the link between music and physics as (5) ____ by Einstein. The violinist Jack Liebeck has teamed up with Brian Foster, Professor of Experimental Physics, for The Music of the Spheres, a lecture and recital. EXAMPLE", ["exemplified"]),
              tx(6, "Einstein used music to clear his mind while it was twisted up with all these tortuous concepts. It would help him to stand back a little from the problem and (6) ____ his thinking. CRYSTAL", ["crystallise", "crystallize"]),
              tx(7, "Playing music opens (7) ____ pathways that otherwise might not open. It makes cross-references between different areas of the brain that might not connect so readily without it. NEURON", ["neural", "neuronal", "neuronic"]),
              tx(8, "The discoverer of the theory of general (8) ____ attempted at unifying physics, to explain apparently disparate elements within the same framework. RELATIVE", ["relativity"]),
              tx(9, "Beauty was paramount in Einstein's concept of the universe - (9) ____ not least by the inner unity he found in the music of Bach and Mozart. INSPIRATION", ["inspired"]),
              tx(10, "We hear so much on the radio and TV of politicians stressing the importance of the three Rs, but it might be more (10) ____ if all kids learned to play a musical instrument. It would focus their brains in a much better way. PRODUCE", ["productive"])
            ]
          },
          {
            // Ключ — таблица на с. 14 файла ответов: F H L K M E D A J C.
            id: "m-u4", section: "uoe", title: "Task 4 · People, places and figures of speech", type: "choice", opts: PHEN, longOpts: true,
            intro: "For items 1–10, match the items 1–10 to the phenomena A–N. There are some extra phenomena which do not match.",
            items: [
              ch(1, "The Crystal Palace", ["F"]),
              ch(2, "Sir Christopher Wren", ["H"]),
              ch(3, "John Hancock", ["L"]),
              ch(4, "Poor Richard's Almanack", ["K"]),
              ch(5, "metaphor", ["M"]),
              ch(6, "The Royal Pavilion", ["E"]),
              ch(7, "metonymy", ["D"]),
              ch(8, "Harriet Beecher Stowe", ["A"]),
              ch(9, "Florence Nightingale", ["J"]),
              ch(10, "Harriet Tubman", ["C"])
            ]
          }
        ]
      },
      {
        id: "w", title: "Writing", minutes: 60, max: 20,
        tasks: [
          {
            // Критерии — из файла ответов (с. 17–19): 4 балла за решение задачи и по 4 за четыре критерия оформления.
            // Объём 200–250 слов, допустимо 180–275; от 276 слов проверяются первые 250.
            id: "m-w1", section: "writing", title: "Story · Stories Wanted", type: "writing",
            intro: "You see the following notice in an English youth magazine and decide to send your story.",
            premise: "Stories Wanted. Write a story for our magazine. The story must end with the sentence: Jim happened to see the letter and decided to book a ticket for the first train heading home.",
            outro: "Write 200-250 words (the title is included in the word count).",
            pointsLabel: "The story must include:",
            points: ["a title", "a rich relative", "a beautiful house"],
            words: { min: 200, max: 250, accMin: 180, accMax: 275 },
            needsTitle: true,
            titleInCount: true,
            criteria: [
              { id: "task", t: "Решение коммуникативной задачи", max: 4 },
              { id: "org", t: "Организация текста", max: 4 },
              { id: "lex", t: "Лексика", max: 4 },
              { id: "gram", t: "Грамматика", max: 4 },
              { id: "spell", t: "Орфография и пунктуация", max: 4 }
            ],
            note: "При 0 баллов за решение коммуникативной задачи вся работа оценивается в 0. Меньше 180 слов — 0. Если 276 слов и более, проверяются только первые 250. Название входит в число слов."
          }
        ]
      }
    ]
  });
})();
