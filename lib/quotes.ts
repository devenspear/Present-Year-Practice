export interface Quote {
  text: string
  author: string
  theme: string
}

export const quotes: Quote[] = [
  {
    text: "The trouble is, you think you have time.",
    author: "Buddha",
    theme: "mortality"
  },
  {
    text: "What we leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.",
    author: "Pericles",
    theme: "legacy"
  },
  {
    text: "Yesterday is history, tomorrow is a mystery, today is a gift, which is why we call it the present.",
    author: "Bill Keane",
    theme: "presence"
  },
  {
    text: "In the end, we only regret the chances we didn't take, the relationships we were afraid to have, and the decisions we waited too long to make.",
    author: "Lewis Carroll",
    theme: "courage"
  },
  {
    text: "Forgiveness is not about forgetting. It is about letting go of another person's throat.",
    author: "William Paul Young",
    theme: "forgiveness"
  },
  {
    text: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.",
    author: "Melody Beattie",
    theme: "gratitude"
  },
  {
    text: "The fear of death follows from the fear of life. One who lives fully is prepared to die at any time.",
    author: "Mark Twain",
    theme: "acceptance"
  },
  {
    text: "We are not going in circles, we are going upwards. The path is a spiral; we have already climbed many steps.",
    author: "Hermann Hesse",
    theme: "growth"
  },
  {
    text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
    author: "Rumi",
    theme: "relationships"
  },
  {
    text: "The meaning of life is to find your gift. The purpose of life is to give it away.",
    author: "Pablo Picasso",
    theme: "service"
  },
  {
    text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Maya Angelou",
    theme: "presence"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    theme: "action"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    theme: "inner strength"
  },
  {
    text: "Death is not the opposite of life, but a part of it.",
    author: "Haruki Murakami",
    theme: "mortality"
  },
  {
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
    theme: "acceptance"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    theme: "authenticity"
  },
  {
    text: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    theme: "courage"
  },
  {
    text: "We do not remember days, we remember moments.",
    author: "Cesare Pavese",
    theme: "presence"
  },
  {
    text: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung",
    theme: "growth"
  },
  {
    text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
    author: "Rumi",
    theme: "purpose"
  }
]

export function getDailyQuote(): Quote {
  // Use date as seed for consistent daily quote
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)
  const index = dayOfYear % quotes.length
  return quotes[index]
}

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)]
}