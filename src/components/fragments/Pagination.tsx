import { Button, ButtonSize } from "@/components/blocks/Button";
import { ButtonGroup } from "@/components/layouts/ButtonGroup";
import { cn } from "@/styles";
import React from "react";
import { MaterialSymbol, MaterialSymbolWeight } from "react-material-symbols";

export interface PaginationProps {
  key: string;
  level: number;
  page?: number;
  setPage?: (page: number) => void;
  numPages: number;
  showEnds?: boolean;
  className?: string;
  variants?: "default" | "compact";
}

export const Pagination = ({
  key,
  className,
  page = 1,
  numPages,
  showEnds,
  setPage,
  variants = "default",
}: PaginationProps): JSX.Element => {
  const [pulseStates, setPulseStates] = React.useState({
    start: false,
    prev: false,
    next: false,
    end: false,
  });

  let buttonSize: ButtonSize = "medium";
  let iconSize = 22;
  let iconWeight: MaterialSymbolWeight = 300;
  if (variants === "compact") {
    buttonSize = "small";
    iconSize = 18;
    iconWeight = 400;
  }

  const pulseButton = (key: keyof typeof pulseStates) => {
    setPulseStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setPulseStates((prev) => ({ ...prev, [key]: false }));
    }, 400);
  };

  const gotoPage = React.useCallback(
    (newPage: number) => {
      newPage = Math.min(numPages, Math.max(1, newPage));
      if (newPage !== page) {
        setPage?.(newPage);
      }
    },
    [page, setPage, numPages],
  );

  const gotoStart = React.useCallback(() => {
    if (page !== 1) {
      gotoPage(1);
      pulseButton("start");
    }
  }, [page, gotoPage]);

  const gotoEnd = React.useCallback(() => {
    if (page !== numPages) {
      gotoPage(numPages);
      pulseButton("end");
    }
  }, [page, numPages, gotoPage]);

  const previousStep = React.useCallback(() => {
    if (page > 1) {
      gotoPage(page - 1);
      pulseButton("prev");
    }
  }, [page, gotoPage]);

  const nextStep = React.useCallback(() => {
    if (page < numPages) {
      gotoPage(page + 1);
      pulseButton("next");
    }
  }, [page, numPages, gotoPage]);

  return (
    <div className={cn("flex", className)}>
      <ButtonGroup>
        {showEnds && (
          <Button
            key={`${key}-first-page`}
            variant="secondary"
            size={buttonSize}
            onClick={gotoStart}
            title="Return to start"
            disabled={page === 1}
            className={cn(
              "pt-0.5",
              pulseStates.start && "animate-button-pulse",
            )}
          >
            <MaterialSymbol
              icon="first_page"
              size={iconSize}
              weight={iconWeight}
            />
          </Button>
        )}
        <Button
          key={`${key}-previous`}
          variant="secondary"
          size={buttonSize}
          onClick={previousStep}
          title="Previous"
          disabled={page === 1}
          className={cn("pt-0.5", pulseStates.prev && "animate-button-pulse")}
        >
          <MaterialSymbol
            icon="chevron_left"
            size={iconSize}
            weight={iconWeight}
          />
        </Button>
      </ButtonGroup>
      <span className="text-text mx-2 h-full align-middle text-sm tabular-nums leading-6">
        {page} of {numPages}
      </span>
      <ButtonGroup>
        <Button
          key={`${key}-next`}
          variant="secondary"
          size={buttonSize}
          onClick={nextStep}
          title="Next"
          disabled={page === numPages}
          className={cn("pt-0.5", pulseStates.next && "animate-button-pulse")}
        >
          <MaterialSymbol
            icon="chevron_right"
            size={iconSize}
            weight={iconWeight}
          />
        </Button>
        {showEnds && (
          <Button
            key={`${key}-last-page`}
            variant="secondary"
            size={buttonSize}
            onClick={gotoEnd}
            title="Jump to end"
            disabled={page === numPages}
            className={cn("pt-0.5", pulseStates.end && "animate-button-pulse")}
          >
            <MaterialSymbol
              icon="last_page"
              size={iconSize}
              weight={iconWeight}
            />
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};
