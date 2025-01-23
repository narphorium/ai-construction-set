import { cn } from "@/styles";
import { cva } from "class-variance-authority";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  type ComponentClass,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type Ref,
} from "react";
import { BehaviorComponentProps } from "./Base";

const highlightableVariants = cva("", {
  variants: {
    highlighted: {
      true: "aics-highlighted",
      false: "",
    },
    ancestorHighlighted: {
      true: "aics-ancestor-highlighted",
      false: "",
    },
  },
  defaultVariants: {
    highlighted: false,
    ancestorHighlighted: false,
  },
});

export interface HighlightableComponentProps extends BehaviorComponentProps {
  highlighted: boolean;
  setHighlighted?: (highlighted: boolean) => void;
}

export function withHighlightable<
  P extends HighlightableComponentProps,
  C extends ComponentClass<P>,
>(
  Component: C & ComponentType<P>,
): ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> },
    keyof HighlightableComponentProps
  >
>;

export function withHighlightable<
  P extends HighlightableComponentProps & { ref?: Ref<any> },
>(
  Component: ForwardRefExoticComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof HighlightableComponentProps>>;

export function withHighlightable<P extends HighlightableComponentProps>(
  Component: FunctionComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof HighlightableComponentProps>>;

export function withHighlightable<P extends HighlightableComponentProps>(
  Component: ComponentType<P>,
): any {
  const WithHighlightable = forwardRef(function (props, ref): JSX.Element {
    const highlightableProps = props as P;

    // const ancestorSelected = new BlockQuery(blockRegistry)
    //   .ancestors()
    //   .hasBehaviorProperty<Selectable>("selected", true);

    // Does this need to run on every render?
    // const hasAncestorSelected =
    //   blockStore.findBlocks(
    //     selectableProps.block,
    //     ancestorSelected,
    //     blockRegistry,
    //   ).length > 0;

    const hasAncestorHighlighted = false;

    const highlightableClasses = useMemo(
      () =>
        cn(
          highlightableProps.className,
          highlightableVariants({
            highlighted: highlightableProps.highlighted,
            ancestorHighlighted: hasAncestorHighlighted,
          }),
        ),
      [highlightableProps.className, highlightableProps.highlighted],
    );

    const handleSetHighlighted = (s: boolean): void => {
      // Bubble up to parent component if present
      if (highlightableProps.setHighlighted !== undefined) {
        highlightableProps.setHighlighted(s);
      }
    };

    return (
      <Component
        {...highlightableProps}
        ref={ref}
        setHighlighted={handleSetHighlighted}
        className={highlightableClasses}
      />
    );
  });

  const componentName = Component.displayName ?? Component.name ?? "Component";
  WithHighlightable.displayName = `withHighlightable(${componentName})`;
  return WithHighlightable;
}

export default withHighlightable;
