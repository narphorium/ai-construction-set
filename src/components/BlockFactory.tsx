import React, { type ForwardRefExoticComponent } from 'react'
import { Code, Collapsible, Content, List, ListItem, Paragraph, Selectable, Span, Table, Tree, type Base } from '../data'
import { NestedPaginationProvider } from '../hooks'
import { type BaseProps, type CollapsibleProps, type PaginatedProps, type SelectableProps } from './Base'
import { CodeBlock } from './CodeBlock'
import { CollapsibleBlock, ListLayoutItem } from './CollapsibleBlock'
import { ContentBlock } from './ContentBlock'
import { ContentSpan } from './ContentSpan'
import { ListLayout } from './ListLayout'
import { ParagraphBlock } from './ParagraphBlock'
import { SentinalView } from './SentinalView'
import { TableBlock } from './TableBlock'
import { TreeLayout } from './TreeLayout'
import { withCascadingVariants } from './withCascadingVariants'
import { withCollapsible } from './withCollapsible'
import { withPageable } from './withPageable'
import { withRef } from './withRef'
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
    this.registerBuilder(Paragraph, this.buildSection as BlockBuilder)
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

  withCascadingVariants <TProps extends BaseProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Base }
  ): any {
    return withCascadingVariants(Component, params)
  }

  withSelectable <TProps extends SelectableProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Selectable }
  ): any {
    return withSelectable(Component, params)
  }

  withCollapsible <TProps extends CollapsibleProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Collapsible }
  ): any {
    return withCollapsible(Component, params)
  }

  withPageable <TProps extends PaginatedProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: {
      tree: Tree
    }
  ): any {
    return withPageable(Component, params)
  }

  buildCollapsible (block: Collapsible): JSX.Element {
    const CollapsibleBlockWithRef = withRef(CollapsibleBlock)
    const CollapsibleBlockWithVariant = this.withCascadingVariants(CollapsibleBlockWithRef, { block })
    const CollapsibleBlockWithCollapsible = this.withCollapsible(CollapsibleBlockWithVariant, { block })
    const CollapsibleBlockWithSelectable = this.withSelectable(CollapsibleBlockWithCollapsible, { block })
    return <CollapsibleBlockWithSelectable
            content={block}
            key={block.uuid}/>
  }

  buildListItem (block: ListItem): JSX.Element {
    const ListItemWithRef = withRef(ListLayoutItem)
    const ListItemWithVariant = this.withCascadingVariants(ListItemWithRef, { block })
    const ListItemWithCollapsible = this.withCollapsible(ListItemWithVariant, { block })
    const ListItemWithSelectable = this.withSelectable(ListItemWithCollapsible, { block })
    return <ListItemWithSelectable
            content={block}
            key={block.uuid}/>
  }

  buildContent (block: Content): JSX.Element {
    const ContentBlockWithRef = withRef(ContentBlock)
    const ContentBlockWithVariant = this.withCascadingVariants(ContentBlockWithRef, { block })
    const ContentBlockWithSelectable = this.withSelectable(ContentBlockWithVariant, { block })
    return <ContentBlockWithSelectable
            content={block}
            key={block.uuid} />
  }

  buildSection (block: Paragraph): JSX.Element {
    const ContentSectionWithRef = withRef(ParagraphBlock)
    const ContentSectionWithVariant = this.withCascadingVariants(ContentSectionWithRef, { block })
    const ContentSectionWithSelectable = this.withSelectable(ContentSectionWithVariant, { block })
    return <ContentSectionWithSelectable
            paragraph={block}
            key={block.uuid} />
  }

  buildCode (block: Code): JSX.Element {
    const CodeSectionWithRef = withRef(CodeBlock)
    const CodeSectionWithVariant = this.withCascadingVariants(CodeSectionWithRef, { block })
    const CodeSectionWithSelectable = this.withSelectable(CodeSectionWithVariant, { block })
    return <CodeSectionWithSelectable
            code={block}
            editable={false}
            key={block.uuid} />
  }

  buildList (block: List): JSX.Element {
    const ListLayoutWithRef = withRef(ListLayout)
    const ListLayoutWithVariant = this.withCascadingVariants(ListLayoutWithRef, { block })
    return <ListLayoutWithVariant
            list={block}
            selected={false}
            key={block.uuid} />
  }

  buildSpan (block: Span): JSX.Element {
    const ContentSpanWithRef = withRef(ContentSpan)
    const ContentSpanWithVariant = this.withCascadingVariants(ContentSpanWithRef, { block })
    const ContentSpanWithSelectable = this.withSelectable(ContentSpanWithVariant, { block })
    return <ContentSpanWithSelectable
            span={block}
            key={block.uuid} />
  }

  buildSelectable (block: Selectable): JSX.Element {
    const SentinalWithRef = withRef(SentinalView)
    const SentinalWithVariant = this.withCascadingVariants(SentinalWithRef, { block })
    const SentinalWithSelectable = this.withSelectable(SentinalWithVariant, { block })
    return <SentinalWithSelectable
            sentinal={block}
            key={block.uuid} />
  }

  buildTree (tree: Tree): JSX.Element {
    const TreeWithRef = withRef(TreeLayout)
    const PageableTreeLayout = this.withPageable(TreeWithRef, { tree })
    const TreeLayoutWithVariant = this.withCascadingVariants(PageableTreeLayout, { block: tree })
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
    const TableWithRef = withRef(TableBlock)
    const TableWithVariant = this.withCascadingVariants(TableWithRef, { block })
    return <TableWithVariant
            table={block}
            key={block.uuid} />
  }
};
