import React, { useContext } from 'react';
import { BlockFactoryContext } from '../hooks';
import { NamedBlock, NamedBlockProps } from './NamedBlock';
import { nestedNamedContent, plainNamedContent } from './storyContent';

export default {
  component: NamedBlock,
  title: 'NamedBlock',
  tags: ['autodocs'],
};

const Template = (args: NamedBlockProps) => {
  const { factory } = useContext(BlockFactoryContext)

  if (args.variant !== undefined) {
    args.content.variant = args.variant;
  }

  return (
    <>
      { factory?.build(args.content) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  content: plainNamedContent('Default'),
};

export const Selected = Template.bind({});
Selected.args = {
  content: plainNamedContent('Selected'),
  selected: true,
};

export const Nested = Template.bind({});
Nested.args = {
  content: nestedNamedContent('Nested'),
};

export const Blue = Template.bind({});
Blue.args = {
  content: nestedNamedContent('Nested'),
  variant: 'blue',
};
