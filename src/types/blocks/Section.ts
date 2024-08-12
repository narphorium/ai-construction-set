import { Collapsible, createCollapsible, createSelectable, Selectable } from '../behaviors'
import { BlockStore } from '../../state/'
import { Block, BlockActions, BlockID, createBlock } from './Block'

export interface SectionProps extends Block, Selectable, Collapsible {
  summary?: string
  icon?: string
}

export const createSection = (props: Partial<SectionProps> = {}): SectionProps => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    ...createCollapsible(props as Partial<Collapsible>),
    ...props,
    type: 'aics:section'
  } as SectionProps
}

export interface SectionActions extends BlockActions { }

export const createSectionActions = (store: BlockStore, blockId: BlockID): SectionActions => {
  return {}
}

export type Section = SectionProps & SectionActions
