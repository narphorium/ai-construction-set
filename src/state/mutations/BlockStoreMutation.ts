import { BlockStoreState, getGUID } from "../BlockStore"
import { Document } from "../../types/Document"
import { Block, BlockID } from "../../types/blocks"

export const addChild = (state: BlockStoreState, parent: BlockID, uuid: BlockID): BlockStoreState => {
  const children = state.children.get(parent) || []
  children.push(uuid)
  return { ...state, children: new Map(state.children.set(parent, children)) }
}

export const deleteChild = (state: BlockStoreState, parent: BlockID, uuid: BlockID) => {
  const children = state.children.get(parent)
  if (children !== undefined) {
    const newChildren = children.filter((child) => child !== uuid)
    state = { ...state, children: new Map(state.children.set(parent, newChildren)) }
  }
  return state
}

export interface BlockStoreMutation {
  apply: (state: BlockStoreState) => BlockStoreState
}

export class AddDocument implements BlockStoreMutation {

  constructor(private document: Document) { }

  apply(state: BlockStoreState): BlockStoreState {
    const newDocuments = new Map(state.documents)
    if (this.document.uuid === '') {
      this.document.uuid = getGUID()
    }
    newDocuments.set(this.document.uuid, this.document)
    return { ...state, documents: newDocuments }
  }
}

export class AddBlock<T extends Block> implements BlockStoreMutation {
  constructor(private block: T) { }

  apply(state: BlockStoreState): BlockStoreState {
    const newBlocks = new Map(state.blocks)
    if (this.block.uuid === '') {
      this.block.uuid = getGUID()
    }
    newBlocks.set(this.block.uuid, this.block)

    if (this.block.parent !== undefined) {
      state = addChild(state, this.block.parent, this.block.uuid)
    }

    return { ...state, blocks: newBlocks }
  }
}