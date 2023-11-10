export interface BaseProps {
  className?: string | string[]
  variant?: string
  key: any
}

export interface SelectableProps extends BaseProps {
  selected?: boolean
  onSelected?: (selected: boolean) => void
}

export interface CollapsibleProps extends BaseProps {
  collapsed?: boolean
  onToggle?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

export interface PaginatedProps extends BaseProps {
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
