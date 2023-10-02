/// <reference types="react" />
import { Content, List, ListItem, NamedContent, Section, Selectable, Span, Stream, type Base } from '../data';
export interface BlockFactory {
    build: (block: Base, parent?: Base) => JSX.Element;
    registerBuilder: (target_class: string, builder: ((block: Base, parent?: Base | undefined) => JSX.Element)) => void;
}
export declare class DefaultBlockFactory implements BlockFactory {
    block_types: any[];
    builders: Array<(block: any, parent?: any) => JSX.Element>;
    constructor();
    registerBuilder(targetClass: any, builder: ((block: any, parent?: any | undefined) => JSX.Element)): void;
    build(block: Base, parent?: Base): JSX.Element;
    getClassNames(block: Base, selectedIndex: number): string[];
    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element;
    buildListItem(block: ListItem, parent?: Base): JSX.Element;
    buildContent(block: Content, parent?: Base): JSX.Element;
    buildSection(block: Section, parent?: Base): JSX.Element;
    buildList(block: List, parent?: Base): JSX.Element;
    buildSpan(block: Span, parent?: Base): JSX.Element;
    buildSelectable(block: Selectable, parent?: Base): JSX.Element;
    buildStream(stream: Stream, parent?: Base): JSX.Element;
}
