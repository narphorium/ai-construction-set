import { Base } from "./Base";
import { NamedContent } from "./NamedContent";

export class List extends Base {
    items: NamedContent[] = [];

    public containsSelected(selected_index: number): boolean {
        let contains = false;
        this.items.forEach((item: NamedContent) => {
            if (item.containsSelected(selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
}