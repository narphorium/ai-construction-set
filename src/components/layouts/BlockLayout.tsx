import React from 'react'
import { useBlockRenderer } from '../../hooks/useBlockRenderer'
import { Block } from '../../types/blocks/Block'

export interface BlockLayoutProps {
  blocks: Block[]
  parent?: Block
  getChildClassName?: (block: Block) => string
}

export const BlockLayout = ({ blocks, parent, getChildClassName }: BlockLayoutProps): JSX.Element => {
  const renderer = useBlockRenderer()

  return <>
    {blocks.map((block) => {
      if (renderer !== undefined && block !== undefined) {
        return <div key={block.uuid} className={getChildClassName?.(block)}>
          {renderer.render(block, parent)}
        </div>
      }
      return null
    })}
  </>
}

BlockLayout.displayName = 'BlockLayout'
