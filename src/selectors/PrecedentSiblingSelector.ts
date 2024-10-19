import { Block } from "../types/blocks";
import { BlockStoreState } from "../core/BlockStore";
import { BlockSelector } from "./BlockSelector";
import { ChildSelector } from "./ChildSelector";
import { ParentSelector } from "./ParentSelector";

export class PrecedentSiblingSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parent = new ParentSelector(this.registry).run(state, root)[0];
    const siblings = new ChildSelector(this.registry).run(state, parent);
    const index = siblings.findIndex((sibling) => sibling.uuid === root.uuid);
    if (index === -1) {
      return [];
    }
    return siblings.slice(0, index);
  }
}