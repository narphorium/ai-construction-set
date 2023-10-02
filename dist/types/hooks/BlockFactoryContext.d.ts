/// <reference types="react" />
import { type BlockFactory } from '../components/BlockFactory';
interface BlockFactoryProps {
    factory: BlockFactory | undefined;
    setFactory: (factory: BlockFactory) => void;
}
export declare const BlockFactoryContext: import("react").Context<BlockFactoryProps>;
export {};
