import * as uuid from 'uuid'
import { type StoreApi, createStore } from 'zustand/vanilla'
import { type Block } from '../data/blocks'
import { Behavior } from '../data/behaviors'

export interface BlockStoreState {
  rootBlocks: string[]
  blocks: Map<string, Block>
}

export interface BlockStoreActions {
  getRootBlockIds: () => string[]
  getBlock: <T extends Block>(uuid: string) => T | undefined
  getBehavior: <T extends Behavior>(uuid: string) => T | undefined
  addBlock: <T extends Block>(block: T) => string
  addRootBlock: <T extends Block>(block: T) => string
  addChildBlock: <T extends Block>(block: T, parent: string) => string
  updateBlock: <T extends Block>(uid: string, updates: Partial<T>) => void
  updateBehavior: <T extends Behavior>(uid: string, updates: Partial<T>) => void
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

const addBlock = <T extends Block>(state: BlockStoreState, block: T): BlockStoreState => {
  const newBlocks = new Map(state.blocks)
  if (block.uuid === '') {
    block.uuid = getGUID()
  }
  newBlocks.set(block.uuid, block)
  return { ...state, blocks: newBlocks }
}

const updateBlock = <T extends Block>(state: BlockStoreState, uuid: string, updates: Partial<T>): BlockStoreState => {
  const block = state.blocks.get(uuid)
  if (block === undefined) {
    return state
  }
  const newBlock = { ...block, ...updates }
  const newBlocks = new Map(state.blocks)
  newBlocks.set(uuid, newBlock)
  return { ...state, blocks: newBlocks }
}

const updateBehavior = <T extends Behavior>(state: BlockStoreState, uuid: string, updates: Partial<T>): BlockStoreState => {
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

    getBehavior: <T extends Behavior>(uuid: string) => get().blocks.get(uuid) as T | undefined,

    addBlock: (block: Block): string => {
      set((state) => addBlock(state, block))
      return block.uuid
    },

    addRootBlock: <T extends Block>(block: T): string => {
      // FIXME: There should just be a document that is the root
      set((state) => addRootBlock(state, block))
      return block.uuid
    },

    addChildBlock: <T extends Block>(block: T, parent: string): string => {
      set((state) => addBlock(state, block))
      return block.uuid
    },

    updateBlock: <T extends Block>(uuid: string, updates: Partial<T>) => {
      set((state) => updateBlock(state, uuid, updates))
    },

    updateBehavior: <T extends Behavior>(uuid: string, updates: Partial<T>) => {
      set((state) => updateBehavior(state, uuid, updates))
    },

    deleteBlock: (uuid: string) => {
      set((state) => deleteBlock(state, uuid))
    }
  }))
}
