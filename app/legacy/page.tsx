'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadState, updateState, AppState, LegacyItem } from '@/lib/store'
import { exportToPDF, showNotification } from '@/lib/utils'
import { format } from 'date-fns'
import Header from '@/components/Header'

export default function LegacyPage() {
  const router = useRouter()
  const [state, setState] = useState<AppState | null>(null)
  const [activeTab, setActiveTab] = useState<'vault' | 'forgiveness'>('vault')
  const [newItem, setNewItem] = useState({
    type: 'letter' as 'letter' | 'memory',
    title: '',
    content: ''
  })
  const [forgivenessLetter, setForgivenessLetter] = useState({
    step: 1,
    recipient: '',
    hurt: '',
    needs: '',
    release: '',
    isSafe: false
  })

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
    setState(appState)
  }, [router])

  const saveLegacyItem = () => {
    if (!newItem.title || !newItem.content || !state) return

    const item: LegacyItem = {
      id: Date.now().toString(),
      type: newItem.type,
      title: newItem.title,
      content: newItem.content,
      createdAt: new Date().toISOString()
    }

    const newState = updateState({
      legacyItems: [...state.legacyItems, item]
    })
    
    setState(newState)
    setNewItem({ type: 'letter', title: '', content: '' })
    showNotification('Legacy item saved!', 'success')
  }

  const exportLegacyItem = async (item: LegacyItem) => {
    const element = document.createElement('div')
    element.innerHTML = `
      <h1>${item.title}</h1>
      <p>Created: ${format(new Date(item.createdAt), 'PPP')}</p>
      <hr />
      <p>${item.content}</p>
    `
    document.body.appendChild(element)
    await exportToPDF(element, `legacy-${item.title.toLowerCase().replace(/\s+/g, '-')}`)
    document.body.removeChild(element)
    showNotification('Legacy item exported!', 'success')
  }

  const completeForgiveness = () => {
    const letterContent = `
Dear ${forgivenessLetter.recipient},

${forgivenessLetter.hurt}

What I needed was: ${forgivenessLetter.needs}

${forgivenessLetter.release}

With release and peace.
    `.trim()

    const item: LegacyItem = {
      id: Date.now().toString(),
      type: 'letter',
      title: `Forgiveness Letter to ${forgivenessLetter.recipient}`,
      content: letterContent,
      createdAt: new Date().toISOString()
    }

    if (state) {
      const newState = updateState({
        legacyItems: [...state.legacyItems, item]
      })
      setState(newState)
    }

    setForgivenessLetter({
      step: 1,
      recipient: '',
      hurt: '',
      needs: '',
      release: '',
      isSafe: false
    })
    setActiveTab('vault')
    showNotification('Forgiveness letter saved to vault!', 'success')
  }

  if (!state) return null

  const templates = {
    letter: [
      { title: 'Letter to My Children', prompt: 'What wisdom do you want to pass on?' },
      { title: 'Letter to Future Self', prompt: 'What do you hope for your future self?' },
      { title: 'Letter of Gratitude', prompt: 'Who shaped your life? Thank them.' },
      { title: 'Letter of Dreams', prompt: 'What dreams do you hold for those you love?' }
    ],
    memory: [
      { title: 'Defining Moment', prompt: 'A moment that changed everything...' },
      { title: 'Family Story', prompt: 'A story that must be preserved...' },
      { title: 'Life Lesson', prompt: 'The most important thing I learned...' },
      { title: 'Hidden Joy', prompt: 'A simple joy I want remembered...' }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 px-8 py-3">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Legacy & Forgiveness</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'vault' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            Legacy Vault
          </button>
          <button
            onClick={() => setActiveTab('forgiveness')}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'forgiveness' ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            Forgiveness Letter Builder
          </button>
        </div>

        {activeTab === 'vault' && (
          <>
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4">Create Legacy Item</h2>
              
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setNewItem({ ...newItem, type: 'letter' })}
                  className={`px-4 py-2 rounded-lg ${
                    newItem.type === 'letter' ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  Letter
                </button>
                <button
                  onClick={() => setNewItem({ ...newItem, type: 'memory' })}
                  className={`px-4 py-2 rounded-lg ${
                    newItem.type === 'memory' ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}
                >
                  Memory
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Templates</label>
                <select
                  onChange={(e) => {
                    const template = templates[newItem.type].find(t => t.title === e.target.value)
                    if (template) {
                      setNewItem({ ...newItem, title: template.title, content: template.prompt + '\n\n' })
                    }
                  }}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Choose a template...</option>
                  {templates[newItem.type].map(template => (
                    <option key={template.title} value={template.title}>
                      {template.title}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Title"
                className="w-full p-3 border rounded-lg mb-4"
              />

              <textarea
                value={newItem.content}
                onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                placeholder="Write your legacy..."
                className="w-full p-4 border rounded-lg h-48 mb-4"
              />

              <button onClick={saveLegacyItem} className="btn-primary">
                Save to Vault
              </button>
            </div>

            <div className="space-y-4">
              {state.legacyItems.map(item => (
                <div key={item.id} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.type === 'letter' ? 'Letter' : 'Memory'} • {format(new Date(item.createdAt), 'PPP')}
                      </p>
                    </div>
                    <button
                      onClick={() => exportLegacyItem(item)}
                      className="text-primary hover:underline text-sm"
                    >
                      Export PDF
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap">{item.content}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'forgiveness' && (
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Forgiveness Letter Builder</h2>
            
            <div className="mb-6">
              <div className="flex justify-between mb-4">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`w-1/4 h-2 mx-1 rounded ${
                      i <= forgivenessLetter.step ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {forgivenessLetter.step === 1 && (
              <div>
                <h3 className="font-semibold mb-2">Step 1: Who needs your forgiveness?</h3>
                <p className="text-gray-600 mb-4">This can be someone else or yourself.</p>
                <input
                  type="text"
                  value={forgivenessLetter.recipient}
                  onChange={(e) => setForgivenessLetter({ ...forgivenessLetter, recipient: e.target.value })}
                  placeholder="Name or 'Myself'"
                  className="w-full p-3 border rounded-lg mb-4"
                />
                <button
                  onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 2 })}
                  disabled={!forgivenessLetter.recipient}
                  className="btn-primary disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {forgivenessLetter.step === 2 && (
              <div>
                <h3 className="font-semibold mb-2">Step 2: Name the hurt</h3>
                <p className="text-gray-600 mb-4">What happened? How did it affect you?</p>
                <textarea
                  value={forgivenessLetter.hurt}
                  onChange={(e) => setForgivenessLetter({ ...forgivenessLetter, hurt: e.target.value })}
                  placeholder="Describe what happened and how it made you feel..."
                  className="w-full p-3 border rounded-lg h-32 mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 1 })}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 3 })}
                    disabled={!forgivenessLetter.hurt}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {forgivenessLetter.step === 3 && (
              <div>
                <h3 className="font-semibold mb-2">Step 3: Name your needs</h3>
                <p className="text-gray-600 mb-4">What did you need that you didn't receive?</p>
                <textarea
                  value={forgivenessLetter.needs}
                  onChange={(e) => setForgivenessLetter({ ...forgivenessLetter, needs: e.target.value })}
                  placeholder="I needed..."
                  className="w-full p-3 border rounded-lg h-32 mb-4"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 2 })}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 4 })}
                    disabled={!forgivenessLetter.needs}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {forgivenessLetter.step === 4 && (
              <div>
                <h3 className="font-semibold mb-2">Step 4: Offer release</h3>
                <p className="text-gray-600 mb-4">Express your forgiveness without forgetting the lesson.</p>
                <textarea
                  value={forgivenessLetter.release}
                  onChange={(e) => setForgivenessLetter({ ...forgivenessLetter, release: e.target.value })}
                  placeholder="I release you and myself from..."
                  className="w-full p-3 border rounded-lg h-32 mb-4"
                />
                
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={forgivenessLetter.isSafe}
                    onChange={(e) => setForgivenessLetter({ ...forgivenessLetter, isSafe: e.target.checked })}
                  />
                  <span>I've considered whether sending this letter is safe and appropriate</span>
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => setForgivenessLetter({ ...forgivenessLetter, step: 3 })}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={completeForgiveness}
                    disabled={!forgivenessLetter.release}
                    className="btn-primary disabled:opacity-50"
                  >
                    Complete & Save to Vault
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}