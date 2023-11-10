import React, { forwardRef, useCallback, useContext, useEffect, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import theme from 'styled-theming'
import { type Section } from '../data'
import { BlockFactoryContext } from '../hooks'
import { defaultFont, fontWeight, selectedVariants, textColor } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface ContentSectionProps extends SelectableProps {
  section: Section
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

const ContentSectionComponent = forwardRef(function ContentSection ({ className, section, selected, onSelected, onClick, variant, key }: ContentSectionProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }, [onClick])

  return <div ref={ref} className={ getClasses('aics-content-section', className, section.classNames) } onClick={handleClick}>
    <span>
      { factory?.buildAll(section.spans, section) }
    </span>
  </div>
})

const backgroundColor = selectedVariants('mode', {
  default: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' }
  },
  blue: {
    unselected: { light: 'transparent', dark: 'transparent' },
    selected: { light: 'rgb(253 235 184)', dark: 'rgb(73 69 61)' }
  }
})

const selectedLabelColor = theme('mode', {
  light: '#222',
  dark: '#ffde98'
})

export const ContentSection = styled(ContentSectionComponent)`
font-family: ${defaultFont};
  font-size: 11pt;
  margin: 12px 16px;

  & label {
    font-weight: calc(${fontWeight} + 200);
  }

  &.selected > span {
    color: ${textColor};
    background-color: ${backgroundColor};
  }

  & > span > label {
    color: ${textColor} !important;
  }

  .selected & > span > label {
    color: ${selectedLabelColor} !important;
  }
`
