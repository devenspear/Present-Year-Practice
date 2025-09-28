export interface ModuleProgress {
  month: number
  weeksCompleted: boolean[]
  checklistItems: boolean[]
  journalEntries: string[]
  reflection: string
}

export interface JournalEntry {
  id: string
  date: string
  content: string
  tags: string[]
  mood: number
  isPrivate: boolean
}

export interface ServiceProject {
  id: string
  cause: string
  date: string
  tasks: { text: string; done: boolean }[]
  reflection: string
}

export interface LegacyItem {
  id: string
  type: 'letter' | 'memory'
  title: string
  content: string
  createdAt: string
}

export interface AppState {
  onboardingComplete: boolean
  path: 'individual' | 'group' | 'hybrid' | null
  goals: string[]
  moduleProgress: ModuleProgress[]
  journalEntries: JournalEntry[]
  serviceProjects: ServiceProject[]
  legacyItems: LegacyItem[]
  streaks: {
    gratitude: number
    presence: number
  }
  preferences: {
    reminderTime: string
    notificationsEnabled: boolean
  }
}

const initialState: AppState = {
  onboardingComplete: false,
  path: null,
  goals: [],
  moduleProgress: Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    weeksCompleted: [false, false, false, false],
    checklistItems: [],
    journalEntries: [],
    reflection: ''
  })),
  journalEntries: [],
  serviceProjects: [],
  legacyItems: [],
  streaks: {
    gratitude: 0,
    presence: 0
  },
  preferences: {
    reminderTime: '09:00',
    notificationsEnabled: true
  }
}

export const loadState = (): AppState => {
  if (typeof window === 'undefined') return initialState
  const saved = localStorage.getItem('pypState')
  return saved ? JSON.parse(saved) : initialState
}

export const saveState = (state: AppState): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('pypState', JSON.stringify(state))
  }
}

export const updateState = (updates: Partial<AppState>): AppState => {
  const current = loadState()
  const newState = { ...current, ...updates }
  saveState(newState)
  return newState
}