import React, { forwardRef, useContext, useEffect, type Dispatch, type ForwardedRef, type MouseEvent, type SetStateAction } from 'react'
import { styled } from 'styled-components'
import { type Content } from '../data'
import { BlockFactoryContext } from '../hooks'
import { defaultFont, fontWeight, selectedVariants } from '../themes/theme'

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
  selected: { light: 'yellow-800', dark: 'yellow-200' }
})

const borderColor = selectedVariants('mode', {
  default: { light: 'gray-800', dark: 'gray-200' },
  selected: { light: 'yellow-600', dark: 'yellow-400' }
})

export const ContentBlock = styled(ContentBlockComponent)`
font-family: ${defaultFont};
font-weight: ${fontWeight};
border-width: 1px;
border-style: solid;
border-radius: 4px;
margin: 4px 0;
color: ${textColor};
background-color: ${backgroundColor};
border-color: ${borderColor};
`
