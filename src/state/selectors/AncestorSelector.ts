import { RecursiveBlockSelector } from "./RecursiveBlockSelector";
import { ParentSelector } from "./ParentSelector";

export class AncestorSelector extends RecursiveBlockSelector {
  constructor() {
    super(new ParentSelector());
  }
}