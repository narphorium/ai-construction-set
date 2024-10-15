import { CodeBlock } from '../../src/components/blocks/CodeBlock'
import { SimplePythonCode, WrapInTheme } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate';
import React from 'react';

export default {
  component: CodeBlock,
  title: 'Blocks/CodeBlock',
  tags: ['autodocs'],
};

export const Default = () => <BlockStoryTemplate builder={SimplePythonCode} />

export const Blue = () => <BlockStoryTemplate builder={WrapInTheme(SimplePythonCode, 'blue')} />


