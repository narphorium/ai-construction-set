import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockMatcher } from "./BlockMatcher";

export class BlockPropertyMatcher<T extends Block> implements BlockMatcher {
  constructor(private property: keyof T, private value: any) { }

  match(registry: BlockRegistry, block: Block): boolean {
    const b = block as T;
    return this.property in b && b[this.property] === this.value;
  }
}