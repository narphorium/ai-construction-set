import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";

export class BlockSelector {
  constructor(protected registry: BlockRegistry) {}
  protected select(state: BlockStoreState, root: Block): Block[] {
    return [root];
  }
  protected match(state: BlockStoreState, root: Block, block: Block): boolean {
    return true;
  }
  run(state: BlockStoreState, root: Block): Block[] {
    let matches: Block[] = [];
    this.select(state, root).forEach((block) => {
      if (this.match(state, root, block)) {
        matches.push(block);
      }
    });
    return matches;
  }
}
