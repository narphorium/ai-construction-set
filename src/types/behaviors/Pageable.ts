import { BlockStore } from "../../state"
import { BlockID } from "../blocks"
import { Behavior, BehaviorActions, createBehavior } from "./Behavior"

export interface PageableProps extends Behavior {
  page: number
  numPages: number
}

export const createPageable = (props: Partial<PageableProps> = {}): PageableProps => {
  return {
    ...createBehavior(props),
    page: 1,
    numPages: 1,
    ...props,
  } as Pageable
}

export interface PageableActions extends BehaviorActions {
  gotoPage: (page: number) => void
  gotoStart: () => void
  gotoEnd: () => void
  gotoNext: () => void
  gotoPrevious: () => void
  setNumPages: (numPages: number) => void
}

const gotoPage = (page: number) => {
  return (state: PageableProps): Partial<PageableProps> => {
    if (state.page !== undefined && state.numPages !== undefined && page >= 1 && page <= state.numPages && page !== state.page) {
      return { page }
    }
    return {}
  }
}

const gotoEnd = (state: PageableProps): Partial<PageableProps> => {
  if (state.page !== undefined && state.numPages !== undefined && state.page !== state.numPages) {
    return { page: state.numPages }
  }
  return {}
}

const gotoNext = (state: PageableProps): Partial<PageableProps> => {
  if (state.page !== undefined && state.numPages !== undefined && state.page + 1 < state.numPages) {
    return { page: state.page + 1 }
  }
  return {}
}

const gotoPrevious = (state: PageableProps): Partial<PageableProps> => {
  if (state.page !== undefined && state.numPages !== undefined && state.page - 1 >= 1) {
    return { page: state.page - 1 }
  }
  return {}
}

export const createPageableActions = (store: BlockStore, blockId: BlockID): PageableActions => {
  return {
    gotoPage: (page: number) => store.updateBehavior<PageableProps>(blockId, gotoPage(page)),
    gotoStart: () => store.updateBehavior<PageableProps>(blockId, gotoPage(1)),
    gotoEnd: () => store.updateBehavior<PageableProps>(blockId, gotoEnd),
    gotoNext: () => store.updateBehavior<PageableProps>(blockId, gotoNext),
    gotoPrevious: () => store.updateBehavior<PageableProps>(blockId, gotoPrevious),
    setNumPages: (numPages: number) => store.updateBehavior<PageableProps>(blockId, { numPages }),
  }
}

export type Pageable = PageableProps & PageableActions