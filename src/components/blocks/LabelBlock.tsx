import { HighlightableComponentProps } from "@/components/behaviors";
import { BlockComponentProps } from "@/components/blocks/Base";
import { cn } from "@/styles";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef, type MouseEvent } from "react";

const labelBlock = cva(
  ["inline-block", "rounded", "bg-left-top", "bg-no-repeat font-semibold"],
  {
    variants: {
      highlighted: {
        true: "bg-highlight-card text-highlight-foreground",
        false: "",
      },
    },
    defaultVariants: {
      highlighted: false,
    },
  },
);

export interface LabelBlockProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const LabelBlock = forwardRef(function LabelBlock(
  { key, className, onClick, highlighted, children }: LabelBlockProps,
  ref: ForwardedRef<HTMLSpanElement>,
): JSX.Element {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e);
    }
  };

  const spanClasses = cn("aics-label ", labelBlock({ highlighted }), className);

  return (
    <span ref={ref} key={key} className={spanClasses} onClick={handleClick}>
      {children}
    </span>
  );
});

LabelBlock.displayName = "LabelBlock";
