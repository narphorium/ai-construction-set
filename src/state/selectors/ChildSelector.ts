import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";

export class ChildSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    return state.children.get(root) ?? [];
  }
}