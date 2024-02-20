import { useEffect, useState } from 'react'

function useDarkMode (): [boolean, (value: boolean) => void] {
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

export default useDarkMode
