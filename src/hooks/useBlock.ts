import { useReducer } from 'react'
import { type Base } from '../data'

export enum BlockActionType {
  SET_SELECTED = 'SET_SELECTED',
  SET_COLLAPSED = 'SET_COLLAPSED',
  SET_PAGE = 'SET_PAGE'
}

export type BlockAction = { type: BlockActionType.SET_SELECTED, selected: boolean }
| { type: BlockActionType.SET_COLLAPSED, collapsed: boolean }
| { type: BlockActionType.SET_PAGE, page: number }

export const blockReducer = <T extends Base>(state: T, action: BlockAction): T => {
  switch (action.type) {
    case BlockActionType.SET_SELECTED:
      return {
        ...state,
        block: { ...state, selected: action.selected },
        selected: action.selected
      }
    case BlockActionType.SET_COLLAPSED:
      return {
        ...state,
        block: { ...state, collapsed: action.collapsed },
        collapsed: action.collapsed
      }
    case BlockActionType.SET_PAGE:
      return {
        ...state,
        block: { ...state, page: action.page },
        page: action.page
      }
  }
}

const useBlock = <T extends Base>(initalState: T): { state: T, dispatch: (action: BlockAction) => void } => {
  const [state, dispatch] = useReducer(blockReducer<T>, initalState)

  return { state, dispatch }
}

export default useBlock
