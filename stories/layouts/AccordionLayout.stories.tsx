import { AccordionLayout } from '../../src/components/layouts';
import { IconList, NestedList, SelectedList, SimpleList, SingleItemList, WrapInTheme } from '../storyContent';
import { BlockStoryTemplate } from '../BlockStoryTemplate';
import React from 'react';

export default {
  component: AccordionLayout,
  title: 'Layouts/AccordionLayout',
  tags: ['autodocs'],
};


export const Default = () => <BlockStoryTemplate builder={SimpleList} />

export const Single = () => <BlockStoryTemplate builder={SingleItemList} />

export const Icons = () => <BlockStoryTemplate builder={IconList} />

export const Nested = () => <BlockStoryTemplate builder={NestedList} />

export const Selected = () => <BlockStoryTemplate builder={SelectedList} />

export const Blue = () => <BlockStoryTemplate builder={WrapInTheme(NestedList, 'blue')} />
