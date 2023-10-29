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

export const backgroundColor = theme('mode', {
  light: '#fff',
  dark: '#000'
})

export const selectedBackgroundColor = theme('mode', {
  light: 'rgb(253 235 184)',
  dark: 'rgb(73 69 61)'
})

export const borderColor = theme('mode', {
  light: '#fff',
  dark: '#000'
})

export const selectedBorderColor = theme('mode', {
  light: 'rgb(237, 211, 137)',
  dark: 'rgb(109 102 81)'
})

export const textColor = theme('mode', {
  light: '#fff',
  dark: '#eee'
})

export const selectedTextColor = theme('mode', {
  light: '#222',
  dark: '#ffde98'
})
