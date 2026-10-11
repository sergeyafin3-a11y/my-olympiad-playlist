window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-pv-core", group: "Phrasal verbs", title: "Essentials: put off, take up, give up, turn down…",
    rule: {
      intro: "A phrasal verb is a verb + a particle, and you often cannot guess the meaning from the parts. At the olympiad you must choose the particle and also put the verb in the right form.",
      blocks: [
        { h: "Saying no, cancelling, stopping", rows: [
          ["put off", "move to a later time (= postpone): The meeting was put off until Friday."],
          ["turn down", "say no to (an offer); make quieter: She turned down the offer."],
          ["give up", "stop doing; stop trying: He gave up smoking last year."],
          ["run out of", "have no more of something: We've run out of coffee."]
        ] },
        { h: "Starting, continuing, creating", rows: [
          ["take up", "start a hobby: I took up chess at ten."],
          ["carry on", "continue: Carry on reading, please."],
          ["set up", "start (a company or group): They set up a charity in 2015."],
          ["bring up", "raise a child; start talking about (a topic): She was brought up by her aunt. / Don't bring up politics."]
        ] },
        { h: "Searching, finding, being similar", rows: [
          ["look into", "study or investigate: The police are looking into the case."],
          ["come across", "find by chance: I came across an old photo."],
          ["take after", "look or act like an older family member: She takes after her mum."],
          ["get over", "get better after (an illness or a bad time): It took him weeks to get over the flu."]
        ] }
      ],
      tips: [
        "First find the tense from the context, then write the form: Yesterday she ___ (turn down) → turned down.",
        "take after is only about older family members, and it has no Continuous form: He takes after his dad (not is taking after).",
        "run out of needs of before an object: We ran out of time. With no object there is no of: Time is running out."
      ]
    },
    items: [
      { type: "text", q: "The final was ___ until Sunday because of the storm. (put / off)", accept: ["put off"], why: "put off = move to a later time; passive was + V3, put is irregular (put-put-put)." },
      { type: "text", q: "Last week she ___ a job offer from a huge bank because the hours were insane. (turn / down)", accept: ["turned down"], why: "turn down = say no to; last week → Past Simple." },
      { type: "text", q: "We've ___ milk — could you pop to the shop? (run / out of)", accept: ["run out of"], why: "run out of = use all of something; Present Perfect: have + V3 (run)." },
      { type: "text", q: "Tom really ___ his father: they have the same laugh and the same temper. (take / after)", accept: ["takes after"], why: "take after = be like a family member; a fact now → Present Simple, he → takes." },
      { type: "text", q: "It took her almost a year to ___ the break-up. (get / over)", accept: ["get over"], why: "get over = feel better after something bad; after to → infinitive." },
      { type: "text", q: "Last autumn Anna ___ yoga to cope with exam stress. (take / up)", accept: ["took up"], why: "take up = start a hobby; last autumn → Past Simple took." },
      { type: "text", q: "Please don't ___ the subject of money at Grandma's birthday dinner. (bring / up)", accept: ["bring up"], why: "bring up = start talking about something; after don't → infinitive." },
      { type: "choice", q: "While tidying the attic, I came ___ a bundle of letters my grandfather had written during the war.", opts: ["across", "up with", "into", "off"], a: 0, why: "come across = find by chance. come up with = think of an idea, come into = get money or property from a dead relative, come off = fall off / succeed." },
      { type: "choice", q: "The fire brigade is still looking ___ the cause of the blaze.", opts: ["into", "after", "up to", "out"], a: 0, why: "look into = investigate. look after = take care of, look up to = respect, look out = be careful." },
      { type: "choice", q: "Despite the pouring rain, the street musicians ___ playing as if nothing had happened.", opts: ["carried on", "turned down", "set up", "took after"], a: 0, why: "carry on doing = continue; despite shows that the music did not stop." }
    ]
  },
  {
    id: "lx-pv-advanced", group: "Phrasal verbs", title: "Olympiad level: come up with, put up with, live up to…",
    rule: {
      intro: "The olympiad loves three-part verbs (verb + adverb + preposition) and verbs with several meanings. Learn them as single words: you cannot move the particles.",
      blocks: [
        { h: "Three-part verbs: the particles stay together", rows: [
          ["come up with", "think of (an idea or plan): She came up with a brilliant plan."],
          ["put up with", "accept something bad without complaining: I can't put up with his rudeness."],
          ["live up to", "be as good as people expected: The film didn't live up to the hype."],
          ["get away with", "do something wrong and not be punished: He got away with lying."],
          ["brush up on", "practise again to get better at something: I must brush up on my Spanish."],
          ["look up to", "respect and admire: Kids look up to their coaches."],
          ["cut down on", "eat, drink or use less of: Cut down on sugar."]
        ] },
        { h: "Two-part verbs with tricky meanings", rows: [
          ["fall out (with sb)", "stop being friends after an argument: They fell out over money."],
          ["make up", "become friends again; invent (a story); form (a part of): They kissed and made up. / He made up an excuse."],
          ["turn out", "be found to be, in the end: The rumour turned out to be true."],
          ["pull off", "manage to do something difficult: They pulled off a surprise win."],
          ["wear off", "slowly stop having an effect: The anaesthetic wore off."]
        ] }
      ],
      tips: [
        "With three-part verbs the object goes only at the end: put up with the noise, not put the noise up with.",
        "fall out ↔ make up are opposites: They fell out last month but have made up now.",
        "turn out + to be / that: It turned out that he was right. Do not mix it up with turn up = appear, arrive."
      ]
    },
    items: [
      { type: "text", q: "Who ___ the idea of last Friday's surprise party for Mr Ellis? (come / up with)", accept: ["came up with"], why: "come up with = think of; a question about a past event → Past Simple came." },
      { type: "text", q: "I can't ___ this drilling any longer — I'm moving to the library! (put / up with)", accept: ["put up with"], why: "put up with = accept something bad; after can't → infinitive." },
      { type: "text", q: "Sadly, the long-awaited sequel didn't ___ the hype: critics called it dull. (live / up to)", accept: ["live up to"], why: "live up to = be as good as expected; after didn't → infinitive." },
      { type: "text", q: "He copied his essay from the internet and thought he had ___ it — until the teacher ran a plagiarism check. (get / away with)", accept: ["got away with", "gotten away with"], why: "get away with = not be punished; Past Perfect: had + V3 (got, AmE gotten)." },
      { type: "text", q: "The painkiller is starting to ___, and my tooth hurts again. (wear / off)", accept: ["wear off"], why: "wear off = stop working (about a drug or effect); after starting to → infinitive." },
      { type: "text", q: "The forecast was gloomy, but in the end the day ___ to be warm and sunny. (turn / out)", accept: ["turned out"], why: "turn out to be = be in the end; a story about the past → turned out." },
      { type: "choice", q: "I need to brush up ___ my French before the exchange trip to Lyon.", opts: ["on", "with", "for", "at"], a: 0, why: "brush up on = practise again (you can also say brush up sth with no preposition, but the only preposition is on)." },
      { type: "choice", q: "The two sisters ___ over their grandmother's house and haven't spoken since.", opts: ["fell out", "made up", "pulled off", "looked up"], a: 0, why: "fall out (over sth) = have an argument and stop being friends; “haven't spoken since” shows an argument, not making up." },
      { type: "choice", q: "Nobody believed the underdogs could win, but they ___ an incredible comeback in the last ten minutes.", opts: ["pulled off", "wore off", "fell out", "cut down"], a: 0, why: "pull off = manage to do something very difficult." },
      { type: "choice", q: "Her doctor advised her to cut down ___ coffee and get more sleep.", opts: ["on", "from", "with", "off"], a: 0, why: "cut down on sth = have or use less of something." }
    ]
  },
  {
    id: "lx-prep-dependent", group: "Prepositions", title: "Dependent prepositions: rely on, keen on, aware of…",
    rule: {
      intro: "Many verbs, adjectives and nouns need their own preposition, and it is often different from Russian. Learn these phrases as whole blocks.",
      blocks: [
        { h: "Verb + preposition", rows: [
          ["rely on / depend on", "trust; need something to happen: You can rely on me."],
          ["insist on + -ing", "say firmly that you will do something: He insisted on paying."],
          ["congratulate sb on", "say you are happy about someone's success: I congratulated her on her win."],
          ["accuse sb of / blame sb for", "say someone did something wrong: They accused him of theft. / They blamed him for the crash."]
        ] },
        { h: "Adjective + preposition", rows: [
          ["keen on / fond of", "liking something a lot: She's keen on chess."],
          ["aware of / capable of", "knowing about; able to do: Are you aware of the risks?"],
          ["famous for / responsible for", "well known for; being the reason for: Parma is famous for its ham."],
          ["dependent on / independent of", "needing / not needing someone: dependent on parents, independent of them."]
        ] },
        { h: "Noun + preposition", rows: [
          ["reason for / cause of", "why something happens: the reason for the delay / the cause of the fire"],
          ["increase / decrease in", "going up, going down (of something): an increase in prices"],
          ["solution to / key to", "an answer to, the way to: a solution to the problem"]
        ] }
      ],
      tips: [
        "Russian makes you want to say from, but in English it is depend ON and dependent ON (but independent OF).",
        "reason FOR, but cause OF: the reason for the fire, but the cause of the fire.",
        "After a preposition the verb takes -ing: She insisted on going, not on to go."
      ]
    },
    items: [
      { type: "text", q: "You can always rely ___ Kate — she has never let anyone down.", accept: ["on", "upon"], why: "rely on (upon) = trust, depend on." },
      { type: "text", q: "Were you aware ___ the risks before you signed the contract?", accept: ["of"], why: "aware of = knowing about." },
      { type: "text", q: "Ever since the trip to Iceland, my brother has been really keen ___ landscape photography.", accept: ["on"], why: "keen on = liking something a lot." },
      { type: "text", q: "Air pollution is responsible ___ millions of premature deaths every year.", accept: ["for"], why: "responsible for = being the reason for, being in charge of." },
      { type: "text", q: "My grandfather insisted ___ paying for everyone's dinner.", accept: ["on", "upon"], why: "insist on + -ing = say firmly that you will do something." },
      { type: "text", q: "There has been a sharp increase ___ the number of tourists visiting Kazan.", accept: ["in"], why: "an increase in sth = growth of something (of goes before a number: an increase of 20%)." },
      { type: "choice", q: "The little town of Gruyères is famous ___ its cheese.", opts: ["for", "of", "with", "by"], a: 0, why: "famous for = well known because of something." },
      { type: "choice", q: "At 25, he still felt embarrassed about being financially dependent ___ his parents.", opts: ["on", "from", "of", "to"], a: 0, why: "dependent on = needing someone or something (but independent of)." },
      { type: "choice", q: "The professor congratulated her ___ winning the international prize.", opts: ["on", "at", "with", "about"], a: 0, why: "congratulate sb on sth = tell someone you are happy about their success." },
      { type: "choice", q: "The airline gave no explanation, and nobody knew the reason ___ the delay.", opts: ["for", "of", "to", "about"], a: 0, why: "the reason for = why something happens (compare: the cause of)." }
    ]
  },
  {
    id: "lx-prep-none", group: "Prepositions", title: "Verbs with NO preposition: await, discuss, enter, marry, resemble…",
    rule: {
      intro: "Because of Russian, you may want to add an extra preposition: “discuss about”, “marry with”, “answer to”. At the final of the All-Russian Olympiad this is a classic “find the extra word” task.",
      blocks: [
        { h: "Verbs with no preposition", rows: [
          ["await sth", "wait for: We await your reply. But: We wait for your reply."],
          ["discuss sth", "talk about: We discussed the plan. (but a discussion about)"],
          ["enter a place", "go into: She entered the room. (enter into = start an agreement)"],
          ["marry sb", "become the husband or wife of: He married Anna. (but get married to)"],
          ["resemble sb", "look like: She resembles her aunt."],
          ["answer sb/sth", "give an answer: Answer the question. (but reply to)"]
        ] },
        { h: "Traps with prepositions", rows: [
          ["provide sb with sth / provide sth for sb", "give what is needed: provide students with laptops / provide laptops for students"],
          ["explain sth to sb", "make clear to someone: Explain it to me. Not explain me!"],
          ["listen to vs hear", "listen to = pay attention to a sound (with a preposition), hear = notice a sound (no preposition): Listen to me! / I heard a noise."],
          ["arrive in / at", "in = a city, a country: arrive in Paris; at = a building, a place: arrive at the station. Never arrive to."]
        ] }
      ],
      tips: [
        "Think of the synonym with a preposition: wait FOR = await; get married TO = marry; reply TO = answer. The second word has no preposition.",
        "A noun can have a preposition when the verb has none: a discussion about the film, but discuss the film.",
        "In a “find the extra word” task, check every preposition after a verb: He entered into the hall → into is extra."
      ]
    },
    items: [
      { type: "text", q: "Find the extra word: We are awaiting for your reply.", accept: ["for"], why: "await has no preposition (wait for = await)." },
      { type: "text", q: "Find the extra word: The committee discussed about the new rules for almost three hours.", accept: ["about"], why: "discuss sth has no preposition (but a discussion about)." },
      { type: "text", q: "Find the extra word: As soon as the headmaster entered into the hall, everyone fell silent.", accept: ["into"], why: "enter a place has no preposition; enter into is only for agreements and talks." },
      { type: "text", q: "Find the extra word: In 2019 she married with a famous violinist from Vienna.", accept: ["with"], why: "marry sb has no preposition (or get married to sb)." },
      { type: "text", q: "Find the extra word: With his red hair and freckles, he strongly resembles to his grandfather.", accept: ["to"], why: "resemble sb has no preposition." },
      { type: "text", q: "Find the extra word: Three weeks have passed, and nobody has answered to my letter.", accept: ["to"], why: "answer sth has no preposition (but reply to)." },
      { type: "choice", q: "The school provides every student ___ a laptop and a tablet.", opts: ["with", "for", "to", "by"], a: 0, why: "provide sb with sth; use for in the other order: provide laptops for students." },
      { type: "choice", q: "Could you explain ___ how this ticket machine works?", opts: ["to me", "me", "me about", "at me"], a: 0, why: "explain sth to sb; explain me is a typical mistake." },
      { type: "choice", q: "After a twelve-hour flight, we finally arrived ___ Buenos Aires late at night.", opts: ["in", "at", "to", "into"], a: 0, why: "arrive in + a city/country; at + a building or place; arrive to does not exist." },
      { type: "choice", q: "I thought I heard footsteps upstairs, so I stopped and ___ carefully.", opts: ["listened", "listened to", "heard to", "heard"], a: 0, why: "listen = pay attention to sounds; to is needed only before an object (listen to music), and here there is no object." }
    ]
  }
);
