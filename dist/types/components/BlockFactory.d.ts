/// <reference types="react" />
import { Base, Content, List, NamedContent, Section, Selectable, Span } from '../data';
export interface BlockFactory {
    build(block: Base, parent?: Base): JSX.Element;
}
export declare class DefaultBlockFactory implements BlockFactory {
    getClassNames(block: Base, selected_index: number): string[];
    useCollapsed(block: NamedContent): {
        collapsed: boolean;
        toggleCollapsed: (c: boolean) => void;
    };
    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element;
    buildListItem(block: NamedContent, parent?: Base): JSX.Element;
    buildContent(block: Content, parent?: Base): JSX.Element;
    buildSection(block: Section, parent?: Base): JSX.Element;
    buildList(block: List, parent?: Base): JSX.Element;
    buildSpan(block: Span, parent?: Base): JSX.Element;
    buildSentinal(block: Selectable, parent?: Base): JSX.Element;
    build(block: Base, parent?: Base): JSX.Element;
}
