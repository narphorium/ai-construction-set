import { BehaviorComponentProps } from "@/components/behaviors/Base.js";
import { BlockComponentProps } from "@/components/blocks/Base.js";
import { Behavior } from "@/types/behaviors/Behavior.js";
import { Block } from "@/types/blocks/Block.js";
import { ForwardRefExoticComponent } from "react";

export type BehaviorRenderHandler<
  T extends Behavior,
  TProps extends BehaviorComponentProps,
> = (Component: ForwardRefExoticComponent<TProps>, block: T) => JSX.Element;

export type BlockRenderHandler<
  T extends Block,
  TProps extends BlockComponentProps,
> = (
  Component: ForwardRefExoticComponent<TProps>,
  block: T,
  parent?: T,
  children?: React.ReactNode,
) => JSX.Element;

export interface BlockRenderer {
  registerBehaviorHandler: <
    T extends Behavior,
    TProps extends BehaviorComponentProps,
  >(
    behaviorType: string,
    builder: BehaviorRenderHandler<T, TProps>,
  ) => void;
  registerBlockHandler: <T extends Block, TProps extends BlockComponentProps>(
    blockType: string,
    blockComponent: ForwardRefExoticComponent<TProps>,
    builder: BlockRenderHandler<T, TProps>,
  ) => void;
  render: (block: Block, parent?: Block) => JSX.Element;
  getParent: (block: Block) => Block | undefined;
  setParent: (block: Block, parent: Block) => void;
}
