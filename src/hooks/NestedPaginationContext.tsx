import React, { createContext, useEffect, useReducer, type Dispatch, type ReactElement } from 'react'

export class NestedPaginationState {
  public pages: number[] = []
  public numPages: number[] = []

  static copy (state: NestedPaginationState): NestedPaginationState {
    const newState = new NestedPaginationState()
    newState.pages = state.pages.slice()
    newState.numPages = state.numPages.slice()
    return newState
  }

  public getPage (level: number): number {
    if (level > this.pages.length) {
      return 1
    }
    return this.pages[level - 1]
  }

  public getNumPages (level: number): number {
    if (level > this.numPages.length) {
      return 1
    }
    return this.numPages[level - 1]
  }
};

export type NestedPaginationAction =
| { type: 'register', numPages: number, level: number }
| { type: 'start', level: number }
| { type: 'end', level: number }
| { type: 'previous', level: number }
| { type: 'next', level: number }
| { type: 'goto', page: number, level: number }

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
  const newState = NestedPaginationState.copy(state)
  switch (action.type) {
    case 'register':
      newState.pages = setPage(state, action, 1)
      newState.numPages = setNumPages(state, action, action.numPages)
      break
    case 'start':
      newState.pages = setPage(state, action, 1)
      break
    case 'end':
      newState.pages = setPage(state, action, Math.max(1, state.getNumPages(action.level)))
      break
    case 'previous':
      newState.pages = setPage(state, action, Math.max(1, state.getPage(action.level) - 1))
      break
    case 'next':
      newState.pages = setPage(state, action, Math.min(state.getNumPages(action.level), state.getPage(action.level) + 1))
      break
    case 'goto':
      newState.pages = setPage(state, action, Math.min(state.getNumPages(action.level), Math.max(1, action.page)))
      break
    default:
      throw new Error('Invalid action')
  }
  return newState
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
  const initialState = new NestedPaginationState()
  initialState.pages = pages
  initialState.numPages = numPages
  const [state, dispatch] = useReducer(NestedPaginationReducer, initialState)

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
