import { HighlightableComponentProps } from "@/components/behaviors";
import { BlockComponentProps } from "@/components/blocks/Base";
import { cn } from "@/styles";
import { cva } from "class-variance-authority";
import React, { forwardRef, type ForwardedRef, type MouseEvent } from "react";
import { MaterialSymbol, SymbolCodepoints } from "react-material-symbols";
const tableLayoutStyles = cva([
  "aics-table-layout grid w-full grid-cols-[min-content_1fr] gap-0",
]);

const tableRowStyles = cva(["aics-table-row contents hover:bg-muted"]);

const tableCellStyles = cva(
  ["aics-table-cell grid-col-auto grid-row-auto px-2 py-1 text-sm"],
  {
    variants: {
      header: {
        true: [
          "w-[1%] whitespace-nowrap text-nowrap text-left align-top text-[9.5pt] font-normal text-muted-foreground",
        ],
        false: "",
      },
      first: {
        true: "first:rounded-tl-sm first:pt-[6px]",
        false: "",
      },
      last: {
        true: "last:rounded-tr-sm last:pt-[6px]",
        false: "",
      },
      firstBottom: {
        true: "first:rounded-bl-sm first:pb-[6px]",
        false: "",
      },
      lastBottom: {
        true: "last:rounded-br-sm last:pb-[6px]",
        false: "",
      },
    },
    defaultVariants: {
      header: false,
      first: false,
      last: false,
      firstBottom: false,
      lastBottom: false,
    },
  },
);

export interface TableLayoutProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

export const TableLayout = forwardRef(function TableBlock(
  { key, className, onClick, children }: TableLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const tableClasses = cn(tableLayoutStyles(), className);

  return (
    <div ref={ref} key={key} className={tableClasses} onClick={onClick}>
      {children}
    </div>
  );
});

TableLayout.displayName = "TableLayout";

export interface TableLayoutRowProps extends BlockComponentProps {}

export const TableLayoutRow = forwardRef(function TableLayoutRow(
  { key, className, children }: TableLayoutRowProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const rowClasses = cn(tableRowStyles(), className);

  return (
    <div key={key} className={rowClasses}>
      {children}
    </div>
  );
});

TableLayoutRow.displayName = "TableRow";

export interface TableLayoutCellProps extends BlockComponentProps {
  header?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isFirstBottom?: boolean;
  isLastBottom?: boolean;
  type?: "text" | "number" | "date";
  icon?: SymbolCodepoints;
}

export const TableLayoutCell = forwardRef(function TableLayoutCell(
  {
    key,
    className,
    children,
    header = false,
    isFirst = false,
    isLast = false,
    isFirstBottom = false,
    isLastBottom = false,
    type,
    icon,
  }: TableLayoutCellProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const cellClasses = cn(
    tableCellStyles({
      header,
      first: isFirst,
      last: isLast,
      firstBottom: isFirstBottom,
      lastBottom: isLastBottom,
    }),
    "flex items-center gap-1",
    type && header,
    className,
  );

  return (
    <div key={key} className={cellClasses}>
      {icon && <MaterialSymbol icon={icon} size={16} weight={200} />}
      {children}
    </div>
  );
});

TableLayoutCell.displayName = "TableCell";
