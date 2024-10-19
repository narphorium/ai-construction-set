import { Block } from "../types/blocks";
import { BlockStoreState } from "../core/BlockStore";
import { BlockSelector } from "./BlockSelector";
import { VisibleChildSelector } from "./VisibleChildSelector";

export class VisibleSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parent = root.parent != undefined ? state.blocks.get(root.parent) : undefined
    if (parent != undefined) {
      // Recursively, check if any ancestor is visible
      const visibleParents = new VisibleChildSelector(this.registry).select(state, parent)
      if (visibleParents.length > 0) {
        const visibleChildren = new VisibleChildSelector(this.registry).select(state, parent)
        return visibleChildren
      }
    }
    return [];
  }
  match(state: BlockStoreState, root: Block, block: Block): boolean {
    // The root block is only visible if it is in the visible children of its parent
    return root.uuid === block.uuid;
  }
}