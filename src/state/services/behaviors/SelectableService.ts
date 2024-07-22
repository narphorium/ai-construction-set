import { BehaviorService } from "../../../data"
import { Selectable } from "../../../data/behaviors"
import { BlockStore } from "../../BlockStore"

export interface SelectableService extends BehaviorService<Selectable> {
  setSelected: (selected: boolean) => void
}

const setSelected = (store: BlockStore, blockId: string, selected: boolean): void => {
  store.updateBehavior<Selectable>(blockId, { selected })
}

export const createSelectableService = (store: BlockStore, blockId: string): SelectableService => {
  return {
    setSelected: (selected: boolean) => setSelected(store, blockId, selected)
  }
}