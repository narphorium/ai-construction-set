import React, { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { DefaultThemeRegistry, Theme, ThemeRegistry } from '../../themes/ThemeRegistry'
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from '../../themes/default';

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
  theme: string
  darkMode: boolean
  registry?: ThemeRegistry
  children: ReactNode
  setTheme?: (theme: any) => void,
  setDarkMode?: (mode: boolean) => void,
}

export const ThemeProvider = ({ theme, darkMode, registry, children, setTheme, setDarkMode }: ThemeProviderProps): JSX.Element => {
  const [themeState, setThemeState] = useState<Theme>(lightTheme)
  const registryRef = useRef<ThemeRegistry>()

  if (registry !== undefined) {
    registryRef.current = registry
  } else if (registryRef.current === undefined) {
    registryRef.current = new DefaultThemeRegistry()
  }

  useEffect(() => {
    setThemeState(registryRef.current?.getTheme(theme, darkMode) ?? lightTheme)
  }, [theme, darkMode])

  const handleSetTheme = (theme: object) => {
    setThemeState(theme)
    if (setTheme) {
      setTheme(theme)
    }
  }

  const handleSetDarkMode = (mode: boolean) => {
    if (setDarkMode) {
      setDarkMode(mode)
    }
  }

  return (
    <ThemeContext.Provider value={{
      theme: theme,
      darkMode: darkMode,
      registry: registryRef.current,
      setTheme: handleSetTheme,
      setDarkMode: handleSetDarkMode,
      setRegistry: (registry: ThemeRegistry) => { registryRef.current = registry },
    }} >
      <StyledThemeProvider theme={themeState}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}