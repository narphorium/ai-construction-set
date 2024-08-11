import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockMatcher } from "./BlockMatcher";

export class TypeMatcher implements BlockMatcher {
  constructor(private type: string) { }

  match(registry: BlockRegistry, block: Block): boolean {
    return block.type === this.type;
  }
}