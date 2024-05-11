import { type Base } from './Base';
import { type Collapsible } from './Collapsible';
import { Content } from './Content';
import { List } from './List';
import { Paragraph } from './Paragraph';
import { Selectable } from './Selectable';
import { type Span } from './Span';
import { Table, TableRow } from './Table';
import { Tree } from './Tree';
export interface Visitor {
    visit: (block: Base) => void;
    visitContent: (block: Content) => void;
    visitList: (block: List) => void;
    visitCollapsible: (block: Collapsible) => void;
    visitParagraph: (block: Paragraph) => void;
    visitSelectable: (block: Selectable) => void;
    visitSpan: (block: Span) => void;
    visitTree: (block: Tree) => void;
    leave: (block: Base) => void;
    leaveContent: (block: Content) => void;
    leaveList: (block: List) => void;
    leaveCollapsible: (block: Collapsible) => void;
    leaveParagraph: (block: Paragraph) => void;
    leaveSelectable: (block: Selectable) => void;
    leaveSpan: (block: Span) => void;
    leaveTree: (block: Tree) => void;
    traverse: (block: Base) => void;
}
export declare class BaseVisitor implements Visitor {
    visit(block: Base): void;
    visitContent(block: Content): void;
    visitList(block: List): void;
    visitCollapsible(block: Collapsible): void;
    visitParagraph(block: Paragraph): void;
    visitSelectable(block: Selectable): void;
    visitSpan(block: Span): void;
    visitTable(block: Table): void;
    visitTableRow(block: TableRow): void;
    visitTree(block: Tree): void;
    leave(block: Base): void;
    leaveContent(block: Content): void;
    leaveList(block: List): void;
    leaveCollapsible(block: Collapsible): void;
    leaveParagraph(block: Paragraph): void;
    leaveSelectable(block: Selectable): void;
    leaveSpan(block: Span): void;
    leaveTable(block: Table): void;
    leaveTableRow(block: TableRow): void;
    leaveTree(block: Tree): void;
    traverse(block: Base): void;
    _traverseContent(block: Content): void;
    _traverseList(block: List): void;
    _traverseCollapsible(block: Collapsible): void;
    _traverseParagraph(block: Paragraph): void;
    _traverseSelectable(block: Selectable): void;
    _traverseSpan(block: Span): void;
    _traverseTable(block: Table): void;
    _traverseTableRow(block: TableRow): void;
    _traverseTree(block: Tree): void;
}
export declare class VisibleVisitor extends BaseVisitor {
    visible: boolean[];
    currentIteration: number[];
    visit(block: Base): void;
    visitTree(block: Tree): void;
    leaveTree(block: Tree): void;
    isVisible(): boolean;
}
export declare class SelectedVisitor extends VisibleVisitor {
    selectedIndex: number;
    selected: Selectable[];
    run(block: Base, selectedIndex?: number): Selectable[];
    visitContent(block: Content): void;
    visitParagraph(block: Paragraph): void;
    visitSelectable(block: Selectable): void;
}
