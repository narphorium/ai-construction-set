import { createSelectable, SelectableProps } from "../behaviors"
import { BlockStore } from "../BlockStore"
import { BlockActions, BlockProps, createBlock } from "./Block"

export interface ParagraphProps extends BlockProps, SelectableProps { }

export const createParagraph = (props: Partial<ParagraphProps> = {}): ParagraphProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createSelectable(props as Partial<SelectableProps>),
    ...props,
    type: 'aics:paragraph',
  } as ParagraphProps
}

export interface ParagraphActions extends BlockActions { }

export const createParagraphActions = (store: BlockStore, blockId: string): ParagraphActions => {
  return {}
}

export type Paragraph = ParagraphProps & ParagraphActions