import { cva } from "class-variance-authority";
import React, { useCallback, useEffect, useRef } from "react";

const contentStyles = cva(["overflow-hidden", "text-sm"]);

const innerStyles = cva([
  "text-sm",
  "px-2",
  "transition-[margin-top]",
  "ease-in-out",
]);

interface CollapsibleSectionContentProps {
  children: React.ReactNode;
  collapsed: boolean;
  onTransitionEnd?: () => void;
}

export function CollapsibleSectionContent({
  children,
  collapsed,
  onTransitionEnd,
}: CollapsibleSectionContentProps): JSX.Element {
  const inner = useRef<HTMLDivElement>(null);

  const updateInner = useCallback(() => {
    if (inner.current != null) {
      if (collapsed) {
        const h = -(inner.current.offsetHeight + 40);
        inner.current.setAttribute("style", "margin-top: " + h + "px");
      } else {
        inner.current.setAttribute("style", "margin-top: 0px");
      }
    }
  }, [collapsed]);

  useEffect(() => {
    updateInner();
  }, [collapsed, updateInner]);

  return (
    <div className={contentStyles()}>
      <div
        className={innerStyles()}
        ref={inner}
        onTransitionEnd={onTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
}
