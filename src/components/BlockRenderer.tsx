import { Block } from '../types/blocks'

export type BlockRenderHandler = (block: Block, parent?: Block) => JSX.Element

export interface BlockRenderer {
  render: (block: Block, parent?: Block) => JSX.Element
  registerHandler: (target_class: string, builder: BlockRenderHandler) => void
  getParent: (block: Block) => Block | undefined
  setParent: (block: Block, parent: Block) => void
}
