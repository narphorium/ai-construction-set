import { BlockRegistry } from "@/core/BlockRegistry.js";
import { useBlockRenderer } from "@/hooks/useBlockRenderer.js";
import { useStoryContent } from "@/hooks/useStoryContent.js";
import { type Block } from "@/types/blocks/index.js";
import React from "react";

export interface BlockStoryProps<T extends Block> {
  builder: (registry: BlockRegistry) => T;
  theme?: string;
  highlighted?: boolean;
}

export const BlockStoryTemplate = <T extends Block>({
  builder,
  theme,
  highlighted,
}: BlockStoryProps<T>): JSX.Element => {
  const createAndPersistContent = useStoryContent(builder);
  const block = React.useMemo(
    () => createAndPersistContent(),
    [createAndPersistContent],
  );
  const renderer = useBlockRenderer();

  return <>{block && renderer.render(block)}</>;
};
