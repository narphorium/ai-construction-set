import { BlockService } from "../../../data"
import { List } from "../../../data/layouts"
import { BlockStore } from "../../BlockStore"

export interface ListService extends BlockService<List> { }

export const createListService = (store: BlockStore, blockId: string): ListService => {
  return {}
}