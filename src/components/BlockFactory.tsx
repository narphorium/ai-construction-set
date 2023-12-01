import React from 'react'
import { Code, Collapsible, Content, List, ListItem, Section, Selectable, Span, Table, Tree, type Base } from '../data'
import { NestedPaginationProvider } from '../hooks'
import { CodeBlock } from './CodeBlock'
import { CollapsibleBlock, ListLayoutItem } from './CollapsibleBlock'
import { ContentBlock } from './ContentBlock'
import { ContentSection } from './ContentSection'
import { ContentSpan } from './ContentSpan'
import { ListLayout } from './ListLayout'
import { SentinalView } from './SentinalView'
import { TableSection } from './TableSection'
import { TreeLayout } from './TreeLayout'
import { withCascadingVariants } from './withCascadingVariants'
import { withCollapsible } from './withCollapsible'
import { withPageable } from './withPageable'
import { withSelectable } from './withSelectable'

export type BlockBuilder = (block: Base) => JSX.Element

export interface BlockFactory {
  build: (block: Base, parent?: Base) => JSX.Element
  buildAll: (blocks: Base[], parent?: Base) => JSX.Element[]
  registerBuilder: (target_class: string, builder: BlockBuilder) => void
  getParent: (block: Base) => Base | undefined
  setParent: (block: Base, parent: Base) => void
}

export class DefaultBlockFactory implements BlockFactory {
  block_types: any[] = []
  builders: BlockBuilder[] = []
  parentByBlock: Map<Base, Base> = new Map<Base, Base>()

  constructor () {
    this.registerBuilder(ListItem, this.buildListItem as BlockBuilder)
    this.registerBuilder(Collapsible, this.buildCollapsible as BlockBuilder)
    this.registerBuilder(Content, this.buildContent as BlockBuilder)
    this.registerBuilder(Section, this.buildSection as BlockBuilder)
    this.registerBuilder(Code, this.buildCode as BlockBuilder)
    this.registerBuilder(List, this.buildList as BlockBuilder)
    this.registerBuilder(Span, this.buildSpan as BlockBuilder)
    this.registerBuilder(Selectable, this.buildSelectable as BlockBuilder)
    this.registerBuilder(Tree, this.buildTree as BlockBuilder)
    this.registerBuilder(Table, this.buildTable as BlockBuilder)
  }

  registerBuilder (targetClass: any, builder: BlockBuilder): void {
    this.block_types.push(targetClass)
    this.builders.push(builder.bind(this))
  }

  getParent (block: Base): Base | undefined {
    return this.parentByBlock.get(block)
  }

  setParent (block: Base, parent: Base): void {
    this.parentByBlock.set(block, parent)
  }

  getTreeLevel (tree: Tree): number {
    let level = 1
    let parent = this.getParent(tree)
    while (parent !== undefined && parent instanceof Tree) {
      level++
      parent = this.getParent(parent)
    }
    return level
  }

  build (block: Base, parent?: Base): JSX.Element {
    for (let j = 0; j < this.builders.length; j++) {
      const targetClass = this.block_types[j]
      const handler = this.builders[j]
      if (block.constructor.name === targetClass.name) {
        if (parent !== undefined) {
          this.setParent(block, parent)
        }
        const component = handler(block)
        return component
      }
    }
    throw new Error('Builder not found for: ' + block.constructor.name)
  }

  buildAll (blocks: Base[], parent?: Base): JSX.Element[] {
    const elements: JSX.Element[] = []
    blocks.forEach((block) => {
      elements.push(this.build(block, parent))
    })
    return elements
  }

  getClassNames (block: Base, selectedIndex: number): string[] {
    const classNames = new Set(Array.from(block.classNames))
    return Array.from(classNames)
  };

  buildCollapsible (block: Collapsible): JSX.Element {
    const CollapsibleBlockWithVariant = withCascadingVariants(CollapsibleBlock, { block })
    const CollapsibleBlockWithCollapsible = withCollapsible(CollapsibleBlockWithVariant, { block })
    const CollapsibleBlockWithRef = withSelectable(CollapsibleBlockWithCollapsible, { block })
    return <CollapsibleBlockWithRef
            content={block}
            key={block.uuid}/>
  }

  buildListItem (block: ListItem): JSX.Element {
    const ListItemWithVariant = withCascadingVariants(ListLayoutItem, { block })
    const ListItemWithCollapsible = withCollapsible(ListItemWithVariant, { block })
    const BlockListItemWithRef = withSelectable(ListItemWithCollapsible, { block })
    return <BlockListItemWithRef
            content={block}
            key={block.uuid}/>
  }

  buildContent (block: Content): JSX.Element {
    const ContentBlockWithVariant = withCascadingVariants(ContentBlock, { block })
    const ContentBlockWithRef = withSelectable(ContentBlockWithVariant, { block })
    return <ContentBlockWithRef
            content={block}
            key={block.uuid} />
  }

  buildSection (block: Section): JSX.Element {
    const ContentSectionWithVariant = withCascadingVariants(ContentSection, { block })
    const ContentSectionWithRef = withSelectable(ContentSectionWithVariant, { block })
    return <ContentSectionWithRef
            section={block}
            key={block.uuid} />
  }

  buildCode (block: Code): JSX.Element {
    const CodeSectionWithVariant = withCascadingVariants(CodeBlock, { block })
    const CodeSectionWithRef = withSelectable(CodeSectionWithVariant, { block })
    return <CodeSectionWithRef
            code={block}
            editable={false}
            key={block.uuid} />
  }

  buildList (block: List): JSX.Element {
    const BlockListWithVariant = withCascadingVariants(ListLayout, { block })
    return <BlockListWithVariant
            list={block}
            selected={false}
            key={block.uuid} />
  }

  buildSpan (block: Span): JSX.Element {
    const ContentSpanWithRef = withSelectable(ContentSpan, { block })
    const ContentSpanWithVariant = withCascadingVariants(ContentSpanWithRef, { block })
    return <ContentSpanWithVariant
            span={block}
            key={block.uuid} />
  }

  buildSelectable (block: Selectable): JSX.Element {
    const SentinalWithVariant = withCascadingVariants(SentinalView, { block })
    const SentinalWithRef = withSelectable(SentinalWithVariant, { block })
    return <SentinalWithRef
            sentinal={block}
            key={block.uuid} />
  }

  buildTree (tree: Tree): JSX.Element {
    const PageableTreeLayout = withPageable(TreeLayout, { tree })
    const TreeLayoutWithVariant = withCascadingVariants(PageableTreeLayout, { block: tree })
    const level = this.getTreeLevel(tree)
    // Every top-level component has a nested pagination provider
    if (level === 1) {
      return <NestedPaginationProvider
                pages={[1]}
                numPages={[1]}
                key={tree.uuid}>
        <TreeLayoutWithVariant
            level={level}
            tree={tree}
            key={tree.uuid} />
      </NestedPaginationProvider>
    } else {
      return <TreeLayoutWithVariant
              level={level}
              tree={tree}
              key={tree.uuid} />
    }
  }

  buildTable (block: Table): JSX.Element {
    const TableWithVariant = withCascadingVariants(TableSection, { block })
    return <TableWithVariant
            table={block}
            key={block.uuid} />
  }
};
