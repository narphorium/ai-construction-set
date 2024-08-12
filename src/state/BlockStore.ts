import * as uuid from 'uuid'
import { type StoreApi, createStore } from 'zustand/vanilla'
import { Block, BlockID, BlockProps } from './../types/blocks'
import { Behavior, BehaviorProps } from './../types/behaviors'
import { DocumentID, DocumentProps, type Document } from '../types/Document'
import { BlockMatcher, BlockQuery, Matchable } from './matchers'
import { BlockRegistry } from './BlockRegistry'
import { BlockSelector, ChildSelector } from './selectors'
import { AddBlock, AddChildBlock, AddDocument, AddRootBlock, BlockMutation, DeleteBlock, DeleteDocument, UpdateBehavior, UpdateBlock, UpdateDocument } from './mutations'


export interface BlockStoreState {
  documents: Map<string, Document>
  blocks: Map<string, Block>
  children: Map<string, string[]>
}

export interface BlockStoreActions {
  applyBlockMutation: (mutation: BlockMutation, block: BlockID) => void

  // Documents
  addDocument: (document: Document) => string
  getDocument: (uuid: DocumentID) => Document | undefined
  updateDocument: (uuid: DocumentID, updates: Partial<Document> | ((state: DocumentProps) => Partial<DocumentProps>)) => void
  addRootBlock: <T extends Block>(block: T, document: DocumentID) => string
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
  children: new Map<string, string[]>()
}

export const getGUID = (): string => {
  return uuid.v4()
}

// Type guard functions
function isBlockSelector(matcher: Matchable): matcher is BlockSelector {
  return 'select' in matcher;
}

function isBlockMatcher(matcher: Matchable): matcher is BlockMatcher {
  return 'match' in matcher;
}

const findBlocks = (state: BlockStoreState, root: Block | Document, query: BlockQuery, registry: BlockRegistry): Block[] => {
  let matches: BlockID[] = [];
  if (root instanceof Document) {
    matches = matches.concat((root as Document).blocks);
  } else {
    matches.push((root as Block).uuid);
  }

  query.getMatchers().forEach((matcher) => {
    if (isBlockSelector(matcher)) {
      matches = matches.reduce((acc, blockId) => acc.concat((matcher as BlockSelector).select(state, blockId)), [] as BlockID[]);
    } else if (isBlockMatcher(matcher)) {
      matches = matches.filter((blockId) => {
        const block = state.blocks.get(blockId);
        return block !== undefined && (matcher as BlockMatcher).match(registry, block)
      });
    }
  });

  return matches.map((blockId) => state.blocks.get(blockId) as Block);
}

export const createBlockStore = (
  initState: BlockStoreState = defaultInitState
): StoreApi<BlockStore> => {
  return createStore<BlockStore>()((set, get) => ({
    ...initState,

    getDocument(uuid: DocumentID) {
      return get().documents.get(uuid)
    },

    getChildBlockIds: (parent: Block) => new ChildSelector().select(get(), parent.uuid),

    getBlock: <T extends Block>(uuid: BlockID) => get().blocks.get(uuid) as T | undefined,

    getBehavior: <T extends Behavior>(uuid: BlockID) => get().blocks.get(uuid) as T | undefined,

    getChildBlocks: <T extends Block>(parent: BlockID) => {
      return new ChildSelector().select(get(), parent).map((uuid) => get().blocks.get(uuid) as T)
    },

    addDocument(document) {
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
      set((state) => new AddChildBlock(block).apply(state, parent))
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
        return new UpdateBlock<T>(updates).apply(state, block)
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
        return new UpdateBehavior<T>(updates).apply(state, block)
      })
    },

    deleteDocument: (document: DocumentID) => {
      set((state) => new DeleteDocument().apply(state, document))
    },

    deleteBlock: (block: BlockID) => {
      set((state) => new DeleteBlock().apply(state, block))
    },

    findBlock: (root: Block | Document, selector: BlockQuery, registry: BlockRegistry) => {
      const matches = findBlocks(get(), root, selector, registry)
      return matches.length > 0 ? matches[0] : undefined
    },

    findBlocks(root: Block | Document, selector: BlockQuery, registry: BlockRegistry) {
      return findBlocks(get(), root, selector, registry)
    },

    applyBlockMutation: (mutation: BlockMutation, block: BlockID) => {
      set((state) => mutation.apply(state, block))
    },
  })) as StoreApi<BlockStore>
}
