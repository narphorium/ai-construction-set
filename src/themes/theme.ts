import theme from 'styled-theming'
import { getColor } from './colors'

export type Variant = 'default' | 'selected'

export const selectedVariants = (mode: string, values: any) => {
  return (props: any) => {
    const variant = props.selected === true ? 'selected' : 'default'
    const color = theme(mode, values[variant])(props)
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
  default: { light: 'gray-100', dark: '#292b2f' },
  selected: { light: 'grey-100', dark: '#ffde98' }
})

export const backgroundColor = selectedVariants('mode', {
  default: { light: 'white', dark: '#292b2f' },
  selected: { light: 'yellow-800', dark: 'yellow-200' }
})

export const borderColor = selectedVariants('mode', {
  default: { light: 'gray-800', dark: 'gray-200' },
  selected: { light: 'yellow-600', dark: 'yellow-400' }
})
