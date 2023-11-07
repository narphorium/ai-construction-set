import React, { useState, type ComponentType } from 'react'
import { type CollapsibleProps } from './Base'

export const withCollapsible = <TProps extends CollapsibleProps>(
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
