import React, { useContext, useEffect, useRef, type ComponentType } from 'react'
import { SelectedVisitor, type Stream } from '../data'
import { NestedPaginationContext, NestedPaginationDispatchContext, type NestedPaginationState } from '../hooks'
import { getClasses, type PaginatedProps } from './Base'

function getPage (state: NestedPaginationState | null, level: number): number {
  return state !== null ? state.pages[level - 1] : 1
}

export const withPageable = <TProps extends PaginatedProps>(
  Component: ComponentType<TProps>,
  params: {
    stream: Stream
  }
) => {
  return function WithPageable (props: TProps): JSX.Element {
    const pages = useContext(NestedPaginationContext)
    const pagesDispatch = useContext(NestedPaginationDispatchContext)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      let numPages = 1
      params.stream.blocks.forEach((block) => {
        if (block.iteration === undefined) {
          block.iteration = 1
        } else if (block.iteration > numPages) {
          numPages = block.iteration
        }
      })

      if (pagesDispatch !== null && (pages === null || pages.numPages[props.level - 1] !== numPages)) {
        pagesDispatch({ type: 'register', level: props.level, numPages })
      }
    }, [props.level, pagesDispatch])

    const setPage = (p: number): void => {
      params.stream.page = p
      if (pagesDispatch !== null && getPage(pages, props.level) !== p) {
        pagesDispatch({ type: 'goto', page: p, level: props.level })
      }
    }

    // Automatically turn to the selected page
    const selectedVisitor = new SelectedVisitor()
    useEffect(() => {
      const page = getPage(pages, props.level)
      if (page !== null) {
        if (selectedVisitor.run(params.stream, page).length > 0) {
          params.stream.blocks.forEach((block) => {
            if (block.iteration !== undefined && selectedVisitor.run(block, page).length > 0) {
              setPage(block.iteration)
            }
          })
        }
      }
    }, [pages])

    return <Component ref={ref}
            page={getPage(pages, props.level)}
            setPage={setPage}
            classNames={getClasses(props.className)}
            {...props} />
  }
}
