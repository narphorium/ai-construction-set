import { cva } from "class-variance-authority";
import React from "react";
import { BlockQuery } from "../../core/BlockQuery";
import { useBlockRegistry, useBlockStoreActions } from "../../hooks";
import { cn } from "../../styles";
import { HighlightableComponentProps } from "../behaviors";
import { BlockComponentProps } from "../blocks/Base";

export const nestedLayoutItemVariants = cva(
  "relative m-0 ml-2 border-l-2 border-tree pl-1 before:absolute before:-left-0.5 before:-top-[19px] before:-z-[1] before:block before:h-[32px] before:w-[10px] before:rounded-bl-md before:border-0 before:border-b-2 before:border-l-2 before:border-solid before:border-tree before:content-[''] last:border-transparent",
  {
    variants: {
      isLeaf: {
        true: "pl-6 before:top-[-12px] after:absolute after:left-[9px] after:top-[17px] after:z-[2] after:block after:h-2 after:w-2 after:rounded-full after:bg-tree after:content-['']",
        false: "",
      },
      highlighted: {
        true: "before:border-highlighted-tree after:bg-highlighted-tree",
        false: "",
      },
      beforeHighlighted: {
        true: "border-highlighted-tree",
        false: "",
      },
    },
    defaultVariants: {
      isLeaf: false,
      highlighted: false,
      beforeHighlighted: false,
    },
  },
);

export interface NestedLayoutItemProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  iteration?: number;
  leaf?: boolean;
}

export const NestedLayoutItem: React.FC<NestedLayoutItemProps> = ({
  iteration,
  leaf: isLeaf,
  highlighted,
  children,
  className,
}) => {
  const blockStore = useBlockStoreActions();
  const registry = useBlockRegistry();

  // const isFollowingSiblingSelected = new BlockQuery(registry)
  //   .subsequentSiblings()
  //   .hasBehaviorProperty<Highlightable>("highlighted", true);

  // const hasSelectedVisibleDescendant = new BlockQuery(registry)
  //   .descendants()
  //   .visible()
  //   .hasBehaviorProperty<Highlightable>("highlighted", true);

  // const isHighlighted =
  //   blockStore.findBlocks(block, hasHighlightedVisibleDescendant, registry)
  //     .length > 0;
  // const isBeforeHighlighted =
  //   blockStore.findBlocks(block, isFollowingSiblingHighlighted, registry)
  //     .length > 0;
  // const isLeaf = block.type !== TreeType;

  return (
    <div
      className={cn(
        nestedLayoutItemVariants({
          isLeaf,
          highlighted,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};
