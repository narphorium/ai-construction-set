import { Selectable } from "./Selectable";
import { Span } from "./Span";

export class Section extends Selectable {
    public name: string | null = null;
    public spans: Span[] = [];

    constructor() {
        super();
    }

    public containsSelected(selected_index: number): boolean {
        let contains = super.containsSelected(selected_index);
        this.spans.forEach((span: Span) => {
            if (span.containsSelected(selected_index)) {
                contains = true;
            }
        });
        return contains;
    }
}