
import React, { useCallback, useRef, useState } from 'react';
import { Base, Content, List, NamedContent, Section, Selectable, Span } from '../data';
import { BlockList } from './BlockList';
import { ContentBlock } from './ContentBlock';
import { ContentSection } from './ContentSection';
import { ContentSpan } from './ContentSpan';
import { BlockListItem, NamedBlock } from './NamedBlock';
import { SentinalView } from './SentinalView';

export interface BlockFactory {
    build(block: Base, parent?: Base): JSX.Element;
}

export class DefaultBlockFactory implements BlockFactory {

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

    buildListItem(block: NamedContent, parent?: Base): JSX.Element {
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

    buildSentinal(block: Selectable, parent?: Base): JSX.Element {
        const ref = useRef<HTMLDivElement>(null);
        return <SentinalView ref={ref} 
            sentinal={block} 
            key={block.uuid} />;
    }

    build(block: Base, parent?: Base): JSX.Element {
        if (block instanceof NamedContent) {
            if (parent instanceof List) {
                return this.buildListItem(block, parent);
            } else {
                return this.buildNamedContent(block, parent);
            }
        } else if (block instanceof Content) {
            return this.buildContent(block, parent);
        } else if (block instanceof Section) {
            return this.buildSection(block, parent);
        } else if (block instanceof List) {
            return this.buildList(block, parent);
        } else if (block instanceof Span) {
            return this.buildSpan(block, parent);
        } else if (block instanceof Selectable) {
            return this.buildSentinal(block, parent);
        } else {
            throw new Error("Unknown block data type: " + block.constructor.name);
        }
    }
};