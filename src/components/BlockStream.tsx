import React, { forwardRef, useContext, type Dispatch, type ForwardedRef, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { type Stream } from '../data'
import { BlockFactoryContext } from '../hooks'

interface BlockStreamProps {
  className?: string | string[]
  stream: Stream
  selected?: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
  key: any
}

export const BlockStreamComponent = forwardRef(function BlockStream ({ className, stream, key }: BlockStreamProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const getClasses = (): string => {
    let classes = ['aics-block-stream']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    return classes.join(' ')
  }

  return <div ref={ref} className={getClasses()}>
        { stream.blocks.map((block) => {
          return factory?.build(block)
        }) }
    </div>
})

export const BlockStream = styled(BlockStreamComponent)`
`
