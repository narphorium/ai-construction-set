import { useContext } from 'react'
import { type BlockRenderer } from '../components/BlockRenderer'
import { BlockRendererContext } from '../state/context/BlockRendererContext'

export const useBlockRenderer = (): BlockRenderer => {
  const { renderer } = useContext(BlockRendererContext)

  if (renderer === undefined) {
    throw new Error('useBlockRenderer must be used within BlockRendererProvider')
  }

  return renderer
}
