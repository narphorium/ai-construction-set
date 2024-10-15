import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks/Block";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "../selectors/BlockSelector";

export class BehaviorMatcher extends BlockSelector {
  private type = "aics:matcher.behavior"
  
  constructor(protected registry: BlockRegistry, private behavior: string)   { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return this.registry.hasBehavior(block.type, this.behavior);
  }
}