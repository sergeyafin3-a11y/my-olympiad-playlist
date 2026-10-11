window.LEXIS = window.LEXIS || [];
window.LEXIS.push(
  {
    id: "lx-wf-nouns",
    group: "Word formation",
    title: "Nouns: -ment, -ness, -ity, -ion, -ance / -ence, -hood, -ship",
    rule: {
      intro: "These tasks check if you can turn a verb or an adjective into a noun. Look at the gap: after an article, the ... of, a possessive (his, her, their) or an adjective you need a noun. Then check if the noun must be plural.",
      blocks: [
        { h: "From a verb", rows: [
          ["-ment", "develop → development, invest → investment, agree → agreement"],
          ["-ion / -tion / -sion", "construct → construction, attend → attention, admit → admission"],
          ["-ance / -ence", "perform → performance, exist → existence, refer → reference"]
        ] },
        { h: "From an adjective", rows: [
          ["-ness", "nervous → nervousness, kind → kindness, aware → awareness"],
          ["-ity", "major → majority, similar → similarity, curious → curiosity"],
          ["-ance / -ence (from -ant / -ent)", "important → importance, patient → patience, confident → confidence"]
        ] },
        { h: "From a noun (an abstract idea)", rows: [
          ["-hood", "child → childhood, neighbour → neighbourhood"],
          ["-ship", "friend → friendship, champion → championship, leader → leadership"]
        ] }
      ],
      tips: [
        "Watch the spelling when the word changes: curious → curiosity (the u goes), generous → generosity, explain → explanation.",
        "If there is a/an or a singular verb, use the singular. If you see “many”, “several” or “are”, add -s: similarity → similarities.",
        "-ance or -ence? Look at the adjective: different → difference, relevant → relevance. For verbs, just learn them: perform → performance, exist → existence."
      ]
    },
    items: [
      { type: "text", q: "Last year the government announced a huge ___ in renewable energy. (INVEST)", accept: ["investment"], why: "After “a huge” we need a noun: invest + -ment." },
      { type: "text", q: "Her ___ to detail made her the best editor on the school newspaper. (ATTEND)", accept: ["attention"], why: "Fixed phrase: attention to detail; attend → attention." },
      { type: "text", q: "Despite his ___, the young chess player beat the grandmaster in twenty moves. (NERVOUS)", accept: ["nervousness"], why: "After his we need a noun: adjective + -ness." },
      { type: "text", q: "The ___ of the city's population speaks at least two languages. (MAJOR)", accept: ["majority"], why: "The majority of = most of; major + -ity." },
      { type: "text", q: "Many adults remember their ___ by the sea as the happiest time of their lives. (CHILD)", accept: ["childhood"], why: "A period of life takes the suffix -hood: childhood." },
      { type: "text", q: "The two physicists formed a close ___ that lasted for over forty years. (FRIEND)", accept: ["friendship"], why: "A relationship takes the suffix -ship: friendship." },
      { type: "text", q: "Experts noticed a striking ___ between the two ancient manuscripts. (SIMILAR)", accept: ["similarity"], why: "After “a striking” we need a singular noun: similar + -ity." },
      { type: "text", q: "Astronomers still argue about the ___ of life on the moons of Jupiter. (EXIST)", accept: ["existence"], why: "Exist → existence (-ence, not -ance)." },
      { type: "choice", q: "The team's ___ in the final was so poor that the coach resigned the next day.", opts: ["performing", "performance", "performer", "performation"], a: 1, why: "We need an abstract noun meaning “the way they played”: perform → performance." },
      { type: "choice", q: "The ___ of the new bridge was halted because of heavy flooding.", opts: ["constructment", "construction", "constructiveness", "constructivity"], a: 1, why: "The process of building is construction. The other words do not exist or mean “being helpful” (constructiveness)." }
    ]
  },
  {
    id: "lx-wf-adjectives",
    group: "Word formation",
    title: "Adjectives and adverbs: -ful, -less, -ous, -able, -ive, -ic, -ly",
    rule: {
      intro: "These tasks check how you make adjectives and adverbs. Before a noun or after be/seem/become you need an adjective. With a verb, with an adjective, or at the start of a sentence as a comment, you need an -ly adverb.",
      blocks: [
        { h: "Adjectives from nouns", rows: [
          ["-ful / -less", "power → powerful, use → useful / useless, end → endless"],
          ["-ous", "danger → dangerous, fame → famous, mystery → mysterious"],
          ["-ic / -ical", "hero → heroic, science → scientific, economy → economic / economical"]
        ] },
        { h: "Adjectives from verbs", rows: [
          ["-able / -ible", "wash → washable, understand → understandable, rely → reliable"],
          ["-ive", "create → creative, inform → informative, attract → attractive"]
        ] },
        { h: "Adverbs with -ly", rows: [
          ["adjective + -ly", "careful → carefully, remarkable → remarkably"],
          ["-y → -ily", "lucky → luckily, steady → steadily, happy → happily"]
        ] }
      ],
      tips: [
        "Pairs with different meanings are a favourite olympiad trap: economic (about the economy) vs economical (saving money), historic (very important in history) vs historical (about history).",
        "Sometimes you need two steps: LUCK → lucky → luckily; REMARK → remarkable → remarkably. Do not stop after the first one.",
        "-ful and -less give opposite meanings: the map was useless (no help at all), not useful. Read the whole context."
      ]
    },
    items: [
      { type: "text", q: "The old map turned out to be completely ___: every road on it had changed. (USE)", accept: ["useless"], why: "The meaning is that the map is no good: use + -less." },
      { type: "text", q: "Local scientists still consider the volcano extremely ___. (DANGER)", accept: ["dangerous"], why: "Consider something + adjective: danger + -ous." },
      { type: "text", q: "She gave such a ___ speech that half the audience was in tears. (POWER)", accept: ["powerful"], why: "Before the noun speech we need an adjective: power + -ful." },
      { type: "text", q: "The firefighter's ___ rescue of three children was shown on the evening news. (HERO)", accept: ["heroic"], why: "An adjective for rescue: hero → heroic." },
      { type: "text", q: "The jacket is waterproof and fully ___ in an ordinary washing machine. (WASH)", accept: ["washable"], why: "“Can be washed” takes the suffix -able." },
      { type: "text", q: "Our new art teacher is very ___ and always comes up with unusual projects. (CREATE)", accept: ["creative"], why: "After very we need an adjective: create → creative." },
      { type: "text", q: "The expedition was ___ successful: all twelve climbers reached the summit and returned safely. (REMARK)", accept: ["remarkably"], why: "Before the adjective successful we need an adverb: remark → remarkable → remarkably." },
      { type: "text", q: "___, nobody was injured when the old tree fell onto the school bus. (LUCK)", accept: ["Luckily", "luckily"], why: "A comment adverb at the start of the sentence: luck → lucky → luckily." },
      { type: "choice", q: "The museum guide's explanation was ___ even to the youngest visitors.", opts: ["understandable", "understanding", "understood", "understandful"], a: 0, why: "“Easy to understand” is understandable; understanding means “kind and caring”." },
      { type: "choice", q: "Buying a season ticket is far more ___ than paying for every single match.", opts: ["economic", "economical", "economics", "economist"], a: 1, why: "Economical means “saves money”; economic means “about the economy”." }
    ]
  },
  {
    id: "lx-wf-prefixes",
    group: "Word formation",
    title: "Negative prefixes and verbs: un-, in-/im-/il-/ir-, dis-, mis-, -en, -ise",
    rule: {
      intro: "These tasks check if you see that the meaning needs a negative word or a verb. First decide if the context needs a positive or a negative meaning. Then choose the right prefix. For verbs, do not forget the tense and the ending.",
      blocks: [
        { h: "Negative prefixes", rows: [
          ["un-", "clear → unclear, suited → unsuited, able → unable"],
          ["in- / im- (before m, p) / il- (before l) / ir- (before r)", "patient → impatient, legal → illegal, relevant → irrelevant, visible → invisible"],
          ["dis-", "agree → disagree, able → disable, appear → disappear"],
          ["mis- (= wrongly)", "use → misuse, interpret → misinterpret, understand → misunderstand"]
        ] },
        { h: "Verbs from adjectives and nouns", rows: [
          ["-en", "strong → strengthen, wide → widen, short → shorten"],
          ["-ise / -ize", "modern → modernise / modernize, glory → glorify (-ify)"]
        ] }
      ],
      tips: [
        "When you have the verb, put it in the right form: The bridge must be strengthened (passive → past participle), Students disagreed last year (past).",
        "mis- does not mean “not”, it means “wrongly”: misuse a word = use it in the wrong way; disuse = not being used.",
        "British -ise and American -ize are both correct: modernise = modernize. Just use the same one in the whole text."
      ]
    },
    items: [
      { type: "text", q: "In most countries it is ___ to drive a car without a licence. (LEGAL)", accept: ["illegal"], why: "Before l the prefix is il-: illegal." },
      { type: "text", q: "The instructions were so ___ that nobody managed to assemble the bookshelf. (CLEAR)", accept: ["unclear"], why: "The meaning is that the instructions are hard to understand: un- + clear." },
      { type: "text", q: "His answer was completely ___: he had obviously not read the book at all. (RELEVANT)", accept: ["irrelevant"], why: "Before r the prefix is ir-: irrelevant." },
      { type: "text", q: "Last spring many students ___ with the new dress code and signed a petition against it. (AGREE)", accept: ["disagreed"], why: "We need the opposite and the past tense: disagree → disagreed." },
      { type: "text", q: "Many people ___ the word \"literally\": they use it to mean the exact opposite, \"figuratively\". (USE)", accept: ["misuse"], why: "Mis- = “wrongly” (use with the wrong meaning); present simple with people: misuse." },
      { type: "text", q: "The old bridge must be ___ before heavy lorries are allowed to cross it. (STRONG)", accept: ["strengthened"], why: "The verb strengthen (-en) in the passive: must be strengthened." },
      { type: "text", q: "The city council plans to ___ its public transport system by 2030. (MODERN)", accept: ["modernise", "modernize"], why: "After plans to we need an infinitive: modern + -ise/-ize." },
      { type: "text", q: "The ___ fans started whistling when the concert was delayed for an hour. (PATIENT)", accept: ["impatient"], why: "Before p the prefix is im-: impatient." },
      { type: "choice", q: "The journalist ___ the results of the study, so the newspaper had to publish a correction.", opts: ["misinterpreted", "disinterpreted", "uninterpreted", "ininterpreted"], a: 0, why: "“Understood it wrongly” = mis- + interpret, past tense." },
      { type: "choice", q: "Please do not ___ the alarm system while the museum is open to visitors.", opts: ["unable", "disable", "inable", "misable"], a: 1, why: "We need a verb meaning “turn off”: disable; unable is an adjective." }
    ]
  },
  {
    id: "lx-wf-context",
    group: "Word formation",
    title: "In a text: olympiad-style gaps",
    rule: {
      intro: "Like at the All-Russian Olympiad: a full text, and in each gap you write a word from the given root IN THE RIGHT GRAMMAR FORM. First find the part of speech, then the form: number, tense, participle, comparison.",
      blocks: [
        { h: "Steps for every gap", rows: [
          ["1. Part of speech", "article/adjective → noun; before a noun → adjective; with a verb → adverb"],
          ["2. Meaning: positive or negative?", "suit → suited or unsuited? Read the whole sentence"],
          ["3. Grammar form", "explore → explorers (plural), glory → glorified (participle), reliable → more reliable (comparative)"]
        ] },
        { h: "Signals of the form", rows: [
          ["Plural", "two, several, many, these, a verb without -s: two rival explorers"],
          ["Past participle", "be / have + ___: was glorified, had been discovered"],
          ["Comparative", "than, far / much / even + ___: far more reliable than"]
        ] }
      ],
      tips: [
        "The most common way to lose points is the right word in the wrong form: explorer instead of explorers will not count.",
        "The word “than” after the gap almost always means a comparative: effective → more effective.",
        "The root may need two changes: KNOW → knowledge, GLORY → glorify → glorified."
      ]
    },
    items: [
      { type: "text", q: "In 1911 two rival ___ set out to become the first people to reach the South Pole. (EXPLORE)", accept: ["explorers"], why: "“Two rival” needs a plural noun: explore → explorer → explorers." },
      { type: "text", q: "The Norwegian Roald Amundsen had prepared ___ for the journey, testing every piece of equipment in advance. (CARE)", accept: ["carefully"], why: "With the verb prepared we need an adverb: care → careful → carefully." },
      { type: "text", q: "He relied on sledge dogs, which proved far ___ than the motor sledges of his British rival. (RELY)", accept: ["more reliable"], why: "“Far ... than” means a comparative: reliable → more reliable." },
      { type: "text", q: "Robert Scott's men, meanwhile, struggled through ___ blizzards and suffered from terrible frostbite. (END)", accept: ["endless"], why: "An adjective for blizzards meaning “never ending”: end + -less." },
      { type: "text", q: "Their ponies were completely ___ to the extreme cold and died within weeks. (SUIT)", accept: ["unsuited", "unsuitable"], why: "The ponies were not right for the cold, so we need the negative prefix un-." },
      { type: "text", q: "When Scott finally reached the Pole and saw the Norwegian flag, his ___ was enormous. (DISAPPOINT)", accept: ["disappointment"], why: "After his we need a noun: disappoint + -ment." },
      { type: "text", q: "On the way back the men grew ___ weaker as food and fuel ran out. (STEADY)", accept: ["steadily"], why: "Before the adjective weaker we need an adverb: steady → steadily." },
      { type: "text", q: "Although none of them survived, Scott was later ___ as a national hero in Britain. (GLORY)", accept: ["glorified"], why: "Passive: was + past participle: glory → glorify → glorified." },
      { type: "text", q: "Historians now believe that Amundsen owed his victory less to luck than to his ___ of Inuit survival methods. (KNOW)", accept: ["knowledge"], why: "After his we need a noun: know → knowledge." },
      { type: "text", q: "The race shows that careful planning is often ___ than courage alone. (EFFECT)", accept: ["more effective"], why: "Before than we need a comparative adjective: effective → more effective." }
    ]
  }
);
