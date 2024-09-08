import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockMatcher } from "./BlockMatcher";

export class TypeMatcher implements BlockMatcher {
  private type = "aics:matcher:type"

  constructor(private blockType: string) { }

  match(registry: BlockRegistry, block: Block): boolean {
    return block.type === this.blockType;
  }
}