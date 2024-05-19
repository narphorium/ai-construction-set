import { type Collapsible, type Selectable, type Pageable, type Base } from '../data'
import { type BlockAction } from '../hooks/useBlock'

export interface BaseProps {
  className?: string | string[]
}

export interface BlockProps extends BaseProps {
  block: Base
  dispatch: (action: BlockAction) => void
  theme?: string
}

export interface SelectableProps extends BlockProps {
  block: Selectable
  setSelected?: (selected: boolean) => void
}

export interface CollapsibleProps extends BlockProps {
  block: Collapsible
  setCollapsed?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

export interface PaginatedProps extends BlockProps {
  block: Pageable
  level: number
  page: number
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
