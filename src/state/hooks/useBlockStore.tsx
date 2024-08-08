import React, { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { createBlockStore, type BlockStore } from '../BlockStore'

export const BlockStoreContext = createContext(createBlockStore())

export interface BlockStoreProviderProps {
  store?: StoreApi<BlockStore>
  children: ReactNode
}

export const BlockStoreProvider = ({ store, children }: BlockStoreProviderProps): JSX.Element => {
  const storeRef = useRef<StoreApi<BlockStore>>()
  if (store !== undefined) {
    storeRef.current = store
  } else if (storeRef.current === undefined) {
    storeRef.current = createBlockStore()
  }

  return (
    <BlockStoreContext.Provider value={storeRef.current}>
      {children}
    </BlockStoreContext.Provider>
  )
}

export const useBlockStore = (): BlockStore => {
  const blockStoreContext = useContext(BlockStoreContext)

  if (blockStoreContext === null) {
    throw new Error('useBlockStore must be used within BlockStoreProvider')
  }

  return useStore(blockStoreContext)
}
