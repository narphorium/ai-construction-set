import React, { type ComponentClass, type ComponentPropsWithoutRef, type Ref, forwardRef, useImperativeHandle, useRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent } from 'react'
import { type BaseProps } from './Base'
import useBlock from '../hooks/useBlock'
import { type Base } from '../data'

export interface BlockRef {
  scrollIntoView: (args: any) => void
}

interface WithRefProps extends BaseProps {
  block: Base
}

export function withRef<P extends WithRefProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof WithRefProps>>

export function withRef<P extends WithRefProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>

export function withRef<P extends WithRefProps> (
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>

export function withRef <P extends WithRefProps> (
  Component: ComponentType<P>
): any {
  const WithRef = forwardRef(function (props, _ref): JSX.Element {
    const blockProps = props as P
    const { state, dispatch } = useBlock(blockProps.block)
    const ref = useRef<BlockRef>(null)

    useImperativeHandle(ref, () => ({
      scrollIntoView: (args: any) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }))

    return <Component
          {...blockProps}
          ref={ref}
          block={state}
          dispatch={dispatch} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithRef.displayName = `withRef(${componentName})`
  return WithRef
}

export default withRef
