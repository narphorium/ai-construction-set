import React from 'react';
import { withReactContext } from 'storybook-react-context';
import { ThemeProvider } from 'styled-components';
import { Content } from '../data';
import { BlockFactoryContext } from '../hooks';
import { DefaultBlockFactory } from './BlockFactory';
import { CodeSection, CodeSectionProps } from './CodeSection';
import { ContentBlock } from './ContentBlock';
import { getGUID, simplePythonCode } from './storyContent';

const blockFactory = new DefaultBlockFactory();

export default {
  component: CodeSection,
  title: 'CodeSection',
  tags: ['autodocs'],
  decorators: [
    withReactContext({
      Context: BlockFactoryContext,
      initialState: { factory: blockFactory },
    }),
    (Story, context) => (
        <>
          <ThemeProvider theme={{mode: context.globals.theme}}>
            <Story />
          </ThemeProvider>
        </>
      ),
  ],
};

const Template = (args: CodeSectionProps) => {
  const content = new Content(getGUID());
  content.children.push(args.code);
  return (
    <>
      <ContentBlock content={content} key={content.uuid} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  code: simplePythonCode(),
};

