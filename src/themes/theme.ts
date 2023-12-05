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
  light: 400,
  dark: 300
})

export const textColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-100', dark: 'gray-900' },
    selected: { light: 'grey-100', dark: 'yellow-500' }
  },
  blue: {
    unselected: { light: 'gray-100', dark: 'blue-700' },
    selected: { light: 'gray-100', dark: 'blue-500' }
  }
})

export const fadedTextColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-700', dark: 'slate-500' },
    selected: { light: 'dark-yellow-900', dark: 'dark-yellow-500' }
  },
  blue: {
    unselected: { light: 'dark-blue-900', dark: 'dark-blue-600' },
    selected: { light: 'blue-500', dark: 'dark-blue-400' }
  }
})

export const backgroundColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'white', dark: 'slate-200' },
    selected: { light: 'yellow-600', dark: 'dark-yellow-300' }
  },
  blue: {
    unselected: { light: 'blue-900', dark: 'slate-200' },
    selected: { light: 'blue-700', dark: 'dark-blue-300' }
  }
})

export const borderColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-800', dark: 'slate-300' },
    selected: { light: 'dark-yellow-900', dark: 'dark-yellow-500' }
  },
  blue: {
    unselected: { light: 'blue-600', dark: 'dark-blue-400' },
    selected: { light: 'blue-500', dark: 'dark-blue-400' }
  }
})

export const spanTextColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'inherit', dark: 'inherit' },
    selected: { light: 'gray-100', dark: 'yellow-500' }
  },
  blue: {
    unselected: { light: 'inherit', dark: 'inherit' },
    selected: { light: 'gray-100', dark: 'blue-500' }
  }
})

export const spanBackgroundColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'yellow-500', dark: 'dark-yellow-300' }
  },
  blue: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'blue-600', dark: 'dark-blue-300' }
  }
})

export const hoverColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'gray-980', dark: '#2a2a2a' },
    selected: { light: 'yellow-400', dark: '#2a2a2a' }
  },
  blue: {
    unselected: { light: 'blue-800', dark: '#2a2a2a' },
    selected: { light: 'blue-700', dark: '#2a2a2a' }
  }
})

export const buttonBgColor = theme('mode', {
  light: getColor('gray-900'),
  dark: 'rgba(255 255 255 / 7%)'
})

export const buttonTextColor = theme('mode', {
  light: '#6e7071',
  dark: '#bbbec9'
})

export const buttonHoverBgColor = theme('mode', {
  light: getColor('gray-800'),
  dark: 'rgba(255 255 255 / 20%)'
})

export const buttonPulseBgColor = theme('mode', {
  light: getColor('gray-700'),
  dark: 'rgba(255 255 255 / 30%)'
})

export const lightTheme = { mode: 'light', colors: colorPalette }

export const darkTheme = { mode: 'dark', colors: colorPalette }
