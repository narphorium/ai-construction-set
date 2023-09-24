/// <reference types="react" />
import { Base, Content, List, ListItem, NamedContent, Section, Selectable, Span, Stream } from '../data';
export interface BlockFactory {
    build(block: Base, parent?: Base): JSX.Element;
    registerBuilder(target_class: string, builder: ((block: Base, parent?: Base | undefined) => JSX.Element)): void;
}
export declare class DefaultBlockFactory implements BlockFactory {
    builders: Map<string, (block: Base, parent?: Base) => JSX.Element>;
    constructor();
    registerBuilder(target_class: string, builder: ((block: Base, parent?: Base | undefined) => JSX.Element)): void;
    getClassNames(block: Base, selected_index: number): string[];
    useCollapsed(block: NamedContent): {
        collapsed: boolean;
        toggleCollapsed: (c: boolean) => void;
    };
    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element;
    buildListItem(block: ListItem, parent?: Base): JSX.Element;
    buildContent(block: Content, parent?: Base): JSX.Element;
    buildSection(block: Section, parent?: Base): JSX.Element;
    buildList(block: List, parent?: Base): JSX.Element;
    buildSpan(block: Span, parent?: Base): JSX.Element;
    buildSelectable(block: Selectable, parent?: Base): JSX.Element;
    buildStream(stream: Stream, parent?: Base): JSX.Element;
    build(block: Base, parent?: Base): JSX.Element;
}
