import React, { type ForwardRefExoticComponent } from 'react'
import { Code, Collapsible, Content, List, ListItem, Paragraph, Selectable, Span, Table, Tree, type Base } from '../data'
import { NestedPaginationProvider } from '../hooks'
import { darkTheme as darkBlueTheme } from '../themes/blue/darkTheme'
import { lightTheme as lightBlueTheme } from '../themes/blue/lightTheme'
import { darkTheme } from '../themes/default/darkTheme'
import { lightTheme } from '../themes/default/lightTheme'
import { type BlockProps, type CollapsibleProps, type PaginatedProps, type SelectableProps } from './Base'
import { CodeBlock } from './CodeBlock'
import { CollapsibleBlock } from './CollapsibleBlock'
import { ContentBlock } from './ContentBlock'
import { ContentSpan } from './ContentSpan'
import { ListLayout, ListLayoutItem } from './ListLayout'
import { ParagraphBlock } from './ParagraphBlock'
import { SentinalView } from './SentinalView'
import { TableBlock } from './TableBlock'
import { TreeLayout } from './TreeLayout'
import { withCollapsible } from './withCollapsible'
import { withPageable } from './withPageable'
import { withSelectable } from './withSelectable'
import { withTheme } from './withTheme'
import { withRef } from './withRef'

export type BlockBuilder = (block: Base) => JSX.Element

export interface BlockFactory {
  build: (block: Base, parent?: Base) => JSX.Element
  buildAll: (blocks: Base[], parent?: Base) => JSX.Element[]
  registerBuilder: (target_class: string, builder: BlockBuilder) => void
  registerTheme: (name: string, lightTheme: any, darkTheme: any) => void
  getTheme: (name: string) => [any, any]
  getParent: (block: Base) => Base | undefined
  setParent: (block: Base, parent: Base) => void
}

export class DefaultBlockFactory implements BlockFactory {
  block_types: any[] = []
  builders: BlockBuilder[] = []
  parentByBlock: Map<Base, Base> = new Map<Base, Base>()
  themes: Map<string, [any, any]> = new Map<string, [any, any]>()

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

    this.registerTheme('default', lightTheme, darkTheme)
    this.registerTheme('blue', lightBlueTheme, darkBlueTheme)
  }

  registerBuilder (targetClass: any, builder: BlockBuilder): void {
    this.block_types.push(targetClass)
    this.builders.push(builder.bind(this))
  }

  registerTheme (name: string, lightTheme: any, darkTheme: any): void {
    this.themes.set(name, [lightTheme, darkTheme])
  }

  getTheme (name: string): [any, any] {
    if (name === '') {
      name = 'default'
    }
    if (!this.themes.has(name)) {
      throw new Error('Theme not found: ' + name)
    }
    return this.themes.get(name) as [any, any]
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

  withTheme <TProps extends BlockProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Base }
  ): any {
    if (params.block.theme !== undefined) {
      const theme = this.themes.get(params.block.theme)
      if (theme === undefined) {
        throw new Error(`Theme not found: ${params.block.theme}`)
      }
      return withTheme(Component, { lightTheme: theme[0], darkTheme: theme[1] })
    }
    return Component
  }

  withSelectable <TProps extends SelectableProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withSelectable(Component)
  }

  withCollapsible <TProps extends CollapsibleProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withCollapsible(Component)
  }

  withPageable <TProps extends PaginatedProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withPageable(Component)
  }

  buildCollapsible (block: Collapsible): JSX.Element {
    const CollapsibleBlockWithRef = withRef(CollapsibleBlock)
    const CollapsibleBlockWithTheme = this.withTheme(CollapsibleBlockWithRef, { block })
    const CollapsibleBlockWithCollapsible = this.withCollapsible(CollapsibleBlockWithTheme)
    const CollapsibleBlockWithSelectable = this.withSelectable(CollapsibleBlockWithCollapsible)
    return <CollapsibleBlockWithSelectable
            block={block}
            variant={block.variant} />
  }

  buildListItem (block: ListItem): JSX.Element {
    const ListItemWithRef = withRef(ListLayoutItem)
    const ListItemWithTheme = this.withTheme(ListItemWithRef, { block })
    const ListItemWithCollapsible = this.withCollapsible(ListItemWithTheme)
    const ListItemWithSelectable = this.withSelectable(ListItemWithCollapsible)
    return <ListItemWithSelectable
            block={block}
            variant={block.variant}/>
  }

  buildContent (block: Content): JSX.Element {
    const ContentBlockWithRef = withRef(ContentBlock)
    const ContentBlockWithTheme = this.withTheme(ContentBlockWithRef, { block })
    const ContentBlockWithSelectable = this.withSelectable(ContentBlockWithTheme)
    return <ContentBlockWithSelectable
            block={block}
            variant={block.variant} />
  }

  buildSection (block: Paragraph): JSX.Element {
    const ContentSectionWithRef = withRef(ParagraphBlock)
    const ContentSectionWithTheme = this.withTheme(ContentSectionWithRef, { block })
    const ContentSectionWithSelectable = this.withSelectable(ContentSectionWithTheme)
    return <ContentSectionWithSelectable
            block={block}
            variant={block.variant} />
  }

  buildCode (block: Code): JSX.Element {
    const CodeSectionWithRef = withRef(CodeBlock)
    const CodeSectionWithTheme = this.withTheme(CodeSectionWithRef, { block })
    const CodeSectionWithSelectable = this.withSelectable(CodeSectionWithTheme)
    return <CodeSectionWithSelectable
            block={block}
            editable={false}
            variant={block.variant} />
  }

  buildList (block: List): JSX.Element {
    const ListLayoutWithRef = withRef(ListLayout)
    const ListLayoutWithTheme = this.withTheme(ListLayoutWithRef, { block })
    return <ListLayoutWithTheme
            block={block}
            variant={block.variant} />
  }

  buildSpan (block: Span): JSX.Element {
    const ContentSpanWithRef = withRef(ContentSpan)
    const ContentSpanWithTheme = this.withTheme(ContentSpanWithRef, { block })
    const ContentSpanWithSelectable = this.withSelectable(ContentSpanWithTheme)
    return <ContentSpanWithSelectable
            block={block}
            variant={block.variant} />
  }

  buildSelectable (block: Selectable): JSX.Element {
    const SentinalWithRef = withRef(SentinalView)
    const SentinalWithTheme = this.withTheme(SentinalWithRef, { block })
    const SentinalWithSelectable = this.withSelectable(SentinalWithTheme)
    return <SentinalWithSelectable
            block={block}
            variant={block.variant} />
  }

  buildTree (block: Tree): JSX.Element {
    const TreeWithRef = withRef(TreeLayout)
    const PageableTreeLayout = this.withPageable(TreeWithRef)
    const TreeLayoutWithTheme = this.withTheme(PageableTreeLayout, { block })
    const level = this.getTreeLevel(block)
    // Every top-level component has a nested pagination provider
    if (level === 1) {
      return <NestedPaginationProvider
                pages={[1]}
                numPages={[1]} >
        <TreeLayoutWithTheme
            level={level}
            block={block}
            variant={block.variant} />
      </NestedPaginationProvider>
    } else {
      return <TreeLayoutWithTheme
              level={level}
              block={block} />
    }
  }

  buildTable (block: Table): JSX.Element {
    const TableWithRef = withRef(TableBlock)
    const TableWithTheme = this.withTheme(TableWithRef, { block })
    return <TableWithTheme
            block={block}
            variant={block.variant} />
  }
};
