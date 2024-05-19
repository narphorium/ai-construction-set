import React, { forwardRef, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { getClasses, type SelectableProps } from './Base'
import { BlockActionType } from '../hooks/useBlock'

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

    const getSelectableClasses = (selectableProps: SelectableProps): string => {
      return getClasses(selectableProps.className, () => selectableProps.block.selected ? ['selected'] : [])
    }

    const handleSetSelected = (s: boolean): void => {
      selectableProps.dispatch({ type: BlockActionType.SET_SELECTED, selected: s })
      // Bubble up to parent component if present
      if (selectableProps.setSelected !== undefined) {
        selectableProps.setSelected(s)
      }
    }

    return <Component
        {...selectableProps}
        ref={ref}
        setSelected={handleSetSelected}
        className={getSelectableClasses(selectableProps)} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithSelectable.displayName = `withSelectable(${componentName})`
  return WithSelectable
}

export default withSelectable
