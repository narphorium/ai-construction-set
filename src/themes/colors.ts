const colorPalette = {
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
  }
}

export const getColor = (key: string): string | undefined => {
  let name = key.toLowerCase()
  let shade = 'DEFAULT'
  if (name.includes('-')) {
    [name, shade] = name.split('-')
  }
  if (name in colorPalette) {
    const color = colorPalette[name as keyof typeof colorPalette]
    return color[shade as keyof typeof color]
  }
  return undefined
}
