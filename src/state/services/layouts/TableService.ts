import { BlockService } from "../../../data"
import { Table } from "../../../data/layouts"
import { BlockStore } from "../../BlockStore"

export interface TableService extends BlockService<Table> { }

export const createTableService = (store: BlockStore, blockId: string): TableService => {
  return {}
}