import { Card } from "@/components/blocks/index.js";
import React from "react";
import { BlockStoryTemplate } from "../BlockStoryTemplate.js";
import {
  CollapsibleSection,
  NamedSectionsContent,
  PlainParagraph,
  WrapInCard,
} from "../storyContent.js";

export default {
  component: Card,
  title: "Blocks/Card",
  tags: ["autodocs"],
};

export const Default = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, store, parent) =>
        PlainParagraph(registry, store, "Test Span", parent),
      false,
    )}
  />
);

export const Highlighted = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, store, parent) =>
        PlainParagraph(registry, store, "Test Span", parent),
      true,
    )}
  />
);

export const Labels = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, store, parent) =>
        NamedSectionsContent(registry, store, parent),
      false,
    )}
  />
);

export const Collapsible = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, store, parent) => CollapsibleSection(registry, store, parent),
      false,
    )}
  />
);
