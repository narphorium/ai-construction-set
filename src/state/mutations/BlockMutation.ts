import { Behavior } from "../../types/behaviors";
import { Block, BlockID } from "../../types/blocks";
import { BlockStoreState } from "../BlockStoreState";
import { AddBlock, addChild, deleteChild } from "./BlockStoreMutation";

export interface BlockMutation {
  apply: (state: BlockStoreState, block: BlockID) => BlockStoreState
}

export class AddChildBlock implements BlockMutation {
  constructor(private block: Block) { }

  apply(state: BlockStoreState, uuid: BlockID): BlockStoreState {
    state = addChild(state, uuid, this.block.uuid)
    state = new AddBlock(this.block).apply(state)
    return state
  }
}

export class UpdateBlock<T extends Block> implements BlockMutation {
  constructor(private updates: Partial<T>) { }

  apply(state: BlockStoreState, uuid: BlockID): BlockStoreState {
    const block = state.blocks.get(uuid)
    if (block === undefined) {
      return state
    }
    const newBlock = { ...block, ...this.updates }
    const newBlocks = new Map(state.blocks)
    newBlocks.set(uuid, newBlock)

    if ('parent' in this.updates && this.updates.parent !== undefined) {
      state = deleteChild(state, uuid, uuid)
      state = addChild(state, this.updates.parent, uuid)
    }

    return { ...state, blocks: newBlocks }
  }
}

export class UpdateBehavior<T extends Behavior> implements BlockMutation {
  constructor(private updates: Partial<T>) { }
  apply(state: BlockStoreState, uuid: BlockID): BlockStoreState {
    const block = state.blocks.get(uuid)
    if (block === undefined) {
      return state
    }
    const newBlock = { ...block, ...this.updates }
    const newBlocks = new Map(state.blocks)
    newBlocks.set(uuid, newBlock)
    return { ...state, blocks: newBlocks }
  }
}

export class DeleteBlock implements BlockMutation {
  apply(state: BlockStoreState, uuid: BlockID): BlockStoreState {
    const block = state.blocks.get(uuid)
    if (block === undefined) {
      return state
    }
    const newBlocks = new Map(state.blocks)
    newBlocks.delete(uuid)

    if (block.parent !== undefined) {
      state = deleteChild(state, block.parent, uuid)
    }

    return { ...state, blocks: newBlocks }
  }
}