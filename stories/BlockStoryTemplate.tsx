import { BlockRegistry } from "@/core/BlockRegistry.js";
import { BlockStore } from "@/core/BlockStore.js";
import { useBlockRegistry } from "@/hooks/useBlockRegistry.js";
import { useBlockRenderer } from "@/hooks/useBlockRenderer.js";
import { useBlockStore } from "@/hooks/useBlockStore.js";
import { type Block } from "@/types/blocks/index.js";
import React, { useMemo } from "react";

export interface BlockStoryProps<T extends Block> {
  builder: (registry: BlockRegistry, store: BlockStore) => T;
}

export const BlockStoryTemplate = <T extends Block>({
  builder,
}: BlockStoryProps<T>): JSX.Element => {
  const registry = useBlockRegistry();
  const store = useBlockStore();
  const renderer = useBlockRenderer();

  // Use useMemo to ensure the builder function only runs once
  const block = useMemo(() => {
    console.log("Calling builder", builder);
    const block = builder(registry, store);
    const storedBlock = store.getBlock(block.uuid);
    return storedBlock;
  }, [registry, store, builder]);

  console.log("Block", block);

  return <>{block && renderer.render(block)}</>;
};
