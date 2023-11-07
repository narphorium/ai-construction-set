import React, { forwardRef, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import theme from 'styled-theming'
import { type Selectable, type Span } from '../data'
import { selectedVariants } from '../themes/theme'
import { type SelectableProps } from './Base'

export interface ContentSpanProps extends SelectableProps {
  span: Span
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ContentSpanComponent = forwardRef(function ContentSpan ({ className, span, selected, onSelected, onClick, variant, key }: ContentSpanProps, ref: ForwardedRef<HTMLSpanElement>): JSX.Element {
  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const getClasses = (): string => {
    let classes = ['aics-content-span']
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

  const handleClick = (obj: Selectable) => (e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <span ref={ref} className={getClasses()} onClick={handleClick(span)} dangerouslySetInnerHTML={{ __html: span.content }}></span>
})

const spanTextColor = selectedVariants('mode', {
  default: {
    unselected: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' }
  },
  blue: {
    unselected: { light: '#222', dark: '#eee' },
    selected: { light: '#222', dark: '#ffde98' }
  }
})

const spanBackgroundColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' }
  },
  blue: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' }
  }
})

const selectedChildSpanColor = theme('mode', {
  light: '#222',
  dark: '#ffde98'
})

export const ContentSpan = styled(ContentSpanComponent)`
  color: ${spanTextColor};
  background-color: ${spanBackgroundColor};

  .selected & {
    color: ${selectedChildSpanColor} !important;
  }

  a {
    color: ${spanTextColor};
  }
`
