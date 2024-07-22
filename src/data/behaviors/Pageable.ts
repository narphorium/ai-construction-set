import { Behavior, createBehavior } from './Behavior'

export interface Pageable extends Behavior {
  page: number
  numPages: number
}

export const createPageable = (props: Partial<Pageable>): Pageable => {
  return {
    ...createBehavior(props),
    page: 1,
    numPages: 1,
    ...props,
  } as Pageable
}
