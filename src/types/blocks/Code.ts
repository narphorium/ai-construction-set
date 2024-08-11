import { BlockStore } from "../BlockStore"
import { BlockActions } from "./Block"
import { createParagraph, ParagraphProps } from "./Paragraph"


export interface CodeProps extends ParagraphProps {
  language?: string
  editable: false
}

export const createCode = (props: Partial<CodeProps> = {}): CodeProps => {
  return {
    ...createParagraph(props as Partial<ParagraphProps>),
    editable: false,
    ...props,
    type: 'aics:code',
  } as Code
}

export interface CodeActions extends BlockActions { }

export const createCodeActions = (store: BlockStore, blockId: string): CodeActions => {
  return {}
}

export type Code = CodeProps & CodeActions