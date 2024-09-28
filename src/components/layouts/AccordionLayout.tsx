import React, { forwardRef, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { useBlockRegistry, useBlockRenderer, useBlockStoreActions, useClasses } from '../../hooks'
import { type BlockComponentProps } from '../blocks/Base'
import { themedVariant } from '../../themes'
import { BlockQuery } from '../../state/matchers'
import { List } from '../../types/layouts'
import { Selectable } from '../../types/behaviors'
import { CollapsibleComponentProps, SelectableComponentProps } from '../behaviors'
import { Section } from '../../types/blocks'

export interface AccordionLayoutProps extends BlockComponentProps<List> {
  block: List
}

export const AccordionLayoutComponent = forwardRef(function AccordionLayout({ className, block }: AccordionLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStoreActions()
  const children = blockStore.getChildBlocks(block.uuid)

  const layoutClasses = useClasses([
    'aics-accordion-layout',
    className,
    block.classNames
  ], [className, block.classNames])

  return <div ref={ref} className={layoutClasses} key={block.uuid}>
    {children.map((childBlock) => {
      return <AccordionLayoutItem block={childBlock as Section} />
    })}
  </div>
})

AccordionLayoutComponent.displayName = 'AccordionLayout'

export const AccordionLayout = styled(AccordionLayoutComponent)`
margin: 4px 0;

.aics-collapsible-block-inner > div > & {
  margin: 8px;
}
`

export interface AccordionItemProps extends SelectableComponentProps, CollapsibleComponentProps {
  block: Section
}

export const AccordionItemComponent = forwardRef(function ListItem({ className, block, setSelected, setCollapsed }: AccordionItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStoreActions()
  const registry = useBlockRegistry()
  const renderer = useBlockRenderer()

  const isFollowingSiblingSelected = new BlockQuery(registry  )
    .subsequentSiblings()
    .hasBehaviorProperty<Selectable>('selected', true);

  const itemClass = useClasses([
    'aics-accordion-item',
    className,
    block.classNames,
    () => block.selected ? ['selected'] : [],
    () => blockStore.findBlocks(block, isFollowingSiblingSelected, registry).length > 0 ? ['before-selected'] : []
  ], [className, block])

  return <div className={itemClass} key={block.uuid}>
    {renderer.render(block)}
  </div>
})

AccordionItemComponent.displayName = 'ListItemLayout'

export const AccordionLayoutItem = styled(AccordionItemComponent)`
  padding: 4px 0;
  margin: 0;
  color: ${themedVariant('textColor')};
  background-color: ${themedVariant('contentBackgroundColor')};
  border-style: solid;
  border-color: ${themedVariant('borderColor')};
  border-top-width: 0;
  border-bottom-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-radius: 0;

  .selected & {
    color: ${(props) => themedVariant('textColor', props.block.variant, true)};
    background-color: ${(props) => themedVariant('contentBackgroundColor', props.block.variant, true)};
    border-color: ${(props) => themedVariant('borderColor', props.block.variant, true)};
  }

  .aics-collapsible-block {
    margin: 0;
    border: 0;
  }

  &:first-child > .aics-collapsible-block {
      margin-top: 0;
  }

  &:last-child > .aics-collapsible-block {
      margin-bottom: 0;
  }

  &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-top-width: 1px;
  }

  &:last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
  }

  &.before-selected {
    border-bottom-color: ${themedVariant('borderColor', null, true)};
  }
`
