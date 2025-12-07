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
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-5xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <p className="text-warmgray uppercase tracking-widest text-sm mb-4">A 12-Month Transformational Journey</p>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-charcoal leading-tight">
            If This Were Your Last Year,<br />
            <span className="text-primary">How Would You Live?</span>
          </h1>
          <p className="text-lg text-warmgray mb-10 max-w-2xl mx-auto leading-relaxed">
            A guided practice of presence, purpose, and peace. Learn to manage your personal reality,
            clarify your priorities, and live each day with intention.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="btn-primary text-lg px-10 py-4"
          >
            Begin Your Journey
          </button>
        </section>

        {/* Decorative divider */}
        <div className="section-divider"></div>

        {/* Path Options */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif text-center mb-3 text-charcoal">Choose Your Path</h2>
          <p className="text-warmgray text-center mb-10">Each path offers a unique way to engage with this practice</p>

          <div className="grid md:grid-cols-3 gap-6">
            <PathCard
              number="1"
              title="Individual Path"
              description="Self-guided journey with daily practices and monthly themes. Move at your own pace, on your own schedule."
              href="/onboarding?path=individual"
              color="primary"
            />
            <PathCard
              number="G"
              title="Group Journey"
              description="Join a cohort for shared growth, accountability, and connection. Experience transformation in community."
              href="/onboarding?path=group"
              color="sage"
            />
            <PathCard
              number="H"
              title="Hybrid Experience"
              description="Combine personal practice with monthly group sessions. The best of both worlds."
              href="/onboarding?path=hybrid"
              color="terracotta"
            />
          </div>
        </section>

        {/* 12-Month Overview */}
        <section className="mb-20">
          <h2 className="text-2xl font-serif text-center mb-3 text-charcoal">The 12-Month Journey</h2>
          <p className="text-warmgray text-center mb-10">Each month explores a fundamental aspect of living fully</p>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { month: 1, theme: 'Embrace Mortality', icon: '~' },
              { month: 2, theme: 'Live Present', icon: '.' },
              { month: 3, theme: 'Let Go', icon: '<' },
              { month: 4, theme: 'Forgiveness', icon: '+' },
              { month: 5, theme: 'Relationships', icon: '&' },
              { month: 6, theme: 'Gratitude', icon: '*' },
              { month: 7, theme: 'Legacy', icon: '>' },
              { month: 8, theme: 'Face Fears', icon: '!' },
              { month: 9, theme: 'Spirituality', icon: '^' },
              { month: 10, theme: 'Acceptance', icon: '=' },
              { month: 11, theme: 'Prepare', icon: '#' },
              { month: 12, theme: 'Live Fully', icon: '@' },
            ].map((item) => (
              <div
                key={item.month}
                className="bg-white rounded-xl p-4 text-center border border-stone/30 hover:border-primary/30 hover:shadow-soft transition-all duration-300 cursor-pointer group"
              >
                <div className="text-xs text-warmgray mb-1">Month {item.month}</div>
                <div className="font-serif text-charcoal group-hover:text-primary transition-colors duration-200">
                  {item.theme}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-sand to-stone rounded-3xl p-12 border border-stone/30">
          <h2 className="text-2xl font-serif mb-4 text-charcoal">Start Your Practice Today</h2>
          <p className="text-warmgray mb-8 max-w-lg mx-auto">
            Download the Month 1 workbook and begin your journey toward living with greater presence and purpose.
          </p>
          <button className="btn-secondary">
            Download Free Workbook
          </button>
        </section>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="text-lg italic text-warmgray max-w-2xl mx-auto">
            "The purpose of life is not to be happy. It is to be useful, to be honorable,
            to be compassionate, to have it make some difference that you have lived and lived well."
          </blockquote>
          <cite className="text-sm text-primary mt-4 block">- Ralph Waldo Emerson</cite>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone/30 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-8 text-center text-warmgray text-sm">
          <p>Present Year Practice - A journey of presence, purpose, and peace</p>
        </div>
      </footer>
    </div>
  )
}

function PathCard({ number, title, description, href, color }: {
  number: string
  title: string
  description: string
  href: string
  color: 'primary' | 'sage' | 'terracotta'
}) {
  const colorClasses = {
    primary: 'bg-primary',
    sage: 'bg-sage',
    terracotta: 'bg-terracotta',
  }

  return (
    <div className="card-interactive group">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center text-white font-serif font-semibold`}>
          {number}
        </div>
        <h3 className="text-lg font-serif text-charcoal">{title}</h3>
      </div>
      <p className="text-warmgray text-sm mb-4 leading-relaxed">{description}</p>
      <Link
        href={href}
        className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2"
      >
        Learn more
        <span className="transition-transform duration-200">&rarr;</span>
      </Link>
    </div>
  )
}
