import React, { useState, type ComponentType, type Dispatch, type SetStateAction } from 'react'

interface Base {
  collapsed?: boolean | Dispatch<SetStateAction<boolean>>
  toggleCollapsed?: (selected: boolean) => void
}

export const withCollapsible = <TProps extends Base>(
  Component: ComponentType<TProps>,
  params: { collapsed: boolean }
) => {
  return function WithCollapsible (props: TProps): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(params.collapsed)
    const toggleCollapsed = (c: boolean): void => {
      setCollapsed(!c)
    }
    return <Component collapsed={collapsed} onToggle={toggleCollapsed} {...props} />
  }
}
