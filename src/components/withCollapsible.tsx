import React, { useState, type ComponentType } from 'react'
import { type Collapsible } from '../data'
import { getClasses, type CollapsibleProps } from './Base'

export const withCollapsible = <TProps extends CollapsibleProps>(
  Component: ComponentType<TProps>,
  params: { block: Collapsible }
) => {
  return function WithCollapsible (props: TProps): JSX.Element {
    const [collapsed, setCollapsed] = useState<boolean>(params.block.collapsed)
    const toggleCollapsed = (c: boolean): void => {
      params.block.collapsed = c
      setCollapsed(!c)
    }
    return <Component
        collapsed={collapsed}
        onToggle={toggleCollapsed}
        className={getClasses(props.className, () => collapsed ? ['collapsed'] : [])}
        {...props} />
  }
}
