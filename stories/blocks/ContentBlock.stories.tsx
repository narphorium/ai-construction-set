import { ContentBlock } from '../../src/components/blocks/ContentBlock'
import { ListInSection, NamedSectionsContent, PlainContent, PlainParagraph, WrapInSection } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate'
import React from 'react'

export default {
  component: ContentBlock,
  title: 'Blocks/ContentBlock',
  tags: ['autodocs'],
}

export const Default = () => <BlockStoryTemplate builder={PlainContent} />

export const Selected = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), true)} />

export const Sections = () => <BlockStoryTemplate builder={NamedSectionsContent} />

export const List = () => <BlockStoryTemplate builder={ListInSection} />

export const Blue = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), false, 'blue')} />

export const BlueSelected = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => PlainParagraph(registry, 'Test Span', parent), true, 'blue')} />

export const BlueSections = () => <BlockStoryTemplate builder={WrapInSection((registry, parent) => NamedSectionsContent(registry, parent, false, 'blue'))} />
