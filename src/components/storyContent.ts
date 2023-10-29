import { Content, Section, Span } from '../data'

export const plainContent = (): Content => {
  const content = new Content('1')
  const section = new Section('2')
  const span = new Span('3', 'Test Span')
  section.spans.push(span)
  content.children.push(section)
  return content
}

export const namedSectionsContent = (): Content => {
  const content = new Content('1')

  const section1 = new Section('2')
  section1.name = 'Test Section'
  const span1 = new Span('3', 'Test Span')
  span1.selected = true
  section1.spans.push(span1)
  content.children.push(section1)

  const section2 = new Section('4')
  section2.name = 'Test Section'
  section2.selected = true
  const span2 = new Span('5', 'Test Span')
  section2.spans.push(span2)
  content.children.push(section2)

  return content
}
