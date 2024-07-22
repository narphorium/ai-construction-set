import { createSelectable, Selectable } from '../behaviors'
import { Block, createBlock } from './Block'

export interface Span extends Block, Selectable {
  datatype?: string
  content: string
}

export const createSpan = (props: Partial<Span>): Span => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    datatype: 'string',
    content: '',
    ...props,
    type: 'aics:span',
  }
}
