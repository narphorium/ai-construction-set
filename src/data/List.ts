import { Base } from "./Base";
import { NamedContent } from "./NamedContent";

export class ListItem extends NamedContent {}

export class List extends Base {
    items: ListItem[] = [];
}