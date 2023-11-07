import theme from 'styled-theming'
import { colorPalette, getColor } from './colors'

export type Variant = 'default' | 'selected'

export const selectedVariants = (mode: string, values: any) => {
  // TODO: Allow passing in parent variants to extend them
  return (props: any) => {
    const variant = props.variant !== undefined ? props.variant.toLowerCase() : 'default'
    const selected = props.selected === true ? 'selected' : 'unselected'
    const color = theme(mode, values[variant][selected])(props)
    const themeColor = getColor(color)
    if (themeColor !== undefined) {
      return themeColor
    }
    return color
  }
}

export const defaultFont = '"Inter", Helvetica, Arial, sans-serif'

export const fontWeight = theme('mode', {
  light: 500,
  dark: 400
})

export const textColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-100', dark: '#292b2f' },
    selected: { light: 'grey-100', dark: '#ffde98' }
  },
  blue: {
    unselected: { light: 'gray-100', dark: '#292b2f' },
    selected: { light: 'blue-200', dark: '#ffde98' }
  }
})

export const backgroundColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'white', dark: '#292b2f' },
    selected: { light: 'yellow-800', dark: 'yellow-200' }
  },
  blue: {
    unselected: { light: 'blue-900', dark: '#292b2f' },
    selected: { light: 'yellow-800', dark: 'yellow-200' }
  }
})

export const borderColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-800', dark: 'gray-200' },
    selected: { light: 'yellow-600', dark: 'yellow-400' }
  },
  blue: {
    unselected: { light: 'faded-blue-800', dark: 'gray-200' },
    selected: { light: 'yellow-600', dark: 'yellow-400' }
  }
})

export const lightTheme = { mode: 'light', colors: colorPalette }

export const darkTheme = { mode: 'dark', colors: colorPalette }
