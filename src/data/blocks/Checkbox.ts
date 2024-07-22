import { createSelectable, Selectable } from '../behaviors'
import { createBlock, type Block } from './Block'

export interface Checkbox extends Block, Selectable {
  checked: boolean
}

export const createCheckbox = (props: Partial<Checkbox>): Checkbox => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    checked: false,
    ...props,
    type: 'aics:checkbox'
  } as Checkbox
}
