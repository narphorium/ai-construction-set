export type BlockID = string;

export interface BlockProps {
  uuid: BlockID;
  type: string;
  classNames: Set<string>;
  children: BlockID[];
  parent?: string;
  iteration?: number;
  variant?: string;
  theme?: string;
}

export const createBaseBlock = (
  props: Partial<BlockProps> = {},
): BlockProps => {
  return {
    uuid: "",
    type: "aics:unknown",
    classNames: new Set(),
    children: [],
    ...props,
  } as Block;
};

export type BlockGetter<P extends BlockProps> = () => P;
export type BlockSetter<P extends BlockProps> = (state: Partial<P>) => void;

export interface BlockActions {}

export const createBaseBlockActions = (
  get: BlockGetter<BlockProps>,
  set: BlockSetter<BlockProps>,
): BlockActions => {
  return {};
};

export type Block = BlockProps & BlockActions;
