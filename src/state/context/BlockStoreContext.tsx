import React, { type ReactNode, createContext, useContext, useRef } from 'react'
import { type StoreApi } from 'zustand'

import { createBlockStore, type BlockStore } from '../BlockStore'
import { useBlockRegistry } from '../../hooks/useBlockRegistry'

export const BlockStoreContext = createContext(createBlockStore())

export interface BlockStoreProviderProps {
  store?: StoreApi<BlockStore>
  children: ReactNode
}

export const BlockStoreProvider = ({ store, children }: BlockStoreProviderProps): JSX.Element => {
  const registry = useBlockRegistry()
  if (registry === undefined) {
    throw new Error('BlockRegistryContext is required')
  }
  const storeRef = useRef<StoreApi<BlockStore>>()
  if (store !== undefined) {
    storeRef.current = store
  } else if (storeRef.current === undefined) {
    storeRef.current = createBlockStore(undefined, registry)
  }

  return (
    <BlockStoreContext.Provider value={storeRef.current}>
      {children}
    </BlockStoreContext.Provider>
  )
}