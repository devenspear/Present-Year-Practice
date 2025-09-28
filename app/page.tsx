'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadState } from '@/lib/store'
import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const state = loadState()
    if (state.onboardingComplete) {
      router.push('/dashboard')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm via-white to-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-16">
        <section className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-float">
            If This Were Your Last Year,<br />How Would You Live?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A 12-month journey of presence, purpose, and peace
          </p>
          <button 
            onClick={() => router.push('/onboarding')}
            className="btn-primary text-lg px-8 py-4 glow-on-hover"
          >
            Begin Your Journey
          </button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card-interactive group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm group-hover:animate-pulse">
                1
              </div>
              <h3 className="text-xl font-semibold">Individual Path</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Self-guided journey with daily practices and monthly themes</p>
            <Link href="/onboarding?path=individual" className="text-primary hover:text-secondary transition-colors duration-200 font-medium group-hover:translate-x-1 transform transition-transform">
              Learn more →
            </Link>
          </div>
          <div className="card-interactive group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center text-white font-bold text-sm group-hover:animate-pulse">
                G
              </div>
              <h3 className="text-xl font-semibold">Group Journey</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Join a cohort for shared growth and accountability</p>
            <Link href="/onboarding?path=group" className="text-primary hover:text-secondary transition-colors duration-200 font-medium group-hover:translate-x-1 transform transition-transform">
              Learn more →
            </Link>
          </div>
          <div className="card-interactive group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white font-bold text-sm group-hover:animate-pulse">
                H
              </div>
              <h3 className="text-xl font-semibold">Hybrid Experience</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Combine self-practice with monthly group sessions</p>
            <Link href="/onboarding?path=hybrid" className="text-primary hover:text-secondary transition-colors duration-200 font-medium group-hover:translate-x-1 transform transition-transform">
              Learn more →
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">The 12-Month Journey</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              'Embrace Mortality', 'Live Present', 'Let Go', 'Forgiveness',
              'Relationships', 'Gratitude', 'Legacy', 'Face Fears',
              'Spirituality', 'Acceptance', 'Prepare', 'Live Fully'
            ].map((theme, i) => (
              <div key={i} className="glass-effect rounded-lg p-4 text-center hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Month {i + 1}</div>
                <div className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-200">{theme}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-shimmer"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Start Your Practice Today</h3>
            <p className="text-lg mb-6 opacity-90">Download the Month 1 workbook and begin your journey</p>
            <button className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 font-semibold">
              Download Free Workbook
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}