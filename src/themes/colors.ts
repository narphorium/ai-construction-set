export const colorPalette = {
  gray: {
    DEFAULT: '#a1a1a1',
    100: '#202020',
    200: '#404040',
    300: '#606060',
    400: '#818181',
    500: '#a1a1a1',
    600: '#b4b4b4',
    700: '#c6c6c6',
    800: '#d9d9d9',
    900: '#ececec'
  },
  slate: {
    DEFAULT: '#9a9fa7',
    100: '#1e2022',
    200: '#3c3f45',
    300: '#5a5f67',
    400: '#787e89',
    500: '#9a9fa7',
    600: '#aeb2b9',
    700: '#c2c5ca',
    800: '#d7d9dc',
    900: '#ebeced'
  },
  purple: {
    DEFAULT: '#865fe3',
    100: '#170a37',
    200: '#2e136d',
    300: '#451da4',
    400: '#5d28d9',
    500: '#865fe3',
    600: '#9e7fe8',
    700: '#b79fee',
    800: '#cfbff4',
    900: '#e7dff9'
  },
  blue: {
    DEFAULT: '#54abed',
    100: '#06243a',
    200: '#0c4774',
    300: '#126bae',
    400: '#1a8ee7',
    500: '#54abed',
    600: '#76bcf1',
    700: '#99cdf4',
    800: '#bbddf8',
    900: '#ddeefb'
  },
  green: {
    DEFAULT: '#7ac77e',
    100: '#132d14',
    200: '#265b29',
    300: '#39883d',
    400: '#4db452',
    500: '#7ac77e',
    600: '#95d298',
    700: '#afdeb2',
    800: '#cae9cb',
    900: '#e4f4e5'
  },
  yellow: {
    DEFAULT: '#fccb44',
    100: '#3f2f01',
    200: '#7f5d02',
    300: '#be8c03',
    400: '#fbba06',
    500: '#fccb44',
    600: '#fdd66a',
    700: '#fde08f',
    800: '#feeab5',
    900: '#fef5da'
  },
  orange: {
    DEFAULT: '#f07e51',
    100: '#3b1405',
    200: '#76290a',
    300: '#b13d0f',
    400: '#eb5216',
    500: '#f07e51',
    600: '#f39874',
    700: '#f6b297',
    800: '#f9ccba',
    900: '#fce5dc'
  },
  red: {
    DEFAULT: '#f54d5b',
    100: '#3d0408',
    200: '#790711',
    300: '#b60b19',
    400: '#f11023',
    500: '#f54d5b',
    600: '#f7707c',
    700: '#f9949c',
    800: '#fbb8bd',
    900: '#fddbde'
  },
  'faded-purple': {
    DEFAULT: '#786c93',
    100: '#18161d',
    200: '#302b3b',
    300: '#484158',
    400: '#605775',
    500: '#786c93',
    600: '#938aa8',
    700: '#aea7be',
    800: '#c9c4d4',
    900: '#e4e2e9'
  },
  'faded-blue': {
    DEFAULT: '#5886a7',
    100: '#121b21',
    200: '#233643',
    300: '#355064',
    400: '#466b86',
    500: '#5886a7',
    600: '#799eb9',
    700: '#9bb6ca',
    800: '#bccfdc',
    900: '#dee7ed'
  },
  'faded-green': {
    DEFAULT: '#6c936f',
    100: '#161d16',
    200: '#2b3b2d',
    300: '#415843',
    400: '#577559',
    500: '#6c936f',
    600: '#8aa88c',
    700: '#a7bea9',
    800: '#c4d4c6',
    900: '#e2e9e2'
  },
  'faded-yellow': {
    DEFAULT: '#ab9454',
    100: '#221e11',
    200: '#443b22',
    300: '#675932',
    400: '#897643',
    500: '#ab9454',
    600: '#bca976',
    700: '#cdbf98',
    800: '#ddd4bb',
    900: '#eeeadd'
  },
  'faded-orange': {
    DEFAULT: '#b4694b',
    100: '#24150f',
    200: '#482a1e',
    300: '#6c3f2d',
    400: '#90543c',
    500: '#b4694b',
    600: '#c3876f',
    700: '#d2a593',
    800: '#e1c3b7',
    900: '#f0e1db'
  },
  'faded-red': {
    DEFAULT: '#b14e56',
    100: '#231011',
    200: '#471f22',
    300: '#6a2f34',
    400: '#8e3e45',
    500: '#b14e56',
    600: '#c17178',
    700: '#d0959a',
    800: '#e0b8bb',
    900: '#efdcdd'
  }
}

export const getColor = (key: string): string | undefined => {
  let name = key.toLowerCase()
  let shade = 'DEFAULT'
  if (name.includes('-')) {
    const parts = name.split('-')
    if ((/\d00/gm).exec(parts[parts.length - 1]) !== null) {
      shade = parts.pop() as string
      name = parts.join('-')
    }
  }
  if (name in colorPalette) {
    const color = colorPalette[name as keyof typeof colorPalette]
    return color[shade as keyof typeof color]
  }
  return undefined
}
