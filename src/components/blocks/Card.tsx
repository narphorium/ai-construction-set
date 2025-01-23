import { HighlightableComponentProps } from "@/components/behaviors";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef } from "react";
import { cn } from "../../styles";
import { BlockComponentProps } from "./Base";

const cardStyles = cva(
  ["aics-card", "relative", "border", "rounded", "m-1", "transition-all"],
  {
    variants: {
      highlighted: {
        false: [
          "bg-card",
          "border-border",
          "text-card-foreground",
          "font-normal",
        ],
        true: [
          "border-highlight-border",
          "bg-highlight-card",
          "text-highlight-foreground",
        ],
      },
    },
    defaultVariants: {
      highlighted: false,
    },
  },
);

export interface CardProps
  extends BlockComponentProps,
    HighlightableComponentProps {}

export const Card = forwardRef(function Card(
  { className, children, highlighted, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  return (
    <div
      ref={ref}
      className={cn(cardStyles({ highlighted }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
