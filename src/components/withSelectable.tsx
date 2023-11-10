import React, { useRef, useState, type ComponentType } from 'react'
import { getClasses, type SelectableProps } from './Base'

export const withSelectable = <TProps extends SelectableProps>(
  Component: ComponentType<TProps>,
  params: { selected: boolean }
) => {
  return function WithSelectable (props: TProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<boolean>(params.selected)
    const handleSelected = (s: boolean): void => {
      setSelected(s)
    }
    return <Component ref={ref}
        selected={selected}
        onSelected={handleSelected}
        className={getClasses(props.className, () => selected ? ['selected'] : [])}
        {...props} />
  }
}
