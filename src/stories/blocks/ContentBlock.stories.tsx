import { ContentBlock } from '../../components/blocks/ContentBlock'
import { ListInSection, NamedSectionsContent, PlainContent, PlainParagraph, WrapInSection } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate'

export default {
  component: ContentBlock,
  title: 'Blocks/ContentBlock',
  tags: ['autodocs'],
}

export const Default = BlockStoryTemplate.bind({});
Default.args = {
  builder: PlainContent,
}

export const Selected = BlockStoryTemplate.bind({});
Selected.args = {
  builder: WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), true),
}

export const Sections = BlockStoryTemplate.bind({});
Sections.args = {
  builder: NamedSectionsContent
}

export const List = BlockStoryTemplate.bind({});
List.args = {
  builder: ListInSection
}

export const Blue = BlockStoryTemplate.bind({});
Blue.args = {
  builder: WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), false, 'blue')
}

export const BlueSelected = BlockStoryTemplate.bind({});
BlueSelected.args = {
  builder: WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), true, 'blue')
}

export const BlueSections = BlockStoryTemplate.bind({});
BlueSections.args = {
  builder: (registry, parent) => NamedSectionsContent(registry, parent, false, 'blue')
}
