import { createSelectable, SelectableProps } from "../behaviors"
import { BlockStore } from "../BlockStore"
import { BlockActions, BlockProps, createBlock } from "./Block"

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

const clear = (store: BlockStore, blockId: string) => {
  store.updateBlock<SpanProps>(blockId, { content: '' })
}

const append = (store: BlockStore, blockId: string, text: string) => {
  const span = store.getBlock<SpanProps>(blockId)
  if (span != null) {
    store.updateBlock<SpanProps>(blockId, { content: span.content + text })
  }
}

export const createSpanActions = (store: BlockStore, blockId: string): SpanActions => {
  return {
    clear: () => clear(store, blockId),
    append: (text: string) => append(store, blockId, text),
  }
}

export type Span = SpanProps & SpanActions