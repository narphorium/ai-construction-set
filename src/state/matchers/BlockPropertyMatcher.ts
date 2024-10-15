import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks/Block";
import { BlockStoreState } from "../BlockStore";
import { BlockSelector } from "../selectors/BlockSelector";

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