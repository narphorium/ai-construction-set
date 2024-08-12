import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStoreState";
import { BlockSelector } from "./BlockSelector";
import { ParentSelector } from "./ParentSelector";

export class SiblingSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const parent = new ParentSelector().select(state, root)[0];
    const parentBlock = state.blocks.get(parent);
    if (parentBlock === undefined) {
      return [];
    }
    const siblings = state.children.get(parentBlock.uuid);
    if (siblings === undefined) {
      return [];
    }
    return siblings;
  }
}