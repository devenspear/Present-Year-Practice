'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-calm to-white dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">Contact Us</h1>
        
        <div className="card">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
              <input type="text" className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Subject</label>
              <select className="w-full p-3 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200">
                <option>General Inquiry</option>
                <option>Group Facilitation</option>
                <option>Technical Support</option>
                <option>Partnership</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
              <textarea className="w-full p-3 border dark:border-gray-600 rounded-lg h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary/50 transition-all duration-200"></textarea>
            </div>
            
            <button type="button" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}