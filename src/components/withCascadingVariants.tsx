import React, { forwardRef, useContext, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { type Base } from '../data'
import { BlockFactoryContext } from '../hooks'
import { type BaseProps } from './Base'

export function withCascadingVariants<P extends BaseProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>,
  params: { block: Base }
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof BaseProps>>

export function withCascadingVariants<P extends BaseProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>,
  params: { block: Base }
): ForwardRefExoticComponent<Omit<P, keyof BaseProps>>

export function withCascadingVariants<P extends BaseProps> (
  Component: FunctionComponent<P>,
  params: { block: Base }
): ForwardRefExoticComponent<Omit<P, keyof BaseProps>>

export function withCascadingVariants <P extends BaseProps> (
  Component: ComponentType<P>,
  params: { block: Base }
): any {
  const WithCascadingVariants = forwardRef(function (props, ref): JSX.Element {
    const baseProps = props as P
    const { factory } = useContext(BlockFactoryContext)

    let currentBlock: Base | undefined = params.block
    let parentVariant: string | undefined
    while (currentBlock !== undefined && parentVariant === undefined) {
      if (currentBlock.variant !== undefined) {
        parentVariant = currentBlock.variant
      }
      currentBlock = factory?.getParent(currentBlock)
    }
    const variant = baseProps.variant ?? parentVariant ?? 'default'

    const getClasses = (): string[] => {
      let classes: string[] = []
      if (baseProps.className !== undefined) {
        if (typeof baseProps.className === 'string') {
          classes.push(baseProps.className)
        } else if (Array.isArray(baseProps.className)) {
          classes = classes.concat(baseProps.className)
        }
      }
      classes.push(`variant-${variant}`)
      return classes
    }

    return <Component {...baseProps} ref={ref} variant={variant} classNames={getClasses()} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithCascadingVariants.displayName = `withCascadingVariants(${componentName})`
  return WithCascadingVariants
}

export default withCascadingVariants
