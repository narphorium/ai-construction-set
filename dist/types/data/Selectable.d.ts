import { Base } from './Base';
export declare class Selectable extends Base {
    selected: boolean;
    selectionIndex: number | null;
    constructor(uuid: string);
    getClassNames(selectedIndex: number): string[];
}
