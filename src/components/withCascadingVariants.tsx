import React, { forwardRef, useContext, type ComponentType, type ForwardedRef } from 'react'
import { type Base } from '../data'
import { BlockFactoryContext } from '../hooks'
import { type BaseProps } from './Base'

export const withCascadingVariants = <TProps extends BaseProps>(
  Component: ComponentType<TProps>,
  params: { block: Base }
): React.ForwardRefExoticComponent<React.PropsWithoutRef<TProps> & React.RefAttributes<HTMLDivElement>> => {
  return forwardRef(function WithCascadingVariants (props: TProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
    const { factory } = useContext(BlockFactoryContext)

    let currentBlock: Base | undefined = params.block
    let parentVariant: string | undefined
    while (currentBlock !== undefined && parentVariant === undefined) {
      if (currentBlock.variant !== undefined) {
        parentVariant = currentBlock.variant
      }
      currentBlock = factory?.getParent(currentBlock)
    }
    const variant = props.variant ?? parentVariant ?? 'default'

    const getClasses = (): string[] => {
      let classes: string[] = []
      if (props.className !== undefined) {
        if (typeof props.className === 'string') {
          classes.push(props.className)
        } else if (Array.isArray(props.className)) {
          classes = classes.concat(props.className)
        }
      }
      classes.push(`variant-${variant}`)
      return classes
    }

    return <Component ref={ref} variant={variant} classNames={getClasses()} {...props} />
  })
}
