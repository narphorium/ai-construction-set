import { useContext } from 'react'
import { DocumentContext } from '../context/DocumentContext'
import { Document } from '../types/Document'

export const useDocument = (): Document => {
  const { document } = useContext(DocumentContext)

  if (document === undefined) {
    throw new Error('useDocument must be used within DocumentProvider')
  }

  return document
}
