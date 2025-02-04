import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStoreState } from "@/core/BlockStore.js";
import { Block } from "@/types/blocks/Block.js";
import { BlockSelector } from "./BlockSelector.js";

export class TextMatcher<T extends Block> extends BlockSelector {
  private type = "aics:matcher.text";
  constructor(
    protected registry: BlockRegistry,
    private property: keyof T,
    private text: string,
  ) {
    super(registry);
  }

  match(state: BlockStoreState, root: Block, block: Block): boolean {
    const b = block as T;
    return (
      this.property in b && (b[this.property] as string).indexOf(this.text) >= 0
    );
  }
}
