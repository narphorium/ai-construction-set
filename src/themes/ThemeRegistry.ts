import { darkTheme as darkBlueTheme } from '../themes/blue/darkTheme'
import { lightTheme as lightBlueTheme } from '../themes/blue/lightTheme'
import { darkTheme } from '../themes/default/darkTheme'
import { lightTheme } from '../themes/default/lightTheme'

export type Theme = object
export interface ThemePair {
  light: Theme
  dark: Theme
}

export interface ThemeRegistry {
  registerTheme: (name: string, lightTheme: any, darkTheme: any) => void
  getTheme: (name: string, darkMode: boolean) => Theme
}

export class DefaultThemeRegistry implements ThemeRegistry {
  themes: Map<string, ThemePair> = new Map<string, ThemePair>()

  constructor() {
    this.registerTheme('default', lightTheme, darkTheme)
    this.registerTheme('blue', lightBlueTheme, darkBlueTheme)
  }

  registerTheme(name: string, lightTheme: any, darkTheme: any): void {
    this.themes.set(name, { light: lightTheme, dark: darkTheme })
  }

  getTheme(name: string, darkMode = false): object {
    if (name === '') {
      name = 'default'
    }
    const themePair = this.themes.get(name)
    if (themePair === undefined) {
      throw new Error('Theme not found: ' + name)
    }
    return darkMode ? themePair.dark : themePair.light
  }
}