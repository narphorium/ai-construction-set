import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";
import { ChildSelector } from "./ChildSelector.js";
import { ParentSelector } from "./ParentSelector.js";

export class SubsequentSiblingSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parent = new ParentSelector(this.registry).run(state, root)[0];
    const siblings = new ChildSelector(this.registry).run(state, parent);
    const index = siblings.findIndex((sibling) => sibling.uuid === root.uuid);
    if (index === -1) {
      return [];
    }
    return siblings.slice(index + 1);
  }
}
