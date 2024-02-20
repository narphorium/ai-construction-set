import { createContext } from 'react'

interface DarkModeProps {
  darkMode: boolean | undefined
  setDarkMode: (mode: boolean) => void
}

export const DarkModeContext = createContext<DarkModeProps>({
  darkMode: false,
  setDarkMode: (mode: boolean) => {}
})
