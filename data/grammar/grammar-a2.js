window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "a2-present-simple-vs-continuous", level: "A2", title: "Present Simple vs Present Continuous",
    rule: {
      intro: "Present Simple is for things that happen regularly: habits and facts. Present Continuous is for things that are happening right now or around this time.",
      blocks: [
        { h: "Present Simple: habits and facts", rows: [
          ["I / you / we / they + V", "I play football on Saturdays."],
          ["he / she / it + V-s", "She walks to school every day."],
          ["negative: don't / doesn't + V", "He doesn't like coffee."],
          ["question: Do / Does + subject + V", "Do you live near here?"]
        ] },
        { h: "Present Continuous: now", rows: [
          ["am / is / are + V-ing", "I'm doing my homework now."],
          ["negative: am not / isn't / aren't + V-ing", "They aren't watching TV."],
          ["question: Am / Is / Are + subject + V-ing", "Is it raining?"]
        ] },
        { h: "Signal words", rows: [
          ["Simple: always, usually, often, every day, on Mondays", "We often go to the cinema."],
          ["Continuous: now, at the moment, Look!, Listen!", "Look! The bus is coming."]
        ] }
      ],
      tips: [
        "Don't forget -s with he/she/it: not \"She play tennis\" but \"She plays tennis\".",
        "State verbs (know, like, love, want, understand) are usually not used in Continuous: not \"I am knowing\" but \"I know\".",
        "Continuous needs the verb be. In Russian we don't use this verb, but in English you need it: not \"I reading now\" but \"I'm reading now\"."
      ]
    },
    items: [
      { type: "choice", q: "Listen! Somebody ___ the piano upstairs.", opts: ["plays", "is playing", "play"], a: 1, why: "Listen! means it is happening right now, so we need Present Continuous." },
      { type: "choice", q: "My brother ___ football every Saturday.", opts: ["plays", "is playing", "play"], a: 0, why: "Every Saturday is a regular action, so Present Simple; he → plays." },
      { type: "choice", q: "I ___ what you mean.", opts: ["understand", "am understanding", "understands"], a: 0, why: "Understand is a state verb. We don't use it in Continuous." },
      { type: "choice", q: "Look! It ___ outside. Take an umbrella.", opts: ["rains", "is raining", "rain"], a: 1, why: "Look! means it is raining now, so Present Continuous." },
      { type: "text", q: "She usually ___ (walk) to school.", accept: ["walks"], why: "Usually shows a habit, so Present Simple; she → add -s." },
      { type: "text", q: "We ___ (not / watch) TV right now, we are doing our homework.", accept: ["aren't watching", "are not watching"], why: "Right now needs Present Continuous: are not + V-ing." },
      { type: "text", q: "How often ___ (you / go) to the cinema?", accept: ["do you go"], why: "How often asks about a regular action, so Present Simple: do + you + V." },
      { type: "choice", q: "At the moment Kate ___ for her exam.", opts: ["studies", "is studying", "study"], a: 1, why: "At the moment means now, so Present Continuous." },
      { type: "choice", q: "Water ___ at 100 degrees.", opts: ["boils", "is boiling", "boil"], a: 0, why: "This is a scientific fact, so Present Simple; water (it) → boils." },
      { type: "text", q: "Shh! The baby ___ (sleep).", accept: ["is sleeping"], why: "Shh! means it is happening now: is + sleeping." }
    ]
  },
  {
    id: "a2-past-simple", level: "A2", title: "Past Simple (regular and irregular verbs)",
    rule: {
      intro: "Past Simple is for a finished action in the past. We often say when it happened: yesterday, last week, two days ago, in 2020.",
      blocks: [
        { h: "Positive", rows: [
          ["regular verbs: V + -ed", "We watched a film yesterday."],
          ["study → studied, stop → stopped", "I studied all evening."],
          ["irregular verbs: 2nd form", "go → went, buy → bought, see → saw"]
        ] },
        { h: "Negative and question", rows: [
          ["didn't + V (base form)", "She didn't call me."],
          ["Did + subject + V?", "Did you see the match?"],
          ["Wh- + did + subject + V?", "Where did you go last summer?"]
        ] },
        { h: "The verb be", rows: [
          ["I / he / she / it + was", "I was at home yesterday."],
          ["you / we / they + were", "Were you at the party?"]
        ] }
      ],
      tips: [
        "After did / didn't, use the base form of the verb: not \"Did you went?\" but \"Did you go?\"",
        "Don't add -ed to irregular verbs: not \"goed\" but \"went\". You need to learn the list of irregular verbs.",
        "With ago, yesterday, last … use Past Simple, not Present Perfect: \"I saw him two days ago.\""
      ]
    },
    items: [
      { type: "choice", q: "We ___ to Sochi last summer.", opts: ["go", "went", "goed", "gone"], a: 1, why: "Go is an irregular verb. Its second form is went." },
      { type: "text", q: "I ___ (buy) new headphones yesterday.", accept: ["bought"], why: "Buy is an irregular verb: buy → bought." },
      { type: "text", q: "She ___ (not / call) me last night.", accept: ["didn't call", "did not call"], why: "Negative: didn't + the base form of the verb." },
      { type: "choice", q: "___ you see the match on Sunday?", opts: ["Do", "Did", "Were"], a: 1, why: "On Sunday is in the past. A question with the verb see uses Did." },
      { type: "choice", q: "He didn't ___ his homework.", opts: ["do", "did", "does"], a: 0, why: "After didn't, use the base form of the verb." },
      { type: "text", q: "They ___ (stop) the car near the river.", accept: ["stopped"], why: "Stop → stopped: after a short stressed syllable, we double the last consonant." },
      { type: "choice", q: "Where ___ you yesterday evening?", opts: ["was", "were", "did"], a: 1, why: "The verb be in the past: you → were." },
      { type: "text", q: "We ___ (study) for the test all weekend.", accept: ["studied"], why: "Study → studied: y after a consonant changes to i." },
      { type: "choice", q: "My parents ___ married in 2005.", opts: ["get", "got", "getted"], a: 1, why: "In 2005 is in the past; get → got." },
      { type: "choice", q: "I ___ a great film two days ago.", opts: ["see", "saw", "have seen", "seen"], a: 1, why: "Ago shows an exact time in the past, so we need Past Simple: saw." }
    ]
  },
  {
    id: "a2-past-continuous", level: "A2", title: "Past Continuous",
    rule: {
      intro: "Past Continuous is for an action that was in progress at a certain moment in the past. Often a short action in Past Simple interrupts it.",
      blocks: [
        { h: "Form", rows: [
          ["I / he / she / it + was + V-ing", "I was reading at 9 p.m."],
          ["you / we / they + were + V-ing", "They were playing football."],
          ["wasn't / weren't + V-ing", "We weren't sleeping."],
          ["Was / Were + subject + V-ing?", "What were you doing?"]
        ] },
        { h: "When to use it", rows: [
          ["an action in progress at a moment in the past", "At 8 p.m. yesterday I was having dinner."],
          ["a long action is interrupted by a short one (when)", "I was walking home when I met Max."],
          ["two actions in progress at the same time (while)", "While I was cooking, she was setting the table."]
        ] }
      ],
      tips: [
        "The long background action is Past Continuous, the short event is Past Simple: not \"I walked when I was meeting him\" but \"I was walking when I met him\".",
        "Be careful with was/were: not \"they was\" but \"they were\".",
        "After while we usually have an action in progress: \"While we were listening to music, the lights went out.\""
      ]
    },
    items: [
      { type: "choice", q: "At 8 p.m. yesterday I ___ dinner.", opts: ["was having", "were having", "am having"], a: 0, why: "An action in progress at a moment in the past; I → was + V-ing." },
      { type: "choice", q: "While we ___ to music, the lights went out.", opts: ["are listening", "were listening", "was listening"], a: 1, why: "A long action in the past; we → were + V-ing." },
      { type: "text", q: "She ___ (read) a book when I came in.", accept: ["was reading"], why: "A long action that was interrupted: was + V-ing." },
      { type: "text", q: "They ___ (not / sleep) at midnight.", accept: ["weren't sleeping", "were not sleeping"], why: "An action in progress at a moment in the past, negative: weren't + V-ing." },
      { type: "choice", q: "I was walking home when I ___ my old friend.", opts: ["was meeting", "met", "meet"], a: 1, why: "A short event that interrupted the long action is Past Simple." },
      { type: "choice", q: "What ___ you doing at 10 o'clock last night?", opts: ["did", "were", "was"], a: 1, why: "A question in Past Continuous: were + you + V-ing." },
      { type: "text", q: "It ___ (rain) when we left school.", accept: ["was raining"], why: "This is the background in the past (the rain was going on): was + V-ing." },
      { type: "choice", q: "When the teacher came in, the students ___ loudly.", opts: ["are talking", "were talking", "was talking"], a: 1, why: "The talking was already going on when the teacher came in; students → were." },
      { type: "choice", q: "Tom ___ his phone when he was riding his bike.", opts: ["dropped", "was dropping", "drops"], a: 0, why: "Dropping the phone is a short event during a longer action, so Past Simple." },
      { type: "text", q: "While Anna ___ (cook), her brother was setting the table.", accept: ["was cooking"], why: "Two actions in progress at the same time: was + V-ing." }
    ]
  },
  {
    id: "a2-comparatives", level: "A2", title: "Comparatives and superlatives",
    rule: {
      intro: "The comparative compares two things (bigger, better). The superlative shows that one thing is the most in a group (the biggest).",
      blocks: [
        { h: "Short adjectives", rows: [
          ["adj + -er + than", "Moscow is bigger than Kazan."],
          ["the + adj + -est", "It's the hottest day of the year."],
          ["easy → easier → the easiest", "This test is easier."]
        ] },
        { h: "Long adjectives", rows: [
          ["more + adj + than", "My phone is more expensive than yours."],
          ["the most + adj", "Maths is the most interesting subject."]
        ] },
        { h: "Exceptions and as … as", rows: [
          ["good → better → the best", "This is the best pizza in town."],
          ["bad → worse → the worst", "Today is worse than yesterday."],
          ["(not) as + adj + as", "I'm not as tall as my brother."]
        ] }
      ],
      tips: [
        "Olympiad trap \"most largest\": the ending -est already means \"the most\", so don't add most. Say the largest city (not the most largest) and better (not more better).",
        "Don't mix the two ways: not \"more easier\" but \"easier\".",
        "After a comparative use than, not that or as: \"She is older than me.\"",
        "You need the before a superlative: not \"most beautiful city\" but \"the most beautiful city\"."
      ]
    },
    items: [
      { type: "choice", q: "This test is ___ than the last one.", opts: ["easy", "easier", "more easy", "easiest"], a: 1, why: "Easy → easier: y changes to i, then add -er." },
      { type: "text", q: "Moscow is ___ (big) than Kazan.", accept: ["bigger"], why: "Big → bigger: we double the last consonant." },
      { type: "text", q: "This is the ___ (good) pizza in town.", accept: ["best"], why: "Good → better → the best is an exception." },
      { type: "choice", q: "My phone is ___ than yours.", opts: ["more expensive", "expensiver", "most expensive"], a: 0, why: "Expensive is a long adjective: more + adj + than." },
      { type: "choice", q: "Everest is ___ mountain in the world.", opts: ["the highest", "higher", "the most high"], a: 0, why: "It is the highest of all, so we need the superlative: the highest." },
      { type: "text", q: "Today is ___ (bad) than yesterday.", accept: ["worse"], why: "Bad → worse → the worst is an exception." },
      { type: "choice", q: "Maths is ___ interesting subject for me.", opts: ["most", "the most", "more"], a: 1, why: "The superlative of a long adjective: the most + adj." },
      { type: "choice", q: "My sister is not as tall ___ me.", opts: ["than", "as", "that"], a: 1, why: "The pattern is as … as: not as tall as." },
      { type: "text", q: "It's the ___ (hot) day of the year.", accept: ["hottest"], why: "Hot → the hottest: we double the last consonant." },
      { type: "choice", q: "Your English is getting ___!", opts: ["better and better", "more good", "gooder"], a: 0, why: "Good → better. To say that something keeps improving, use better and better." }
    ]
  },
  {
    id: "a2-will-going-to", level: "A2", title: "Future: will vs be going to",
    rule: {
      intro: "Will is for a decision made at the moment of speaking, a promise, or a prediction based on opinion. Be going to is for a plan you already have, or a prediction based on what you can see.",
      blocks: [
        { h: "Form", rows: [
          ["will / won't + V", "I'll help you. I won't tell anyone."],
          ["am / is / are + going to + V", "We're going to visit Paris."],
          ["isn't / aren't going to + V", "He isn't going to study medicine."]
        ] },
        { h: "Will", rows: [
          ["a decision made right now", "The phone is ringing! — I'll answer it."],
          ["a promise, an offer to help", "I promise I won't be late."],
          ["a prediction based on opinion (I think, maybe)", "Maybe people will live on Mars."]
        ] },
        { h: "Be going to", rows: [
          ["a plan made earlier", "I've saved money. I'm going to buy a laptop."],
          ["a prediction based on what we see", "Look at those clouds! It's going to rain."]
        ] }
      ],
      tips: [
        "After will, use the verb without to: not \"I will to go\" but \"I will go\".",
        "Going to needs the verb be: not \"I going to\" but \"I'm going to\".",
        "If the decision was made before the conversation, use going to: \"We've bought tickets. We're going to fly to Rome.\""
      ]
    },
    items: [
      { type: "choice", q: "Look at those black clouds! It ___ rain.", opts: ["will", "is going to", "rains"], a: 1, why: "A prediction based on what we see (the clouds), so be going to." },
      { type: "choice", q: "— I'm thirsty. — Wait, I ___ get you some water.", opts: ["will", "am going to", "going to"], a: 0, why: "The decision to help is made right now, so will." },
      { type: "text", q: "We have bought tickets. We ___ (visit) Paris in May.", accept: ["are going to visit", "are visiting"], why: "The tickets are already bought, so it is a plan: are going to visit. For an arrangement you can also use Present Continuous: are visiting." },
      { type: "choice", q: "I promise I ___ tell anyone.", opts: ["won't", "not going to", "don't"], a: 0, why: "A promise uses will; the negative is won't." },
      { type: "text", q: "The phone is ringing! — ___ (I / answer) it.", accept: ["I'll answer", "I will answer"], why: "A decision at the moment of speaking uses will: I'll answer." },
      { type: "choice", q: "She has saved money because she ___ buy a new laptop.", opts: ["will", "is going to", "going"], a: 1, why: "She is already saving money, so the plan was made earlier: be going to." },
      { type: "choice", q: "Maybe people ___ live on Mars one day.", opts: ["will", "is going to", "are live"], a: 0, why: "A guess with nothing we can see (maybe), so will." },
      { type: "text", q: "He ___ (be going to / not / study) medicine. He has decided to become a designer.", accept: ["isn't going to study", "is not going to study"], why: "The decision is already made, so be going to; the negative is isn't going to." },
      { type: "choice", q: "Oh no, I forgot my wallet! — Don't worry, I ___ pay for you.", opts: ["will", "am going to", "pay"], a: 0, why: "An offer to help, decided at the moment of speaking, uses will." },
      { type: "choice", q: "What ___ you going to do after school?", opts: ["are", "will", "do"], a: 0, why: "Going to needs be: are you going to." }
    ]
  },
  {
    id: "a2-quantifiers", level: "A2", title: "some / any / much / many / a lot of",
    rule: {
      intro: "These words show quantity. Your choice depends on the type of sentence and on whether you can count the thing.",
      blocks: [
        { h: "some / any", rows: [
          ["some — positive sentences", "I've got some friends in Spain."],
          ["any — questions and negatives", "Are there any cafés here? There isn't any milk."],
          ["some — requests and offers", "Would you like some tea? Can I have some water?"]
        ] },
        { h: "much / many / a lot of", rows: [
          ["many + countable nouns (plural)", "How many apples do you need?"],
          ["much + uncountable nouns", "We don't have much time."],
          ["a lot of — with any noun, more often in positive sentences", "There are a lot of people here."]
        ] }
      ],
      tips: [
        "Olympiad trap \"no any\": after no you don't need a second negative word. Say There is no milk (not no any milk). Also, a few is not the same as few: a few friends means some friends (enough), few friends means not many (almost none).",
        "Money, time, water and information are uncountable: not \"many money\" but \"much money\".",
        "In positive sentences a lot of is better than much: not \"I have much homework\" but \"I have a lot of homework\".",
        "In polite requests and offers use some, even though it is a question: \"Would you like some cake?\""
      ]
    },
    items: [
      { type: "choice", q: "There isn't ___ milk in the fridge.", opts: ["some", "any", "many"], a: 1, why: "It is a negative, so any. Milk is uncountable, so many doesn't fit." },
      { type: "choice", q: "How ___ apples do you need?", opts: ["much", "many", "any"], a: 1, why: "Apples are countable, so How many." },
      { type: "choice", q: "How ___ money have you got?", opts: ["many", "much", "a lot"], a: 1, why: "Money is uncountable, so How much." },
      { type: "text", q: "Can I have ___ (some / any) water, please?", accept: ["some"], why: "A polite request uses some." },
      { type: "choice", q: "She has got ___ friends at school.", opts: ["a lot of", "much", "any"], a: 0, why: "A positive sentence with a countable noun, so a lot of." },
      { type: "text", q: "We don't have ___ (much / many) time.", accept: ["much"], why: "Time is uncountable, so much." },
      { type: "text", q: "Are there ___ (some / any) good cafés near here?", accept: ["any"], why: "A normal question uses any." },
      { type: "choice", q: "I don't eat ___ sweets.", opts: ["much", "many", "some"], a: 1, why: "Sweets are countable and plural; in a negative, use many." },
      { type: "choice", q: "There are ___ people in the park today.", opts: ["much", "a lot of", "any"], a: 1, why: "A positive sentence, and people is countable, so a lot of." },
      { type: "text", q: "Would you like ___ (some / any) tea?", accept: ["some"], why: "An offer (Would you like…?) uses some." }
    ]
  },
  {
    id: "a2-present-perfect", level: "A2", title: "Present Perfect: ever, never, just, already, yet",
    rule: {
      intro: "Present Perfect connects the past with the present. The result or the experience is important, not the exact time.",
      blocks: [
        { h: "Form", rows: [
          ["have / has + V3", "I have seen this film."],
          ["haven't / hasn't + V3", "She hasn't finished yet."],
          ["Have / Has + subject + V3?", "Have you ever been to London?"]
        ] },
        { h: "Signal words", rows: [
          ["ever — at any time (in questions)", "Have you ever eaten sushi?"],
          ["never — at no time", "I have never flown."],
          ["just — a very short time ago", "They have just arrived."],
          ["already — before now, earlier than expected", "We have already seen it."],
          ["yet — up to now (negatives and questions); at the end", "I haven't done it yet. Have you finished yet?"]
        ] }
      ],
      tips: [
        "With an exact past time (yesterday, last year, ago) use Past Simple: not \"I have been there last year\" but \"I went there last year\".",
        "Ever, never, just and already go between have and V3, but yet goes at the end: \"I have just eaten\", \"I haven't eaten yet\".",
        "Been to means went and came back; gone to means went and is still there: \"She has been to Italy\" (experience)."
      ]
    },
    items: [
      { type: "choice", q: "Have you ___ been to London?", opts: ["ever", "never", "yet"], a: 0, why: "A question about experience (at any time in your life) uses ever." },
      { type: "text", q: "I have ___ (never / ever) eaten sushi.", accept: ["never"], why: "A positive sentence that means \"not at any time\" uses never." },
      { type: "choice", q: "She has ___ finished her homework. She's free now.", opts: ["just", "yet", "ever"], a: 0, why: "She finished a very short time ago, so just. Yet goes at the end, and ever is for questions." },
      { type: "choice", q: "I haven't done my project ___.", opts: ["already", "yet", "just"], a: 1, why: "In a negative, at the end of the sentence, use yet (\"not up to now\")." },
      { type: "text", q: "We ___ (already / see) this film.", accept: ["have already seen"], why: "have + already + V3: see → seen." },
      { type: "text", q: "He ___ (not / finish) the book yet.", accept: ["hasn't finished", "has not finished"], why: "He → has; negative: hasn't + V3." },
      { type: "choice", q: "Oh no! Somebody ___ my bike!", opts: ["has stolen", "have stolen", "stealed"], a: 0, why: "The result now is important; somebody → has; steal → stolen." },
      { type: "choice", q: "Has she ___ to Italy?", opts: ["be", "been", "was"], a: 1, why: "After has, use the third form: been." },
      { type: "text", q: "They ___ (just / arrive).", accept: ["have just arrived"], why: "have + just + V3: arrive → arrived." },
      { type: "choice", q: "I ___ to Paris last year.", opts: ["have been", "went", "have gone"], a: 1, why: "Last year is an exact time in the past, so we need Past Simple." }
    ]
  },
  {
    id: "a2-must-have-to-should", level: "A2", title: "must / have to / should",
    rule: {
      intro: "Must and have to show that something is necessary. Should gives advice. Mustn't means it is not allowed, but don't have to means it is not necessary.",
      blocks: [
        { h: "Necessity and rules", rows: [
          ["must + V — necessary (the speaker thinks so, or it is a rule)", "I must call my grandma."],
          ["have to / has to + V — necessary (because of the situation)", "She has to wear a uniform."],
          ["mustn't + V — not allowed", "You mustn't cross the road on a red light."],
          ["don't / doesn't have to + V — not necessary", "I don't have to get up early on Sunday."]
        ] },
        { h: "Advice", rows: [
          ["should / shouldn't + V", "You should go to bed early."],
          ["Should I …? — asking for advice", "Should I take an umbrella?"]
        ] },
        { h: "Past and questions", rows: [
          ["had to + V — it was necessary", "Yesterday I had to wait an hour."],
          ["Do / Does … have to …?", "Do we have to bring our books?"]
        ] }
      ],
      tips: [
        "After must and should, use the verb without to: not \"You must to go\" but \"You must go\".",
        "Mustn't is not the same as don't have to: \"You mustn't run\" means running is not allowed; \"You don't have to run\" means you can run if you want, but it is not necessary.",
        "Must has no past form, so use had to: \"I had to stay at home.\""
      ]
    },
    items: [
      { type: "choice", q: "You look tired. You ___ go to bed early.", opts: ["should", "must to", "have"], a: 0, why: "This is advice, so should + verb without to." },
      { type: "choice", q: "Students ___ use phones during exams. It's a school rule.", opts: ["mustn't", "don't have to", "shouldn't to"], a: 0, why: "A rule that forbids something uses mustn't (\"not allowed\")." },
      { type: "choice", q: "Tomorrow is Sunday, so I ___ get up early.", opts: ["mustn't", "don't have to", "haven't to"], a: 1, why: "It is not necessary, so don't have to." },
      { type: "text", q: "She ___ (have to) wear a uniform at her school.", accept: ["has to"], why: "She → has to." },
      { type: "text", q: "You ___ (not / should) eat so much fast food.", accept: ["shouldn't", "should not"], why: "Advice not to do something uses shouldn't + V." },
      { type: "choice", q: "___ we have to bring our books tomorrow?", opts: ["Do", "Must", "Should"], a: 0, why: "A question with have to uses Do." },
      { type: "text", q: "Yesterday I ___ (have to) wait for the bus for an hour.", accept: ["had to"], why: "Necessity in the past uses had to." },
      { type: "choice", q: "You ___ cross the road when the light is red. It's dangerous!", opts: ["mustn't", "don't have to", "must"], a: 0, why: "It is dangerous, so it is not allowed: mustn't." },
      { type: "choice", q: "He ___ study harder if he wants to pass.", opts: ["should", "shoulds", "should to"], a: 0, why: "Should never changes its form (no -s) and is used without to." },
      { type: "text", q: "My dad ___ (not / have to) work on Saturdays.", accept: ["doesn't have to", "does not have to"], why: "He → doesn't have to: it is not necessary for him." }
    ]
  }
);
