window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "b2-conditional-3", level: "B2", title: "Third conditional",
    rule: {
      intro: "We use the third conditional to talk about regret or to imagine a different past. The past cannot change: the condition did not happen, and the result did not happen either.",
      blocks: [
        { h: "Third conditional (past → past)", rows: [
          ["If + Past Perfect, would have + V3", "If I had studied harder, I would have passed."],
          ["could / might have + V3", "If we had left earlier, we might have caught the train."],
          ["negative", "If it hadn't rained, we wouldn't have cancelled the match."],
          ["question", "What would you have done if you had missed the bus?"]
        ] },
        { h: "Inversion instead of if", rows: [
          ["Had + subject + V3", "Had I known about the party, I would have come."],
          ["Had + not (no short form)", "Had she not helped me, I would have failed."]
        ] }
      ],
      tips: [
        "Don't put would in the if part. Not \"If I would have known\" but \"If I had known, I would have told you\".",
        "The third conditional often sounds like blame or regret: \"If you had told me, I would have helped\" = it's a pity you didn't tell me.",
        "In inversion, don't use the short form hadn't at the start: \"Had I not seen it…\", not \"Hadn't I seen it…\". This is a common olympiad trap."
      ]
    },
    items: [
      { type: "choice", q: "If I ___ harder, I would have passed the exam.", opts: ["studied", "had studied", "would study"], a: 1, why: "An unreal past: use Past Perfect in the if part." },
      { type: "choice", q: "If she had taken the map, she ___ lost in the old town.", opts: ["wouldn't get", "wouldn't have got", "won't get"], a: 1, why: "The result is in the past: would have + V3." },
      { type: "text", q: "If we ___ (leave) earlier, we wouldn't have missed the train.", accept: ["had left", "'d left", "d left"], why: "Third conditional: if + Past Perfect." },
      { type: "text", q: "If he ___ (not / break) his leg, he would have played in the final.", accept: ["hadn't broken", "had not broken"], why: "A past condition that did not happen: if + Past Perfect." },
      { type: "choice", q: "If you had asked me, I ___ you with your project.", opts: ["would help", "would have helped", "had helped"], a: 1, why: "The main part of the third conditional: would have + V3." },
      { type: "text", q: "Our team ___ (win) the match if the goalkeeper hadn't been injured.", accept: ["would have won", "'d have won", "d have won", "could have won", "might have won"], why: "The main part of the third conditional: would/could/might have + V3." },
      { type: "choice", q: "___ I known about the concert, I would have bought tickets.", opts: ["If", "Had", "Have", "Should"], a: 1, why: "Inversion instead of if in the third conditional: Had I known…" },
      { type: "choice", q: "If you ___ me the wrong answer, I wouldn't have failed the test.", opts: ["didn't tell", "hadn't told", "wouldn't tell"], a: 1, why: "The condition is in the past, so use Past Perfect in the if part." },
      { type: "text", q: "I ___ (not / be) late if my alarm had gone off.", accept: ["wouldn't have been", "would not have been"], why: "A negative result in the past: wouldn't have + V3." },
      { type: "choice", q: "What would you have done if you ___ the last bus?", opts: ["missed", "had missed", "would miss"], a: 1, why: "In a third conditional question, the if part is still Past Perfect." }
    ]
  },
  {
    id: "b2-wish", level: "B2", title: "wish / if only",
    rule: {
      intro: "We use wish and if only to show regret or to say we want things to be different. The verb after them moves one step back in time. If only sounds more emotional.",
      blocks: [
        { h: "Regret about the present", rows: [
          ["wish + Past Simple", "I wish I had more free time."],
          ["wish + were (for all persons)", "I wish I were taller."],
          ["wish + could + V (ability)", "I wish I could play the guitar."]
        ] },
        { h: "Regret about the past", rows: [
          ["wish + Past Perfect", "I wish I hadn't said that."],
          ["if only + Past Perfect", "If only we had booked the tickets earlier!"]
        ] },
        { h: "Annoyance, wanting a change", rows: [
          ["wish + someone + would + V", "I wish you would stop talking during the film."],
          ["about weather and situations", "I wish it would stop raining."]
        ] }
      ],
      tips: [
        "Don't say \"I wish I would…\" about yourself: use would only about other people or situations. Correct: \"I wish I could swim\", not \"I wish I would swim\".",
        "In Russian we say \"it's a pity that…\", but in English we use the opposite form: \"It's a pity I didn't go\" → \"I wish I had gone\".",
        "In formal English, use were after wish for all persons: \"I wish he were here\". Was is OK in everyday speech."
      ]
    },
    items: [
      { type: "choice", q: "I wish I ___ the guitar — then I'd join your band.", opts: ["can play", "could play", "could have played"], a: 1, why: "Regret about a present ability: wish + could + V." },
      { type: "text", q: "I wish I ___ (not / say) that to Mia yesterday.", accept: ["hadn't said", "had not said"], why: "Regret about the past: wish + Past Perfect." },
      { type: "choice", q: "I wish you ___ tapping your pen. It's driving me crazy!", opts: ["would stop", "will stop", "had stopped"], a: 0, why: "Annoyance at another person's behaviour: wish + would + V." },
      { type: "text", q: "If only I ___ (have) more free time this week!", accept: ["had"], why: "A wish about the present: if only + Past Simple." },
      { type: "choice", q: "She wishes she ___ to the party last Saturday.", opts: ["went", "had gone", "would go"], a: 1, why: "It's about the past (last Saturday): wish + Past Perfect." },
      { type: "text", q: "I wish it ___ (stop) raining — we want to play football.", accept: ["would stop", "'d stop", "d stop"], why: "We want a situation to change: wish + would + V." },
      { type: "choice", q: "I wish I ___ in Moscow — then I could go to all the big concerts.", opts: ["live", "lived", "would live"], a: 1, why: "An unreal present: wish + Past Simple. We don't use would about ourselves." },
      { type: "choice", q: "If only we ___ the tickets earlier — now they're sold out!", opts: ["booked", "had booked", "would book"], a: 1, why: "Regret about a past action: if only + Past Perfect." },
      { type: "text", q: "My brother wishes he ___ (be) taller.", accept: ["were", "was"], why: "Present: wish + were (formal) or was (informal)." },
      { type: "choice", q: "Which sentence is correct?", opts: ["I wish I would be older.", "I wish I were older.", "I wish I am older."], a: 1, why: "About yourself and a state, use wish + were. Don't use would about yourself." }
    ]
  },
  {
    id: "b2-passive-advanced", level: "B2", title: "Passive (all tenses) and have something done",
    rule: {
      intro: "The passive puts the action or its object in focus, not the person who does it. The formula is the same for all tenses: be in the right tense + V3. We use have something done when another person does the action for you.",
      blocks: [
        { h: "be + V3 in all tenses", rows: [
          ["Present Continuous", "The stadium is being built."],
          ["Present Perfect", "The song has been streamed a million times."],
          ["Past Perfect", "All the pizza had been eaten."],
          ["Future / modals", "The results will be announced tomorrow. Essays must be handed in."]
        ] },
        { h: "Have / get something done", rows: [
          ["have + object + V3", "I had my hair cut yesterday."],
          ["get + object + V3 (informal)", "We need to get the car repaired."],
          ["something bad happened to you", "She had her phone stolen."]
        ] },
        { h: "Impersonal passive", rows: [
          ["It is said that…", "It is said that the castle is haunted."],
          ["be said to + V / to have been V3", "The castle is said to have been built in the 12th century."]
        ] }
      ],
      tips: [
        "Don't mix up \"I cut my hair\" (I did it myself) and \"I had my hair cut\" (at the hairdresser's). In Russian both are the same phrase, but in English they are different.",
        "In the Continuous passive you must use being: \"is being repaired\", not \"is repairing\" (that is active: \"is repairing it himself\").",
        "For the past in the impersonal passive, use the perfect infinitive: \"He is believed to have left\", not \"to leave\"."
      ]
    },
    items: [
      { type: "choice", q: "The new stadium ___ at the moment.", opts: ["is building", "is being built", "has been building"], a: 1, why: "A process happening now, in the passive: is being + V3." },
      { type: "text", q: "The results of the olympiad ___ (announce) tomorrow.", accept: ["will be announced", "are going to be announced", "are being announced", "are to be announced"], why: "Future passive: will be + V3 (or be going to be + V3)." },
      { type: "text", q: "By the time we arrived, all the pizza ___ (eat).", accept: ["had been eaten"], why: "Before a moment in the past: Past Perfect Passive, had been + V3." },
      { type: "choice", q: "I ___ at the salon yesterday.", opts: ["had my hair cut", "had cut my hair", "have my hair cut"], a: 0, why: "Another person did a service for you in the past: had + object + V3." },
      { type: "choice", q: "This song ___ by millions of people since it came out last month.", opts: ["has been streamed", "was streamed", "is streamed", "had been streamed"], a: 0, why: "since + a result up to now: Present Perfect Passive." },
      { type: "text", q: "We're going to ___ (the car / repair) next week.", accept: ["have the car repaired", "get the car repaired"], why: "A mechanic will do it: have/get + object + V3." },
      { type: "choice", q: "When I got to the lab, the experiment ___, so I watched.", opts: ["was being carried out", "was carrying out", "had carried out"], a: 0, why: "A process in the past, in the passive: was being + V3." },
      { type: "text", q: "She ___ (her phone / steal) on the metro yesterday.", accept: ["had her phone stolen", "got her phone stolen"], why: "Something bad happened to a person: had + object + V3." },
      { type: "choice", q: "The essays must ___ by Friday.", opts: ["be handed in", "been handed in", "handed in"], a: 0, why: "After a modal verb: be + V3." },
      { type: "text", q: "The castle is said ___ (build) in the 12th century.", accept: ["to have been built"], why: "For the past after is said, use the perfect passive infinitive: to have been + V3." }
    ]
  },
  {
    id: "b2-reported-questions", level: "B2", title: "Reported questions, requests and commands",
    rule: {
      intro: "In a reported question, the word order is normal, like in a statement. There is no helping verb do, and the tense usually moves back. We report requests and commands with an infinitive.",
      blocks: [
        { h: "Questions", rows: [
          ["Wh-question: asked + where/what + subject + verb", "She asked me where I lived."],
          ["Yes/no question: asked + if / whether", "He asked if I had finished the project."],
          ["will → would", "Ann asked if I would come to her party."]
        ] },
        { h: "Requests and commands", rows: [
          ["tell / ask + someone + to + V", "The teacher told us to switch off our phones."],
          ["negative: not to + V", "Mum told me not to be late."]
        ] },
        { h: "Changing tenses and words", rows: [
          ["Present → Past, Past → Past Perfect", "\"Did you see it?\" → He asked if I had seen it."],
          ["yesterday → the day before, tomorrow → the next day", "She asked what I was doing the next day."]
        ] }
      ],
      tips: [
        "The main mistake is question word order. Not \"She asked where did I live\" but \"She asked where I lived\". You also don't need a question mark at the end.",
        "In a reported yes/no question, use if or whether, not \"that\": \"Will you go?\" → He asked if I would go.",
        "Offer, suggest and refuse report the whole meaning: \"Shall I help?\" → \"He offered to help\"."
      ]
    },
    items: [
      { type: "choice", q: "She asked me where ___.", opts: ["did I live", "I lived", "do I live"], a: 1, why: "A reported question has normal word order and no did." },
      { type: "choice", q: "He asked me ___ I had finished the project.", opts: ["that", "if", "what"], a: 1, why: "We report a yes/no question with if/whether." },
      { type: "text", q: "\"Did you see the match yesterday?\" → He asked me ___ the match the day before.", accept: ["if I had seen", "whether I had seen", "if I'd seen", "whether I'd seen", "if I saw", "whether I saw"], why: "Past Simple usually moves to Past Perfect (in speech you can keep saw). A yes/no question needs if/whether." },
      { type: "choice", q: "The teacher told us ___ our phones.", opts: ["to switch off", "switch off", "that switch off"], a: 0, why: "A command: tell + someone + to + V." },
      { type: "text", q: "\"Don't be late!\" → Mum told me ___ late.", accept: ["not to be"], why: "A negative command: not to + V." },
      { type: "choice", q: "\"Could you help me with the bags?\" → She asked me ___ her with the bags.", opts: ["to help", "help", "helping", "that I help"], a: 0, why: "A request: ask + someone + to + V." },
      { type: "text", q: "\"What are you doing?\" → My sister asked me what I ___ (do).", accept: ["was doing"], why: "Present Continuous moves to Past Continuous, and the word order is normal." },
      { type: "choice", q: "He wanted to know ___.", opts: ["when does the film start", "when the film started", "when did the film start"], a: 1, why: "Normal word order and the tense moves back: when the film started." },
      { type: "choice", q: "\"Shall I open the window?\" → He ___ open the window.", opts: ["offered to", "asked to", "told me to"], a: 0, why: "Shall I…? is an offer of help: offer to + V." },
      { type: "text", q: "\"Will you come to my party?\" → Ann asked me if I ___ to her party.", accept: ["would come", "'d come", "d come"], why: "In reported speech, will becomes would." }
    ]
  },
  {
    id: "b2-future-continuous-perfect", level: "B2", title: "Future Continuous and Future Perfect",
    rule: {
      intro: "Future Continuous: an action will be in progress at a certain moment in the future. Future Perfect: an action will be finished by a certain moment in the future.",
      blocks: [
        { h: "Future Continuous: will be + V-ing", rows: [
          ["in progress at a future moment", "This time tomorrow I'll be lying on the beach."],
          ["polite question about plans", "Will you be using the laptop this evening?"]
        ] },
        { h: "Future Perfect: will have + V3", rows: [
          ["finished by a moment (by …)", "By the end of June we will have finished our exams."],
          ["negative", "I won't have finished the essay by Monday."]
        ] },
        { h: "Future Perfect Continuous: will have been + V-ing", rows: [
          ["how long, up to a future moment", "By the time he's 18, Max will have been playing for the team for three years."],
          ["with state verbs, use Future Perfect", "Next month they will have been married for ten years."]
        ] }
      ],
      tips: [
        "By + a future moment is a common signal of Future Perfect, when it matters that everything will be finished by then: \"By 9 I will have finished it\". The promise \"I'll do it by 9\" is also correct; it just has a different meaning.",
        "After when, by the time and before, use Present Simple for the future: \"By the time you get home…\", not \"will get\".",
        "Will you be …ing? sounds more polite than Will you …?: we ask about plans, we don't make a request."
      ]
    },
    items: [
      { type: "choice", q: "This time tomorrow I ___ on the beach.", opts: ["will lie", "will be lying", "will have lain"], a: 1, why: "An action in progress at a certain future moment: Future Continuous." },
      { type: "choice", q: "By the end of June, we ___ all our exams.", opts: ["will finish", "will have finished", "will be finishing"], a: 1, why: "by + a future moment → finished: Future Perfect." },
      { type: "text", q: "Don't call me at 8 — I ___ (watch) the final.", accept: ["will be watching", "'ll be watching", "ll be watching", "am going to be watching", "'m going to be watching", "m going to be watching"], why: "At 8 o'clock the action will be in progress: Future Continuous." },
      { type: "text", q: "By 2040, scientists ___ (find) a cure for this disease, I hope.", accept: ["will have found", "'ll have found", "ll have found"], why: "It will be finished by a future moment: Future Perfect." },
      { type: "choice", q: "___ using the laptop this evening? I need to borrow it.", opts: ["Will you be", "Will you have", "Are you going"], a: 0, why: "A polite question about plans: Future Continuous, Will you be + V-ing." },
      { type: "choice", q: "By the time you get home, I ___ dinner.", opts: ["will have cooked", "will cook", "cook"], a: 0, why: "by the time + finished by that moment: Future Perfect." },
      { type: "text", q: "Next month, they ___ (be) married for ten years.", accept: ["will have been", "'ll have been", "ll have been"], why: "How long up to a future moment, with the state verb be: Future Perfect." },
      { type: "choice", q: "This time next week we ___ over the Alps on our way to Rome.", opts: ["will be flying", "will have flown", "fly"], a: 0, why: "This time next week means in progress at a future moment: Future Continuous." },
      { type: "choice", q: "By the time he's 18, Max ___ for the national team for three years.", opts: ["will have been playing", "will be playing", "will play"], a: 0, why: "How long (for three years) up to a future moment: Future Perfect Continuous." },
      { type: "text", q: "I ___ (not / finish) the essay by Monday — it's too long.", accept: ["won't have finished", "will not have finished"], why: "by Monday + not finished: negative Future Perfect." }
    ]
  },
  {
    id: "b2-modals-deduction", level: "B2", title: "Modals of deduction: must / might / can’t (have)",
    rule: {
      intro: "Modal verbs help us make guesses: how sure we are that something is true. For the present, use modal + V. For the past, use modal + have + V3.",
      blocks: [
        { h: "Present", rows: [
          ["must + V: I'm sure it's true", "Her lights are on. She must be at home."],
          ["might / may / could + V: maybe", "She might be asleep."],
          ["can't + V: I'm sure it's not true", "That can't be Tom — he's in London."]
        ] },
        { h: "Past", rows: [
          ["must have + V3", "The ground is wet. It must have rained."],
          ["might / may / could have + V3", "I might have left my keys at school."],
          ["can't / couldn't have + V3", "He can't have seen us — he didn't say hello."]
        ] },
        { h: "In progress", rows: [
          ["must be + V-ing", "He must be sleeping — it's 3 a.m."],
          ["might have been + V-ing", "She might have been training when you called."]
        ] }
      ],
      tips: [
        "In guesses, the opposite of must is can't, not mustn't: \"He can't be serious\", not \"He mustn't be serious\" (mustn't means it is not allowed).",
        "\"I'm sure he has left\" = He must have left, not \"must leave\" or \"should have left\" (should have is blame: \"you should have done it\").",
        "Couldn't have + V3 also means \"I'm sure it didn't happen\". Could have + V3 means \"it was possible, but it didn't happen\" or \"maybe it happened\"."
      ]
    },
    items: [
      { type: "choice", q: "Her lights are on. She ___ be at home.", opts: ["must", "can't", "mustn't"], a: 0, why: "A logical guess, \"I'm sure it's true\": must." },
      { type: "choice", q: "That ___ be Tom — he's in London this week.", opts: ["must", "can't", "might"], a: 1, why: "\"I'm sure it's not true\": can't." },
      { type: "text", q: "The ground is wet. It ___ (rain) last night.", accept: ["must have rained", "must've rained"], why: "A sure guess about the past: must have + V3." },
      { type: "choice", q: "I can't find my keys. I ___ have left them at school — I'm not sure.", opts: ["must", "might", "can't"], a: 1, why: "\"I'm not sure\" means only a possibility: might have + V3." },
      { type: "text", q: "He ___ (not / see) us — he didn't say hello.", accept: ["can't have seen", "cannot have seen", "couldn't have seen", "could not have seen"], why: "Sure that it didn't happen in the past: can't / couldn't have + V3." },
      { type: "choice", q: "She got 100% on the test. She ___ have studied a lot.", opts: ["must", "can't", "should"], a: 0, why: "A sure guess about the past: must have. Should have is blame." },
      { type: "choice", q: "Which sentence means \"I'm sure he isn't telling the truth\"?", opts: ["He mustn't be telling the truth.", "He can't be telling the truth.", "He might not be telling the truth."], a: 1, why: "A sure \"no\" is can't. Mustn't means not allowed, and might not is only a possibility." },
      { type: "text", q: "Lisa isn't answering her phone. She ___ (sleep) right now — I'm not sure. (use a modal)", accept: ["might be sleeping", "may be sleeping", "could be sleeping"], why: "\"I'm not sure\" → a possibility, and it's in progress now: might/may/could be + V-ing." },
      { type: "choice", q: "You ___ be tired after that marathon! Sit down.", opts: ["must", "can't", "might not"], a: 0, why: "An obvious guess: must." },
      { type: "text", q: "The window was locked from the inside. The thief ___ (not / get in) through it.", accept: ["can't have got in", "cannot have got in", "couldn't have got in", "could not have got in", "can't have gotten in", "cannot have gotten in", "couldn't have gotten in", "could not have gotten in"], why: "It was impossible in the past: can't / couldn't have + V3." }
    ]
  },
  {
    id: "b2-inversion", level: "B2", title: "Inversion: Never have I…, Not only…, Hardly…",
    rule: {
      intro: "Inversion means question word order in a statement. It comes after negative or limiting adverbs at the start of a sentence. It makes speech formal and expressive, and olympiads love this topic.",
      blocks: [
        { h: "Negative adverbs", rows: [
          ["Never / Rarely / Seldom + aux + S + V", "Never have I seen such a sunset."],
          ["Little + did + S + V", "Little did she know that the party was for her."],
          ["Under no circumstances + aux + S", "Under no circumstances should you open this door."]
        ] },
        { h: "Not only … but also", rows: [
          ["Not only + aux + S + V, but … also", "Not only did she pass the exam, but she also got top marks."]
        ] },
        { h: "As soon as", rows: [
          ["Hardly / Scarcely + had + S + V3 + when", "Hardly had I got home when it started to rain."],
          ["No sooner + had + S + V3 + than", "No sooner had we sat down than the film started."]
        ] },
        { h: "Only / Not until", rows: [
          ["Only after / Only then + aux + S", "Only after the match did I realise how tired I was."],
          ["Not until + clause + aux + S", "Not until I moved to London did I understand it."]
        ] }
      ],
      tips: [
        "In Past Simple you need did: \"Not only did he win\", not \"Not only he won\" and not \"Not only won he\".",
        "Don't mix up the pairs: Hardly … when, No sooner … than. \"No sooner had I… when\" is a mistake.",
        "After Only after / Not until, the inversion goes in the second part of the sentence: \"Only after I left did I remember\", not \"did I leave\"."
      ]
    },
    items: [
      { type: "choice", q: "Never ___ such a beautiful sunset.", opts: ["I have seen", "have I seen", "I saw"], a: 1, why: "With Never at the start, use inversion: have I seen." },
      { type: "choice", q: "Not only ___ the exam, but she also got the highest score.", opts: ["she passed", "did she pass", "passed she"], a: 1, why: "Not only + did + subject + V." },
      { type: "choice", q: "Hardly ___ home when it started to rain.", opts: ["I had got", "had I got", "did I get"], a: 1, why: "Hardly … when: Past Perfect with inversion, had I got." },
      { type: "text", q: "No sooner ___ (we / sit) down than the film started.", accept: ["had we sat"], why: "No sooner + had + subject + V3 … than." },
      { type: "text", q: "Rarely ___ (he / be) late for training.", accept: ["is he", "was he", "has he been"], why: "After Rarely, use inversion: is he / was he / has he been." },
      { type: "choice", q: "Hardly had the concert begun ___ the lights went out.", opts: ["than", "when", "that"], a: 1, why: "Hardly goes with when (than goes with No sooner)." },
      { type: "choice", q: "Only after the match ___ how tired I was.", opts: ["I realised", "did I realise", "I did realise"], a: 1, why: "Only after …: inversion in the main part, did I realise." },
      { type: "text", q: "Not until I moved to London ___ (I / understand) how big a city can be.", accept: ["did I understand"], why: "Not until + clause, then inversion: did I understand." },
      { type: "choice", q: "Little ___ that the party was for her.", opts: ["she knew", "did she know", "knew she"], a: 1, why: "Little at the start (= not at all) needs inversion with did." },
      { type: "text", q: "Under no circumstances ___ (you / should / open) this door.", accept: ["should you open"], why: "Under no circumstances + modal + subject + V." }
    ]
  },
  {
    id: "b2-participle-clauses", level: "B2", title: "Participle clauses",
    rule: {
      intro: "A participle clause replaces a full clause and makes the text shorter. It is like participle phrases in Russian. The clause and the main part must have the same subject.",
      blocks: [
        { h: "Present Participle (V-ing)", rows: [
          ["action at the same time / reason", "Hearing the news, she burst into tears."],
          ["instead of who/which + Continuous", "The boy sitting next to Anna is my cousin."],
          ["negative: Not + V-ing", "Not knowing what to say, I stayed silent."]
        ] },
        { h: "Past Participle (V3): passive meaning", rows: [
          ["instead of which was / were + V3", "The photos taken on our trip are amazing."],
          ["at the start of a sentence", "Built in 1889, the Eiffel Tower is visited by millions."]
        ] },
        { h: "Perfect Participle (Having + V3)", rows: [
          ["the action finished earlier", "Having finished my homework, I went out."],
          ["how long, before another action", "Having waited for an hour, we decided to walk."]
        ] }
      ],
      tips: [
        "A \"dangling\" participle is a serious mistake: \"Walking down the street, a dog bit me\" means the dog was walking down the street. Correct: \"Walking down the street, I was bitten by a dog\".",
        "V-ing has an active meaning (the one who does it). V3 has a passive meaning (the thing that was done): \"a boring film\" / \"a book written by a teen\".",
        "Put not before the participle: \"Not having read the book…\", not \"Having not…\" (the second form exists, but the first is safer)."
      ]
    },
    items: [
      { type: "choice", q: "___ the homework, I went out with my friends.", opts: ["Having finished", "Finished", "Being finished"], a: 0, why: "The action finished before another one: Having + V3." },
      { type: "choice", q: "The boy ___ next to Anna is my cousin.", opts: ["sitting", "who sitting", "sits"], a: 0, why: "The V-ing participle replaces who is sitting." },
      { type: "choice", q: "___ in 1889, the Eiffel Tower is visited by millions every year.", opts: ["Built", "Building", "Having built"], a: 0, why: "People built the tower, so the meaning is passive: V3." },
      { type: "text", q: "___ (not / know) what to say, I stayed silent.", accept: ["not knowing"], why: "A negative participle clause: Not + V-ing." },
      { type: "choice", q: "___ the news, she burst into tears.", opts: ["Hearing", "Heard", "To hear"], a: 0, why: "An active action at the same time, with the same subject: V-ing." },
      { type: "text", q: "The book ___ (write) by a 16-year-old became a bestseller.", accept: ["written"], why: "Someone wrote the book, so the meaning is passive: V3 (= which was written)." },
      { type: "choice", q: "Which sentence is correct?", opts: ["Walking down the street, a dog bit me.", "Walking down the street, I was bitten by a dog.", "Walked down the street, I was bitten by a dog."], a: 1, why: "The clause and the main part have the same subject (I). The action is active, so use V-ing." },
      { type: "text", q: "___ (wait) for the bus for an hour, we decided to walk.", accept: ["having waited", "having been waiting"], why: "A long action before another one: Having + V3 (or Having been + V-ing)." },
      { type: "choice", q: "Students ___ to take part in the olympiad must register by Friday.", opts: ["wishing", "wished", "wish"], a: 0, why: "V-ing replaces who wish: active meaning." },
      { type: "text", q: "The photos ___ (take) on our trip are amazing.", accept: ["taken"], why: "Someone took the photos, so it's passive: V3 (= which were taken)." }
    ]
  },
  {
    id: "b2-linkers", level: "B2", title: "Linking words: although / despite / however / whereas",
    rule: {
      intro: "Linking words show contrast. The key thing is what comes after the linker: a full clause, a noun, or a comma.",
      blocks: [
        { h: "+ clause (subject + verb)", rows: [
          ["although / even though / though", "Although it was raining, we went for a walk."],
          ["whereas / while: comparing two facts", "Tom is outgoing, whereas his brother is shy."]
        ] },
        { h: "+ noun or V-ing", rows: [
          ["despite + noun / V-ing", "Despite the rain, we went out. Despite feeling tired, she ran."],
          ["in spite of + noun / V-ing", "In spite of the cold, we swam."],
          ["despite the fact that + clause", "Despite the fact that he was ill, he played."]
        ] },
        { h: "Linking two sentences", rows: [
          ["However, … (at the start, with a comma)", "I studied hard. However, I didn't pass."],
          ["…, however, … (in the middle)", "My sister, however, prefers art."]
        ] }
      ],
      tips: [
        "There is no \"despite of\": use either despite or in spite of. \"Despite the cold\", not \"Despite of the cold\".",
        "Don't put although before a noun: \"Although the rain\" is a mistake. Correct: \"Despite the rain\" or \"Although it rained\".",
        "However can't join two sentences with a comma like but: \"I tried, however I failed\" is a mistake. You need a full stop or a semicolon: \"I tried; however, I failed\"."
      ]
    },
    items: [
      { type: "choice", q: "___ it was raining, we went for a walk.", opts: ["Despite", "Although", "However"], a: 1, why: "A full clause comes next (it was raining), so use although." },
      { type: "choice", q: "___ the rain, we went for a walk.", opts: ["Although", "Despite", "Even though"], a: 1, why: "A noun comes next, so use despite." },
      { type: "choice", q: "I love science. My sister, ___, prefers art.", opts: ["however", "although", "despite"], a: 0, why: "It links two sentences and stands in the middle between commas: however." },
      { type: "choice", q: "Tom is very outgoing, ___ his brother is shy.", opts: ["whereas", "despite", "however"], a: 0, why: "Comparing two facts inside one sentence: whereas." },
      { type: "text", q: "Despite ___ (feel) tired, she finished the race.", accept: ["feeling"], why: "After despite, use V-ing." },
      { type: "choice", q: "In spite ___ the fact that he was ill, he played in the final.", opts: ["of", "that", "the"], a: 0, why: "It's a fixed phrase: in spite of." },
      { type: "text", q: "I studied hard. ___, I didn't pass. (one word, starts with H)", accept: ["however"], why: "It links two sentences at the start of the second one: However, with a comma." },
      { type: "choice", q: "Which sentence is correct?", opts: ["Despite of the cold, we swam.", "Despite the cold, we swam.", "Although the cold, we swam."], a: 1, why: "Despite has no of, and although needs a full clause." },
      { type: "text", q: "Kate was the best player on the team ___ being the youngest. (one word)", accept: ["despite"], why: "One word before V-ing: despite." },
      { type: "choice", q: "___ he's only 15, he already speaks three languages.", opts: ["Even though", "Despite", "However", "In spite of"], a: 0, why: "A full clause comes next (he's only 15), so use even though." }
    ]
  }
);
