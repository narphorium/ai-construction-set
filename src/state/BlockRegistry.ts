import * as uuid from 'uuid'
import { BehaviorActions, BehaviorGetter, BehaviorProps, BehaviorSetter, createCollapsibleActions, createPageableActions, createSelectableActions } from "./../types/behaviors"
import { BlockActions, BlockGetter, BlockProps, BlockSetter, createCheckboxActions, createCodeActions, createParagraphActions, createSectionActions, createSpanActions } from "./../types/blocks"
import { createListActions, createTableRowActions, createTableActions, createTreeActions } from "../types/layouts"
import { createCollapsible, createPageable, createSelectable } from "./../types/behaviors"
import { createCheckbox, createCode, createParagraph, createSection, createSpan } from "./../types/blocks"
import { createList, createTree, createTable, createTableRow } from "../types/layouts"

export type BlockBuilder<P extends BlockProps> = (props: Partial<P>) => P
export type BlockActionsBuilder<P extends BlockProps, A extends BlockActions> = (get: BlockGetter<P>, set: BlockSetter<P>) => A

export interface BlockSpec<P extends BlockProps, A extends BlockActions> {
  name: string
  builder: BlockBuilder<P>
  actionsBuilder: BlockActionsBuilder<P, A>
  behaviors: string[]
}

export type BehaviorBuilder<P extends BehaviorProps> = (props: Partial<P>) => P
export type BehaviorActionsBuilder<P extends BehaviorProps, A extends BehaviorActions> = (get: BehaviorGetter<P>, set: BehaviorSetter<P>) => A

export interface BehaviorSpec<P extends BehaviorProps, A extends BehaviorActions> {
  name: string
  builder: BehaviorBuilder<P>
  actionsBuilder: BehaviorActionsBuilder<P, A>
}

export class BlockRegistry {
  blocksByType: { [key: string]: any }
  behaviorsByType: { [key: string]: any }
  private currentSession: Session | null = null

  constructor() {
    this.blocksByType = {}
    this.behaviorsByType = {}
  }

  generateUUID(): string {
    return uuid.v4()
  }

  registerBlock<P extends BlockProps, A extends BlockActions>(spec: BlockSpec<P, A>): void {
    this.blocksByType[spec.name] = spec
  }

  registerBehavior<P extends BehaviorProps, A extends BehaviorActions>(spec: BehaviorSpec<P, A>): void {
    this.behaviorsByType[spec.name] = spec
  }

  createBlock<P extends BlockProps>(blockType: string, parent?: BlockProps, props: Partial<any> = {}): P {
    const blockSpec = this.blocksByType[blockType]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${blockType} not registered`)
    }

    // Generate a UUID if one is not provided
    if (props.uuid === '' || props.uuid === undefined) {
      props.uuid = this.generateUUID()
    }

    // Set the parent if provided
    if (parent !== undefined) {
      props.parent = parent.uuid
      parent.children.push(props.uuid)
    }

    let block = blockSpec.builder(props as Partial<P>)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      block = { ...block, ...behaviorSpec.builder(props) }
    })

    if (this.currentSession) {
      this.currentSession.addBlock(block)
    }

    return block
  }

  createBlockActions<P extends BlockProps, A extends BlockActions>(get: BlockGetter<P>, set: BlockSetter<P>): A {
    const block = get()
    const blockSpec = this.blocksByType[block.type]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${block.type} not registered`)
    }

    let blockActions = blockSpec.actionsBuilder(get, set)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      blockActions = { ...blockActions, ...behaviorSpec.actionsBuilder(get, set) }
    })
    return blockActions
  }

  hasBehavior(blockType: string, behaviorType: string): boolean {
    const blockSpec = this.blocksByType[blockType]
    return blockSpec !== undefined && behaviorType in blockSpec.behaviors
  }

  session(): Session {
    if (this.currentSession === null) {
      this.currentSession = new Session(this)
    }
    return this.currentSession
  }

  closeSession(): void {
    this.currentSession = null
  }
}

class Session {
  private blocks: BlockProps[] = []

  constructor(private blockRegistry: BlockRegistry) { }

  addBlock(block: BlockProps): void {
    this.blocks.push(block)
  }

  getBlocks(): BlockProps[] {
    return this.blocks
  }

  close(): void {
    this.blockRegistry.closeSession()
  }
}

export class DefaultBlockRegistry extends BlockRegistry {
  constructor() {
    super()

    // Register blocks
    this.registerBlock({
      name: 'aics:checkbox',
      builder: createCheckbox,
      actionsBuilder: createCheckboxActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:code',
      builder: createCode,
      actionsBuilder: createCodeActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:paragraph',
      builder: createParagraph,
      actionsBuilder: createParagraphActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:section',
      builder: createSection,
      actionsBuilder: createSectionActions,
      behaviors: ['aics:selectable', 'aics:collapsible']
    })
    this.registerBlock({
      name: 'aics:span',
      builder: createSpan,
      actionsBuilder: createSpanActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:tableRow',
      builder: createTableRow,
      actionsBuilder: createTableRowActions,
      behaviors: ['aics:selectable']
    })

    // Register layouts
    this.registerBlock({
      name: 'aics:list',
      builder: createList,
      actionsBuilder: createListActions,
      behaviors: []
    })
    this.registerBlock({
      name: 'aics:table',
      builder: createTable,
      actionsBuilder: createTableActions,
      behaviors: ['aics:selectable', 'aics:pageable']
    })
    this.registerBlock({
      name: 'aics:tree',
      builder: createTree,
      actionsBuilder: createTreeActions,
      behaviors: ['aics:selectable', 'aics:pageable']
    })

    // Register behaviors
    this.registerBehavior({
      name: 'aics:collapsible',
      builder: createCollapsible,
      actionsBuilder: createCollapsibleActions,
    })
    this.registerBehavior({
      name: 'aics:pageable',
      builder: createPageable,
      actionsBuilder: createPageableActions,
    })
    this.registerBehavior({
      name: 'aics:selectable',
      builder: createSelectable,
      actionsBuilder: createSelectableActions,
    })


  }
}
