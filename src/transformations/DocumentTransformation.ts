import { BlockStoreState } from "../core/BlockStore"
import { Document, DocumentID } from "../types/Document"
import { Block } from "../types/blocks"
import { AddBlock } from "./BlockStoreTransformation"

export interface DocumentTransformation {
  apply: (state: BlockStoreState, document: DocumentID) => BlockStoreState
}

export class AddRootBlock implements DocumentTransformation {
  private type = "aics:transformation:add-root-block"

  constructor(private block: Block) { }

  apply(state: BlockStoreState, document: string): BlockStoreState {
    state = new AddBlock(this.block).apply(state)
    const doc = state.documents.get(document)
    if (doc === undefined) {
      return state
    }
    state = new UpdateDocument({ blocks: [this.block.uuid] }).apply(state, document)
    return state
  }
}

export class UpdateDocument implements DocumentTransformation {
  private type = "aics:transformation:update-document"

  constructor(private updates: Partial<Document>) { }

  apply(state: BlockStoreState, uuid: DocumentID): BlockStoreState {
    const document = state.documents.get(uuid)
    if (document === undefined) {
      return state
    }
    const newDocument = { ...document, ...this.updates }
    const newDocuments = new Map(state.documents)
    newDocuments.set(uuid, newDocument)
    return { ...state, documents: newDocuments }
  }
}

export class DeleteDocument implements DocumentTransformation {
  private type = "aics:transformation:delete-document"

  apply(state: BlockStoreState, uuid: string): BlockStoreState {
    const document = state.documents.get(uuid)
    if (document === undefined) {
      return state
    }
    const newDocuments = new Map(state.documents)
    newDocuments.delete(uuid)
    return { ...state, documents: newDocuments }
  }
}
