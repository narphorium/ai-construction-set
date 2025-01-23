import { BlockGetter, BlockSetter } from "@/index";
import { createSpan, createSpanActions, SpanActions, SpanProps } from "./Span";

export const LabelType = "aics:block.label";

export interface LabelProps extends SpanProps {}

export const createLabel = (props: Partial<LabelProps> = {}): LabelProps => {
  return {
    ...createSpan(props as Partial<SpanProps>),
    ...props,
    type: LabelType,
  } as LabelProps;
};

export interface LabelActions extends SpanActions {}

export const createLabelActions = (
  get: BlockGetter<LabelProps>,
  set: BlockSetter<LabelProps>,
): LabelActions => {
  return {
    ...createSpanActions(get, set),
  };
};

export type Label = LabelProps & LabelActions;
