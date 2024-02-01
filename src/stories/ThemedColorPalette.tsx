import { ColorPalette } from '@storybook/blocks'
import React, { useContext, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { BlockFactoryContext } from '../hooks'
import { DarkModeContext } from './DarkModeProvider'

export const ThemedColorPalette = ({ children, theme }: { children: JSX.Element[], theme: string }): JSX.Element => {
  const { factory } = useContext(BlockFactoryContext)
  const { mode } = useContext(DarkModeContext)

  if (factory === undefined) {
    throw new Error('BlockFactoryContext is undefined')
  }
  const [lightTheme, darkTheme] = factory.getTheme(theme)
  const [currentTheme, setCurrentTheme] = React.useState(lightTheme)

  useEffect(() => {
    if (mode === 'dark') {
      setCurrentTheme(darkTheme)
    } else {
      setCurrentTheme(lightTheme)
    }
  }, [mode])

  return <ThemeProvider theme={currentTheme}>
    <ColorPalette>
      {children}
    </ColorPalette>
  </ThemeProvider>
}
