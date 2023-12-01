import React, { useContext } from 'react';
import { TableSection, TableSectionProps } from '../components/TableSection';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { getGUID, simpleTable } from './storyContent';

export default {
  component: TableSection,
  title: 'TableSection',
  tags: ['autodocs'],
};

const Template = (args: TableSectionProps) => {
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

export const Blue = Template.bind({});
Blue.args = {
  table: simpleTable(),
  variant: 'blue',
};

