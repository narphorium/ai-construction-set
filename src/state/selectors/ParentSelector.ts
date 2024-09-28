import { Block } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";

export class ParentSelector extends BlockSelector {
  select(state: BlockStoreState, root: Block): Block[] {
    const parentBlock = root.parent != undefined ? state.blocks.get(root.parent) : undefined
    return parentBlock != undefined ? [parentBlock] : [];
  }
}