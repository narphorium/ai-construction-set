import { Behavior } from "../types/behaviors";
import { BlockRegistry } from "../core/BlockRegistry";
import { Block } from "../types/blocks/Block";
import { BlockSelector } from "./BlockSelector";
import { BlockStoreState } from "../core/BlockStore";

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