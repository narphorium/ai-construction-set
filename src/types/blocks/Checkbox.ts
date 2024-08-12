import { createSelectable, Selectable } from '../behaviors'
import { BlockActions, BlockID, createBlock, type Block } from './Block'
import { BlockStore } from '../../state'

export interface CheckboxProps extends Block, Selectable {
  checked: boolean
}

export const createCheckbox = (props: Partial<CheckboxProps> = {}): CheckboxProps => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createSelectable(props as Partial<Selectable>),
    checked: false,
    ...props,
    type: 'aics:checkbox'
  } as CheckboxProps
}


export interface CheckboxActions extends BlockActions {
  setChecked(checked: boolean): void
  toggleChecked(): void
}

export const createCheckboxActions = (store: BlockStore, blockId: BlockID): CheckboxActions => {
  return {
    setChecked: (checked: boolean) => store.updateBlock<Checkbox>(blockId, { checked }),
    toggleChecked: () => store.updateBlock<CheckboxProps>(blockId, (state: CheckboxProps) => ({ checked: !state.checked })),
  }
}

export type Checkbox = CheckboxProps & CheckboxActions