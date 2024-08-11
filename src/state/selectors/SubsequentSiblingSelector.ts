import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";
import { SiblingSelector } from "./SiblingSelector";

export class SubsequentSiblingSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const siblings = new SiblingSelector().select(state, root);
    const index = siblings.findIndex((sibling) => sibling === root);
    if (index === -1) {
      return [];
    }
    return siblings.slice(index + 1);
  }
}