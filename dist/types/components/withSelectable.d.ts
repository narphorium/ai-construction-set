import { type ComponentClass, type ComponentPropsWithoutRef, type ComponentType, type ForwardRefExoticComponent, type FunctionComponent, type Ref } from 'react';
import { type SelectableProps } from './Base';
export declare function withSelectable<P extends SelectableProps, C extends ComponentClass<P>>(Component: C & ComponentType<P>): ForwardRefExoticComponent<Omit<ComponentPropsWithoutRef<C> & {
    ref?: Ref<InstanceType<C>>;
}, keyof SelectableProps>>;
export declare function withSelectable<P extends SelectableProps & {
    ref?: Ref<any>;
}>(Component: ForwardRefExoticComponent<P>): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>;
export declare function withSelectable<P extends SelectableProps>(Component: FunctionComponent<P>): ForwardRefExoticComponent<Omit<P, keyof SelectableProps>>;
export default withSelectable;
