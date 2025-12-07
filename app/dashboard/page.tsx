'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadState, updateState, AppState } from '@/lib/store'
import { modules } from '@/lib/modules'
import { showNotification } from '@/lib/utils'
import Header from '@/components/Header'
import { getDailyQuote, getRandomQuote } from '@/lib/quotes'

export default function Dashboard() {
  const router = useRouter()
  const [state, setState] = useState<AppState | null>(null)
  const [gratitude, setGratitude] = useState('')
  const [quote, setQuote] = useState(getRandomQuote())

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
    setState(appState)

    const timer = setTimeout(() => {
      showNotification('Time for your daily practice', 'info')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  const getCurrentMonth = () => {
    const today = new Date()
    return today.getMonth() + 1
  }

  const getProgress = () => {
    if (!state) return 0
    const completed = state.moduleProgress.reduce((acc, m) =>
      acc + m.weeksCompleted.filter(w => w).length, 0
    )
    return Math.round((completed / 48) * 100)
  }

  const addGratitude = () => {
    if (!gratitude.trim()) return

    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: `Gratitude: ${gratitude}`,
      tags: ['gratitude'],
      mood: 7,
      isPrivate: false
    }

    const newState = updateState({
      journalEntries: [...(state?.journalEntries || []), entry],
      streaks: {
        gratitude: (state?.streaks.gratitude || 0) + 1,
        presence: state?.streaks.presence || 0
      }
    })

    setState(newState)
    setGratitude('')
    showNotification('Gratitude captured!', 'success')
  }

  if (!state) return null

  const currentMonth = getCurrentMonth()
  const currentModule = modules[currentMonth - 1]

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-5xl mx-auto px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-serif mb-2 text-charcoal">Welcome back</h1>
          <p className="text-warmgray">Day {Math.floor((Date.now() - new Date(2024, 0, 1).getTime()) / (1000 * 60 * 60 * 24)) % 365} of your practice</p>
        </div>

        {/* Daily Inspiration */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white rounded-2xl p-8 border border-stone/30 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest text-warmgray">Today's Inspiration</span>
              <button
                onClick={() => {
                  setQuote(getRandomQuote())
                  showNotification('New inspiration loaded', 'info')
                }}
                className="text-xs text-primary hover:text-secondary transition-colors duration-200"
              >
                New Quote
              </button>
            </div>

            <blockquote className="text-xl font-serif text-charcoal mb-4 leading-relaxed italic">
              "{quote.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <cite className="text-warmgray not-italic">- {quote.author}</cite>
              <span className="tag">{quote.theme}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-sage"></div>
              <span className="text-xs uppercase tracking-wide text-warmgray">Today's Practice</span>
            </div>
            <p className="font-serif text-charcoal mb-4">{currentModule?.weeklyContent[0]?.practice || 'Take three conscious breaths'}</p>
            <button className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium">
              Mark Complete
            </button>
          </div>

          <div className="card">
            <span className="text-xs uppercase tracking-wide text-warmgray">This Month</span>
            <div className="flex items-center justify-between mt-2 mb-3">
              <span className="text-2xl font-serif text-charcoal">{currentModule?.theme}</span>
              <span className="tag">Month {currentMonth}</span>
            </div>
            <div className="w-full bg-stone rounded-full h-2 mb-3">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <Link href={`/modules/${currentMonth}`} className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium">
              Continue &rarr;
            </Link>
          </div>

          <div className="card">
            <span className="text-xs uppercase tracking-wide text-warmgray">Your Streaks</span>
            <div className="space-y-3 mt-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-sand/50">
                <span className="text-sm text-charcoal">Gratitude</span>
                <span className="font-serif text-primary">{state.streaks.gratitude} days</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-sand/50">
                <span className="text-sm text-charcoal">Presence</span>
                <span className="font-serif text-primary">{state.streaks.presence} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Gratitude & Upcoming */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-lg font-serif text-charcoal mb-4">Quick Gratitude</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGratitude()}
                placeholder="What are you grateful for right now?"
                className="flex-1"
              />
              <button onClick={addGratitude} className="btn-primary px-4">
                Add
              </button>
            </div>
            <p className="text-sm text-warmgray mt-4 italic">
              "Notice one thing you're grateful for right now."
            </p>
          </div>

          <div className="card">
            <h2 className="text-lg font-serif text-charcoal mb-4">Upcoming</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-sage/10 border border-sage/20">
                <div>
                  <div className="font-medium text-charcoal">Group Circle</div>
                  <div className="text-sm text-warmgray">Sunday 4pm</div>
                </div>
                <button className="text-primary hover:text-secondary transition-colors duration-200 text-sm">
                  Add to Calendar
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-sand/50 border border-stone/30">
                <div>
                  <div className="font-medium text-charcoal">Service Project</div>
                  <div className="text-sm text-warmgray">Next Saturday</div>
                </div>
                <Link href="/service" className="text-primary hover:text-secondary transition-colors duration-200 text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Overview */}
        <div>
          <h2 className="text-lg font-serif text-charcoal mb-4">Your Journey</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {modules.map((module, i) => {
              const progress = state.moduleProgress[i]
              const completed = progress?.weeksCompleted.filter(w => w).length || 0
              const isActive = i + 1 === currentMonth
              const isComplete = completed === 4

              return (
                <Link
                  key={i}
                  href={`/modules/${i + 1}`}
                  className={`flex-shrink-0 w-32 p-4 rounded-xl text-center transition-all duration-300 border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-warm'
                      : isComplete
                      ? 'bg-sage/10 border-sage/30 text-charcoal'
                      : 'bg-white border-stone/30 hover:border-primary/30 hover:shadow-soft'
                  }`}
                >
                  <div className={`text-xs mb-1 ${isActive ? 'text-white/80' : 'text-warmgray'}`}>
                    Month {i + 1}
                  </div>
                  <div className={`font-serif text-sm ${isActive ? 'text-white' : ''}`}>
                    {module.theme}
                  </div>
                  <div className={`text-xs mt-2 ${isActive ? 'text-white/80' : 'text-warmgray'}`}>
                    {completed}/4 weeks
                  </div>
                  {isComplete && (
                    <div className="text-sage text-xs mt-1">Complete</div>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
