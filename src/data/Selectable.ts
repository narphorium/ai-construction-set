import { Base } from "./Base";

export class Selectable extends Base {
    public selected: boolean = false;
    public selection_index: number | null = null;

    public constructor(uuid: string) {
        super(uuid);
    }

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

}