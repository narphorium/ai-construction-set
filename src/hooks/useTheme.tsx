import React, { createContext, ReactNode, useContext, useRef } from 'react'
import { DefaultThemeRegistry, ThemeRegistry } from '../themes/ThemeRegistry'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface ThemeContextProps {
  theme: string,
  darkMode: boolean | undefined
  registry: ThemeRegistry | undefined
  setTheme: (theme: any) => void
  setDarkMode: (mode: boolean) => void
  setRegistry: (registry: ThemeRegistry) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'default',
  darkMode: false,
  registry: undefined,
  setTheme: (theme: any) => { },
  setDarkMode: (mode: boolean) => { },
  setRegistry: (registry: ThemeRegistry) => { },
})

export interface ThemeProviderProps {
  theme?: any
  darkMode?: boolean
  registry?: ThemeRegistry
  children: ReactNode
  setTheme?: (theme: any) => void,
  setDarkMode?: (mode: boolean) => void,
}

export const ThemeProvider = ({ theme, darkMode, registry, children, setTheme, setDarkMode }: ThemeProviderProps): JSX.Element => {
  const themeRef = useRef<string>('default')
  const darkModeRef = useRef<boolean>()
  const registryRef = useRef<ThemeRegistry>()
  if (theme !== undefined) {
    themeRef.current = theme
  }
  if (darkMode !== undefined) {
    darkModeRef.current = darkMode
  }
  if (registry !== undefined) {
    registryRef.current = registry
  } else if (registryRef.current === undefined) {
    registryRef.current = new DefaultThemeRegistry()
  }

  const handleSetTheme = (theme: any) => {
    themeRef.current = theme
    if (setTheme) {
      setTheme(theme)
    }
  }

  const handleSetDarkMode = (mode: boolean) => {
    darkModeRef.current = mode
    if (setDarkMode) {
      setDarkMode(mode)
    }
  }

  return (
    <ThemeContext.Provider value={{
      theme: themeRef.current,
      darkMode: darkModeRef.current,
      registry: registryRef.current,
      setTheme: handleSetTheme,
      setDarkMode: handleSetDarkMode,
      setRegistry: (registry: ThemeRegistry) => { registryRef.current = registry },
    }} >
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

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