import { type Section, type Code, type Paragraph, Span } from '../types/blocks'
import { type List, type Tree, type Table } from '../types/layouts'
import { useBlockStore, useBlockRegistry } from '../hooks'


export const PlainParagraph = (text = 'Test Span'): Paragraph => {
  const registry = useBlockRegistry()
  const store = useBlockStore()
  const paragraph: Paragraph = registry.createBlock('aics:paragraph')
  store.addBlock(paragraph)

  const span = registry?.createBlock('aics:span', { content: text })
  store.addChildBlock(span, paragraph.uuid)

  return paragraph
}

export const PlainContent = (text = 'Test Span'): Section => {
  const registry = useBlockRegistry()
  const store = useBlockStore()
  const section: Section = registry.createBlock('aics:section')
  store.addBlock(section)

  const paragraph = PlainParagraph(text)
  store.addChildBlock(paragraph, section.uuid)

  return section
}

export const NamedSectionsContent = (): Section => {
  const registry = useBlockRegistry()
  const store = useBlockStore()
  const section: Section = registry.createBlock('aics:section')
  store.addBlock(section)

  const section1 = registry.createBlock('aics:section')
  store.addChildBlock(section1, section.uuid)

  const header1 = registry.createBlock('aics:span', { content: 'Test Section: ', variant: 'label' })
  store.addChildBlock(header1, section1.uuid)

  const span1 = registry.createBlock('aics:span', { content: 'Test Span', selected: true })
  store.addChildBlock(span1, section1.uuid)

  const section2 = registry.createBlock('aics:section', { selected: true })
  store.addChildBlock(section2, section.uuid)

  const header2 = registry.createBlock('aics:span', { content: 'Test Section: ', variant: 'label' })
  store.addChildBlock(header2, section2.uuid)

  const span2 = registry.createBlock('aics:span', { content: 'Test Span' })
  store.addChildBlock(span2, section2.uuid)

  return section
}

export const PlainListItem = (name: string, icon?: string): Section => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const item: Section = registry.createBlock('aics:section', { name, icon })
  store.addBlock(item)

  const paragraph = PlainParagraph()
  store.addChildBlock(paragraph, item.uuid)

  return item
}

export const SimpleList = (): List => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const list = registry.createBlock('aics:list')
  store.addBlock(list)

  const listItem1 = PlainListItem('First Item')
  store.addChildBlock(listItem1, list.uuid)

  const listItem2 = PlainListItem('Second Item')
  store.addChildBlock(listItem2, list.uuid)

  const listItem3 = PlainListItem('Third Item')
  store.addChildBlock(listItem3, list.uuid)

  return list
}

export const IconList = (): List => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const list = registry.createBlock('aics:list')
  store.addBlock(list)

  const listItem1 = PlainListItem('First Item', 'search')
  store.addChildBlock(listItem1, list.uuid)

  const listItem2 = PlainListItem('Second Item', 'search')
  store.addChildBlock(listItem2, list.uuid)

  const listItem3 = PlainListItem('Third Item', 'search')
  store.addChildBlock(listItem3, list.uuid)

  return list
}

export const ListInSection = (): Section => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const section: Section = registry.createBlock('aics:section')
  store.addBlock(section)

  const list = SimpleList()
  store.addChildBlock(list, section.uuid)

  return section
}

export const SingleItemList = (): List => {
  // FIXME: This should just be a Section with a name now.
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const list = registry.createBlock('aics:list')
  store.addBlock(list)

  const item = PlainListItem('Collapsible Item')
  store.addChildBlock(item, list.uuid)

  return list
}

export const SelectedList = (): List => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const list = registry.createBlock('aics:list')
  store.addBlock(list)

  const item1 = PlainListItem('First Item')
  store.addChildBlock(item1, list.uuid)

  const item2 = PlainListItem('Second Item')
  item2.selected = true
  item2.collapsed = false
  store.addChildBlock(item2, list.uuid)

  const paragraph = PlainParagraph()
  store.addChildBlock(paragraph, item2.uuid)

  const item3 = PlainListItem('Third Item')
  store.addChildBlock(item3, list.uuid)

  return list
}

export const NestedList = (): List => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const list = registry.createBlock('aics:list')
  store.addBlock(list)

  const item1 = PlainListItem('First Item')
  store.addChildBlock(item1, list.uuid)

  const item2 = PlainListItem('Second Item')
  item2.selected = true
  item2.collapsed = false
  store.addChildBlock(item2, list.uuid)

  const innerList = SimpleList()
  store.addChildBlock(innerList, item2.uuid)

  const item3 = PlainListItem('Third Item')
  store.addChildBlock(item3, list.uuid)

  return list
}

export const PlainTree = (): Tree => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const tree: Tree = registry.createBlock('aics:tree')
  store.addBlock(tree)

  const leaf1 = PlainContent()
  store.addChildBlock(leaf1, tree.uuid)

  const leaf2 = SingleItemList()
  store.addChildBlock(leaf2, tree.uuid)

  const leaf3 = SimpleList()
  store.addChildBlock(leaf3, tree.uuid)

  return tree
}

export const PaginatedTree = (): Tree => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const tree: Tree = registry.createBlock('aics:tree', { name: 'Paginated Tree', numPages: 3 })
  store.addBlock(tree)

  for (let i = 1; i <= tree.numPages; i++) {
    const section = registry.createBlock('aics:section', { iteration: i })
    store.addChildBlock(section, tree.uuid)

    const paragraph = PlainParagraph('Test Span ' + i)
    store.addChildBlock(paragraph, section.uuid)
  }

  return tree
}

export const IconTree = (): Tree => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const tree = PaginatedTree()
  store.updateBlock<Tree>(tree.uuid, { icon: 'search' })

  return tree
}

export const NestedTree = (): Tree => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const outerNode: Tree = registry.createBlock('aics:tree', { name: 'Root Node', numPages: 3 })
  store.addBlock(outerNode)

  for (let i = 1; i <= outerNode.numPages; i++) {
    const b1 = PlainContent(`First outer node ${i}`)
    b1.iteration = i
    store.addChildBlock(b1, outerNode.uuid)

    const innerNode: Tree = registry.createBlock('aics:tree', { name: `Inner Node ${i}`, numPages: 3, iteration: i })
    store.addChildBlock(innerNode, outerNode.uuid)

    for (let j = 1; j <= innerNode.numPages; j++) {
      const bi1 = PlainContent()
      bi1.iteration = j
      store.addChildBlock(bi1, innerNode.uuid)

      const section: Section = registry.createBlock('aics:section', { iteration: j })
      if (i === 1 && j === 1) {
        section.selected = true
      }
      store.addChildBlock(section, innerNode.uuid)

      const paragraph = PlainParagraph(`Root node ${i}<br/>Inner node ${j}`)
      store.addChildBlock(paragraph, section.uuid)

      const bi2 = PlainContent()
      bi2.iteration = j
      store.addChildBlock(bi2, innerNode.uuid)
    }

    const b2 = PlainContent(`Last outer node ${i}`)
    b2.iteration = i
    store.addChildBlock(b2, outerNode.uuid)
  }

  return outerNode
}

export const SimplePythonCode = (): Code => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const code: Code = registry.createBlock('aics:code', { language: 'python' })
  store.addBlock(code)

  const span: Span = registry.createBlock('aics:span')
  span.content = `import datetime
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
      return expenses`
  store.addChildBlock(span, code.uuid)

  return code
}

const TableHeader = (row: string, name: string, datatype?: string): Paragraph => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const header: Paragraph = registry.createBlock('aics:paragraph')
  store.addChildBlock(header, row)

  const span = registry.createBlock('aics:span', { content: name, datatype })
  span.classNames.add('aics-table-header')
  store.addChildBlock(span, header.uuid)

  return header
}

const TableCell = (row: string, value: string, datatype?: string): Paragraph => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const cell: Paragraph = registry.createBlock('aics:paragraph')
  store.addChildBlock(cell, row)

  const span = registry.createBlock('aics:span', { content: value, datatype })
  store.addChildBlock(span, cell.uuid)

  return cell
}

export const SimpleTable = (): Table => {
  const registry = useBlockRegistry()
  const store = useBlockStore()

  const table: Table = registry.createBlock('aics:table')
  store.addBlock(table)

  const row1 = registry.createBlock('aics:tableRow')
  store.addChildBlock(row1, table.uuid)

  const header1 = TableHeader(row1.uuid, 'Text Property', 'text')
  store.addChildBlock(header1, row1.uuid)

  const cell1 = TableCell(row1.uuid, 'Hello World', 'text')
  store.addChildBlock(cell1, row1.uuid)

  const row2 = registry.createBlock('aics:tableRow')
  store.addChildBlock(row2, table.uuid)

  const header2 = TableHeader(row2.uuid, 'Numeric Property', 'number')
  store.addChildBlock(header2, row2.uuid)

  const cell2 = TableCell(row2.uuid, '123.0', 'number')
  store.addChildBlock(cell2, row2.uuid)

  const row3 = registry.createBlock('aics:tableRow')
  store.addChildBlock(row3, table.uuid)

  const header3 = TableHeader(row3.uuid, 'Date Property', 'date')
  store.addChildBlock(header3, row3.uuid)

  const cell3 = TableCell(row3.uuid, '2020-01-01', 'date')
  store.addChildBlock(cell3, row3.uuid)

  return table
}
