import { Behavior } from "../../types/behaviors";
import { Block } from "../../types/blocks";

export interface BehaviorComponentProps<T extends Behavior> {
  block: Block & T
  className?: string | string[]
}