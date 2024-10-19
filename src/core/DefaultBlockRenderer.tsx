import React, { type ForwardRefExoticComponent } from 'react'
import { type BlockComponentProps } from '../components/blocks/Base'
import { CodeBlock } from '../components/blocks/CodeBlock'
import { CollapsibleBlock } from '../components/blocks/CollapsibleBlock'
import { ContentSpan } from '../components/blocks/ContentSpan'
import { ParagraphBlock } from '../components/blocks/ParagraphBlock'
import { TableLayout } from '../components/layouts/TableLayout'
import { NestedLayout } from '../components/layouts/NestedLayout'
import { CollapsibleComponentProps, withCollapsible } from '../components/behaviors/withCollapsible'
import { PaginatedComponentProps, withPageable } from '../components/behaviors/withPageable'
import { SelectableComponentProps, withSelectable } from '../components/behaviors/withSelectable'
import { withTheme } from '../components/behaviors/withTheme'
import { withRef } from '../components/behaviors/withRef'
import { Block, Code, Paragraph, Section, Span } from '../types/blocks'
import { List, Table, Tree } from '../types/layouts'
import { AccordionLayout } from '../components/layouts/AccordionLayout'
import { BlockRenderer, BlockRenderHandler } from './BlockRenderer'

export class DefaultBlockRenderer implements BlockRenderer {
  handlers: Map<string, BlockRenderHandler> = new Map<string, BlockRenderHandler>()
  parentByBlock: Map<Block, Block> = new Map<Block, Block>()

  constructor() {
    this.registerHandler('aics:code', this.renderCode.bind(this) as BlockRenderHandler)
    this.registerHandler('aics:paragraph', this.renderParagraph.bind(this) as BlockRenderHandler)
    this.registerHandler('aics:section', this.renderSection.bind(this) as BlockRenderHandler)
    this.registerHandler('aics:span', this.renderSpan.bind(this) as BlockRenderHandler)

    this.registerHandler('aics:list', this.renderList.bind(this) as BlockRenderHandler)
    this.registerHandler('aics:tree', this.renderTree.bind(this) as BlockRenderHandler)
    this.registerHandler('aics:table', this.renderTable.bind(this) as BlockRenderHandler)
  }

  registerHandler(blockType: string, builder: BlockRenderHandler): void {
    this.handlers.set(blockType, builder)
  }

  getParent(block: Block): Block | undefined {
    return this.parentByBlock.get(block)
  }

  setParent(block: Block, parent: Block): void {
    this.parentByBlock.set(block, parent)
  }

  render(block: Block, parent?: Block): JSX.Element {
    const handler = this.handlers.get(block.type)
    if (handler !== undefined) {
      if (parent !== undefined) {
        this.setParent(block, parent)
      }
      const component = handler(block, parent)
      // TODO: The HOCs should be added automatically based on behaviors in the BlockRegistry
      return component
    } else {
      throw new Error('Render handler not found for: ' + block.type)
    }
  }

  getClassNames(block: Block, selectedIndex: number): string[] {
    const classNames = new Set(Array.from(block.classNames))
    return Array.from(classNames)
  };

  withTheme<T extends Block, TProps extends BlockComponentProps<T>>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Block }
  ): any {
    if (params.block.theme !== undefined) {
      return withTheme(Component, { theme: params.block.theme })
    }
    return Component
  }

  withSelectable<TProps extends SelectableComponentProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withSelectable(Component)
  }

  withCollapsible<TProps extends CollapsibleComponentProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withCollapsible(Component)
  }

  withPageable<TProps extends PaginatedComponentProps>(
    Component: ForwardRefExoticComponent<TProps>
  ): any {
    return withPageable(Component)
  }

  renderSection(block: Section, parent?: Block): JSX.Element {
    const SectionWithTheme = this.withTheme(CollapsibleBlock, { block })
    const SectionWithSelectable = this.withSelectable(SectionWithTheme)
    const SectionWithCollapsible = this.withCollapsible(SectionWithSelectable)
    const SectionWithRef = withRef(SectionWithCollapsible)
    return <SectionWithRef block={block} />
  }

  renderParagraph(block: Paragraph, parent?: Block): JSX.Element {
    const ContentSectionWithTheme = this.withTheme(ParagraphBlock, { block })
    const ContentSectionWithSelectable = this.withSelectable(ContentSectionWithTheme)
    const ContentSectionWithRef = withRef(ContentSectionWithSelectable)
    return <ContentSectionWithRef block={block} />
  }

  renderCode(block: Code, parent?: Block): JSX.Element {
    const CodeSectionWithTheme = this.withTheme(CodeBlock, { block })
    const CodeSectionWithSelectable = this.withSelectable(CodeSectionWithTheme)
    const CodeSectionWithRef = withRef(CodeSectionWithSelectable)
    return <CodeSectionWithRef
      block={block}
      editable={false} />
  }

  renderSpan(block: Span, parent?: Block): JSX.Element {
    const ContentSpanWithTheme = this.withTheme(ContentSpan, { block })
    const ContentSpanWithSelectable = this.withSelectable(ContentSpanWithTheme)
    const ContentSpanWithRef = withRef(ContentSpanWithSelectable)
    return <ContentSpanWithRef block={block} />
  }

  renderList(block: List, parent?: Block): JSX.Element {
    const AccordionLayoutWithTheme = this.withTheme(AccordionLayout, { block })
    const AccordionLayoutWithRef = withRef(AccordionLayoutWithTheme)
    return <AccordionLayoutWithRef block={block} />
  }

  renderTree(block: Tree, parent?: Block): JSX.Element {
    const PageableNestedLayout = this.withPageable(NestedLayout)
    const NestedLayoutWithTheme = this.withTheme(PageableNestedLayout, { block })
    const NestedLayoutWithRef = withRef(NestedLayoutWithTheme)
    return <NestedLayoutWithRef block={block} />
  }

  renderTable(block: Table, parent?: Block): JSX.Element {
    const TableLayoutWithTheme = this.withTheme(TableLayout, { block })
    const TableLayoutWithRef = withRef(TableLayoutWithTheme)
    return <TableLayoutWithRef block={block} />
  }

};
