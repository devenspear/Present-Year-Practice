'use client'

import Link from 'next/link'
import { modules } from '@/lib/modules'
import Header from '@/components/Header'

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="bg-white/80 backdrop-blur-sm border-b border-stone/30 px-8 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-serif text-charcoal">All Modules</h1>
          <p className="text-sm text-warmgray">Your 12-month journey of transformation</p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module, i) => (
            <Link key={i} href={`/modules/${i + 1}`} className="card-interactive group">
              <div className="text-xs text-warmgray uppercase tracking-wide mb-2">Month {i + 1}</div>
              <h3 className="text-xl font-serif mb-3 text-charcoal group-hover:text-primary transition-colors duration-200">
                {module.theme}
              </h3>
              <p className="text-warmgray text-sm leading-relaxed">{module.outcomes}</p>
              <div className="mt-4 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore &rarr;
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
