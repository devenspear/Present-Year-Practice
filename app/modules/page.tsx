'use client'

import Link from 'next/link'
import { modules } from '@/lib/modules'
import Header from '@/components/Header'

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-calm dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20 px-8 py-3">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">All Modules</h1>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <Link key={i} href={`/modules/${i + 1}`} className="card-interactive group">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Month {i + 1}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-200">{module.theme}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{module.outcomes}</p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-primary font-medium text-sm">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}