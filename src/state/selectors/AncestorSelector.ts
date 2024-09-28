import { RecursiveBlockSelector } from "./RecursiveBlockSelector";
import { ParentSelector } from "./ParentSelector";
import { BlockRegistry } from "../BlockRegistry";

export class AncestorSelector extends RecursiveBlockSelector {
  constructor(protected registry: BlockRegistry) {
    super(registry, new ParentSelector(registry));
  }
}