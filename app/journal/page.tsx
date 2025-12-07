'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone/30 px-8 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif text-charcoal">Journal</h1>
            <p className="text-sm text-warmgray">Reflect, process, and grow</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => exportJournal('txt')} className="btn-secondary text-sm py-2 px-4">
              Export .txt
            </button>
            <button onClick={() => exportJournal('pdf')} className="btn-secondary text-sm py-2 px-4">
              Export .pdf
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-8 py-8">
        <div className="card mb-8">
          <h2 className="text-lg font-serif text-charcoal mb-4">New Entry</h2>

          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What's on your heart today?"
            className="w-full h-32 mb-4"
          />

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Mood (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-sm text-warmgray">
                <span>Low</span>
                <span className="font-medium text-primary">{mood}</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Tags</label>
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
                    className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-sand text-warmgray hover:bg-stone'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="accent-primary"
              />
              <span>Keep this entry private</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={saveEntry} className="btn-primary">
              Save Entry
            </button>
            <span className="text-sm text-warmgray">
              {newEntry.split(' ').filter(w => w).length} words
            </span>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by tag or content..."
            className="w-full"
          />
        </div>

        <div id="journal-entries" className="space-y-4">
          {[...filteredEntries].reverse().map(entry => (
            <div key={entry.id} className="card">
              <div className="flex justify-between items-start mb-3">
                <div className="text-sm text-warmgray">
                  {format(new Date(entry.date), 'PPP')}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-warmgray">Mood: {entry.mood}/10</span>
                  {entry.isPrivate && (
                    <span className="tag text-xs">Private</span>
                  )}
                </div>
              </div>

              <p className="text-charcoal mb-3 whitespace-pre-wrap leading-relaxed">{entry.content}</p>

              {entry.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {entry.tags.map(tag => (
                    <span key={tag} className="tag text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center text-warmgray py-12">
            {filter ? 'No entries match your filter' : 'No journal entries yet. Start writing!'}
          </div>
        )}
      </main>
    </div>
  )
}
