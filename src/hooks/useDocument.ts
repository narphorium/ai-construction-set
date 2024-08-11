import { useContext } from 'react'
import { DocumentContext } from '../state/context/DocumentContext'
import { Document } from '../types/Document'

export const useDocument = (): Document | undefined => {
  const blockStoreContext = useContext(DocumentContext)

  if (blockStoreContext === null) {
    throw new Error('useDocument must be used within DocumentProvider')
  }

  return blockStoreContext.document
}
