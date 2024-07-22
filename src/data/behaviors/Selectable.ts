import { Behavior, createBehavior } from './Behavior'

export interface Selectable extends Behavior {
  selected: boolean
  selectionIndex?: number
}

export const createSelectable = (props: Partial<Selectable>): Selectable => {
  const selectable: Selectable = {
    ...createBehavior(props),
    selected: false,
    selectionIndex: undefined,
    ...props,
  }
  return selectable
}
