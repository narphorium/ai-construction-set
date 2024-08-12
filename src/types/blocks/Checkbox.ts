import { BlockGetter, BlockSetter } from './Block'
import { createSelectable, Selectable } from '../behaviors'
import { BlockActions, createBlock, type Block } from './Block'

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

export const createCheckboxActions = (get: BlockGetter<CheckboxProps>, set: BlockSetter<CheckboxProps>): CheckboxActions => {
  return {
    setChecked: (checked: boolean) => set({ checked }),
    toggleChecked: () => set({ checked: !get().checked }),
  }
}

export type Checkbox = CheckboxProps & CheckboxActions