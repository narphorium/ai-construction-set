import { TableLayout, TableLayoutProps } from '../../src/components/layouts'
import { SimpleTable, WrapInSection } from '../storyContent'
import { BlockStoryTemplate, BlockStoryProps } from '../BlockStoryTemplate'
import { Table } from '@/types/layouts';
import React from 'react';

export default {
  component: TableLayout,
  title: 'Layouts/TableLayout',
  tags: ['autodocs'],
};

export const Default = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => SimpleTable(registry, parent))} />

export const Selected = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => SimpleTable(registry, parent), true)} />

export const Blue = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => SimpleTable(registry, parent), false, 'blue')} />

