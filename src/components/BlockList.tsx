import React, { forwardRef, useContext, useEffect, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type List } from '../data'
import { BlockFactoryContext } from '../hooks'
import { borderColor } from '../themes/theme'
import { type SelectableProps } from './Base'

export interface BlockListProps extends SelectableProps {
  list: List
}

export const BlockListComponent = forwardRef(function BlockList ({ className, list, selected, onSelected, variant, key }: BlockListProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const getClasses = (): string => {
    let classes = ['aics-block-list']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    if (selected === true) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  return <div ref={ref} className={getClasses()}>
        { factory?.buildAll(list.items, list) }
    </div>
})

export const BlockList = styled(BlockListComponent)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 4px 0;
    border-color: ${borderColor};
`
