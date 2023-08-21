import { Base } from "./Base";

export class Selectable extends Base {
    public selection_index: number | null = null;

    public getClassNames(selected_index: number): string[] {
        const classNames = new Set(super.getClassNames(selected_index));
        if (this.selection_index !== null) {
            classNames.add('selectable');
        }
        if (selected_index === this.selection_index) {
            classNames.add('selected');
        }
        return Array.from(classNames);
    }

    public containsSelected(selected_index: number): boolean {
        if (this.selection_index === null) {
            return false;
        }
        return this.selection_index <= selected_index;
    }

}