import { Behavior, createCollapsible, createPageable, createSelectable } from "./behaviors"
import { Block, createCode, createParagraph, createSection, createSpan, createTable, createTableRow } from "./blocks"
import { createCheckbox } from "./blocks/Checkbox"
import { createList, createTree } from "./layouts"

export interface BlockSpec<T extends Block> {
  name: string
  builder: (props: Partial<T>) => any
  behaviors: string[]
}

export interface BehaviorSpec<T extends Behavior> {
  name: string
  builder: (props: Partial<T>) => any
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
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:code',
      builder: createCode,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:paragraph',
      builder: createParagraph,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:section',
      builder: createSection,
      behaviors: ['aics:selectable', 'aics:collapsible']
    })
    this.registerBlock({
      name: 'aics:span',
      builder: createSpan,
      behaviors: ['aics:selectable']
    })
    this.registerBlock({
      name: 'aics:tableRow',
      builder: createTableRow,
      behaviors: ['aics:selectable']
    })


    // Register layouts
    this.registerBlock({
      name: 'aics:list',
      builder: createList,
      behaviors: []
    })
    this.registerBlock({
      name: 'aics:table',
      builder: createTable,
      behaviors: ['aics:selectable', 'aics:pageable']
    })
    this.registerBlock({
      name: 'aics:tree',
      builder: createTree,
      behaviors: ['aics:selectable', 'aics:pageable']
    })

    // Register behaviors
    this.registerBehavior({
      name: 'aics:collapsible',
      builder: createCollapsible,
    })
    this.registerBehavior({
      name: 'aics:selectable',
      builder: createSelectable,
    })
    this.registerBehavior({
      name: 'aics:pageable',
      builder: createPageable,
    })


  }
}
