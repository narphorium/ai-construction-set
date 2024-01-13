import { extendTheme } from '../theme'
import { lightTheme } from './lightTheme'

export const darkTheme = extendTheme(lightTheme, {
  contentBackgroundColor: {
    default: {
      unselected: 'gray-200',
      selected: 'dark-blue-300'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'dark-blue-300'
    }
  },
  textColor: {
    default: {
      unselected: 'blue-700',
      selected: 'blue-500'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'blue-500'
    }
  },
  fadedTextColor: {
    default: {
      unselected: 'dark-blue-600',
      selected: 'dark-blue-400'
    }
  },
  borderColor: {
    default: {
      unselected: 'dark-blue-400',
      selected: 'dark-blue-400'
    }
  },
  hoverColor: {
    default: {
      unselected: '#2a2a2a',
      selected: '#2a2a2a'
    }
  }
})
