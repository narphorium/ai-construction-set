import { Content } from "./Content";

export class NamedContent extends Content {
    public collapsed: boolean = true;

    constructor(uuid: string, public name: string) {
        super(uuid);
    }
}