import React, { useContext } from 'react';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { TableSection, TableSectionProps } from './TableSection';
import { getGUID, simpleTable } from './storyContent';

export default {
  component: TableSection,
  title: 'TableSection',
  tags: ['autodocs'],
};

const Template = (args: TableSectionProps) => {
  const { factory } = useContext(BlockFactoryContext)
  
  if (args.variant !== undefined) {
    args.table.variant = args.variant;
  }
  const content = new Content(getGUID());
  content.children.push(args.table);
  return (
    <>
      { factory?.build(args.table) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  table: simpleTable(),
};

export const Blue = Template.bind({});
Blue.args = {
  table: simpleTable(),
  variant: 'blue',
};

