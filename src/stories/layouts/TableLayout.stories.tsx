import { TableLayout } from '../../components/layouts'
import { SimpleTable } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate'

export default {
  component: TableLayout,
  title: 'Layouts/TableLayout',
  tags: ['autodocs'],
};

export const Default = BlockStoryTemplate.bind({})
Default.args = {
  builder: SimpleTable,
}

export const Selected = BlockStoryTemplate.bind({})
Selected.args = {
  builder: SimpleTable,
  selected: true,
}

export const Blue = BlockStoryTemplate.bind({})
Blue.args = {
  builder: SimpleTable,
  theme: 'blue',
}

