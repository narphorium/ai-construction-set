import { type Base } from './Base'
import { type Collapsible } from './Collapsible'
import { Content } from './Content'
import { List } from './List'
import { Section } from './Section'
import { Selectable } from './Selectable'
import { type Span } from './Span'
import { Tree } from './Tree'

export interface Visitor {
  visit: (block: Base) => void
  visitContent: (block: Content) => void
  visitList: (block: List) => void
  visitNamedContent: (block: Collapsible) => void
  visitSection: (block: Section) => void
  visitSelectable: (block: Selectable) => void
  visitSpan: (block: Span) => void
  visitTree: (block: Tree) => void
  leave: (block: Base) => void
  leaveContent: (block: Content) => void
  leaveList: (block: List) => void
  leaveNamedContent: (block: Collapsible) => void
  leaveSection: (block: Section) => void
  leaveSelectable: (block: Selectable) => void
  leaveSpan: (block: Span) => void
  leaveTree: (block: Tree) => void
  traverse: (block: Base) => void
}

export class BaseVisitor implements Visitor {
  visit (block: Base): void {}

  visitContent (block: Content): void {}

  visitList (block: List): void {}

  visitNamedContent (block: Collapsible): void {}

  visitSection (block: Section): void {}

  visitSelectable (block: Selectable): void {}

  visitSpan (block: Span): void {}

  visitTree (block: Tree): void {}

  leave (block: Base): void {}

  leaveContent (block: Content): void {}

  leaveList (block: List): void {}

  leaveNamedContent (block: Collapsible): void {}

  leaveSection (block: Section): void {}

  leaveSelectable (block: Selectable): void {}

  leaveSpan (block: Span): void {}

  leaveTree (block: Tree): void {}

  traverse (block: Base): void {
    this.visit(block)
    if (block instanceof List) {
      this._traverseList(block)
    } else if (block instanceof Content) {
      this._traverseContent(block)
    } else if (block instanceof Section) {
      this._traverseSection(block)
    } else if (block instanceof Selectable) {
      this._traverseSelectable(block)
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

  _traverseNamedContent (block: Collapsible): void {
    this.visitNamedContent(block)
    block.children.forEach((child: Base) => {
      this.traverse(child)
    })
    this.leaveNamedContent(block)
  }

  _traverseSection (block: Section): void {
    this.visitSection(block)
    block.spans.forEach((span: Span) => {
      this.traverse(span)
    })
    this.leaveSection(block)
  }

  _traverseSelectable (block: Selectable): void {
    this.visitSelectable(block)
    this.leaveSelectable(block)
  }

  _traverseSpan (block: Span): void {
    this.visitSpan(block)
    this.leaveSpan(block)
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

  visitSection (block: Section): void {
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
