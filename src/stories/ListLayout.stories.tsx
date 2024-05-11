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
    args.block.theme = args.theme;
  }

  return (
    <>
      { factory?.build(args.block) }
    </>
  );
};


export const Default = Template.bind({});
Default.args = {
  block: simpleList(),
};

export const Single = Template.bind({});
Single.args = {
  block: singleItemList(),
};

export const Icons = Template.bind({});
Icons.args = {
  block: iconList(),
};

export const Selected = Template.bind({});
Selected.args = {
  block: selectedList(),
};

export const Nested = Template.bind({});
Nested.args = {
  block: nestedList()
};

export const Blue = Template.bind({});
Blue.args = {
  block: nestedList(),
  theme: 'blue',
};