import React, { useContext } from 'react';
import { TreeLayout, TreeLayoutProps } from '../components/TreeLayout';
import { BlockFactoryContext } from '../hooks';
import { iconTree, nestedTree, paginatedTree, plainTree } from './storyContent';
import { Tree } from '../data';

export default {
  component: TreeLayout,
  title: 'Layouts/TreeLayout',
  tags: ['autodocs'],
};

interface TreeLayoutStoryProps {
  block: Tree
}

const Template = (args: TreeLayoutStoryProps) => {
  const { factory } = useContext(BlockFactoryContext)

  return (
    <>
      { factory?.build(args.block) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  block: plainTree(),
};

export const Paginated = Template.bind({});
Paginated.args = {
  block: paginatedTree(),
};

export const Icon = Template.bind({});
Icon.args = {
  block: iconTree(),
};

export const Nested = Template.bind({});
Nested.args = {
  block: nestedTree(),
};

