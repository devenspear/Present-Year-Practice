'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { loadState } from '@/lib/store'
import { showNotification } from '@/lib/utils'
import Header from '@/components/Header'

interface Timer {
  duration: number
  remaining: number
  isRunning: boolean
}

export default function MeetingsPage() {
  const router = useRouter()
  const [agenda, setAgenda] = useState('60min')
  const [timer, setTimer] = useState<Timer>({ duration: 60, remaining: 60, isRunning: false })
  const [talkingQueue, setTalkingQueue] = useState<string[]>([])
  const [newSpeaker, setNewSpeaker] = useState('')
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const appState = loadState()
    if (!appState.onboardingComplete) {
      router.push('/')
      return
    }
  }, [router])

  useEffect(() => {
    if (timer.isRunning && timer.remaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          remaining: Math.max(0, prev.remaining - 1)
        }))
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timer.isRunning && timer.remaining === 0) {
        playChime()
        showNotification('Timer complete!', 'info')
        setTimer(prev => ({ ...prev, isRunning: false }))
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timer.isRunning, timer.remaining])

  const playChime = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi77OScTgwOUaje59VzIAU')
    }
    audioRef.current.play()
  }

  const agendas = {
    '60min': {
      title: '60-Minute Circle',
      segments: [
        { name: 'Opening & Centering', duration: 5 },
        { name: 'Check-in Round', duration: 15 },
        { name: 'Practice/Teaching', duration: 20 },
        { name: 'Sharing & Discussion', duration: 15 },
        { name: 'Closing Ritual', duration: 5 }
      ]
    },
    '90min': {
      title: '90-Minute Deep Dive',
      segments: [
        { name: 'Opening & Centering', duration: 10 },
        { name: 'Check-in Round', duration: 20 },
        { name: 'Practice/Teaching', duration: 30 },
        { name: 'Sharing & Discussion', duration: 20 },
        { name: 'Closing Ritual', duration: 10 }
      ]
    },
    'custom': {
      title: 'Custom Meeting',
      segments: []
    }
  }

  const startTimer = (minutes: number) => {
    setTimer({
      duration: minutes * 60,
      remaining: minutes * 60,
      isRunning: true
    })
  }

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }))
  }

  const resetTimer = () => {
    setTimer(prev => ({ ...prev, remaining: prev.duration, isRunning: false }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addToQueue = () => {
    if (!newSpeaker.trim()) return
    setTalkingQueue([...talkingQueue, newSpeaker])
    setNewSpeaker('')
  }

  const nextSpeaker = () => {
    if (talkingQueue.length > 0) {
      setCurrentSpeaker(talkingQueue[0])
      setTalkingQueue(talkingQueue.slice(1))
      playChime()
    }
  }

  const closingRituals = [
    "Share one word describing your state right now",
    "Take three breaths together in silence",
    "Each person shares one gratitude",
    "Hold hands and share a moment of silence",
    "Read a closing poem or quote together"
  ]

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone/30 px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-serif text-charcoal">Meeting Toolkit</h1>
          <p className="text-sm text-warmgray">Facilitate meaningful gatherings</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="card mb-6">
              <h2 className="text-lg font-serif text-charcoal mb-4">Agenda Builder</h2>

              <div className="flex gap-2 mb-4">
                {Object.keys(agendas).map(key => (
                  <button
                    key={key}
                    onClick={() => setAgenda(key)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                      agenda === key ? 'bg-primary text-white' : 'bg-sand text-warmgray hover:bg-stone'
                    }`}
                  >
                    {key === 'custom' ? 'Custom' : key}
                  </button>
                ))}
              </div>

              {agenda !== 'custom' && (
                <div className="space-y-2">
                  <h3 className="font-medium text-charcoal mb-3">{agendas[agenda as keyof typeof agendas].title}</h3>
                  {agendas[agenda as keyof typeof agendas].segments.map((segment, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-sand/50 rounded-xl border border-stone/20">
                      <span className="text-charcoal text-sm">{segment.name}</span>
                      <button
                        onClick={() => startTimer(segment.duration)}
                        className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium"
                      >
                        {segment.duration} min &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {agenda === 'custom' && (
                <div className="text-warmgray text-sm">
                  <p>Create your own meeting structure</p>
                  <button className="btn-secondary mt-3 text-sm py-2">Build Custom Agenda</button>
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="text-lg font-serif text-charcoal mb-4">Talking Stick Queue</h2>

              {currentSpeaker && (
                <div className="bg-primary text-white p-4 rounded-xl mb-4">
                  <div className="text-xs uppercase tracking-wide opacity-80">Now Speaking</div>
                  <div className="text-lg font-serif">{currentSpeaker}</div>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSpeaker}
                  onChange={(e) => setNewSpeaker(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addToQueue()}
                  placeholder="Add name to queue"
                  className="flex-1"
                />
                <button onClick={addToQueue} className="btn-primary px-4">
                  Add
                </button>
              </div>

              {talkingQueue.length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="text-xs uppercase tracking-wide text-warmgray">Waiting to speak</div>
                  {talkingQueue.map((name, i) => (
                    <div key={i} className="flex justify-between items-center p-2 bg-sand/50 rounded-lg">
                      <span className="text-sm text-charcoal">{i + 1}. {name}</span>
                      <button
                        onClick={() => setTalkingQueue(talkingQueue.filter((_, idx) => idx !== i))}
                        className="text-terracotta hover:text-terracotta/80 transition-colors duration-200 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={nextSpeaker}
                disabled={talkingQueue.length === 0}
                className="btn-primary w-full disabled:opacity-50"
              >
                Next Speaker
              </button>
            </div>
          </div>

          <div>
            <div className="card mb-6">
              <h2 className="text-lg font-serif text-charcoal mb-4">Timer</h2>

              <div className="text-center mb-6">
                <div className="text-5xl font-serif text-primary mb-4">
                  {formatTime(timer.remaining)}
                </div>

                <div className="flex justify-center gap-2">
                  <button onClick={toggleTimer} className="btn-primary px-6">
                    {timer.isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button onClick={resetTimer} className="btn-secondary px-4">
                    Reset
                  </button>
                  <button onClick={playChime} className="btn-secondary px-4">
                    Test Chime
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10, 15, 20, 30].map(mins => (
                  <button
                    key={mins}
                    onClick={() => startTimer(mins)}
                    className="p-2 bg-sand text-warmgray hover:bg-stone hover:text-charcoal rounded-lg transition-all duration-200 text-sm"
                  >
                    {mins} min
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-serif text-charcoal mb-4">Closing Ritual</h2>

              <div className="space-y-2">
                {closingRituals.map((ritual, i) => (
                  <div key={i} className="p-3 bg-sand/50 rounded-xl border border-stone/20 hover:border-primary/30 transition-all duration-200 cursor-pointer text-sm text-charcoal">
                    {ritual}
                  </div>
                ))}
              </div>

              <button className="btn-secondary w-full mt-4 text-sm py-2">
                Download Facilitator Guide
              </button>
            </div>
          </div>
        </div>

        <div className="card mt-8">
          <h3 className="text-lg font-serif text-charcoal mb-4">Quick Resources</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-sand/50 rounded-xl border border-stone/20 hover:border-primary/30 transition-all duration-200 text-sm text-charcoal">
              Print Check-in Sheet
            </button>
            <button className="p-4 bg-sand/50 rounded-xl border border-stone/20 hover:border-primary/30 transition-all duration-200 text-sm text-charcoal">
              Download Agenda PDF
            </button>
            <button className="p-4 bg-sand/50 rounded-xl border border-stone/20 hover:border-primary/30 transition-all duration-200 text-sm text-charcoal">
              Safety Guidelines
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
