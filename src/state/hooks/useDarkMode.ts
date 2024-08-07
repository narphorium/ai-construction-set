import { useEffect, useState } from 'react'
import { createContext } from 'react'

interface DarkModeProps {
  darkMode: boolean | undefined
  setDarkMode: (mode: boolean) => void
}

export const DarkModeContext = createContext<DarkModeProps>({
  darkMode: false,
  setDarkMode: (mode: boolean) => { }
})


export const useDarkMode = (): [boolean, (value: boolean) => void] => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setDarkMode(mediaQuery.matches)

    const handler = (): void => { setDarkMode(mediaQuery.matches) }
    mediaQuery.addEventListener('change', handler)

    return (): void => { mediaQuery.removeEventListener('change', handler) }
  }, [])

  return [darkMode, setDarkMode]
}
