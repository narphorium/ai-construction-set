import React, { forwardRef, useEffect, type ForwardedRef } from 'react'
import { type Selectable } from '../data'
import { type SelectableProps } from './Base'

export interface SentinalViewProps extends SelectableProps {
  sentinal: Selectable
}

export const SentinalView = forwardRef(function SentinalView ({ sentinal, selected, onSelected, variant, key }: SentinalViewProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  return <div ref={ref} className="aics-sentinal"></div>
})

SentinalView.displayName = 'SentinalView'
