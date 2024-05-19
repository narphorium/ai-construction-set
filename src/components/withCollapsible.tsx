import React, { forwardRef, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { getClasses, type CollapsibleProps } from './Base'
import { BlockActionType } from '../hooks/useBlock'

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

    const getCollapsibleClasses = (collapsibleProps: CollapsibleProps): string => {
      return getClasses(collapsibleProps.className, () => collapsibleProps.block.collapsed ? ['collapsed'] : [])
    }

    const handleSetCollapsed = (c: boolean): void => {
      collapsibleProps.dispatch({ type: BlockActionType.SET_COLLAPSED, collapsed: c })

      // Bubble up to parent component if present
      if (collapsibleProps.setCollapsed !== undefined) {
        collapsibleProps.setCollapsed(c)
      }
    }
    return <Component
        {...collapsibleProps}
        ref={ref}
        setCollapsed={handleSetCollapsed}
        className={getCollapsibleClasses(collapsibleProps)} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithCollapsible.displayName = `withCollapsible(${componentName})`
  return WithCollapsible
}
