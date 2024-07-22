import * as uuid from 'uuid'
import { type StoreApi, createStore } from 'zustand/vanilla'
import { type Block } from '../data/blocks'

export interface BlockStoreState {
  rootBlocks: string[]
  blocks: Map<string, Block>
}

export interface BlockStoreActions {
  getRootBlockIds: () => string[]
  getBlock: (uuid: string) => Block | undefined
  addBlock: (block: Block) => string
  addRootBlock: (block: Block) => string
  addChildBlock: (block: Block, parent: string) => string
  updateBlock: (uid: string, updates: Partial<any>) => void
  deleteBlock: (uid: string) => void
}

export type BlockStore = BlockStoreState & BlockStoreActions

export const defaultInitState: BlockStoreState = {
  rootBlocks: [],
  blocks: new Map<string, Block>()
}

const getGUID = (): string => {
  return uuid.v4()
}

const addBlock = (state: BlockStoreState, block: Block): BlockStoreState => {
  const newBlocks = new Map(state.blocks)
  if (block.uuid === '') {
    block.uuid = getGUID()
  }
  newBlocks.set(block.uuid, block)
  return { ...state, blocks: newBlocks }
}

const updateBlock = (state: BlockStoreState, uuid: string, updates: Partial<Block>): BlockStoreState => {
  const block = state.blocks.get(uuid)
  if (block === undefined) {
    return state
  }
  const newBlock = { ...block, ...updates }
  const newBlocks = new Map(state.blocks)
  newBlocks.set(uuid, newBlock)
  return { ...state, blocks: newBlocks }
}

const addRootBlock = (state: BlockStoreState, block: Block): BlockStoreState => {
  state = addBlock(state, block)
  return { ...state, rootBlocks: [...state.rootBlocks, block.uuid] }
}

const getChildBlockIds = (state: BlockStoreState, parent: Block): string[] => {
  let childIds: string[] = []
  state.blocks.forEach((block) => {
    if (block.parent === parent.uuid) {
      childIds.push(block.uuid)
    }
  })
  return childIds
}

const deleteBlock = (state: BlockStoreState, uuid: string): BlockStoreState => {
  const block = state.blocks.get(uuid)
  if (block === undefined) {
    return state
  }
  const newBlocks = new Map(state.blocks)
  newBlocks.delete(uuid)
  return { ...state, blocks: newBlocks }
}

export const createBlockStore = (
  initState: BlockStoreState = defaultInitState
): StoreApi<BlockStore> => {
  return createStore<BlockStore>()((set, get) => ({
    ...initState,

    getRootBlockIds: () => { return get().rootBlocks },

    getChildBlockIds: (parent: Block) => { return getChildBlockIds(get(), parent) },

    getBlock: <T extends Block>(uuid: string) => get().blocks.get(uuid) as T | undefined,

    addBlock: (block: Block): string => {
      set((state) => addBlock(state, block))
      return block.uuid
    },

    addRootBlock: (block: Block): string => {
      // FIXME: There should just be a document that is the root
      set((state) => addRootBlock(state, block))
      return block.uuid
    },

    addChildBlock: (block: Block, parent: string): string => {
      set((state) => addBlock(state, block))
      return block.uuid
    },

    updateBlock: (uuid: string, updates: Partial<any>) => {
      set((state) => updateBlock(state, uuid, updates))
    },

    deleteBlock: (uuid: string) => {
      set((state) => deleteBlock(state, uuid))
    }
  }))
}
