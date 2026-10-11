window.GRAMMAR = window.GRAMMAR || [];
window.GRAMMAR.push(
  {
    id: "a1-to-be", level: "A1", title: "To be: am / is / are",
    rule: {
      intro: "The verb to be means \"exist, be somewhere, be something\". In Russian we usually leave it out, but in English you need it: I am a student.",
      blocks: [
        { h: "Positive", rows: [
          ["I + am", "I am (I'm) fifteen."],
          ["he / she / it + is", "She is (She's) my best friend."],
          ["we / you / they + are", "They are (They're) at school."]
        ] },
        { h: "Negative: + not", rows: [
          ["am not", "I'm not tired."],
          ["is not = isn't", "It isn't cold today."],
          ["are not = aren't", "We aren't late."]
        ] },
        { h: "Question: the verb goes first", rows: [
          ["Am I ...?", "Am I right?"],
          ["Is he / she / it ...?", "Is your brother at home?"],
          ["Are you / we / they ...?", "Are you ready? — Yes, I am. / No, I'm not."]
        ] }
      ],
      tips: [
        "Don't leave out the verb like in Russian. Not \"She my sister\" but \"She is my sister\".",
        "Age also uses to be. Not \"I have 15 years\" but \"I am 15 (years old)\".",
        "In a short \"yes\" answer, don't use the short form: Yes, I am (not \"Yes, I'm\")."
      ]
    },
    items: [
      { type: "choice", q: "She ___ a doctor.", opts: ["am", "is", "are"], a: 1, why: "She is third person singular, so we use is." },
      { type: "choice", q: "My friends ___ at the cinema now.", opts: ["is", "am", "are"], a: 2, why: "My friends = they (plural), so we use are." },
      { type: "choice", q: "I ___ fifteen years old.", opts: ["am", "is", "are"], a: 0, why: "With I, always use am. We talk about age with to be." },
      { type: "text", q: "They ___ (not / be) at home.", accept: ["aren't", "are not"], why: "They + are; the negative is are not (aren't)." },
      { type: "text", q: "___ (be) you ready for the test?", accept: ["are"], why: "In a question, to be goes before the subject: Are you...?" },
      { type: "text", q: "It ___ (not / be) cold today.", accept: ["isn't", "is not"], why: "It + is; the negative is is not (isn't)." },
      { type: "choice", q: "___ your brother good at football?", opts: ["Am", "Is", "Are"], a: 1, why: "Your brother = he, so the question starts with Is." },
      { type: "choice", q: "Where ___ my headphones?", opts: ["is", "are", "am"], a: 1, why: "Headphones is plural, so we use are." },
      { type: "text", q: "I ___ (not / be) hungry.", accept: ["am not", "'m not"], why: "With I, the negative is am not. There is no form \"amn't\"." },
      { type: "choice", q: "— Are you from Moscow? — Yes, I ___.", opts: ["am", "'m", "is"], a: 0, why: "In a short \"yes\" answer, don't use the short form: Yes, I am." }
    ]
  },
  {
    id: "a1-present-simple", level: "A1", title: "Present Simple",
    rule: {
      intro: "We use Present Simple for habits, regular actions and facts: things you do usually, always or every day.",
      blocks: [
        { h: "Positive", rows: [
          ["I / you / we / they + verb", "I play the guitar."],
          ["he / she / it + verb + s", "She plays the guitar."],
          ["-es after s, sh, ch, x, o", "He watches TV. She goes to school."],
          ["consonant + y → -ies", "study → She studies English."]
        ] },
        { h: "Negative: do / does + not", rows: [
          ["I / you / we / they + don't", "We don't like tea."],
          ["he / she / it + doesn't", "He doesn't like tea."]
        ] },
        { h: "Question: Do / Does goes first", rows: [
          ["Do + I / you / we / they", "Do you live near here?"],
          ["Does + he / she / it", "Does she speak French? — Yes, she does."]
        ] },
        { h: "Signal words", rows: [
          ["always, usually, often", "I usually get up at 7."],
          ["sometimes, never", "He never eats fish."],
          ["every day / week", "We have English every day."]
        ] }
      ],
      tips: [
        "Don't forget -s with he / she / it. Not \"He like music\" but \"He likes music\".",
        "After does / doesn't, the verb has no -s. Not \"Does she plays?\" but \"Does she play?\"",
        "Don't put am / is / are before a normal verb. Not \"I am go to school\" but \"I go to school\"."
      ]
    },
    items: [
      { type: "choice", q: "My sister ___ pop music.", opts: ["like", "likes", "liking"], a: 1, why: "My sister = she, so the verb takes -s: likes." },
      { type: "choice", q: "We ___ to school by bus.", opts: ["go", "goes", "going"], a: 0, why: "With we, the verb has no ending: go." },
      { type: "text", q: "He ___ (watch) TV every evening.", accept: ["watches"], why: "After ch, add -es: watches." },
      { type: "text", q: "She ___ (not / play) the guitar.", accept: ["doesn't play", "does not play"], why: "For she, the negative is doesn't + verb without -s." },
      { type: "choice", q: "___ your parents speak English?", opts: ["Do", "Does", "Are"], a: 0, why: "Your parents = they, so the question uses Do." },
      { type: "text", q: "My dad ___ (fly) to Kazan twice a month.", accept: ["flies"], why: "Consonant + y → -ies: fly → flies." },
      { type: "choice", q: "Tom ___ have a smartphone.", opts: ["don't", "doesn't", "isn't"], a: 1, why: "Tom = he. With a normal verb, the negative is doesn't." },
      { type: "text", q: "___ (do) Anna live near the school?", accept: ["does"], why: "Anna = she, so the question starts with Does." },
      { type: "choice", q: "Does she ___ coffee in the morning?", opts: ["drinks", "drink", "drinking"], a: 1, why: "After does, the verb has no -s: drink." },
      { type: "text", q: "I ___ (not / like) horror films.", accept: ["don't like", "do not like"], why: "For I, the negative is don't + verb." }
    ]
  },
  {
    id: "a1-there-is-are", level: "A1", title: "There is / There are",
    rule: {
      intro: "We use there is / there are to say that something exists or is somewhere. In Russian this sentence often starts with the place, but in English we say: There is a table in the room.",
      blocks: [
        { h: "Positive", rows: [
          ["There is + singular", "There is a park near my house."],
          ["There is + uncountable", "There is some milk in the fridge."],
          ["There are + plural", "There are two cafes in our street."]
        ] },
        { h: "Negative and question", rows: [
          ["There isn't a / any ...", "There isn't a TV in my room."],
          ["There aren't any ...", "There aren't any shops here."],
          ["Is there ...? / Are there ...?", "Is there a bank near here? — Yes, there is."],
          ["How many ... are there?", "How many students are there in your class?"]
        ] }
      ],
      tips: [
        "Don't start with the place without there. Not \"In my room is a bed\" but \"There is a bed in my room\".",
        "Choose is or are by the first noun after there: There is a cat. There are two cats.",
        "In questions and negatives with plural nouns, use any: Are there any good shops here?"
      ]
    },
    items: [
      { type: "choice", q: "There ___ a big park near my house.", opts: ["is", "are", "am"], a: 0, why: "A park is singular, so there is." },
      { type: "choice", q: "There ___ three cafes in our street.", opts: ["is", "are", "be"], a: 1, why: "Three cafes is plural, so there are." },
      { type: "text", q: "There ___ (be) some milk in the fridge.", accept: ["is"], why: "Milk is uncountable, so there is." },
      { type: "text", q: "There ___ (not / be) any students in the classroom.", accept: ["aren't", "are not"], why: "Students is plural: there aren't any." },
      { type: "choice", q: "___ there a bank near here?", opts: ["Is", "Are", "Does"], a: 0, why: "A bank is singular, so the question is Is there...?" },
      { type: "choice", q: "How many students ___ there in your class?", opts: ["is", "are", "do"], a: 1, why: "After how many comes a plural noun, so are there." },
      { type: "text", q: "___ (be) there any good shops in your town?", accept: ["are"], why: "Shops is plural, so the question is Are there...?" },
      { type: "choice", q: "There ___ any bread left.", opts: ["isn't", "aren't", "not"], a: 0, why: "Bread is uncountable, so there isn't." },
      { type: "text", q: "There ___ (not / be) a TV in my room.", accept: ["isn't", "is not"], why: "A TV is singular: there isn't (is not)." },
      { type: "choice", q: "— Is there a swimming pool at your school? — No, there ___.", opts: ["isn't", "aren't", "not is"], a: 0, why: "The short answer repeats is: No, there isn't." }
    ]
  },
  {
    id: "a1-articles", level: "A1", title: "Articles: a / an / the",
    rule: {
      intro: "Russian has no articles, but in English there is almost always a word before a noun. A / an means \"one, any one\". The means \"that one, we know which\".",
      blocks: [
        { h: "A or an: listen to the sound", rows: [
          ["a + consonant sound", "a book, a university [ju:]"],
          ["an + vowel sound", "an apple, an hour [aʊə]"]
        ] },
        { h: "A / an: one of many, first time", rows: [
          ["jobs", "My mum is a teacher."],
          ["first time we mention it", "I have a cat."]
        ] },
        { h: "The: we know which one", rows: [
          ["we mentioned it before", "I have a cat. The cat is black."],
          ["there is only one", "the sun, the moon"],
          ["clear from the situation", "Close the door, please."],
          ["musical instruments", "She plays the piano."]
        ] },
        { h: "No article", rows: [
          ["sports and games", "We play football."],
          ["in general: plural or uncountable", "I like music. Cats are cute."]
        ] }
      ],
      tips: [
        "Don't forget the article before a job. Not \"He is doctor\" but \"He is a doctor\".",
        "Choose a / an by the sound, not the letter: an hour, but a university.",
        "Games have no article, instruments have the: play football, but play the guitar."
      ]
    },
    items: [
      { type: "choice", q: "I have ___ umbrella.", opts: ["a", "an", "the"], a: 1, why: "Umbrella starts with a vowel sound, and we mention it for the first time: an." },
      { type: "choice", q: "My mum is ___ teacher.", opts: ["a", "an", "— (nothing)"], a: 0, why: "We need a before a job; teacher starts with a consonant sound." },
      { type: "choice", q: "Look at ___ moon! It's so bright tonight.", opts: ["a", "an", "the"], a: 2, why: "There is only one moon, so the moon." },
      { type: "text", q: "I want to buy ___ (a / an) orange.", accept: ["an"], why: "Orange starts with a vowel sound: an orange." },
      { type: "choice", q: "She plays ___ piano very well.", opts: ["a", "the", "— (nothing)"], a: 1, why: "Musical instruments take the: play the piano." },
      { type: "choice", q: "I have a cat and a dog. ___ cat is black.", opts: ["A", "An", "The"], a: 2, why: "We already mentioned the cat, so now we know which one: the." },
      { type: "text", q: "He's ___ (a / an) honest boy.", accept: ["an"], why: "In honest, the h is silent, so the word starts with a vowel sound: an." },
      { type: "choice", q: "My brother plays ___ football every weekend.", opts: ["a", "the", "— (nothing)"], a: 2, why: "Sports and games have no article: play football." },
      { type: "text", q: "My cousin studies at ___ (a / an) university in Kazan.", accept: ["a"], why: "University starts with the sound [ju:], a consonant sound, so a." },
      { type: "choice", q: "Can you close ___ door, please? It's cold.", opts: ["a", "an", "the"], a: 2, why: "The situation shows which door we mean: the door." }
    ]
  },
  {
    id: "a1-plurals-this-these", level: "A1", title: "Plurals; this / that / these / those",
    rule: {
      intro: "We usually make the plural with -s. This / these are for things near you. That / those are for things far away.",
      blocks: [
        { h: "Rules for -s / -es / -ies", rows: [
          ["usually + s", "book → books"],
          ["s, ss, sh, ch, x + es", "box → boxes, bus → buses"],
          ["consonant + y → ies", "city → cities (but boy → boys)"],
          ["f / fe → ves", "knife → knives, leaf → leaves"]
        ] },
        { h: "Exceptions: learn them by heart", rows: [
          ["man / woman", "men / women"],
          ["child / person", "children / people"],
          ["foot / tooth / mouse", "feet / teeth / mice"]
        ] },
        { h: "Near and far", rows: [
          ["this + singular (near)", "This is my phone."],
          ["these + plural (near)", "These apples are sweet."],
          ["that + singular (far)", "Who is that girl over there?"],
          ["those + plural (far)", "Look at those birds!"]
        ] }
      ],
      tips: [
        "Don't add -s to exceptions. Not \"childs\", \"mans\" but \"children\", \"men\".",
        "These / those go only with plural nouns. Not \"these book\" but \"these books\".",
        "People is already plural: People are friendly here (not \"people is\")."
      ]
    },
    items: [
      { type: "text", q: "one child — two ___", accept: ["children"], why: "Exception: child → children." },
      { type: "text", q: "one box — three ___", accept: ["boxes"], why: "After x, add -es: boxes." },
      { type: "choice", q: "one man — two ___", opts: ["mans", "men", "mens"], a: 1, why: "Exception: man → men." },
      { type: "choice", q: "___ is my phone. (It's here, in my hand.)", opts: ["This", "These", "Those"], a: 0, why: "One thing near you: this." },
      { type: "choice", q: "Look at ___ birds over there in the sky!", opts: ["this", "these", "those"], a: 2, why: "Many birds, and they are far away: those." },
      { type: "choice", q: "___ apples here are very sweet.", opts: ["This", "These", "That"], a: 1, why: "Many apples, and they are near (here): these." },
      { type: "text", q: "one city — two ___", accept: ["cities"], why: "Consonant + y → -ies: cities." },
      { type: "text", q: "one knife — two ___", accept: ["knives"], why: "-fe → -ves: knives." },
      { type: "choice", q: "Who is ___ girl over there?", opts: ["this", "that", "those"], a: 1, why: "One girl, and she is far away (over there): that." },
      { type: "choice", q: "My ___ are cold and wet after the long walk.", opts: ["foot", "foots", "feet"], a: 2, why: "Exception: foot → feet. The verb are shows it is plural." }
    ]
  },
  {
    id: "a1-possessives", level: "A1", title: "Possessive adjectives and ’s",
    rule: {
      intro: "Possessive words answer the question \"whose?\". Russian has one word for \"my own, your own, her own...\", but English has a different word for each person.",
      blocks: [
        { h: "Possessive adjectives", rows: [
          ["I → my", "my phone"],
          ["you → your", "your bag"],
          ["he → his, she → her", "his bike, her name"],
          ["it → its", "The dog is eating its food."],
          ["we → our, they → their", "our school, their flat"]
        ] },
        { h: "Possessive ’s", rows: [
          ["name / singular + 's", "Kate's phone, my brother's room"],
          ["plural ending in -s + '", "my parents' car"],
          ["plural without -s + 's", "the children's toys"]
        ] }
      ],
      tips: [
        "English has no one word for \"my own / her own\". Use the word for the person: She loves her dog. We love our school.",
        "Its (whose?) and it's (= it is) are different words: The cat likes its toy. It's cute.",
        "Don't say \"the phone of Kate\". \"Kate's phone\" is simpler and more natural."
      ]
    },
    items: [
      { type: "choice", q: "This is my sister. ___ name is Masha.", opts: ["Her", "His", "She"], a: 0, why: "A sister is she, so we use her." },
      { type: "choice", q: "We love ___ school.", opts: ["our", "us", "we"], a: 0, why: "We → our." },
      { type: "choice", q: "Is this ___ bag, Tom?", opts: ["you", "your", "yours"], a: 1, why: "Before a noun, use your." },
      { type: "text", q: "This is ___ (Kate) phone.", accept: ["Kate's"], why: "It belongs to a person: name + 's, Kate's phone." },
      { type: "choice", q: "My ___ room is very big. (my mum and dad)", opts: ["parent's", "parents'", "parents"], a: 1, why: "Parents is plural and ends in -s, so we add only an apostrophe: parents'." },
      { type: "text", q: "They live in a small flat. ___ (they) flat is near the river.", accept: ["their"], why: "They → their." },
      { type: "choice", q: "The dog is eating ___ food.", opts: ["it's", "its", "it"], a: 1, why: "For an animal or a thing, use its; it's = it is." },
      { type: "text", q: "My ___ (brother) friends are funny. (I have only one brother.)", accept: ["brother's"], why: "One brother: brother + 's, my brother's friends." },
      { type: "choice", q: "Ann and ___ brother are in my class.", opts: ["she", "her", "hers"], a: 1, why: "It is Ann's brother, so her brother." },
      { type: "text", q: "Is this ___ (you) pencil?", accept: ["your"], why: "You → your." }
    ]
  },
  {
    id: "a1-can", level: "A1", title: "Can / can’t",
    rule: {
      intro: "Can means \"be able to\". We use it to talk about skills, possibilities and requests.",
      blocks: [
        { h: "One form for everyone", rows: [
          ["subject + can + verb", "I can swim. She can swim."],
          ["can't = cannot", "He can't drive."]
        ] },
        { h: "Question and short answer", rows: [
          ["Can + subject + verb?", "Can you play the guitar?"],
          ["Yes, ... can. / No, ... can't.", "Yes, I can. / No, I can't."]
        ] },
        { h: "Requests and permission", rows: [
          ["Can you ...?", "Can you help me, please?"],
          ["Can I ...?", "Can I open the window?"]
        ] }
      ],
      tips: [
        "After can there is no to and no -s. Not \"She can to speak\" or \"She cans speak\" but \"She can speak\".",
        "The negative doesn't need don't. Not \"I don't can\" but \"I can't\".",
        "Cannot is written as one word; the short form is can't."
      ]
    },
    items: [
      { type: "choice", q: "My little brother ___ swim.", opts: ["can", "cans", "can to"], a: 0, why: "Can is the same for all persons and has no to." },
      { type: "choice", q: "She can ___ three languages.", opts: ["speak", "speaks", "to speak"], a: 0, why: "After can, use the verb without to and without -s." },
      { type: "text", q: "I ___ (not / can) ride a horse.", accept: ["can't", "cannot", "can not"], why: "Negative: can't (cannot)." },
      { type: "choice", q: "___ you help me with my homework, please?", opts: ["Can", "Are", "Does"], a: 0, why: "A request: Can you...? + verb." },
      { type: "text", q: "Penguins ___ (not / can) fly.", accept: ["can't", "cannot", "can not"], why: "They are not able to: can't (cannot)." },
      { type: "choice", q: "— Can your dad cook? — Yes, he ___.", opts: ["can", "cans", "does"], a: 0, why: "The short answer repeats can: Yes, he can." },
      { type: "text", q: "___ (can) I open the window?", accept: ["can"], why: "Asking for permission: Can I...?" },
      { type: "choice", q: "We can't ___ to the party on Saturday.", opts: ["come", "coming", "to come"], a: 0, why: "After can't, use the base form of the verb without to." },
      { type: "choice", q: "Sorry, I ___ hear you. The music is too loud.", opts: ["can't", "don't can", "not can"], a: 0, why: "The negative of can is only can't, without don't." },
      { type: "text", q: "My cat ___ (can) jump very high.", accept: ["can"], why: "Can is the same for all persons: my cat can." }
    ]
  },
  {
    id: "a1-prepositions-time", level: "A1", title: "Prepositions of time: in / on / at",
    rule: {
      intro: "In, on and at show time. Your choice depends on what it is: an exact time, a day or a longer period.",
      blocks: [
        { h: "AT: a point in time", rows: [
          ["clock time", "at 9 o'clock, at half past three"],
          ["fixed phrases", "at night, at the weekend, at Christmas"]
        ] },
        { h: "ON: days and dates", rows: [
          ["days of the week", "on Monday, on Friday evening"],
          ["dates", "on 15 March, on my birthday"]
        ] },
        { h: "IN: longer periods", rows: [
          ["parts of the day", "in the morning, in the evening"],
          ["months, seasons", "in May, in winter"],
          ["years, centuries", "in 2010, in the 21st century"]
        ] }
      ],
      tips: [
        "Days of the week take on. Not \"in Monday\" but \"on Monday\".",
        "Morning and evening: in the morning / in the evening, but night: at night.",
        "If there is a specific day, use on: in the evening, but on Friday evening."
      ]
    },
    items: [
      { type: "choice", q: "My birthday is ___ May.", opts: ["in", "on", "at"], a: 0, why: "Months take in." },
      { type: "choice", q: "The lesson starts ___ 9 o'clock.", opts: ["in", "on", "at"], a: 2, why: "Clock time takes at." },
      { type: "choice", q: "We don't go to school ___ Sunday.", opts: ["in", "on", "at"], a: 1, why: "Days of the week take on." },
      { type: "text", q: "I usually do my homework ___ (in / on / at) the evening.", accept: ["in"], why: "Parts of the day: in the evening." },
      { type: "text", q: "We go skiing ___ (in / on / at) winter.", accept: ["in"], why: "Seasons take in." },
      { type: "text", q: "The concert is ___ (in / on / at) 15 March.", accept: ["on"], why: "Dates take on." },
      { type: "choice", q: "I don't use my phone ___ night.", opts: ["in", "on", "at"], a: 2, why: "Fixed phrase: at night." },
      { type: "choice", q: "My grandparents moved here ___ 1998.", opts: ["in", "on", "at"], a: 0, why: "Years take in." },
      { type: "text", q: "What do you do ___ (in / on / at) the weekend?", accept: ["at", "on"], why: "British English says at the weekend; American English says on the weekend." },
      { type: "choice", q: "Let's meet ___ Friday evening.", opts: ["in", "on", "at"], a: 1, why: "There is a specific day (Friday), so on." }
    ]
  }
);
