import { Block } from "../../types/blocks"


export interface BlockComponentProps<T extends Block> {
  block: T
  theme?: string
  className?: string | string[]
}
