import { BlockActions, BlockProps, createBlock } from "../blocks"
import { BlockStore } from "../../state/BlockStore"

export interface ListProps extends BlockProps { }

export const createList = (props: Partial<ListProps> = {}): ListProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...props,
    type: 'aics:list'
  } as ListProps
}

export interface ListActions extends BlockActions { }

export const createListActions = (store: BlockStore, blockId: string): ListActions => {
  return {}
}

export type List = ListProps & ListActions