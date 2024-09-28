import { Pageable } from "../../types/behaviors";
import { Block } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { BlockPropertyMatcher } from "../matchers";
import { BehaviorPropertyMatcher } from "../matchers/BehaviorPropertyMatcher";
import { ChildSelector } from "./ChildSelector";

export class VisibleChildSelector extends ChildSelector {
  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const m1 = new BehaviorPropertyMatcher<Pageable>(this.registry, 'page', true)
    if (!m1.run(state, root)) {
      const rootPage = ((root as any)as Pageable).page
      const m2 = new BlockPropertyMatcher<Block>(this.registry, 'iteration', rootPage)
      return m2.run(state, block).length > 0
    }
    return true;
  }
}