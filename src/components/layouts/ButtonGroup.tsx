import React from "react";
import { cn } from "../../styles";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    const nonNullChildren = React.Children.toArray(children).filter(
      (child) => child,
    );
    const numChildren = nonNullChildren.length;
    const childrenWithPosition = React.Children.toArray(nonNullChildren).map(
      (child, index) => {
        let position = "single";
        if (React.Children.count(nonNullChildren) !== 1) {
          if (index === 0) {
            position = "start";
          } else if (index === numChildren - 1) {
            position = "end";
          } else {
            position = "middle";
          }
        }
        return React.cloneElement(child as React.ReactElement, {
          position,
        });
      },
    );
    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-px", className)}
        {...props}
      >
        {childrenWithPosition}
      </div>
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
