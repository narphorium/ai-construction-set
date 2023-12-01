import React, { useContext } from 'react';
import { BlockFactoryContext } from '../hooks';
import { ContentBlock, ContentBlockProps } from './ContentBlock';
import { namedSectionsContent, plainContent } from './storyContent';

export default {
  component: ContentBlock,
  title: 'ContentBlock',
  tags: ['autodocs'],
};

const Template = (args: ContentBlockProps) => {
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
