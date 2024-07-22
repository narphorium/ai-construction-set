import { BlockStore } from "../state"
import { createCollapsibleService, createPageableService, createSelectableService } from "../state/services/behaviors"
import { createCheckboxService, createCodeService, createParagraphService, createSectionService, createSpanService } from "../state/services/blocks"
import { createListService, createTableRowService, createTableService, createTreeService } from "../state/services/layouts"
import { Behavior, createCollapsible, createPageable, createSelectable } from "./behaviors"
import { Block, createCheckbox, createCode, createParagraph, createSection, createSpan } from "./blocks"
import { createList, createTree, createTable, createTableRow } from "./layouts"

export type BlockBuilder<T extends Block> = (props: Partial<T>) => T

export type BlockService<T extends Block> = {}

export type BlockServiceBuilder<T extends Block> = (store: BlockStore, blockId: string) => BlockService<T>

export interface BlockSpec<T extends Block> {
  name: string
  builder: BlockBuilder<T>
  service: BlockServiceBuilder<T>
  behaviors: string[]
}

export type BehaviorBuilder<T extends Behavior> = (props: Partial<T>) => T

export type BehaviorService<T extends Behavior> = {}

export type BehaviorServiceBuilder<T extends Behavior> = (store: BlockStore, blockId: string) => BehaviorService<T>

export interface BehaviorSpec<T extends Behavior> {
  name: string
  builder: BehaviorBuilder<T>
  service: BehaviorServiceBuilder<T>
}

export class BlockRegistry {
  blocksByType: { [key: string]: any }
  behaviorsByType: { [key: string]: any }

  constructor() {
    this.blocksByType = {}
    this.behaviorsByType = {}
  }

  registerBlock<T extends Block>(spec: BlockSpec<T>): void {
    this.blocksByType[spec.name] = spec
  }

  registerBehavior<T extends Behavior>(spec: BehaviorSpec<T>): void {
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

  createBlockService<T extends Block>(store: BlockStore, blockId: string): BlockService<T> {
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
      service: createCheckboxService,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:code',
      builder: createCode,
      service: createCodeService,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:paragraph',
      builder: createParagraph,
      service: createParagraphService,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:section',
      builder: createSection,
      service: createSectionService,
      behaviors: ['aics:selectable', 'aics:collapsible']
    })
    this.registerBlock({
      name: 'aics:span',
      builder: createSpan,
      service: createSpanService,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:tableRow',
      builder: createTableRow,
      service: createTableRowService,
      behaviors: ['aics:selectable']
    })


    // Register layouts
    this.registerBlock({
      name: 'aics:list',
      builder: createList,
      service: createListService,
      behaviors: []
    })
    this.registerBlock({
      name: 'aics:table',
      builder: createTable,
      service: createTableService,
      behaviors: ['aics:selectable', 'aics:pageable']
    })
    this.registerBlock({
      name: 'aics:tree',
      builder: createTree,
      service: createTreeService,
      behaviors: ['aics:selectable', 'aics:pageable']
    })

    // Register behaviors
    this.registerBehavior({
      name: 'aics:collapsible',
      builder: createCollapsible,
      service: createCollapsibleService,
    })
    this.registerBehavior({
      name: 'aics:pageable',
      builder: createPageable,
      service: createPageableService,
    })
    this.registerBehavior({
      name: 'aics:selectable',
      builder: createSelectable,
      service: createSelectableService,
    })


  }
}
