import { cva } from "class-variance-authority";
import React from "react";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";

const headerStyles = cva(["relative"]);

const controlStyles = cva(
  [
    "absolute",
    "top-[3px]",
    "left-1",
    "p-0",
    "m-0",
    "transition-transform",
    "transform",
    "duration-3000",
    "ease-in-out",
    "w-5",
    "h-5",
    "inline-block",
    "focus:outline-none",
    "text-muted-foreground",
  ],
  {
    variants: {
      collapsed: {
        true: "rotate-0",
        false: "rotate-90",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  },
);

const titleStyles = cva([
  "inline-flex",
  "items-center",
  "gap-1",
  "mt-1",
  "px-6",
  "select-none",
  "relative",
  "text-sm",
  "focus:outline-none",
]);

interface CollapsibleHeadingProps {
  summary: string;
  collapsed: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  icon?: SymbolCodepoints;
}

export const CollapsibleHeading: React.FC<CollapsibleHeadingProps> = ({
  summary,
  icon,
  collapsed,
  setCollapsed,
}) => {
  const handleClick = () => {
    setCollapsed?.(!collapsed);
  };

  return (
    <div className={headerStyles()}>
      <div className={controlStyles({ collapsed })} onClick={handleClick}>
        <MaterialSymbol icon={"chevron_right"} size={20} weight={200} />
      </div>
      <div className={titleStyles()} onClick={handleClick}>
        {icon && <MaterialSymbol icon={icon} size={20} weight={200} />}
        {summary}
      </div>
    </div>
  );
};
