import React, { useContext } from 'react';
import { TableBlock, TableBlockProps } from '../components/TableBlock';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { getGUID, simpleTable } from './storyContent';

export default {
  component: TableBlock,
  title: 'Blocks/TableBlock',
  tags: ['autodocs'],
};

const Template = (args: TableBlockProps) => {
  const { factory } = useContext(BlockFactoryContext)

  const content = new Content(getGUID());
  content.children.push(args.block);
  
  if (args.theme !== undefined) {
    content.theme = args.theme;
  }

  if (args.selected !== undefined) {
    content.selected = args.selected;
  }
  
  return (
    <>
      { factory?.build(content) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  block: simpleTable(),
};

export const Selected = Template.bind({});
Selected.args = {
  block: simpleTable(),
  selected: true,
};

export const Blue = Template.bind({});
Blue.args = {
  block: simpleTable(),
  theme: 'blue',
};

