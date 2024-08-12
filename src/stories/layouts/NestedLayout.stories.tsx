import { NestedLayout } from '../../components/layouts';
import { IconTree, NestedTree, PaginatedTree, PlainTree } from '../storyContent';
import { BlockStoryTemplate } from '../BlockStoryTemplate';

export default {
  component: NestedLayout,
  title: 'Layouts/NestedLayout',
  tags: ['autodocs'],
};

export const Default = BlockStoryTemplate.bind({});
Default.args = {
  builder: PlainTree,
};

export const Paginated = BlockStoryTemplate.bind({});
Paginated.args = {
  builder: PaginatedTree,
};

export const Icon = BlockStoryTemplate.bind({});
Icon.args = {
  builder: IconTree,
};

export const Nested = BlockStoryTemplate.bind({});
Nested.args = {
  builder: NestedTree,
};

