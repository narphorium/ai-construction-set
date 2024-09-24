import React, { forwardRef, useEffect, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { useBlockStoreActions } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'
import { BehaviorComponentProps } from './Base'
import { Pageable } from '../../types/behaviors'
import { Block } from '../../types/blocks'

export interface PaginatedComponentProps extends BehaviorComponentProps<Pageable> {
  setPage?: (page: number) => void
}

export function withPageable<P extends PaginatedComponentProps, C extends ComponentClass<P>>(
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof PaginatedComponentProps>>

export function withPageable<P extends PaginatedComponentProps & { ref?: Ref<any> }>(
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof PaginatedComponentProps>>

export function withPageable<P extends PaginatedComponentProps>(
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof PaginatedComponentProps>>

export function withPageable<P extends PaginatedComponentProps>(
  Component: ComponentType<P>
): any {
  const WithPageable = forwardRef(function (props, ref): JSX.Element {
    const pageableProps = props as P
    const store = useBlockStoreActions()
    const children = store.getChildBlocks(pageableProps.block.uuid)

    useEffect(() => {
      let numPages = 1
      children.forEach((block: Block) => {
        if (block !== undefined) {
          if (block.iteration === undefined) {
            block.iteration = 1
          } else if (block.iteration > numPages) {
            numPages = block.iteration
          }
        }
      })

      pageableProps.block.setNumPages(numPages)
    }, [children])

    const pageableClasses = useClasses([
      pageableProps.className,
      () => pageableProps.block.numPages !== undefined && pageableProps.block.numPages > 1 ? ['aics-paginated'] : []
    ], [pageableProps.className, pageableProps.block.numPages])

    const setPage = (p: number): void => {
      pageableProps.block.gotoPage(p)
    }

    return <Component
      {...pageableProps}
      ref={ref}
      page={pageableProps.block.page}
      setPage={setPage}
      classNames={pageableClasses} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithPageable.displayName = `withPageable(${componentName})`
  return WithPageable
}

export default withPageable
