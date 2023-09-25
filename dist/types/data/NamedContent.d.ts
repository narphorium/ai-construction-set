import { Content } from "./Content";
export declare class NamedContent extends Content {
    name: string;
    collapsed: boolean;
    constructor(uuid: string, name: string);
}
