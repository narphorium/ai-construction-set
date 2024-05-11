import React, { forwardRef, useImperativeHandle, useRef, type ComponentType, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react'
import { type BlockProps } from './Base'

export interface BlockRef {
  scrollIntoView: (args: any) => void
}

export const withRef = <TProps extends BlockProps>(
  Component: ComponentType<TProps>
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithRef = forwardRef(function (props: TProps, _ref): JSX.Element {
    const ref = useRef<BlockRef>(null)

    useImperativeHandle(ref, () => ({
      scrollIntoView: (args: any) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }))

    return <Component
          {...props}
          ref={ref} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithRef.displayName = `withRef(${componentName})`
  return WithRef
}
