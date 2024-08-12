import { BlockStore } from "../../state"
import { BlockID } from "../blocks"
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

export const createSelectableActions = (store: BlockStore, blockId: BlockID): SelectableActions => {
  return {
    setSelected: (selected: boolean) => store.updateBehavior<SelectableProps>(blockId, { selected }),
  }
}

export type Selectable = SelectableProps & SelectableActions
