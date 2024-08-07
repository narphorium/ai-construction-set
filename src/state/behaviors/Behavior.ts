export interface BehaviorProps {
}

export const createBehavior = (props: Partial<BehaviorProps> = {}): BehaviorProps => {
  return {
    ...props
  } as BehaviorProps
}

export interface BehaviorActions {
}

export const createBehaviorActions = (props: Partial<BehaviorActions> = {}): BehaviorActions => {
  return {
    ...props
  } as BehaviorActions
}

export type Behavior = BehaviorProps & BehaviorActions