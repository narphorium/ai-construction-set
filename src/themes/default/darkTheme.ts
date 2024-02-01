import { extendTheme } from '../theme'
import { lightTheme } from './lightTheme'

export const darkTheme = extendTheme(lightTheme, {
  colors: {
    gray: {
      1: '#111113',
      2: '#18191b',
      3: '#212225',
      4: '#272a2d',
      5: '#2e3135',
      6: '#363a3f',
      7: '#43484e',
      8: '#5a6169',
      9: '#696e77',
      10: '#777b84',
      11: '#b0b4ba',
      12: '#edeef0'
    },
    purple: {
      1: '#14121f',
      2: '#1b1525',
      3: '#291f43',
      4: '#33255b',
      5: '#3c2e69',
      6: '#473876',
      7: '#56468b',
      8: '#6958ad',
      9: '#6e56cf',
      10: '#7d66d9',
      11: '#baa7ff',
      12: '#e2ddfe'
    },
    blue: {
      1: '#0d1520',
      2: '#111927',
      3: '#0d2847',
      4: '#003362',
      5: '#004074',
      6: '#104d87',
      7: '#205d9e',
      8: '#2870bd',
      9: '#0090ff',
      10: '#3b9eff',
      11: '#70b8ff',
      12: '#c2e6ff'
    },
    green: {
      1: '#0e1511',
      2: '#141a15',
      3: '#1b2a1e',
      4: '#1d3a24',
      5: '#25482d',
      6: '#2d5736',
      7: '#366740',
      8: '#3e7949',
      9: '#46a758',
      10: '#53b365',
      11: '#71d083',
      12: '#c2f0c2'
    },
    yellow: {
      1: '#16120c',
      2: '#1d180f',
      3: '#302008',
      4: '#3f2700',
      5: '#3f3c35',
      6: '#554624',
      7: '#716545',
      8: '#897a56',
      9: '#fdba1f',
      10: '#ffc83b',
      11: '#ffdc91',
      12: '#ffefbe'
    },
    orange: {
      1: '#17120e',
      2: '#1e160f',
      3: '#331e0b',
      4: '#462100',
      5: '#562800',
      6: '#66350c',
      7: '#7e451d',
      8: '#a35829',
      9: '#f76b15',
      10: '#ff801f',
      11: '#ffa057',
      12: '#ffe0c2'
    },
    red: {
      1: '#191111',
      2: '#201314',
      3: '#3b1219',
      4: '#500f1c',
      5: '#611623',
      6: '#72232d',
      7: '#8c333a',
      8: '#b54548',
      9: '#e5484d',
      10: '#ec5d5e',
      11: '#ff9592',
      12: '#ffd1d9'
    }
  },
  backgroundColor: '#2f3237',
  contentBackgroundColor: {
    default: {
      unselected: 'gray-4',
      selected: 'yellow-5'
    }
  },
  spanBackgroundColor: {
    default: {
      unselected: 'transparent',
      selected: 'yellow-6'
    }
  },
  buttonBgColor: {
    default: 'white-2'
  },
  buttonHoverBgColor: {
    default: 'white-4'
  },
  buttonPulseBgColor: {
    default: 'white-5'
  },
  codeBackgroundColor: {
    default: 'gray-5'
  },
  textColor: {
    default: {
      unselected: 'gray-12',
      selected: 'yellow-11'
    }
  },
  spanTextColor: {
    default: {
      unselected: 'inherit',
      selected: 'yellow-11'
    }
  },
  fadedTextColor: {
    default: 'white-7'
  },
  buttonTextColor: {
    default: 'white-10'
  },
  borderColor: {
    default: {
      unselected: 'gray-7',
      selected: 'yellow-7'
    }
  },
  hoverColor: {
    default: 'white-1'
  },
  treeColor: {
    default: 'gray-9'
  },
  selectedTreeColor: {
    default: 'yellow-11'
  }
})
