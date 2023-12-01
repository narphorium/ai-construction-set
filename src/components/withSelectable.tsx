import React, { useRef, useState, type ComponentType } from 'react'
import { type Selectable } from '../data'
import { getClasses, type SelectableProps } from './Base'

export const withSelectable = <TProps extends SelectableProps>(
  Component: ComponentType<TProps>,
  params: { block: Selectable }
) => {
  return function WithSelectable (props: TProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<boolean>(params.block.selected)
    const handleSelected = (s: boolean): void => {
      params.block.selected = s
      setSelected(s)
    }
    return <Component ref={ref}
        selected={selected}
        onSelected={handleSelected}
        className={getClasses(props.className, () => selected ? ['selected'] : [])}
        {...props} />
  }
}
