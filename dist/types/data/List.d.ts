import { Base } from './Base';
import { Collapsible } from './Collapsible';
export declare class ListItem extends Collapsible {
}
export declare class ChecklistItem extends ListItem {
    checked: boolean;
}
export declare class List extends Base {
    items: ListItem[];
}
export declare class Checklist extends List {
    items: ChecklistItem[];
}
