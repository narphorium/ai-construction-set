import { createContext, useContext } from 'react'
import { type BlockRenderer } from '../../components/BlockRenderer'

interface BlockRendererProps {
  renderer: BlockRenderer | undefined
  setRenderer: (renderer: BlockRenderer) => void
}

export const BlockRendererContext = createContext<BlockRendererProps>({
  renderer: undefined,
  setRenderer: (renderer: BlockRenderer) => { }
})

export const useBlockRenderer = (): BlockRenderer => {
  const { renderer } = useContext(BlockRendererContext)

  if (renderer === undefined) {
    throw new Error('useBlockRenderer must be use within BlockRendererContext.Provider')
  }

  return renderer
}
