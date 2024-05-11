import * as uuid from 'uuid'
import { Code, Content, List, ListItem, Paragraph, Span, Table, TableRow, Tree } from '../data'

export const getGUID = (): string => {
  return uuid.v4()
}

export const plainParagraph = (content = 'Test Span'): Paragraph => {
  const paragraph = new Paragraph(getGUID())
  const span = new Span(getGUID(), content)
  paragraph.spans.push(span)
  return paragraph
}

export const plainContent = (): Content => {
  const content = new Content(getGUID())
  content.children.push(plainParagraph())
  return content
}

export const namedSectionsContent = (): Content => {
  const content = new Content(getGUID())

  const section1 = new Paragraph(getGUID())

  const header1 = new Span(section1.uuid, 'Test Section: ')
  header1.variant = 'label'
  section1.spans.push(header1)

  const span1 = new Span(getGUID(), 'Test Span')
  span1.selected = true
  section1.spans.push(span1)
  content.children.push(section1)

  const section2 = new Paragraph(getGUID())

  const header2 = new Span(section1.uuid, 'Test Section: ')
  header2.variant = 'label'
  section2.spans.push(header2)

  section2.selected = true
  const span2 = new Span(getGUID(), 'Test Span')
  section2.spans.push(span2)
  content.children.push(section2)

  return content
}

export const plainListItem = (name: string, icon?: string): ListItem => {
  const item = new ListItem(getGUID(), name)
  if (icon !== undefined) {
    item.icon = icon
  }
  item.children.push(plainParagraph())
  return item
}

export const simpleList = (): List => {
  const list = new List(getGUID())
  list.items.push(plainListItem('First Item'))
  list.items.push(plainListItem('Second Item'))
  list.items.push(plainListItem('Third Item'))
  return list
}

export const iconList = (): List => {
  const list = new List(getGUID())
  list.items.push(plainListItem('First Item', 'search'))
  list.items.push(plainListItem('Second Item', 'search'))
  list.items.push(plainListItem('Third Item', 'search'))
  return list
}

export const listInContent = (): Content => {
  const content = new Content(getGUID())
  content.children.push(simpleList())
  return content
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
  item2.children.push(plainParagraph())
  list.items.push(item2)

  list.items.push(plainListItem('Third Item'))

  return list
}

export const nestedList = (): List => {
  const list = new List(getGUID())

  list.items.push(plainListItem('First Item'))

  const item2 = new ListItem(getGUID(), 'Second Item')
  item2.selected = true
  item2.collapsed = false
  item2.children.push(simpleList())
  list.items.push(item2)

  list.items.push(plainListItem('Third Item'))

  return list
}

export const plainTree = (): Tree => {
  const tree = new Tree(getGUID())
  tree.children.push(plainContent())
  tree.children.push(singleItemList())
  tree.children.push(simpleList())
  return tree
}

export const paginatedTree = (): Tree => {
  const tree = new Tree(getGUID())
  tree.name = 'Paginated Tree'

  for (let i = 1; i <= 3; i++) {
    const content = new Content(getGUID())
    content.iteration = i
    content.children.push(plainParagraph('Test Span ' + i))
    tree.children.push(content)
  }

  return tree
}

export const iconTree = (): Tree => {
  const tree = paginatedTree()
  tree.icon = 'search'
  return tree
}

export const nestedTree = (): Tree => {
  const outerNode = new Tree(getGUID())
  outerNode.name = 'Root Node'

  for (let i = 1; i <= 3; i++) {
    const b1 = plainContent()
    b1.iteration = i
    outerNode.children.push(b1)

    const innerNode = new Tree(getGUID())
    innerNode.name = `Inner Node ${i}`
    innerNode.iteration = i
    outerNode.children.push(innerNode)

    for (let j = 1; j <= 3; j++) {
      const bi1 = plainContent()
      bi1.iteration = j
      innerNode.children.push(bi1)

      const content = new Content(getGUID())
      content.iteration = j
      content.children.push(plainParagraph(`Root node ${i}<br/>Inner node ${j}`))
      innerNode.children.push(content)

      if (i === 1 && j === 1) {
        content.selected = true
      }

      const bi2 = plainContent()
      bi2.iteration = j
      innerNode.children.push(bi2)
    }

    const b2 = plainContent()
    b2.iteration = i
    outerNode.children.push(b2)
  }

  return outerNode
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

const tableHeader = (name: string, datatype?: string): Paragraph => {
  const cell = new Paragraph(getGUID())
  const span = new Span(getGUID(), name)
  span.datatype = datatype
  span.classNames.add('aics-table-header')
  cell.spans.push(span)
  return cell
}

const tableCell = (value: string, datatype?: string): Paragraph => {
  const cell = new Paragraph(getGUID())
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
