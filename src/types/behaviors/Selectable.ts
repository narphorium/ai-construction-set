import { Behavior, BehaviorActions, BehaviorGetter, BehaviorSetter, createBehavior } from "./Behavior"

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

export const createSelectableActions = (get: BehaviorGetter<SelectableProps>, set: BehaviorSetter<SelectableProps>): SelectableActions => {
  return {
    setSelected: (selected: boolean) => set({ selected }),
  }
}

export type Selectable = SelectableProps & SelectableActions
