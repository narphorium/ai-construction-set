import { createSelectable, Selectable } from '../behaviors'
import { Block, createBlock } from './Block'

export interface Paragraph extends Block, Selectable { }

export const createParagraph = (props: Partial<Paragraph>): Paragraph => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...props,
    type: 'aics:paragraph',
  } as Paragraph
}
