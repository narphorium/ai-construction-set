import React, { forwardRef, useCallback, useContext, type ForwardedRef } from 'react'
import styled from 'styled-components'
import { type Base, type Stream } from '../data'
import { BlockFactoryContext } from '../hooks'
import { defaultFont, textColor } from '../themes/theme'
import { type PaginatedProps } from './Base'
import { Pagination } from './Pagination'

export interface BlockStreamProps extends PaginatedProps {
  stream: Stream
}

export const BlockStreamComponent = forwardRef(function BlockStream ({ className, stream, page = 1, setPage, variant, key }: BlockStreamProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  let numPages = 1
  stream.blocks.forEach((block) => {
    if (block.iteration === undefined) {
      block.iteration = 1
    } else if (block.iteration > numPages) {
      numPages = block.iteration
    }
  })

  const getClasses = (): string => {
    let classes = ['aics-block-stream']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    if (numPages > 1) {
      classes.push('aics-block-stream-paginated')
    }
    return classes.join(' ')
  }

  const filterBlocks = useCallback(() => {
    const filteredBlocks: Base[] = []
    stream.blocks.forEach((block) => {
      if (block.iteration === undefined || block.iteration === page) {
        filteredBlocks.push(block)
      }
    })
    return filteredBlocks
  }, [stream, page])

  if (numPages > 1) {
    return <div ref={ref} className={getClasses()}>
        <label className='aics-block-stream-page-label'>{ stream.name }</label>
        <Pagination page={page} numPages={numPages} setPage={setPage} key={stream.uuid} />
        <div className='aics-block-stream-content'>
        { filterBlocks().map((block) => {
          return factory?.build(block)
        }) }
        </div>
    </div>
  } else {
    return <div ref={ref} className={getClasses()}>
      { filterBlocks().map((block) => {
        return factory?.build(block)
      }) }
      </div>
  }
})

export const BlockStream = styled(BlockStreamComponent)`
margin-top: 12px;
margin-bottom: 12px;

.aics-block-stream-content {
  margin-left: 24px;
}

& > label {
  font-family: ${defaultFont};
  font-size: 12pt;
  font-weight: 500;
  color: ${textColor};
  margin-right: 8px;
  margin-left: 24px;
}

.aics-pagination {
  display: inline-block;
  vertical-align: top;
}
`
