import { cn } from "@/styles";
import { cva, type VariantProps } from "class-variance-authority";
import {
  forwardRef,
  default as React,
  useCallback,
  type ForwardedRef,
  type MouseEvent,
} from "react";
import { HighlightableComponentProps } from "../behaviors";
import { BlockComponentProps } from "./Base";

const paragraphStyles = cva("aics-paragraph font-default mx-4 my-2 text-sm", {
  variants: {
    highlighted: {
      true: "[&>span]:bg-span-highlighted [&>span]:text-primary",
      false: "",
    },
  },
  defaultVariants: {
    highlighted: false,
  },
});

export interface ParagraphBlockProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const ParagraphBlock = forwardRef(function ParagraphBlock(
  { key, className, children, onClick, highlighted }: ParagraphBlockProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const paragraphClasses = cn(paragraphStyles({ highlighted }), className);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (onClick !== undefined) {
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <div ref={ref} key={key} className={paragraphClasses} onClick={handleClick}>
      {children}
    </div>
  );
});

ParagraphBlock.displayName = "ParagraphBlock";
