import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "../selectors";

export class TypeMatcher extends BlockSelector {
  private type = "aics:matcher.type"

  constructor(protected registry: BlockRegistry, private blockType: string) { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return block.type === this.blockType;
  }
}