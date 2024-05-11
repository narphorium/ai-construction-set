import React, { forwardRef, useState, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref, useEffect } from 'react'
import { getClasses, type CollapsibleProps } from './Base'

export function withCollapsible<P extends CollapsibleProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof CollapsibleProps>>

export function withCollapsible<P extends CollapsibleProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleProps>>

export function withCollapsible<P extends CollapsibleProps> (
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleProps>>

export function withCollapsible <P extends CollapsibleProps> (
  Component: ComponentType<P>
): any {
  const WithCollapsible = forwardRef(function (props, ref): JSX.Element {
    const collapsibleProps = props as P
    const [collapsed, setCollapsed] = useState<boolean>(collapsibleProps.block.collapsed)

    useEffect(() => {
      if (collapsibleProps.collapsed !== undefined) {
        setCollapsed(collapsibleProps.collapsed)
      }
    }, [collapsibleProps.collapsed])

    useEffect(() => {
      collapsibleProps.block.collapsed = collapsed
    }, [collapsed])

    const handleSetCollapsed = (c: boolean): void => {
      setCollapsed(c)
      collapsibleProps.block.collapsed = c

      // Bubble up to parent component if present
      if (collapsibleProps.setCollapsed !== undefined) {
        collapsibleProps.setCollapsed(c)
      }
    }
    return <Component
        {...collapsibleProps}
        ref={ref}
        collapsed={collapsed}
        setCollapsed={handleSetCollapsed}
        className={getClasses(collapsibleProps.className, () => collapsed ? ['collapsed'] : [])} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithCollapsible.displayName = `withCollapsible(${componentName})`
  return WithCollapsible
}
