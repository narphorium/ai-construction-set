import React, { forwardRef, useContext, useEffect, type Dispatch, type ForwardedRef, type MouseEvent, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { type Content } from '../data'
import { BlockFactoryContext } from '../hooks'
import { selectedVariants } from './theme'

interface ContentBlockProps {
  className?: string | string[]
  content: Content
  selected?: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  key: any
}

export const ContentBlockComponent = forwardRef(function ContentBlock ({ className, content, selected, onSelected, onClick, key }: ContentBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const getClasses = (): string => {
    let classes = ['aics-content-block']
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

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} className={getClasses()} onClick={handleClick}>
         { content.children.map((child) => {
           return factory?.build(child, content)
         })}
    </div>
})

const textColor = selectedVariants('mode', {
  default: { light: '#222', dark: '#292b2f' },
  selected: { light: '#222', dark: '#ffde98' }
})

const backgroundColor = selectedVariants('mode', {
  default: { light: 'white', dark: '#292b2f' },
  selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' }
})

const borderColor = selectedVariants('mode', {
  default: { light: '#ccc', dark: '#595b60' },
  selected: { light: 'rgb(237, 211, 137)', dark: 'rgb(109 102 81)' }
})

export const ContentBlock = styled(ContentBlockComponent)`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  margin: 4px 0;
  color: ${textColor};
  background-color: ${backgroundColor};
  border-color: ${borderColor};
`
