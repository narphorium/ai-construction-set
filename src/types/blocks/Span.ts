import { createSelectable, SelectableProps } from "../behaviors"
import { BlockActions, BlockID, BlockProps, createBlock } from "./Block"
import { BlockStore } from "../../state"

export interface SpanProps extends BlockProps, SelectableProps {
  datatype?: string
  content: string
}

export const createSpan = (props: Partial<SpanProps> = {}): SpanProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createSelectable(props as Partial<SelectableProps>),
    datatype: 'string',
    content: '',
    ...props,
    type: 'aics:span',
  } as SpanProps
}

export interface SpanActions extends BlockActions {
  clear(): void
  append(text: string): void
}

export const createSpanActions = (store: BlockStore, blockId: BlockID): SpanActions => {
  return {
    clear: () => store.updateBlock<SpanProps>(blockId, { content: '' }),
    append: (text: string) => store.updateBlock<SpanProps>(blockId, (state: SpanProps) => ({ content: state.content + text })),
  }
}

export type Span = SpanProps & SpanActions