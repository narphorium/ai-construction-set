import React from 'react'
import { Code, Content, List, ListItem, NamedContent, Section, Selectable, Span, Stream, Table, type Base } from '../data'
import { BlockList } from './BlockList'
import { BlockStream } from './BlockStream'
import { CodeSection } from './CodeSection'
import { ContentBlock } from './ContentBlock'
import { ContentSection } from './ContentSection'
import { ContentSpan } from './ContentSpan'
import { BlockListItem, NamedBlock } from './NamedBlock'
import { SentinalView } from './SentinalView'
import { TableSection } from './TableSection'
import { withCascadingVariants } from './withCascadingVariants'
import { withCollapsible } from './withCollapsible'
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
    this.registerBuilder(NamedContent, this.buildNamedContent as BlockBuilder)
    this.registerBuilder(Content, this.buildContent as BlockBuilder)
    this.registerBuilder(Section, this.buildSection as BlockBuilder)
    this.registerBuilder(Code, this.buildCodeSection as BlockBuilder)
    this.registerBuilder(List, this.buildList as BlockBuilder)
    this.registerBuilder(Span, this.buildSpan as BlockBuilder)
    this.registerBuilder(Selectable, this.buildSelectable as BlockBuilder)
    this.registerBuilder(Stream, this.buildStream as BlockBuilder)
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

  buildNamedContent (block: NamedContent): JSX.Element {
    const NamedBlockWithVariant = withCascadingVariants(NamedBlock, { block })
    const NamedBlockWithCollapsible = withCollapsible(NamedBlockWithVariant, { collapsed: block.collapsed })
    const NamedBlockWithRef = withSelectable(NamedBlockWithCollapsible, { selected: block.selected })
    return <NamedBlockWithRef
            content={block}
            key={block.uuid}/>
  }

  buildListItem (block: ListItem): JSX.Element {
    const ListItemWithVariant = withCascadingVariants(BlockListItem, { block })
    const ListItemWithCollapsible = withCollapsible(ListItemWithVariant, { collapsed: block.collapsed })
    const BlockListItemWithRef = withSelectable(ListItemWithCollapsible, { selected: block.selected })
    return <BlockListItemWithRef
            content={block}
            key={block.uuid}/>
  }

  buildContent (block: Content): JSX.Element {
    const ContentBlockWithVariant = withCascadingVariants(ContentBlock, { block })
    const ContentBlockWithRef = withSelectable(ContentBlockWithVariant, { selected: block.selected })
    return <ContentBlockWithRef
            content={block}
            key={block.uuid} />
  }

  buildSection (block: Section): JSX.Element {
    const ContentSectionWithVariant = withCascadingVariants(ContentSection, { block })
    const ContentSectionWithRef = withSelectable(ContentSectionWithVariant, { selected: block.selected })
    return <ContentSectionWithRef
            section={block}
            key={block.uuid} />
  }

  buildCodeSection (block: Code): JSX.Element {
    const CodeSectionWithVariant = withCascadingVariants(CodeSection, { block })
    const CodeSectionWithRef = withSelectable(CodeSectionWithVariant, { selected: block.selected })
    return <CodeSectionWithRef
            code={block}
            editable={false}
            key={block.uuid} />
  }

  buildList (block: List): JSX.Element {
    const BlockListWithVariant = withCascadingVariants(BlockList, { block })
    const BlockListWithRef = withSelectable(BlockListWithVariant, { selected: false })
    return <BlockListWithRef
            list={block}
            selected={false}
            key={block.uuid} />
  }

  buildSpan (block: Span): JSX.Element {
    const ContentSpanWithVariant = withCascadingVariants(ContentSpan, { block })
    const ContentSpanWithRef = withSelectable(ContentSpanWithVariant, { selected: block.selected })
    return <ContentSpanWithRef
            span={block}
            key={block.uuid} />
  }

  buildSelectable (block: Selectable): JSX.Element {
    const SentinalWithVariant = withCascadingVariants(SentinalView, { block })
    const SentinalWithRef = withSelectable(SentinalWithVariant, { selected: block.selected })
    return <SentinalWithRef
            sentinal={block}
            key={block.uuid} />
  }

  buildStream (stream: Stream): JSX.Element {
    const BlockStreamWithVariant = withCascadingVariants(BlockStream, { block: stream })
    const BlockStreamWithRef = withSelectable(BlockStreamWithVariant, { selected: false })
    return <BlockStreamWithRef
            stream={stream}
            key={stream.uuid} />
  }

  buildTable (table: Table): JSX.Element {
    const TableWithVariant = withCascadingVariants(TableSection, { block: table })
    const TableWithRef = withSelectable(TableWithVariant, { selected: false })
    return <TableWithRef
            table={table}
            key={table.uuid} />
  }
};
