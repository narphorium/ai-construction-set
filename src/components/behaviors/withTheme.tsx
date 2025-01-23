import { cn } from "@/styles";
import React, {
  forwardRef,
  useState,
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from "react";
import { useDarkMode } from "../../hooks";
import { BlockComponentProps } from "../blocks/Base";

export const withTheme = <TProps extends BlockComponentProps>(
  Component: ComponentType<TProps>,
  params: { theme: string },
): ForwardRefExoticComponent<PropsWithoutRef<TProps> & RefAttributes<any>> => {
  const WithTheme = forwardRef(function (props: TProps, ref): JSX.Element {
    const [theme, setTheme] = useState(params.theme);
    const [darkMode, setDarkMode] = useDarkMode();

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
