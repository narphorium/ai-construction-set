import { createBlock, type Block } from '../blocks/Block'

export interface List extends Block { }

export const createList = (props: Partial<List>): List => {
  return {
    ...createBlock(props as Partial<Block>),
    ...props,
    type: 'aics:list'
  } as List
}
