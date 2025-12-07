'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="max-w-3xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-serif mb-8 text-charcoal">About the Practice</h1>

        <div className="space-y-8">
          <p className="text-lg text-warmgray leading-relaxed">
            The Present Year Practice is a 12-month journey inspired by mortality awareness,
            mindfulness, and the profound question: "If this were your last year, how would you live?"
          </p>

          <section className="card">
            <h2 className="text-2xl font-serif mb-4 text-charcoal">Our Mission</h2>
            <p className="text-warmgray leading-relaxed">
              To guide individuals through a transformative year of presence, purpose, and peace.
              We believe that by confronting our mortality with wisdom and compassion, we can live
              more fully in each moment.
            </p>
          </section>

          <section className="card">
            <h2 className="text-2xl font-serif mb-4 text-charcoal">The Journey</h2>
            <p className="text-warmgray leading-relaxed">
              Each month focuses on a different theme, building upon the previous to create lasting change.
              From embracing mortality to living fully, this practice offers a structured yet flexible
              path toward a more meaningful life.
            </p>
          </section>

          <section className="card">
            <h2 className="text-2xl font-serif mb-4 text-charcoal">Our Approach</h2>
            <p className="text-warmgray leading-relaxed">
              Drawing from wisdom traditions, psychology, and contemplative practices, we offer
              a grounded, experiential approach to life's deepest questions. This is not about
              morbidity—it's about vitality, clarity, and living with intention.
            </p>
          </section>

          <div className="text-center pt-8">
            <Link href="/onboarding" className="btn-primary inline-block">
              Start Your Journey
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
