import { BlockService } from "../../../data"
import { Paragraph } from "../../../data/blocks"
import { BlockStore } from "../../BlockStore"

export interface ParagraphService extends BlockService<Paragraph> { }

export const createParagraphService = (store: BlockStore, blockId: string): ParagraphService => {
  return {}
}