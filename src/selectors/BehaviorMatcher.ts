import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class BehaviorMatcher extends BlockSelector {
  private type = "aics:matcher.behavior";

  constructor(
    protected registry: BlockRegistry,
    private behavior: string,
  ) {
    super(registry);
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    return this.registry.hasBehavior(block.type, this.behavior);
  }
}
