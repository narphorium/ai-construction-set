import React from 'react';
import { withReactContext } from 'storybook-react-context';
import { ThemeProvider } from 'styled-components';
import { BlockFactoryContext } from '../hooks';
import { DefaultBlockFactory } from './BlockFactory';
import { ContentBlock } from './ContentBlock';
import { namedSectionsContent, plainContent } from './storyContent';

const blockFactory = new DefaultBlockFactory();

export default {
  component: ContentBlock,
  title: 'ContentBlock',
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

export const Default = {
  args: {
    content: plainContent(),
  },
};

export const Selected = {
  args: {
    content: plainContent(),
    selected: true,
  },
};

export const Sections = {
    args: {
      content: namedSectionsContent()
    },
  };
