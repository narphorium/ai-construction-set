import {
  createHighlightable,
  createHighlightableActions,
  Highlightable,
  HighlightableActions,
} from "../behaviors/index.js";
import {
  Block,
  BlockActions,
  BlockGetter,
  BlockSetter,
  createBaseBlock,
  createBaseBlockActions,
} from "./Block.js";

export const CardType = "aics:block.card";

export interface CardProps extends Block, Highlightable {}

export const createCard = (props: Partial<CardProps> = {}): CardProps => {
  return {
    ...createBaseBlock(props as Partial<Block>),
    ...createHighlightable(props as Partial<Highlightable>),
    ...props,
    type: CardType,
  } as CardProps;
};

export interface CardActions extends BlockActions, HighlightableActions {}

export const createCardActions = (
  get: BlockGetter<CardProps>,
  set: BlockSetter<CardProps>,
): CardActions => {
  return {
    ...createBaseBlockActions(get, set),
    ...createHighlightableActions(get, set),
  };
};

export type Card = CardProps & CardActions;
