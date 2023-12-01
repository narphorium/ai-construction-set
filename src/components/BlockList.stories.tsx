import React, { useContext } from 'react';
import { BlockFactoryContext } from '../hooks';
import { BlockList, BlockListProps } from './BlockList';
import { nestedList, selectedList, simpleList, singleItemList } from './storyContent';

export default {
  component: BlockList,
  title: 'BlockList',
  tags: ['autodocs'],
};

const Template = (args: BlockListProps) => {
  const { factory } = useContext(BlockFactoryContext)
  
  if (args.variant !== undefined) {
    args.list.variant = args.variant;
  }

  return (
    <>
      { factory?.build(args.list) }
    </>
  );
};


export const Default = Template.bind({});
Default.args = {
  list: simpleList(),
};

export const Single = Template.bind({});
Single.args = {
  list: singleItemList(),
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