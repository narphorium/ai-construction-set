import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockSelector } from "../selectors";
import { BlockStoreState } from "../BlockStore";

export class TextMatcher<T extends Block> extends BlockSelector {
  private type = "aics:matcher.text"
  constructor(protected registry: BlockRegistry, private property: keyof T, private text: string) { 
    super(registry)
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const b = block as T;
    return this.property in b && (b[this.property] as string).indexOf(this.text) >= 0;
  }
}