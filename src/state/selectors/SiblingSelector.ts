import { Block } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";
import { ChildSelector } from "./ChildSelector";
import { ParentSelector } from "./ParentSelector";

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