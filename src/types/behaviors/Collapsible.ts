import { BehaviorActions, BehaviorGetter, BehaviorProps, BehaviorSetter, createBehavior } from "./Behavior"

export interface CollapsibleProps extends BehaviorProps {
  collapsed: boolean
}

export const createCollapsible = (props: Partial<CollapsibleProps> = {}): CollapsibleProps => {
  return {
    ...createBehavior(props),
    name: '',
    collapsed: false,
    ...props,
  } as CollapsibleProps
}


export interface CollapsibleActions extends BehaviorActions {
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

export const createCollapsibleActions = (get: BehaviorGetter<CollapsibleProps>, set: BehaviorSetter<CollapsibleProps>): CollapsibleActions => {
  return {
    setCollapsed: (collapsed: boolean) => set({ collapsed }),
    toggleCollapsed: () => set({ collapsed: !get().collapsed }),
  }
}

export type Collapsible = CollapsibleProps & CollapsibleActions