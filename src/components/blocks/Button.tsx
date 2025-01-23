import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../styles";
import { LeafBlockComponentProps } from "./Base";

const buttonVariants = cva(
  "bg-button h-6 w-6 border-0 align-middle text-secondary-foreground transition-colors focus:outline-none disabled:text-secondary-foreground/50",
  {
    variants: {
      position: {
        start: "rounded-l-md",
        end: "rounded-r-md",
        middle: "",
        single: "rounded-md",
      },
      size: {
        small: "h-6 w-6",
        medium: "h-7 w-8",
        large: "h-9 w-10",
      },
      variant: {
        primary:
          "bg-primary/50 text-primary-foreground hover:bg-primary disabled:bg-primary/50 disabled:text-primary-foreground/50",
        secondary:
          "bg-secondary/50 text-secondary-foreground hover:bg-secondary disabled:bg-secondary/50 disabled:text-secondary-foreground/50",
      },
    },
    defaultVariants: {
      position: "single",
    },
  },
);

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    LeafBlockComponentProps {
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, position, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ position, variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
