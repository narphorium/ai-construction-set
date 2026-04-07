import { createHighlightable, HighlightableProps } from "../behaviors/index.js";
import {
  BlockActions,
  BlockGetter,
  BlockProps,
  BlockSetter,
  createBaseBlock,
} from "./Block.js";

export const ParagraphType = "aics:block.paragraph";

export interface ParagraphProps extends BlockProps, HighlightableProps {}

export const createParagraph = (
  props: Partial<ParagraphProps> = {},
): ParagraphProps => {
  return {
    ...createBaseBlock(props as Partial<BlockProps>),
    ...createHighlightable(props as Partial<HighlightableProps>),
    ...props,
    type: ParagraphType,
  } as ParagraphProps;
};

export interface ParagraphActions extends BlockActions {}

export const createParagraphActions = (
  get: BlockGetter<ParagraphProps>,
  set: BlockSetter<ParagraphProps>,
): ParagraphActions => {
  return {};
};

export type Paragraph = ParagraphProps & ParagraphActions;
