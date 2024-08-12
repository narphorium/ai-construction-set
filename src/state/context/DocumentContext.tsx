import React, { createContext, ReactNode, useRef } from 'react'
import { createDocument, Document } from '../../types'

interface DocumentContextProps {
  document: Document | undefined
  setDocument: (document: Document) => void
}

export const DocumentContext = createContext<DocumentContextProps>({
  document: undefined,
  setDocument: (document: Document) => { }
})

export interface DocumentContextProviderProps {
  document?: Document
  children: ReactNode
}

export const DocumentProvider = ({ document, children }: DocumentContextProviderProps): JSX.Element => {
  const documentRef = useRef<Document>()
  if (document !== undefined) {
    documentRef.current = document
  } else if (documentRef.current === undefined) {
    documentRef.current = createDocument()
  }

  return (
    <DocumentContext.Provider value={{ document: documentRef.current, setDocument: () => { } }} >
      {children}
    </DocumentContext.Provider>
  )
}