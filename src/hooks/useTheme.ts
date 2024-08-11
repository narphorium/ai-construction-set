import { useContext } from 'react'
import { ThemeRegistry } from '../themes/ThemeRegistry'
import { ThemeContext } from '../state/context';


export const useTheme = (name?: string): [any, any] => {
  const { theme, darkMode, registry } = useContext(ThemeContext)

  if (theme === undefined || darkMode === undefined || registry === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  if (name === undefined) {
    name = theme
  }

  let [lightTheme, darkTheme] = registry.getTheme(name)
  return darkMode === true ? darkTheme : lightTheme
}

export const useThemeRegistry = (): ThemeRegistry => {
  const { registry } = useContext(ThemeContext)

  if (registry === undefined) {
    throw new Error('useThemeRegistry must be used within ThemeProvider')
  }

  return registry
}