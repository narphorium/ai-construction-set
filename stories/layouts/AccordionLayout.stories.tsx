import React from "react";
import { AccordionLayout } from "../../src/components/layouts";
import { BlockStoryTemplate } from "../BlockStoryTemplate";
import {
  highlightedList,
  IconList,
  NestedList,
  SimpleList,
  SingleItemList,
} from "../storyContent";

export default {
  component: AccordionLayout,
  title: "Layouts/AccordionLayout",
  tags: ["autodocs"],
};

export const Default = () => <BlockStoryTemplate builder={SimpleList} />;

export const Single = () => <BlockStoryTemplate builder={SingleItemList} />;

export const Icons = () => <BlockStoryTemplate builder={IconList} />;

export const Nested = () => <BlockStoryTemplate builder={NestedList} />;

export const Highlighted = () => (
  <BlockStoryTemplate builder={highlightedList} />
);
