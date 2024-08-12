import React, { forwardRef, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { Collapsible } from '../../types/behaviors'
import { BehaviorComponentProps } from './Base'
import { useClasses } from '../../hooks/useClasses'

export interface CollapsibleComponentProps extends BehaviorComponentProps<Collapsible> {
  setCollapsed?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

export function withCollapsible<P extends CollapsibleComponentProps, C extends ComponentClass<P>>(
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof CollapsibleComponentProps>>

export function withCollapsible<P extends CollapsibleComponentProps & { ref?: Ref<any> }>(
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleComponentProps>>

export function withCollapsible<P extends CollapsibleComponentProps>(
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleComponentProps>>

export function withCollapsible<P extends CollapsibleComponentProps>(
  Component: ComponentType<P>
): any {
  const WithCollapsible = forwardRef(function (props, ref): JSX.Element {
    const collapsibleProps = props as P

    const collapsibleClasses = useClasses([
      collapsibleProps.className,
      collapsibleProps.block.collapsed ? 'collapsed' : []
    ], [collapsibleProps.className, collapsibleProps.block.collapsed])

    const handleSetCollapsed = (c: boolean): void => {
      // Update block state
      collapsibleProps.block.setCollapsed(c)

      // Bubble up to parent component if present
      if (collapsibleProps.setCollapsed !== undefined) {
        collapsibleProps.setCollapsed(c)
      }
    }
    return <Component
      {...collapsibleProps}
      ref={ref}
      setCollapsed={handleSetCollapsed}
      className={collapsibleClasses} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithCollapsible.displayName = `withCollapsible(${componentName})`
  return WithCollapsible
}
