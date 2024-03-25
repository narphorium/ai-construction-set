import React, { forwardRef, useState, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref, useEffect } from 'react'
import { type Selectable } from '../data'
import { getClasses, type SelectableProps } from './Base'

export function withSelectable<P extends SelectableProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>,
  params: { block: Selectable }
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof SelectableProps>>

export function withSelectable<P extends SelectableProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>,
  params: { block: Selectable }
): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>

export function withSelectable<P extends SelectableProps> (
  Component: FunctionComponent<P>,
  params: { block: Selectable }
): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>

export function withSelectable <P extends SelectableProps> (
  Component: ComponentType<P>,
  params: { block: Selectable }
): any {
  const WithSelectable = forwardRef(function (props, ref): JSX.Element {
    const selectableProps = props as P
    const [selected, setSelected] = useState<boolean>(params.block.selected)
    useEffect(() => {
      if (selectableProps.selected !== undefined) {
        setSelected(selectableProps.selected)
      }
    }, [selectableProps.selected])
    useEffect(() => {
      params.block.selected = selected
    }, [selected])
    const handleSetSelected = (s: boolean): void => {
      setSelected(s)
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
