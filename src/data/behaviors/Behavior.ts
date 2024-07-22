export interface Behavior {
}

export const createBehavior = (props: Partial<Behavior>): Behavior => {
  return {
    ...props
  } as Behavior
}