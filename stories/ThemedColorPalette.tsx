import { ColorPalette } from '@storybook/blocks'
import React from 'react'
import { ThemeProvider } from '../src/state/context'

export const ThemedColorPalette = ({ children, theme }: { children: JSX.Element[], theme: string }): JSX.Element => {
  return <ColorPalette>
    {children}
  </ColorPalette>
}
