import React, { type ComponentClass, type ComponentPropsWithoutRef, type Ref, forwardRef, useImperativeHandle, useRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent } from 'react'
import { useBlock } from '../../hooks/useBlock'
import { Block } from '../../types/blocks'

export interface BlockRef {
  scrollIntoView: (args: any) => void
}

interface WithRefProps {
  block: Block,
  className?: string
}

export function withRef<P extends WithRefProps, C extends ComponentClass<P>>(
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof WithRefProps>>

export function withRef<P extends WithRefProps & { ref?: Ref<any> }>(
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>

export function withRef<P extends WithRefProps>(
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>

export function withRef<P extends WithRefProps>(
  Component: ComponentType<P>
): any {
  const WithRef = forwardRef(function (props, _ref): JSX.Element {
    const blockProps = props as P
    const state = useBlock(blockProps.block.uuid)
    const ref = useRef<BlockRef>(null)

    useImperativeHandle(ref, () => ({
      scrollIntoView: (args: any) => {
        ref.current?.scrollIntoView({ ...args, behavior: 'smooth', block: 'center' })
      }
    }))

    return <Component
      {...blockProps}
      ref={ref}
      block={state} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithRef.displayName = `withRef(${componentName})`
  return WithRef
}

export default withRef
