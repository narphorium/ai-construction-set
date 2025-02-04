import { DocumentContext } from "@/context/DocumentContext.js";
import { Document } from "@/types/Document.js";
import { useContext } from "react";

export const useDocument = (): Document => {
  const { document } = useContext(DocumentContext);

  if (document === undefined) {
    throw new Error("useDocument must be used within DocumentProvider");
  }

  return document;
};
