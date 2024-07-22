import { Behavior, createBehavior } from './Behavior'

export interface Collapsible extends Behavior {
  collapsed: boolean
}

export const createCollapsible = (props: Partial<Collapsible>): Collapsible => {
  return {
    ...createBehavior(props),
    name: '',
    collapsed: true,
    ...props,
  } as Collapsible
}
