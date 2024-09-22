import { TableLayout } from '../../components/layouts'
import { SimpleTable, WrapInSection } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate'

export default {
  component: TableLayout,
  title: 'Layouts/TableLayout',
  tags: ['autodocs'],
};

export const Default = BlockStoryTemplate.bind({})
Default.args = {
  builder: WrapInSection((registry, parent) => SimpleTable(registry, parent)),
}

export const Selected = BlockStoryTemplate.bind({})
Selected.args = {
  builder: WrapInSection((registry, parent) => SimpleTable(registry, parent), true),
}

export const Blue = BlockStoryTemplate.bind({})
Blue.args = {
    builder: WrapInSection((registry, parent) => SimpleTable(registry, parent), false, 'blue'),
}

