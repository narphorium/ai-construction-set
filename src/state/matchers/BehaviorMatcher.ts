import { BlockRegistry } from "../BlockRegistry";
import { Block } from "../../types/blocks";
import { BlockMatcher } from "./BlockMatcher";

export class BehaviorMatcher implements BlockMatcher {
  constructor(private behavior: string) { }

  match(registry: BlockRegistry, block: Block): boolean {
    return registry.hasBehavior(block.type, this.behavior);
  }
}