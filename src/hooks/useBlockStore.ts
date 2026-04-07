import { BlockStoreContext } from "@/context/BlockStoreContext.js";
import { BlockStoreActions, type BlockStore } from "@/core/BlockStore.js";
import { useContext } from "react";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

export const useBlockStore = (): BlockStore => {
  const blockStoreContext = useContext(BlockStoreContext);

  if (blockStoreContext === null) {
    throw new Error("useBlockStore must be used within BlockStoreProvider");
  }

  return blockStoreContext.getState();
};

export const useBlockStoreSelector = <Selected>(
  selector: (state: BlockStore) => Selected,
  equalityFn?: (a: Selected, b: Selected) => boolean,
): Selected => {
  const blockStoreContext = useContext(BlockStoreContext);

  if (blockStoreContext === null) {
    throw new Error(
      "useBlockStoreSelector must be used within BlockStoreProvider",
    );
  }

  return useStoreWithEqualityFn(blockStoreContext, selector, equalityFn);
};

export const useBlockStoreActions = (): BlockStoreActions => {
  const blockStoreContext = useContext(BlockStoreContext);

  if (blockStoreContext === null) {
    throw new Error(
      "useBlockStoreActions must be used within BlockStoreProvider",
    );
  }

  return useStoreWithEqualityFn(
    blockStoreContext,
    (state) => ({
      applyBlockTransformations: state.applyBlockTransformations,
      addDocument: state.addDocument,
      getDocument: state.getDocument,
      updateDocument: state.updateDocument,
      addRootBlock: state.addRootBlock,
      deleteDocument: state.deleteDocument,

      addBlock: state.addBlock,
      addChildBlock: state.addChildBlock,
      getBlock: state.getBlock,
      getChildBlocks: state.getChildBlocks,
      findBlock: state.findBlock,
      findBlocks: state.findBlocks,
      updateBlock: state.updateBlock,
      deleteBlock: state.deleteBlock,

      getBehavior: state.getBehavior,
      updateBehavior: state.updateBehavior,
    }),
    shallow,
  );
};
