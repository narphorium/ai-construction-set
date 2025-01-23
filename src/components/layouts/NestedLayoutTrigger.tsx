import React from "react";
import { cn } from "../../styles";

interface NestedLayoutTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

export const NestedLayoutTrigger: React.FC<NestedLayoutTriggerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("aics-tree-control", className)}>
      <span className="border-tree absolute left-1 top-[9px] h-[6px] w-[6px] rounded-full border-2 bg-transparent" />
      {children}
    </div>
  );
};
