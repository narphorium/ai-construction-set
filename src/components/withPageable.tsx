import React, { useEffect, useRef, useState, type ComponentType } from 'react'
import { type Stream } from '../data/Stream'
import { getSelectedChildren } from '../data/traversal'
import { getClasses, type PaginatedProps } from './Base'

export const withPageable = <TProps extends PaginatedProps>(
  Component: ComponentType<TProps>,
  params: {
    page: number
    stream: Stream
  }
) => {
  return function WithPageable (props: TProps): JSX.Element {
    const [page, setPage] = useState<number>(1)
    const ref = useRef<HTMLDivElement>(null)

    // Automatically turn to the selected page
    useEffect(() => {
      if (params.page !== null) {
        if (getSelectedChildren(params.stream, params.page).length > 0) {
          params.stream.blocks.forEach((block) => {
            if (block.iteration !== undefined && getSelectedChildren(block, params.page).length > 0) {
              setPage(block.iteration)
            }
          })
        }
      }
    }, [params.page])

    return <Component ref={ref}
        page={page}
        setPage={setPage}
        classNames={getClasses(props.className)}
        {...props} />
  }
}
