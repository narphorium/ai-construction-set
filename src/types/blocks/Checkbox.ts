import { createSelectable, Selectable } from '../behaviors'
import { BlockStore } from '../BlockStore'
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


export interface CheckboxService extends BlockActions {
  setChecked(checked: boolean): void
  toggleChecked(): void
}

const setChecked = (store: BlockStore, blockId: string, checked: boolean) => {
  store.updateBlock<CheckboxProps>(blockId, { checked })
}

const toggleChecked = (store: BlockStore, blockId: string) => {
  const checkbox = store.getBlock<CheckboxProps>(blockId)
  if (checkbox != null) {
    store.updateBlock<CheckboxProps>(blockId, { checked: !checkbox.checked })
  }
}

export const createCheckboxActions = (store: BlockStore, blockId: string): CheckboxService => {
  return {
    setChecked: (checked: boolean) => setChecked(store, blockId, checked),
    toggleChecked: () => toggleChecked(store, blockId),
  }
}

export type Checkbox = CheckboxProps & CheckboxService