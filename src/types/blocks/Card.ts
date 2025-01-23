import { createHighlightable, Highlightable } from "../behaviors";
import {
  Block,
  BlockActions,
  BlockGetter,
  BlockSetter,
  createBlock,
} from "./Block";

export const CardType = "aics:block.card";

export interface CardProps extends Block, Highlightable {}

export const createCard = (props: Partial<CardProps> = {}): CardProps => {
  return {
    ...createBlock(props as Partial<Block>),
    ...createHighlightable(props as Partial<Highlightable>),
    ...props,
    type: CardType,
  } as CardProps;
};

export interface CardActions extends BlockActions {}

export const createCardActions = (
  get: BlockGetter<CardProps>,
  set: BlockSetter<CardProps>,
): CardActions => {
  return {};
};

export type Card = CardProps & CardActions;
