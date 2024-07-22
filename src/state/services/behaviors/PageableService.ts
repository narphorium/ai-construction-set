import { BehaviorService } from "../../../data"
import { Pageable } from "../../../data/behaviors"
import { BlockStore } from "../../BlockStore"

export interface PageableService extends BehaviorService<Pageable> {
  gotoPage: (page: number) => void
  gotoStart: () => void
  gotoEnd: () => void
  gotoNext: () => void
  gotoPrevious: () => void
  getNumPages: () => number
  setNumPages: (numPages: number) => void
}

const gotoPage = (store: BlockStore, blockId: string, page: number): void => {
  const block = store.getBehavior<Pageable>(blockId)
  if (block?.page !== undefined && block?.numPages !== undefined && page >= 1 && page <= block.numPages && page !== block.page) {
    store.updateBehavior<Pageable>(blockId, { page })
  }
}

const gotoStart = (store: BlockStore, blockId: string): void => {
  gotoPage(store, blockId, 1)
}

const gotoEnd = (store: BlockStore, blockId: string): void => {
  const block = store.getBehavior<Pageable>(blockId)
  if (block?.page !== undefined && block?.numPages !== undefined && block.page !== block.numPages) {
    store.updateBehavior<Pageable>(blockId, { page: block.numPages })
  }
}

const gotoNext = (store: BlockStore, blockId: string): void => {
  const block = store.getBehavior<Pageable>(blockId)
  if (block?.page !== undefined && block?.numPages !== undefined && block.page + 1 < block.numPages) {
    store.updateBehavior<Pageable>(blockId, { page: block.page + 1 })
  }
}

const gotoPrevious = (store: BlockStore, blockId: string): void => {
  const block = store.getBehavior<Pageable>(blockId)
  if (block?.page !== undefined && block?.numPages !== undefined && block.page - 1 >= 1) {
    store.updateBehavior<Pageable>(blockId, { page: block.page - 1 })
  }
}

const getNumPages = (store: BlockStore, blockId: string): number => {
  const block = store.getBehavior<Pageable>(blockId)
  return block?.numPages ?? 1
}

const setNumPages = (store: BlockStore, blockId: string, numPages: number): void => {
  store.updateBehavior<Pageable>(blockId, { numPages })
}

export const createPageableService = (store: BlockStore, blockId: string): PageableService => {
  return {
    gotoPage: (page: number) => gotoPage(store, blockId, page),
    gotoStart: () => gotoStart(store, blockId),
    gotoEnd: () => gotoEnd(store, blockId),
    gotoNext: () => gotoNext(store, blockId),
    gotoPrevious: () => gotoPrevious(store, blockId),
    getNumPages: () => getNumPages(store, blockId),
    setNumPages: (numPages: number) => setNumPages(store, blockId, numPages)
  }
}