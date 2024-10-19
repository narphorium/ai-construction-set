import { BlockRegistry } from "../core/BlockRegistry";
import { Block } from "../types/blocks/Block";
import { BlockStoreState } from "../core/BlockStore";
import { BlockSelector } from "./BlockSelector";

export class BlockPropertyMatcher<T extends Block> extends BlockSelector {
  private type = "aics:matcher.block-property"

  constructor(protected registry: BlockRegistry, private property: keyof T, private value: any) { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const b = block as T;
    return this.property in b && b[this.property] === this.value;
  }
}