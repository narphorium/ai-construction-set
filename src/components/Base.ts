import { type Dispatch, type SetStateAction } from 'react'

export interface BaseProps {
  className?: string | string[]
  variant?: string
  key: any
}

export interface SelectableProps extends BaseProps {
  selected?: boolean | Dispatch<SetStateAction<boolean>>
  onSelected?: (selected: boolean) => void
}

export interface CollapsibleProps extends BaseProps {
  collapsed?: boolean | Dispatch<SetStateAction<boolean>>
  onToggle?: (collapsed: boolean) => void
  onTransitionEnd?: () => void
}

export interface PaginatedProps extends BaseProps {
  page?: number
  setPage?: (page: number) => void
}
