// Заключительный этап ВсОШ по английскому языку, 2025/26 (весна 2026), 9–11 классы.
// Тексты заданий и ключи перенесены дословно из официальных файлов архива ЦПМ:
// tasks-/ans-/script-engl-9-11-pism-final-25-26.pdf, tasks-/krit-engl-9-11-ustn-final-25-26.pdf.
// Метки аудио (секунды) найдены по паузам записи и сверены со скриптом:
// Task 1 — с начала, Task 2 — после «20 seconds to check», Task 3 — после минутной паузы.
(function () {
  var TF = [{ k: "A", t: "True" }, { k: "B", t: "False" }];
  var ABCD_INT = [
    { k: "A", t: "in both materials" },
    { k: "B", t: "only in the reading text" },
    { k: "C", t: "only in the audio-recording" },
    { k: "D", t: "in neither of the materials" }
  ];
  var TFNG = [{ k: "A", t: "True" }, { k: "B", t: "False" }, { k: "C", t: "Not given" }];
  var IDIOMS = [
    { k: "A", t: "playing to the gallery" }, { k: "B", t: "hammed it up" },
    { k: "C", t: "class clown" }, { k: "D", t: "curtain" },
    { k: "E", t: "bringing the house down" }, { k: "F", t: "getting into the groove" },
    { k: "G", t: "stole the show" }, { k: "H", t: "to upstage him" },
    { k: "I", t: "breaks a leg" }, { k: "J", t: "singing a different tune" },
    { k: "K", t: "in the limelight" }, { k: "L", t: "rolling in the aisles" },
    { k: "M", t: "mastered the show" }, { k: "N", t: "waiting in the wings" },
    { k: "O", t: "on the edge of your seat" }, { k: "P", t: "a dog and pony show" }
  ];
  var GROUPS = [
    { k: "A", t: "Despite their brief existence, their impact was enduring. Unlike traditional art’s grand narratives, they focused on everyday life’s rhythm. They depicted ordinary people, domestic interiors, and bustling streets, highlighting the often overlooked beauty in the commonplace." },
    { k: "B", t: "John Osborne, Kingsley Amis, Harold Pinter" },
    { k: "C", t: "Southerners used the term to accuse the Northerners, who moved to the South during the Reconstruction era, of exploiting the newly enfranchised Black population for personal or political gain." },
    { k: "D", t: "a strong group fighting for harsh penalties on the South after the Civil War. They opposed President Lincoln's mild plans with their own stricter Wade-Davis Bill for the South. They battled President Johnson, often beating his vetoes and seeking his impeachment." },
    { k: "E", t: "The supporters of the House of Stuart during the Civil War of 1642-1652. They supported the \"divine right of kings,\" King Charles I of England's prerogatives and absolutist tendencies." },
    { k: "F", t: "John Adams, Thomas Jefferson, James Madison, James Monroe" },
    { k: "G", t: "William Wordsworth, Samuel Taylor Coleridge, Robert Southey" },
    { k: "H", t: "The rigid rules of classical art and the social unrest emerging due to widespread industrialization created the conditions for this rebellious group to express their discontentment. They believed in recreating the techniques and ideas of Renaissance and Medieval art and questioned the principles of classical Victorian art." },
    { k: "I", t: "From their own perspective in 1775, they were the honorable ones who stood by the Crown and the British Empire. However, once independence was declared in 1776, those who continued to support the Crown were treated by the Patriots as traitors who turned against their fellow citizens and collaborated with a foreign army." },
    { k: "J", t: "The first units were organized in Massachusetts, in September 1774. One-third of the members of each regiment were to be ready to assemble under arms at instant call. Their first great test was at the Battles of Lexington and Concord, 1775. Later the Continental Congress recommended that other colonies organize such units." },
    { k: "K", t: "Andrew Jackson, Abraham Lincoln, Ulysses S. Grant, James Garfield" },
    { k: "L", t: "It was founded in 1866 and quickly became a violent group against Black people. It was notorious for its violent attacks on Black communities and civil rights activists. It will be remembered as an instrument of cowardly Southern politicians who hid their faces behind hoods, and their ideology behind an unconvincing facade of patriotism." }
  ];

  function ch(n, q, a, opts) { var i = { n: n, q: q, a: a }; if (opts) i.opts = opts; return i; }
  function abc(list) { return list.map(function (t, j) { return { k: "ABCD"[j], t: t }; }); }

  window.VARIANT = {
    id: "final-2025-26",
    title: "Final 2025/26",
    subtitle: "Всероссийская олимпиада · заключительный этап · 9–11",
    audio: "media/listening-final-25-26.mp3",
    source: { name: "Архив заданий ВсОШ · Центр педагогического мастерства", url: "https://xn--b1ayi3a.xn--l1afu.xn--p1ai/upload/files/Arhive_tasks/2025-26/final/engl/" },
    sections: [
      { id: "listening", title: "Listening", color: "#5B7CFF", icon: "🎧" },
      { id: "reading", title: "Reading", color: "#FF5C39", icon: "📖" },
      { id: "uoe", title: "Use of English", color: "#FFC93D", icon: "🧩" },
      { id: "writing", title: "Writing", color: "#3DDC97", icon: "✍️" },
      { id: "speaking", title: "Speaking", color: "#C77DFF", icon: "🎤" }
    ],
    parts: [
      {
        id: "lr", title: "Listening and Reading", minutes: 90, max: 40,
        tasks: [
          {
            id: "lr-1", section: "listening", title: "Task 1 · Russia’s national anthem", type: "choice", opts: TF,
            audio: { from: 0, label: "Task 1 · talk (twice)" },
            intro: "For items 1-10 listen to a talk about Russia’s national anthem. Decide whether the statements (1-10) are TRUE (A), or FALSE (B) according to the text you hear. You will hear the text TWICE.",
            items: [
              ch(1, "Only those who know the Russian language can feel the power of the Russian anthem.", ["B"]),
              ch(2, "Russia’s first national song was officially adopted at the beginning of the 18th century.", ["B"]),
              ch(3, "“God, Save The Tsar!” was written to the melody of Britain’s “God, Save The King.”", ["B"]),
              ch(4, "The beginning of 1917 brought a revolutionary change into the national songs.", ["A"]),
              ch(5, "“La Marseillaise” served as a Russian anthem from 1917 to 1922.", ["B"]),
              ch(6, "“The Internationale” had no reference to Russia or the Soviet Union.", ["A"]),
              ch(7, "Stalin changed the Soviet anthem to calm down his Western partners.", ["A"]),
              ch(8, "After the collapse of the Soviet Union, Russia used the lyrics for the anthem written by Mikhail Glinka.", ["B"]),
              ch(9, "The new version of the anthem proposed in 2000 was not fully supported by the nation.", ["A"]),
              ch(10, "Nowadays, the Russian anthem has no references to the Soviet symbolism.", ["B"])
            ]
          },
          {
            id: "lr-2", section: "listening", title: "Task 2 · In the line for concert tickets", type: "choice",
            audio: { from: 622, label: "Task 2 · conversation (once)" },
            intro: "For items 11-15 listen to a conversation between two friends standing in the line to buy concert tickets and answer the questions. Choose the correct answer (A, B or C) to answer questions 11-15. You will hear the text only ONCE.",
            items: [
              ch(11, "At the beginning of the conversation, Alice DOESN’T", ["C"], abc(["sound pessimistic.", "blame Gerard.", "feel satisfied."])),
              ch(12, "Gerard offers Alice to", ["A"], abc(["have a rest.", "go home.", "queue-jump."])),
              ch(13, "Gerard’s offer makes Alice", ["C"], abc(["defeatist.", "optimistic", "annoyed."])),
              ch(14, "Gerard wishes they", ["B"], abc(["had eaten out at the restaurant.", "were not quarrelling.", "had gone to the cinema."])),
              ch(15, "At the end of the conversation, Gerard", ["A"], abc(["sounds optimistic.", "drives back home.", "wants a short rest."]))
            ]
          },
          {
            id: "lr-3", section: "listening", title: "Task 3 · Integrated listening and reading", type: "choice", opts: ABCD_INT,
            audio: { from: 864, label: "Task 3 · interview (twice)", skip: { at: 973, label: "straight to the interview" } },
            readMinutes: 10,
            intro: "Read an excerpt from the essay by James Marriott, a writer at The Times, then listen to an interview with him. You will notice that some ideas coincide and some differ in the text and the interview. Answer questions 16-25 by choosing A if the idea is expressed in both materials, B if it can be found only in the reading text, C if it can be found only in the audio-recording, and D if neither of the materials expresses the idea.",
            textTitle: "The dawn of the post-literate society",
            textSubtitle: "And the end of civilisation",
            text: [
              "Now, more than three hundred years after the reading revolution ushered in a new era of human knowledge, books are dying. Numerous studies show that reading is in free-fall. Even the most pessimistic twentieth-century critics of the screen-age would have struggled to predict the scale of the present crisis. In the UK, a third of adults say they have given up reading at all and prefer listening to podcasts. The National Literacy Trust reports “shocking and dispiriting” falls in children’s reading for pleasure, which is now at its lowest level on record. The publishing industry is in crisis: as the author Alexander Larman writes, “books that once would have sold in the tens, even hundreds, of thousands are now lucky to sell in the mid-four figures.” Most remarkably, in late 2024 the Organisation for Economic Co-operation and Development published a report which found that literacy levels were declining in most developed countries. Once upon a time a social scientist confronted with statistics like these might have guessed the cause was a societal crisis like a war or the collapse of the education system.",
              "What happened was the smartphone, which was widely adopted in developed countries in the mid-2010s. Those years will be remembered as a watershed in human history. Never before has there been a technology like the smartphone. Where previous entertainment technologies like cinema or television were intended to capture their audience’s attention for a period, the smartphone demands your entire life. Phones are designed to be hyper-addictive, hooking users on a diet of pointless notifications, inane short-form videos and social media rage bait.",
              "If the reading revolution represented the greatest transfer of knowledge to ordinary men and women in history, the screen revolution represents the greatest theft of knowledge from ordinary people in history.",
              "Our universities are at the front line of this crisis. They are now teaching their first truly “post-literate” cohorts of students, who have grown up almost entirely in the world of short-form video, computer games, addictive algorithms (and, increasingly, AI).",
              "Because ubiquitous mobile internet has destroyed these students’ attention spans and restricted the growth of their vocabularies, the rich and detailed knowledge stored in books is becoming inaccessible to many of them. A study of English literature students at American universities found that they were unable to understand the first paragraph of Charles Dickens’s novel Bleak House — a book that was once regularly read by children.",
              "The transmission of knowledge — the most ancient function of the university — is breaking down in front of our eyes. Writers like Shakespeare, Milton and Jane Austen whose works have been handed on for centuries can no longer reach the next generation of readers. They are losing the ability to understand them.",
              "The collapse of reading is driving declines in various measures of cognitive ability. Reading is associated with a number of cognitive benefits including improved memory and attention span, better analytical thinking, improved verbal fluency, and lower rates of cognitive decline in later life."
            ],
            afterText: "Now listen to an interview with James Marriott and then do the tasks (questions 16-25), comparing the text above and the interview. You will hear the interview TWICE.",
            items: [
              ch(16, "Extensive research indicates that reading is rapidly losing its value.", ["A"]),
              ch(17, "A third of adults in Great Britain do not read for pleasure anymore.", ["A", "C"]),
              ch(18, "Children’s unassigned reading is at an all time low.", ["A", "B"]),
              ch(19, "People in rich countries are losing ability to read and write.", ["A"]),
              ch(20, "The main reason for the literacy crisis is the collapse of the education system.", ["D"]),
              ch(21, "Smartphone has caused a revolutionary societal change.", ["A"]),
              ch(22, "James ardently considers his essay to be his most important piece.", ["D"]),
              ch(23, "James’s mobile phone doesn’t have a habit-forming effect on him.", ["C"]),
              ch(24, "The omnipresent world wide web has disastrous consequences for students.", ["B"]),
              ch(25, "Reading has multiple benefits for human feelings.", ["D"])
            ]
          },
          {
            id: "lr-4a", section: "reading", title: "Task 4 · Word formation (26–30)", type: "text",
            intro: "Read the text and answer questions 26-40 below. In some of the paragraphs a word is missing. These words in a DIFFERENT WORD FORM are listed below: false, muse, settle, shift, plausible. DERIVE NEW WORDS from the given words to fill in the gaps 26-30. Use the words in the appropriate grammar form.",
            wordBank: ["false", "muse", "settle", "shift", "plausible"],
            textRef: "lies",
            items: [
              { n: 26, q: "Perhaps with anger, (26) … or contempt", accept: ["bemusement", "amusement"] },
              { n: 27, q: "In popular imagination, liars look (27) … , they fidget, cough or avoid eye contact.", accept: ["shifty"] },
              { n: 28, q: "she had set us against each other through an elaborate web of (28) … .", accept: ["falsehood", "falsehoods", "falsity", "falsities", "falsification", "falsifications"] },
              { n: 29, q: "despite growing (29) … of her actions.", accept: ["implausibility"] },
              { n: 30, q: "Second, there is the (30) … and disconcerting knowledge that even good people struggle to detect lies.", accept: ["unsettling"] }
            ]
          },
          {
            id: "lr-4b", section: "reading", title: "Task 4 · True, false or not given (31–35)", type: "choice", opts: TFNG,
            textRef: "lies",
            intro: "Are the statements 31-35 true, false or not given? If a statement is true, circle A on your answer sheet. If it is false, circle B on your answer sheet. If it is not given, circle C on your answer sheet.",
            items: [
              ch(31, "The author believes most people are inherently untrustworthy.", ["B"]),
              ch(32, "Being misled can weaken trust in one’s own decision-making abilities.", ["A"]),
              ch(33, "The author thinks that treating everyone with suspicion is an effective long-term strategy.", ["B"]),
              ch(34, "The author turned for professional help to expose Julia’s lies.", ["C"]),
              ch(35, "Suspicions about a person’s honesty should be openly communicated.", ["C"])
            ]
          },
          {
            id: "lr-4c", section: "reading", title: "Task 4 · Multiple choice (36–40)", type: "choice",
            textRef: "lies",
            intro: "For questions 36-40 choose one answer A, B, C or D which best fits according to the text.",
            items: [
              ch(36, "What expectation about everyday interaction does the author suggest most people naturally hold?", ["B"], abc(["Speakers usually manipulate information for personal gain.", "Exchanges are generally sincere unless proven otherwise.", "We tend to overreact to the lies we’ve been told.", "People carefully verify what they hear from others."])),
              ch(37, "What does the research indicate about humans’ capacity to recognize deception?", ["C"], abc(["People can reliably identify lies if they are deliberate.", "Judging truthfulness is highly dependent on prior experience.", "Accuracy in detecting untruths slightly exceeds random guessing.", "Ability to detect deception is straightforward but context-dependent."])),
              ch(38, "What strategy did Julia use that undermined the narrator’s confidence?", ["D"], abc(["She frequently contradicted herself in conversations.", "She gradually isolated the narrator from all social contacts.", "She used overt threats to control decision-making.", "She manipulated the narrator’s memory and perception of events."])),
              ch(39, "Which factors can create undeserved trust in a manipulator or liar?", ["A"], abc(["The audience’s unconscious expectations and preconceptions.", "The logical consistency of their false statements.", "The level of evidence they present to support their claims.", "The rarity or unusualness of their statements."])),
              ch(40, "Why are personal accounts from close contacts rarely questioned?", ["D"], abc(["Gossip from friends is motivated by good will.", "Familiar sources are more accurate.", "Questioning peers is socially unacceptable.", "A sense of inclusion weakens suspicion."]))
            ]
          }
        ]
      },
      {
        id: "uoe", title: "Use of English", minutes: 90, max: 40,
        tasks: [
          {
            id: "uoe-1", section: "uoe", title: "Task 1 · Hidden animals", type: "pair",
            intro: "For items 1-7 guess each pair of words from their definitions. The pairs of words are spelt identically except for the addition of the name of an ANIMAL/INSECT inserted somewhere inside or at either end of the second word. Write 2 words on your answer sheet. The first example (0) is done for you. You shouldn’t underline or translate anything.",
            example: "0. Fell and a part of a plant used to symbolise desolation or an awkward silence – tumbled and tumbleweed (ewe – овца)",
            items: [
              { n: 1, q: "Agreed and elaborate or difficult", accept: [["complied"], ["complicated"]] },
              { n: 2, q: "Suffer distress and make an enemy of", accept: [["agonise", "agonize"], ["antagonise", "antagonize"]] },
              { n: 3, q: "A soft cheese and for a short stretch of time", accept: [["brie"], ["briefly"]] },
              { n: 4, q: "A filled pastry and a marauder", accept: [["pie"], ["pirate"]] },
              { n: 5, q: "Dishonest statements and events at which winners are selected at random from among ticketholders", accept: [["lies"], ["lotteries"]] },
              { n: 6, q: "A male cat (name) and either a place name or any name derived from a place name", accept: [["tom"], ["toponym"]] },
              { n: 7, q: "A component and a defensive wall in a fortification", accept: [["part"], ["parapet", "rampart"]] }
            ]
          },
          {
            id: "uoe-2", section: "uoe", title: "Task 2 · Picture puzzles", type: "text",
            intro: "For items 8 to 14, guess what each puzzle is saying. You have to use your imagination and think critically to solve the puzzles to make up a saying or an idiom. The first TWO examples (0, 00) are done for you.",
            examples: [
              { label: "0.", show: "HE   ADA   CHE", answer: "SPLITTING HEADACHE" },
              { label: "00.", img: "media/puzzle-00.png", answer: "LIVING IT UP" }
            ],
            items: [
              { n: 8, q: "(an idiom)", img: "media/puzzle-8.png", accept: ["down to earth"] },
              { n: 9, q: "(an idiom)", img: "media/puzzle-9.png", accept: ["keep in touch", "keep in line"] },
              { n: 10, q: "(a saying)", img: "media/puzzle-10.png", accept: ["an eye for an eye"] },
              { n: 11, q: "(an idiom)", img: "media/puzzle-11.png", accept: ["making up for lost time", "making up for the lost time"] },
              { n: 12, q: "(an idiom)", img: "media/puzzle-12.png", accept: ["the odds are overwhelming", "odds are overwhelming", "overwhelming odds"] },
              { n: 13, q: "(an informal idiom)", img: "media/puzzle-13.png", accept: ["no biggie"] },
              { n: 14, q: "(an idiom)", img: "media/puzzle-14.png", accept: ["step up to the plate"] }
            ]
          },
          {
            id: "uoe-3", section: "uoe", title: "Task 3 · Idioms on stage", type: "choice", opts: IDIOMS,
            intro: "For items 15-22, read the idioms A- P below and choose the one that fits each gap best in the sentences. There are extra idioms which you do not need to use. The first example (0) is done for you.",
            example: "0. She will still be ______, clinging to his arm at premieres and so on. — K (in the limelight)",
            items: [
              ch(15, "Your jokes are perfect for your speech tonight. You will have them ___!", ["L"]),
              ch(16, "Juliet Stevenson is used to ___ when she appears on stage.", ["E", "F"]),
              ch(17, "The speech was populistic and was more about ____ than solving the problems.", ["A"]),
              ch(18, "It was Jack Lemmon who finally ___, turning in his finest performance in years.", ["G", "M"]),
              ch(19, "The comedian really _____, with big, silly movements and exaggerated voices, making the audience roar with laughter.", ["B"]),
              ch(20, "Jane was ___, hoping that a member of the hockey team would drop out and she would get a place on the team.", ["N"]),
              ch(21, "The protest was just ___ designed to bring in the media.", ["P"]),
              ch(22, "I used to be very cynical about the world, but ever since surviving that car wreck, I have been ___!", ["F", "J"])
            ]
          },
          {
            id: "uoe-4", section: "uoe", title: "Task 4 · Anagram pairs", type: "pair",
            intro: "For items 23 to 30 complete each sentence by filling the gaps with TWO DIFFERENT WORDS formed from the SAME PROVIDED LETTERS, rearranged. Both words must fit grammatically and semantically. The first example (0) is done for you.",
            example: "0. Letters: SREIA — Let no panic ____ from a rumor; instead ____ the question into the light until it can stand on its own legs. — ARISE / RAISE",
            items: [
              { n: 23, letters: "TAERH", q: "He spoke not from vanity but from the ____, while the ____beneath him bore his weight, unadorned, indifferent to his claims.", accept: [["heart"], ["earth"]] },
              { n: 24, letters: "TSILEN", q: "For the space to remain ____, one must first learn to ____ attentively to what is implied rather than stated.", accept: [["silent"], ["listen"]] },
              { n: 25, letters: "RMOEFR", q: "The ____ structure endured longer than expected, until they finally resolved to ____ what custom alone had preserved.", accept: [["former"], ["reform"]] },
              { n: 26, letters: "TDRICE", q: "History would likely _____ her with the discovery, yet she deliberately worked to ____ public recognition away from herself and toward the entire research team.", accept: [["credit"], ["direct"]] },
              { n: 27, letters: "GNEADR", q: "Every _____ contains the possibility of growth, like a seed of a ____, but only careful attention determines whether growth or destruction takes shape.", accept: [["danger"], ["garden"]] },
              { n: 28, letters: "OBWLE", q: "He spoke of what lay ____ the surface, then offered his arm like an ____ through a crowd—steady leverage to pull her out of the current.", accept: [["below"], ["elbow"]] },
              { n: 29, letters: "RAESP", q: "She tried to _____ him unnecessary pain by choosing her words carefully, yet the truth would _____ through his defenses the moment it was spoken.", accept: [["spare"], ["spear"]] },
              { n: 30, letters: "TLNRAE", q: "A _____ life teaches you to travel light; what he _____ was that commitment is not a place you own, but one you build.", accept: [["rental"], ["learnt"]] }
            ]
          },
          {
            id: "uoe-5", section: "uoe", title: "Task 5 · Who were they?", type: "choice", opts: GROUPS, longOpts: true,
            intro: "For items 31-40, match the numbered groups of people (column 1) with their lettered descriptions or representatives (column 2). Some descriptions are not needed.",
            items: [
              ch(31, "The Radical Republicans", ["D"]),
              ch(32, "The Pre-Raphaelites", ["H"]),
              ch(33, "The Loyalists", ["I"]),
              ch(34, "The Lake Poets", ["G"]),
              ch(35, "The Angry Young Men", ["B"]),
              ch(36, "The Virginia dynasty", ["F"]),
              ch(37, "The Royalists", ["E"]),
              ch(38, "The log cabin presidents", ["K"]),
              ch(39, "Carpetbaggers", ["C"]),
              ch(40, "Minutemen", ["J"])
            ]
          }
        ]
      },
      {
        id: "writing", title: "Writing", minutes: 75, max: 20,
        tasks: [
          {
            id: "writing-1", section: "writing", title: "Short story · The mysterious book", type: "writing",
            intro: "An English language magazine invites young people to participate in a writing competition. The participant must write a short story based on the following premise:",
            premise: "A young person finds a mysterious book in a library. This book contains not just words, but three encrypted messages in the form of riddles. Each solved riddle helps the person to understand an important truth and changes their life's course.",
            outro: "You decide to take part and write the short story.",
            points: [
              "the information about why the person came to the library;",
              "three riddles - questions that are difficult to understand, and that have surprising answers, that you may ask somebody as a game;",
              "answers to the riddles discovering truths of vital importance;",
              "description of how this book changed the person’s life."
            ],
            words: { min: 220, max: 250, accMin: 198, accMax: 275 },
            needsTitle: true,
            criteria: [
              { id: "task", t: "Решение коммуникативной задачи", max: 9 },
              { id: "org", t: "Организация текста", max: 3 },
              { id: "lex", t: "Лексика", max: 3 },
              { id: "gram", t: "Грамматика", max: 3 },
              { id: "spell", t: "Орфография и пунктуация", max: 2 }
            ],
            note: "При 0 баллов за решение коммуникативной задачи вся работа оценивается в 0. Меньше 198 слов — 0. Если больше 275 слов, проверяются только первые 250."
          }
        ]
      },
      {
        id: "speaking", title: "Speaking", max: 20,
        tasks: [
          {
            id: "speaking-1", section: "speaking", title: "Vibrant Cultural Flavour of Carnivals", type: "speaking",
            timing: { prep: 15, monologue: "3 – 3,5 minutes", questions: "2 - 3 minutes" },
            cards: [
              {
                id: "mardi", label: "Set 1 Student 1 · Mardi Gras",
                task: "As ‘a guide’, you take your fellow students from your school to a famous carnival in New Orleans, giving them an opportunity to immerse themselves into the unique culture of modern entertainment and comparing it with the old-age traditions. Using the video and information from the fact file, speak about the Carnival celebrations (Set 1 STUDENT 1: Mardi Gras):",
                plan: ["Origins and History", "Festive Events", "Street culture: Costumes, Music, Food", "Cultural Significance"],
                opinion: "Express your own opinion on why Carnivals are worth being attended by people from all over the world. Synchronize your presentation with the video.",
                partner: "Listen to the presentation of your partner (Set 2 STUDENT 2: Maslenitsa). Questions/ Answers: Time: 2- 3 minutes. Ask 2 QUESTIONS about the Carnival to get ADDITIONAL INFORMATION not mentioned in the presentation. You should only use WH-questions (special questions). Questions about the opinion of your partner are NOT accepted.",
                qa: "Answer 2 QUESTIONS from your partner – ‘a fellow student’ about the Mardi Gras Carnival. Make sure your answer is based on the information from the fact file. If there is NO relevant information in the fact file, base your answer on your best guess.",
                fact: [
                  ["Происхождение и история праздника", [
                    "Марди Гра (Mardi Gras /gra:/)(«Жирный вторник») имеет древнеевропейские корни, появился в Америке благодаря привнесенным из Франции традициям, установленным перед церковным постом.",
                    "Проходит в феврале – марте, даты меняются каждый год.",
                    "Французские колонисты принесли праздник в Луизиану в начале XVIII в., в 1730-е гг. в Новом Орлеане проходили праздничные мероприятия.",
                    "Современный вид карнавал приобрёл в XIX в. с появлением «крев» (crewes /krooz/— закрытых клубов, организующих балы и парады, и стал центральной частью праздника."]],
                  ["Праздничные мероприятия", [
                    "Главные события— парады, организованные крупнейшими кревами (Rex, Zulu, Endymion).",
                    "Традиционное одаривание «разбрасыванием» — бус, значков, игрушек и лимитированных сувениров вроде расписанных кокосов с огромных украшенных платформ на тематические сюжеты",
                    "Уличные танцы, музыкальные выступления, костюмированные шествия, вечеринки.",
                    "Семейные традиционные встречи."]],
                  ["Уличная культура: Костюмы, Музыка, Еда", [
                    "Костюмы: оригинальные костюмы, яркие, сатирические, с масками, перьями, блёстками можно встретить в районах Мариньи и Байуотер (Marigny and Bywater area).",
                    "Музыка: джаз, брас-бэнды, уличные ансамбли, культовые мелодии «When the Saints Go Marching In», «Do Whatcha Wanna».",
                    "Еда: традиционные блюда креольской и каджунской кухни: гумбо, джамбалайя, бенье, королевский пирог (king cake) в фиолетово-золотисто-зеленых цветах карнавала."]],
                  ["Культурная значимость", [
                    "Марди Гра - символ культурного разнообразия Нового Орлеана, сочетающий французские, испанские, африканские, карибские и местные традиции.",
                    "Праздник отражает творческий дух, чувство общности и устойчивость города.",
                    "Туристическая достопримечательность.",
                    "Важная часть городской идентичности, наследия и семейных традиций."]]
                ]
              },
              {
                id: "maslenitsa", label: "Set 2 Student 2 · Maslenitsa",
                task: "As ‘a guide’, you take your fellow students from your school to a famous Russian celebration of the end of winter – Maslenitsa, giving them an opportunity to immerse themselves into the unique culture of modern entertainment and comparing it with the old-age traditions. Using the video and information from the fact file, speak about the Carnival celebrations (Set 2 STUDENT 2: Maslenitsa):",
                plan: ["Origins and History", "Festive Events", "Street culture: Costumes, Music, Food", "Cultural Significance"],
                opinion: "Express your own opinion on why Carnivals are worth being attended by people from all over the world. Synchronize your presentation with the video.",
                partner: "Listen to the presentation of your partner (Set 1 STUDENT 1: Mardi Gras). Questions/ Answers: Time: 2- 3 minutes. Ask 2 QUESTIONS about the Carnival to get ADDITIONAL INFORMATION not mentioned in the presentation. You should only use WH-questions (special questions). Questions about the opinion of your partner are NOT accepted.",
                qa: "Answer 2 QUESTIONS from your partner – ‘a fellow student’ about the Carnival. Make sure your answer is based on the information from the fact file. If there is NO relevant information in the fact file, base your answer on your best guess.",
                fact: [
                  ["Происхождение и история праздника", [
                    "Древнейший славянский праздник, возникший из языческих обрядов проводов зимы и встречи весны.",
                    "Проходит в феврале – марте, даты меняются каждый год.",
                    "Праздник вошел в церковный календарь после принятия христианства как последняя неделя перед Великим постом — Сырная (или Масляная) седмица.",
                    "Традиции празднования сохранили дохристианские элементы (соломенное чучело, обряды плодородия) и христианские — подготовку к посту и отказ от мяса."]],
                  ["Праздничные мероприятия", [
                    "ярмарки,", "катания на санях,", "гулянья, хороводы,",
                    "народные игры, забавы и соревнования (кулачные бои, лазание на масленичный столб, перетягивание каната, шуточные состязания),",
                    "сжигание чучела Масленицы и других арт-объектов — кульминация праздника, символизирующее прощание с зимой и обновление природы,",
                    "«Прощённое воскресенье»: люди просят прощения друг у друга."]],
                  ["Уличная культура: Костюмы, Музыка, Еда", [
                    "Костюмы: народные сарафаны, кокошники, яркие платки, вышитые рубахи; участники могут носить маски и ряженые костюмы.",
                    "Музыка: русские народные песни, хороводы под гармошку, балалайку, свирель, бубен; выступления фольклорных ансамблей.",
                    "Еда (оставление мяса - Мясопуст): главное блюдо — блины, символ солнца (подают с мёдом, сметаной, икрой, вареньем), разнообразные пироги, сырники, оладьи, выпечку, чай из самовара."]],
                  ["Культурная значимость", [
                    "Масленица отражает цикличность природы и древние сельскохозяйственные традиции Восточных славян.",
                    "Праздник - прощание с зимой, обновление и предстоящий духовный переход к посту.",
                    "Играет важную роль в укреплении семейных и общинных связей, объединяя людей в совместных гуляньях.",
                    "Масленица — особый культурный бренд России, привлекающий туристов, поддерживающий народные ремёсла, фольклор и традиции."]]
                ]
              }
            ],
            notesRule: "You can make notes during the preparation time, but YOU ARE NOT ALLOWED TO READ them during the presentation.",
            criteria: [
              { id: "mono", t: "Решение коммуникативной задачи · монолог", max: 6 },
              { id: "dia", t: "Решение коммуникативной задачи · диалог", max: 5 },
              { id: "org", t: "Организация речи", max: 3 },
              { id: "lex", t: "Лексическое оформление речи", max: 2 },
              { id: "gram", t: "Грамматическое оформление речи", max: 2 },
              { id: "phon", t: "Фонетическое оформление речи", max: 2 }
            ],
            note: "Если участник читает выступление по записям, за весь ответ ставится 0. При 0 за монолог общая оценка — 0. Видеоролики к монологам в открытом архиве не опубликованы."
          }
        ]
      }
    ],
    lies: {
      title: "Lies, Gossip, and People You Thought You Knew",
      text: [
        "When were you last lied to? To your knowledge, obviously. Was the lie something that mattered? Was the liar convincing? And how did you react? Perhaps with anger, (26) … or contempt – like my grandmother, who had a stock retort for anyone who tried to pull the wool over her eyes: “I hate liars. They’re worse than thieves.”",
        "Did you feel afterwards that you’d been easy to fool? If so, you’d be in good company. We tend to assume communication is honest except when verified as incorrect. And that is something to be thankful for; otherwise we’d live in a suspicious world. Less helpfully, many of us believe that dishonesty reveals itself through body language. In popular imagination, liars look (27) … , they fidget, cough or avoid eye contact. Unfortunately, these cues are unreliable.",
        "People who convince themselves of their own truthfulness while lying may behave no differently from anyone else. Empirical research shows it is difficult to identify even deliberate liars from their behaviour. A meta-analysis examining more than 200 studies found that people’s ability to distinguish truth from lies is barely better than chance. A more recent review reinforced this conclusion: we are generally poor judges of deception. However, who we believe – and why – becomes more complex within certain relationships.",
        "I once knew a woman called Julia, who was attractive, charming and seemingly kind. She was generous with cake, hugs and praise, and appeared to be a sympathetic listener. I loved her for these qualities, yet I often felt guarded in her company for reasons I could not articulate. Her compliments were so warm one could feel dizzied. In this context, when she made improbable claims, people tended to take them at face value. I know I did. Her credibility was reinforced by a troubling pattern of behaviour. At times she persuaded me that I had said things I did not remember saying, or that I had imagined things she had said. She would advise me on a practical issue, only later to express dismay at my choices and question my reasoning. Over time, my trust in my own judgment eroded. If I was so forgetful, how could I rely on my perceptions? I could barely sense them through a mental fog. She had a similar effect on others.",
        "Within this fog, Julia made extreme claims about people I knew: Cathy was mistreating a pet, Daniel was ripping off his mother, Pamela was taking Julia’s belongings. I privileged Julia’s perception over my own, gradually developing distorted views of these people.",
        "Eventually, I learned that Julia had been discussing my health with others. Under the guise of concern, she claimed I suffered from a range of physical and mental illnesses that I had never had and did not meet criteria for. These included stigmatised conditions likely to provoke strong reactions. What she said was untrue. When I compared notes with some of her other contacts, we discovered she had set us against each other through an elaborate web of (28) … . Several relationships had broken down, extracting a painful toll from those involved. When Julia realised we were on to her, she cut ties. She never explained her behaviour, and I still do not know whether she believed her own contradictory accounts. What interests me more is how long she was believed, despite growing (29) … of her actions.",
        "Many people are now familiar with the idea of gaslighting: denying a shared reality to make someone question their senses. The most effective gaslighters I’ve met seemed more likely to be believed when they told everyday lies, with one strategy supporting the other. Who the liar is, rather than what they say, influences their success. Perceived credibility is shaped by cognitive bias, and can be gendered or racialised. It is also affected by halo errors: we expect people we like to be honest. Good looks, generosity and flattering behaviour can buy undeserved leeway.",
        "The normal desire for connection can also cloud judgment. Consider gossip, often defined in psychology as unverified personal information rather than malicious intent. Research suggests gossip can benefit social groups if the information is true, and anthropologists argue it helps forge bonds. Sharing an inside story can signal trust or belonging. The downside of increased intimacy is lowered defences, and a compelling story from a friend can be hard to resist.",
        "Overall, being lied to can damage trust in lasting ways. First, it can foster suspicion that others do not mean what they say. Although studies suggest most people tell one or two white lies a day, prolific liars are relatively rare. Second, there is the (30) … and disconcerting knowledge that even good people struggle to detect lies. Third, confidence in one’s own judgment may be lost and must be rebuilt. The best response, it seems to me, is to attend to any sense of inner division. Wordless unease should be examined rather than ignored.",
        "A balance must be struck between the dignity my grandmother showed when confronting a liar and faith in humanity. Viewing everyone skeptically offers false comfort: no liar gets through, but neither does anyone else. What helps me is knowing how much better my life has been without Julia in it. Outside her influence, optimism is easier – including the understanding that most people are honest, and deserve to be met as such."
      ]
    }
  };
})();
