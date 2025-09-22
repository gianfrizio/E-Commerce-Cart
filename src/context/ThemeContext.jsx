import React, { createContext, useContext, useEffect, useState } from 'react'

// 1. CREARE IL CONTEXT
const ThemeContext = createContext(null)

// 2. CREARE IL PROVIDER COMPONENT
function detectSystemPref() {
  try {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
  } catch (e) {}
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      return stored || detectSystemPref()
    } catch (e) {
      return detectSystemPref()
    }
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'light') document.body.classList.add('light-theme')
      else document.body.classList.remove('light-theme')
    }
    try { localStorage.setItem('theme', theme) } catch (e) {}
  }, [theme])

  // Funzioni helper per gestire il tema
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  const isLight = theme === 'light'
  const isDark = theme === 'dark'

  // Valore condiviso con i figli
  const value = {
    theme,
    setTheme,
    toggleTheme,
    isLight,
    isDark,
    colors: {
      background: isLight ? '#ffffff' : '#0f1724',
      text: isLight ? '#0b1220' : '#e6eef8',
      primary: isLight ? '#007bff' : '#7c5cff',
      secondary: isLight ? '#6c757d' : '#9aa4b2'
    }
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. HOOK PERSONALIZZATO PER USARE IL CONTEXT
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme deve essere usato dentro ThemeProvider')
  return context
}
