import { Selectable } from './Selectable';
export declare class Span extends Selectable {
    uuid: string;
    content: string;
    datatype?: string;
    constructor(uuid: string, content: string);
}
