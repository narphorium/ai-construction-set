import { TableLayout } from "@/components/layouts/index.js";
import React from "react";
import { BlockStoryTemplate } from "../BlockStoryTemplate.js";
import { CollapsibleTable, SimpleTable, WrapInCard } from "../storyContent.js";

export default {
  component: TableLayout,
  title: "Layouts/TableLayout",
  tags: ["autodocs"],
};

export const Default = () => (
  <BlockStoryTemplate
    builder={WrapInCard((registry, store, parent) =>
      SimpleTable(registry, store, parent),
    )}
  />
);

export const Collapsible = () => (
  <BlockStoryTemplate
    builder={WrapInCard((registry, store, parent) =>
      CollapsibleTable(registry, store, parent),
    )}
  />
);

export const Highlighted = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, store, parent) => SimpleTable(registry, store, parent),
      true,
    )}
  />
);
