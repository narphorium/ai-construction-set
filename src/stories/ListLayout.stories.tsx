import React, { useContext } from 'react';
import { ListLayout, ListLayoutProps } from '../components/ListLayout';
import { BlockFactoryContext } from '../hooks';
import { nestedList, selectedList, simpleList, singleItemList } from './storyContent';

export default {
  component: ListLayout,
  title: 'Layouts/ListLayout',
  tags: ['autodocs'],
};

const Template = (args: ListLayoutProps) => {
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