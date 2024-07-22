import { BlockService } from "../../../data"
import { Span } from "../../../data/blocks"
import { BlockStore } from "../../BlockStore"

export interface SpanService extends BlockService<Span> {
  clear(): void
  append(text: string): void
}

const clear = (store: BlockStore, blockId: string) => {
  store.updateBlock<Span>(blockId, { content: '' })
}

const append = (store: BlockStore, blockId: string, text: string) => {
  const span = store.getBlock<Span>(blockId)
  if (span != null) {
    store.updateBlock<Span>(blockId, { content: span.content + text })
  }
}

export const createSpanService = (store: BlockStore, blockId: string): SpanService => {
  return {
    clear: () => clear(store, blockId),
    append: (text: string) => append(store, blockId, text),
  }
}