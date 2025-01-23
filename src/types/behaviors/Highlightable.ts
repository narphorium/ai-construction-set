import {
  Behavior,
  BehaviorActions,
  BehaviorGetter,
  BehaviorSetter,
  createBehavior,
} from "./Behavior";

export const HighlightableType = "aics:behavior.highlightable";

export interface HighlightableProps extends Behavior {
  highlighted: boolean;
  highlightIndex?: number;
}

export const createHighlightable = (
  props: Partial<HighlightableProps> = {},
): HighlightableProps => {
  const highlightable = {
    ...createBehavior(props),
    selected: false,
    selectionIndex: undefined,
    ...props,
  };
  return highlightable as HighlightableProps;
};

export interface HighlightableActions extends BehaviorActions {
  setSelected: (selected: boolean) => void;
}

export const createHighlightableActions = (
  get: BehaviorGetter<HighlightableProps>,
  set: BehaviorSetter<HighlightableProps>,
): HighlightableActions => {
  return {
    setSelected: (selected: boolean) => set({ highlighted: selected }),
  };
};

export type Highlightable = HighlightableProps & HighlightableActions;
