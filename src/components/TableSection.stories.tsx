import React from 'react';
import { Content } from '../data';
import { ContentBlock } from './ContentBlock';
import { TableSection, TableSectionProps } from './TableSection';
import { getGUID, simpleTable } from './storyContent';

export default {
  component: TableSection,
  title: 'TableSection',
  tags: ['autodocs'],
};

const Template = (args: TableSectionProps) => {
  if (args.variant !== undefined) {
    args.table.variant = args.variant;
  }
  const content = new Content(getGUID());
  content.children.push(args.table);
  return (
    <>
      <ContentBlock content={content} variant={args.variant} key={content.uuid} />
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

