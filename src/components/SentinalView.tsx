import React, { forwardRef, useEffect, type Dispatch, type ForwardedRef, type SetStateAction } from 'react'
import { type Selectable } from '../data'

interface SentinalViewProps {
  sentinal: Selectable
  selected?: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
  key: any
}

export const SentinalView = forwardRef(function SentinalView ({ sentinal, selected, onSelected, key }: SentinalViewProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  useEffect(() => {
    if (onSelected !== undefined) {
      onSelected(selected as boolean)
    }
  }, [selected, onSelected])

  return <div ref={ref} className="aics-sentinal"></div>
})
