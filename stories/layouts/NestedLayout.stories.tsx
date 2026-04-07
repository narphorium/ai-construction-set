import { NestedLayout } from "@/components/layouts/index.js";
import React from "react";
import { BlockStoryTemplate } from "../BlockStoryTemplate.js";
import {
  IconTree,
  NestedTree,
  PaginatedTree,
  PlainTree,
} from "../storyContent.js";

export default {
  component: NestedLayout,
  title: "Layouts/NestedLayout",
  tags: ["autodocs"],
};

export const Default = () => <BlockStoryTemplate builder={PlainTree} />;

export const Paginated = () => <BlockStoryTemplate builder={PaginatedTree} />;

export const Icon = () => <BlockStoryTemplate builder={IconTree} />;

export const Nested = () => <BlockStoryTemplate builder={NestedTree} />;
