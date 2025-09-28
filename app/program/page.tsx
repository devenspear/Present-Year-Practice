'use client'

import Link from 'next/link'
import { modules } from '@/lib/modules'
import Header from '@/components/Header'

export default function ProgramPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-calm to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">The 12-Month Program</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {modules.map((module, i) => (
            <div key={i} className="card group">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200">{i + 1}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{module.theme}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{module.outcomes}</p>
                  <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    {module.practices.slice(0, 2).map((practice, j) => (
                      <li key={j}>• {practice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/onboarding" className="btn-primary text-lg px-8 py-4">
            Begin Your Practice
          </Link>
        </div>
      </main>
    </div>
  )
}