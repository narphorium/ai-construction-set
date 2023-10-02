import React from 'react'
import { Content, List, ListItem, NamedContent, Section, Selectable, Span, Stream, type Base } from '../data'
import { BlockList } from './BlockList'
import { BlockStream } from './BlockStream'
import { ContentBlock } from './ContentBlock'
import { ContentSection } from './ContentSection'
import { ContentSpan } from './ContentSpan'
import { BlockListItem, NamedBlock } from './NamedBlock'
import { SentinalView } from './SentinalView'
import { withCollapsible } from './withCollapsible'
import { withSelectable } from './withSelectable'

export interface BlockFactory {
  build: (block: Base, parent?: Base) => JSX.Element
  registerBuilder: (target_class: string, builder: ((block: Base, parent?: Base | undefined) => JSX.Element)) => void
}

export class DefaultBlockFactory implements BlockFactory {
  block_types: any[] = []
  builders: Array<(block: any, parent?: any) => JSX.Element> = []

  constructor () {
    this.registerBuilder(ListItem, this.buildListItem)
    this.registerBuilder(NamedContent, this.buildNamedContent)
    this.registerBuilder(Content, this.buildContent)
    this.registerBuilder(Section, this.buildSection)
    this.registerBuilder(List, this.buildList)
    this.registerBuilder(Span, this.buildSpan)
    this.registerBuilder(Selectable, this.buildSelectable)
    this.registerBuilder(Stream, this.buildStream)
  }

  registerBuilder (targetClass: any, builder: ((block: any, parent?: any | undefined) => JSX.Element)): void {
    this.block_types.push(targetClass)
    this.builders.push(builder.bind(this))
  }

  build (block: Base, parent?: Base): JSX.Element {
    for (let j = 0; j < this.builders.length; j++) {
      const targetClass = this.block_types[j]
      const handler = this.builders[j]
      if (block.constructor.name === targetClass.name) {
        return handler(block, parent)
      }
    }
    throw new Error('Builder not found for: ' + block.constructor.name)
  }

  getClassNames (block: Base, selectedIndex: number): string[] {
    const classNames = new Set(Array.from(block.classNames))
    return Array.from(classNames)
  };

  buildNamedContent (block: NamedContent, parent?: Base): JSX.Element {
    const NamedBlockWithCollapsible = withCollapsible(NamedBlock, { collapsed: block.collapsed })
    const NamedBlockWithRef = withSelectable(NamedBlockWithCollapsible, { selected: block.selected })
    return <NamedBlockWithRef
            content={block}
            key={block.uuid}/>
  }

  buildListItem (block: ListItem, parent?: Base): JSX.Element {
    const ListItemWithCollapsible = withCollapsible(BlockListItem, { collapsed: block.collapsed })
    const BlockListItemWithRef = withSelectable(ListItemWithCollapsible, { selected: block.selected })
    return <BlockListItemWithRef
            content={block}
            key={block.uuid}/>
  }

  buildContent (block: Content, parent?: Base): JSX.Element {
    const ContentBlockWithRef = withSelectable(ContentBlock, { selected: block.selected })
    return <ContentBlockWithRef
            content={block}
            key={block.uuid} />
  }

  buildSection (block: Section, parent?: Base): JSX.Element {
    const ContentSectionWithRef = withSelectable(ContentSection, { selected: block.selected })
    return <ContentSectionWithRef
            section={block}
            key={block.uuid} />
  }

  buildList (block: List, parent?: Base): JSX.Element {
    const BlockListWithRef = withSelectable(BlockList, { selected: false })
    return <BlockListWithRef
            list={block}
            selected={false}
            key={block.uuid} />
  }

  buildSpan (block: Span, parent?: Base): JSX.Element {
    const ContentSpanWithRef = withSelectable(ContentSpan, { selected: block.selected })
    return <ContentSpanWithRef
            span={block}
            key={block.uuid} />
  }

  buildSelectable (block: Selectable, parent?: Base): JSX.Element {
    const SentinalWithRef = withSelectable(SentinalView, { selected: block.selected })
    return <SentinalWithRef
            sentinal={block}
            key={block.uuid} />
  }

  buildStream (stream: Stream, parent?: Base): JSX.Element {
    const BlockStreamWithRef = withSelectable(BlockStream, { selected: false })
    return <BlockStreamWithRef
            stream={stream}
            key={stream.uuid} />
  }
};
