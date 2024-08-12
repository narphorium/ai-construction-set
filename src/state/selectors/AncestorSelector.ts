import { BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStoreState";
import { BlockSelector } from "./BlockSelector";
import { ParentSelector } from "./ParentSelector";

export class AncestorSelector implements BlockSelector {
  select(state: BlockStoreState, root: BlockID): BlockID[] {
    const matches: BlockID[] = [];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue.pop();
      if (current === undefined) {
        continue;
      }
      matches.push(current);
      new ParentSelector().select(state, current).forEach(parent => queue.push(parent));
    }
    return matches;
  }
}