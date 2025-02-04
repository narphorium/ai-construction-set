import { Pagination } from "@/components/fragments/Pagination.js";
import { cn } from "@/styles/index.js";
import { cva } from "class-variance-authority";
import React from "react";

export const nestedLayoutTitleVariants = cva(
  "relative pl-6 [&_.aics-tree-title]:before:absolute [&_.aics-tree-title]:before:left-2 [&_.aics-tree-title]:before:top-[18px] [&_.aics-tree-title]:before:z-[1] [&_.aics-tree-title]:before:h-[18px] [&_.aics-tree-title]:before:w-0.5 [&_.aics-tree-title]:before:bg-tree [&_.aics-tree-title]:before:content-['']",
);

interface NestedLayoutTitleProps {
  key: string;
  children: React.ReactNode;
  level: number;
  page: number;
  numPages: number;
  setPage: (page: number) => void;
  className?: string;
}

export const NestedLayoutTitle: React.FC<NestedLayoutTitleProps> = ({
  key,
  children,
  level,
  page,
  numPages,
  setPage,
  className,
}) => {
  return (
    <div className={cn(nestedLayoutTitleVariants({}), className)}>
      <label className="mr-3 text-[12pt] font-medium leading-6 text-primary">
        {children}
      </label>
      {numPages !== undefined && numPages > 1 && (
        <Pagination
          level={level}
          page={page}
          numPages={numPages}
          setPage={setPage}
          key={key}
        />
      )}
    </div>
  );
};
