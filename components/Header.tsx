'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isApp = pathname.startsWith('/dashboard') ||
                pathname.startsWith('/modules') ||
                pathname.startsWith('/journal') ||
                pathname.startsWith('/service') ||
                pathname.startsWith('/legacy') ||
                pathname.startsWith('/meetings')

  return (
    <nav className="glass-effect shadow-soft px-8 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href={isApp ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          {/* Organic, nature-inspired logo */}
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
               className="group-hover:scale-105 transition-transform duration-300">
            {/* Outer circle - representing wholeness */}
            <circle cx="22" cy="22" r="20" stroke="#8B7355" strokeWidth="1.5" opacity="0.3"/>
            {/* Middle circle - the journey */}
            <circle cx="22" cy="22" r="14" stroke="#A67C52" strokeWidth="1.5" opacity="0.5"/>
            {/* Inner circle - the present moment */}
            <circle cx="22" cy="22" r="8" stroke="#C4A77D" strokeWidth="1.5" opacity="0.7"/>
            {/* Center dot - self */}
            <circle cx="22" cy="22" r="3" fill="#8B7355"/>
            {/* Gentle leaf/growth element */}
            <path d="M22 10 C22 10, 28 16, 28 22 C28 28, 22 34, 22 34"
                  stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
            <path d="M22 10 C22 10, 16 16, 16 22 C16 28, 22 34, 22 34"
                  stroke="#9CAF88" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round"/>
          </svg>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-semibold text-primary group-hover:text-secondary transition-colors duration-300">
              Present Year Practice
            </span>
            <span className="text-xs text-warmgray tracking-wide">Live Fully. Be Present.</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isApp ? (
            <>
              <NavLink href="/dashboard" active={pathname === '/dashboard'}>Dashboard</NavLink>
              <NavLink href="/modules" active={pathname.startsWith('/modules')}>Modules</NavLink>
              <NavLink href="/journal" active={pathname === '/journal'}>Journal</NavLink>
              <NavLink href="/service" active={pathname === '/service'}>Service</NavLink>
              <NavLink href="/legacy" active={pathname === '/legacy'}>Legacy</NavLink>
              <NavLink href="/meetings" active={pathname === '/meetings'}>Meetings</NavLink>
            </>
          ) : (
            <>
              <NavLink href="/about" active={pathname === '/about'}>About</NavLink>
              <NavLink href="/program" active={pathname === '/program'}>Program</NavLink>
              <NavLink href="/pricing" active={pathname === '/pricing'}>Pricing</NavLink>
              <NavLink href="/contact" active={pathname === '/contact'}>Contact</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`py-2 px-4 rounded-full text-sm transition-all duration-200 ${
        active
          ? 'bg-sand text-primary font-medium'
          : 'text-warmgray hover:text-primary hover:bg-sand/50'
      }`}
    >
      {children}
    </Link>
  )
}
