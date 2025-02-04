import { PaginatedComponentProps } from "@/components/behaviors/index.js";
import { type BlockComponentProps } from "@/components/blocks/Base.js";
import { BlockQuery } from "@/core/BlockQuery.js";
import { useBlockRegistry, useBlockStoreActions } from "@/hooks/index.js";
import { cn } from "@/styles/index.js";
import { Highlightable } from "@/types/behaviors/index.js";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef } from "react";
import { NestedLayoutItem } from "./NestedLayoutItem.js";
import { NestedLayoutTitle } from "./NestedLayoutTitle.js";
import { NestedLayoutTrigger } from "./NestedLayoutTrigger.js";

export const nestedLayoutVariants = cva("relative mb-3 ml-0 mt-3 pl-0", {
  variants: {
    hasIcon: {
      true: "",
      false: "",
    },
    highlighted: {
      true: "[&_.aics-tree-control>span]:border-highlighted-tree [&_.aics-tree-title]:before:bg-highlighted-tree",
      false: "",
    },
  },
  defaultVariants: {
    hasIcon: false,
    highlighted: false,
  },
});

export interface NestedLayoutProps
  extends BlockComponentProps,
    PaginatedComponentProps {
  level: number;
  page: number;
  numPages: number;
  gotoPage: (page: number) => void;
}

export const NestedLayoutComponent = forwardRef(function NestedLayout(
  {
    key,
    className,
    children,
    level,
    page,
    numPages,
    gotoPage: setPage,
  }: NestedLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const blockStore = useBlockStoreActions();
  const registry = useBlockRegistry();

  // const hasSelectedVisibleDescendant = new BlockQuery(registry)
  //   .descendants()
  //   .visible()
  //   .hasBehaviorProperty<Selectable>("selected", true);

  // const hasSelected =
  //   blockStore.findBlocks(block, hasSelectedVisibleDescendant, registry)
  //     .length > 0;
  // const hasIcon = block.icon !== undefined;

  const hasHighlighted = false;

  const filterChildren = (children: React.ReactNode): React.ReactNode[] => {
    return React.Children.toArray(children).filter((child) => {
      if (React.isValidElement(child) && child.type === NestedLayoutItem) {
        const iteration = child.props.iteration;
        return iteration === undefined || iteration === page;
      }
      return false;
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        nestedLayoutVariants({ highlighted: hasHighlighted }),
        className,
      )}
    >
      {filterChildren(children)}
    </div>
  );
});

NestedLayoutComponent.displayName = "NestedLayout";

export const NestedLayout = NestedLayoutComponent;
