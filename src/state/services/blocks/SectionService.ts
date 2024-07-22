import { BlockService } from "../../../data"
import { Section } from "../../../data/blocks"
import { BlockStore } from "../../BlockStore"

export interface SectionService extends BlockService<Section> { }

export const createSectionService = (store: BlockStore, blockId: string): SectionService => {
  return {}
}