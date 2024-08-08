import React, { createContext, ReactNode, useContext, useRef } from 'react'
import { DefaultBlockRenderer, type BlockRenderer } from '../../components/BlockRenderer'

interface BlockRendererProps {
  renderer: BlockRenderer | undefined
  setRenderer: (renderer: BlockRenderer) => void
}

export const BlockRendererContext = createContext<BlockRendererProps>({
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
  } else if (rendererRef.current === undefined) {
    rendererRef.current = new DefaultBlockRenderer()
  }

  return (
    <BlockRendererContext.Provider value={{ renderer: rendererRef.current, setRenderer: () => { } }} >
      {children}
    </BlockRendererContext.Provider>
  )
}

export const useBlockRenderer = (): BlockRenderer => {
  const { renderer } = useContext(BlockRendererContext)

  if (renderer === undefined) {
    throw new Error('useBlockRenderer must be used within BlockRendererProvider')
  }

  return renderer
}
