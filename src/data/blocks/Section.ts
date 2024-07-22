import { Collapsible, createCollapsible, createSelectable, Selectable } from '../behaviors'
import { Block, createBlock } from './Block'

export interface Section extends Block, Selectable, Collapsible {
  summary?: string
  icon?: string
}

export const createSection = (props: Partial<Section>): Section => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...createCollapsible(props as Partial<Collapsible>),
    ...props,
    type: 'aics:section'
  } as Section
}
