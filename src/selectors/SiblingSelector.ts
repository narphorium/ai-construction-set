import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";
import { ChildSelector } from "./ChildSelector.js";
import { ParentSelector } from "./ParentSelector.js";

export class SiblingSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parent = new ParentSelector(this.registry).select(state, root)[0];
    const children = new ChildSelector(this.registry).select(state, parent);
    return children;
  }
  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return block.uuid !== root.uuid;
  }
}
