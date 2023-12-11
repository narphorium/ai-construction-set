import { lightTheme } from './lightTheme'
import { extendTheme } from './theme'

export const darkTheme = extendTheme(lightTheme, {
  mode: 'dark',
  colors: {
    gray: {
      50: '#0b0b0c',
      100: '#161719',
      200: '#2d2f33',
      300: '#44474c',
      400: '#5b5f66',
      500: '#72777f',
      600: '#898e99',
      700: '#a0a6b2',
      800: '#bbc1cc',
      900: '#d3d9e5',
      980: '#eaeff9'
    }
  },
  fontWeight: 300,
  backgroundColor: '#34363b',
  contentBackgroundColor: {
    default: {
      unselected: 'gray-200',
      selected: 'dark-yellow-300'
    },
    blue: {
      unselected: 'gray-200',
      selected: 'dark-blue-300'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'dark-yellow-300'
    },
    blue: {
      unselected: 'transparent',
      selected: 'dark-blue-300'
    }
  },
  buttonBgColor: {
    default: 'rgba(255 255 255 / 7%)'
  },
  buttonHoverBgColor: {
    default: 'rgba(255 255 255 / 20%)'
  },
  buttonPulseBgColor: {
    default: 'rgba(255 255 255 / 30%)'
  },
  codeBackgroundColor: {
    default: 'gray-100'
  },
  textColor: {
    default: {
      unselected: 'gray-900',
      selected: 'yellow-500'
    },
    blue: {
      unselected: 'blue-700',
      selected: 'blue-500'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'yellow-500'
    },
    blue: {
      unselected: 'inherit',
      selected: 'blue-500'
    }
  },
  fadedTextColor: {
    default: {
      unselected: 'gray-500',
      selected: 'dark-yellow-500'
    },
    blue: {
      unselected: 'dark-blue-600',
      selected: 'dark-blue-400'
    }
  },
  buttonTextColor: {
    default: '#bbbec9'
  },
  borderColor: {
    default: {
      unselected: 'gray-300',
      selected: 'dark-yellow-500'
    },
    blue: {
      unselected: 'dark-blue-400',
      selected: 'dark-blue-400'
    }
  },
  hoverColor: {
    default: {
      unselected: '#2a2a2a',
      selected: '#2a2a2a'
    },
    blue: {
      unselected: '#2a2a2a',
      selected: '#2a2a2a'
    }
  },
  treeColor: {
    default: 'gray-400'
  },
  selectedTreeColor: {
    default: 'yellow-400'
  }
})
