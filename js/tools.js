const tools = [
  {
    name: 'Termites',
    cost: 10,
    exponent: 1.08,
    description: "A fresh pack of bugs to help you cut down trees",
    power: 0.1,
    enabled: (state) => state.clicks > 2
  },
  {
    name: 'Dwarves',
    cost: 100,
    exponent: 1.11,
    description: "These short men really hate trees, you're not sure why but they are hard workers",
    power: 1,
    enabled: (state) => state.score > 80
  },
  {
    name: 'Floating axes',
    cost: 500,
    exponent: 1.14,
    description: "None of the dwarves will use these ominous black axes, but no matter, they'll just use themselves",
    power: 5,
    enabled: (state) => state.score > 300
  }

]