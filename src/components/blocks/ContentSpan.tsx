import { HighlightableComponentProps } from "@/components/behaviors/index.js";
import { type BlockComponentProps } from "@/components/blocks/Base.js";
import { cn } from "@/styles/index.js";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef, type MouseEvent } from "react";

const contentSpan = cva(["inline-block", "rounded"], {
  variants: {
    highlighted: {
      true: "bg-highlight-card text-highlight-foreground",
      false: "",
    },
  },
  defaultVariants: {
    highlighted: false,
  },
});

export interface ContentSpanProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const ContentSpan = forwardRef(function ContentSpan(
  { key, className, children, onClick, highlighted }: ContentSpanProps,
  ref: ForwardedRef<HTMLSpanElement>,
): JSX.Element {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick !== undefined) {
      onClick(e);
    }
  };

  const spanClasses = cn(
    "aics-content-span",
    contentSpan({ highlighted }),
    className,
  );

  return (
    <span key={key} ref={ref} className={spanClasses} onClick={handleClick}>
      {children}
    </span>
  );
});

ContentSpan.displayName = "ContentSpan";
