import { BlockRegistry } from "../BlockRegistry";
import { Block, } from "../../types/blocks";

export interface BlockMatcher {
  match: (registry: BlockRegistry, block: Block) => boolean
}