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
    args.block.theme = args.theme;
  }
  if (args.selected !== undefined) {
    args.block.selected = args.selected;
  }

  return (
    <>
      { factory?.build(args.block) }
    </>
  )
}

export const Default = Template.bind({});
Default.args = {
  block: plainContent(),
}

export const Selected = Template.bind({});
Selected.args = {
  block: plainContent(),
  selected: true,
}

export const Sections = Template.bind({});
Sections.args = {
  block: namedSectionsContent()
}

export const List = Template.bind({});
List.args = {
  block: listInContent()
}

export const Blue = Template.bind({});
Blue.args = {
  block: plainContent(),
  theme: 'blue',
}

export const BlueSelected = Template.bind({});
BlueSelected.args = {
  block: plainContent(),
  theme: 'blue',
  selected: true,
}

export const BlueSections = Template.bind({});
BlueSections.args = {
  block: namedSectionsContent(),
  theme: 'blue',
}
