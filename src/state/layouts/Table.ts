import { createPageable, createSelectable, PageableProps, SelectableProps } from "../behaviors"
import { BlockActions, BlockProps, createBlock } from "../blocks"
import { BlockStore } from "../BlockStore"

export interface TableRowProps extends BlockProps, SelectableProps {
  isHeader?: boolean
}

export const createTableRow = (props: Partial<TableRowProps> = {}): TableRowProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createSelectable(props as Partial<SelectableProps>),
    isHeader: false,
    ...props,
    type: 'aics:tableRow',
  } as TableRowProps
}

export interface TableProps extends BlockProps, SelectableProps, PageableProps { }

export const createTable = (props: Partial<TableProps>): TableProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createSelectable(props as Partial<SelectableProps>),
    ...createPageable(props as Partial<PageableProps>),
    ...props,
    type: 'aics:table'
  } as TableProps
}

export interface TableActions extends BlockActions { }

export const createTableActions = (store: BlockStore, blockId: string): TableActions => {
  return {}
}

export interface TableRowActions extends BlockActions { }

export const createTableRowActions = (store: BlockStore, blockId: string): TableRowActions => {
  return {}
}

export type Table = TableProps & TableActions

export type TableRow = TableRowProps & TableRowActions