import theme from 'styled-theming'

export type Variant = 'default' | 'selected'

export const selectedVariants = (mode: string, values: any) => {
  return (props: any) => {
    const variant = props.selected === true ? 'selected' : 'default'
    return theme(mode, values[variant])(props)
  }
}

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

export const defaultFont = theme('mode', {
  light: 'Arial',
  dark: 'Arial'
})

export const fontWeight = theme('mode', {
  light: 500,
  dark: 400
})
