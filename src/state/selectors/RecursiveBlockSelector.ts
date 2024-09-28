import { Block } from "../../types/blocks";
import { BlockRegistry } from "../BlockRegistry";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";

export class RecursiveBlockSelector extends BlockSelector {
  constructor(protected registry: BlockRegistry, private selector: BlockSelector) {
    super(registry);
  }

  select(state: BlockStoreState, root: Block): Block[] {
    const matches: Block[] = [];
    let queue = [root];
    while (queue.length > 0) {
      const current = queue.pop();
      if (current === undefined) {
        continue;
      }
      if (current !== root) {
        matches.push(current);
      }
      queue = queue.concat(this.selector.run(state, current));
    }
    return matches;
  }
}