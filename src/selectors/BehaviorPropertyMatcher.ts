import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStoreState } from "@/core/BlockStore.js";
import { Behavior } from "@/types/behaviors/Behavior.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class BehaviorPropertyMatcher<T extends Behavior> extends BlockSelector {
  private type = "aics:matcher.behavior-property";

  constructor(
    protected registry: BlockRegistry,
    private property: keyof T,
    private value: any,
  ) {
    super(registry);
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const b = block as unknown as T;
    return this.property in b && b[this.property] === this.value;
  }
}
