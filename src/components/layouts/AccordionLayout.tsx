import {
  CollapsibleComponentProps,
  HighlightableComponentProps,
} from "@/components/behaviors";
import { cn } from "@/styles";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef } from "react";
import { SymbolCodepoints } from "react-material-symbols";
import { type BlockComponentProps } from "../blocks/Base";
import { CollapsibleSection } from "../blocks/CollapsibleSection";

const accordionLayoutStyles = cva(["aics-accordion-layout", "my-1"], {
  variants: {
    nested: {
      true: "mx-2",
      false: "",
    },
  },
  defaultVariants: {
    nested: false,
  },
});

const accordionItemStyles = cva(
  [
    "relative",
    "aics-accordion-item",
    "py-1",
    "m-0",
    "border",
    "border-[1px]",
    "rounded-none",
    "first:rounded-t-sm",
    "last:rounded-b-sm",
    "-mt-[1px]",
  ],
  {
    variants: {
      highlighted: {
        true: "z-10 border-highlight-border bg-highlight-card text-highlight-foreground",
        false: "border-border bg-card text-card-foreground",
      },
    },
    defaultVariants: {
      highlighted: false,
    },
  },
);

export interface AccordionLayoutProps extends BlockComponentProps {}

export const AccordionLayout = forwardRef(function AccordionLayout(
  { key, className, children }: AccordionLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const layoutClasses = cn(accordionLayoutStyles(), className);

  return (
    <div ref={ref} className={layoutClasses} key={key}>
      {children}
    </div>
  );
});

export interface AccordionLayoutItemProps
  extends BlockComponentProps,
    HighlightableComponentProps,
    CollapsibleComponentProps {
  summary?: string;
  icon?: SymbolCodepoints;
}

export const AccordionLayoutItem = forwardRef(function AccordionLayoutItem(
  {
    key,
    className,
    children,
    highlighted,
    collapsed,
    setCollapsed,
    summary,
    icon,
  }: AccordionLayoutItemProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  // const isFollowingSiblingSelected = new BlockQuery(registry)
  //   .subsequentSiblings()
  //   .hasBehaviorProperty<Selectable>("selected", true);

  // const beforeSelected =
  //   blockStore.findBlocks(block, isFollowingSiblingSelected, registry).length >
  //   0;

  const itemClasses = cn(
    accordionItemStyles({
      highlighted,
    }),
    className,
  );

  return (
    <div className={itemClasses} key={key}>
      <CollapsibleSection
        key={`${key}-section`}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        summary={summary}
        icon={icon}
      >
        {children}
      </CollapsibleSection>
    </div>
  );
});
