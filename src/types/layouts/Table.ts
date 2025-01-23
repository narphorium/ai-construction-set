import {
  createHighlightable,
  createPageable,
  HighlightableProps,
  PageableProps,
} from "../behaviors";
import { BlockActions, BlockProps, createBlock } from "../blocks";
import { BlockGetter, BlockSetter } from "../blocks/Block";

export const TableType = "aics:layout.table";
export const TableRowType = "aics:block.table-row";
export const TableCellType = "aics:block.table-cell";

export interface TableRowProps extends BlockProps, HighlightableProps {
  isHeader?: boolean;
}

export const createTableRow = (
  props: Partial<TableRowProps> = {},
): TableRowProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    isHeader: false,
    ...props,
    type: TableRowType,
  } as TableRowProps;
};

export interface TableProps
  extends BlockProps,
    HighlightableProps,
    PageableProps {}

export const createTable = (props: Partial<TableProps>): TableProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    ...createPageable(props as Partial<PageableProps>),
    ...props,
    type: TableType,
  } as TableProps;
};

export interface TableActions extends BlockActions {}

export const createTableActions = (
  get: BlockGetter<TableProps>,
  set: BlockSetter<TableProps>,
): TableActions => {
  return {};
};

export interface TableRowActions extends BlockActions {}

export const createTableRowActions = (
  get: BlockGetter<TableRowProps>,
  set: BlockSetter<TableRowProps>,
): TableRowActions => {
  return {};
};

export interface TableCellProps extends BlockProps, HighlightableProps {
  header?: boolean;
  icon?: string;
}

export const createTableCell = (
  props: Partial<TableCellProps> = {},
): TableCellProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    ...props,
    type: TableCellType,
  } as TableCellProps;
};

export interface TableCellActions extends BlockActions {}

export const createTableCellActions = (
  get: BlockGetter<TableCellProps>,
  set: BlockSetter<TableCellProps>,
): TableCellActions => {
  return {};
};

export type Table = TableProps & TableActions;

export type TableRow = TableRowProps & TableRowActions;

export type TableCell = TableCellProps & TableCellActions;
