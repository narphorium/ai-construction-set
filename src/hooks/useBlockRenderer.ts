import { useContext } from 'react'
import { type BlockRenderer } from '../core/BlockRenderer'
import { BlockRendererContext } from '../context/BlockRendererContext'

export const useBlockRenderer = (): BlockRenderer => {
  const { renderer } = useContext(BlockRendererContext)

  if (renderer === undefined) {
    throw new Error('useBlockRenderer must be used within BlockRendererProvider')
  }

  return renderer
}
