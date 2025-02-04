import { BlockStoreState } from "@/core/BlockStore.js";
import { Pageable } from "@/types/behaviors/Pageable.js";
import { Block } from "@/types/blocks/Block.js";
import { BehaviorPropertyMatcher } from "./BehaviorPropertyMatcher.js";
import { BlockPropertyMatcher } from "./BlockPropertyMatcher.js";
import { ChildSelector } from "./ChildSelector.js";

export class VisibleChildSelector extends ChildSelector {
  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const m1 = new BehaviorPropertyMatcher<Pageable>(
      this.registry,
      "page",
      true,
    );
    if (!m1.run(state, root)) {
      const rootPage = (root as any as Pageable).page;
      const m2 = new BlockPropertyMatcher<Block>(
        this.registry,
        "iteration",
        rootPage,
      );
      return m2.run(state, block).length > 0;
    }
    return true;
  }
}
