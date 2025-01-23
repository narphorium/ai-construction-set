import { BlockActions, BlockGetter, BlockSetter } from "./Block";
import { createParagraph, ParagraphProps } from "./Paragraph";

export const CodeType = "aics:block.code";

export interface CodeProps extends ParagraphProps {
  language?: string;
  editable: false;
}

export const createCode = (props: Partial<CodeProps> = {}): CodeProps => {
  return {
    ...createParagraph(props as Partial<ParagraphProps>),
    editable: false,
    ...props,
    type: CodeType,
  } as CodeProps;
};

export interface CodeActions extends BlockActions {}

export const createCodeActions = (
  get: BlockGetter<CodeProps>,
  set: BlockSetter<CodeProps>,
): CodeActions => {
  return {};
};

export type Code = CodeProps & CodeActions;
