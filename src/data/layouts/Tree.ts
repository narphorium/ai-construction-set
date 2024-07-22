import { createPageable, createSelectable, Pageable, Selectable } from '../behaviors'
import { Block, createBlock } from '../blocks'

export interface Tree extends Block, Selectable, Pageable {
  name?: string
  icon?: string
}

export const createTree = (props: Partial<Tree>): Tree => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...createPageable(props as Partial<Pageable>),
    ...props,
    type: 'aics:tree',
  } as Tree
}
