/// <reference types="react" />
import { Base } from '../data';
export interface ItemFactory {
    lookup(block: Base, index: any): JSX.Element;
}
export declare const DefaultItemFactory: ItemFactory;
