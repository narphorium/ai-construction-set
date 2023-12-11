import { ColorItem } from '@storybook/blocks'
import React from 'react'
import { useTheme } from 'styled-components'
import { getColors } from '../themes/theme'

export const ThemedColorItem = ({ name }: { name: string }): JSX.Element => {
  const theme = useTheme()
  return <ColorItem
      title={'theme.colors.' + name}
      subtitle={name}
      colors={getColors(theme, name)}
    />
}
