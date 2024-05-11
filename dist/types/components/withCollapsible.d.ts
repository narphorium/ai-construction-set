import { type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react';
import { type CollapsibleProps } from './Base';
export declare function withCollapsible<P extends CollapsibleProps, C extends ComponentClass<P>>(Component: C & ComponentType<P>): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & {
    ref?: Ref<InstanceType<C>>;
}, keyof CollapsibleProps>>;
export declare function withCollapsible<P extends CollapsibleProps & {
    ref?: Ref<any>;
}>(Component: ForwardRefExoticComponent<P>): ForwardRefExoticComponent<Omit<P, keyof CollapsibleProps>>;
export declare function withCollapsible<P extends CollapsibleProps>(Component: FunctionComponent<P>): ForwardRefExoticComponent<Omit<P, keyof CollapsibleProps>>;
