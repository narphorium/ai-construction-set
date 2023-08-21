
import React, { useState } from 'react';
import { Base, Content, List, NamedContent, Section, Selectable, Span } from '../data';
import { BlockList } from './BlockList';
import { ContentBlock } from './ContentBlock';
import { ContentSection } from './ContentSection';
import { ContentSpan } from './ContentSpan';
import { BlockListItem, NamedBlock } from './NamedBlock';
import { SentinalView } from './SentinalView';
import { Variant } from './theme';

export interface BlockFactory {
    build(block: Base, index: any, parent?: Base): JSX.Element;
}

export class DefaultBlockFactory implements BlockFactory {

    buildNamedContent(block: NamedContent, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        const [collapsed, setCollapsed] = useState(block.collapsed);
        return <NamedBlock content={block} collapsed={collapsed} setCollapsed={setCollapsed} variant={variant} setVariant={setVariant} key={index}/>;
    }

    buildListItem(block: NamedContent, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        const [collapsed, setCollapsed] = useState(block.collapsed);
        return <BlockListItem content={block} collapsed={collapsed} setCollapsed={setCollapsed} variant={variant} setVariant={setVariant} key={index}/>;    
    }

    buildContent(block: Content, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        return <ContentBlock content={block} variant={variant} setVariant={setVariant} key={index} />;
    }

    buildSection(block: Section, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        return <ContentSection section={block} variant={variant} setVariant={setVariant} key={index} />;
    }

    buildList(block: List, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        return <BlockList list={block} variant={variant} setVariant={setVariant} key={index} />;
    }

    buildSpan(block: Span, index: any, parent?: Base): JSX.Element {
        const [variant, setVariant] = useState<Variant>("default");
        return <ContentSpan  span={block} key={index} variant={variant} setVariant={setVariant}></ContentSpan>;
    }

    buildSentinal(block: Selectable, index: any, parent?: Base): JSX.Element {
        return <SentinalView sentinal={block} key={index} />;
    }

    build(block: Base, index: any, parent?: Base): JSX.Element {
        if (block instanceof NamedContent) {
            if (parent instanceof List) {
                return this.buildListItem(block, index, parent);
            } else {
                return this.buildNamedContent(block, index, parent);
            }
        } else if (block instanceof Content) {
            return this.buildContent(block, index, parent);
        } else if (block instanceof Section) {
            return this.buildSection(block, index, parent);
        } else if (block instanceof List) {
            return this.buildList(block, index, parent);
        } else if (block instanceof Span) {
            return this.buildSpan(block, index, parent);
        } else if (block instanceof Selectable) {
            return this.buildSentinal(block, index, parent);
        } else {
            throw new Error("Unknown block data type: " + block.constructor.name);
        }
    }
};