import { cva } from "class-variance-authority";
import React, {
  forwardRef,
  useEffect,
  type ComponentClass,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type Ref,
} from "react";
import { Pageable } from "../../types/behaviors";
import { Block } from "../../types/blocks";
import { BehaviorComponentProps } from "./Base";

const pageableVariants = cva("", {
  variants: {
    hasMultiplePages: {
      true: "aics-paginated",
      false: "",
    },
  },
});

export interface PaginatedComponentProps extends BehaviorComponentProps {
  page: number;
  numPages: number;
  gotoPage?: (page: number) => void;
  setNumPages?: (numPages: number) => void;
}

export function withPageable<
  P extends PaginatedComponentProps,
  C extends ComponentClass<P>,
>(
  Component: C & ComponentType<P>,
): ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> },
    keyof PaginatedComponentProps
  >
>;

export function withPageable<
  P extends PaginatedComponentProps & { ref?: Ref<any> },
>(
  Component: ForwardRefExoticComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof PaginatedComponentProps>>;

export function withPageable<P extends PaginatedComponentProps>(
  Component: FunctionComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof PaginatedComponentProps>>;

export function withPageable<P extends PaginatedComponentProps>(
  Component: ComponentType<P>,
): any {
  const WithPageable = forwardRef(function (props, ref): JSX.Element {
    const pageableProps = props as P;

    useEffect(() => {
      let numPages = 1;
      if (pageableProps != null && pageableProps.children != null) {
        React.Children.forEach(
          pageableProps.children,
          (child: React.ReactNode) => {
            if (React.isValidElement(child)) {
              const block = child.props as Block;
              if (block.iteration && block.iteration > numPages) {
                numPages = block.iteration;
              }
            }
          },
        );
      }

      pageableProps.setNumPages?.(numPages);
    }, [pageableProps.children]);

    const pageableClasses = pageableVariants({
      hasMultiplePages:
        pageableProps.numPages !== undefined && pageableProps.numPages > 1,
      className: pageableProps.className,
    });

    const setPage = (p: number): void => {
      pageableProps.gotoPage?.(p);
    };

    return (
      <Component
        {...pageableProps}
        ref={ref}
        page={pageableProps.page}
        gotoPage={setPage}
        classNames={pageableClasses}
      />
    );
  });

  const componentName = Component.displayName ?? Component.name ?? "Component";
  WithPageable.displayName = `withPageable(${componentName})`;
  return WithPageable;
}

export default withPageable;
