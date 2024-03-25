import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Selectable, type Span } from '../data'
import { themedIcon } from '../themes/icons'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ContentSpanProps extends SelectableProps {
  span: Span
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ContentSpanComponent = forwardRef(function ContentSpan ({ className, span, selected, setSelected, onClick, variant, key }: ContentSpanProps, ref: ForwardedRef<HTMLSpanElement>): JSX.Element {
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

ContentSpanComponent.displayName = 'ContentSpan'

const backgroundImage = (props: any): string | undefined => {
  const icon = themedVariant('spanIcon')(props)
  return icon !== undefined ? themedIcon(icon, 12, themedVariant('spanTextColor'))(props) : 'none'
}

export const ContentSpan = styled(ContentSpanComponent)`
  color: ${themedVariant('spanTextColor')};
  background-color: ${themedVariant('spanBackgroundColor')};
  border-radius: ${themedVariant('spanBorderRadius')};
  padding: ${themedVariant('spanPadding')};
  background-image: ${backgroundImage};
  background-repeat: no-repeat;
  background-position: 4px 1px;
  font-family: ${themedVariant('spanFontFamily')};
  font-weight: ${themedVariant('spanFontWeight')};
  font-size: ${themedVariant('spanFontSize')};

  a {
    color: ${themedVariant('spanTextColor')};
  }
`
