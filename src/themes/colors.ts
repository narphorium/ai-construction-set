export const colorPalette = {
  gray: {
    50: '#0c0c0c',
    100: '#191919',
    200: '#333333',
    300: '#4c4c4c',
    400: '#666666',
    500: '#7f7f7f',
    600: '#999999',
    700: '#b2b2b2',
    800: '#cccccc',
    900: '#e5e5e5',
    980: '#f9f9f9'
  },
  slate: {
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
  },
  purple: {
    100: '#5928cc',
    200: '#7544e5',
    300: '#9366ff',
    400: '#a57fff',
    500: '#b799ff',
    600: '#c9b2ff',
    700: '#dbccff',
    800: '#ede5ff',
    900: '#f6f2ff'
  },
  'dark-purple': {
    100: '#151419',
    200: '#282333',
    300: '#3c354c',
    400: '#493d66',
    500: '#5b4c7f',
    600: '#6e5b99',
    700: '#806bb2',
    800: '#927acc',
    900: '#a589e5'
  },
  blue: {
    100: '#287acc',
    200: '#4495e5',
    300: '#66b2ff',
    400: '#7fbfff',
    500: '#99ccff',
    600: '#b2d8ff',
    700: '#cce5ff',
    800: '#e5f2ff',
    900: '#f2f8ff'
  },
  'dark-blue': {
    100: '#141619',
    200: '#232b33',
    300: '#35414c',
    400: '#3d5166',
    500: '#4c667f',
    600: '#5b7a99',
    700: '#6b8eb2',
    800: '#7aa3cc',
    900: '#89b7e5'
  },
  green: {
    100: '#28cc30',
    200: '#44e54c',
    300: '#66ff6d',
    400: '#7fff85',
    500: '#99ff9e',
    600: '#b2ffb6',
    700: '#ccffce',
    800: '#e5ffe6',
    900: '#f2fff2'
  },
  'dark-green': {
    100: '#141914',
    200: '#233324',
    300: '#354c36',
    400: '#3d663f',
    500: '#4c7f4f',
    600: '#5b995e',
    700: '#6bb26e',
    800: '#7acc7e',
    900: '#89e58e'
  },
  yellow: {
    100: '#cca028',
    200: '#e5ba44',
    300: '#ffd666',
    400: '#ffdd7f',
    500: '#ffe399',
    600: '#ffeab2',
    700: '#fff1cc',
    800: '#fff8e5',
    900: '#fffbf2'
  },
  'dark-yellow': {
    100: '#191814',
    200: '#332e23',
    300: '#4c4635',
    400: '#665b3d',
    500: '#7f714c',
    600: '#99885b',
    700: '#b29f6b',
    800: '#ccb67a',
    900: '#e5cd89'
  },
  orange: {
    100: '#cc5728',
    200: '#e57244',
    300: '#ff9166',
    400: '#ffa37f',
    500: '#ffb599',
    600: '#ffc8b2',
    700: '#ffdacc',
    800: '#ffece5',
    900: '#fff5f2'
  },
  'dark-orange': {
    100: '#191514',
    200: '#332823',
    300: '#4c3c35',
    400: '#66483d',
    500: '#7f5a4c',
    600: '#996d5b',
    700: '#b27f6b',
    800: '#cc917a',
    900: '#e5a389'
  },
  red: {
    100: '#cc2836',
    200: '#e54452',
    300: '#ff6672',
    400: '#ff7f8a',
    500: '#ff99a1',
    600: '#ffb2b8',
    700: '#ffccd0',
    800: '#ffe5e7',
    900: '#fff2f3'
  },
  'dark-red': {
    100: '#191414',
    200: '#332324',
    300: '#4c3537',
    400: '#663d40',
    500: '#7f4c50',
    600: '#995b60',
    700: '#b26b71',
    800: '#cc7a81',
    900: '#e58991'
  }
}

type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '980'

export const getColor = (key: string): string | undefined => {
  let name = key.toLowerCase()
  let shade: Shade = '500'
  if (name.includes('-')) {
    const parts = name.split('-')
    if ((/\d{2,3}/gm).exec(parts[parts.length - 1]) !== null) {
      shade = parts.pop() as Shade
      name = parts.join('-')
    }
  }
  if (name in colorPalette) {
    const color = colorPalette[name as keyof typeof colorPalette]
    return color[shade] as string
  }
  return undefined
}

export const getColors = (name: string): Record<string, string> => {
  const colors: Record<string, string> = {}
  for (const shade in colorPalette[name as keyof typeof colorPalette]) {
    const key = `${name}-${shade}`
    colors[key] = getColor(key) as string
  }
  return colors
}
