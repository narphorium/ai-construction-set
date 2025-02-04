import { BlockRendererContext } from "@/context/BlockRendererContext.js";
import { type BlockRenderer } from "@/core/BlockRenderer.js";
import { useContext } from "react";

export const useBlockRenderer = (): BlockRenderer => {
  const { renderer } = useContext(BlockRendererContext);

  if (renderer === undefined) {
    throw new Error(
      "useBlockRenderer must be used within BlockRendererProvider",
    );
  }

  return renderer;
};
