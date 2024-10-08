import { Collapsible, createCollapsible, createSelectable, Selectable } from '../behaviors'
import { BlockGetter, BlockSetter } from './Block'
import { Block, BlockActions, createBlock } from './Block'

export interface SectionProps extends Block, Selectable, Collapsible {
  summary?: string
  icon?: string
  collapsible?: boolean
}

export const createSection = (props: Partial<SectionProps> = {}): SectionProps => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...createCollapsible(props as Partial<Collapsible>),
    collapsible: false,
    ...props,
    type: 'aics:section'
  } as SectionProps
}

export interface SectionActions extends BlockActions { }

export const createSectionActions = (get: BlockGetter<SectionProps>, set: BlockSetter<SectionProps>): SectionActions => {
  return {}
}

export type Section = SectionProps & SectionActions
