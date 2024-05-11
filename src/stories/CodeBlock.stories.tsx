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
  
  if (args.theme !== undefined) {
    args.block.theme = args.theme;
  }
  const content = new Content(getGUID());
  content.children.push(args.block);
  return (
    <>
      { factory?.build(args.block) }
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  block: simplePythonCode(),
};

export const Blue = Template.bind({});
Blue.args = {
  block: simplePythonCode(),
  theme: 'blue',
};

