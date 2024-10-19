import { Block } from "../types/blocks";
import { BlockRegistry } from "../core/BlockRegistry";
import { BlockStoreState } from "../core/BlockStore";

export class BlockSelector {
  constructor(protected registry: BlockRegistry) { }
  protected select (state: BlockStoreState, root: Block): Block[] {
    return [root];
  }
  protected match (state: BlockStoreState, root: Block, block: Block): boolean {
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
