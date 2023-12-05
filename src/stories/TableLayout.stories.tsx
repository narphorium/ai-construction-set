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
  content.children.push(args.table);
  
  if (args.variant !== undefined) {
    content.variant = args.variant;
    args.table.variant = args.variant;
  }
  
  return (
    <>
      { factory?.build(content) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  table: simpleTable(),
};

export const Selected = Template.bind({});
Selected.args = {
  table: simpleTable(),
  selected: true,
};

export const Blue = Template.bind({});
Blue.args = {
  table: simpleTable(),
  variant: 'blue',
};

