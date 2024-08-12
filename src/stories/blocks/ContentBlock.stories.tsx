import { ContentBlock } from '../../components/blocks/ContentBlock'
import { ListInSection, NamedSectionsContent, PlainContent } from '../storyContent'
import { PaddedBlockStoryTemplate } from '../BlockStoryTemplate'

export default {
  component: ContentBlock,
  title: 'Blocks/ContentBlock',
  tags: ['autodocs'],
}

export const Default = PaddedBlockStoryTemplate.bind({});
Default.args = {
  builder: PlainContent,
}

export const Selected = PaddedBlockStoryTemplate.bind({});
Selected.args = {
  builder: PlainContent,
  selected: true,
}

export const Sections = PaddedBlockStoryTemplate.bind({});
Sections.args = {
  builder: NamedSectionsContent
}

export const List = PaddedBlockStoryTemplate.bind({});
List.args = {
  builder: ListInSection
}

export const Blue = PaddedBlockStoryTemplate.bind({});
Blue.args = {
  builder: PlainContent,
  theme: 'blue',
}

export const BlueSelected = PaddedBlockStoryTemplate.bind({});
BlueSelected.args = {
  builder: PlainContent,
  theme: 'blue',
  selected: true,
}

export const BlueSections = PaddedBlockStoryTemplate.bind({});
BlueSections.args = {
  builder: NamedSectionsContent,
  theme: 'blue',
}
