import { createContext } from 'react'

interface DarkModeProps {
  mode: string | undefined
  setMode: (mode: string) => void
}

export const DarkModeContext = createContext<DarkModeProps>({
  mode: 'light',
  setMode: (mode: string) => {}
})
