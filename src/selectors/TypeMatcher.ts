import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class TypeMatcher extends BlockSelector {
  private type = "aics:matcher.type";

  constructor(
    protected registry: BlockRegistry,
    private blockType: string,
  ) {
    super(registry);
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return block.type === this.blockType;
  }
}
