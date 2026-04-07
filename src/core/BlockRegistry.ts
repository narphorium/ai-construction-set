import {
  BehaviorActions,
  BehaviorGetter,
  BehaviorProps,
  BehaviorSetter,
  CollapsibleType,
  createCollapsible,
  createCollapsibleActions,
  createHighlightable,
  createHighlightableActions,
  createPageable,
  createPageableActions,
  HighlightableType,
  PageableType,
} from "@/types/behaviors/index.js";
import {
  CardType,
  createCard,
  createCardActions,
} from "@/types/blocks/Card.js";
import {
  BlockActions,
  BlockGetter,
  BlockProps,
  BlockSetter,
  CheckboxType,
  CodeType,
  createCheckbox,
  createCheckboxActions,
  createCode,
  createCodeActions,
  createParagraph,
  createParagraphActions,
  createSection,
  createSectionActions,
  createSpan,
  createSpanActions,
  ParagraphType,
  SectionType,
  SpanType,
} from "@/types/blocks/index.js";
import {
  createLabel,
  createLabelActions,
  LabelType,
} from "@/types/blocks/Label.js";
import {
  createList,
  createListActions,
  createListItem,
  createListItemActions,
  createTable,
  createTableActions,
  createTableCell,
  createTableCellActions,
  createTableRow,
  createTableRowActions,
  createTree,
  createTreeActions,
  ListItemType,
  ListType,
  TableCellType,
  TableRowType,
  TableType,
  TreeType,
} from "@/types/layouts/index.js";
import * as uuid from "uuid";

export type BlockBuilder<P extends BlockProps> = (props: Partial<P>) => P;
export type BlockActionsBuilder<
  P extends BlockProps,
  A extends BlockActions,
> = (get: BlockGetter<P>, set: BlockSetter<P>) => A;

export interface BlockSpec<P extends BlockProps, A extends BlockActions> {
  name: string;
  builder: BlockBuilder<P>;
  actionsBuilder: BlockActionsBuilder<P, A>;
  behaviors: string[];
}

export type BehaviorBuilder<P extends BehaviorProps> = (props: Partial<P>) => P;
export type BehaviorActionsBuilder<
  P extends BehaviorProps,
  A extends BehaviorActions,
> = (get: BehaviorGetter<P>, set: BehaviorSetter<P>) => A;

export interface BehaviorSpec<
  P extends BehaviorProps,
  A extends BehaviorActions,
> {
  name: string;
  builder: BehaviorBuilder<P>;
  actionsBuilder: BehaviorActionsBuilder<P, A>;
}

export type BlockRegistry = {
  blocks: { [key: string]: BlockSpec<any, any> };
  behaviors: { [key: string]: BehaviorSpec<any, any> };
};

export const createBlockRegistry = (): BlockRegistry => ({
  blocks: {},
  behaviors: {},
});

export const registerBlock = <P extends BlockProps, A extends BlockActions>(
  registry: BlockRegistry,
  spec: BlockSpec<P, A>,
): BlockRegistry => ({
  ...registry,
  blocks: { ...registry.blocks, [spec.name]: spec },
});

export const registerBehavior = <
  P extends BehaviorProps,
  A extends BehaviorActions,
>(
  registry: BlockRegistry,
  spec: BehaviorSpec<P, A>,
): BlockRegistry => ({
  ...registry,
  behaviors: { ...registry.behaviors, [spec.name]: spec },
});

export const createBlock = <P extends BlockProps>(
  registry: BlockRegistry,
  blockType: string,
  props: Partial<any> = {},
): P => {
  const blockSpec = registry.blocks[blockType];
  if (!blockSpec) {
    throw new Error(`Block type ${blockType} not registered`);
  }

  // Generate a UUID if one is not provided
  if (!props.uuid) {
    props.uuid = uuid.v4();
  }

  console.log(`Creating block: ${blockType}, uuid: ${props.uuid || "new"}`);

  const block = blockSpec.behaviors.reduce(
    (block, behaviorType) => {
      const behaviorSpec = registry.behaviors[behaviorType];
      if (!behaviorSpec) {
        throw new Error(`Behavior type ${behaviorType} not registered`);
      }
      return { ...block, ...behaviorSpec.builder(props) };
    },
    blockSpec.builder(props as Partial<P>),
  );

  return block;
};

export const createBlockActions = <
  P extends BlockProps,
  A extends BlockActions,
>(
  registry: BlockRegistry,
  get: BlockGetter<P>,
  set: BlockSetter<P>,
): A => {
  const block = get();
  const blockSpec = registry.blocks[block.type];
  if (!blockSpec) {
    throw new Error(`Block type ${block.type} not registered`);
  }

  return blockSpec.behaviors.reduce(
    (actions, behaviorType) => {
      const behaviorSpec = registry.behaviors[behaviorType];
      if (!behaviorSpec) {
        throw new Error(`Behavior type ${behaviorType} not registered`);
      }
      return {
        ...actions,
        ...behaviorSpec.actionsBuilder(get, set),
      };
    },
    blockSpec.actionsBuilder(get, set),
  );
};

export const getBehaviors = (
  registry: BlockRegistry,
  blockType: string,
): string[] => {
  const blockSpec = registry.blocks[blockType];
  return blockSpec ? blockSpec.behaviors : [];
};

export const hasBehavior = (
  registry: BlockRegistry,
  blockType: string,
  behaviorType: string,
): boolean => getBehaviors(registry, blockType).includes(behaviorType);

export const createDefaultRegistry = (): BlockRegistry => {
  let registry = createBlockRegistry();

  // Register blocks
  registry = registerBlock(registry, {
    name: CheckboxType,
    builder: createCheckbox,
    actionsBuilder: createCheckboxActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: CodeType,
    builder: createCode,
    actionsBuilder: createCodeActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: ParagraphType,
    builder: createParagraph,
    actionsBuilder: createParagraphActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: CardType,
    builder: createCard,
    actionsBuilder: createCardActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: SectionType,
    builder: createSection,
    actionsBuilder: createSectionActions,
    behaviors: [HighlightableType, CollapsibleType],
  });

  registry = registerBlock(registry, {
    name: SpanType,
    builder: createSpan,
    actionsBuilder: createSpanActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: LabelType,
    builder: createLabel,
    actionsBuilder: createLabelActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: TableRowType,
    builder: createTableRow,
    actionsBuilder: createTableRowActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: TableCellType,
    builder: createTableCell,
    actionsBuilder: createTableCellActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: ListItemType,
    builder: createListItem,
    actionsBuilder: createListItemActions,
    behaviors: [CollapsibleType, HighlightableType],
  });

  // Register layouts
  registry = registerBlock(registry, {
    name: ListType,
    builder: createList,
    actionsBuilder: createListActions,
    behaviors: [HighlightableType],
  });

  registry = registerBlock(registry, {
    name: TableType,
    builder: createTable,
    actionsBuilder: createTableActions,
    behaviors: [HighlightableType, PageableType],
  });

  registry = registerBlock(registry, {
    name: TreeType,
    builder: createTree,
    actionsBuilder: createTreeActions,
    behaviors: [HighlightableType, PageableType],
  });

  // Register behaviors
  registry = registerBehavior(registry, {
    name: CollapsibleType,
    builder: createCollapsible,
    actionsBuilder: createCollapsibleActions,
  });

  registry = registerBehavior(registry, {
    name: PageableType,
    builder: createPageable,
    actionsBuilder: createPageableActions,
  });

  registry = registerBehavior(registry, {
    name: HighlightableType,
    builder: createHighlightable,
    actionsBuilder: createHighlightableActions,
  });

  return registry;
};
