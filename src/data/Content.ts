import { Base } from "./Base";
import { Selectable } from "./Selectable";

export class Content extends Selectable {
  public children: Base[] = [];

  public containsSelected(selected_index: number): boolean {
        let contains = super.containsSelected(selected_index);
        this.children.forEach((child: Base) => {
            if (child.containsSelected(selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
}