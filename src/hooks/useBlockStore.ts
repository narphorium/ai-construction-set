import { useContext } from 'react'
import { useStore } from 'zustand'
import { BlockStoreActions, type BlockStore } from '../state/BlockStore'
import { BlockStoreContext } from '../state/context/BlockStoreContext'
import shallow from 'zustand/shallow'

export const useBlockStoreSelector = <Selected>(
  selector: (state: BlockStore) => Selected,
  equalityFn?: (a: Selected, b: Selected) => boolean
): Selected => {
  const blockStoreContext = useContext(BlockStoreContext)

  if (blockStoreContext === null) {
    throw new Error('useBlockStoreSelector must be used within BlockStoreProvider')
  }

  return useStore(blockStoreContext, selector, equalityFn)
}

export const useBlockStoreActions = (): BlockStoreActions => {
  const blockStoreContext = useContext(BlockStoreContext)

  if (blockStoreContext === null) {
    throw new Error('useBlockStoreActions must be used within BlockStoreProvider')
  }

  return useStore(blockStoreContext, state => ({
    applyBlockMutations: state.applyBlockMutations,
    addDocument: state.addDocument,
    getDocument: state.getDocument,
    updateDocument: state.updateDocument,
    addRootBlock: state.addRootBlock,
    deleteDocument: state.deleteDocument,

    addBlock: state.addBlock,
    addChildBlock: state.addChildBlock,
    getBlock: state.getBlock,
    getChildBlocks: state.getChildBlocks,
    findBlock: state.findBlock,
    findBlocks: state.findBlocks,
    updateBlock: state.updateBlock,
    deleteBlock: state.deleteBlock,

    getBehavior: state.getBehavior,
    updateBehavior: state.updateBehavior
  }), shallow)
}
