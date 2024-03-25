import React, { forwardRef, useContext, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type List } from '../data'
import { BlockFactoryContext } from '../hooks'
import { getClasses, type SelectableProps } from './Base'

export interface ListLayoutProps extends SelectableProps {
  list: List
}

export const ListLayoutComponent = forwardRef(function ListLayout ({ className, list, selected, setSelected, variant, key }: ListLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  return <div ref={ref} className={getClasses('aics-list', className, list.classNames)}>
        { factory?.buildAll(list.items, list) }
    </div>
})

ListLayoutComponent.displayName = 'ListLayout'

export const ListLayout = styled(ListLayoutComponent)`
margin: 4px 0;
`
