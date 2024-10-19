import { BlockRegistry } from "../core/BlockRegistry";
import { Block } from "../types/blocks/Block";
import { BlockStoreState } from "../core/BlockStore";
import { BlockSelector } from "./BlockSelector";

export class TypeMatcher extends BlockSelector {
  private type = "aics:matcher.type"

  constructor(protected registry: BlockRegistry, private blockType: string) { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return block.type === this.blockType;
  }
}