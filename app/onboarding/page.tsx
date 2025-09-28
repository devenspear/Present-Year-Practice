'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateState } from '@/lib/store'
import { downloadICS, generateICS, showNotification } from '@/lib/utils'
import Header from '@/components/Header'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [path, setPath] = useState<'individual' | 'group' | 'hybrid' | null>(null)
  const [goals, setGoals] = useState<string[]>([])
  const [reminderTime, setReminderTime] = useState('09:00')

  const handleComplete = () => {
    updateState({
      onboardingComplete: true,
      path,
      goals,
      preferences: {
        reminderTime,
        notificationsEnabled: true
      }
    })
    
    const icsContent = generateICS(
      'Begin Present Year Practice',
      'Start your 12-month journey of presence and purpose',
      new Date(),
      60
    )
    downloadICS('present-year-kickoff', icsContent)
    
    showNotification('Welcome to your Present Year Practice!', 'success')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-calm to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="max-w-2xl mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className={`w-1/4 h-2 mx-1 rounded ${
                  i <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">Welcome to Your Journey</h1>
          <p className="text-gray-600 dark:text-gray-300">Let's set up your practice in just a few minutes</p>
        </div>

        {step === 1 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Choose Your Path</h2>
            <div className="space-y-3">
              {[
                { value: 'individual', label: 'Individual', desc: 'Self-guided personal practice' },
                { value: 'group', label: 'Group', desc: 'Join a supportive cohort' },
                { value: 'hybrid', label: 'Hybrid', desc: 'Solo practice with monthly gatherings' }
              ].map(option => (
                <label
                  key={option.value}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                    path === option.value ? 'border-primary bg-calm' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={path === option.value}
                    onChange={(e) => setPath(e.target.value as any)}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-800 dark:text-gray-200">{option.label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</div>
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!path}
              className="btn-primary w-full mt-6 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What brings you here?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Select all that resonate</p>
            <div className="space-y-2">
              {[
                'Living with more presence',
                'Preparing for the future',
                'Healing relationships',
                'Finding meaning and purpose',
                'Reducing anxiety about death',
                'Creating a legacy',
                'Building community',
                'Spiritual growth'
              ].map(goal => (
                <label key={goal} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={goals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setGoals([...goals, goal])
                      } else {
                        setGoals(goals.filter(g => g !== goal))
                      }
                    }}
                    className="mr-3"
                  />
                  <span className="text-gray-800 dark:text-gray-200">{goal}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={goals.length === 0}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Set Your Practice Rhythm</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Daily reminder time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  We'll remind you to check in with your practice
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                Back
              </button>
              <button onClick={() => setStep(4)} className="btn-primary flex-1">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">You're Ready!</h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">Path chosen</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{path} practice</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">Goals set</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{goals.length} areas of focus</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">Reminders scheduled</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Daily at {reminderTime}</div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click below to download your Month 1 workbook and add your kickoff event to your calendar.
            </p>
            <button onClick={handleComplete} className="btn-primary w-full">
              Begin Your Practice
            </button>
          </div>
        )}
      </div>
    </div>
  )
}