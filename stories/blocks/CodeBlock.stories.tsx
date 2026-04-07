import React from "react";
import { CodeBlock } from "../../src/components/blocks/CodeBlock.js";
import { BlockStoryTemplate } from "../BlockStoryTemplate.js";
import { SimplePythonCode, WrapInTheme } from "../storyContent.js";

export default {
  component: CodeBlock,
  title: "Blocks/CodeBlock",
  tags: ["autodocs"],
};

export const Default = () => <BlockStoryTemplate builder={SimplePythonCode} />;

export const Blue = () => (
  <BlockStoryTemplate builder={WrapInTheme(SimplePythonCode, "blue")} />
);
