import { BehaviorComponentProps } from "@/components/behaviors/Base.js";
import { withCollapsible } from "@/components/behaviors/withCollapsible.js";
import { withHighlightable } from "@/components/behaviors/withHighlightable.js";
import { withPageable } from "@/components/behaviors/withPageable.js";
import { withRef } from "@/components/behaviors/withRef.js";
import { withTheme } from "@/components/behaviors/withTheme.js";
import { type BlockComponentProps } from "@/components/blocks/Base.js";
import { Card as CardBlock, CardProps } from "@/components/blocks/Card.js";
import { CodeBlock, CodeBlockProps } from "@/components/blocks/CodeBlock.js";
import {
  CollapsibleSection,
  CollapsibleSectionProps,
} from "@/components/blocks/CollapsibleSection.js";
import {
  ContentSpan,
  ContentSpanProps,
} from "@/components/blocks/ContentSpan.js";
import { LabelBlock, LabelBlockProps } from "@/components/blocks/LabelBlock.js";
import {
  ParagraphBlock,
  ParagraphBlockProps,
} from "@/components/blocks/ParagraphBlock.js";
import {
  AccordionLayout,
  AccordionLayoutItem,
  AccordionLayoutItemProps,
  AccordionLayoutProps,
} from "@/components/layouts/AccordionLayout.js";
import {
  NestedLayout,
  NestedLayoutProps,
} from "@/components/layouts/NestedLayout.js";
import {
  TableLayout,
  TableLayoutCell,
  TableLayoutCellProps,
  TableLayoutProps,
  TableLayoutRow,
  TableLayoutRowProps,
} from "@/components/layouts/TableLayout.js";
import { BlockStore } from "@/core/BlockStore.js";
import { useBlock } from "@/hooks/useBlock.js";
import { Behavior } from "@/types/behaviors/Behavior.js";
import {
  Collapsible,
  CollapsibleType,
  HighlightableType,
  PageableType,
} from "@/types/behaviors/index.js";
import { Card, CardType } from "@/types/blocks/Card.js";
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
} from "@/types/blocks/index.js";
import { Label, LabelType } from "@/types/blocks/Label.js";
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
} from "@/types/layouts/index.js";
import React, { type ForwardRefExoticComponent } from "react";
import { SymbolCodepoints } from "react-material-symbols";
import { BlockRegistry } from "./BlockRegistry.js";

export interface BlockRenderer {
  render: (block: Block, parent?: Block) => JSX.Element;
  registerBlockHandler: <T extends Block, TProps extends BlockComponentProps>(
    blockType: string,
    blockComponent: ForwardRefExoticComponent<TProps>,
    builder: BlockRenderHandler<T, TProps>,
  ) => void;
  registerBehaviorHandler: <
    T extends Behavior,
    TProps extends BehaviorComponentProps,
  >(
    behaviorType: string,
    builder: BehaviorRenderHandler<T, TProps>,
  ) => void;
}

export type BehaviorRenderHandler<
  T extends Behavior,
  TProps extends BehaviorComponentProps,
> = (
  Component: ForwardRefExoticComponent<TProps>,
  block: T,
) => ForwardRefExoticComponent<TProps>;

export type BlockRenderHandler<
  T extends Block,
  TProps extends BlockComponentProps,
> = (
  Component: ForwardRefExoticComponent<TProps>,
  block: T,
  parent?: T,
  children?: React.ReactNode,
) => JSX.Element;

type RenderContext = {
  blockRegistry: BlockRegistry;
  blockStore: BlockStore;
  parentByBlock: Map<Block, Block>;
  blockComponents: Map<string, ForwardRefExoticComponent<BlockComponentProps>>;
  blockHandlers: Map<string, BlockRenderHandler<any, BlockComponentProps>>;
  behaviorHandlers: Map<
    string,
    BehaviorRenderHandler<any, BehaviorComponentProps>
  >;
};

export function createBlockRenderer(
  blockRegistry: BlockRegistry,
  blockStore: BlockStore,
): BlockRenderer {
  const context: RenderContext = {
    blockRegistry,
    blockStore,
    parentByBlock: new Map<Block, Block>(),
    blockComponents: new Map(),
    blockHandlers: new Map(),
    behaviorHandlers: new Map(),
  };

  // Initialize handlers
  registerDefaultHandlers(context);

  return {
    render: (block: Block, parent?: Block) =>
      renderBlock(block, parent, context),
    registerBlockHandler: <T extends Block, TProps extends BlockComponentProps>(
      blockType: string,
      blockComponent: ForwardRefExoticComponent<TProps>,
      builder: BlockRenderHandler<T, TProps>,
    ) => {
      context.blockComponents.set(blockType, blockComponent as any);
      context.blockHandlers.set(blockType, builder as any);
    },
    registerBehaviorHandler: <
      T extends Behavior,
      TProps extends BehaviorComponentProps,
    >(
      behaviorType: string,
      builder: BehaviorRenderHandler<T, TProps>,
    ) => {
      context.behaviorHandlers.set(behaviorType, builder as any);
    },
  };
}

function registerDefaultHandlers(context: RenderContext) {
  // Register block handlers
  registerBlockHandler(context, CodeType, CodeBlock, renderCode);
  registerBlockHandler(context, ParagraphType, ParagraphBlock, renderParagraph);
  registerBlockHandler(context, CardType, CardBlock, renderCard);
  registerBlockHandler(context, SectionType, CollapsibleSection, renderSection);
  registerBlockHandler(context, SpanType, ContentSpan, renderSpan);
  registerBlockHandler(context, LabelType, LabelBlock, renderLabel);
  registerBlockHandler(context, ListType, AccordionLayout, renderList);
  registerBlockHandler(
    context,
    ListItemType,
    AccordionLayoutItem,
    renderListItem,
  );
  registerBlockHandler(context, TreeType, NestedLayout, renderTree);
  registerBlockHandler(context, TableType, TableLayout, renderTable);
  registerBlockHandler(context, TableRowType, TableLayoutRow, renderTableRow);
  registerBlockHandler(
    context,
    TableCellType,
    TableLayoutCell,
    renderTableCell,
  );

  // Register behavior handlers
  registerBehaviorHandler(context, CollapsibleType, withCollapsible);
  registerBehaviorHandler(context, HighlightableType, withHighlightable);
  registerBehaviorHandler(context, PageableType, withPageable);
}

function registerBlockHandler<
  T extends Block,
  TProps extends BlockComponentProps,
>(
  context: RenderContext,
  blockType: string,
  blockComponent: ForwardRefExoticComponent<TProps>,
  builder: BlockRenderHandler<T, TProps>,
) {
  context.blockComponents.set(blockType, blockComponent as any);
  context.blockHandlers.set(blockType, builder as any);
}

function registerBehaviorHandler<
  T extends Behavior,
  TProps extends BehaviorComponentProps,
>(
  context: RenderContext,
  behaviorType: string,
  builder: BehaviorRenderHandler<T, TProps>,
) {
  context.behaviorHandlers.set(behaviorType, builder as any);
}

function renderBlock(
  block: Block,
  parent: Block | undefined,
  context: RenderContext,
): JSX.Element {
  const handler = context.blockHandlers.get(block.type);
  if (!handler) {
    throw new Error(`Render handler not found for: ${block.type}`);
  }

  if (parent) {
    context.parentByBlock.set(block, parent);
  }

  const children = block.children.map((childId) => {
    const child = context.blockStore.getBlock(childId);
    return child ? renderBlock(child, block, context) : null;
  });

  let Component = context.blockComponents.get(block.type);
  if (!Component) {
    throw new Error(`Block component not found for: ${block.type}`);
  }

  // Apply theme
  if (block.theme !== undefined) {
    Component = withTheme(Component, { theme: block.theme });
  }

  // Add HOCs based on behaviors
  const behaviors = context.blockRegistry.getBehaviors(block.type);
  for (const behavior of behaviors) {
    if (Component) {
      Component = withBehavior(Component, behavior, context);
    }
  }

  // Apply ref HOC if Component exists
  if (Component) {
    Component = withRef(Component as any) as typeof Component;
  }

  const blockState = useBlock(block.uuid);
  return handler(Component as any, blockState, parent, children);
}

function withBehavior<TProps extends BehaviorComponentProps>(
  Component: ForwardRefExoticComponent<TProps>,
  behavior: string,
  context: RenderContext,
): ForwardRefExoticComponent<TProps> {
  const handler = context.behaviorHandlers.get(behavior);
  if (!handler) {
    throw new Error(`Behavior handler not found for: ${behavior}`);
  }
  return handler(
    Component as any,
    behavior,
  ) as ForwardRefExoticComponent<TProps>;
}

// Individual render functions
function renderCode(
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

function renderParagraph(
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

function renderCard(
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

function renderSection(
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

function renderSpan(
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

function renderLabel(
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

function renderList(
  Component: ForwardRefExoticComponent<AccordionLayoutProps>,
  block: List,
  parent?: Block,
  children?: React.ReactNode,
): JSX.Element {
  return <Component key={block.uuid}>{children}</Component>;
}

function renderListItem(
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

function renderTree(
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

function renderTable(
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

function renderTableRow(
  Component: ForwardRefExoticComponent<TableLayoutRowProps>,
  block: TableRow,
  parent?: Block,
  children?: React.ReactNode,
): JSX.Element {
  return <Component key={block.uuid}>{children}</Component>;
}

function renderTableCell(
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
