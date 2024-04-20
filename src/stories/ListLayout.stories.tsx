import React, { useContext } from 'react';
import { ListLayout } from '../components/ListLayout';
import { BlockFactoryContext } from '../hooks';
import { iconList, nestedList, selectedList, simpleList, singleItemList } from './storyContent';

export default {
  component: ListLayout,
  title: 'Layouts/ListLayout',
  tags: ['autodocs'],
};

const Template = (args: any) => {
  const { factory } = useContext(BlockFactoryContext)
  
  if (args.theme !== undefined) {
    args.list.theme = args.theme;
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

export const Icons = Template.bind({});
Icons.args = {
  list: iconList(),
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
  theme: 'blue',
};