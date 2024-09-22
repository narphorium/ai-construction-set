import { RecursiveBlockSelector } from "./RecursiveBlockSelector";
import { ChildSelector } from "./ChildSelector";

export class DescendantSelector extends RecursiveBlockSelector {
  constructor() {
    super(new ChildSelector());
  }
}