import { BlockComponentProps } from "@/components/blocks/Base";
import { CollapsibleHeading } from "@/components/blocks/CollapsibleHeading";
import { CollapsibleSectionContent } from "@/components/blocks/CollapsibleSectionContent";
import { cn } from "@/styles";
import React, { forwardRef } from "react";
import { SymbolCodepoints } from "react-material-symbols";
import { CollapsibleComponentProps } from "../behaviors";

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
