import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class ParentSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parentBlock =
      root.parent != undefined ? state.blocks.get(root.parent) : undefined;
    return parentBlock != undefined ? [parentBlock] : [];
  }
}
