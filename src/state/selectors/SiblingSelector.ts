import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";
import { ParentSelector } from "./ParentSelector";

export class SiblingSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const parent = new ParentSelector().select(state, root)[0];
    const parentBlock = state.blocks.get(parent);
    if (parentBlock === undefined) {
      return [];
    }
    const siblings = parentBlock.children.filter(child => child !== root);
    return siblings;
  }
}