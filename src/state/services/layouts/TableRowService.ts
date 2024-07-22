import { BlockService } from "../../../data"
import { TableRow } from "../../../data/layouts"
import { BlockStore } from "../../BlockStore"

export interface TableRowService extends BlockService<TableRow> { }

export const createTableRowService = (store: BlockStore, blockId: string): TableRowService => {
  return {}
}