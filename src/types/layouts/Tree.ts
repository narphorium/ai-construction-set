import {
  createHighlightable,
  createPageable,
  createPageableActions,
  HighlightableProps,
  PageableActions,
  PageableProps,
} from "../behaviors";
import {
  BlockActions,
  BlockGetter,
  BlockProps,
  BlockSetter,
  createBlock,
} from "../blocks";

export const TreeType = "aics:layout.tree";

export interface TreeProps
  extends BlockProps,
    HighlightableProps,
    PageableProps {
  name?: string;
  icon?: string;
}

export const createTree = (props: Partial<TreeProps> = {}): TreeProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    ...createPageable(props as Partial<PageableProps>),
    ...props,
    type: TreeType,
  } as TreeProps;
};

export interface TreeActions extends PageableActions {}

export const createTreeActions = (
  get: BlockGetter<TreeProps>,
  set: BlockSetter<TreeProps>,
): TreeActions => {
  return {
    ...createPageableActions(get, set),
  };
};

export type Tree = TreeProps & TreeActions;
