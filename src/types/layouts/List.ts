import { SymbolCodepoints } from "react-material-symbols";
import {
  BlockActions,
  BlockGetter,
  BlockProps,
  BlockSetter,
  createBlock,
  createBlockActions,
} from "types/blocks/Block.js";
import {
  CollapsibleActions,
  CollapsibleProps,
  createCollapsibleActions,
} from "../behaviors/Collapsible.js";
import {
  createHighlightableActions,
  HighlightableActions,
  HighlightableProps,
} from "../behaviors/Highlightable.js";

export const ListType = "aics:layout.list";
export const ListItemType = "aics:block.list-item";

export interface ListItemProps
  extends BlockProps,
    HighlightableProps,
    CollapsibleProps {
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

export interface ListItemActions
  extends BlockActions,
    CollapsibleActions,
    HighlightableActions {}

export const createListItemActions = (
  get: BlockGetter<ListItemProps>,
  set: BlockSetter<ListItemProps>,
): ListItemActions => {
  return {
    ...createBlockActions(get, set),
    ...createCollapsibleActions(get, set),
    ...createHighlightableActions(get, set),
  };
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
