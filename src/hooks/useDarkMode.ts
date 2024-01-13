import { useEffect, useState } from 'react'

function useDarkMode (): boolean {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handler = (): void => { setIsDarkMode(mediaQuery.matches) }
    mediaQuery.addEventListener('change', handler)

    return (): void => { mediaQuery.removeEventListener('change', handler) }
  }, [])

  return isDarkMode
}

export default useDarkMode
