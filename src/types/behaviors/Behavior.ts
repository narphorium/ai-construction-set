export interface BehaviorProps {
}

export const createBehavior = (props: Partial<BehaviorProps> = {}): BehaviorProps => {
  return {
    ...props
  } as BehaviorProps
}

export type BehaviorGetter<P extends BehaviorProps> = () => P
export type BehaviorSetter<P extends BehaviorProps> = (state: Partial<P>) => void

export interface BehaviorActions {
}

export const createBehaviorActions = (get: BehaviorGetter<BehaviorProps>, set: BehaviorSetter<BehaviorProps>): BehaviorActions => {
  return {
  } as BehaviorActions
}

export type Behavior = BehaviorProps & BehaviorActions