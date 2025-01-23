import { useBlock } from "@/hooks";
import { cn } from "@/styles";
import { cva } from "class-variance-authority";
import React, {
  forwardRef,
  useMemo,
  type ComponentClass,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type Ref,
} from "react";
import { Collapsible, CollapsibleActions } from "../../types/behaviors";
import { BehaviorComponentProps } from "./Base";

const collapsibleVariants = cva("", {
  variants: {
    collapsed: {
      true: "aics-collapsed",
      false: "",
    },
  },
});

export interface CollapsibleComponentProps extends BehaviorComponentProps {
  collapsed: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  onTransitionEnd?: () => void;
}

export function withCollapsible<
  P extends CollapsibleComponentProps,
  C extends ComponentClass<P>,
>(
  Component: C & ComponentType<P>,
): ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> },
    keyof CollapsibleComponentProps
  >
>;

export function withCollapsible<
  P extends CollapsibleComponentProps & { ref?: Ref<any> },
>(
  Component: ForwardRefExoticComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleComponentProps>>;

export function withCollapsible<P extends CollapsibleComponentProps>(
  Component: FunctionComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof CollapsibleComponentProps>>;

export function withCollapsible<P extends CollapsibleComponentProps>(
  Component: ComponentType<P>,
): any {
  const WithCollapsible = forwardRef(function (props, ref): JSX.Element {
    const collapsibleProps = props as P;

    const collapsibleClasses = useMemo(
      () =>
        cn(
          collapsibleProps.className,
          collapsibleVariants({
            collapsed: collapsibleProps.collapsed,
          }),
        ),
      [collapsibleProps.className, collapsibleProps.collapsed],
    );

    const handleSetCollapsed = (c: boolean): void => {
      // Bubble up to parent component if present
      if (collapsibleProps.setCollapsed !== undefined) {
        collapsibleProps.setCollapsed(c);
      }
    };
    return (
      <Component
        {...collapsibleProps}
        ref={ref}
        setCollapsed={handleSetCollapsed}
        className={cn(collapsibleProps.className, collapsibleClasses)}
      />
    );
  });

  const componentName = Component.displayName ?? Component.name ?? "Component";
  WithCollapsible.displayName = `withCollapsible(${componentName})`;
  return WithCollapsible;
}
