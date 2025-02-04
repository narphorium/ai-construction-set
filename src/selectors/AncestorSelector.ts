import { BlockRegistry } from "@/core/BlockRegistry.js";
import { ParentSelector } from "./ParentSelector.js";
import { RecursiveBlockSelector } from "./RecursiveBlockSelector.js";

export class AncestorSelector extends RecursiveBlockSelector {
  constructor(protected registry: BlockRegistry) {
    super(registry, new ParentSelector(registry));
  }
}
