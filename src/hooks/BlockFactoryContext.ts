import { createContext } from "react";
import { BlockFactory } from "../components/BlockFactory";


interface BlockFactoryProps {
    factory: BlockFactory | undefined;
    setFactory: (factory: BlockFactory) => void;
}

export const BlockFactoryContext = createContext<BlockFactoryProps>({
    factory: undefined,
    setFactory: (factory: BlockFactory) => {}
});


