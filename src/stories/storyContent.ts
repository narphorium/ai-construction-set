import { type Section, type Code, type Paragraph, Span, Block } from '../types/blocks'
import { type List, type Tree, type Table, TableRow } from '../types/layouts'
import { BlockRegistry } from '../state/BlockRegistry'

export const PlainParagraph = (registry: BlockRegistry, text = 'Test Span', parent?: Block): Paragraph => {
  const paragraph: Paragraph = registry.createBlock('aics:paragraph', parent)
  registry.createBlock('aics:span', paragraph, { content: text })
  return paragraph
}

export const PlainContent = (registry: BlockRegistry, text = 'Test Span', parent?: Block): Section => {
  const section: Section = registry.createBlock('aics:section', parent)
  PlainParagraph(registry, text, section)
  return section
}

export const NamedSectionsContent = (registry: BlockRegistry, parent?: Block, selected?: boolean, theme?: string): Section => {
  const section: Section = registry.createBlock('aics:section', parent, { collapsible: false, selected, theme })
  const paragraph1 = registry.createBlock('aics:paragraph', section)
  registry.createBlock('aics:span', paragraph1, { content: 'Test Section: ', variant: 'label' })
  registry.createBlock('aics:span', paragraph1, { content: 'Test Span', selected: true })

  const paragraph2 = registry.createBlock('aics:paragraph', section, { selected: true })
  registry.createBlock('aics:span', paragraph2, { content: 'Test Section: ', variant: 'label' })
  registry.createBlock('aics:span', paragraph2, { content: 'Test Span' })

  return section
}

export const PlainListItem = (registry: BlockRegistry, list: List, name: string, icon?: string): Section => {
  const item: Section = registry.createBlock('aics:section', list, { summary: name, icon, collapsible: true, collapsed: true })
  PlainParagraph(registry, 'Test Span', item)
  return item
}

export const SimpleList = (registry: BlockRegistry, parent?: Block): List => {
  const list = registry.createBlock('aics:list', parent)
  PlainListItem(registry, list, 'First Item')
  PlainListItem(registry, list, 'Second Item')
  PlainListItem(registry, list, 'Third Item')
  return list
}

export const IconList = (registry: BlockRegistry): List => {
  const list = registry.createBlock('aics:list')
  PlainListItem(registry, list, 'First Item', 'search')
  PlainListItem(registry, list, 'Second Item', 'search')
  PlainListItem(registry, list, 'Third Item', 'search')
  return list
}

export const ListInSection = (registry: BlockRegistry): Section => {
  const section: Section = registry.createBlock('aics:section')
  SimpleList(registry, section)
  return section
}

export const SingleItemList = (registry: BlockRegistry, parent?: Block): List => {
  // FIXME: This should just be a Section with a name now.
  const list = registry.createBlock('aics:list', parent)
  PlainListItem(registry, list, 'Collapsible Item')
  return list
}

export const SelectedList = (registry: BlockRegistry): List => {
  const list = registry.createBlock('aics:list')
  PlainListItem(registry, list, 'First Item', undefined)
  const item2 = PlainListItem(registry, list, 'Second Item')
  item2.selected = true
  item2.collapsed = false
  PlainParagraph(registry, undefined, item2)
  PlainListItem(registry, list, 'Third Item')
  return list
}

export const NestedList = (registry: BlockRegistry): List => {
  const list = registry.createBlock('aics:list')
  PlainListItem(registry, list, 'First Item')
  const item2 = PlainListItem(registry, list, 'Second Item')
  item2.selected = true
  item2.collapsed = false
  SimpleList(registry, item2)
  PlainListItem(registry, list, 'Third Item')
  return list
}

export const PlainTree = (registry: BlockRegistry): Tree => {
  const tree: Tree = registry.createBlock('aics:tree', undefined, { name: 'Tree' })
  PlainContent(registry, undefined, tree)
  SingleItemList(registry, tree)
  SimpleList(registry, tree)
  return tree
}

export const PaginatedTree = (registry: BlockRegistry): Tree => {
  const tree: Tree = registry.createBlock('aics:tree', undefined, { name: 'Paginated Tree', numPages: 3 })
  for (let i = 1; i <= tree.numPages; i++) {
    const section = registry.createBlock('aics:section', tree, { iteration: i })
    PlainParagraph(registry, 'Test Span ' + i, section)
  }
  return tree
}

export const IconTree = (registry: BlockRegistry): Tree => {
  const tree = PaginatedTree(registry)
  tree.icon = 'search'
  return tree
}

export const NestedTree = (registry: BlockRegistry): Tree => {
  const outerNode: Tree = registry.createBlock('aics:tree', undefined, { name: 'Root Node', numPages: 3 })
  for (let i = 1; i <= outerNode.numPages; i++) {
    const b1 = PlainContent(registry, `First outer node ${i}`, outerNode)
    b1.iteration = i
    const innerNode: Tree = registry.createBlock('aics:tree', outerNode, { name: `Inner Node ${i}`, numPages: 3, iteration: i })
    for (let j = 1; j <= innerNode.numPages; j++) {
      const bi1 = PlainContent(registry, undefined, innerNode)
      bi1.iteration = j
      const section: Section = registry.createBlock('aics:section', innerNode, { iteration: j })
      if (i === 1 && j === 1) {
        section.selected = true
      }
      PlainParagraph(registry, `Root node ${i}<br/>Inner node ${j}`, section)
      const bi2 = PlainContent(registry, undefined, innerNode)
      bi2.iteration = j
    }
    const b2 = PlainContent(registry, `Last outer node ${i}`, outerNode)
    b2.iteration = i
  }
  return outerNode
}

export const SimplePythonCode = (registry: BlockRegistry): Code => {
  const code: Code = registry.createBlock('aics:code', undefined, { language: 'python' })
  const span: Span = registry.createBlock('aics:span', code)
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
  return code
}

const TableHeader = (registry: BlockRegistry, row: TableRow, name: string, datatype?: string): Paragraph => {
  const header: Paragraph = registry.createBlock('aics:paragraph', row)
  const span = registry.createBlock('aics:span', header, { content: name, datatype })
  span.classNames.add('aics-table-header')
  return header
}

const TableCell = (registry: BlockRegistry, row: TableRow, value: string, datatype?: string): Paragraph => {
  const cell: Paragraph = registry.createBlock('aics:paragraph', row)
  registry.createBlock('aics:span', cell, { content: value, datatype })
  return cell
}

export const SimpleTable = (registry: BlockRegistry, parent?: Block): Table => {
  const table: Table = registry.createBlock('aics:table', parent)
  const row1 = registry.createBlock<TableRow>('aics:tableRow', table)
  TableHeader(registry, row1, 'Text Property', 'text')
  TableCell(registry, row1, 'Hello World', 'text')

  const row2 = registry.createBlock<TableRow>('aics:tableRow', table)
  TableHeader(registry, row2, 'Numeric Property', 'number')
  TableCell(registry, row2, '123.0', 'number')

  const row3 = registry.createBlock<TableRow>('aics:tableRow', table)
  TableHeader(registry, row3, 'Date Property', 'date')
  TableCell(registry, row3, '2020-01-01', 'date')

  return table
}

type Builder = (registry: BlockRegistry, parent?: Block) => Block

export const WrapInSection = (builder: Builder, selected?: boolean, theme?: string): Builder => {
  return (registry: BlockRegistry, parent?: Block): Section => {
    const section: Section = registry.createBlock('aics:section', parent, { selected, theme })
    builder(registry, section)
    return section
  }
}

export const WrapInTheme = (builder: Builder, theme: string): Builder => {
  return (registry: BlockRegistry, parent?: Block): Block => {
    const block = builder(registry, parent)
    block.theme = theme
    return block
  }
}