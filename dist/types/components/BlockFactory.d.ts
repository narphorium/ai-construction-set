import { type ForwardRefExoticComponent } from 'react';
import { Code, Collapsible, Content, List, ListItem, Paragraph, Selectable, Span, Table, Tree, type Base } from '../data';
import { type BlockProps, type CollapsibleProps, type PaginatedProps, type SelectableProps } from './Base';
export type BlockBuilder = (block: Base) => JSX.Element;
export interface BlockFactory {
    build: (block: Base, parent?: Base) => JSX.Element;
    buildAll: (blocks: Base[], parent?: Base) => JSX.Element[];
    registerBuilder: (target_class: string, builder: BlockBuilder) => void;
    registerTheme: (name: string, lightTheme: any, darkTheme: any) => void;
    getTheme: (name: string) => [any, any];
    getParent: (block: Base) => Base | undefined;
    setParent: (block: Base, parent: Base) => void;
}
export declare class DefaultBlockFactory implements BlockFactory {
    block_types: any[];
    builders: BlockBuilder[];
    parentByBlock: Map<Base, Base>;
    themes: Map<string, [any, any]>;
    constructor();
    registerBuilder(targetClass: any, builder: BlockBuilder): void;
    registerTheme(name: string, lightTheme: any, darkTheme: any): void;
    getTheme(name: string): [any, any];
    getParent(block: Base): Base | undefined;
    setParent(block: Base, parent: Base): void;
    getTreeLevel(tree: Tree): number;
    build(block: Base, parent?: Base): JSX.Element;
    buildAll(blocks: Base[], parent?: Base): JSX.Element[];
    getClassNames(block: Base, selectedIndex: number): string[];
    withTheme<TProps extends BlockProps>(Component: ForwardRefExoticComponent<TProps>, params: {
        block: Base;
    }): any;
    withSelectable<TProps extends SelectableProps>(Component: ForwardRefExoticComponent<TProps>): any;
    withCollapsible<TProps extends CollapsibleProps>(Component: ForwardRefExoticComponent<TProps>): any;
    withPageable<TProps extends PaginatedProps>(Component: ForwardRefExoticComponent<TProps>): any;
    buildCollapsible(block: Collapsible): JSX.Element;
    buildListItem(block: ListItem): JSX.Element;
    buildContent(block: Content): JSX.Element;
    buildSection(block: Paragraph): JSX.Element;
    buildCode(block: Code): JSX.Element;
    buildList(block: List): JSX.Element;
    buildSpan(block: Span): JSX.Element;
    buildSelectable(block: Selectable): JSX.Element;
    buildTree(block: Tree): JSX.Element;
    buildTable(block: Table): JSX.Element;
}
