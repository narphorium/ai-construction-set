
export type DocumentID = string

export interface DocumentProps {
  uuid: DocumentID
  title: string
  blocks: string[]
}

export const createDocument = (uuid: DocumentID): DocumentProps => {
  return {
    uuid,
    title: '',
    blocks: []
  }
}

export interface DocumentActions {

}

export type Document = DocumentProps & DocumentActions