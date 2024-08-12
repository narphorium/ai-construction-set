import { BlockStore } from "."
import { BehaviorActions, BehaviorProps, createCollapsibleActions, createPageableActions, createSelectableActions } from "./../types/behaviors"
import { BlockActions, BlockID, BlockProps, createCheckboxActions, createCodeActions, createParagraphActions, createSectionActions, createSpanActions } from "./../types/blocks"
import { createListActions, createTableRowActions, createTableActions, createTreeActions } from "../types/layouts"
import { createCollapsible, createPageable, createSelectable } from "./../types/behaviors"
import { Block, createCheckbox, createCode, createParagraph, createSection, createSpan } from "./../types/blocks"
import { createList, createTree, createTable, createTableRow } from "../types/layouts"

export type BlockBuilder<T extends Block> = (props: Partial<T>) => T

export type BlockActionsBuilder<T extends BlockActions> = (store: BlockStore, blockId: BlockID) => T

export interface BlockSpec<P extends BlockProps, A extends BlockActions> {
  name: string
  builder: BlockBuilder<P>
  actionsBuilder: BlockActionsBuilder<A>
  behaviors: string[]
}

export type BehaviorBuilder<T extends BehaviorActions> = (props: Partial<T>) => T

export type BehaviorActionsBuilder<T extends BehaviorActions> = (store: BlockStore, blockId: BlockID) => T

export interface BehaviorSpec<P extends BehaviorProps, A extends BehaviorActions> {
  name: string
  builder: BehaviorBuilder<P>
  actionsBuilder: BehaviorActionsBuilder<A>
}

export class BlockRegistry {
  blocksByType: { [key: string]: any }
  behaviorsByType: { [key: string]: any }

  constructor() {
    this.blocksByType = {}
    this.behaviorsByType = {}
  }

  registerBlock<P extends BlockProps, A extends BlockActions>(spec: BlockSpec<P, A>): void {
    this.blocksByType[spec.name] = spec
  }

  registerBehavior<P extends BehaviorProps, A extends BehaviorActions>(spec: BehaviorSpec<P, A>): void {
    this.behaviorsByType[spec.name] = spec
  }

  createBlock<P extends BlockProps>(blockType: string, props: Partial<any> = {}): P {
    const blockSpec = this.blocksByType[blockType]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${blockType} not registered`)
    }

    let block = blockSpec.builder(props as Partial<P>)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      block &= behaviorSpec.builder(props)
    })
    return block
  }

  createBlockActions<A extends BlockActions>(store: BlockStore, block: Block): A {
    const blockSpec = this.blocksByType[block.type]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${block.type} not registered`)
    }

    let blockActions = blockSpec.actionsBuilder(store, block.uuid)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      blockActions = { ...blockActions, ...behaviorSpec.actionsBuilder(store, block.uuid) }
    })
    return blockActions
  }

  hasBehavior(blockType: string, behaviorType: string): boolean {
    const blockSpec = this.blocksByType[blockType]
    return blockSpec !== undefined && behaviorType in blockSpec.behaviors
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
