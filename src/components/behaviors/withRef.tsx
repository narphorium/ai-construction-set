import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ComponentClass,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type Ref,
} from "react";

export interface BlockRef {
  scrollIntoView: (args: any) => void;
}

interface WithRefProps {
  key: string;
  className?: string;
}

export function withRef<P extends WithRefProps, C extends ComponentClass<P>>(
  Component: C & ComponentType<P>,
): ForwardRefExoticComponent<
  Omit<
    ComponentPropsWithoutRef<C> & { ref?: Ref<InstanceType<C>> },
    keyof WithRefProps
  >
>;

export function withRef<P extends WithRefProps & { ref?: Ref<any> }>(
  Component: ForwardRefExoticComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>;

export function withRef<P extends WithRefProps>(
  Component: FunctionComponent<P>,
): ForwardRefExoticComponent<Omit<P, keyof WithRefProps>>;

export function withRef<P extends WithRefProps>(
  Component: ComponentType<P>,
): any {
  const WithRef = forwardRef(function (props, _ref): JSX.Element {
    const blockProps = props as P;
    const ref = useRef<BlockRef>(null);

    useImperativeHandle(ref, () => ({
      scrollIntoView: (args: any) => {
        ref.current?.scrollIntoView({
          ...args,
          behavior: "smooth",
          block: "center",
        });
      },
    }));

    return <Component {...blockProps} ref={ref} key={blockProps.key} />;
  });

  const componentName = Component.displayName ?? Component.name ?? "Component";
  WithRef.displayName = `withRef(${componentName})`;
  return WithRef;
}

export default withRef;
