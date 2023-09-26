
import React, { useCallback, useRef, useState } from 'react';
import { Base, Content, List, ListItem, NamedContent, Section, Selectable, Span, Stream } from '../data';
import { BlockList } from './BlockList';
import { BlockStream } from './BlockStream';
import { ContentBlock } from './ContentBlock';
import { ContentSection } from './ContentSection';
import { ContentSpan } from './ContentSpan';
import { BlockListItem, NamedBlock } from './NamedBlock';
import { SentinalView } from './SentinalView';

export interface BlockFactory {
    build(block: Base, parent?: Base): JSX.Element;
    registerBuilder(target_class: string, builder: ((block: Base, parent?: Base | undefined) => JSX.Element)): void;
}

export class DefaultBlockFactory implements BlockFactory {

    block_types: any[] = [];
    builders: ((block: any, parent?: any) => JSX.Element)[] = [];

    constructor() {
        this.registerBuilder(ListItem, this.buildListItem);
        this.registerBuilder(NamedContent, this.buildNamedContent);
        this.registerBuilder(Content, this.buildContent);
        this.registerBuilder(Section, this.buildSection);
        this.registerBuilder(List, this.buildList);
        this.registerBuilder(Span, this.buildSpan);
        this.registerBuilder(Selectable, this.buildSelectable);
        this.registerBuilder(Stream, this.buildStream);
    }

    registerBuilder(target_class: any, builder: ((block: any, parent?: any | undefined) => JSX.Element)) {
        this.block_types.push(target_class);
        this.builders.push(builder.bind(this));
    }

    build(block: Base, parent?: Base): JSX.Element {
        for (let j=0; j<this.builders.length; j++) {
            const target_class = this.block_types[j];
            const handler = this.builders[j];
            if (block instanceof target_class) {
                return handler(block, parent);
            }
        }
        throw new Error("Builder not found for: " + block.constructor.name);
    }

    getClassNames(block: Base, selected_index: number): string[] {
        const classNames = new Set(Array.from(block.classNames));
        return Array.from(classNames);
    };

    useCollapsed(block: NamedContent) {
        const [collapsed, setCollapsed] = useState<boolean>(block.collapsed);
        const toggleCollapsed = useCallback((c: boolean) => setCollapsed(!c), 
                                            [collapsed]);
        return {collapsed, toggleCollapsed};
    }

    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element {
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        const ref = useRef<HTMLDivElement>(null);
        return <NamedBlock ref={ref} 
            content={block} 
            collapsed={collapsed} 
            onToggle={toggleCollapsed} 
            key={block.uuid}/>;
    }

    buildListItem(block: ListItem, parent?: Base): JSX.Element {
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        const ref = useRef<HTMLDivElement>(null);
        return <BlockListItem ref={ref} 
            content={block} 
            collapsed={collapsed} 
            onToggle={toggleCollapsed} 
            key={block.uuid}/>;    
    }

    buildContent(block: Content, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <ContentBlock ref={ref} 
            content={block} 
            key={block.uuid} />;
    }

    buildSection(block: Section, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <ContentSection ref={ref} 
            section={block} 
            key={block.uuid} />;
    }

    buildList(block: List, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <BlockList ref={ref} 
            list={block} 
            selected={false} 
            key={block.uuid} />;
    }

    buildSpan(block: Span, parent?: Base): JSX.Element {
        const ref = useRef<HTMLSpanElement>(null);
        return <ContentSpan ref={ref} 
            span={block} 
            key={block.uuid} />;
    }

    buildSelectable(block: Selectable, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <SentinalView ref={ref} 
            sentinal={block} 
            key={block.uuid} />;
    }

    buildStream(stream: Stream, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <BlockStream ref={ref} 
            stream={stream} 
            key={stream.uuid} />;
    }
};