import { BlockService } from "../../../data"
import { Code } from "../../../data/blocks"
import { BlockStore } from "../../BlockStore"

export interface CodeService extends BlockService<Code> { }

export const createCodeService = (store: BlockStore, blockId: string): CodeService => {
  return {}
}