import { Card } from "@/components/blocks/index.js";
import React from "react";
import { BlockStoryTemplate } from "../BlockStoryTemplate.js";
import {
  CollapsibleSection,
  ListInSection,
  NamedSectionsContent,
  PlainParagraph,
  PlainSection,
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
      (registry, parent) => PlainParagraph(registry, "Test Span", parent),
      false,
    )}
  />
);

export const Highlighted = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, parent) => PlainParagraph(registry, "Test Span", parent),
      true,
    )}
  />
);

export const Labels = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, parent) => NamedSectionsContent(registry, parent),
      false,
    )}
  />
);

export const Collapsible = () => (
  <BlockStoryTemplate
    builder={WrapInCard(
      (registry, parent) => CollapsibleSection(registry, parent),
      false,
    )}
  />
);
