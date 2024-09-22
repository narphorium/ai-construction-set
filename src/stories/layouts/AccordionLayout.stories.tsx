import { AccordionLayout } from '../../components/layouts';
import { IconList, NestedList, SelectedList, SimpleList, SingleItemList, WrapInTheme } from '../storyContent';
import { BlockStoryTemplate } from '../BlockStoryTemplate';

export default {
  component: AccordionLayout,
  title: 'Layouts/AccordionLayout',
  tags: ['autodocs'],
};


export const Default = BlockStoryTemplate.bind({});
Default.args = {
  builder: SimpleList,
};

export const Single = BlockStoryTemplate.bind({});
Single.args = {
  builder: SingleItemList,
};

export const Icons = BlockStoryTemplate.bind({});
Icons.args = {
  builder: IconList,
};

export const Selected = BlockStoryTemplate.bind({});
Selected.args = {
  builder: SelectedList,
};

export const Nested = BlockStoryTemplate.bind({});
Nested.args = {
  builder: NestedList
};

export const Blue = BlockStoryTemplate.bind({});
Blue.args = {
  builder: WrapInTheme(NestedList, 'blue')
};