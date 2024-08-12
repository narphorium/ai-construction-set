import { createSelectable, SelectableProps } from "../behaviors"
import { BlockActions, BlockProps, createBlock } from "./Block"
import { BlockGetter, BlockSetter } from './Block'

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

export const createSpanActions = (get: BlockGetter<SpanProps>, set: BlockSetter<SpanProps>): SpanActions => {
  return {
    clear: () => set({ content: '' }),
    append: (text: string) => (text: string) => set({ content: get().content + text }),
  }
}

export type Span = SpanProps & SpanActions
