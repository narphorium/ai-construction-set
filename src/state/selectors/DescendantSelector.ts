import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStoreState";
import { BlockSelector } from "./BlockSelector";
import { ChildSelector } from "./ChildSelector";

export class DescendantSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const matches: BlockID[] = [];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue.pop();
      if (current === undefined) {
        continue;
      }
      matches.push(current);
      new ChildSelector().select(state, current).forEach(child => queue.push(child));
    }
    return matches;
  }
}