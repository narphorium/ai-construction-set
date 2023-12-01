import React, { createContext, useEffect, useReducer, type Dispatch, type ReactElement } from 'react'

export class NestedPaginationState {
  public pages: number[] = []
  public numPages: number[] = []
};

export type NestedPaginationAction =
| { type: 'register', numPages: number, level: number }
| { type: 'start', level: number }
| { type: 'end', level: number }
| { type: 'previous', level: number }
| { type: 'next', level: number }
| { type: 'goto', page: number, level: number }

function getPage (state: NestedPaginationState, action: NestedPaginationAction): number {
  if (action.level > state.pages.length) {
    return 1
  }
  return state.pages[action.level - 1]
}

function getNumPages (state: NestedPaginationState, action: NestedPaginationAction): number {
  return state.numPages[action.level - 1]
}

function setPage (state: NestedPaginationState, action: NestedPaginationAction, page: number): number[] {
  // Expand the array if necessary
  let tmp = state.pages
  if (action.level > tmp.length) {
    tmp = tmp.concat(Array(action.level - tmp.length).fill(1))
  }
  return tmp.slice(0, action.level - 1).concat([page]).concat(tmp.slice(action.level))
}

function setNumPages (state: NestedPaginationState, action: NestedPaginationAction, numPages: number): number[] {
  // Expand the array if necessary
  let tmp = state.numPages
  if (action.level > tmp.length) {
    tmp = tmp.concat(Array(action.level - tmp.length).fill(1))
  }
  return tmp.slice(0, action.level - 1).concat([numPages]).concat(tmp.slice(action.level))
}

export const NestedPaginationReducer = (state: NestedPaginationState, action: NestedPaginationAction): NestedPaginationState => {
  switch (action.type) {
    case 'register':
      return {
        pages: setPage(state, action, 1),
        numPages: setNumPages(state, action, action.numPages)
      }
    case 'start':
      return {
        ...state,
        pages: setPage(state, action, 1)
      }
    case 'end':
      return {
        ...state,
        pages: setPage(state, action, Math.max(1, getNumPages(state, action)))
      }
    case 'previous':
      return {
        ...state,
        pages: setPage(state, action, Math.max(1, getPage(state, action) - 1))
      }
    case 'next':
      return {
        ...state,
        pages: setPage(state, action, Math.min(getNumPages(state, action), getPage(state, action) + 1))
      }
    case 'goto':
      return {
        ...state,
        pages: setPage(state, action, Math.min(getNumPages(state, action), Math.max(1, action.page)))
      }
    default:
      throw new Error('Invalid action')
  }
}

export const NestedPaginationContext = createContext<NestedPaginationState | null>(null)
export const NestedPaginationDispatchContext = createContext<Dispatch<NestedPaginationAction> | null>(null)

interface NestedPaginationProviderProps {
  pages: number[]
  numPages: number[]
  onChange?: (state: NestedPaginationState) => void
  children: React.ReactNode
}

export const NestedPaginationProvider = ({ pages, numPages, onChange, children }: NestedPaginationProviderProps): ReactElement<any, any> => {
  const [state, dispatch] = useReducer(NestedPaginationReducer, {
    pages,
    numPages
  })

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(state)
    }
  }, [state, onChange])

  return <NestedPaginationContext.Provider value={state}>
        <NestedPaginationDispatchContext.Provider value={dispatch}>
          {children}
        </NestedPaginationDispatchContext.Provider>
    </NestedPaginationContext.Provider>
}
