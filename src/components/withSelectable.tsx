import React, { useRef, useState, type ComponentType, type Dispatch, type SetStateAction } from 'react'

interface Base {
  selected?: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
}

export const withSelectable = <TProps extends Base>(
  Component: ComponentType<TProps>,
  params: { selected: boolean }
) => {
  return function WithSelectable (props: TProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<boolean>(params.selected)
    const handleSelected = (s: boolean): void => {
      setSelected(s)
    }
    return <Component ref={ref} selected={selected} onSelected={handleSelected} {...props} />
  }
}
