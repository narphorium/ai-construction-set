import { Selectable } from "./Selectable";

export class Span extends Selectable {
    constructor(public content: string) {
        super();
    }
}