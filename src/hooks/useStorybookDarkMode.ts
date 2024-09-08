import { useEffect, useState } from 'react'

export const useStorybookDarkMode = (context: any): [boolean, (value: boolean) => void] => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    let globals = { theme: 'light' }
    if (context.store !== undefined) {
      globals = context.store.globals.globals
    } else if (context.globals !== undefined) {
      globals = context.globals
    }
    const globalTheme = globals.theme === 'dark'
    if (globalTheme !== darkMode) {
      setDarkMode(globalTheme)
    }
  }, [context])

  return [darkMode, setDarkMode]
}
