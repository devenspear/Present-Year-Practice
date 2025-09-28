'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme'

export default function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const isApp = pathname.startsWith('/dashboard') || 
                pathname.startsWith('/modules') || 
                pathname.startsWith('/journal') ||
                pathname.startsWith('/service') ||
                pathname.startsWith('/legacy') ||
                pathname.startsWith('/meetings')

  return (
    <nav className="glass-effect shadow-sm px-8 py-4 sticky top-0 z-50 border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="flex justify-between items-center">
        <Link href={isApp ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" 
               className="group-hover:animate-float transition-transform duration-300">
            <circle cx="20" cy="20" r="18" stroke="#4F46E5" strokeWidth="2" className="animate-pulse"/>
            <circle cx="20" cy="20" r="14" stroke="#7C3AED" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="20" cy="20" r="10" stroke="#EC4899" strokeWidth="1" opacity="0.4"/>
            <circle cx="20" cy="20" r="3" fill="#4F46E5" className="group-hover:animate-glow"/>
            <path d="M20 8V32" stroke="#4F46E5" strokeWidth="1" opacity="0.3"/>
            <path d="M8 20H32" stroke="#4F46E5" strokeWidth="1" opacity="0.3"/>
          </svg>
          <span className="text-2xl font-bold text-primary group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            Present Year Practice
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          {isApp ? (
            <>
              <Link href="/dashboard" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/dashboard' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Dashboard
              </Link>
              <Link href="/modules" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname.startsWith('/modules') ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Modules
              </Link>
              <Link href="/journal" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/journal' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Journal
              </Link>
              <Link href="/service" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/service' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Service
              </Link>
              <Link href="/legacy" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/legacy' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Legacy
              </Link>
              <Link href="/meetings" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/meetings' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Meetings
              </Link>
            </>
          ) : (
            <>
              <Link href="/about" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/about' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                About
              </Link>
              <Link href="/program" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/program' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Program
              </Link>
              <Link href="/pricing" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/pricing' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Pricing
              </Link>
              <Link href="/contact" className={`relative py-2 px-3 rounded-lg transition-all duration-200 hover:bg-primary/10 hover:scale-105 ${pathname === '/contact' ? 'text-primary font-semibold bg-primary/5' : 'hover:text-primary'}`}>
                Contact
              </Link>
            </>
          )}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}