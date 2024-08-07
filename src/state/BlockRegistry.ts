import { BlockStore } from "."
import { BehaviorActions, BehaviorProps, createCollapsibleActions, createPageableActions, createSelectableActions } from "./behaviors"
import { BlockActions, BlockProps, createCheckboxActions, createCodeActions, createParagraphActions, createSectionActions, createSpanActions } from "./blocks"
import { createListActions, createTableRowActions, createTableActions, createTreeActions } from "./layouts"
import { createCollapsible, createPageable, createSelectable } from "./behaviors"
import { Block, createCheckbox, createCode, createParagraph, createSection, createSpan } from "./blocks"
import { createList, createTree, createTable, createTableRow } from "./layouts"

export type BlockBuilder<T extends Block> = (props: Partial<T>) => T

export type BlockServiceBuilder<T extends BlockActions> = (store: BlockStore, blockId: string) => T

export interface BlockSpec<P extends BlockProps, A extends BlockActions> {
  name: string
  builder: BlockBuilder<P>
  service: BlockServiceBuilder<A>
  behaviors: string[]
}

export type BehaviorBuilder<T extends BehaviorActions> = (props: Partial<T>) => T

export type BehaviorServiceBuilder<T extends BehaviorActions> = (store: BlockStore, blockId: string) => T

export interface BehaviorSpec<P extends BehaviorProps, A extends BehaviorActions> {
  name: string
  builder: BehaviorBuilder<P>
  service: BehaviorServiceBuilder<A>
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

  createBlock<T extends Block>(blockType: string, props: Partial<any> = {}): T {
    const blockSpec = this.blocksByType[blockType]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${blockType} not registered`)
    }

    let block = blockSpec.builder(props as Partial<T>)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      block &= behaviorSpec.builder(props)
    })
    return block
  }

  createBlockService<T extends BlockActions>(store: BlockStore, blockId: string): T {
    const block = store.getBlock(blockId)
    if (block === undefined) {
      throw new Error(`Block ${blockId} not found`)
    }
    const blockSpec = this.blocksByType[block.type]
    if (blockSpec === undefined) {
      throw new Error(`Block type ${block.type} not registered`)
    }

    let service = blockSpec.service(store, blockId)
    blockSpec.behaviors.forEach((behaviorType: string) => {
      const behaviorSpec = this.behaviorsByType[behaviorType]
      if (behaviorSpec === undefined) {
        throw new Error(`Behavior type ${behaviorType} not registered`)
      }
      service &= behaviorSpec.service(store, blockId)
    })
    return service
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
      service: createCheckboxActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:code',
      builder: createCode,
      service: createCodeActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:paragraph',
      builder: createParagraph,
      service: createParagraphActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:section',
      builder: createSection,
      service: createSectionActions,
      behaviors: ['aics:selectable', 'aics:collapsible']
    })
    this.registerBlock({
      name: 'aics:span',
      builder: createSpan,
      service: createSpanActions,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:tableRow',
      builder: createTableRow,
      service: createTableRowActions,
      behaviors: ['aics:selectable']
    })


    // Register layouts
    this.registerBlock({
      name: 'aics:list',
      builder: createList,
      service: createListActions,
      behaviors: []
    })
    this.registerBlock({
      name: 'aics:table',
      builder: createTable,
      service: createTableActions,
      behaviors: ['aics:selectable', 'aics:pageable']
    })
    this.registerBlock({
      name: 'aics:tree',
      builder: createTree,
      service: createTreeActions,
      behaviors: ['aics:selectable', 'aics:pageable']
    })

    // Register behaviors
    this.registerBehavior({
      name: 'aics:collapsible',
      builder: createCollapsible,
      service: createCollapsibleActions,
    })
    this.registerBehavior({
      name: 'aics:pageable',
      builder: createPageable,
      service: createPageableActions,
    })
    this.registerBehavior({
      name: 'aics:selectable',
      builder: createSelectable,
      service: createSelectableActions,
    })


  }
}
