window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-collocations", group: "Collocations & idioms",
    title: "Collocations: make / do, take / have, heavy rain, strong coffee…",
    rule: {
      intro: "These tasks check fixed word pairs: which verb or adjective “goes with” a noun. Do not translate word for word from Russian. Learn the pairs as a whole.",
      blocks: [
        { h: "Make or do", rows: [
          ["make a mistake / a decision / a profit / a difference", "make = we create a result: She made a mistake."],
          ["do homework / the shopping / someone a favour / one's best", "do = we perform an action or a job: Could you do me a favour?"],
          ["make friends / an effort / a noise / progress", "He made a lot of progress this year."]
        ] },
        { h: "Take or have", rows: [
          ["take / have a break, a shower, a look", "both are possible (take is more common in AmE): Let's take a break."],
          ["take a photo / an exam / part in / place", "only take: The concert took place in May."],
          ["have breakfast / a party / a good time / fun", "only have: We had a great time."]
        ] },
        { h: "Adjective + noun", rows: [
          ["heavy rain / traffic / smoker", "a lot of something; not strong rain: heavy traffic."],
          ["strong coffee / wind / accent", "with a lot of power or taste: strong coffee."],
          ["high temperature, deep sleep, bitter disappointment", "high price, not expensive price."]
        ] }
      ],
      tips: [
        "Not sure about make/do? do is for jobs and tasks (do the washing), make is for something new that you create (make a cake).",
        "The Russian word for “strong” is not always strong in English: a lot of rain is heavy rain, very bad pain is severe/sharp pain.",
        "Learn word pairs inside sentences: I made a decision, not I did a decision."
      ]
    },
    items: [
      { type: "choice", q: "Could you ___ me a favour and close the window?", opts: ["make", "do", "give", "take"], a: 1, why: "do someone a favour is a fixed phrase." },
      { type: "choice", q: "We were caught in ___ rain on the way home.", opts: ["heavy", "strong", "thick", "big"], a: 0, why: "A lot of rain is heavy rain, not strong rain." },
      { type: "text", q: "She ___ two silly mistakes in the last exercise. (past tense)", accept: ["made"], why: "make a mistake → made." },
      { type: "text", q: "We need to ___ a final decision by Friday.", accept: ["make", "take", "reach", "come to"], why: "make a decision (BrE also allows take a decision; you can also reach / come to a decision)." },
      { type: "choice", q: "I can't sleep if I drink ___ coffee in the evening.", opts: ["strong", "powerful", "heavy", "thick"], a: 0, why: "Coffee with a lot of taste is strong coffee." },
      { type: "text", q: "Let's ___ a short break — we've been working for three hours.", accept: ["take", "have"], why: "take a break / have a break are both correct." },
      { type: "choice", q: "He ___ all his homework in twenty minutes.", opts: ["did", "made", "took", "had"], a: 0, why: "do homework → did." },
      { type: "choice", q: "The company ___ a profit for the first time last year.", opts: ["did", "made", "took", "had"], a: 1, why: "make a profit → made (not do a profit)." },
      { type: "choice", q: "My grandfather was a ___ smoker; he got through two packs a day.", opts: ["heavy", "strong", "large", "thick"], a: 0, why: "A person who smokes a lot is a heavy smoker." },
      { type: "text", q: "Don't worry, it doesn't ___ any difference to me.", accept: ["make"], why: "make a difference = matter, be important." }
    ]
  },
  {
    id: "lx-idioms", group: "Collocations & idioms",
    title: "Idioms: body, animals, colours, theatre",
    rule: {
      intro: "You cannot understand an idiom from its single words: the whole phrase has the meaning. At the olympiad one key word is usually missing, so remember the whole phrase.",
      blocks: [
        { h: "Parts of the body", rows: [
          ["not bat an eyelid", "show no surprise at all: He didn't bat an eyelid at the price."],
          ["catch someone red-handed", "catch someone while they are doing something wrong: She was caught red-handed."],
          ["pull someone's leg", "joke with someone, trick them for fun: Are you pulling my leg?"]
        ] },
        { h: "Animals", rows: [
          ["let the cat out of the bag", "tell a secret by mistake: Who let the cat out of the bag?"],
          ["a white elephant", "an expensive thing that is no use: The stadium became a white elephant."],
          ["the lion's share", "the biggest part: He took the lion's share of the profit."]
        ] },
        { h: "Colours and more", rows: [
          ["green with envy", "very jealous: She was green with envy."],
          ["under the weather", "a little ill: I'm a bit under the weather."],
          ["beat about the bush; a piece of cake", "not say directly what you mean; very easy"]
        ] },
        { h: "Theatre", rows: [
          ["break a leg", "good luck (to an actor before a show): Break a leg tonight!"],
          ["steal the show", "get the most attention, be the best: The child actor stole the show."],
          ["behind the scenes", "secretly, where the public cannot see: deals made behind the scenes"]
        ] }
      ],
      tips: [
        "Colours in idioms are not the same as in Russian: envy is green (green with envy), not yellow.",
        "Look for clues in the context: “on stage”, “before the show” → a theatre idiom (break a leg).",
        "Learn an idiom with a little story: The surprise was ruined when Tom let the cat out of the bag."
      ]
    },
    items: [
      { type: "choice", q: "\"Break a ___!\" the director whispered to the actors before the curtain went up.", opts: ["leg", "arm", "neck", "nail"], a: 0, why: "Break a leg = good luck (said to an actor)." },
      { type: "text", q: "I'm feeling a bit under the ___ today, so I'll stay at home.", accept: ["weather"], why: "under the weather = a little ill." },
      { type: "choice", q: "When she saw the bill, she didn't bat an ___.", opts: ["eyelid", "ear", "eyebrow", "nose"], a: 0, why: "not bat an eyelid = show no surprise at all." },
      { type: "text", q: "Stop beating about the ___ and tell me what really happened.", accept: ["bush"], why: "beat about the bush = not say directly what you mean." },
      { type: "choice", q: "The old castle is a ___ elephant: it costs a fortune to maintain and nobody uses it.", opts: ["white", "grey", "pink", "black"], a: 0, why: "white elephant = an expensive thing that is no use." },
      { type: "text", q: "The boy was caught red-___ taking biscuits from the jar.", accept: ["handed"], why: "red-handed = while doing something wrong." },
      { type: "choice", q: "When she got the job, her rival was ___ with envy.", opts: ["green", "red", "blue", "yellow"], a: 0, why: "green with envy = very jealous." },
      { type: "text", q: "The youngest dancer stole the ___ — everyone was talking about her afterwards.", accept: ["show"], why: "steal the show = get the most attention, be the best." },
      { type: "choice", q: "After all that practice, the exam was a piece of ___ for her.", opts: ["cake", "pie", "bread", "biscuit"], a: 0, why: "a piece of cake = very easy." },
      { type: "text", q: "Don't let the ___ out of the bag — the party is supposed to be a surprise!", accept: ["cat"], why: "let the cat out of the bag = tell a secret by mistake." }
    ]
  },
  {
    id: "lx-one-word", group: "Word play",
    title: "One word, three sentences (homonyms)",
    rule: {
      intro: "One word in the same form fits all three gaps, but it means something different in each sentence. Look for a word with several meanings.",
      blocks: [
        { h: "How to find it", rows: [
          ["Start with the most “narrow” sentence", "it has fewer possible answers: Strike a ___ to light the fire → match."],
          ["Check the part of speech", "a word can be a noun and a verb: a match / to match."],
          ["Check the form", "the form is the same for all three: if one needs -s, all of them do."]
        ] },
        { h: "Common words with many meanings", rows: [
          ["bank, spring, fair, light", "side of a river/bank for money; season/metal coil/natural water source; just/pale (hair)/market with fun; not heavy/what lets us see/set on fire"],
          ["train, match, note, present", "a vehicle on rails/practise; a stick to make fire/a game/go well together; a short message/a musical sound/notice; here, not away/a gift/now"],
          ["crane, bark, mean, play", "a lifting machine/a tall bird/stretch (your neck); a dog's sound/the outside of a tree; have a meaning/unkind, not generous/average; have fun, act/a theatre piece"]
        ] }
      ],
      tips: [
        "Try your word in all three sentences out loud. If even one sounds strange, keep looking.",
        "Remember rare meanings: crane one's neck = stretch your neck to see, a fair = an outdoor market with fun.",
        "The answer is one word with no article: bank, not the bank."
      ]
    },
    items: [
      { type: "text", q: "We had a picnic on the ___ of the river. / She opened a savings account at the local ___. / You can ___ on me — I'll be there.", accept: ["bank"], why: "bank = side of a river; a place for money; bank on = trust, depend on." },
      { type: "text", q: "The box is so ___ that a child could carry it. / Turn off the ___ before you leave. / Could you ___ the candles on the cake?", accept: ["light"], why: "light = not heavy; what lets us see; set on fire." },
      { type: "text", q: "It isn't ___ that he gets more pocket money than me. / She has ___ hair and blue eyes. / We bought wooden toys at the village ___.", accept: ["fair"], why: "fair = just, equal for all; pale (hair); an outdoor market." },
      { type: "text", q: "Strike a ___ to light the fire. / The football ___ was cancelled because of snow. / Her shoes don't ___ her dress.", accept: ["match"], why: "match = a stick to make fire; a game; go well together." },
      { type: "text", q: "Cherry trees blossom in late ___. / The old mattress has a broken ___. / We drank cold water from a mountain ___.", accept: ["spring"], why: "spring = the season; a metal coil; a natural water source." },
      { type: "text", q: "We took the early ___ to Moscow. / Athletes ___ every day before the Olympics. / I lost my ___ of thought when the phone rang.", accept: ["train"], why: "train = a vehicle on rails; practise; a line (of thought)." },
      { type: "text", q: "All the students were ___ at the meeting. / I bought her a birthday ___. / Live in the ___, not in the past.", accept: ["present"], why: "present = here, not away; a gift; now." },
      { type: "text", q: "What does this word ___? / Don't be so ___ to your little sister. / The ___ of 2, 4 and 6 is 4.", accept: ["mean"], why: "mean = have a meaning; unkind; the average." },
      { type: "text", q: "She left a ___ on the fridge. / The singer hit the high ___ perfectly. / Please ___ that the museum is closed on Mondays.", accept: ["note"], why: "note = a short message; a musical sound; notice, pay attention." },
      { type: "text", q: "A huge ___ lifted the steel beams onto the roof. / The ___ is a tall bird with long legs. / People at the back had to ___ their necks to see the stage.", accept: ["crane"], why: "crane = a lifting machine; a tall bird; stretch (your neck)." }
    ]
  },
  {
    id: "lx-compounds-definitions", group: "Word play",
    title: "Compound words and words from definitions",
    rule: {
      intro: "Two types of tasks: guess a word from its definition and first letter (the number of gaps = the number of missing letters), and build a compound adjective from several words.",
      blocks: [
        { h: "A word from a definition", rows: [
          ["Count the letters", "p_________ = 10 letters → programmer"],
          ["Suffixes for people", "-er/-or (commuter), -ist (scientist), -ant/-ent (patient)"],
          ["Match the part of speech with the definition", "“A person who…” → a noun for a person"]
        ] },
        { h: "Compound adjectives", rows: [
          ["number + singular noun", "a two-hour flight (not two-hours), a ten-storey building"],
          ["number + year + old", "a fifty-year-old man: with hyphens, year without -s"],
          ["adjective + noun + -ed", "blue-eyed, left-handed, kind-hearted"],
          ["adjective/adverb + participle", "hard-working, well-known, long-lasting"]
        ] }
      ],
      tips: [
        "A compound adjective before a noun has no plural: a five-minute walk, but The walk takes five minutes.",
        "Do not forget the hyphens: a ten-year-old girl.",
        "For definitions, check the number of gaps. It rules out synonyms: c_____ (6) is cinema, not cinematograph."
      ]
    },
    items: [
      { type: "text", q: "A person who writes computer programs: p_________", accept: ["programmer"], why: "programmer = a person who writes programs (10 letters)." },
      { type: "text", q: "A book that lists words in alphabetical order and explains their meanings: d_________", accept: ["dictionary"], why: "dictionary = a book of words and their meanings." },
      { type: "text", q: "A person who is receiving medical treatment, especially in hospital: p______", accept: ["patient"], why: "patient = a person getting medical help." },
      { type: "text", q: "A building where people go to watch films: c_____", accept: ["cinema"], why: "cinema = a place where you watch films." },
      { type: "text", q: "A person who travels a long distance to work every day: c_______", accept: ["commuter"], why: "commuter = a person who travels far to work every day." },
      { type: "text", q: "A flight that lasts two hours is a ___ flight. (TWO, HOUR)", accept: ["two-hour", "two hour"], why: "Number + singular noun with a hyphen: two-hour." },
      { type: "text", q: "A man who is fifty years old is a ___ man. (FIFTY, YEAR, OLD)", accept: ["fifty-year-old"], why: "fifty-year-old: year without -s, with hyphens." },
      { type: "text", q: "A girl with blue eyes is a ___ girl. (BLUE, EYE)", accept: ["blue-eyed"], why: "adjective + noun + -ed: blue-eyed." },
      { type: "text", q: "A building with ten floors is a ___ building. (TEN, STOREY)", accept: ["ten-storey", "ten-story", "ten-storeyed", "ten-storied"], why: "ten-storey (AmE ten-story): singular in a compound adjective." },
      { type: "text", q: "A person who always works very hard is a ___ person. (HARD, WORK)", accept: ["hard-working", "hardworking"], why: "hard-working = always working a lot." }
    ]
  },
  {
    id: "lx-error-hunt", group: "Error hunt",
    title: "Find the extra word",
    rule: {
      intro: "Each sentence has exactly one extra word. If you take it out, the sentence becomes correct. Write that word.",
      blocks: [
        { h: "Typical extra words", rows: [
          ["more better, most best", "the comparative form is already complete: better, the best"],
          ["no any", "double negative: There is no sugar / There isn't any sugar"],
          ["discuss about, enter into the room, tell to me", "verbs with no preposition: discuss the problem, enter the room"],
          ["can to, must to", "after modal verbs, use the infinitive without to: Can you help me?"]
        ] },
        { h: "Articles and auxiliary verbs", rows: [
          ["The life is short", "an abstract idea in general has no article: Life is short."],
          ["a few vs few", "a few = some (good), few = not many (bad): She has few friends, so she feels lonely."],
          ["did saw, has been lived", "one auxiliary verb, one correct form: I did see / I saw; has lived"]
        ] }
      ],
      tips: [
        "Take out your word and read the sentence again. It must be fully correct, not “almost” correct.",
        "Look at the meaning: “so she feels lonely” needs few (not many), so the extra word is a.",
        "Check verbs that have a preposition in Russian: discuss and enter have no preposition in English."
      ]
    },
    items: [
      { type: "text", q: "Find the extra word: She is more better at maths than her brother.", accept: ["more"], why: "better is already a comparative." },
      { type: "text", q: "Find the extra word: There is no any sugar left in the jar.", accept: ["any"], why: "Double negative: There is no sugar left." },
      { type: "text", q: "Find the extra word: This is the most best film I have ever seen.", accept: ["most"], why: "best is already a superlative." },
      { type: "text", q: "Find the extra word: We discussed about the problem for over an hour.", accept: ["about"], why: "discuss something has no preposition." },
      { type: "text", q: "Find the extra word: I did saw him at the station yesterday.", accept: ["did"], why: "Either I saw or I did see; with saw, did is extra." },
      { type: "text", q: "Find the extra word: She has a few friends, so she often feels lonely.", accept: ["a"], why: "The meaning is “not many” → few: She has few friends, so she feels lonely." },
      { type: "text", q: "Find the extra word: The life is too short to worry about such things.", accept: ["the"], why: "Life in general has no article." },
      { type: "text", q: "Find the extra word: He entered into the room without knocking.", accept: ["into"], why: "enter the room has no preposition." },
      { type: "text", q: "Find the extra word: Can you to help me carry this box?", accept: ["to"], why: "After can, use the infinitive without to." },
      { type: "text", q: "Find the extra word: She has been lived in this town since 2010.", accept: ["been"], why: "Present Perfect: has lived." }
    ]
  }
);
