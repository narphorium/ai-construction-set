import { type Collapsible, type Base, type Selectable, type Pageable } from '../data'

export interface BaseProps {
  className?: string | string[]
  variant?: string
}

export interface BlockProps extends BaseProps {
  block: Base
  theme?: string
}

export interface SelectableProps extends BlockProps {
  block: Selectable
  selected?: boolean
  setSelected?: (selected: boolean) => void
}

export interface CollapsibleProps extends BlockProps {
  block: Collapsible
  collapsed?: boolean
  setCollapsed?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

export interface PaginatedProps extends BlockProps {
  block: Pageable
  level: number
  page?: number
  setPage?: (page: number) => void
}

type classable = undefined | string | string[] | Set<string> | (() => string[])

export const getClasses = (...args: classable[]): string => {
  let classes: string[] = []
  args.forEach((arg: classable) => {
    if (typeof arg === 'string') {
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      classes = classes.concat(arg)
    } else if (arg instanceof Set) {
      classes = classes.concat(Array.from(arg))
    } else if (typeof arg === 'function') {
      classes = classes.concat(arg())
    }
  })
  return classes.join(' ')
}
