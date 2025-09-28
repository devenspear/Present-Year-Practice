'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-calm to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">Choose Your Path</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card group">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Individual</h3>
            <div className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Free</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">All 12 monthly modules</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Digital workbooks</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Journal & tracking tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-700 dark:text-gray-300">Self-guided practice</span>
              </li>
            </ul>
            <Link href="/onboarding?path=individual" className="btn-primary w-full text-center">
              Start Free
            </Link>
          </div>

          <div className="card group ring-2 ring-primary dark:ring-primary">
            <div className="bg-primary text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Group</h3>
            <div className="text-3xl font-bold mb-6">$49/mo</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Everything in Individual</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Weekly group circles</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Facilitator support</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Community access</span>
              </li>
            </ul>
            <Link href="/onboarding?path=group" className="btn-primary w-full text-center">
              Join Group
            </Link>
          </div>

          <div className="card group">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Hybrid</h3>
            <div className="text-3xl font-bold mb-6">$29/mo</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Everything in Individual</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Monthly group sessions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Online community</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Resource library</span>
              </li>
            </ul>
            <Link href="/onboarding?path=hybrid" className="btn-primary w-full text-center">
              Go Hybrid
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}