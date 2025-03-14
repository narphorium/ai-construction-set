import { DefaultBlockRegistry, type BlockRegistry } from "@/core/BlockRegistry";
import React, { createContext, useRef, type ReactNode } from "react";

interface BlockRegistryContextProps {
  registry: BlockRegistry | undefined;
  setRegistry: (registry: BlockRegistry) => void;
}

export const BlockRegistryContext = createContext<BlockRegistryContextProps>({
  registry: undefined,
  setRegistry: (registry: BlockRegistry) => {},
});

export interface BlockRegistryProviderProps {
  registry?: BlockRegistry;
  children: ReactNode;
}

export const BlockRegistryProvider = ({
  registry,
  children,
}: BlockRegistryProviderProps): JSX.Element => {
  const registryRef = useRef<BlockRegistry>();
  if (registry !== undefined) {
    registryRef.current = registry;
  } else if (registryRef.current === undefined) {
    registryRef.current = new DefaultBlockRegistry();
  }

  return (
    <BlockRegistryContext.Provider
      value={{ registry: registryRef.current, setRegistry: () => {} }}
    >
      {children}
    </BlockRegistryContext.Provider>
  );
};
