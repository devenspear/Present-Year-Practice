'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-calm to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">About the Practice</h1>
        
        <div className="prose max-w-none space-y-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            The Present Year Practice is a 12-month journey inspired by mortality awareness, 
            mindfulness, and the profound question: "If this were your last year, how would you live?"
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">To guide individuals through a transformative year of presence, purpose, and peace.</p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">The Journey</h2>
            <p className="text-gray-700 dark:text-gray-300">Each month focuses on a different theme, building upon the previous to create lasting change.</p>
          </section>

          <Link href="/onboarding" className="btn-primary inline-block mt-8">
            Start Your Journey
          </Link>
        </div>
      </main>
    </div>
  )
}