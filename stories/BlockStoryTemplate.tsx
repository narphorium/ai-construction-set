import React from "react";
import { BlockRegistry } from "../src/core/BlockRegistry";
import { useBlockRenderer } from "../src/hooks/useBlockRenderer";
import { useStoryContent } from "../src/hooks/useStoryContent";
import { type Block } from "../src/types/blocks";

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
