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

export type BlockBuilder = (block: Base, parent?: Base) => JSX.Element

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
        const component = handler(block, parent)
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

  buildCollapsible (block: Collapsible, parent?: Base): JSX.Element {
    const CollapsibleBlockWithTheme = this.withTheme(CollapsibleBlock, { block })
    const CollapsibleBlockWithCollapsible = this.withCollapsible(CollapsibleBlockWithTheme)
    const CollapsibleBlockWithSelectable = this.withSelectable(CollapsibleBlockWithCollapsible)
    const CollapsibleBlockWithRef = withRef(CollapsibleBlockWithSelectable)
    return <CollapsibleBlockWithRef block={block} />
  }

  buildListItem (block: ListItem, parent?: Base): JSX.Element {
    const ListItemWithTheme = this.withTheme(ListLayoutItem, { block })
    const ListItemWithCollapsible = this.withCollapsible(ListItemWithTheme)
    const ListItemWithSelectable = this.withSelectable(ListItemWithCollapsible)
    const ListItemWithRef = withRef(ListItemWithSelectable)
    return <ListItemWithRef list={parent} block={block} />
  }

  buildContent (block: Content, parent?: Base): JSX.Element {
    const ContentBlockWithTheme = this.withTheme(ContentBlock, { block })
    const ContentBlockWithSelectable = this.withSelectable(ContentBlockWithTheme)
    const ContentBlockWithRef = withRef(ContentBlockWithSelectable)
    return <ContentBlockWithRef block={block} />
  }

  buildSection (block: Paragraph, parent?: Base): JSX.Element {
    const ContentSectionWithTheme = this.withTheme(ParagraphBlock, { block })
    const ContentSectionWithSelectable = this.withSelectable(ContentSectionWithTheme)
    const ContentSectionWithRef = withRef(ContentSectionWithSelectable)
    return <ContentSectionWithRef block={block} />
  }

  buildCode (block: Code, parent?: Base): JSX.Element {
    const CodeSectionWithTheme = this.withTheme(CodeBlock, { block })
    const CodeSectionWithSelectable = this.withSelectable(CodeSectionWithTheme)
    const CodeSectionWithRef = withRef(CodeSectionWithSelectable)
    return <CodeSectionWithRef
            block={block}
            editable={false} />
  }

  buildList (block: List, parent?: Base): JSX.Element {
    const ListLayoutWithTheme = this.withTheme(ListLayout, { block })
    const ListLayoutWithRef = withRef(ListLayoutWithTheme)
    return <ListLayoutWithRef block={block} />
  }

  buildSpan (block: Span, parent?: Base): JSX.Element {
    const ContentSpanWithTheme = this.withTheme(ContentSpan, { block })
    const ContentSpanWithSelectable = this.withSelectable(ContentSpanWithTheme)
    const ContentSpanWithRef = withRef(ContentSpanWithSelectable)
    return <ContentSpanWithRef block={block} />
  }

  buildSelectable (block: Selectable, parent?: Base): JSX.Element {
    const SentinalWithTheme = this.withTheme(SentinalView, { block })
    const SentinalWithSelectable = this.withSelectable(SentinalWithTheme)
    const SentinalWithRef = withRef(SentinalWithSelectable)
    return <SentinalWithRef block={block} />
  }

  buildTree (block: Tree, parent?: Base): JSX.Element {
    const PageableTreeLayout = this.withPageable(TreeLayout)
    const TreeLayoutWithTheme = this.withTheme(PageableTreeLayout, { block })
    const TreeWithRef = withRef(TreeLayoutWithTheme)
    const level = this.getTreeLevel(block)
    // Every top-level component has a nested pagination provider
    if (level === 1) {
      return <NestedPaginationProvider
                pages={[1]}
                numPages={[1]} >
        <TreeWithRef
            level={level}
            block={block} />
      </NestedPaginationProvider>
    } else {
      return <TreeWithRef
              level={level}
              block={block} />
    }
  }

  buildTable (block: Table, parent?: Base): JSX.Element {
    const TableWithTheme = this.withTheme(TableBlock, { block })
    const TableWithRef = withRef(TableWithTheme)
    return <TableWithRef block={block} />
  }
};
