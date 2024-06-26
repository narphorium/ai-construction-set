import { type DefaultTheme } from 'styled-components'

export type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '980'

export type ColorPalette = Record<string, Record<Shade, string>>

export const getColor = (theme: DefaultTheme, key: string): string | undefined => {
  let name = key.toLowerCase()
  let shade: Shade = '500'
  if (name.includes('-')) {
    const parts = name.split('-')
    if ((/\d{1,3}/gm).exec(parts[parts.length - 1]) !== null) {
      shade = parts.pop() as Shade
      name = parts.join('-')
    }
  }
  if (theme.colors[name] !== undefined) {
    const color = theme.colors[name]
    return color[shade]
  }
  return undefined
}

export const getColors = (theme: DefaultTheme, name: string): Record<string, string> => {
  const colorsByKey: Record<string, string> = {}
  for (const shade in theme.colors[name]) {
    const key = `${name}-${shade}`
    const color = getColor(theme, key)
    if (color !== undefined) {
      colorsByKey[key] = color
    }
  }
  return colorsByKey
}

export const themedVariant = (name: string, variant: string | null = null, selected: boolean | null = null) => {
  return (props: any) => {
    const theme = props.theme
    if (props.block !== undefined) {
      // If the props object has a block property, then use the block for the styled component
      props = props.block
    }

    let value = theme[name]
    const variantKey = variant ?? props.variant ?? 'default'
    if (value instanceof Object) {
      value = value[variantKey]
    }

    const isSelected = selected === true || props.selected === true ? 'selected' : 'unselected'
    if (value instanceof Object) {
      value = value[isSelected]
    }
    if (typeof value === 'string') {
      const themeColor = getColor(theme, value)
      if (themeColor !== undefined) {
        return themeColor
      }
    }
    return value
  }
}

type ThemeObject = Record<string, any>

function mergeThemeObject (source: ThemeObject, target: ThemeObject): ThemeObject {
  const result: ThemeObject = { ...source }
  for (const key in target) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key)) {
      if (typeof target[key] === 'object' && target[key] !== null && !Array.isArray(target[key])) {
        result[key] = mergeThemeObject(result[key] ?? {}, target[key])
      } else {
        result[key] = target[key]
      }
    }
  }
  return result
}

export const extendTheme = (base: DefaultTheme, extension: DefaultTheme): DefaultTheme => {
  return mergeThemeObject(base, extension)
}

// TODO: Create a more strongly typed Theme class
