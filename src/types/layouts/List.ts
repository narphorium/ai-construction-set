import { SymbolCodepoints } from "react-material-symbols";
import { Collapsible, Highlightable } from "../behaviors";
import { BlockActions, BlockProps, createBlock } from "../blocks";
import { BlockGetter, BlockSetter } from "../blocks/Block";

export const ListType = "aics:layout.list";
export const ListItemType = "aics:block.list-item";

export interface ListItemProps extends BlockProps, Highlightable, Collapsible {
  summary?: string;
  icon?: SymbolCodepoints;
}

export const createListItem = (
  props: Partial<ListItemProps> = {},
): ListItemProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...props,
    type: ListItemType,
  } as ListItemProps;
};

export interface ListItemActions extends BlockActions {}

export const createListItemActions = (
  get: BlockGetter<ListItemProps>,
  set: BlockSetter<ListItemProps>,
): ListItemActions => {
  return {};
};

export type ListItem = ListItemProps & ListItemActions;

export interface ListProps extends BlockProps {}

export const createList = (props: Partial<ListProps> = {}): ListProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...props,
    type: ListType,
  } as ListProps;
};

export interface ListActions extends BlockActions {}

export const createListActions = (
  get: BlockGetter<ListProps>,
  set: BlockSetter<ListProps>,
): ListActions => {
  return {};
};

export type List = ListProps & ListActions;
