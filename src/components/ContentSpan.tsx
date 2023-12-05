import React, { forwardRef, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Selectable, type Span } from '../data'
import { themedIcon } from '../themes/icons'
import { fontWeight, spanBackgroundColor, spanTextColor, textColor } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

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

  const handleClick = (obj: Selectable) => (e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  const getSpanClasses = (span: Span): string => {
    return getClasses(
      'aics-content-span',
      className,
      span.classNames,
      () => span.datatype !== undefined ? [`aics-content-span-${span.datatype}`] : [])
  }

  return <span ref={ref}
      className={getSpanClasses(span)}
      onClick={handleClick(span)}
      dangerouslySetInnerHTML={{ __html: span.content }}></span>
})

const backgroundImage = (props: any): string | undefined => {
  return props.span.icon !== undefined ? themedIcon(props.span.icon, textColor)(props) : 'none'
}

const headerFontWeight = (props: any): string => {
  return fontWeight(props) + 200
}

export const ContentSpan = styled(ContentSpanComponent)`
  color: ${spanTextColor};
  background-color: ${spanBackgroundColor};

  padding: ${(props: any) => props.span.icon !== undefined ? '0 0 0 24px' : '0'};
  background-image: ${backgroundImage};
  background-repeat: no-repeat;

  a {
    color: ${spanTextColor};
  }
  &.aics-paragraph-header {
    font-weight: ${headerFontWeight};
  }
`
