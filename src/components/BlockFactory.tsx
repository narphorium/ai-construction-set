
import React, { useContext, useEffect, useState } from 'react';
import { Base, Content, List, NamedContent, Section, Selectable, Span } from '../data';
import { StepContext } from '../hooks';
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

    contentContainsSelected(block: Content, selected_index: number): boolean {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.children.forEach((child: Base) => {
            if (this.containsSelected(child, selected_index)) {
                contains = true;
            }
        });
        return contains;
    };

    sectionConstainsSelected(block: Section, selected_index: number): boolean {
        let contains = this.selectableContainsSelected(block, selected_index);
        block.spans.forEach((span: Span) => {
            if (this.containsSelected(span, selected_index)) {
                contains = true;
            }
        });
        return contains;
    };

    selectableContainsSelected(block: Selectable, selected_index: number): boolean {
        if (block.selection_index === null) {
            return false;
        }
        return block.selection_index <= selected_index;
    }

    listContainsSelected(block: List, selected_index: number): boolean {
        let contains = false;
        block.items.forEach((item: NamedContent) => {
            if (this.containsSelected(item, selected_index)) {
                contains = true;
            }
        });
        return contains;
    }

    containsSelected(block: Base, selected_index: number): boolean {
        if (block instanceof List) {
            return this.listContainsSelected(block, selected_index);
        } else if (block instanceof Content) {
            return this.contentContainsSelected(block, selected_index);
        } else if (block instanceof Section) {
            return this.sectionConstainsSelected(block, selected_index);
        } else if (block instanceof Selectable) {
            return this.selectableContainsSelected(block, selected_index);
        }
        return false;
    }

    getClassNames(block: Base, selected_index: number): string[] {
        const classNames = new Set(Array.from(block.classNames));
        if (block instanceof Selectable) {
            if (block.selection_index !== null) {
                classNames.add('selectable');
            }
            if (selected_index === block.selection_index) {
                classNames.add('selected');
            }
        }
        return Array.from(classNames);
    };

    useStep() {
        return useContext(StepContext);
    }

    useSelected(block: Selectable) {
        const step = this.useStep();
        const [selected, setSelected] = useState<boolean>(block.selected);
        useEffect(() => {
            if (step != undefined) {
                setSelected(block.selection_index === step?.step);
            }
        }, [step]);
        return {selected, setSelected};
    }

    useCollapsed(block: NamedContent) {
        const step = this.useStep();
        const [collapsed, setCollapsed] = useState<boolean>(block.collapsed);
        useEffect(() => {
            if (step != undefined) {
                setCollapsed(!this.containsSelected(block, step.step));
            }
        }, [step]);
        const toggleCollapsed = (c: boolean) => setCollapsed(!c)
        return {collapsed, toggleCollapsed};
    }

    buildNamedContent(block: NamedContent, parent?: Base): JSX.Element {
        const {selected, setSelected} = this.useSelected(block);
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        return <NamedBlock content={block} collapsed={collapsed} onToggle={toggleCollapsed} selected={selected} key={block.uuid}/>;
    }

    buildListItem(block: NamedContent, parent?: Base): JSX.Element {
        const {selected, setSelected} = this.useSelected(block);
        const {collapsed, toggleCollapsed} = this.useCollapsed(block);
        return <BlockListItem content={block} collapsed={collapsed} onToggle={toggleCollapsed} selected={selected} key={block.uuid}/>;    
    }

    buildContent(block: Content, parent?: Base): JSX.Element {
        const {selected, setSelected} = this.useSelected(block);
        return <ContentBlock content={block} selected={selected} key={block.uuid} />;
    }

    buildSection(block: Section, parent?: Base): JSX.Element {
        const {selected, setSelected} = this.useSelected(block);
        return <ContentSection section={block} selected={selected} key={block.uuid} />;
    }

    buildList(block: List, parent?: Base): JSX.Element {
        return <BlockList list={block} selected={false} key={block.uuid} />;
    }

    buildSpan(block: Span, parent?: Base): JSX.Element {
        const {selected, setSelected} = this.useSelected(block);
        return <ContentSpan  span={block} selected={selected} key={block.uuid} />;
    }

    buildSentinal(block: Selectable, parent?: Base): JSX.Element {
        return <SentinalView sentinal={block} key={block.uuid} />;
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