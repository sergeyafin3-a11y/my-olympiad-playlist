// Пробник: муниципальный этап ВсОШ по английскому языку, Москва, 2022/23, 10–11 классы (учитель 06.11, к уроку 9 ноября).
// Тексты и ключи — дословно из официальных файлов архива ЦПМ: tasks-/ans-/script-engl-10-11-mun-msk-22-23.pdf,
// аудио audio-engl-10-11-mun-msk-22-23.mp3. Верные варианты в Listening и Reading Task 1 в файле ответов выделены
// жирным: сверено по отрисованным страницам. Год нарочно не использован в отработке и уроках.
// Что изменено: в бумаге у вариантов Reading Task 1 и Listening Task 2 маркеры без букв, буквы A, B, C, D — по порядку строк;
// «сomplete» в инструкции Task 2 написано с кириллической «с», заменена латинской; пропуски Reading Task 2 записаны как
// (11) ______, как в других вариантах. Task 3 разбит на 10 пунктов по абзацам: каждый заканчивается перед следующим пропуском.
// Метки аудио — по паузам записи: 28,4–48,8 «20 seconds to study»; 214–234,2 и 399,8–420 «20 seconds to check»;
// 420 — инструкция Task 2; 437,2–462,6 «25 seconds to study»; 545,6–606 минута в конце. Отсюда Task 1 — с 0, Task 2 — с 419.
(function () {
  var TF = [{ k: "A", t: "True" }, { k: "B", t: "False" }];
  function ch(n, q, a, opts) { var i = { n: n, q: q, a: a }; if (opts) i.opts = opts; return i; }
  function abc(list) { return list.map(function (t, j) { return { k: "ABCD"[j], t: t }; }); }
  function tx(n, q, accept) { return { n: n, q: q, accept: accept }; }

  window.VARIANTS = window.VARIANTS || [];
  window.VARIANTS.push({
    id: "mun-msk-22-23",
    mock: true,
    title: "Mock exam · Municipal 2022/23",
    subtitle: "All-Russian Olympiad · municipal stage · Moscow · grades 10–11",
    audio: "media/listening-mun-msk-22-23.mp3",
    source: { name: "Official task archive · Centre for Pedagogical Excellence (Moscow)", url: "https://xn--b1ayi3a.xn--l1afu.xn--p1ai/upload/files/Arhive_tasks/2022-23/mun/engl/" },
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
            id: "mock-l1", section: "listening", title: "Task 1 · The city of Bristol", type: "choice", opts: TF,
            audio: { from: 0, label: "Task 1 · radio feature (twice)" },
            intro: "For items 1–10 listen to a radio feature about the city of Bristol and decide whether the statements (1–10) are TRUE, or FALSE according to the text you hear. You will hear the text twice.",
            items: [
              ch(1, "Bristol is a seaport in the east of England.", ["B"]),
              ch(2, "Ashton Court is a park located 350 miles from the city.", ["B"]),
              ch(3, "They have been exhibiting a hundred-year bee-keeping traditions in Ashton Court.", ["A"]),
              ch(4, "The Maritime Museum contains a special collection of transport.", ["B"]),
              ch(5, "The S.S. Great Britain was built in Bristol in the first half of the 19th century.", ["A"]),
              ch(6, "Bristol zoo starts offering a brochure on special events at the beginning of spring.", ["A"]),
              ch(7, "There are plenty of places to play for young children in the zoo.", ["B"]),
              ch(8, "There is only one restaurant in the zoo.", ["A"]),
              ch(9, "Visitors can only observe the exhibits in the Exploratory.", ["B"]),
              ch(10, "There’s a shop full of amazing books, such as Bubble Magic and Fire and Flames in the Exploratory.", ["B"])
            ]
          },
          {
            id: "mock-l2", section: "listening", title: "Task 2 · Ann and Bob", type: "choice",
            audio: { from: 419, label: "Task 2 · dialogue (once)" },
            intro: "For items 11–15 listen to the dialogue. Choose the correct answer to answer questions 11–15. You will hear the text only once.",
            items: [
              ch(11, "Ann says that the big thing in the next 50 years will be", ["B"], abc(["computers.", "gene mapping.", "mobile phones."])),
              ch(12, "Bob thinks there are", ["C"], abc(["35,000 genes.", "90,000 genes.", "millions of genes."])),
              ch(13, "When he learned that only 3% of our DNA is genes, Bob felt", ["A"], abc(["surprised.", "confused.", "pessimistic."])),
              ch(14, "Ann says that 70 % of human DNA is", ["C"], abc(["junk.", "important stuff.", "the same as a worm’s."])),
              ch(15, "Bill Haseltine does NOT", ["B"], abc(["run a bio-tech company.", "say we should continue gene mapping.", "say we should start designing genetic medicines."]))
            ]
          }
        ]
      },
      {
        id: "r", title: "Reading", minutes: 45, max: 20,
        tasks: [
          {
            id: "mock-r1", section: "reading", title: "Task 1 · The Lost Gardens of Heligan", type: "choice",
            intro: "For items 1–10, read the passage below and choose the option which best fits according to the text.",
            textTitle: "Rediscovery of the Lost Gardens of Heligan",
            text: [
              "The Lost Gardens of Heligan are some of the most mysterious and popular in Great Britain. Coming from the Cornish ‘Lowarth Helygen’, meaning ‘willow tree garden’, the gardens are located near the village of Mevagissey in Cornwall.",
              "Heligan was the family seat of the Tremayne family for over 400 years. They purchased it from the Hill family in the 16th century and built a new manor house here in 1603. The superb gardens surrounding the house were begun by Henry Hawkins Tremayne in the late 18th century when he called in Thomas Gray to create a garden plan around 1780. Tremayne planted trees to screen the grounds and laid out the northern gardens and the rose garden.",
              "Henry Hawkins Tremayne's descendants made significant contributions to the development of the gardens. For instance, John Tremayne (squire 1829-1851) was responsible for the creation of the long drive, which comes up from the coastal village, in order to make it easy for horses to haul loads of coal up the hill. Rather than make the drive purely functional, the squire planted ornamental trees and an impressive avenue of Cornus capitate trees. John Tremayne was also responsible for the exotic plantings in The Jungle, a steep-sided valley where apple and pear trees grow together with foreign palms, bamboos and tree ferns.",
              "Unfortunately, the year of 1914 ended this idyll. The estate’s workforce of over twenty gardeners marched off to the battlefields of France and Flanders – many never returning. The last resident was Jack Tremayne, who built the Italian garden, but then relocated to Italy, and leased the house. In 1916 the house was formally taken over by the War Department to use it as a convalescence home for officers. Later on, Heligan was used as an army base in WWII, and the house was then converted into flats and sold. Against this background, the gardens were neglected and quite literally became overgrown. For over 70 years, they slumbered on and were covered by an overgrowth of brambles, weeds and dense foliage. This is why Heligan is so valuable. There are very few examples of gardens, which haven’t been “modernized” since Victorian times, and Heligan provides a unique time capsule.",
              "In 1987 a Dutch-born archaeologist and musician Sir Tim Smit moved with his family to a farmhouse near Mevagissey, where the locals were full of tales of treasures buried in the tropical valley connecting it with Heligan. He was intrigued. At the same time, he had inherited some rare-breed pigs and hatched the idea of a rare-breeds farm. While searching for a location he met John Willis, a member of the Tremayne family who had inherited the Heligan estate land. John invited Tim to join him in exploring the new inheritance. So began a quest that would change Tim’s life and wrest these mysterious gardens back from obscurity.",
              "A feature about the restoration ran on BBC 2 that autumn and put the project on the national map and finally, on a rain-drenched Good Friday in 1992, Heligan was officially opened to the public, despite still being a building site with no proper café.",
              "Today the gardens of Heligan returned to their former beauty. As in the 18th century, there is the Jungle with lush subtropical vegetation, the Lost valley with centuries-old hornbeams and beeches, the Northern garden with fruit trees, vegetable beds and Alpine slides. Heligan is real gardening inspiration, growing over 300 varieties of heritage fruit and vegetables within its productive gardens that would have been grown before 1910. There is a nice restaurant called Lost Suppers, which showcases Heligan’s fruit and vegetables, pasture-raised Red Ruby beef and just-picked broad beans."
            ],
            items: [
              ch(1, "The original gardens of Heligan", ["C"], abc(["had always been part of the estate.", "were started to match the newly built house.", "were planted to protect the land.", "helped embellish the manor house."])),
              ch(2, "John Tremayne’s addition to the estate was", ["B"], abc(["merely practical.", "useful and decorative.", "showy and boastful.", "simply utilitarian."])),
              ch(3, "What is NOT TRUE about old Heligan gardens?", ["D"], abc(["The gardens’ name was connected with some trees.", "The gardens were planted by generations of one family.", "The gardens had exotic and native plants next to each other.", "The gardens’ owners did not divide them into different thematic sections."])),
              ch(4, "When Jack Tremayne left the country for Italy he", ["A"], abc(["let out just the residential part of the estate.", "sold the main house and the gardens.", "donated the land to the country.", "let the house to the American army."])),
              ch(5, "The heyday of Heligan estate and its gardens was over", ["D"], abc(["as the family migrated to a different country.", "since all the gardeners left for good.", "due to an unwise decision of its owner.", "because of an armed conflict in Europe."])),
              ch(6, "Heligan gardens virtually disappeared because", ["A"], abc(["dense vegetation hid them from sight.", "flats for officers were built on their site.", "they were kept as a secret military base.", "the government took over the land."])),
              ch(7, "The negligence of the gardens", ["C"], abc(["facilitated their decay and complete loss.", "led to the appearance of a new type of garden.", "helped preserve the land untouched and intact.", "made them grow and expand greatly."])),
              ch(8, "Tim Smit’s initial aim in Mevagissey was", ["D"], abc(["to find the legendary Heligan gardens.", "to interview the locals about the lost gardens.", "to get acquainted with a Tremayne family member.", "to establish a business for rearing animals."])),
              ch(9, "The onsite restaurant offers its visitors", ["B"], abc(["fancy and exotic dishes.", "local produce dishes.", "royal’s favourite dishes.", "affordable meat dishes."])),
              ch(10, "The gardens of Heligan now", ["A"], abc(["very much resemble the old gardens in their heyday.", "are very much different from the gardens in the past.", "have expanded greatly including new lands.", "present a modern pattern of garden planning."]))
            ]
          },
          {
            id: "mock-r2", section: "reading", title: "Task 2 · A trip to Brisbane", type: "choice", longOpts: true,
            // Ключ — с. 6–7 файла ответов: F B K G D A J E I C; лишнее предложение — H.
            intro: "For items 11–20, read the passage below and choose which of the sentences A–K fit into the numbered gaps in the text. There is one extra sentence which does not fit in any of the gaps.",
            textTitle: "Text for items 11–20",
            opts: [
              { k: "A", t: "Time for the tea or coffee and, of course, people-watching." },
              { k: "B", t: "My routine revolved around my neighbourhood, my dogs, my immediate family, my kitchen and my desk." },
              { k: "C", t: "So much so that, on the return flight last Sunday, I became that person who takes photographs of the harbour and the river from the plane window." },
              { k: "D", t: "At that time I remember feeling melancholic, other times excited, and sometimes afraid of the unknown upon arrival." },
              { k: "E", t: "With aircraft in the background, they were lighting up the place with their infectious happiness." },
              { k: "F", t: "The restaurant meal, the plane ride, the hotel stay, the social occasion all now come with a joy that previously was a pretty common thing." },
              { k: "G", t: "But it did happen, and a week ago it was finally my first flight in more than two years." },
              { k: "H", t: "These used to be 'special', things to enjoy and appreciate even once in a lifetime. When things become normal and routine they lose their magic." },
              { k: "I", t: "But when the plane took off I was so excited, thrilling in that moment of weightlessness as the wheels departed Earth." },
              { k: "J", t: "Between alternate gentle laughter, frowns and shakes of their heads, they wrote furiously on the laptop and into Moleskine notebooks." },
              { k: "K", t: "The other thing about pandemic life was that it was almost impossible to plan anything beforehand." }
            ],
            text: [
              "I’ve never imagined that a simple trip to another state could be so exciting. However, when your world shrinks the way it has since the pandemic hit, the most prosaic experience acquires new meaning. Don’t you agree? (11) ______.",
              "During lockdowns, I managed to quickly get used to and accept the shrunken pandemic world. (12) ______. Mundanity has its own rhythm, of course, and one thing I learned about myself during lockdown was how very comfortable I’d become in recent years with a minimal external life. (13) ______. For that reason when, some weeks ago, we booked a flight to Brisbane, I never actually expected it to happen. (14) ______. There was the airport, its noise and announcements, its air filled with new expectations. They were part of my life since I was in my mid-20s (that’s a long time); always departing and arriving, often weekly. (15) ______.",
              "Now, at the airport I realized I’d forgotten how it felt to be amid that mad bustle of people coming and going. Obligations. Reunions. Goodbyes. I checked in and made for a nice café in the corner of the departure hall. (16) ______.",
              "The ladies with the New Yorker tote-bags. (17) ______. Play? Short story? Novel?",
              "That group of young men and women laughing and posing for photographs by the expansive windows. (18) ______.",
              "Honestly, I’ve never exactly been a chilled flyer. (19) ______. I leaned towards the window to watch everything below miniaturise. I felt seven years old again.",
              "Brisbane was absolutely wonderful with its Riverwalk, the Arts Centre, Marine Park, and laid-back atmosphere. That’s what happens when everything old is new again. (20) ______."
            ],
            items: [
              ch(11, "Gap (11)", ["F"]), ch(12, "Gap (12)", ["B"]), ch(13, "Gap (13)", ["K"]), ch(14, "Gap (14)", ["G"]), ch(15, "Gap (15)", ["D"]),
              ch(16, "Gap (16)", ["A"]), ch(17, "Gap (17)", ["J"]), ch(18, "Gap (18)", ["E"]), ch(19, "Gap (19)", ["I"]), ch(20, "Gap (20)", ["C"])
            ]
          }
        ]
      },
      {
        id: "u", title: "Use of English", minutes: 60, max: 45,
        tasks: [
          {
            // Ответ «V» — строка верна. Сравнение без учёта регистра.
            id: "mock-u1", section: "uoe", title: "Task 1 · Leonardo da Vinci: extra words", type: "text",
            intro: "For Questions 1–15, read the text below and look carefully at each line. Some of the lines are correct, and some have a word which should not be there. If a line is correct put a tick. Use letter \"V\" as a tick. If a line has a word which should not be there, write the word in a given space. There are two examples at the beginning (0 and 00).",
            examples: [
              { label: "0", show: "Leonardo da Vinci’s works of art made him world-famous. But there was by far more to this great man of ideas than just the Mona Lisa’s pretty face.", strike: "by", near: "was by far", answer: "by" },
              { label: "00", show: "Leonardo is often thought of primarily as an artist, and with masterpieces such as The Last Supper and the Mona Lisa to his credit, his place in art history is assured.", correct: true }
            ],
            items: [
              tx(1, "Yet his notebooks, having filled with his strange spidery writing, show that his main interests lay elsewhere - in engineering and technology. The notebooks are full of drawings and designs for all kinds of inventions - from calculating machines to tanks, from parachutes to helicopters.", ["having"]),
              tx(2, "If his pioneering work on anatomy is also taken into consideration, it is not hard to see why Leonardo is considered to be one of the greatest geniuses of all time.", ["v"]),
              tx(3, "Born in 1452 to a Florentine lawyer and a local village girl, Leonardo was given if only a rudimentary education. After ten years in the workshop of the artist Verrocchio, he set up as a freelance artist.", ["if"]),
              tx(4, "Some of the work he did still does survives, and reveals a stunning combination of technical skills with very careful observation. It also reveals an emerging fascination with technology, with technical drawings of equipment of all kinds.", ["does"]),
              tx(5, "Leonardo was particularly fascinated by the technology of a warfare. At this time, Florence was at war with the Pope, and Leonardo realised that this was an opportunity to make some serious money with his new inventions for better guns and other military equipment.", ["a"]),
              tx(6, "However, the war ended before anything could be come of his plans and he returned to his painting.", ["be"]),
              tx(7, "But Leonardo had had enough of life in Florence, especially the intellectual elite whom he blamed for his relative lack of employment. He began to feel he would be more appreciated elsewhere.", ["v"]),
              tx(8, "At the age of thirty, he left his home town and eventually moved to Milan, where he had spent seventeen years under the patronage of Ludovico Sforza, the Duke of Milan.", ["had"]),
              tx(9, "Here he continued to combine up his scientific and technological work with his painting, which was increasingly influenced by his interest in the mathematics of perspective and proportion.", ["up"]),
              tx(10, "During this period, he was painted The Last Supper and developed his ideas for chemical weapons and flame-throwers.", ["was"]),
              tx(11, "When Sforza was being driven from power by the French, Leonardo returned to Florence and spent four years working for Cesare Borgia as an engineer and military architect. He now became fascinated with flight.", ["being"]),
              tx(12, "He studied birds for clues about how to fly and drew sketches of machines resembling like helicopters.", ["like"]),
              tx(13, "In 1506 he returned to Milan and became increasingly focused on science. He began to conduct dozens of human dissections and studied the circulation of the blood. He also drew up a comprehensive guide to the working of living creatures.", ["v"]),
              tx(14, "He ended his life at Amboise in France, where he was welcomed by the King. He continued to do the occasional sketch, a few designs and plans for buildings, but most of his time was hardly devoted to sorting out his scientific papers.", ["hardly"]),
              tx(15, "Only twenty-one of his dozens of notebooks survive. Just seventeen paintings have been ascribed to him with certainty, and some of those are unfinished. Leonardo may not have been achieved the perfection that he aspired to but he came closer to it in more fields than anyone before or since.", ["been"])
            ]
          },
          {
            id: "mock-u2", section: "uoe", title: "Task 2 · Key word transformations", type: "text",
            intro: "For items 1–10, complete the second sentence so that it has a similar meaning to the first sentence, using the word given. Do not change the word given. Use from three to five words. The number of words is specified in the brackets. Do not use short forms. Please mind both grammar and spelling. There is an example at the beginning (0).",
            example: "0. The pool isn’t deep enough to swim in. — too — The pool ……………………. swim in. (4 words) — is too shallow to",
            items: [
              tx(1, "She wanted to travel incognito, so she wore a wig and sunglasses. — avoid — She wore a wig and sunglasses ____ _____ _____ ___ during the trip. (4 words)", ["to avoid being recognised", "to avoid being recognized"]),
              tx(2, "Her hair is so long that it takes her ages to dry it. — such — She has ___ ___ ____ ____ it takes her ages to dry it. (4 words)", ["such long hair that"]),
              tx(3, "If I finish my homework early, I’ll go to the party. — unless — I won’t go to the party _____ _____ ______ my homework early. (3 words)", ["unless I finish"]),
              tx(4, "You should have enough time to finish if you work hard. — sufficient — You should have ____ _____ ____ ____ ____ to finish if you work hard. (5 words)", ["a sufficient amount of time"]),
              tx(5, "There were plenty of people on the ship. — few — There were _____ ___ ____ _____ on the ship. (4 words)", ["quite a few people"]),
              tx(6, "I’ve already heard too much of your nonsense. — more — I’ve already heard ____ ____ _____ _____ your nonsense. (4 words)", ["more than enough of"]),
              tx(7, "It is certain that he will get in trouble with the police. — bound — He ___ _____ ____ ___ in trouble with the police (4 words)", ["is bound to get"]),
              tx(8, "I’m sure they did it on purpose. — must — They ____ ____ ____ it on purpose. (3 words)", ["must have done"]),
              tx(9, "People say that Amina has taken the children to the south of Spain. — have — Amina ____ _____ ____ _____ _____ the children to the south of Spain. (5 words)", ["is said to have taken"]),
              tx(10, "Suzy had the accident four hours after she started driving. — for — Suzy ___ ____ ____ ____ four hours when she had the accident. (4 words)", ["had been driving for"])
            ]
          },
          {
            id: "mock-u3", section: "uoe", title: "Task 3 · Word formation", type: "text",
            intro: "For items 1–10 read the text below. Use the word given in brackets to form a new word that fits in the space in the same line. There is an example at the beginning (0).",
            example: "0. (0) ____ (NATURAL), parents want their children to go to a good school so that they get a good start in life. — Naturally",
            items: [
              tx(1, "If they are rich enough, they can send them to an independent school, with fewer pupils per class and (1) ____ (EXCEL) exam results, so that they have the best possible chance of getting into a good university.", ["excellent"]),
              tx(2, "However, if you were a rich parent in Britain today, this might be a mistake. Instead, you should send your child to a state school in a (2) ____ (ADVANTAGE) area with poor exam results. Meanwhile, use your money to hire effective tutors. Why is this?", ["disadvantaged"]),
              tx(3, "In Britain, it is agreed that the opportunity of a university education should be equally (3) ____ (ACCESS) to all. But there are only enough university places for a minority of school leavers.", ["accessible"]),
              tx(4, "And most of these go to kids from middle-class backgrounds, many from independent schools. For some time, universities have been (4) ____ (COURAGE) applications from poor sections of society.", ["encouraging"]),
              tx(5, "But now they have an extra reason for doing this. If they accept enough students from state schools in poor areas, the government gives them more money. So now many universities accept these (5) ____ (APPLY) even with lower exam results.", ["applicants", "applications"]),
              tx(6, "To some extent, this positive (6) ____ (DISCRIMINATE) is logical.", ["discrimination"]),
              tx(7, "It is reasonable to use not only achievement but also potential as a criterion for (7) ____ (SELECT).", ["selection"]),
              tx(8, "On the other hand, if social background becomes more important than academic performance, it makes a (8) ____ (MOCK) of academic standards. In addition, the effect on rejected young people should be considered.", ["mockery"]),
              tx(9, "It is more psychologically damaging to be told ‘you do not have enough potential’ than to be told ‘you did not perform well in that exam’. Moreover, the absurd (9) ____ (PARENT) strategy outlined above might become widespread.", ["parental"]),
              tx(10, "This would give an even greater advantage to rich kids whose parents can afford (10) ____ (PRIVACY) tuition.", ["private"])
            ]
          },
          {
            // Ключ — с. 12–13 файла ответов: J E K A H M L F G B; лишние — C, D, I, N.
            id: "mock-u4", section: "uoe", title: "Task 4 · Match the two columns", type: "choice", longOpts: true,
            intro: "Match the two columns. There are some extra phenomena which do not match.",
            opts: [
              { k: "A", t: "The arts festival that presents a variety of plays, performances, and exhibitions for three weeks every August, held in Edinburgh" },
              { k: "B", t: "A saying of B. Franklin in Poor Richard’s Almanack" },
              { k: "C", t: "An annual summer event that takes place in Ireland when there are many performances of plays and music, and other forms of entertainment" },
              { k: "D", t: "People who can’t concentrate on their work because they wish it was time to stop" },
              { k: "E", t: "People who are very interested in the hobbies that most people think boring or not fashionable such as trainspotters or bird watchers" },
              { k: "F", t: "The saying that comes from a poem by R. Kipling" },
              { k: "G", t: "Getting money from the state because you are unemployed (colloquial)" },
              { k: "H", t: "Someone who talks or behaves in a way that is typical of people from a high social class. This word often shows that you do not like people like this." },
              { k: "I", t: "The art museums that house the national collection of British art from the 16th century and the national collection of modern art, resulted from the benefaction of a sugar tycoon, who gave both the building and his art collection to the nation" },
              { k: "J", t: "The research institution founded by the bequest of an English scientist. The scientist had stipulated in his will that should his nephew and heir himself die childless, his remaining assets would pass to the United States and be used to found this museum complex." },
              { k: "K", t: "It’s one of the most popular Irish tourist sites, attracting visitors from around the world who wish to tour the castle and kiss the stone. According to legend, kissing the stone endows the kisser with the gift of eloquence." },
              { k: "L", t: "The money which a person borrows to purchase a house" },
              { k: "M", t: "One of the four museums of the University of Oxford and the oldest public museum of art, archaeology, and natural history in Great Britain. It was established to house collections donated to the university by an antiquarian." },
              { k: "N", t: "The castle’s most famous feature is the Stone of Destiny as a powerful and ancient symbol of Scottish monarchy, witnessing the coronation of its kings for hundreds of years." }
            ],
            items: [
              ch(1, "The Smithsonian Institution", ["J"]),
              ch(2, "Anoraks", ["E"]),
              ch(3, "The Blarney Stone", ["K"]),
              ch(4, "The Fringe", ["A"]),
              ch(5, "Posh", ["H"]),
              ch(6, "The Ashmolean Museum", ["M"]),
              ch(7, "Mortgage", ["L"]),
              ch(8, "East is East, and West is West, and never the twain shall meet.", ["F"]),
              ch(9, "To be on the dole", ["G"]),
              ch(10, "Early to bed and early to rise makes a man healthy, wealthy and wise.", ["B"])
            ]
          }
        ]
      },
      {
        id: "w", title: "Writing", minutes: 60, max: 20,
        tasks: [
          {
            // Критерии — из файла ответов (с. 14 и дальше): 5 критериев по 4 балла. Объём 200–250 слов, допустимо 180–275;
            // от 276 слов проверяются первые 250. Название в эссе не требуется, поэтому поля для него нет.
            id: "mock-w1", section: "writing", title: "Essay · A journey of a thousand miles", type: "writing",
            intro: "Comment on the following quotation.",
            premise: "A journey of a thousand miles begins with a single step. — Lao Tzu",
            outro: "Write 200–250 words.",
            pointsLabel: "Use the following plan:",
            points: [
              "make an introduction, explaining how you understand the author’s point of view;",
              "express your personal opinion and give reasons to support it;",
              "give examples from literature or history to illustrate your reasons;",
              "make a conclusion restating your position."
            ],
            words: { min: 200, max: 250, accMin: 180, accMax: 275 },
            criteria: [
              { id: "task", t: "Task completion", max: 4 },
              { id: "org", t: "Organisation of the text", max: 4 },
              { id: "lex", t: "Vocabulary", max: 4 },
              { id: "gram", t: "Grammar", max: 4 },
              { id: "spell", t: "Spelling and punctuation", max: 4 }
            ],
            note: "If Task completion gets 0 points, the whole work gets 0. Fewer than 180 words = 0 points. If there are 276 words or more, only the first 250 words are checked."
          }
        ]
      }
    ]
  });
})();
