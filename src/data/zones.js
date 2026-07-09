const zones = [
  {
    code: "R",
    name: "The Forge",
    label: "Hands-on & Technical",
    icon: "⚙️",
    color: "zone-r",
    hex: "#B45309",
    bgLight: "#FEF3C7",
    stream: "Science / Engineering",
    flavor: "Where things get built. If you love tools, machines, and making — this is your zone.",
    xpReward: 350
  },
  {
    code: "I",
    name: "The Observatory",
    label: "Analytical & Scientific",
    icon: "🔭",
    color: "zone-i",
    hex: "#1D4ED8",
    bgLight: "#EFF6FF",
    stream: "Science / Research",
    flavor: "Where questions live. If you love asking why and chasing answers — this is your zone.",
    xpReward: 350
  },
  {
    code: "A",
    name: "The Studio",
    label: "Creative & Expressive",
    icon: "🎨",
    color: "zone-a",
    hex: "#6D28D9",
    bgLight: "#F5F3FF",
    stream: "Arts / Humanities / Design",
    flavor: "Where ideas take form. If you love creating, designing, and expressing — this is your zone.",
    xpReward: 350
  },
  {
    code: "S",
    name: "The Town Square",
    label: "People-oriented",
    icon: "🤝",
    color: "zone-s",
    hex: "#065F46",
    bgLight: "#ECFDF5",
    stream: "Humanities / Education",
    flavor: "Where people matter most. If you love helping, teaching, and connecting — this is your zone.",
    xpReward: 350
  },
  {
    code: "E",
    name: "The Market",
    label: "Persuasive & Leadership",
    icon: "📣",
    color: "zone-e",
    hex: "#B91C1C",
    bgLight: "#FEF2F2",
    stream: "Commerce / Business",
    flavor: "Where ambition meets action. If you love leading, pitching, and winning — this is your zone.",
    xpReward: 350
  },
  {
    code: "C",
    name: "The Archive",
    label: "Organized & Detail-oriented",
    icon: "📋",
    color: "zone-c",
    hex: "#0E7490",
    bgLight: "#ECFEFF",
    stream: "Commerce / Accounts",
    flavor: "Where order creates power. If you love systems, accuracy, and structure — this is your zone.",
    xpReward: 350
  }
];

const vaults = [
  { id: "verbal", name: "The Word Vault", icon: "📖", description: "Language & comprehension challenges", xpReward: 300 },
  { id: "numerical", name: "The Number Vault", icon: "🔢", description: "Data & reasoning challenges", xpReward: 300 },
  { id: "logical", name: "The Logic Vault", icon: "🧩", description: "Pattern & deduction challenges", xpReward: 300 }
];

export { zones, vaults };
