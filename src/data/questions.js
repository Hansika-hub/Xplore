// Xplore Career Discovery Program - Psychometric Assessment Question Bank

export const partAQuestions = [
  // Realistic (R) - Questions 1 to 7
  {
    id: 1,
    code: "R",
    text: "I enjoy assembling or repairing things (bicycles, electronics, gadgets) even when it's challenging."
  },
  {
    id: 2,
    code: "R",
    text: "I would like a project where I build a working model — a bridge, a circuit, or a mechanical device."
  },
  {
    id: 3,
    code: "R",
    text: "I find satisfaction in fixing something that was broken."
  },
  {
    id: 4,
    code: "R",
    text: "I enjoy activities that involve measuring, testing, or recording physical observations."
  },
  {
    id: 5,
    code: "R",
    text: "I would enjoy learning how engines, machines, or electrical circuits actually work from the inside."
  },
  {
    id: 6,
    code: "R",
    text: "I like using tools, equipment, or instruments to complete a task."
  },
  {
    id: 7,
    code: "R",
    text: "I prefer doing something physical and hands-on over reading and writing about it."
  },

  // Investigative (I) - Questions 8 to 14
  {
    id: 8,
    code: "I",
    text: "I enjoy trying to figure out why something works the way it does, not just that it works."
  },
  {
    id: 9,
    code: "I",
    text: "When I encounter an unexplained event (a weather pattern, a chemical reaction), I want to investigate it further."
  },
  {
    id: 10,
    code: "I",
    text: "I would enjoy designing a small experiment to test whether a claim is actually true."
  },
  {
    id: 11,
    code: "I",
    text: "I find reading about scientific discoveries or unsolved mysteries genuinely interesting."
  },
  {
    id: 12,
    code: "I",
    text: "I enjoy breaking down a complex problem into smaller parts to understand it better."
  },
  {
    id: 13,
    code: "I",
    text: "I like collecting data and looking for patterns, even in everyday situations."
  },
  {
    id: 14,
    code: "I",
    text: "I would rather spend time analyzing a topic in depth than covering many topics briefly."
  },

  // Artistic (A) - Questions 15 to 21
  {
    id: 15,
    code: "A",
    text: "I enjoy creating things — writing, drawing, designing posters, making videos, or composing music."
  },
  {
    id: 16,
    code: "A",
    text: "I like expressing an idea or feeling in a creative way more than presenting it as plain facts."
  },
  {
    id: 17,
    code: "A",
    text: "I find myself noticing the design, layout, or visual appeal of things around me."
  },
  {
    id: 18,
    code: "A",
    text: "I would enjoy writing a short story, script, or poem and sharing it with others."
  },
  {
    id: 19,
    code: "A",
    text: "I prefer assignments where I have creative freedom over ones with fixed instructions."
  },
  {
    id: 20,
    code: "A",
    text: "I get genuinely absorbed when working on a creative project, losing track of time."
  },
  {
    id: 21,
    code: "A",
    text: "I often think of original ways to do ordinary things — present information, organize events, or solve problems."
  },

  // Social (S) - Questions 22 to 28
  {
    id: 22,
    code: "S",
    text: "I feel energized when I help someone understand something they were confused about."
  },
  {
    id: 23,
    code: "S",
    text: "I enjoy group work and find collaboration more satisfying than working alone."
  },
  {
    id: 24,
    code: "S",
    text: "When a classmate or friend is struggling, I naturally want to step in and support them."
  },
  {
    id: 25,
    code: "S",
    text: "I would enjoy organizing or leading a community activity, event, or awareness campaign."
  },
  {
    id: 26,
    code: "S",
    text: "I like listening to people's problems and helping them think through solutions."
  },
  {
    id: 27,
    code: "S",
    text: "I find it meaningful when my work directly helps or improves someone else's situation."
  },
  {
    id: 28,
    code: "S",
    text: "I enjoy explaining things to others — tutoring, presenting, or even just talking through ideas."
  },

  // Enterprising (E) - Questions 29 to 35
  {
    id: 29,
    code: "E",
    text: "I enjoy taking charge of a group project and making sure it gets done well."
  },
  {
    id: 30,
    code: "E",
    text: "I find it exciting to pitch an idea and convince others to get on board."
  },
  {
    id: 31,
    code: "E",
    text: "I like competitions — sales games, debates, or any challenge where I can outperform others."
  },
  {
    id: 32,
    code: "E",
    text: "I enjoy thinking about how to make something more popular, profitable, or impactful."
  },
  {
    id: 33,
    code: "E",
    text: "I would enjoy running a small business or stall, even temporarily (like a school canteen or event stall)."
  },
  {
    id: 34,
    code: "E",
    text: "I get energized when I'm leading a team toward a goal, even under pressure."
  },
  {
    id: 35,
    code: "E",
    text: "I like negotiating — whether it's the price of something, a role in a group, or an outcome in a conflict."
  },

  // Conventional (C) - Questions 36 to 42
  {
    id: 36,
    code: "C",
    text: "I enjoy organizing information — making lists, spreadsheets, or structured notes."
  },
  {
    id: 37,
    code: "C",
    text: "I prefer tasks that have a clear method and a right answer over open-ended ones."
  },
  {
    id: 38,
    code: "C",
    text: "I feel satisfied when I complete a task exactly as it was supposed to be done."
  },
  {
    id: 39,
    code: "C",
    text: "I like managing details — tracking expenses, keeping records, or scheduling activities."
  },
  {
    id: 40,
    code: "C",
    text: "I prefer working in environments that are orderly and predictable."
  },
  {
    id: 41,
    code: "C",
    text: "I enjoy tasks that involve accuracy — proofreading, budgeting, or data entry."
  },
  {
    id: 42,
    code: "C",
    text: "I find it satisfying to bring structure to something that was previously disorganized."
  }
];

export const partBQuestions = {
  verbal: [
    {
      id: "V1",
      text: "Read the following and answer: \"The village had no electricity, yet the students studied diligently every evening. They used small oil lamps that flickered in the wind, casting long shadows on their textbooks.\"\nWhat can we most reasonably conclude from this passage?",
      options: [
        { letter: "A", text: "The students did not want to study." },
        { letter: "B", text: "The students were committed to their education despite difficult conditions." },
        { letter: "C", text: "Oil lamps are better than electric lights for studying." },
        { letter: "D", text: "The village received electricity the next morning." }
      ],
      correct: "B"
    },
    {
      id: "V2",
      text: "Choose the word that best completes the analogy: Doctor : Hospital :: Teacher : ___",
      options: [
        { letter: "A", text: "Student" },
        { letter: "B", text: "Classroom" },
        { letter: "C", text: "School" },
        { letter: "D", text: "Textbook" }
      ],
      correct: "C",
      note: "Think about where each person primarily works."
    },
    {
      id: "V3",
      text: "Which word does NOT belong with the others?",
      options: [
        { letter: "A", text: "Mars" },
        { letter: "B", text: "Venus" },
        { letter: "C", text: "Moon" },
        { letter: "D", text: "Jupiter" }
      ],
      correct: "C",
      note: "Think about what category the other three share that this one doesn't."
    },
    {
      id: "V4",
      text: "Read the following and answer: \"Despite finishing the race last, Priya was the only one who completed the full route without taking the shortcut. The judges awarded her a special recognition.\"\nWhy did Priya receive recognition?",
      options: [
        { letter: "A", text: "She was the fastest runner." },
        { letter: "B", text: "She followed the rules while others did not." },
        { letter: "C", text: "She finished ahead of the other runners." },
        { letter: "D", text: "She complained to the judges about the shortcut." }
      ],
      correct: "B"
    },
    {
      id: "V5",
      text: "Choose the pair that has the same relationship as: Warm : Hot",
      options: [
        { letter: "A", text: "Cold : Ice" },
        { letter: "B", text: "Tired : Exhausted" },
        { letter: "C", text: "Happy : Sad" },
        { letter: "D", text: "Big : Large" }
      ],
      correct: "B",
      note: "Look for the same type of relationship between the two words."
    },
    {
      id: "V6",
      text: "Which sentence uses the word 'transparent' most correctly?",
      options: [
        { letter: "A", text: "The government promised to be transparent about how the funds were used." },
        { letter: "B", text: "She was transparent because she was feeling very tired." },
        { letter: "C", text: "The transparent road was full of traffic." },
        { letter: "D", text: "He transparent the document to his friend." }
      ],
      correct: "A"
    }
  ],
  numerical: [
    {
      id: "N1",
      text: "Look at the table below and answer: Class donations collected for a school event: Class 6A: ₹240 | Class 6B: ₹180 | Class 7A: ₹320 | Class 7B: ₹260\nWhich two classes together collected exactly ₹500?",
      options: [
        { letter: "A", text: "6A and 6B" },
        { letter: "B", text: "6B and 7A" },
        { letter: "C", text: "6A and 7B" },
        { letter: "D", text: "7A and 7B" }
      ],
      correct: "C"
    },
    {
      id: "N2",
      text: "A bus travels 60 km in 1 hour. At the same speed, how far will it travel in 2 hours 30 minutes?",
      options: [
        { letter: "A", text: "120 km" },
        { letter: "B", text: "150 km" },
        { letter: "C", text: "140 km" },
        { letter: "D", text: "180 km" }
      ],
      correct: "B",
      note: "2.5 hours * 60 km/hr"
    },
    {
      id: "N3",
      text: "The number of students participating in three clubs: Science Club: 45 | Debate Club: 30 | Art Club: 25\nIf 10 students joined each club next month, what percentage of the total new count would the Science Club have? (Round to nearest whole number.)",
      options: [
        { letter: "A", text: "41%" },
        { letter: "B", text: "36%" },
        { letter: "C", text: "43%" },
        { letter: "D", text: "38%" }
      ],
      correct: "A",
      note: "New totals: 55 + 40 + 35 = 130. Science: 55/130 ≈ 42.3%"
    },
    {
      id: "N4",
      text: "Complete the number series: 3, 6, 12, 24, ___",
      options: [
        { letter: "A", text: "36" },
        { letter: "B", text: "42" },
        { letter: "C", text: "48" },
        { letter: "D", text: "30" }
      ],
      correct: "C",
      note: "Each number is multiplied by 2."
    },
    {
      id: "N5",
      text: "A shopkeeper bought 20 pens for ₹200 and sold them for ₹12 each. What was the total profit?",
      options: [
        { letter: "A", text: "₹20" },
        { letter: "B", text: "₹40" },
        { letter: "C", text: "₹30" },
        { letter: "D", text: "₹10" }
      ],
      correct: "B",
      note: "Sold for ₹240 total. Cost ₹200. Profit = ₹40."
    },
    {
      id: "N6",
      text: "Look at this data: Monthly rainfall (mm) — June: 120, July: 180, August: 150, September: 90. In which month was rainfall exactly 25% higher than June?",
      options: [
        { letter: "A", text: "July" },
        { letter: "B", text: "August" },
        { letter: "C", text: "September" },
        { letter: "D", text: "None of them" }
      ],
      correct: "B",
      note: "25% more than 120 = 150. August = 150."
    }
  ],
  logical: [
    {
      id: "L1",
      text: "Which shape comes next in the pattern? ○ △ □ ○ △ ___",
      options: [
        { letter: "A", text: "○" },
        { letter: "B", text: "△" },
        { letter: "C", text: "□" },
        { letter: "D", text: "◇" }
      ],
      correct: "C",
      note: "The pattern repeats every 3 shapes: circle, triangle, square."
    },
    {
      id: "L2",
      text: "All fruits in a basket are either mangoes or bananas. There are no bananas in the basket. What can we definitely conclude?",
      options: [
        { letter: "A", text: "The basket is empty." },
        { letter: "B", text: "All fruits in the basket are mangoes." },
        { letter: "C", text: "Some fruits are neither mangoes nor bananas." },
        { letter: "D", text: "The basket has both mangoes and bananas." }
      ],
      correct: "B"
    },
    {
      id: "L3",
      text: "Which figure does NOT belong with the others? (A) A shape with 3 sides (B) A shape with 4 sides (C) A shape with 5 sides (D) A shape with 4 sides and all sides equal",
      options: [
        { letter: "A", text: "A" },
        { letter: "B", text: "B" },
        { letter: "C", text: "C" },
        { letter: "D", text: "D" }
      ],
      correct: "C",
      note: "A, B, and D can all be drawn with straight lines in fewer than 5 sides. C is the only one that requires more."
    },
    {
      id: "L4",
      text: "If RED = 27 (R=9, E=5, D=4 — sum of letter positions: 18+5+4=27), what does the same rule give for CAB?",
      options: [
        { letter: "A", text: "6" },
        { letter: "B", text: "7" },
        { letter: "C", text: "8" },
        { letter: "D", text: "9" }
      ],
      correct: "A",
      note: "C=3, A=1, B=2. Sum = 6."
    },
    {
      id: "L5",
      text: "Ravi is taller than Suresh. Kiran is shorter than Suresh. Anand is taller than Ravi. Who is the tallest?",
      options: [
        { letter: "A", text: "Ravi" },
        { letter: "B", text: "Suresh" },
        { letter: "C", text: "Kiran" },
        { letter: "D", text: "Anand" }
      ],
      correct: "D"
    },
    {
      id: "L6",
      text: "A pattern of dots: Row 1: 1 dot | Row 2: 3 dots | Row 3: 6 dots | Row 4: 10 dots. How many dots will Row 5 have?",
      options: [
        { letter: "A", text: "13" },
        { letter: "B", text: "14" },
        { letter: "C", text: "15" },
        { letter: "D", text: "16" }
      ],
      correct: "C",
      note: "Each row adds one more dot than the previous: +2, +3, +4, +5. Row 5 = 10 + 5 = 15."
    },
    {
      id: "L7",
      text: "Three friends — Meena, Priya, and Kavya — each prefer a different subject: Maths, History, or Biology. Meena does not like Maths. Priya does not like History. Kavya likes Biology. What does Meena like?",
      options: [
        { letter: "A", text: "Maths" },
        { letter: "B", text: "History" },
        { letter: "C", text: "Biology" },
        { letter: "D", text: "Cannot be determined" }
      ],
      correct: "B",
      note: "Kavya = Biology. Meena ≠ Maths, so Meena = History. Priya = Maths."
    }
  ]
};
