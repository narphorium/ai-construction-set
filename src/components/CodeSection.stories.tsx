import React from 'react';
import { Content } from '../data';
import { CodeSection, CodeSectionProps } from './CodeSection';
import { ContentBlock } from './ContentBlock';
import { getGUID, simplePythonCode } from './storyContent';

export default {
  component: CodeSection,
  title: 'CodeSection',
  tags: ['autodocs'],
};

const Template = (args: CodeSectionProps) => {
  if (args.variant !== undefined) {
    args.code.variant = args.variant;
  }
  const content = new Content(getGUID());
  content.children.push(args.code);
  return (
    <>
      <ContentBlock content={content} variant={args.variant} key={content.uuid} />
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

