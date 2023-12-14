import React, { type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
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
    Component: ComponentType<TProps>,
    params: { block: Base }
  ): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<HTMLDivElement>> {
    return withCascadingVariants(Component, params)
  }

  withSelectable <TProps extends SelectableProps>(
    Component: ComponentType<TProps>,
    params: { block: Selectable }
  ): ((props: TProps) => JSX.Element) {
    return withSelectable(Component, params)
  }

  withCollapsible <TProps extends CollapsibleProps>(
    Component: ComponentType<TProps>,
    params: { block: Collapsible }
  ): ((props: TProps) => JSX.Element) {
    return withCollapsible(Component, params)
  }

  withPageable <TProps extends PaginatedProps>(
    Component: ComponentType<TProps>,
    params: {
      tree: Tree
    }
  ) {
    return function WithPageable (props: TProps): JSX.Element {
      Component = withPageable(Component, params)
      return <Component {...props} />
    }
  }

  buildCollapsible (block: Collapsible): JSX.Element {
    const CollapsibleBlockWithVariant = this.withCascadingVariants(CollapsibleBlock, { block })
    const CollapsibleBlockWithCollapsible = this.withCollapsible(CollapsibleBlockWithVariant, { block })
    const CollapsibleBlockWithRef = this.withSelectable(CollapsibleBlockWithCollapsible, { block })
    return <CollapsibleBlockWithRef
            content={block}
            key={block.uuid}/>
  }

  buildListItem (block: ListItem): JSX.Element {
    const ListItemWithVariant = this.withCascadingVariants(ListLayoutItem, { block })
    const ListItemWithCollapsible = this.withCollapsible(ListItemWithVariant, { block })
    const BlockListItemWithRef = this.withSelectable(ListItemWithCollapsible, { block })
    return <BlockListItemWithRef
            content={block}
            key={block.uuid}/>
  }

  buildContent (block: Content): JSX.Element {
    const ContentBlockWithVariant = this.withCascadingVariants(ContentBlock, { block })
    const ContentBlockWithRef = this.withSelectable(ContentBlockWithVariant, { block })
    return <ContentBlockWithRef
            content={block}
            key={block.uuid} />
  }

  buildSection (block: Paragraph): JSX.Element {
    const ContentSectionWithVariant = this.withCascadingVariants(ParagraphBlock, { block })
    const ContentSectionWithRef = this.withSelectable(ContentSectionWithVariant, { block })
    return <ContentSectionWithRef
            paragraph={block}
            key={block.uuid} />
  }

  buildCode (block: Code): JSX.Element {
    const CodeSectionWithVariant = this.withCascadingVariants(CodeBlock, { block })
    const CodeSectionWithRef = this.withSelectable(CodeSectionWithVariant, { block })
    return <CodeSectionWithRef
            code={block}
            editable={false}
            key={block.uuid} />
  }

  buildList (block: List): JSX.Element {
    const BlockListWithVariant = this.withCascadingVariants(ListLayout, { block })
    return <BlockListWithVariant
            list={block}
            selected={false}
            key={block.uuid} />
  }

  buildSpan (block: Span): JSX.Element {
    const ContentSpanWithRef = this.withSelectable(ContentSpan, { block })
    const ContentSpanWithVariant = this.withCascadingVariants(ContentSpanWithRef, { block })
    return <ContentSpanWithVariant
            span={block}
            key={block.uuid} />
  }

  buildSelectable (block: Selectable): JSX.Element {
    const SentinalWithVariant = this.withCascadingVariants(SentinalView, { block })
    const SentinalWithRef = this.withSelectable(SentinalWithVariant, { block })
    return <SentinalWithRef
            sentinal={block}
            key={block.uuid} />
  }

  buildTree (tree: Tree): JSX.Element {
    const PageableTreeLayout = this.withPageable(TreeLayout, { tree })
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
    const TableWithVariant = this.withCascadingVariants(TableBlock, { block })
    return <TableWithVariant
            table={block}
            key={block.uuid} />
  }
};
