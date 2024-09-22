import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "./BlockSelector";

export class RecursiveBlockSelector implements BlockSelector {
  constructor(private selector: BlockSelector) {}

  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const matches: BlockID[] = [];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue.pop();
      if (current === undefined) {
        continue;
      }
      if (current !== root) {
        matches.push(current);
      }
      this.selector.select(state, current).forEach(item => queue.push(item));
    }
    return matches;
  }
}