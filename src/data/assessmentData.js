// RIASEC and Aptitude Assessment Questions Data

export const riasecZones = [
  {
    code: 'R',
    name: 'Realistic',
    color: 'var(--color-zone-r)',
    bgColor: 'bg-zone-r',
    icon: '🔧',
    description: 'The Doers: Practical, hands-on, and active explorers who love building, operating, and physical work.',
    partA: [
      {
        id: 'R-A1',
        text: 'Assemble, repair, or tinker with machinery, electronics, or appliances.'
      },
      {
        id: 'R-A2',
        text: 'Work outdoors in nature, forestry, agriculture, or wildlife environments.'
      },
      {
        id: 'R-A3',
        text: 'Build wooden structures, models, furniture, or physical prototypes.'
      },
      {
        id: 'R-A4',
        text: 'Operate technical hardware, drones, heavy vehicles, or specialized lab gear.'
      }
    ],
    partB: [
      {
        id: 'R-B1',
        text: 'Scenario: A complex electronic device stops working. What is your natural instinct?',
        options: [
          { letter: 'A', text: 'Unscrew the casing, inspect the hardware, and try to physically fix it.' },
          { letter: 'B', text: 'Look up schematics online and read technical diagnostic reports.' },
          { letter: 'C', text: 'Call support, hire a technician, or buy a new replacement.' }
        ]
      },
      {
        id: 'R-B2',
        text: 'Scenario: You are designing a community park. Which area do you want to lead?',
        options: [
          { letter: 'A', text: 'Constructing the wooden decks, bridge pathways, and setting up playground equipment.' },
          { letter: 'B', text: 'Analyzing soil composition, selecting plant species, and mapping tree configurations.' },
          { letter: 'C', text: 'Coordinating event organizers, scheduling volunteer shifts, and managing sign-ups.' }
        ]
      }
    ]
  },
  {
    code: 'I',
    name: 'Investigative',
    color: 'var(--color-zone-i)',
    bgColor: 'bg-zone-i',
    icon: '🔬',
    description: 'The Thinkers: Scientific, analytical, and logical thinkers who love solving puzzles and researching ideas.',
    partA: [
      {
        id: 'I-A1',
        text: 'Analyze scientific data, formulas, chemical compositions, or astronomical maps.'
      },
      {
        id: 'I-A2',
        text: 'Write computer software code, develop algorithms, or solve complex logic puzzles.'
      },
      {
        id: 'I-A3',
        text: 'Perform medical research, study cellular structures, or investigate diseases.'
      },
      {
        id: 'I-A4',
        text: 'Conduct experiments to understand how physics, energy, or chemical processes work.'
      }
    ],
    partB: [
      {
        id: 'I-B1',
        text: 'Scenario: You notice an unusual spike in student grades after a new study schedule is introduced. What do you do?',
        options: [
          { letter: 'A', text: 'Gather all test scores, plot the data in graphs, and analyze statistical significance.' },
          { letter: 'B', text: 'Organize a study group to help other students adapt to this schedule.' },
          { letter: 'C', text: 'Write a news article detailing the schedules, interviewing students about their experiences.' }
        ]
      },
      {
        id: 'I-B2',
        text: 'Scenario: You are playing an escape room with friends. What is your favorite role?',
        options: [
          { letter: 'A', text: 'Solving mathematical or logic puzzles, decoding secret cyphers.' },
          { letter: 'B', text: 'Directing the team, tracking time, and assigning which locks to open.' },
          { letter: 'C', text: 'Searching physical furniture, tapping panels, and finding hidden props.' }
        ]
      }
    ]
  },
  {
    code: 'A',
    name: 'Artistic',
    color: 'var(--color-zone-a)',
    bgColor: 'bg-zone-a',
    icon: '🎨',
    description: 'The Creators: Expressive, original, and imaginative minds who love visual design, music, and writing.',
    partA: [
      {
        id: 'A-A1',
        text: 'Paint, sketch, sculpt, or design digital graphics and illustrations.'
      },
      {
        id: 'A-A2',
        text: 'Perform in theater plays, play a musical instrument, or write original songs.'
      },
      {
        id: 'A-A3',
        text: 'Write creative stories, poetry, scripts, or create unique video content.'
      },
      {
        id: 'A-A4',
        text: 'Design fashion garments, design interiors, or create eye-catching visual styles.'
      }
    ],
    partB: [
      {
        id: 'A-B1',
        text: 'Scenario: You are launching a student podcast. What sounds like the most fun part to you?',
        options: [
          { letter: 'A', text: 'Creating the brand logo, theme song, and editing the audio for style.' },
          { letter: 'B', text: 'Conducting structured interviews with guests and following list questions.' },
          { letter: 'C', text: 'Selling sponsorship spots, advertising, and tracking listener growth.' }
        ]
      },
      {
        id: 'A-B2',
        text: 'Scenario: You are given a blank wall in your school. What do you suggest doing with it?',
        options: [
          { letter: 'A', text: 'Collaborate with classmates to paint a vibrant, symbolic mural representing the student body.' },
          { letter: 'B', text: 'Install a neat, structured bulletin board tracking student announcements.' },
          { letter: 'C', text: 'Attach horizontal shelves to organize and display science models.' }
        ]
      }
    ]
  },
  {
    code: 'S',
    name: 'Social',
    color: 'var(--color-zone-s)',
    bgColor: 'bg-zone-s',
    icon: '🤝',
    description: 'The Helpers: Empathetic, friendly, and supportive people who love teaching, counseling, and teamwork.',
    partA: [
      {
        id: 'S-A1',
        text: 'Teach, tutor, or explain complex ideas to help others understand them.'
      },
      {
        id: 'S-A2',
        text: 'Volunteer at community centers, food banks, or help vulnerable groups.'
      },
      {
        id: 'S-A3',
        text: 'Listen to friends\' problems and help them find emotional or practical solutions.'
      },
      {
        id: 'S-A4',
        text: 'Lead group activities, sports coaching, or team building exercises.'
      }
    ],
    partB: [
      {
        id: 'S-B1',
        text: 'Scenario: A team member is visibly stressed and falling behind on their task. What do you do?',
        options: [
          { letter: 'A', text: 'Ask how they are doing, offer supportive listening, and help them complete their load.' },
          { letter: 'B', text: 'Politely remind them of the project outline and check off completed sub-tasks.' },
          { letter: 'C', text: 'Take over their portion entirely without discussing, so the project meets the deadline.' }
        ]
      },
      {
        id: 'S-B2',
        text: 'Scenario: You want to start a school program to improve student safety. What is your approach?',
        options: [
          { letter: 'A', text: 'Form a student peer-buddy support system to ensure no one feels isolated or unsafe.' },
          { letter: 'B', text: 'Draft a code of conduct rules document and set up surveillance systems.' },
          { letter: 'C', text: 'Host a charity fundraiser to hire professional campus security guards.' }
        ]
      }
    ]
  },
  {
    code: 'E',
    name: 'Enterprising',
    color: 'var(--color-zone-e)',
    bgColor: 'bg-zone-e',
    icon: '⚡',
    description: 'The Persuaders: Energetic, ambitious, and talkative leaders who love business, marketing, and public speaking.',
    partA: [
      {
        id: 'E-A1',
        text: 'Pitch a new business, app idea, or invention to a panel of judges.'
      },
      {
        id: 'E-A2',
        text: 'Lead a student organization, club, or direct the execution of a project.'
      },
      {
        id: 'E-A3',
        text: 'Negotiate deals, organize fundraising projects, or buy and resell items for profit.'
      },
      {
        id: 'E-A4',
        text: 'Give public speeches, join debate competitions, or host assemblies.'
      }
    ],
    partB: [
      {
        id: 'E-B1',
        text: 'Scenario: Your class project needs a budget of $200. How do you plan to raise it?',
        options: [
          { letter: 'A', text: 'Pitch a high-margin bake sale or customized school stickers, promoting it dynamically.' },
          { letter: 'B', text: 'Apply for a school grant, writing a precise, compliant proposal detailing the costs.' },
          { letter: 'C', text: 'Contribute matching funds out of pocket to save time and proceed immediately.' }
        ]
      },
      {
        id: 'E-B2',
        text: 'Scenario: A team is divided between two completely different directions. What is your move?',
        options: [
          { letter: 'A', text: 'Facilitate a vote, make a decisive executive call, and rally the team behind the chosen direction.' },
          { letter: 'B', text: 'Carefully document both options, outlining pros and cons in a structured matrix for evaluation.' },
          { letter: 'C', text: 'Suggest pursuing both paths separately in smaller teams, regardless of the extra work.' }
        ]
      }
    ]
  },
  {
    code: 'C',
    name: 'Conventional',
    color: 'var(--color-zone-c)',
    bgColor: 'bg-zone-c',
    icon: '📊',
    description: 'The Organizers: Detail-oriented, orderly, and structured professionals who love rules, schedules, and systems.',
    partA: [
      {
        id: 'C-A1',
        text: 'Manage detailed databases, lists, inventories, or school club registries.'
      },
      {
        id: 'C-A2',
        text: 'Organize files, cloud folders, spreadsheets, and structure files neatly.'
      },
      {
        id: 'C-A3',
        text: 'Inspect documents, letters, or designs for spelling, punctuation, and alignment errors.'
      },
      {
        id: 'C-A4',
        text: 'Write detailed manuals, assembly instructions, or document protocols.'
      }
    ],
    partB: [
      {
        id: 'C-B1',
        text: 'Scenario: You are planning a complex class trip. What is your packing and planning strategy?',
        options: [
          { letter: 'A', text: 'Create a spreadsheet with custom categories, weight checks, and a time-anchored itinerary.' },
          { letter: 'B', text: 'Do general research on attractions but decide details dynamically when you arrive.' },
          { letter: 'C', text: 'Throw essential clothes into a bag the night before and buy anything else needed on-site.' }
        ]
      },
      {
        id: 'C-B2',
        text: 'Scenario: You are organizing a digital drive for shared school materials. What is your strategy?',
        options: [
          { letter: 'A', text: 'Establish a strict folder hierarchy with strict file-naming rules (e.g., YYYY_Subject_Topic_v1).' },
          { letter: 'B', text: 'Dump everything in a single search-friendly folder and rely on query tags.' },
          { letter: 'C', text: 'Allow everyone to customize their folders based on their own personal styles.' }
        ]
      }
    ]
  }
];

export const aptitudeVaults = {
  verbal: {
    name: 'Verbal Vault',
    icon: '📚',
    description: 'Test your vocabulary, semantic relations, and reading comprehension.',
    questions: [
      {
        id: 'V1',
        text: 'Choose the word that is most opposite in meaning to the word "EPHEMERAL":',
        options: [
          { letter: 'A', text: 'Transient' },
          { letter: 'B', text: 'Perpetual' },
          { letter: 'C', text: 'Evanescent' },
          { letter: 'D', text: 'Frail' }
        ],
        correct: 'B',
        explanation: '"Ephemeral" means short-lived. "Perpetual" means everlasting, which is the direct opposite.'
      },
      {
        id: 'V2',
        text: 'Complete the analogy: "ACUMEN : JUDGMENT :: CONCEIT : ______"',
        options: [
          { letter: 'A', text: 'Humility' },
          { letter: 'B', text: 'Vanity' },
          { letter: 'C', text: 'Wisdom' },
          { letter: 'D', text: 'Intellect' }
        ],
        correct: 'B',
        explanation: '"Acumen" is a synonym/trait associated with sharp judgment. "Conceit" is associated with vanity/pride.'
      },
      {
        id: 'V3',
        text: 'Identify the sentence with correct grammatical structure and punctuation:',
        options: [
          { letter: 'A', text: 'Having completed the report, the charts were finally ready for the presentation.' },
          { letter: 'B', text: 'Each of the candidates are expected to bring their own laptop for the assessment.' },
          { letter: 'C', text: 'Although the telescope was calibrated, she still could not see the distant star.' },
          { letter: 'D', text: 'Neither the teacher nor the students was able to open the locked cabinet.' }
        ],
        correct: 'C',
        explanation: 'C is grammatically correct. A contains a dangling modifier. B should use "is expected" and "his/her". D should use "were able" (matches the plural subject "students").'
      }
    ]
  },
  numerical: {
    name: 'Numerical Vault',
    icon: '🔢',
    description: 'Solve mathematical, algebraic, and logical-numerical puzzles.',
    questions: [
      {
        id: 'N1',
        text: 'What number should replace the question mark in this sequence? 3, 8, 18, 38, ?, 158',
        options: [
          { letter: 'A', text: '58' },
          { letter: 'B', text: '78' },
          { letter: 'C', text: '88' },
          { letter: 'D', text: '98' }
        ],
        correct: 'B',
        explanation: 'The pattern is to multiply by 2 and add 2. (3*2+2=8; 8*2+2=18; 18*2+2=38; 38*2+2=78).'
      },
      {
        id: 'N2',
        text: 'A laptop price is reduced by 20%. A customer uses a coupon to get an extra 10% off the discounted price. What is the total percent reduction?',
        options: [
          { letter: 'A', text: '30%' },
          { letter: 'B', text: '28%' },
          { letter: 'C', text: '25%' },
          { letter: 'D', text: '32%' }
        ],
        correct: 'B',
        explanation: 'Let price be 100. Reduced by 20% makes it 80. An extra 10% off 80 is a reduction of 8, making the price 72. Total reduction is 100 - 72 = 28%.'
      },
      {
        id: 'N3',
        text: 'If 3 machines can package 180 boxes in 4 hours, how many hours would it take 5 machines to package 300 boxes?',
        options: [
          { letter: 'A', text: '3.6 hours' },
          { letter: 'B', text: '4 hours' },
          { letter: 'C', text: '4.5 hours' },
          { letter: 'D', text: '5 hours' }
        ],
        correct: 'B',
        explanation: 'Rate of 1 machine is: 180 boxes / (3 machines * 4 hours) = 15 boxes/machine-hour. With 5 machines, rate is 5 * 15 = 75 boxes/hour. Time to package 300 boxes is 300 / 75 = 4 hours.'
      }
    ]
  },
  logical: {
    name: 'Logical Vault',
    icon: '🧩',
    description: 'Evaluate pattern reasoning, abstract sequences, and deductive logic.',
    questions: [
      {
        id: 'L1',
        text: 'All astronauts are engineers. Some engineers are pilots. No pilots are doctors. Which statement is logically guaranteed?',
        options: [
          { letter: 'A', text: 'Some astronauts are doctors.' },
          { letter: 'B', text: 'No astronauts are doctors.' },
          { letter: 'C', text: 'All pilots are engineers.' },
          { letter: 'D', text: 'Some engineers are not doctors.' }
        ],
        correct: 'D',
        explanation: 'Since "Some engineers are pilots" and "No pilots are doctors", those engineers who are pilots cannot be doctors. Therefore, some engineers are definitely not doctors.'
      },
      {
        id: 'L2',
        text: 'If A + B = C, B + C = D, and A + D = E, what is the value of E in terms of A and B?',
        options: [
          { letter: 'A', text: '2A + 2B' },
          { letter: 'B', text: 'A + 2B' },
          { letter: 'C', text: '2A + B' },
          { letter: 'D', text: '2A + 3B' }
        ],
        correct: 'A',
        explanation: 'C = A + B. D = B + C = B + A + B = A + 2B. E = A + D = A + A + 2B = 2A + 2B.'
      },
      {
        id: 'L3',
        text: 'In a code language, SHADOW is written as TIBEPX. How is LIGHTS written in this same code?',
        options: [
          { letter: 'A', text: 'MJHIUT' },
          { letter: 'B', text: 'MJGHTR' },
          { letter: 'C', text: 'MJIHUT' },
          { letter: 'D', text: 'MHHIUT' }
        ],
        correct: 'C',
        explanation: 'The pattern is: shift each letter by +1 position in the alphabet: S->T, H->I, A->B, D->E, O->P, W->X. Applying this to LIGHTS: L->M, I->J, G->H, H->I, T->U, S->T. So MJHIUT.'
      }
    ]
  }
};

export const avatars = [
  { id: 'av1', emoji: '🔭', name: 'The Analyst' },
  { id: 'av2', emoji: '🎨', name: 'The Creator' },
  { id: 'av3', emoji: '🌿', name: 'The Nurturer' },
  { id: 'av4', emoji: '⚡', name: 'The Builder' },
  { id: 'av5', emoji: '🧩', name: 'The Solver' },
  { id: 'av6', emoji: '🌊', name: 'The Trailblazer' }
];

export const HollandDescriptions = {
  R: {
    title: 'Realistic (Doer)',
    text: 'You enjoy practical, hands-on activities, working with tools, building things, and physical activity. You tend to be down-to-earth, reliable, and mechanical.',
    careers: ['Aerospace Engineer', 'Robotics Technician', 'Drone Operator', 'Wildlife Biologist', 'Civil Engineer', 'Network Hardware Specialist']
  },
  I: {
    title: 'Investigative (Thinker)',
    text: 'You love solving puzzles, analyzing data, conducting research, and exploring scientific ideas. You tend to be curious, analytical, observant, and logical.',
    careers: ['Data Scientist', 'Software Developer', 'Bio-Medical Researcher', 'Cybersecurity Analyst', 'Astrophysicist', 'Financial Analyst']
  },
  A: {
    title: 'Artistic (Creator)',
    text: 'You value self-expression, visual art, writing, music, and original design. You tend to be creative, expressive, independent, and intuitive.',
    careers: ['UI/UX Designer', 'Creative Director', 'Video Producer', 'Game Designer', 'Architect', 'Copywriter']
  },
  S: {
    title: 'Social (Helper)',
    text: 'You find meaning in helping others, teaching, tutoring, counseling, and working in supportive team environments. You tend to be empathetic, friendly, and cooperative.',
    careers: ['Teacher/Educator', 'HR Specialist', 'Counselor', 'Community Relations Lead', 'Nurse/Healthcare Lead', 'Customer Success Director']
  },
  E: {
    title: 'Enterprising (Persuader)',
    text: 'You enjoy leadership, pitching business ideas, debate, public speaking, and organizing projects. You tend to be energetic, persuasive, ambitious, and outgoing.',
    careers: ['Product Manager', 'Entrepreneur / Founder', 'Sales Director', 'Marketing Strategist', 'Public Relations Specialist', 'Management Consultant']
  },
  C: {
    title: 'Conventional (Organizer)',
    text: 'You excel in highly structured environments, keeping files organized, managing databases, reviewing compliance, and organizing detailed logistics. You tend to be systematic, detail-oriented, and efficient.',
    careers: ['Database Administrator', 'Financial Auditor', 'Project Coordinator', 'Systems Administrator', 'Quality Assurance Analyst', 'Information Architect']
  }
};
