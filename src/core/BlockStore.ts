import { type StoreApi, createStore } from 'zustand/vanilla'
import { Block, BlockID, BlockProps } from '../types/blocks'
import { Behavior, BehaviorProps } from '../types/behaviors'
import { DocumentID, DocumentProps, type Document } from '../types/Document'
import { BlockQuery } from './BlockQuery'
import { BlockRegistry } from './BlockRegistry'
import { ChildSelector } from '../selectors'
import { AddChildBlock, BlockTransformation, DeleteBlock, UpdateBehavior, UpdateBlock } from '../transformations/BlockTransformation'
import { AddRootBlock, DeleteDocument, UpdateDocument } from '../transformations/DocumentTransformation'
import { AddBlock, AddDocument } from '../transformations/BlockStoreTransformation'

export interface BlockStoreState {
  documents: Map<string, Document>
  blocks: Map<string, Block>
}

export interface BlockStoreActions {
  // General
  applyBlockTransformations: (transformations: BlockTransformation[]) => void

  // Documents
  addDocument: (document: Document) => DocumentID
  getDocument: (uuid: DocumentID) => Document | undefined
  updateDocument: (uuid: DocumentID, updates: Partial<Document> | ((state: DocumentProps) => Partial<DocumentProps>)) => void
  addRootBlock: <T extends Block>(block: T, document: DocumentID) => BlockID
  deleteDocument: (uuid: DocumentID) => void

  // Blocks
  addBlock: <T extends Block>(block: T) => string

  addChildBlock: <T extends Block>(block: T, parent: BlockID) => string
  getBlock: <T extends Block>(uuid: string) => T | undefined
  getChildBlocks: <T extends Block>(parent: BlockID) => T[]
  findBlock: (root: Document | Block, selector: BlockQuery, registry: BlockRegistry) => Block | undefined
  findBlocks: (root: Document | Block, selector: BlockQuery, registry: BlockRegistry) => Block[]
  updateBlock: <T extends BlockProps>(uuid: BlockID, updates: Partial<T> | ((state: T) => Partial<T>)) => void
  deleteBlock: (uuid: BlockID) => void

  // Behaviors
  getBehavior: <T extends Behavior>(uuid: string) => T | undefined
  updateBehavior: <T extends Behavior>(uid: string, updates: Partial<T> | ((state: T) => Partial<T>)) => void
}

export type BlockStore = BlockStoreState & BlockStoreActions

export const defaultInitState: BlockStoreState = {
  documents: new Map<string, Document>(),
  blocks: new Map<string, Block>(),
}

const findBlocks = (state: BlockStoreState, root: Block | Document, query: BlockQuery): Block[] => {
  let roots: Block[] = [];
  if (root instanceof Document) {
    (root as Document).blocks.forEach((blockId) => {
      const block = state.blocks.get(blockId)
      if (block !== undefined) {
        roots.push(block)
      }
    })
  } else {
    roots.push(root as Block);
  }

  let rootMatches: Block[] = [];
  // Loop through each root block and apply all matchers
  for (const block of roots) {
    let matches: Block[] = [block];
    // Apply all matchers to the current block
    query.getMatchers().forEach((matcher) => {
      let newMatches: Block[] = [];
      // Add the results of the matcher to the new matches
      matches.forEach((block) => {
        newMatches = newMatches.concat(matcher.run(state, block));
      });
      matches = newMatches;
    });
    rootMatches = rootMatches.concat(matches);
  }
  return rootMatches;
}

export const createBlockStore = (
  initState: BlockStoreState = defaultInitState,
  registry: BlockRegistry = new BlockRegistry()
): StoreApi<BlockStore> => {
  return createStore<BlockStore>()((set, get) => ({
    ...initState,

    getDocument(uuid: DocumentID) {
      return get().documents.get(uuid)
    },

    getChildBlockIds: (parent: Block) => new ChildSelector(registry).run(get(), parent),

    getBlock: <T extends Block>(uuid: BlockID) => get().blocks.get(uuid) as T | undefined,

    getBehavior: <T extends Behavior>(uuid: BlockID) => get().blocks.get(uuid) as T | undefined,

    getChildBlocks: <T extends Block>(parent: BlockID) => {
      const parentBlock = get().blocks.get(parent)
      if (parentBlock === undefined) {
        return []
      }
      return new ChildSelector(registry).select(get(), parentBlock) as T[]
    },

    addDocument(document: Document) {
      set((state) => new AddDocument(document).apply(state))
      return document.uuid
    },

    addBlock: (block: Block): string => {
      set((state) => new AddBlock(block).apply(state))
      return block.uuid
    },

    addRootBlock: <T extends Block>(block: T, document: DocumentID): string => {
      set((state) => new AddRootBlock(block).apply(state, document))
      return block.uuid
    },

    addChildBlock: <T extends Block>(block: T, parent: BlockID): string => {
      set((state) => new AddChildBlock(block, parent).apply(state))
      return block.uuid
    },

    updateDocument: (document: DocumentID, updates: Partial<DocumentProps> | ((state: DocumentProps) => Partial<DocumentProps>)) => {
      set((state) => {
        if (typeof updates === 'function') {
          const state = get().documents.get(document) as DocumentProps
          if (state === undefined) {
            throw new Error('Document not found')
          }
          updates = updates(state)
        }
        return new UpdateDocument(updates).apply(state, document)
      })
    },

    updateBlock: <T extends BlockProps>(block: BlockID, updates: Partial<T> | ((state: T) => Partial<T>)) => {
      set((state) => {
        if (typeof updates === 'function') {
          const state = (get().blocks.get(block) as unknown) as T
          if (state === undefined) {
            throw new Error('Block not found')
          }
          updates = updates(state)
        }
        return new UpdateBlock<T>(updates, block).apply(state)
      })
    },

    updateBehavior: <T extends BehaviorProps>(block: BlockID, updates: Partial<T> | ((state: T) => Partial<T>)) => {
      set((state) => {
        if (typeof updates === 'function') {
          const state = (get().blocks.get(block) as unknown) as T
          if (state === undefined) {
            throw new Error('Behavior not found')
          }
          updates = updates(state)
        }
        return new UpdateBehavior<T>(updates, block).apply(state)
      })
    },

    deleteDocument: (document: DocumentID) => {
      set((state) => new DeleteDocument().apply(state, document))
    },

    deleteBlock: (block: BlockID) => {
      set((state) => new DeleteBlock(block).apply(state))
    },

    findBlock: (root: Block | Document, selector: BlockQuery) => {
      const matches = findBlocks(get(), root, selector)
      return matches.length > 0 ? matches[0] : undefined
    },

    findBlocks(root: Block | Document, selector: BlockQuery) {
      return findBlocks(get(), root, selector)
    },

    applyBlockTransformations: (transformations: BlockTransformation[]) => {
      set((state: BlockStoreState) => {
        return transformations.reduce((acc, transformation) => transformation.apply(acc), state)
      })
    },
  })) as StoreApi<BlockStore>
}
