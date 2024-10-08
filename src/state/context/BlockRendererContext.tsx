import React, { createContext, ReactNode, useRef } from 'react'
import { type BlockRenderer } from '../../components/BlockRenderer'

interface BlockRendererContextProps {
  renderer: BlockRenderer | undefined
  setRenderer: (renderer: BlockRenderer) => void
}

export const BlockRendererContext = createContext<BlockRendererContextProps>({
  renderer: undefined,
  setRenderer: (renderer: BlockRenderer) => { }
})

export interface BlockRendererProviderProps {
  renderer?: BlockRenderer
  children: ReactNode
}

export const BlockRendererProvider = ({ renderer, children }: BlockRendererProviderProps): JSX.Element => {
  const rendererRef = useRef<BlockRenderer>()
  if (renderer !== undefined) {
    rendererRef.current = renderer
  }

  return (
    <BlockRendererContext.Provider value={{ renderer: rendererRef.current, setRenderer: () => { } }} >
      {children}
    </BlockRendererContext.Provider>
  )
}