import React, { forwardRef, type ForwardedRef } from 'react'
import { type Selectable } from '../data'
import { type SelectableProps } from './Base'

export interface SentinalViewProps extends SelectableProps {
  block: Selectable
}

export const SentinalView = forwardRef(function SentinalView ({ block }: SentinalViewProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  return <div ref={ref} key={block.uuid} className="aics-sentinal"></div>
})

SentinalView.displayName = 'SentinalView'
