'use client'

import { createContext, useContext } from 'react'

// Simplified theme context - light mode only for a warm, inviting experience
interface ThemeContextType {
  theme: 'light'
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light' })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
