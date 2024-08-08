import { useEffect, useState } from 'react'

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
