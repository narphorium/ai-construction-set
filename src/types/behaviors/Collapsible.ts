import { BehaviorActions, BehaviorProps, createBehavior } from "./Behavior"
import { BlockStore } from "../../state"
import { BlockID } from "../blocks"

export interface CollapsibleProps extends BehaviorProps {
  collapsed: boolean
}

export const createCollapsible = (props: Partial<CollapsibleProps> = {}): CollapsibleProps => {
  return {
    ...createBehavior(props),
    name: '',
    collapsed: true,
    ...props,
  } as CollapsibleProps
}


export interface CollapsibleActions extends BehaviorActions {
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

export const createCollapsibleActions = (store: BlockStore, blockId: BlockID): CollapsibleActions => {
  return {
    setCollapsed: (collapsed: boolean) => store.updateBehavior<CollapsibleProps>(blockId, { collapsed }),
    toggleCollapsed: () => store.updateBehavior<CollapsibleProps>(blockId, (state: CollapsibleProps) => ({ collapsed: !state.collapsed })),
  }
}

export type Collapsible = CollapsibleProps & CollapsibleActions