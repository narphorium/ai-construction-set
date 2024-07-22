import { BehaviorService, BlockRegistry } from "../../../data"
import { Collapsible } from "../../../data/behaviors"
import { BlockStore } from "../../BlockStore"

export interface CollapsibleService extends BehaviorService<Collapsible> {
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

export const createCollapsibleService = (store: BlockStore, blockId: string): CollapsibleService => {
  return {
    setCollapsed: (collapsed: boolean) => setCollapsed(store, blockId, collapsed),
    toggleCollapsed: () => toggleCollapsed(store, blockId)
  }
}