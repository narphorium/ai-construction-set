import { type Base } from './Base'
import { type Collapsible } from './Collapsible'
import { Content } from './Content'
import { List } from './List'
import { Paragraph } from './Paragraph'
import { Selectable } from './Selectable'
import { type Span } from './Span'
import { Table, TableRow } from './Table'
import { Tree } from './Tree'

export interface Visitor {
  visit: (block: Base) => void
  visitContent: (block: Content) => void
  visitList: (block: List) => void
  visitCollapsible: (block: Collapsible) => void
  visitParagraph: (block: Paragraph) => void
  visitSelectable: (block: Selectable) => void
  visitSpan: (block: Span) => void
  visitTree: (block: Tree) => void
  leave: (block: Base) => void
  leaveContent: (block: Content) => void
  leaveList: (block: List) => void
  leaveCollapsible: (block: Collapsible) => void
  leaveParagraph: (block: Paragraph) => void
  leaveSelectable: (block: Selectable) => void
  leaveSpan: (block: Span) => void
  leaveTree: (block: Tree) => void
  traverse: (block: Base) => void
}

export class BaseVisitor implements Visitor {
  visit (block: Base): void {}

  visitContent (block: Content): void {}

  visitList (block: List): void {}

  visitCollapsible (block: Collapsible): void {}

  visitParagraph (block: Paragraph): void {}

  visitSelectable (block: Selectable): void {}

  visitSpan (block: Span): void {}

  visitTable (block: Table): void {}

  visitTableRow (block: TableRow): void {}

  visitTree (block: Tree): void {}

  leave (block: Base): void {}

  leaveContent (block: Content): void {}

  leaveList (block: List): void {}

  leaveCollapsible (block: Collapsible): void {}

  leaveParagraph (block: Paragraph): void {}

  leaveSelectable (block: Selectable): void {}

  leaveSpan (block: Span): void {}

  leaveTable (block: Table): void {}

  leaveTableRow (block: TableRow): void {}

  leaveTree (block: Tree): void {}

  traverse (block: Base): void {
    this.visit(block)
    if (block instanceof List) {
      this._traverseList(block)
    } else if (block instanceof Content) {
      this._traverseContent(block)
    } else if (block instanceof Paragraph) {
      this._traverseParagraph(block)
    } else if (block instanceof Selectable) {
      this._traverseSelectable(block)
    } else if (block instanceof Table) {
      this._traverseTable(block)
    } else if (block instanceof TableRow) {
      this._traverseTableRow(block)
    } else if (block instanceof Tree) {
      this._traverseTree(block)
    }
    this.leave(block)
  }

  _traverseContent (block: Content): void {
    this.visitContent(block)
    block.children.forEach((child: Base) => {
      this.traverse(child)
    })
    this.leaveContent(block)
  }

  _traverseList (block: List): void {
    this.visitList(block)
    block.items.forEach((item: Base) => {
      this.traverse(item)
    })
    this.leaveList(block)
  }

  _traverseCollapsible (block: Collapsible): void {
    this.visitCollapsible(block)
    block.children.forEach((child: Base) => {
      this.traverse(child)
    })
    this.leaveCollapsible(block)
  }

  _traverseParagraph (block: Paragraph): void {
    this.visitParagraph(block)
    block.spans.forEach((span: Span) => {
      this.traverse(span)
    })
    this.leaveParagraph(block)
  }

  _traverseSelectable (block: Selectable): void {
    this.visitSelectable(block)
    this.leaveSelectable(block)
  }

  _traverseSpan (block: Span): void {
    this.visitSpan(block)
    this.leaveSpan(block)
  }

  _traverseTable (block: Table): void {
    this.visitTable(block)
    block.rows.forEach((row: Base) => {
      this.traverse(row)
    })
    this.leaveTable(block)
  }

  _traverseTableRow (block: TableRow): void {
    this.visitTableRow(block)
    block.values.forEach((cell: Base) => {
      this.traverse(cell)
    })
    this.leaveTableRow(block)
  }

  _traverseTree (block: Tree): void {
    this.visitTree(block)
    block.blocks.forEach((item: Base) => {
      this.traverse(item)
    })
    this.leaveTree(block)
  }
}

export class VisibleVisitor extends BaseVisitor {
  visible: boolean[] = []
  currentIteration: number[] = []

  visit (block: Base): void {
    const iteration = block.iteration ?? 1
    const isBlockVisible = iteration === this.currentIteration[this.currentIteration.length - 1]
    this.visible[this.visible.length - 1] = isBlockVisible
  }

  visitTree (block: Tree): void {
    this.currentIteration.push(block.page ?? 1)
    this.visible.push(true)
  }

  leaveTree (block: Tree): void {
    this.currentIteration.pop()
    this.visible.pop()
  }

  isVisible (): boolean {
    return this.visible.every((v: boolean) => v)
  }
}

export class SelectedVisitor extends VisibleVisitor {
  selectedIndex: number = -1
  selected: Selectable[] = []

  run (block: Base, selectedIndex: number = -1): Selectable[] {
    this.selectedIndex = selectedIndex
    this.selected = []
    this.traverse(block)
    return this.selected
  }

  visitContent (block: Content): void {
    this.visitSelectable(block)
  }

  visitParagraph (block: Paragraph): void {
    this.visitSelectable(block)
  }

  visitSelectable (block: Selectable): void {
    if (this.isVisible() && (
      block.selected ||
      (block.selectionIndex !== null && block.selectionIndex <= this.selectedIndex)
    )) {
      this.selected.push(block)
    }
  }
}
