import * as uuid from 'uuid'
import { Code, Content, List, ListItem, NamedContent, Section, Span, Stream } from '../data'
import { Frame } from '../data/Frame'

export const getGUID = (): string => {
  return uuid.v4()
}

export const plainSection = (content = 'Test Span'): Section => {
  const section = new Section(getGUID())
  const span = new Span(getGUID(), content)
  section.spans.push(span)
  return section
}

export const plainContent = (): Content => {
  const content = new Content(getGUID())
  content.children.push(plainSection())
  return content
}

export const plainNamedContent = (name: string): NamedContent => {
  const content = new NamedContent(getGUID(), name)
  content.children.push(plainSection())
  return content
}

export const nestedNamedContent = (name: string): NamedContent => {
  const content = new NamedContent(getGUID(), name)
  content.children.push(plainNamedContent('Inner Content'))
  return content
}

export const namedSectionsContent = (): Content => {
  const content = new Content(getGUID())

  const section1 = new Section(getGUID())
  section1.name = 'Test Section'
  const span1 = new Span(getGUID(), 'Test Span')
  span1.selected = true
  section1.spans.push(span1)
  content.children.push(section1)

  const section2 = new Section(getGUID())
  section2.name = 'Test Section'
  section2.selected = true
  const span2 = new Span(getGUID(), 'Test Span')
  section2.spans.push(span2)
  content.children.push(section2)

  return content
}

export const plainListItem = (name: string): ListItem => {
  const item = new ListItem(getGUID(), name)
  item.children.push(plainSection())
  return item
}

export const simpleList = (): List => {
  const list = new List(getGUID())
  list.items.push(plainListItem('First Item'))
  list.items.push(plainListItem('Second Item'))
  list.items.push(plainListItem('Third Item'))
  return list
}

export const selectedList = (): List => {
  const list = new List(getGUID())

  list.items.push(plainListItem('First Item'))

  const item2 = new ListItem(getGUID(), 'Second Item')
  item2.selected = true
  item2.collapsed = false
  item2.children.push(plainSection())
  list.items.push(item2)

  list.items.push(plainListItem('Third Item'))

  return list
}

export const nestedList = (): List => {
  const list = new List(getGUID())

  list.items.push(plainListItem('First Item'))

  const item2 = new ListItem(getGUID(), 'Second Item')
  item2.collapsed = false
  item2.children.push(simpleList())
  list.items.push(item2)

  list.items.push(plainListItem('Third Item'))

  return list
}

export const plainStream = (): Stream => {
  const stream = new Stream(getGUID())
  stream.blocks.push(plainContent())
  stream.blocks.push(plainNamedContent('Named Content'))
  stream.blocks.push(simpleList())
  return stream
}

export const paginatedStream = (): Stream => {
  const stream = new Stream(getGUID())
  stream.name = 'Paginated Stream'

  for (let i = 1; i <= 3; i++) {
    const content = new Content(getGUID())
    content.iteration = i
    content.children.push(plainSection('Test Span ' + i))
    stream.blocks.push(content)
  }

  return stream
}

export const textValue = (name: string, value: string): Section => {
  const section = new Section(getGUID())
  section.name = name
  const span = new Span(getGUID(), value)
  section.spans.push(span)
  return section
}

export const numericValue = (name: string, value: string): Section => {
  const section = new Section(getGUID())
  section.name = name
  const span = new Span(getGUID(), value)
  section.spans.push(span)
  return section
}

export const dateValue = (name: string, value: string): Section => {
  const section = new Section(getGUID())
  section.name = name
  const span = new Span(getGUID(), value)
  section.spans.push(span)
  return section
}

export const simpleFrame = (): Frame => {
  const frame = new Frame(getGUID())
  frame.slots.push(textValue('Text Property', 'Hello World'))
  frame.slots.push(numericValue('Numeric Property', '123.0'))
  frame.slots.push(dateValue('Date Property', '2020-01-01'))
  return frame
}

export const nestedFrame = (): Frame => {
  const frame = new Frame(getGUID())
  frame.slots.push(textValue('Text Property', 'Hello World'))
  frame.slots.push(numericValue('Numeric Property', '123.0'))

  // const nestedFrame = new Section(getGUID())
  // nestedFrame.name = 'Nested Property'
  // nestedFrame.children.push(simpleFrame())
  // frame.slots.push(nestedFrame)

  return frame
}

export const simplePythonCode = (): Code => {
  const section = new Code(getGUID())
  section.language = 'python'
  const span = new Span(getGUID(), `import datetime
  def parse_expenses(expenses_string):
      """Parse the list of expenses and return the list of triples (date, value, currency).
      Ignore lines starting with #.
      Parse the date using datetime.
      Example expenses_string:
          2016-01-02 -34.01 USD
          2016-01-03 2.59 DKK
          2016-01-03 -2.72 EUR
      """
      expenses = []
      for line in expenses_string.splitlines():
          if line.startswith("#"):
              continue
          date, value, currency = line.split(" ")
          expenses.append((datetime.datetime.strptime(date, "%Y-%m-%d"),
                          float(value),
                          currency))
      return expenses`)
  section.spans.push(span)
  return section
}
