import React, { forwardRef, useContext, useEffect, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { type Base } from '../data'
import { NestedPaginationContext, NestedPaginationDispatchContext, type NestedPaginationState } from '../hooks'
import { getClasses, type PaginatedProps } from './Base'
import { BlockActionType } from '../hooks/useBlock'

function getPage (state: NestedPaginationState | null, level: number): number {
  return state !== null ? state.pages[level - 1] : 1
}

function getNumPages (state: NestedPaginationState | null, level: number): number {
  return state !== null ? state.numPages[level - 1] : 1
}

export function withPageable<P extends PaginatedProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof PaginatedProps>>

export function withPageable<P extends PaginatedProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>

export function withPageable<P extends PaginatedProps> (
  Component: FunctionComponent<P>
): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>

export function withPageable <P extends PaginatedProps> (
  Component: ComponentType<P>
): any {
  const WithPageable = forwardRef(function (props, ref): JSX.Element {
    const pageableProps = props as P
    const pages = useContext(NestedPaginationContext)
    const pagesDispatch = useContext(NestedPaginationDispatchContext)

    useEffect(() => {
      let numPages = 1
      pageableProps.block.children.forEach((block: Base) => {
        if (block.iteration === undefined) {
          block.iteration = 1
        } else if (block.iteration > numPages) {
          numPages = block.iteration
        }
      })

      if (pagesDispatch !== null && (pages === null || pages.numPages[pageableProps.level - 1] !== numPages)) {
        pagesDispatch({ type: 'register', level: pageableProps.level, numPages })
      }
    }, [pageableProps.level, pagesDispatch])

    const getPageableClasses = (pages: NestedPaginationState | null, pageableProps: P): string => {
      return getClasses(
        pageableProps.className,
        () => getNumPages(pages, pageableProps.level) > 1 ? ['aics-paginated'] : [])
    }

    const setPage = (p: number): void => {
      if (pagesDispatch !== null && getPage(pages, pageableProps.level) !== p) {
        pagesDispatch({ type: 'goto', page: p, level: pageableProps.level })
        //  FIXME: Should this be validated?
        pageableProps.dispatch({ type: BlockActionType.SET_PAGE, page: p })
        if (pageableProps.setPage !== undefined) {
          pageableProps.setPage(p)
        }
      }
    }

    return <Component
            {...pageableProps}
            ref={ref}
            page={getPage(pages, pageableProps.level)}
            setPage={setPage}
            classNames={getPageableClasses(pages, pageableProps)} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithPageable.displayName = `withPageable(${componentName})`
  return WithPageable
}

export default withPageable
