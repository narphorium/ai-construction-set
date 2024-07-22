import { createPageable, createSelectable, Pageable, Selectable } from '../behaviors'
import { Block, createBlock } from '../blocks/Block'

export interface TableRow extends Block, Selectable {
  isHeader?: boolean
}

export const createTableRow = (props: Partial<TableRow>): TableRow => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    isHeader: false,
    ...props,
    type: 'aics:tableRow',
  } as TableRow
}

export interface Table extends Block, Selectable, Pageable { }

export const createTable = (props: Partial<Table>): Table => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...createPageable(props as Partial<Pageable>),
    ...props,
    type: 'aics:table'
  } as Table
}
