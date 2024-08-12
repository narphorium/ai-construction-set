import { BlockStore } from "../../state"
import { BlockID } from "../blocks"

export interface BehaviorProps {
}

export const createBehavior = (props: Partial<BehaviorProps> = {}): BehaviorProps => {
  return {
    ...props
  } as BehaviorProps
}

export interface BehaviorActions {
}

export const createBehaviorActions = (store: BlockStore, blockId: BlockID): BehaviorActions => {
  return {
  } as BehaviorActions
}

export type Behavior = BehaviorProps & BehaviorActions