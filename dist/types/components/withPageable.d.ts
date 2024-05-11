import { type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react';
import { type PaginatedProps } from './Base';
export declare function withPageable<P extends PaginatedProps, C extends ComponentClass<P>>(Component: C & ComponentType<P>): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & {
    ref?: Ref<InstanceType<C>>;
}, keyof PaginatedProps>>;
export declare function withPageable<P extends PaginatedProps & {
    ref?: Ref<any>;
}>(Component: ForwardRefExoticComponent<P>): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>;
export declare function withPageable<P extends PaginatedProps>(Component: FunctionComponent<P>): ForwardRefExoticComponent<Omit<P, keyof PaginatedProps>>;
export default withPageable;
