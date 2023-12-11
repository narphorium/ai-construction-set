import { getColor } from './theme'

export const smallChevronRight = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0 0 0)" d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z"/></svg>'

export const smallChevronLeft = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0 0 0)" d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z"/></svg>'

export const chevronRight = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0 0 0)" d="m535.847-480-189-189L384-706.153 610.153-480 384-253.847 346.847-291l189-189Z"/></svg>'

export const tool = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0 0 0)" d="M731.076-165.155 520.23-376.001l47.229-47.229 210.846 210.845-47.229 47.23Zm-522.538 0-47.229-47.23L422.77-473.846 343-553.616l-34.923 34.923-45.461-45.846v65l-22.923 22.923L135.77-580.539l22.923-22.923h65l-30.23-30.845 116.305-116.306q13.923-13.923 32.154-21.769 18.23-7.846 39.538-7.846 21.307 0 39.538 7.846 18.23 7.846 32.153 21.769l-73.922 72.922 43.923 43.923-32.923 32.923 79.77 79.77 93.386-93.385q-7.693-14.154-11.27-28.116-3.577-13.961-3.577-30.269 0-50 35.231-85.231 35.23-35.23 85.23-35.23 11.692 0 22.769 2.231 11.077 2.23 21.769 6.461l-78.923 78.923 67.231 67.23 78.922-78.922q4.847 9.692 6.77 21.269 1.923 11.577 1.923 23.269 0 49.999-35.231 84.73-35.23 34.73-85.23 34.73-16.308 0-30.27-3.269-13.961-3.269-28.115-11.577L208.538-165.155Z"/></svg>'

export const text = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0, 0, 0)" d="M164.001-278.616v-51.999h391.998v51.999H164.001Zm0-175.385v-51.998h631.998v51.998H164.001Zm0-175.384v-51.999h631.998v51.999H164.001Z"/></svg>'

export const number = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0, 0, 0)" d="m286.694-210.463 30-120H174.387l12.999-51.998h142.308l42.769-171.078H218.156l12.999-51.998h154.308l36-144h51.229l-36 144h149.385l36-144h51.229l-36 144h148.307l-12.999 51.998H624.306l-42.769 171.078h160.307l-12.999 51.998H568.537l-30 120h-51.229l30-120H367.923l-30 120h-51.229Zm94.229-171.998h149.385l42.769-171.078H423.692l-42.769 171.078Z"/></svg>'

export const date = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path fill="rgb(0, 0, 0)" d="M228.309-116.001q-27.008 0-45.658-19-18.65-19-18.65-45.308v-503.382q0-26.308 18.65-45.308t45.658-19h87.385v-100.615h53.537v100.615h223.076v-100.615h51.999v100.615h87.385q27.008 0 45.658 19 18.65 19 18.65 45.308v503.382q0 26.308-18.65 45.308t-45.658 19H228.309Zm0-51.999h503.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-335.382H216v335.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846ZM216-567.69h528v-116.001q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H228.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v116.001Zm0 0V-696v128.31Z"/></svg>'

const icons = new Map<string, string>([
  ['chevron-right', chevronRight],
  ['small-chevron-right', smallChevronRight],
  ['small-chevron-left', smallChevronLeft],
  ['tool', tool],
  ['text', text],
  ['number', number],
  ['date', date]
])

export const getIcon = (name: string): string | undefined => {
  return `url('data:image/svg+xml;utf8,${icons.get(name)}')`
}

function convertToRGB (colorCode: string): string {
  if (colorCode.length !== 7) {
    throw new Error('Only six-digit hex colors are allowed.')
  }

  const aRgbHex = colorCode.match(/[a-f,A-F,0-9]{1,2}/g)
  if (aRgbHex !== null && aRgbHex.length === 3) {
    const aRgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
    ]
    return `rgb(${aRgb[0]} ${aRgb[1]} ${aRgb[2]})`
  }
  throw new Error('Not a valid hex color')
}

type ThemeArgument = string | ((props: any) => string)

export const themedIcon = (icon: ThemeArgument, color: ThemeArgument) => {
  return (props: any): string => {
    let svg: string | undefined
    if (typeof icon === 'function') {
      svg = icon(props)
    } else {
      svg = getIcon(icon)
    }
    if (svg !== undefined) {
      let colorCode: string | undefined
      if (typeof color === 'function') {
        colorCode = color(props)
      } else {
        console.log('icon props', props)
        colorCode = getColor(props.theme.colors, color)
      }

      if (colorCode !== undefined && colorCode.startsWith('#')) {
        colorCode = convertToRGB(colorCode)
      }
      svg = svg.replace(/fill="[^"]+"/g, `fill="${colorCode}"`)
    }
    return svg ?? ''
  }
}
