import { Selectable } from "./Selectable";
import { Span } from "./Span";

export class Section extends Selectable {
    public name: string | null = null;
    public spans: Span[] = [];
}