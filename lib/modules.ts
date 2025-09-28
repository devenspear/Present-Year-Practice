export interface Module {
  month: number
  theme: string
  outcomes: string
  practices: string[]
  weeklyContent: {
    week: number
    title: string
    practice: string
    reflection: string
  }[]
  assets: {
    video?: string
    audio?: string
    pdf?: string
  }
}

export const modules: Module[] = [
  {
    month: 1,
    theme: "Embrace Mortality",
    outcomes: "Name fears; set intentions",
    practices: ["Death-awareness meditation", "Intention contract", "Daily reflection"],
    weeklyContent: [
      {
        week: 1,
        title: "Facing the Truth",
        practice: "5-minute mortality meditation",
        reflection: "If this were your last year, what would matter most today?"
      },
      {
        week: 2,
        title: "Naming Fears",
        practice: "Write three fears about death",
        reflection: "Which fear holds the most power over your choices?"
      },
      {
        week: 3,
        title: "Setting Intentions",
        practice: "Create your year intention statement",
        reflection: "How does mortality awareness shape your intention?"
      },
      {
        week: 4,
        title: "Living the Intention",
        practice: "Daily intention reminder practice",
        reflection: "What shifted when you remembered your intention today?"
      }
    ],
    assets: {
      video: "/videos/month1-intro.mp4",
      pdf: "/pdfs/month1-workbook.pdf"
    }
  },
  {
    month: 2,
    theme: "Live the Present",
    outcomes: "Develop presence habits",
    practices: ["Breath timer", "Mindful micro-practices", "Present moment anchors"],
    weeklyContent: [
      {
        week: 1,
        title: "Breath as Anchor",
        practice: "Three conscious breaths, three times daily",
        reflection: "When did breathing bring you back to now?"
      },
      {
        week: 2,
        title: "Micro-Mindfulness",
        practice: "30-second presence pauses",
        reflection: "What did you notice in your pause today?"
      },
      {
        week: 3,
        title: "Sensory Awareness",
        practice: "Five senses check-in",
        reflection: "Which sense awakened you most?"
      },
      {
        week: 4,
        title: "Present Living",
        practice: "Full presence in one daily activity",
        reflection: "How did presence change this ordinary moment?"
      }
    ],
    assets: {
      audio: "/audio/breath-timer.mp3"
    }
  },
  {
    month: 3,
    theme: "Letting Go",
    outcomes: "Declutter life",
    practices: ["10-item release", "Values audit", "Space clearing"],
    weeklyContent: [
      {
        week: 1,
        title: "Physical Release",
        practice: "Release 10 physical items",
        reflection: "What resistance did you notice while letting go?"
      },
      {
        week: 2,
        title: "Digital Declutter",
        practice: "Clear digital spaces",
        reflection: "How does digital simplicity feel?"
      },
      {
        week: 3,
        title: "Relationship Audit",
        practice: "Evaluate energy exchanges",
        reflection: "Which relationships drain vs. nourish?"
      },
      {
        week: 4,
        title: "Values Alignment",
        practice: "Align life with top 3 values",
        reflection: "What no longer serves your values?"
      }
    ],
    assets: {
      pdf: "/pdfs/declutter-tracker.pdf"
    }
  },
  {
    month: 4,
    theme: "Forgiveness",
    outcomes: "Reduce resentments",
    practices: ["Forgiveness letters", "Self-forgiveness", "Release ritual"],
    weeklyContent: [
      {
        week: 1,
        title: "Forgiving Others",
        practice: "Write unsent forgiveness letter",
        reflection: "Name the hurt. Name your needs. Offer release."
      },
      {
        week: 2,
        title: "Self-Forgiveness",
        practice: "Letter to younger self",
        reflection: "What do you need to forgive in yourself?"
      },
      {
        week: 3,
        title: "Releasing Resentment",
        practice: "Resentment inventory and release",
        reflection: "What resentment costs you most energy?"
      },
      {
        week: 4,
        title: "Living Forgiveness",
        practice: "Daily forgiveness practice",
        reflection: "How does forgiveness change your heart?"
      }
    ],
    assets: {
      audio: "/audio/forgiveness-meditation.mp3"
    }
  },
  {
    month: 5,
    theme: "Relationships",
    outcomes: "Strengthen bonds",
    practices: ["Gratitude notes", "Quality time", "Deep listening"],
    weeklyContent: [
      {
        week: 1,
        title: "Appreciation Practice",
        practice: "Send 3 gratitude messages",
        reflection: "How did expressing gratitude feel?"
      },
      {
        week: 2,
        title: "Quality Presence",
        practice: "Undistracted time with loved one",
        reflection: "What emerged in full presence?"
      },
      {
        week: 3,
        title: "Deep Listening",
        practice: "Listen without fixing",
        reflection: "What did you hear when you truly listened?"
      },
      {
        week: 4,
        title: "Connection Ritual",
        practice: "Create weekly connection ritual",
        reflection: "How does ritual deepen relationship?"
      }
    ],
    assets: {
      pdf: "/pdfs/relationship-map.pdf"
    }
  },
  {
    month: 6,
    theme: "Gratitude",
    outcomes: "Savor daily life",
    practices: ["3 gratitudes daily", "Gratitude letter", "Savoring practice"],
    weeklyContent: [
      {
        week: 1,
        title: "Daily Gratitude",
        practice: "Three specific gratitudes each morning",
        reflection: "Notice one thing you're grateful for right now."
      },
      {
        week: 2,
        title: "Gratitude Depth",
        practice: "Deep dive into one gratitude",
        reflection: "What layers exist in this gratitude?"
      },
      {
        week: 3,
        title: "Gratitude Expression",
        practice: "Express gratitude to someone",
        reflection: "How did sharing gratitude impact you both?"
      },
      {
        week: 4,
        title: "Savoring Practice",
        practice: "Fully savor one moment daily",
        reflection: "What details made this moment precious?"
      }
    ],
    assets: {
      audio: "/audio/gratitude-meditation.mp3"
    }
  },
  {
    month: 7,
    theme: "Legacy",
    outcomes: "Define impact",
    practices: ["Legacy letters", "Memory recording", "Values transmission"],
    weeklyContent: [
      {
        week: 1,
        title: "Legacy Vision",
        practice: "Write your legacy statement",
        reflection: "What do you want to leave behind?"
      },
      {
        week: 2,
        title: "Letters to Future",
        practice: "Write letter to loved one",
        reflection: "What wisdom needs sharing?"
      },
      {
        week: 3,
        title: "Memory Capture",
        practice: "Record important memory",
        reflection: "What story must be preserved?"
      },
      {
        week: 4,
        title: "Living Legacy",
        practice: "One legacy action this week",
        reflection: "How are you creating legacy today?"
      }
    ],
    assets: {
      pdf: "/pdfs/legacy-templates.pdf"
    }
  },
  {
    month: 8,
    theme: "Face Fears",
    outcomes: "Build courage",
    practices: ["Fear inventory", "Exposure ladder", "Courage practice"],
    weeklyContent: [
      {
        week: 1,
        title: "Fear Inventory",
        practice: "List and rank your fears",
        reflection: "Which fear limits you most?"
      },
      {
        week: 2,
        title: "Small Courage",
        practice: "One small brave action daily",
        reflection: "What happened when you acted despite fear?"
      },
      {
        week: 3,
        title: "Fear Conversation",
        practice: "Dialogue with your fear",
        reflection: "What is fear trying to protect?"
      },
      {
        week: 4,
        title: "Courage Celebration",
        practice: "Acknowledge your courage",
        reflection: "How has facing fear changed you?"
      }
    ],
    assets: {
      pdf: "/pdfs/fear-ladder.pdf"
    }
  },
  {
    month: 9,
    theme: "Spirituality",
    outcomes: "Connect deeper",
    practices: ["Spiritual inquiry", "Sacred ritual", "Connection practice"],
    weeklyContent: [
      {
        week: 1,
        title: "Spiritual Exploration",
        practice: "Define spirituality for yourself",
        reflection: "What connects you to something greater?"
      },
      {
        week: 2,
        title: "Sacred Practice",
        practice: "Create personal ritual",
        reflection: "How does ritual feed your spirit?"
      },
      {
        week: 3,
        title: "Nature Connection",
        practice: "Silent time in nature",
        reflection: "What did nature teach you?"
      },
      {
        week: 4,
        title: "Spiritual Community",
        practice: "Connect with spiritual community",
        reflection: "How does shared practice deepen connection?"
      }
    ],
    assets: {
      audio: "/audio/spiritual-meditation.mp3"
    }
  },
  {
    month: 10,
    theme: "Acceptance",
    outcomes: "Surrender & peace",
    practices: ["RAIN practice", "Acceptance meditation", "Letting be"],
    weeklyContent: [
      {
        week: 1,
        title: "Recognize Resistance",
        practice: "Notice what you resist",
        reflection: "What are you fighting against?"
      },
      {
        week: 2,
        title: "Allow Experience",
        practice: "RAIN practice daily",
        reflection: "What shifts when you allow?"
      },
      {
        week: 3,
        title: "Investigate Kindly",
        practice: "Explore resistance with compassion",
        reflection: "What does resistance need?"
      },
      {
        week: 4,
        title: "Natural Awareness",
        practice: "Rest in acceptance",
        reflection: "How does acceptance create peace?"
      }
    ],
    assets: {
      audio: "/audio/rain-meditation.mp3"
    }
  },
  {
    month: 11,
    theme: "Prepare Practically",
    outcomes: "End-of-life basics",
    practices: ["Document wishes", "Name proxies", "Organize affairs"],
    weeklyContent: [
      {
        week: 1,
        title: "Document Wishes",
        practice: "Write basic wishes",
        reflection: "What feels important to document?"
      },
      {
        week: 2,
        title: "Choose Proxies",
        practice: "Select and inform proxies",
        reflection: "Who can carry your wishes?"
      },
      {
        week: 3,
        title: "Organize Affairs",
        practice: "Create important docs list",
        reflection: "What needs organizing?"
      },
      {
        week: 4,
        title: "Share Plans",
        practice: "Share plans with loved ones",
        reflection: "How does preparation bring peace?"
      }
    ],
    assets: {
      pdf: "/pdfs/preparation-checklist.pdf"
    }
  },
  {
    month: 12,
    theme: "Live Fully",
    outcomes: "Integrate & celebrate",
    practices: ["Integration review", "Celebration ritual", "Future visioning"],
    weeklyContent: [
      {
        week: 1,
        title: "Year Review",
        practice: "Review your year journey",
        reflection: "What transformed within you?"
      },
      {
        week: 2,
        title: "Integration Practice",
        practice: "Identify key learnings",
        reflection: "What practices stay with you?"
      },
      {
        week: 3,
        title: "Celebration Ritual",
        practice: "Create celebration ceremony",
        reflection: "How do you honor this journey?"
      },
      {
        week: 4,
        title: "Next Year Vision",
        practice: "Design your next year practice",
        reflection: "How will you continue living fully?"
      }
    ],
    assets: {
      pdf: "/pdfs/next-year-plan.pdf"
    }
  }
]