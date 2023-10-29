import React, { forwardRef, useContext, useEffect, type Dispatch, type ForwardedRef, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { type List } from '../data'
import { BlockFactoryContext } from '../hooks'
import { borderColor } from '../themes/theme'

interface BlockListProps {
  className?: string | string[]
  list: List
  selected: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
  key: any
}

export const BlockListComponent = forwardRef(function BlockList ({ className, list, selected, onSelected, key }: BlockListProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
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
        { list.items.map((item, index) => {
          return factory?.build(item, list)
        }) }
    </div>
})

export const BlockList = styled(BlockListComponent)`
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    margin: 8px 0 0 0;
    border-color: ${borderColor};
`
