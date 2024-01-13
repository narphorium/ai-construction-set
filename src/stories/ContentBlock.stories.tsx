import React, { useContext } from 'react'
import { ContentBlock, ContentBlockProps } from '../components/ContentBlock'
import { BlockFactoryContext } from '../hooks'
import { listInContent, namedSectionsContent, plainContent } from './storyContent'

export default {
  component: ContentBlock,
  title: 'Blocks/ContentBlock',
  tags: ['autodocs'],
}

const Template = (args: ContentBlockProps) => {
  const { factory } = useContext(BlockFactoryContext)

  if (args.theme !== undefined) {
    args.content.theme = args.theme;
  }
  if (args.selected !== undefined) {
    args.content.selected = args.selected;
  }

  return (
    <>
      { factory?.build(args.content) }
    </>
  )
}

export const Default = Template.bind({});
Default.args = {
  content: plainContent(),
}

export const Selected = Template.bind({});
Selected.args = {
  content: plainContent(),
  selected: true,
}

export const Sections = Template.bind({});
Sections.args = {
  content: namedSectionsContent()
}

export const List = Template.bind({});
List.args = {
  content: listInContent()
}

export const Blue = Template.bind({});
Blue.args = {
  content: plainContent(),
  theme: 'blue',
}

export const BlueSelected = Template.bind({});
BlueSelected.args = {
  content: plainContent(),
  theme: 'blue',
  selected: true,
}

export const BlueSections = Template.bind({});
BlueSections.args = {
  content: namedSectionsContent(),
  theme: 'blue',
}
