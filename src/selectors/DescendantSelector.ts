import { BlockRegistry } from "@/core/BlockRegistry.js";
import { ChildSelector } from "./ChildSelector.js";
import { RecursiveBlockSelector } from "./RecursiveBlockSelector.js";

export class DescendantSelector extends RecursiveBlockSelector {
  constructor(protected registry: BlockRegistry) {
    super(registry, new ChildSelector(registry));
  }
}
