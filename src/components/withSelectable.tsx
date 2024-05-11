import React, { forwardRef, useState, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref, useEffect } from 'react'
import { getClasses, type SelectableProps } from './Base'

export function withSelectable<P extends SelectableProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof SelectableProps>>

export function withSelectable<P extends SelectableProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>

export function withSelectable<P extends SelectableProps> (
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>

export function withSelectable <P extends SelectableProps> (
  Component: ComponentType<P>
): any {
  const WithSelectable = forwardRef(function (props, ref): JSX.Element {
    const selectableProps = props as P
    console.log('WithSelectable', selectableProps)
    const [selected, setSelected] = useState<boolean>(selectableProps.block.selected)

    useEffect(() => {
      if (selectableProps.selected !== undefined) {
        setSelected(selectableProps.selected)
      }
    }, [selectableProps.selected])

    useEffect(() => {
      selectableProps.block.selected = selected
    }, [selected])

    const handleSetSelected = (s: boolean): void => {
      setSelected(s)
      selectableProps.block.selected = s
      // Bubble up to parent component if present
      if (selectableProps.setSelected !== undefined) {
        selectableProps.setSelected(s)
      }
    }
    return <Component
        {...selectableProps}
        ref={ref}
        selected={selected}
        setSelected={handleSetSelected}
        className={getClasses(selectableProps.className, () => selected ? ['selected'] : [])} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithSelectable.displayName = `withSelectable(${componentName})`
  return WithSelectable
}

export default withSelectable
