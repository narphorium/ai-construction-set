import { BlockStoreState } from "../BlockStore"
import { Document } from "../../types/Document"
import { Block, BlockID } from "../../types/blocks"

export const addChild = (state: BlockStoreState, parent: BlockID, uuid: BlockID): BlockStoreState => {
  const parentBlock = state.blocks.get(parent)
  if (parentBlock === undefined) {
    return state
  }
  const newParentBlock = { ...parentBlock, children: [...parentBlock.children, uuid] }
  return { ...state, blocks: new Map(state.blocks.set(parent, newParentBlock)) }
}

export const deleteChild = (state: BlockStoreState, parent: BlockID, uuid: BlockID) => {
  const parentBlock = state.blocks.get(parent)
  if (parentBlock === undefined) {
    return state
  }
  const newParentBlock = { ...parentBlock, children: parentBlock.children.filter((child) => child !== uuid) }
  return { ...state, blocks: new Map(state.blocks.set(parent, newParentBlock)) }
}

export interface BlockStoreTransformation {
  apply: (state: BlockStoreState) => BlockStoreState
}

export class AddDocument implements BlockStoreTransformation {
  private type = "aics::add-document" 

  constructor(private document: Document) { }

  apply(state: BlockStoreState): BlockStoreState {
    const newDocuments = new Map(state.documents)
    newDocuments.set(this.document.uuid, this.document)
    return { ...state, documents: newDocuments }
  }
}

export class AddBlock<T extends Block> implements BlockStoreTransformation {
  private type = "aics:transformation:add-block" 

  constructor(private block: T) { }

  apply(state: BlockStoreState): BlockStoreState {
    const newBlocks = new Map(state.blocks)
    newBlocks.set(this.block.uuid, this.block)

    if (this.block.parent !== undefined) {
      state = addChild(state, this.block.parent, this.block.uuid)
    }

    return { ...state, blocks: newBlocks }
  }
}