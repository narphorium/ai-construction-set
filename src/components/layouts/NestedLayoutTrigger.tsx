import { cn } from "@/styles/index.js";
import React from "react";

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
      <span className="absolute left-1 top-[9px] h-[6px] w-[6px] rounded-full border-2 border-tree bg-transparent" />
      {children}
    </div>
  );
};
