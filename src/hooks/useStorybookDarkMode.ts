import { useEffect, useState } from 'react'

function useStorybookDarkMode (context: any): [boolean, (value: boolean) => void] {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    let globals = { theme: 'light' }
    if (context.store !== undefined) {
      globals = context.store.globals.globals
    } else if (context.globals !== undefined) {
      globals = context.globals
    }
    if (globals.theme === 'dark') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [context])

  return [darkMode, setDarkMode]
}

export default useStorybookDarkMode
