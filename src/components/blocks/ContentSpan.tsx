import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { themedIcon } from '../../themes/icons'
import { themedVariant } from '../../themes/theme'
import { Span } from '../../types/blocks'
import { SelectableComponentProps } from '../behaviors'
import { Selectable } from '../../types/behaviors'
import { useClasses } from '../../hooks/useClasses'

export interface ContentSpanProps extends SelectableComponentProps {
  block: Span & Selectable
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ContentSpanComponent = forwardRef(function ContentSpan({ className, block, onClick }: ContentSpanProps, ref: ForwardedRef<HTMLSpanElement>): JSX.Element {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  const spanClasses = useClasses([
    'aics-content-span',
    className,
    block.classNames,
    () => block.datatype !== undefined ? [`aics-content-span-${block.datatype}`] : []
  ], [className, block.classNames, block.datatype])

  return <span ref={ref}
    key={block.uuid}
    className={spanClasses}
    onClick={handleClick}
    dangerouslySetInnerHTML={{ __html: block.content }}></span>
})

ContentSpanComponent.displayName = 'ContentSpan'

const backgroundImage = (props: any): string | undefined => {
  const icon = themedVariant('spanIcon')(props)
  return icon !== undefined ? themedIcon(icon, 12, themedVariant('spanTextColor'))(props) : 'none'
}

export const ContentSpan = styled(ContentSpanComponent)`
  display: inline-block;
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
