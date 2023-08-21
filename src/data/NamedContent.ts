import { Content } from "./Content";

export class NamedContent extends Content {
    public collapsed: boolean = true;

    constructor(public name: string) {
        super();
    }
}