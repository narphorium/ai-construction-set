import * as uuid from 'uuid'
import { Code, Collapsible, Content, List, ListItem, Section, Span, Stream, Table, TableRow } from '../data'

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

export const plainNamedContent = (name: string): Collapsible => {
  const content = new Collapsible(getGUID(), name)
  content.children.push(plainSection())
  return content
}

export const nestedNamedContent = (name: string): Collapsible => {
  const content = new Collapsible(getGUID(), name)
  content.children.push(plainNamedContent('Inner Content'))
  return content
}

export const namedSectionsContent = (): Content => {
  const content = new Content(getGUID())

  const section1 = new Section(getGUID())

  const header1 = new Span(section1.uuid, 'Test Section: ')
  header1.classNames.add('aics-content-section-header')
  section1.spans.push(header1)

  const span1 = new Span(getGUID(), 'Test Span')
  span1.selected = true
  section1.spans.push(span1)
  content.children.push(section1)

  const section2 = new Section(getGUID())

  const header2 = new Span(section1.uuid, 'Test Section: ')
  header2.classNames.add('aics-content-section-header')
  section2.spans.push(header2)

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

export const singleItemList = (): List => {
  const list = new List(getGUID())
  list.items.push(plainListItem('Collapsible Item'))
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
  stream.blocks.push(singleItemList())
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

export const nestedStream = (): Stream => {
  const outerStream = new Stream(getGUID())
  outerStream.name = 'Outer Stream'

  for (let i = 1; i <= 3; i++) {
    const b1 = plainContent()
    b1.iteration = i
    outerStream.blocks.push(b1)

    const innerStream = new Stream(getGUID())
    innerStream.name = `Inner Stream ${i}`
    innerStream.iteration = i
    outerStream.blocks.push(innerStream)

    for (let j = 1; j <= 3; j++) {
      const bi1 = plainContent()
      bi1.iteration = j
      innerStream.blocks.push(bi1)

      const content = new Content(getGUID())
      content.iteration = j
      content.children.push(plainSection(`Outer stream ${i}<br/>Inner stream ${j}`))
      innerStream.blocks.push(content)

      if (i === 1 && j === 1) {
        content.selected = true
      }

      const bi2 = plainContent()
      bi2.iteration = j
      innerStream.blocks.push(bi2)
    }

    const b2 = plainContent()
    b2.iteration = i
    outerStream.blocks.push(b2)
  }

  return outerStream
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

const tableHeader = (name: string, datatype?: string): Section => {
  const cell = new Section(getGUID())
  const span = new Span(getGUID(), name)
  span.datatype = datatype
  span.classNames.add('aics-table-header')
  cell.spans.push(span)
  return cell
}

const tableCell = (value: string, datatype?: string): Section => {
  const cell = new Section(getGUID())
  const span = new Span(getGUID(), value)
  span.datatype = datatype
  cell.spans.push(span)
  return cell
}

export const simpleTable = (): Table => {
  const table = new Table(getGUID())

  const row1 = new TableRow(getGUID())
  table.rows.push(row1)
  row1.values.push(tableHeader('Text Property', 'text'))
  row1.values.push(tableCell('Hello World', 'text'))

  const row2 = new TableRow(getGUID())
  table.rows.push(row2)
  row2.values.push(tableHeader('Numeric Property', 'number'))
  row2.values.push(tableCell('123.0', 'number'))

  const row3 = new TableRow(getGUID())
  table.rows.push(row3)
  row3.values.push(tableHeader('Date Property', 'date'))
  row3.values.push(tableCell('2020-01-01', 'date'))

  return table
}
