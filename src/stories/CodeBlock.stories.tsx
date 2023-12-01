import React, { useContext } from 'react';
import { CodeBlock, CodeBlockProps } from '../components/CodeBlock';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { getGUID, simplePythonCode } from './storyContent';

export default {
  component: CodeBlock,
  title: 'Blocks/CodeBlock',
  tags: ['autodocs'],
};

const Template = (args: CodeBlockProps) => {
  const { factory } = useContext(BlockFactoryContext)
  
  if (args.variant !== undefined) {
    args.code.variant = args.variant;
  }
  const content = new Content(getGUID());
  content.children.push(args.code);
  return (
    <>
      { factory?.build(args.code) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  code: simplePythonCode(),
};

export const Blue = Template.bind({});
Blue.args = {
  code: simplePythonCode(),
  variant: 'blue',
};

