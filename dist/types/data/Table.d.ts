import { type Paragraph } from './Paragraph';
import { Selectable } from './Selectable';
export declare class TableRow extends Selectable {
    values: Paragraph[];
    isHeader?: boolean;
}
export declare class Table extends Selectable {
    rows: TableRow[];
}
