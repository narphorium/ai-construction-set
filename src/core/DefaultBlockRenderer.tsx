import { useBlock } from "@/hooks";
import React, { type ForwardRefExoticComponent } from "react";
import { SymbolCodepoints } from "react-material-symbols";
import { StoreApi } from "zustand";
import { BehaviorComponentProps } from "../components/behaviors/Base";
import {
  CollapsibleComponentProps,
  withCollapsible,
} from "../components/behaviors/withCollapsible";
import {
  HighlightableComponentProps,
  withHighlightable,
} from "../components/behaviors/withHighlightable";
import {
  PaginatedComponentProps,
  withPageable,
} from "../components/behaviors/withPageable";
import { withRef } from "../components/behaviors/withRef";
import { withTheme } from "../components/behaviors/withTheme";
import { type BlockComponentProps } from "../components/blocks/Base";
import { Card as CardBlock, CardProps } from "../components/blocks/Card";
import { CodeBlock, CodeBlockProps } from "../components/blocks/CodeBlock";
import {
  CollapsibleSection,
  CollapsibleSectionProps,
} from "../components/blocks/CollapsibleSection";
import {
  ContentSpan,
  ContentSpanProps,
} from "../components/blocks/ContentSpan";
import { LabelBlock, LabelBlockProps } from "../components/blocks/LabelBlock";
import {
  ParagraphBlock,
  ParagraphBlockProps,
} from "../components/blocks/ParagraphBlock";
import {
  AccordionLayout,
  AccordionLayoutItem,
  AccordionLayoutItemProps,
  AccordionLayoutProps,
} from "../components/layouts/AccordionLayout";
import {
  NestedLayout,
  NestedLayoutProps,
} from "../components/layouts/NestedLayout";
import {
  TableLayout,
  TableLayoutCell,
  TableLayoutCellProps,
  TableLayoutProps,
  TableLayoutRow,
  TableLayoutRowProps,
} from "../components/layouts/TableLayout";
import {
  Collapsible,
  CollapsibleType,
  Highlightable,
  HighlightableType,
  Pageable,
  PageableType,
} from "../types";
import { Behavior } from "../types/behaviors/Behavior";
import {
  Block,
  Code,
  CodeType,
  Paragraph,
  ParagraphType,
  Section,
  SectionType,
  Span,
  SpanType,
} from "../types/blocks";
import { Card, CardType } from "../types/blocks/Card";
import { Label, LabelType } from "../types/blocks/Label";
import {
  List,
  ListItem,
  ListItemType,
  ListType,
  Table,
  TableCell,
  TableCellType,
  TableRow,
  TableRowType,
  TableType,
  Tree,
  TreeType,
} from "../types/layouts";
import { BlockRegistry } from "./BlockRegistry";
import {
  BehaviorRenderHandler,
  BlockRenderer,
  BlockRenderHandler,
} from "./BlockRenderer";
import { BlockStore } from "./BlockStore";

export class DefaultBlockRenderer implements BlockRenderer {
  blockComponents = new Map<
    string,
    ForwardRefExoticComponent<BlockComponentProps>
  >();
  blockHandlers: Map<string, BlockRenderHandler<any, BlockComponentProps>> =
    new Map<string, BlockRenderHandler<Block, BlockComponentProps>>();
  behaviorHandlers: Map<
    string,
    BehaviorRenderHandler<any, BehaviorComponentProps>
  > = new Map<string, BehaviorRenderHandler<any, BehaviorComponentProps>>();
  parentByBlock: Map<Block, Block> = new Map<Block, Block>();
  blockStore: StoreApi<BlockStore>;
  blockRegistry: BlockRegistry;

  constructor(blockRegistry: BlockRegistry, blockStore: StoreApi<BlockStore>) {
    this.blockRegistry = blockRegistry;
    this.blockStore = blockStore;
    this.registerBlockHandler(
      CodeType,
      CodeBlock,
      this.renderCode.bind(this) as BlockRenderHandler<Code, CodeBlockProps>,
    );
    this.registerBlockHandler(
      ParagraphType,
      ParagraphBlock,
      this.renderParagraph.bind(this) as BlockRenderHandler<
        Paragraph,
        ParagraphBlockProps
      >,
    );
    this.registerBlockHandler(
      CardType,
      CardBlock,
      this.renderCard.bind(this) as BlockRenderHandler<Card, CardProps>,
    );
    this.registerBlockHandler(
      SectionType,
      CollapsibleSection,
      this.renderSection.bind(this) as BlockRenderHandler<
        Section,
        CollapsibleSectionProps
      >,
    );
    this.registerBlockHandler(
      SpanType,
      ContentSpan,
      this.renderSpan.bind(this) as BlockRenderHandler<Span, ContentSpanProps>,
    );
    this.registerBlockHandler(
      LabelType,
      LabelBlock,
      this.renderLabel.bind(this) as BlockRenderHandler<Label, LabelBlockProps>,
    );
    this.registerBlockHandler(
      ListType,
      AccordionLayout,
      this.renderList.bind(this) as BlockRenderHandler<
        List,
        AccordionLayoutProps
      >,
    );
    this.registerBlockHandler(
      ListItemType,
      AccordionLayoutItem,
      this.renderListItem.bind(this) as BlockRenderHandler<
        ListItem,
        AccordionLayoutItemProps
      >,
    );
    this.registerBlockHandler(
      TreeType,
      NestedLayout,
      this.renderTree.bind(this) as BlockRenderHandler<Tree, NestedLayoutProps>,
    );
    this.registerBlockHandler(
      TableType,
      TableLayout,
      this.renderTable.bind(this) as BlockRenderHandler<
        Table,
        TableLayoutProps
      >,
    );
    this.registerBlockHandler(
      TableRowType,
      TableLayoutRow,
      this.renderTableRow.bind(this) as BlockRenderHandler<
        TableRow,
        TableLayoutRowProps
      >,
    );
    this.registerBlockHandler(
      TableCellType,
      TableLayoutCell,
      this.renderTableCell.bind(this) as BlockRenderHandler<
        TableCell,
        TableLayoutCellProps
      >,
    );

    this.registerBehaviorHandler(
      CollapsibleType,
      this.withCollapsible.bind(this) as BehaviorRenderHandler<
        Collapsible,
        CollapsibleComponentProps
      >,
    );
    this.registerBehaviorHandler(
      HighlightableType,
      this.withHighlightable.bind(this) as BehaviorRenderHandler<
        Highlightable,
        HighlightableComponentProps
      >,
    );
    this.registerBehaviorHandler(
      PageableType,
      this.withPageable.bind(this) as BehaviorRenderHandler<
        Pageable,
        PaginatedComponentProps
      >,
    );
  }

  registerBehaviorHandler<
    T extends Behavior,
    TProps extends BehaviorComponentProps,
  >(behaviorType: string, builder: BehaviorRenderHandler<T, TProps>): void {
    this.behaviorHandlers.set(behaviorType, builder as any);
  }

  registerBlockHandler<T extends Block, TProps extends BlockComponentProps>(
    blockType: string,
    blockComponent: ForwardRefExoticComponent<TProps>,
    builder: BlockRenderHandler<T, TProps>,
  ): void {
    this.blockComponents.set(blockType, blockComponent as any);
    this.blockHandlers.set(blockType, builder as any);
  }

  getParent(block: Block): Block | undefined {
    return this.parentByBlock.get(block);
  }

  setParent(block: Block, parent: Block): void {
    this.parentByBlock.set(block, parent);
  }

  render(block: Block, parent?: Block): JSX.Element {
    const handler = this.blockHandlers.get(block.type);
    if (handler !== undefined) {
      if (parent !== undefined) {
        this.setParent(block, parent);
      }
      const children = block.children.map((childId) => {
        const child = this.blockStore.getState().getBlock(childId);
        if (child !== undefined) {
          return this.render(child, block);
        }
        return null;
      });
      let Component = this.blockComponents.get(block.type);
      if (Component === undefined) {
        throw new Error("Block component not found for: " + block.type);
      }
      Component = this.withTheme(Component, { block });

      // Add HOCs based on behaviors in the BlockRegistry
      const behaviors = this.blockRegistry.getBehaviors(block.type);
      for (const behavior of behaviors) {
        Component = this.withBehavior(Component as any, behavior);
      }
      Component = withRef(Component as any);

      const blockState = useBlock(block.uuid);

      const instance = handler(Component as any, blockState, parent, children);
      return instance;
    } else {
      throw new Error("Render handler not found for: " + block.type);
    }
  }

  getClassNames(block: Block, selectedIndex: number): string[] {
    const classNames = new Set(Array.from(block.classNames));
    return Array.from(classNames);
  }

  withBehavior<T extends Behavior, TProps extends BehaviorComponentProps>(
    Component: ForwardRefExoticComponent<TProps>,
    behavior: string,
  ): any {
    const handler = this.behaviorHandlers.get(behavior);
    if (handler !== undefined) {
      return handler(Component as any, behavior);
    } else {
      throw new Error("Behavior handler not found for: " + behavior);
    }
  }

  withTheme<T extends Block, TProps extends BlockComponentProps>(
    Component: ForwardRefExoticComponent<TProps>,
    params: { block: Block },
  ): any {
    if (params.block.theme !== undefined) {
      return withTheme(Component, { theme: params.block.theme });
    }
    return Component;
  }

  withHighlightable<TProps extends HighlightableComponentProps>(
    Component: ForwardRefExoticComponent<TProps>,
  ): any {
    return withHighlightable(Component);
  }

  withCollapsible<TProps extends CollapsibleComponentProps>(
    Component: ForwardRefExoticComponent<TProps>,
  ): any {
    return withCollapsible(Component);
  }

  withPageable<TProps extends PaginatedComponentProps>(
    Component: ForwardRefExoticComponent<TProps>,
  ): any {
    return withPageable(Component);
  }

  renderCard(
    Component: ForwardRefExoticComponent<CardProps>,
    block: Card,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component key={block.uuid} highlighted={block.highlighted}>
        {children}
      </Component>
    );
  }

  renderSection(
    Component: ForwardRefExoticComponent<CollapsibleSectionProps>,
    block: Section,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    const collapsible = block as Collapsible;
    return (
      <Component
        key={block.uuid}
        summary={block.summary}
        icon={block.icon as SymbolCodepoints}
        collapsed={collapsible.collapsed}
        setCollapsed={collapsible.setCollapsed}
      >
        {children}
      </Component>
    );
  }

  renderParagraph(
    Component: ForwardRefExoticComponent<ParagraphBlockProps>,
    block: Paragraph,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component key={block.uuid} highlighted={block.highlighted}>
        {children}
      </Component>
    );
  }

  renderCode(
    Component: ForwardRefExoticComponent<CodeBlockProps>,
    block: Code,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component
        key={block.uuid}
        highlighted={block.highlighted}
        editable={block.editable}
      >
        {children}
      </Component>
    );
  }

  renderSpan(
    Component: ForwardRefExoticComponent<ContentSpanProps>,
    block: Span,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component key={block.uuid} highlighted={block.highlighted}>
        {block.content}
      </Component>
    );
  }

  renderLabel(
    Component: ForwardRefExoticComponent<LabelBlockProps>,
    block: Label,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component key={block.uuid} highlighted={block.highlighted}>
        {block.content}
      </Component>
    );
  }

  renderList(
    Component: ForwardRefExoticComponent<AccordionLayoutProps>,
    block: List,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return <Component key={block.uuid}>{children}</Component>;
  }

  renderListItem(
    Component: ForwardRefExoticComponent<AccordionLayoutItemProps>,
    block: ListItem,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    const collapsible = block as Collapsible;
    return (
      <Component
        key={block.uuid}
        highlighted={block.highlighted}
        collapsed={collapsible.collapsed}
        setCollapsed={collapsible.setCollapsed}
        summary={block.summary}
        icon={block.icon}
      >
        {children}
      </Component>
    );
  }

  renderTree(
    Component: ForwardRefExoticComponent<NestedLayoutProps>,
    block: Tree,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    // TODO: Add iteration
    // TODO: Calculate leaf
    return (
      <Component
        key={block.uuid}
        level={1}
        page={1}
        numPages={1}
        gotoPage={block.gotoPage}
        setNumPages={block.setNumPages}
      >
        {children}
      </Component>
    );
  }

  renderTable(
    Component: ForwardRefExoticComponent<TableLayoutProps>,
    block: Table,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component key={block.uuid} highlighted={block.highlighted}>
        {children}
      </Component>
    );
  }

  renderTableRow(
    Component: ForwardRefExoticComponent<TableLayoutRowProps>,
    block: TableRow,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return <Component key={block.uuid}>{children}</Component>;
  }

  renderTableCell(
    Component: ForwardRefExoticComponent<TableLayoutCellProps>,
    block: TableCell,
    parent?: Block,
    children?: React.ReactNode,
  ): JSX.Element {
    return (
      <Component
        key={block.uuid}
        header={block.header}
        icon={block.icon as SymbolCodepoints}
      >
        {children}
      </Component>
    );
  }
}
