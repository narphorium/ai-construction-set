import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStoreState";

export interface BlockSelector {
  select: (state: BlockStoreState, root: BlockID) => BlockID[]
}
