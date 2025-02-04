import React from "react";
import { CodeBlock } from "../../src/components/blocks/CodeBlock";
import { BlockStoryTemplate } from "../BlockStoryTemplate";
import { SimplePythonCode, WrapInTheme } from "../storyContent";

export default {
  component: CodeBlock,
  title: "Blocks/CodeBlock",
  tags: ["autodocs"],
};

export const Default = () => <BlockStoryTemplate builder={SimplePythonCode} />;

export const Blue = () => (
  <BlockStoryTemplate builder={WrapInTheme(SimplePythonCode, "blue")} />
);
