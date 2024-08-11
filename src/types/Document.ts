
export type DocumentID = string

export interface Document {
  uuid: DocumentID
  title: string
  blocks: string[]
}

export const createDocument = (): Document => {
  return {
    uuid: '',
    title: '',
    blocks: []
  }
}