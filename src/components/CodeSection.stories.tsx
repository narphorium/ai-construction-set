import React, { useContext } from 'react';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { CodeSection, CodeSectionProps } from './CodeSection';
import { getGUID, simplePythonCode } from './storyContent';

export default {
  component: CodeSection,
  title: 'CodeSection',
  tags: ['autodocs'],
};

const Template = (args: CodeSectionProps) => {
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

