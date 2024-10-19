import { useContext } from 'react'
import { ThemeRegistry } from '../themes/ThemeRegistry'
import { ThemeContext } from '../context/ThemeContext';
import { useDarkMode } from './useDarkMode';


export const useTheme = (name?: string): any => {
  const themeRegistry = useThemeRegistry()
  const [darkMode, setDarkMode] = useDarkMode()

  if (themeRegistry === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  if (name === undefined) {
    return undefined
  }

  return themeRegistry.getTheme(name, darkMode)
}

export const useThemeRegistry = (): ThemeRegistry => {
  const { registry } = useContext(ThemeContext)

  if (registry === undefined) {
    throw new Error('useThemeRegistry must be used within ThemeProvider')
  }

  return registry
}