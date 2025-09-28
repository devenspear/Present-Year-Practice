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
  const [showNewQuote, setShowNewQuote] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome back!</h2>
          <p className="text-gray-600 dark:text-gray-300">Day {Math.floor((Date.now() - new Date(2024, 0, 1).getTime()) / (1000 * 60 * 60 * 24)) % 365} of your practice</p>
        </div>

        {/* Quote of the Day */}
        <div className="mb-8 animate-slide-up">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20 rounded-2xl p-8 group hover:scale-[1.01] transition-transform duration-300">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-10 dark:opacity-20">
              <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-primary dark:text-primary">
                    Today's Inspiration
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setQuote(getRandomQuote())
                    setShowNewQuote(true)
                    showNotification('New inspiration loaded!', 'info')
                  }}
                  className="text-xs text-primary hover:text-secondary transition-colors duration-200 hover:scale-105 transform"
                  title="Get another inspiring quote"
                >
                  <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  New Quote
                </button>
              </div>
              
              <div className="flex items-start gap-4" key={quote.text}>
                <span className="text-5xl text-primary/30 dark:text-primary/40 font-serif leading-none mt-2">"</span>
                <div className="flex-1 animate-fade-in">
                  <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 mb-4 italic leading-relaxed">
                    {quote.text}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      — {quote.author}
                    </p>
                    <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                      {quote.theme}
                    </span>
                  </div>
                </div>
                <span className="text-5xl text-primary/30 dark:text-primary/40 font-serif leading-none self-end mb-2">"</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="font-semibold text-gray-600 dark:text-gray-300">Today's Practice</h3>
            </div>
            <p className="text-lg mb-3 text-gray-800 dark:text-gray-200">{currentModule?.weeklyContent[0]?.practice || 'Take three conscious breaths'}</p>
            <button className="text-primary hover:text-secondary transition-colors duration-200 font-medium hover:scale-105 transform transition-transform">Mark Complete</button>
          </div>

          <div className="card group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-2">This Month</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">{currentModule?.theme}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-primary/10 px-2 py-1 rounded-full">Month {currentMonth}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700 ease-out relative"
                style={{ width: `${getProgress()}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
            <Link href={`/modules/${currentMonth}`} className="text-primary hover:text-secondary transition-colors duration-200 font-medium group-hover:translate-x-1 transform transition-transform inline-block">
              Continue →
            </Link>
          </div>

          <div className="card">
            <h3 className="font-semibold text-gray-600 dark:text-gray-300 mb-3">Streaks 🔥</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <span className="flex items-center gap-2">
                  <span>🙏</span>
                  <span>Gratitude</span>
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{state.streaks.gratitude} days</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <span className="flex items-center gap-2">
                  <span>🧘</span>
                  <span>Presence</span>
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{state.streaks.presence} days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🙏</span>
              <h3 className="text-xl font-semibold">Quick Gratitude</h3>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGratitude()}
                placeholder="What are you grateful for right now?"
                className="flex-1 p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
              />
              <button onClick={addGratitude} className="btn-primary">
                Add
              </button>
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-calm/50 to-light/50 dark:from-primary/10 dark:to-secondary/10 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "Notice one thing you're grateful for right now."
              </p>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📅</span>
              <h3 className="text-xl font-semibold">Upcoming</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:scale-105 transition-transform duration-200">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">Group Circle</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sunday 4pm</div>
                </div>
                <button className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium">Add to Calendar</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:scale-105 transition-transform duration-200">
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">Service Project</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Next Saturday</div>
                </div>
                <Link href="/service" className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium">View Details</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Your Journey</h3>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {modules.map((module, i) => {
              const progress = state.moduleProgress[i]
              const completed = progress?.weeksCompleted.filter(w => w).length || 0
              const isActive = i + 1 === currentMonth
              const isComplete = completed === 4
              
              return (
                <Link
                  key={i}
                  href={`/modules/${i + 1}`}
                  className={`flex-shrink-0 w-36 p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                    isActive ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg animate-glow' :
                    isComplete ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-800 dark:to-emerald-800 text-green-800 dark:text-green-200' :
                    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                >
                  {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>}
                  <div className={`text-sm ${isActive ? 'opacity-90' : 'opacity-75'} relative z-10`}>Month {i + 1}</div>
                  <div className="font-semibold text-sm mt-1 relative z-10">{module.theme}</div>
                  <div className={`text-xs mt-2 relative z-10 ${isActive ? 'opacity-90' : ''}`}>
                    <span className={`inline-block px-2 py-1 rounded-full ${
                      isComplete ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200' :
                      isActive ? 'bg-white/20 text-white' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {completed}/4 weeks
                    </span>
                  </div>
                  {isComplete && (
                    <div className="absolute top-2 right-2 text-green-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
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