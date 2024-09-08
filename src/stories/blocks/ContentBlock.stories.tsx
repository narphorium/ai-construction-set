import { ContentBlock } from '../../components/blocks/ContentBlock'
import { ListInSection, NamedSectionsContent, PlainContent, WrapInSection } from '../storyContent'
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
  builder: WrapInSection((registry, parent) => PlainContent(registry), true),
}

export const Sections = BlockStoryTemplate.bind({});
Sections.args = {
  builder: WrapInSection((registry, parent) => NamedSectionsContent(registry))
}

export const List = BlockStoryTemplate.bind({});
List.args = {
  builder: WrapInSection((registry, parent) => ListInSection(registry))
}

export const Blue = BlockStoryTemplate.bind({});
Blue.args = {
  builder: WrapInSection((registry, parent) => PlainContent(registry), false, 'blue')
}

export const BlueSelected = BlockStoryTemplate.bind({});
BlueSelected.args = {
  builder: WrapInSection((registry, parent) => PlainContent(registry), true, 'blue')
}

export const BlueSections = BlockStoryTemplate.bind({});
BlueSections.args = {
  builder: WrapInSection((registry, parent) => NamedSectionsContent(registry), false, 'blue')
}
