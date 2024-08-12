import { Block } from "../types/blocks"
import { Document } from "../types/Document"

export interface BlockStoreState {
  documents: Map<string, Document>
  blocks: Map<string, Block>
  children: Map<string, string[]>
}