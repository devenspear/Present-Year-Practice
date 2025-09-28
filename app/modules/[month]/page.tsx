'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadState, updateState, AppState } from '@/lib/store'
import { modules } from '@/lib/modules'
import { showNotification } from '@/lib/utils'
import Header from '@/components/Header'

export default function ModulePage({ params }: { params: { month: string } }) {
  const router = useRouter()
  const monthNum = parseInt(params.month)
  const module = modules[monthNum - 1]
  
  const [state, setState] = useState<AppState | null>(null)
  const [reflection, setReflection] = useState('')
  const [activeWeek, setActiveWeek] = useState(1)

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
    setState(appState)
    setReflection(appState.moduleProgress[monthNum - 1]?.reflection || '')
  }, [monthNum, router])

  const toggleWeek = (weekIndex: number) => {
    if (!state) return
    
    const progress = [...state.moduleProgress]
    progress[monthNum - 1].weeksCompleted[weekIndex] = !progress[monthNum - 1].weeksCompleted[weekIndex]
    
    const newState = updateState({ moduleProgress: progress })
    setState(newState)
    showNotification('Progress updated!', 'success')
  }

  const saveReflection = () => {
    if (!state) return
    
    const progress = [...state.moduleProgress]
    progress[monthNum - 1].reflection = reflection
    
    const newState = updateState({ moduleProgress: progress })
    setState(newState)
    showNotification('Reflection saved!', 'success')
  }

  if (!module || !state) return null

  const progress = state.moduleProgress[monthNum - 1]
  const completedWeeks = progress.weeksCompleted.filter(w => w).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 px-8 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Month {monthNum}: {module.theme}</h1>
          <div className="text-sm text-gray-600 dark:text-gray-400">{completedWeeks}/4 weeks complete</div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-3">{module.theme}</h2>
          <p className="text-lg text-gray-600 mb-4">{module.outcomes}</p>
          
          <div className="flex gap-4 mb-6">
            {module.assets.video && (
              <button className="btn-secondary">Watch Video</button>
            )}
            {module.assets.pdf && (
              <button className="btn-secondary">Download Workbook</button>
            )}
            {module.assets.audio && (
              <button className="btn-secondary">Audio Guide</button>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Core Practices:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {module.practices.map((practice, i) => (
                <li key={i}>{practice}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                className={`flex-1 py-2 rounded-lg transition ${
                  activeWeek === week ? 'bg-primary text-white' : 'bg-white'
                }`}
              >
                Week {week}
              </button>
            ))}
          </div>

          <div className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Week {activeWeek}: {module.weeklyContent[activeWeek - 1].title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {module.weeklyContent[activeWeek - 1].practice}
                </p>
              </div>
              <button
                onClick={() => toggleWeek(activeWeek - 1)}
                className={`px-4 py-2 rounded-lg transition ${
                  progress.weeksCompleted[activeWeek - 1]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {progress.weeksCompleted[activeWeek - 1] ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>

            <div className="bg-calm p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Reflection:</h4>
              <p className="italic text-gray-700">
                "{module.weeklyContent[activeWeek - 1].reflection}"
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Weekly Checklist:</h4>
              <div className="space-y-2">
                {['Daily practice', 'Journal entry', 'Reflection', 'Group share (if applicable)'].map((item, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Monthly Reflection</h3>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What did you notice this month? What shifted within you?"
            className="w-full p-3 border rounded-lg h-32"
          />
          <button onClick={saveReflection} className="btn-primary mt-3">
            Save Reflection
          </button>
        </div>

        <div className="flex justify-between mt-8">
          {monthNum > 1 && (
            <Link href={`/modules/${monthNum - 1}`} className="btn-secondary">
              ← Previous Month
            </Link>
          )}
          {monthNum < 12 && (
            <Link href={`/modules/${monthNum + 1}`} className="btn-primary ml-auto">
              Next Month →
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}