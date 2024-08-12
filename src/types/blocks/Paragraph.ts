import { BlockStore } from "../../state"
import { createSelectable, SelectableProps } from "../behaviors"
import { BlockActions, BlockID, BlockProps, createBlock } from "./Block"

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

export const createParagraphActions = (store: BlockStore, blockId: BlockID): ParagraphActions => {
  return {}
}

export type Paragraph = ParagraphProps & ParagraphActions