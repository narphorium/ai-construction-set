import { CollapsibleComponentProps } from "@/components/behaviors/withCollapsible.js";
import { BlockComponentProps } from "@/components/blocks/Base.js";
import { CollapsibleHeading } from "@/components/blocks/CollapsibleHeading.js";
import { CollapsibleSectionContent } from "@/components/blocks/CollapsibleSectionContent.js";
import { cn } from "@/styles/index.js";
import React, { forwardRef } from "react";
import { SymbolCodepoints } from "react-material-symbols";

export interface CollapsibleSectionProps
  extends BlockComponentProps,
    CollapsibleComponentProps {
  summary?: string;
  icon?: SymbolCodepoints;
  onTransitionEnd?: () => void;
}

export const CollapsibleSection = forwardRef(function CollapsibleSection({
  children,
  collapsed,
  setCollapsed,
  summary,
  icon,
  className,
  onTransitionEnd,
}: CollapsibleSectionProps): JSX.Element {
  return (
    <div
      className={cn("group min-h-7 text-sm", className, {
        collapsible: summary !== undefined,
        collapsed: collapsed,
        "has-icon": icon !== undefined,
      })}
    >
      {summary && (
        <CollapsibleHeading
          summary={summary}
          icon={icon}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      )}
      <CollapsibleSectionContent
        collapsed={collapsed}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </CollapsibleSectionContent>
    </div>
  );
});

CollapsibleSection.displayName = "CollapsibleSection";
