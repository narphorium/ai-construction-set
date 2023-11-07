import { ContentBlock } from './ContentBlock';
import { namedSectionsContent, plainContent } from './storyContent';

export default {
  component: ContentBlock,
  title: 'ContentBlock',
  tags: ['autodocs'],
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
