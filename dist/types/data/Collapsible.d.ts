import { Content } from './Content';
export declare class Collapsible extends Content {
    name: string;
    collapsed: boolean;
    icon?: string;
    constructor(uuid: string, name: string);
}
