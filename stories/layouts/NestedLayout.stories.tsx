import { NestedLayout } from '../../src/components/layouts';
import { IconTree, NestedTree, PaginatedTree, PlainTree } from '../storyContent';
import { BlockStoryTemplate } from '../BlockStoryTemplate';
import React from 'react';

export default {
  component: NestedLayout,
  title: 'Layouts/NestedLayout',
  tags: ['autodocs'],
};

export const Default = () => <BlockStoryTemplate builder={PlainTree} />

export const Paginated = () => <BlockStoryTemplate builder={PaginatedTree} />

export const Icon = () => <BlockStoryTemplate builder={IconTree} />

export const Nested = () => <BlockStoryTemplate builder={NestedTree} />

