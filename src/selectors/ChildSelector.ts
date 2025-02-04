import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class ChildSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    let children: Block[] = [];
    if (root.children != undefined) {
      root.children.forEach((childId) => {
        const childBlock = state.blocks.get(childId);
        if (childBlock != undefined) {
          children.push(childBlock);
        }
      });
    }
    return children;
  }
}
