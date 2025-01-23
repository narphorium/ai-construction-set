import React from "react";
import { TableLayout } from "../../src/components/layouts";
import { BlockStoryTemplate } from "../BlockStoryTemplate";
import { CollapsibleTable, SimpleTable, WrapInCard } from "../storyContent";

export default {
  component: TableLayout,
  title: "Layouts/TableLayout",
  tags: ["autodocs"],
};

export const Default = () => (
  <BlockStoryTemplate
    builder={WrapInCard((registry, parent) => SimpleTable(registry, parent))}
  />
);

export const Collapsible = () => (
  <BlockStoryTemplate
    builder={WrapInCard((registry, parent) =>
      CollapsibleTable(registry, parent),
    )}
  />
);

export const Highlighted = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, parent) => SimpleTable(registry, parent),
      true,
    )}
  />
);
