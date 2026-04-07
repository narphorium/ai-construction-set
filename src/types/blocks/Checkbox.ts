import { createHighlightable, Highlightable } from "../behaviors/index.js";
import {
  BlockActions,
  BlockGetter,
  BlockSetter,
  createBaseBlock,
  type Block,
} from "./Block.js";

export const CheckboxType = "aics:block.checkbox";

export interface CheckboxProps extends Block, Highlightable {
  checked: boolean;
}

export const createCheckbox = (
  props: Partial<CheckboxProps> = {},
): CheckboxProps => {
  return {
    ...createBaseBlock(props as Partial<Block>),
    ...createHighlightable(props as Partial<Highlightable>),
    checked: false,
    ...props,
    type: CheckboxType,
  } as CheckboxProps;
};

export interface CheckboxActions extends BlockActions {
  setChecked(checked: boolean): void;
  toggleChecked(): void;
}

export const createCheckboxActions = (
  get: BlockGetter<CheckboxProps>,
  set: BlockSetter<CheckboxProps>,
): CheckboxActions => {
  return {
    setChecked: (checked: boolean) => set({ checked }),
    toggleChecked: () => set({ checked: !get().checked }),
  };
};

export type Checkbox = CheckboxProps & CheckboxActions;
