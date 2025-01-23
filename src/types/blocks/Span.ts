import { createHighlightable, HighlightableProps } from "../behaviors";
import {
  BlockActions,
  BlockGetter,
  BlockProps,
  BlockSetter,
  createBlock,
} from "./Block";

export const SpanType = "aics:block.span";

export interface SpanProps extends BlockProps, HighlightableProps {
  datatype?: string;
  content: string;
}

export const createSpan = (props: Partial<SpanProps> = {}): SpanProps => {
  return {
    ...createBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    datatype: "string",
    content: "",
    ...props,
    type: SpanType,
  } as SpanProps;
};

export interface SpanActions extends BlockActions {
  clear(): void;
  append(text: string): void;
}

export const createSpanActions = (
  get: BlockGetter<SpanProps>,
  set: BlockSetter<SpanProps>,
): SpanActions => {
  return {
    clear: () => set({ content: "" }),
    append: (text: string) => (text: string) =>
      set({ content: get().content + text }),
  };
};

export type Span = SpanProps & SpanActions;
