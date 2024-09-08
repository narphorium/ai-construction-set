import React, { useEffect, useState } from 'react'
import { useBlockRenderer } from '../../hooks/useBlockRenderer'
import { Block } from '../../types/blocks/Block'

export interface BlockLayoutProps {
  blocks: Block[]
  parent?: Block
  getChildClassName?: (block: Block) => string
}

export const BlockLayout = ({ blocks, parent, getChildClassName }: BlockLayoutProps): JSX.Element => {
  const renderer = useBlockRenderer()
  const [renderedBlocks, setRenderedBlocks] = useState<JSX.Element[]>([])

  useEffect(() => {
    const newRenderedBlocks = blocks.map((block) => {
      if (renderer !== undefined && block !== undefined) {
        return (
          <div key={block.uuid} className={getChildClassName?.(block)}>
            {renderer.render(block, parent)}
          </div>
        )
      }
      return null
    }).filter((block) => block !== null)
    setRenderedBlocks(newRenderedBlocks)
  }, [blocks, parent, renderer, getChildClassName])

  return <>{renderedBlocks}</>
}

BlockLayout.displayName = 'BlockLayout'
