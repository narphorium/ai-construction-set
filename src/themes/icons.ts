import { type DefaultTheme } from 'styled-components'
import { getColor } from './theme'

export const getIcon = (theme: DefaultTheme, name: string, size: number): string | undefined => {
  if (theme.icons[name] === undefined) {
    throw new Error(`Icon ${name} not found`)
  }
  if (theme.icons[name][size] === undefined) {
    throw new Error(`Icon ${name} does not have ${size} defined`)
  }
  return `url('data:image/svg+xml;utf8,${theme.icons[name][size]}')`
}

function convertToRGB (colorCode: string): string {
  if (colorCode.length !== 7) {
    throw new Error('Only six-digit hex colors are allowed.')
  }

  const aRgbHex = colorCode.match(/[a-f,A-F,0-9]{1,2}/g)
  if (aRgbHex !== null && aRgbHex.length === 3) {
    const aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
    ]
    return `rgb(${aRgb[0]} ${aRgb[1]} ${aRgb[2]})`
  }
  throw new Error('Not a valid hex color')
}

type ThemeArgument = string | ((props: any) => string)
type SizeArgument = number | ((props: any) => number)

export const themedIcon = (icon: ThemeArgument, size: SizeArgument, color: ThemeArgument) => {
  return (props: any): string => {
    let svg: string | undefined
    if (typeof icon === 'function') {
      svg = icon(props)
    } else {
      if (typeof size === 'function') {
        size = size(props)
      }
      svg = getIcon(props.theme, icon, size)
    }
    if (svg !== undefined) {
      let colorCode: string | undefined
      if (typeof color === 'function') {
        colorCode = color(props)
      } else {
        console.log('icon props', props)
        colorCode = getColor(props.theme.colors, color)
      }

      if (colorCode !== undefined && colorCode.startsWith('#')) {
        colorCode = convertToRGB(colorCode)
      }
      svg = svg.replace(/fill="[^"]+"/g, `fill="${colorCode}"`)
    }
    return svg ?? ''
  }
}
