import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";

export class ParentSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const rootBlock = state.blocks.get(root);
    if (rootBlock == undefined) {
      return [];
    }
    return rootBlock.parent ? [rootBlock.parent] : [];
  }
}