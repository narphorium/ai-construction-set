import React, { forwardRef, useCallback, useContext, type ForwardedRef } from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import { Stream, type Base, type Selectable } from '../data'
import { BlockFactoryContext } from '../hooks'
import { getColor } from '../themes/colors'
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

  const getNodeClasses = (node: Selectable): string => {
    const classes = ['aics-block-stream-node']
    if (node.selected) {
      classes.push('selected')
    }
    if (!(node instanceof Stream)) {
      classes.push('aics-block-stream-leaf-node')
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
        <div className='aics-block-stream-control'><span></span></div>
        <div className='aics-block-stream-title'>
          <label className='aics-block-stream-page-label'>{ stream.name }</label>
          <Pagination page={page} numPages={numPages} setPage={setPage} key={stream.uuid} />
        </div>
        { filterBlocks().map((block) => {
          return <div className={getNodeClasses(block as Selectable)} key={block.uuid}>
            { factory?.build(block) }
            </div>
        }) }
    </div>
  } else {
    return <div ref={ref} className={getClasses()}>
      { filterBlocks().map((block) => {
        return factory?.build(block)
      }) }
    </div>
  }
})

export const treeColor = theme('mode', {
  light: getColor('gray-800'),
  dark: getColor('gray-200')
})

export const selectedTreeColor = theme('mode', {
  light: getColor('yellow-100'),
  dark: getColor('yellow-400')
})

export const BlockStream = styled(BlockStreamComponent)`
position: relative;
margin-top: 12px;
margin-bottom: 12px;
margin-left: 0;
padding-left: 0;

.aics-block-stream-content {
  position: relative;
  margin-left: 24px;
}

& .aics-block-stream-title > label {
  font-family: ${defaultFont};
  font-size: 12pt;
  font-weight: 500;
  vertical-align: middle;
  color: ${textColor};
  margin-right: 8px;
}

.aics-pagination {
  display: inline-block;
  vertical-align: top;
}

& .aics-block-stream-node {
  display: block;
  position: relative;
  padding-left: 22px;
}

& .aics-block-stream-leaf-node {
  padding-left: 36px;
}

& .aics-block-stream-node > .aics-block-stream {
  padding-left: 0px;
}

& .aics-block-stream-node {
  position: relative;
  border-left: 2px solid ${treeColor};
  line-height: 24px;
}

& .aics-block-stream-node:last-child {
  border-color: transparent;
}

.aics-block-stream-node::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: -12px;
  left: -2px;
  width: 26px;
  height: 25px;
  border: solid ${treeColor};
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: 6px;
}

& .aics-block-stream-title:focus {
  outline: none;
}

&
  > .aics-block-stream-control
  > span,
& .aics-block-stream-node::after {
  content: "";
  display: block;
  position: absolute;
  top: 10px;
  left: 19px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${treeColor};
  z-index: 2;
}

&
  > .aics-block-stream-control
  > span {
    left: -3px;
}

& .aics-block-stream-node::after {
  left: 19px;
}

&
  > .selected
  > .aics-block-stream-title::before {
  background-color: ${selectedTreeColor};
}

& .before-selected {
  border-color: ${selectedTreeColor};
}

.aics-block-stream-title {
  position: relative;
  padding-left: 16px;
}

&
  > .selected
  > .aics-block-stream-control
  > span,
& > .selected::after {
  background: ${selectedTreeColor};
}

.aics-block-stream-node & > .selected::before {
  border-color: ${selectedTreeColor};
  z-index: 1;
}

& .aics-block-stream-title::before {
  z-index: 1;
  content: " ";
  position: absolute;
  top: 16px;
  left: 0;
  background-color: ${treeColor};
  background-clip: content-box;
  width: 2px;
  height: 100%;
}

`
