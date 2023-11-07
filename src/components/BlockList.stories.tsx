import React from 'react';
import { BlockList, BlockListProps } from './BlockList';
import { nestedList, selectedList, simpleList } from './storyContent';

export default {
  component: BlockList,
  title: 'BlockList',
  tags: ['autodocs'],
};

const Template = (args: BlockListProps) => {
  if (args.variant !== undefined) {
    args.list.variant = args.variant;
  }

  return (
    <>
      <BlockList list={args.list} variant={args.variant} key={args.key} />
    </>
  );
};


export const Default = Template.bind({});
Default.args = {
  list: simpleList(),
};

export const Selected = Template.bind({});
Selected.args = {
  list: selectedList(),
};

export const Nested = Template.bind({});
Nested.args = {
  list: nestedList()
};

export const Blue = Template.bind({});
Blue.args = {
  list: nestedList(),
  variant: 'blue',
};