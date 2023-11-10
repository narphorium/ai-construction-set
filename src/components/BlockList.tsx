import React, { forwardRef, useContext, useEffect, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type List } from '../data'
import { BlockFactoryContext } from '../hooks'
import { borderColor } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

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

  return <div ref={ref} className={getClasses('aics-block-list', className, list.classNames)}>
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
