import React, { forwardRef, useContext, useEffect, type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react'
import { SelectedVisitor, type Tree } from '../data'
import { NestedPaginationContext, NestedPaginationDispatchContext, type NestedPaginationState } from '../hooks'
import { getClasses, type PaginatedProps } from './Base'

function getPage (state: NestedPaginationState | null, level: number): number {
  return state !== null ? state.pages[level - 1] : 1
}

function getNumPages (state: NestedPaginationState | null, level: number): number {
  return state !== null ? state.numPages[level - 1] : 1
}

export function withPageable<P extends PaginatedProps, C extends ComponentClass<P>> (
  Component: C & ComponentType<P>,
  params: { tree: Tree }
): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> }, keyof PaginatedProps>>

export function withPageable<P extends PaginatedProps & { ref?: Ref<any> }> (
  Component: ForwardRefExoticComponent<P>,
  params: { tree: Tree }
): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>

export function withPageable<P extends PaginatedProps> (
  Component: FunctionComponent<P>,
  params: { tree: Tree }
): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>

export function withPageable <P extends PaginatedProps> (
  Component: ComponentType<P>,
  params: {
    tree: Tree
  }
): any {
  const WithPageable = forwardRef(function (props, ref): JSX.Element {
    const pageableProps = props as P
    const pages = useContext(NestedPaginationContext)
    const pagesDispatch = useContext(NestedPaginationDispatchContext)

    useEffect(() => {
      let numPages = 1
      params.tree.blocks.forEach((block) => {
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

    const setPage = (p: number): void => {
      params.tree.page = p
      if (pagesDispatch !== null && getPage(pages, pageableProps.level) !== p) {
        pagesDispatch({ type: 'goto', page: p, level: pageableProps.level })
        if (pageableProps.setPage !== undefined) {
          pageableProps.setPage(p)
        }
      }
    }

    // Automatically turn to the selected page
    const selectedVisitor = new SelectedVisitor()
    useEffect(() => {
      const page = getPage(pages, pageableProps.level)
      if (page !== null) {
        if (selectedVisitor.run(params.tree, page).length > 0) {
          params.tree.blocks.forEach((block) => {
            if (block.iteration !== undefined && selectedVisitor.run(block, page).length > 0) {
              setPage(block.iteration)
            }
          })
        }
      }
    }, [pages])

    return <Component
            {...pageableProps}
            ref={ref}
            page={getPage(pages, pageableProps.level)}
            setPage={setPage}
            classNames={getClasses(pageableProps.className, () => getNumPages(pages, pageableProps.level) > 1 ? ['aics-paginated'] : [])} />
  })

  const componentName = Component.displayName ?? Component.name ?? 'Component'
  WithPageable.displayName = `withPageable(${componentName})`
  return WithPageable
}

export default withPageable
