import { lightTheme as defaultLightTheme } from '../default/lightTheme'
import { extendTheme } from '../theme'

export const lightTheme = extendTheme(defaultLightTheme, {
  fontFamily: {
    default: '"Inter", Helvetica, Arial, sans-serif'
  },
  fontWeight: {
    default: 300
  },
  contentBackgroundColor: {
    default: {
      unselected: 'blue-900',
      selected: 'blue-700'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'blue-600'
    }
  },
  textColor: {
    default: {
      unselected: 'gray-100',
      selected: 'gray-100'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'gray-100'
    }
  },
  fadedTextColor: {
    default: {
      unselected: 'dark-blue-900',
      selected: 'blue-500'
    }
  },
  borderColor: {
    default: {
      unselected: 'blue-600',
      selected: 'blue-500'
    }
  },
  hoverColor: {
    default: {
      unselected: 'blue-800',
      selected: 'blue-700'
    }
  }
})
