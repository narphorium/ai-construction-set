import { type BlockComponentProps } from "@/components/blocks/Base.js";
import { useDarkMode } from "@/hooks/index.js";
import { cn } from "@/styles/index.js";
import React, {
  forwardRef,
  useState,
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from "react";

export const withTheme = <TProps extends BlockComponentProps>(
  Component: ComponentType<TProps>,
  params: { theme: string },
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithTheme = forwardRef(function (props: TProps, ref): JSX.Element {
    const [theme, setTheme] = useState(params.theme);

    return (
      <Component
        {...props}
        className={cn(props.className, `aics-${theme}-theme`)}
        ref={ref}
      />
    );
  });

  const componentName = Component.displayName ?? Component.name ?? "Component";
  WithTheme.displayName = `withTheme(${componentName})`;
  return WithTheme;
};
