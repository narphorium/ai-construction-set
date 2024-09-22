import { lightTheme as defaultLightTheme } from '../default/lightTheme'
import { extendTheme } from '../theme'

export const lightTheme = extendTheme(defaultLightTheme, {
  fontFamily: {
    default: '"Inter", Helvetica, Arial, sans-serif'
  },
  fontWeight: {
    default: 400
  },
  contentBackgroundColor: {
    default: {
      unselected: 'blue-2',
      selected: 'blue-4'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'blue-7'
    }
  },
  textColor: {
    default: {
      unselected: 'gray-12',
      selected: 'gray-12'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'gray-12'
    }
  },
  borderColor: {
    default: {
      unselected: 'blue-5',
      selected: 'blue-6'
    }
  }
})
