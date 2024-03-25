import React, { forwardRef, type ForwardedRef } from 'react'
import { type Selectable } from '../data'
import { type SelectableProps } from './Base'

export interface SentinalViewProps extends SelectableProps {
  sentinal: Selectable
}

export const SentinalView = forwardRef(function SentinalView ({ sentinal, selected, setSelected, variant, key }: SentinalViewProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  return <div ref={ref} className="aics-sentinal"></div>
})

SentinalView.displayName = 'SentinalView'
