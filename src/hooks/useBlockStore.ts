import { useContext } from 'react'
import { useStore } from 'zustand'
import { type BlockStore } from '../state/BlockStore'
import { BlockStoreContext } from '../state/context'

export const useBlockStore = (): BlockStore => {
  const blockStoreContext = useContext(BlockStoreContext)

  if (blockStoreContext === null) {
    throw new Error('useBlockStore must be used within BlockStoreProvider')
  }

  return useStore(blockStoreContext)
}
