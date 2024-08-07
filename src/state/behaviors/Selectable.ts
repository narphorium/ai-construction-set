import { BlockStore } from "../BlockStore"
import { Behavior, BehaviorActions, createBehavior } from "./Behavior"

export interface SelectableProps extends Behavior {
  selected: boolean
  selectionIndex?: number
}

export const createSelectable = (props: Partial<SelectableProps> = {}): SelectableProps => {
  const selectable = {
    ...createBehavior(props),
    selected: false,
    selectionIndex: undefined,
    ...props,
  }
  return selectable as SelectableProps
}


export interface SelectableActions extends BehaviorActions {
  setSelected: (selected: boolean) => void
}

const setSelected = (store: BlockStore, blockId: string, selected: boolean): void => {
  store.updateBehavior<SelectableProps>(blockId, { selected })
}

export const createSelectableActions = (store: BlockStore, blockId: string): SelectableActions => {
  return {
    setSelected: (selected: boolean) => setSelected(store, blockId, selected)
  }
}

export type Selectable = SelectableProps & SelectableActions
