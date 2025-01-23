import {
  Collapsible,
  createCollapsible,
  createHighlightable,
  Highlightable,
} from "../behaviors";
import {
  Block,
  BlockActions,
  BlockGetter,
  BlockSetter,
  createBlock,
} from "./Block";

export const SectionType = "aics:block.section";

export interface SectionProps extends Block, Highlightable, Collapsible {
  summary?: string;
  icon?: string;
  collapsible?: boolean;
}

export const createSection = (
  props: Partial<SectionProps> = {},
): SectionProps => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createHighlightable(props as Partial<Highlightable>),
    ...createCollapsible(props as Partial<Collapsible>),
    collapsible: false,
    ...props,
    type: SectionType,
  } as SectionProps;
};

export interface SectionActions extends BlockActions {}

export const createSectionActions = (
  get: BlockGetter<SectionProps>,
  set: BlockSetter<SectionProps>,
): SectionActions => {
  return {};
};

export type Section = SectionProps & SectionActions;
