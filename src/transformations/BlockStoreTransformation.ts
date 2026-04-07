import { BlockStoreState } from "@/core/BlockStore.js";
import { Document } from "@/types/Document.js";
import { Block, BlockID } from "@/types/blocks/Block.js";

export const addChild = (
  state: BlockStoreState,
  parent: BlockID,
  uuid: BlockID,
): BlockStoreState => {
  const parentBlock = state.blocks.get(parent);
  if (parentBlock === undefined) {
    throw new Error(`Parent block with uuid ${parent} not found`);
  }
  if (parentBlock.children.includes(uuid)) {
    throw new Error(`Block with uuid ${uuid} already has parent ${parent}`);
  }

  console.log("Adding child", uuid, "to parent", parent);

  const newParentBlock = {
    ...parentBlock,
    children: [...parentBlock.children, uuid],
  };
  return {
    ...state,
    blocks: new Map(state.blocks.set(parent, newParentBlock)),
  };
};

export const deleteChild = (
  state: BlockStoreState,
  parent: BlockID,
  uuid: BlockID,
) => {
  const parentBlock = state.blocks.get(parent);
  if (parentBlock === undefined) {
    throw new Error(`Parent block with uuid ${parent} not found`);
  }
  if (!parentBlock.children.includes(uuid)) {
    throw new Error(`Block with uuid ${uuid} not found in parent ${parent}`);
  }
  const newParentBlock = {
    ...parentBlock,
    children: parentBlock.children.filter((child: BlockID) => child !== uuid),
  };
  return {
    ...state,
    blocks: new Map(state.blocks.set(parent, newParentBlock)),
  };
};

export interface BlockStoreTransformation {
  apply: (state: BlockStoreState) => BlockStoreState;
}

export class AddDocument implements BlockStoreTransformation {
  private type = "aics::add-document";

  constructor(private document: Document) {}

  apply(state: BlockStoreState): BlockStoreState {
    const newDocuments = new Map(state.documents);
    newDocuments.set(this.document.uuid, this.document);
    return { ...state, documents: newDocuments };
  }
}

export class AddBlock<T extends Block> implements BlockStoreTransformation {
  private type = "aics:transformation:add-block";

  constructor(private block: T) {}

  apply(state: BlockStoreState): BlockStoreState {
    if (state.blocks.has(this.block.uuid)) {
      throw new Error(`Block with uuid ${this.block.uuid} already exists`);
    }

    const newBlocks = new Map(state.blocks);
    newBlocks.set(this.block.uuid, this.block);

    state = { ...state, blocks: newBlocks };

    if (this.block.parent !== undefined) {
      if (state.blocks.has(this.block.parent)) {
        state = addChild(state, this.block.parent, this.block.uuid);
      } else {
        throw new Error(
          `Parent block with uuid ${this.block.parent} not found`,
        );
      }
    }

    console.log("Adding block", this.block.uuid, "to state", state);

    return state;
  }
}
