const FUNNY_MESSAGES = [
  {
    title: 'Oops! Who turned off the lights? 🔍',
    description: 'went on vacation without leaving a forwarding address! 🏖️',
    footer: "Maybe it's playing hide and seek? 🙈",
  },
  {
    title: 'Houston, we have a problem! 🚀',
    description: 'has gone to explore the digital universe! 🌌',
    footer: 'Should we send a search party? 🔭',
  },
  {
    title: '404 - Page Missing in Action! 🕵️',
    description: 'seems to have joined the witness protection program! 🥸',
    footer: "We're putting up 'Missing Page' posters as we speak! 📜",
  },
  {
    title: 'Whoopsie Daisy! 🌼',
    description: 'took a wrong turn at the last server! 🚦',
    footer: "Even GPS can't find this page! 🗺️",
  },
  {
    title: 'Null Pointer Exception! 💻',
    description: 'is stuck in an infinite loop somewhere! 🔄',
    footer: 'Time to debug this reality! 🐛',
  },
  {
    title: 'Pixel Perfect? Not Found! 🎨',
    description: 'lost all its pixels in a tragic compression accident! 🖼️',
    footer: 'Someone call the graphic designer! 🎯',
  },
  {
    title: 'Git Blame Shows Nothing! 🤔',
    description: 'was force-pushed to the void! 📥',
    footer: 'Time to check the commit history... 📝',
  },
  {
    title: 'CSS Overflow: Hidden 🎭',
    description: 'is hiding behind a z-index: -9999! 🗂️',
    footer: 'Have you tried turning flexbox off and on again? 🔄',
  },
]

export function generateRandomFunnyMessage() {
  return FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)]
}
