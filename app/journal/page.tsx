'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loadState, updateState, AppState, JournalEntry } from '@/lib/store'
import { exportToText, exportToPDF, showNotification } from '@/lib/utils'
import { format } from 'date-fns'
import Header from '@/components/Header'

export default function JournalPage() {
  const router = useRouter()
  const [state, setState] = useState<AppState | null>(null)
  const [newEntry, setNewEntry] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mood, setMood] = useState(5)
  const [filter, setFilter] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
    setState(appState)
  }, [router])

  const saveEntry = () => {
    if (!newEntry.trim() || !state) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content: newEntry,
      tags: selectedTags,
      mood,
      isPrivate
    }

    const newState = updateState({
      journalEntries: [...state.journalEntries, entry]
    })
    
    setState(newState)
    setNewEntry('')
    setSelectedTags([])
    setMood(5)
    setIsPrivate(false)
    showNotification('Journal entry saved!', 'success')
  }

  const exportJournal = async (exportFormat: 'txt' | 'pdf') => {
    if (!state) return
    
    const content = state.journalEntries
      .map(entry => `${exportFormat === 'txt' ? format(new Date(entry.date), 'PPP') : ''}\nMood: ${entry.mood}/10\nTags: ${entry.tags.join(', ')}\n\n${entry.content}\n\n---\n`)
      .join('\n')

    if (exportFormat === 'txt') {
      exportToText(content, 'journal-export')
    } else {
      const element = document.getElementById('journal-entries')
      if (element) {
        await exportToPDF(element, 'journal-export')
      }
    }
    showNotification('Journal exported!', 'success')
  }

  if (!state) return null

  const filteredEntries = state.journalEntries.filter(entry =>
    filter ? entry.tags.includes(filter) || entry.content.toLowerCase().includes(filter.toLowerCase()) : true
  )

  const availableTags = ['gratitude', 'reflection', 'fear', 'joy', 'growth', 'challenge', 'insight', 'intention']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 px-8 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Journal</h1>
          <div className="flex gap-2">
            <button onClick={() => exportJournal('txt')} className="btn-secondary text-sm">
              Export .txt
            </button>
            <button onClick={() => exportJournal('pdf')} className="btn-secondary text-sm">
              Export .pdf
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">New Entry</h2>
          
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What's on your heart today?"
            className="w-full p-4 border rounded-lg h-32 mb-4"
          />

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Low</span>
                <span className="font-semibold">{mood}</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag))
                      } else {
                        setSelectedTags([...selectedTags, tag])
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span>Keep this entry private</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button onClick={saveEntry} className="btn-primary">
              Save Entry
            </button>
            <div className="text-sm text-gray-600 flex items-center">
              Word count: {newEntry.split(' ').filter(w => w).length}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by tag or content..."
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div id="journal-entries" className="space-y-4">
          {filteredEntries.reverse().map(entry => (
            <div key={entry.id} className="card">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm text-gray-600">
                  {format(new Date(entry.date), 'PPP')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Mood: {entry.mood}/10</span>
                  {entry.isPrivate && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Private</span>
                  )}
                </div>
              </div>
              
              <p className="mb-3 whitespace-pre-wrap">{entry.content}</p>
              
              {entry.tags.length > 0 && (
                <div className="flex gap-2">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-xs bg-calm px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            {filter ? 'No entries match your filter' : 'No journal entries yet. Start writing!'}
          </div>
        )}
      </main>
    </div>
  )
}