import React, { forwardRef, useContext, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { type List, SelectedVisitor, type ListItem } from '../data'
import { BlockFactoryContext } from '../hooks'
import { type BlockProps, getClasses, type SelectableProps, type CollapsibleProps } from './Base'
import { themedVariant } from '../themes'
import { CollapsibleBlock } from './CollapsibleBlock'

export interface ListLayoutProps extends BlockProps {
  block: List
}

export const ListLayoutComponent = forwardRef(function ListLayout ({ className, block }: ListLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  return <div ref={ref} className={getClasses('aics-list', className, block.classNames)} key={block.uuid}>
        { factory?.buildAll(block.items, block) }
    </div>
})

ListLayoutComponent.displayName = 'ListLayout'

export const ListLayout = styled(ListLayoutComponent)`
margin: 4px 0;
`

export interface ListItemProps extends SelectableProps, CollapsibleProps {
  block: ListItem
}

export const ListItemComponent = forwardRef(function ListItem ({ className, block, selected, setSelected, collapsed, setCollapsed, variant }: ListItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)
  const selectedVisitor = new SelectedVisitor()

  const isFollowingSiblingSelected = (item: ListItem): boolean => {
    const list = factory?.getParent(item) as List
    const index = list.items.indexOf(item)
    if (index < 0) {
      return false
    }
    for (let i = index + 1; i < list.items.length; i++) {
      if (selectedVisitor.run(list.items[i]).length > 0) {
        return true
      }
    }
    return false
  }

  const getItemClasses = (node: ListItem): string => {
    return getClasses('aics-list-item', node.classNames, className,
      () => node.selected ? ['selected'] : [],
      () => isFollowingSiblingSelected(node) ? ['before-selected'] : []
    )
  }

  return <div className={getItemClasses(block)} key={block.uuid}>
    <CollapsibleBlock
    ref={ref}
    block={block}
    selected={selected}
    setSelected={setSelected}
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    variant={variant} />
  </div>
})

ListItemComponent.displayName = 'ListItemLayout'

export const ListLayoutItem = styled(ListItemComponent)`
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
    color: ${(props) => themedVariant('textColor', props.variant, true)};
    background-color: ${(props) => themedVariant('contentBackgroundColor', props.variant, true)};
    border-color: ${(props) => themedVariant('borderColor', props.variant, true)};
  }

  & .aics-paragraph:first-child,
  & .aics-list:first-child,
  & .aics-collapsible-block:first-child {
      margin-top: 0;
  }

  & .aics-paragraph:last-child,
  & .aics-list:first-child,
  & .aics-collapsible-block:first-child {
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
