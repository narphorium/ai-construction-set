import { BlockService } from "../../../data";
import { Checkbox } from "../../../data/blocks";
import { BlockStore } from "../../BlockStore";

export interface CheckboxService extends BlockService<Checkbox> {
  setChecked(checked: boolean): void
  toggleChecked(): void
}

const setChecked = (store: BlockStore, blockId: string, checked: boolean) => {
  store.updateBlock<Checkbox>(blockId, { checked })
}

const toggleChecked = (store: BlockStore, blockId: string) => {
  const checkbox = store.getBlock<Checkbox>(blockId)
  if (checkbox != null) {
    store.updateBlock<Checkbox>(blockId, { checked: !checkbox.checked })
  }
}

export const createCheckboxService = (store: BlockStore, blockId: string): CheckboxService => {
  return {
    setChecked: (checked: boolean) => setChecked(store, blockId, checked),
    toggleChecked: () => toggleChecked(store, blockId),
  }
}