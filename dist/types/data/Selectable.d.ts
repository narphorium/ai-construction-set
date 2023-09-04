import { Base } from "./Base";
export declare class Selectable extends Base {
    selected: boolean;
    selection_index: number | null;
    getClassNames(selected_index: number): string[];
}
