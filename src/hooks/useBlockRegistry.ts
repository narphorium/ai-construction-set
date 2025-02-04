import { BlockRegistryContext } from "@/context/BlockRegistryContext.js";
import { type BlockRegistry } from "@/core/BlockRegistry.js";
import { useContext } from "react";

export const useBlockRegistry = (): BlockRegistry => {
  const { registry } = useContext(BlockRegistryContext);

  if (registry === undefined) {
    throw new Error(
      "useBlockRegistry must be used within BlockRegistryProvider",
    );
  }

  return registry;
};
