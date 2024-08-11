import { createPageable, createSelectable, PageableProps, SelectableProps } from "../behaviors"
import { BlockActions, BlockProps, createBlock } from "../blocks"
import { BlockStore } from "../../state/BlockStore"

export interface TreeProps extends BlockProps, SelectableProps, PageableProps {
  name?: string
  icon?: string
}

export const createTree = (props: Partial<TreeProps> = {}): TreeProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createSelectable(props as Partial<SelectableProps>),
    ...createPageable(props as Partial<PageableProps>),
    ...props,
    type: 'aics:tree',
  } as TreeProps
}

export interface TreeActions extends BlockActions { }

export const createTreeActions = (store: BlockStore, blockId: string): TreeActions => {
  return {}
}

export type Tree = TreeProps & TreeActions