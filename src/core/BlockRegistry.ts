import * as uuid from "uuid";
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
} from "../types/behaviors";
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
} from "../types/blocks";
import { CardType, createCard, createCardActions } from "../types/blocks/Card";
import {
  createLabel,
  createLabelActions,
  LabelType,
} from "../types/blocks/Label";
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
} from "../types/layouts";

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

export class BlockRegistry {
  blocksByType: { [key: string]: any };
  behaviorsByType: { [key: string]: any };
  private currentSession: Session | null = null;

  constructor() {
    this.blocksByType = {};
    this.behaviorsByType = {};
  }

  generateUUID(): string {
    return uuid.v4();
  }

  registerBlock<P extends BlockProps, A extends BlockActions>(
    spec: BlockSpec<P, A>,
  ): void {
    this.blocksByType[spec.name] = spec;
  }

  registerBehavior<P extends BehaviorProps, A extends BehaviorActions>(
    spec: BehaviorSpec<P, A>,
  ): void {
    this.behaviorsByType[spec.name] = spec;
  }

  createBlock<P extends BlockProps>(
    blockType: string,
    parent?: BlockProps,
    props: Partial<any> = {},
  ): P {
    const blockSpec = this.blocksByType[blockType];
    if (blockSpec === undefined) {
      throw new Error(`Block type ${blockType} not registered`);
    }

    // Generate a UUID if one is not provided
    if (props.uuid === "" || props.uuid === undefined) {
      props.uuid = this.generateUUID();
    }

    // Set the parent if provided
    if (parent !== undefined) {
      props.parent = parent.uuid;
      parent.children.push(props.uuid);
    }

    let block = blockSpec.builder(props as Partial<P>);
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType];
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`);
      }
      block = { ...block, ...behaviorSpec.builder(props) };
    });

    if (this.currentSession) {
      this.currentSession.addBlock(block);
    }

    return block;
  }

  createBlockActions<P extends BlockProps, A extends BlockActions>(
    get: BlockGetter<P>,
    set: BlockSetter<P>,
  ): A {
    const block = get();
    const blockSpec = this.blocksByType[block.type];
    if (blockSpec === undefined) {
      throw new Error(`Block type ${block.type} not registered`);
    }

    let blockActions = blockSpec.actionsBuilder(get, set);
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType];
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`);
      }
      blockActions = {
        ...blockActions,
        ...behaviorSpec.actionsBuilder(get, set),
      };
    });
    return blockActions;
  }

  getBehaviors(blockType: string): string[] {
    const blockSpec = this.blocksByType[blockType];
    return blockSpec !== undefined ? blockSpec.behaviors : [];
  }

  hasBehavior(blockType: string, behaviorType: string): boolean {
    const behaviors = this.getBehaviors(blockType);
    return behaviors.includes(behaviorType);
  }

  session(): Session {
    if (this.currentSession === null) {
      this.currentSession = new Session(this);
    }
    return this.currentSession;
  }

  closeSession(): void {
    this.currentSession = null;
  }
}

class Session {
  private blocks: BlockProps[] = [];

  constructor(private blockRegistry: BlockRegistry) {}

  addBlock(block: BlockProps): void {
    this.blocks.push(block);
  }

  getBlocks(): BlockProps[] {
    return this.blocks;
  }

  close(): void {
    this.blockRegistry.closeSession();
  }
}

export class DefaultBlockRegistry extends BlockRegistry {
  constructor() {
    super();

    // Register blocks
    this.registerBlock({
      name: CheckboxType,
      builder: createCheckbox,
      actionsBuilder: createCheckboxActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: CodeType,
      builder: createCode,
      actionsBuilder: createCodeActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: ParagraphType,
      builder: createParagraph,
      actionsBuilder: createParagraphActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: CardType,
      builder: createCard,
      actionsBuilder: createCardActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: SectionType,
      builder: createSection,
      actionsBuilder: createSectionActions,
      behaviors: [HighlightableType, CollapsibleType],
    });
    this.registerBlock({
      name: SpanType,
      builder: createSpan,
      actionsBuilder: createSpanActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: LabelType,
      builder: createLabel,
      actionsBuilder: createLabelActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: TableRowType,
      builder: createTableRow,
      actionsBuilder: createTableRowActions,
      behaviors: [HighlightableType],
    });

    // Register layouts
    this.registerBlock({
      name: ListType,
      builder: createList,
      actionsBuilder: createListActions,
      behaviors: [],
    });
    this.registerBlock({
      name: ListItemType,
      builder: createListItem,
      actionsBuilder: createListItemActions,
      behaviors: [CollapsibleType, HighlightableType],
    });
    this.registerBlock({
      name: TableType,
      builder: createTable,
      actionsBuilder: createTableActions,
      behaviors: [HighlightableType, PageableType],
    });
    this.registerBlock({
      name: TableCellType,
      builder: createTableCell,
      actionsBuilder: createTableCellActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: TableRowType,
      builder: createTableRow,
      actionsBuilder: createTableRowActions,
      behaviors: [HighlightableType],
    });
    this.registerBlock({
      name: TreeType,
      builder: createTree,
      actionsBuilder: createTreeActions,
      behaviors: [HighlightableType, PageableType],
    });

    // Register behaviors
    this.registerBehavior({
      name: CollapsibleType,
      builder: createCollapsible,
      actionsBuilder: createCollapsibleActions,
    });
    this.registerBehavior({
      name: PageableType,
      builder: createPageable,
      actionsBuilder: createPageableActions,
    });
    this.registerBehavior({
      name: HighlightableType,
      builder: createHighlightable,
      actionsBuilder: createHighlightableActions,
    });
  }
}
