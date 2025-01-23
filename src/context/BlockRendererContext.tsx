import { type BlockRenderer } from "@/core/BlockRenderer";
import React, { createContext, type ReactNode, useRef } from "react";

interface BlockRendererContextProps {
  renderer: BlockRenderer | undefined;
  setRenderer: (renderer: BlockRenderer) => void;
}

export const BlockRendererContext = createContext<BlockRendererContextProps>({
  renderer: undefined,
  setRenderer: (renderer: BlockRenderer) => {},
});

export interface BlockRendererProviderProps {
  renderer?: BlockRenderer;
  children: ReactNode;
}

export const BlockRendererProvider = ({
  renderer,
  children,
}: BlockRendererProviderProps): JSX.Element => {
  const rendererRef = useRef<BlockRenderer>();
  if (renderer !== undefined) {
    rendererRef.current = renderer;
  }

  return (
    <BlockRendererContext.Provider
      value={{ renderer: rendererRef.current, setRenderer: () => {} }}
    >
      {children}
    </BlockRendererContext.Provider>
  );
};
