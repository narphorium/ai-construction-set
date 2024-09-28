import { Behavior } from "../../types/behaviors";
import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockSelector } from "../selectors";
import { BlockStoreState } from "../BlockStore";

export class BehaviorPropertyMatcher<T extends Behavior> extends BlockSelector {
  private type = "aics:matcher.behavior-property" 

  constructor(protected registry: BlockRegistry, private property: keyof T, private value: any) { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const b = (block as unknown) as T;
    return this.property in b && b[this.property] === this.value;
  }
}