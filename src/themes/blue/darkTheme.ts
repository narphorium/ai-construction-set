import { extendTheme } from '../theme'
import { lightTheme } from './lightTheme'

export const darkTheme = extendTheme(lightTheme, {
  contentBackgroundColor: {
    default: {
      unselected: 'gray-12',
      selected: 'blue-3'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'blue-3'
    }
  },
  textColor: {
    default: {
      unselected: 'blue-7',
      selected: 'blue-5'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'blue-5'
    }
  },
  borderColor: {
    default: {
      unselected: 'blue-4',
      selected: 'blue-4'
    }
  }
})
