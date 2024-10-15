import React, { forwardRef, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'

import { BehaviorComponentProps } from './Base'
import { Selectable } from '../../types/behaviors'
import { useClasses } from '../../hooks/useClasses'
import { BlockQuery } from '../../state/matchers'
import { useBlockRegistry, useBlockStoreActions } from '../../hooks'

export interface SelectableComponentProps extends BehaviorComponentProps<Selectable> {
  setSelected?: (selected: boolean) => void
}

export function withSelectable<P extends SelectableComponentProps, C extends ComponentClass<P>>(
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof SelectableComponentProps>>

export function withSelectable<P extends SelectableComponentProps & { ref?: Ref<any> }>(
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof SelectableComponentProps>>

export function withSelectable<P extends SelectableComponentProps>(
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof SelectableComponentProps>>

export function withSelectable<P extends SelectableComponentProps>(
  Component: ComponentType<P>
): any {
  const WithSelectable = forwardRef(function (props, ref): JSX.Element {
    const blockStore = useBlockStoreActions()
    const blockRegistry = useBlockRegistry()
    const selectableProps = props as P

    const ancestorSelected = new BlockQuery(blockRegistry).ancestors().hasBehaviorProperty<Selectable>('selected', true)

    const selectableClasses = useClasses([
      selectableProps.className,
      () => selectableProps.block.selected ? ['selected'] : [],
      () => blockStore.findBlocks(selectableProps.block, ancestorSelected, blockRegistry).length > 0 ? ['ancestor-selected'] : []
    ], [selectableProps.className, selectableProps.block.selected, ancestorSelected])

    const handleSetSelected = (s: boolean): void => {
      // Update block state
      selectableProps.block.setSelected(s)
      // Bubble up to parent component if present
      if (selectableProps.setSelected !== undefined) {
        selectableProps.setSelected(s)
      }
    }

    return <Component
      {...selectableProps}
      ref={ref}
      setSelected={handleSetSelected}
      className={selectableClasses} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithSelectable.displayName = `withSelectable(${componentName})`
  return WithSelectable
}

export default withSelectable
