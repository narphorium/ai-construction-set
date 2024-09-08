import { Behavior } from "../../types/behaviors";
import { Block, BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStore";
import { AddBlock, addChild, deleteChild } from "./BlockStoreMutation";

export interface BlockMutation {
  apply: (state: BlockStoreState) => BlockStoreState
}

export class AddChildBlock implements BlockMutation {
  private type = "aics:mutation:add-child-block"
  constructor(private block: Block, private parent: BlockID) { }

  apply(state: BlockStoreState): BlockStoreState {
    state = addChild(state, this.parent, this.block.uuid)
    state = new AddBlock(this.block).apply(state)
    return state
  }
}

export class UpdateBlock<T extends Block> implements BlockMutation {
  private type = "aics:mutation:update-block"
  constructor(private updates: Partial<T>, private parent: BlockID) { }

  apply(state: BlockStoreState): BlockStoreState {
    const block = state.blocks.get(this.parent)
    if (block === undefined) {
      return state
    }
    const newBlock = { ...block, ...this.updates }
    const newBlocks = new Map(state.blocks)
    newBlocks.set(this.parent, newBlock)

    if ('parent' in this.updates && this.updates.parent !== undefined) {
      state = deleteChild(state, this.parent, this.parent)
      state = addChild(state, this.updates.parent, this.parent)
    }

    return { ...state, blocks: newBlocks }
  }
}

export class UpdateBehavior<T extends Behavior> implements BlockMutation {
  private type = "aics:mutation:update-behavior"
  constructor(private updates: Partial<T>, private parent: BlockID) { }
  apply(state: BlockStoreState): BlockStoreState {
    const block = state.blocks.get(this.parent)
    if (block === undefined) {
      return state
    }
    const newBlock = { ...block, ...this.updates }
    const newBlocks = new Map(state.blocks)
    newBlocks.set(this.parent, newBlock)
    return { ...state, blocks: newBlocks }
  }
}

export class DeleteBlock implements BlockMutation {
  private type = "aics:mutation:delete-block"
  constructor(private parent: BlockID) { }
  apply(state: BlockStoreState): BlockStoreState {
    const block = state.blocks.get(this.parent)
    if (block === undefined) {
      return state
    }
    const newBlocks = new Map(state.blocks)
    newBlocks.delete(this.parent)

    if (block.parent !== undefined) {
      state = deleteChild(state, block.parent, this.parent)
    }

    return { ...state, blocks: newBlocks }
  }
}