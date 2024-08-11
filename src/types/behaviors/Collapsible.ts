import { BehaviorActions, BehaviorProps, createBehavior } from "./Behavior"
import { BlockStore } from "../BlockStore"

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

const setCollapsed = (store: BlockStore, blockId: string, collapsed: boolean): void => {
  store.updateBehavior<Collapsible>(blockId, { collapsed })
}

const toggleCollapsed = (store: BlockStore, blockId: string): void => {
  const block = store.getBehavior<Collapsible>(blockId)
  if (block != null) {
    store.updateBehavior<Collapsible>(blockId, { collapsed: !block.collapsed })
  }
}

export const createCollapsibleActions = (store: BlockStore, blockId: string): CollapsibleActions => {
  return {
    setCollapsed: (collapsed: boolean) => setCollapsed(store, blockId, collapsed),
    toggleCollapsed: () => toggleCollapsed(store, blockId)
  }
}

export type Collapsible = CollapsibleProps & CollapsibleActions