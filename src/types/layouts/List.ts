import { BlockGetter, BlockSetter } from "../blocks/Block"
import { BlockActions, BlockProps, createBlock } from "../blocks"

export interface ListProps extends BlockProps { }

export const createList = (props: Partial<ListProps> = {}): ListProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...props,
    type: 'aics:list'
  } as ListProps
}

export interface ListActions extends BlockActions { }

export const createListActions = (get: BlockGetter<ListProps>, set: BlockSetter<ListProps>): ListActions => {
  return {}
}

export type List = ListProps & ListActions