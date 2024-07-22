import { BlockService } from "../../../data"
import { Tree } from "../../../data/layouts"
import { BlockStore } from "../../BlockStore"

export interface TreeService extends BlockService<Tree> { }

export const createTreeService = (store: BlockStore, blockId: string): TreeService => {
  return {}
}