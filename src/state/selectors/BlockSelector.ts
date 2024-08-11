import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";

export interface BlockSelector {
  select: (state: BlockStoreState, root: BlockID) => BlockID[]
}
