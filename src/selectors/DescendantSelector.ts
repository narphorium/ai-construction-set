import { RecursiveBlockSelector } from "./RecursiveBlockSelector";
import { ChildSelector } from "./ChildSelector";
import { BlockRegistry } from "../core/BlockRegistry";

export class DescendantSelector extends RecursiveBlockSelector {
  constructor(protected registry: BlockRegistry) {
    super(registry, new ChildSelector(registry));
  }
}