import { type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react';
import { type Base } from '../data';
import { type BaseProps } from './Base';
export declare function withCascadingVariants<P extends BaseProps, C extends ComponentClass<P>>(Component: C & ComponentType<P>, params: {
    block: Base;
}): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & {
    ref?: Ref<InstanceType<C>>;
}, keyof BaseProps>>;
export declare function withCascadingVariants<P extends BaseProps & {
    ref?: Ref<any>;
}>(Component: ForwardRefExoticComponent<P>, params: {
    block: Base;
}): ForwardRefExoticComponent<Omit<P, keyof BaseProps>>;
export declare function withCascadingVariants<P extends BaseProps>(Component: FunctionComponent<P>, params: {
    block: Base;
}): ForwardRefExoticComponent<Omit<P, keyof BaseProps>>;
export default withCascadingVariants;
