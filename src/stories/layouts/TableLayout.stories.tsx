import { TableLayout } from '../../components/layouts'
import { SimpleTable } from '../storyContent'
import { PaddedBlockStoryTemplate } from '../BlockStoryTemplate'

export default {
  component: TableLayout,
  title: 'Blocks/TableBlock',
  tags: ['autodocs'],
};

export const Default = PaddedBlockStoryTemplate.bind({})
Default.args = {
  builder: SimpleTable,
}

export const Selected = PaddedBlockStoryTemplate.bind({})
Selected.args = {
  builder: SimpleTable,
  selected: true,
}

export const Blue = PaddedBlockStoryTemplate.bind({})
Blue.args = {
  builder: SimpleTable,
  theme: 'blue',
}

