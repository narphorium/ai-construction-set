import React, { forwardRef, type ForwardedRef } from 'react'
import { styled } from 'styled-components'
import { useBlockRegistry, useBlockStore, useClasses } from '../../hooks'
import { type BlockComponentProps } from '../blocks/Base'
import { themedVariant } from '../../themes'
import { CollapsibleBlock } from '../blocks/CollapsibleBlock'
import { BlockQuery } from '../../state/matchers'
import { List } from '../../types/layouts'
import { Selectable } from '../../types/behaviors'
import { CollapsibleComponentProps, SelectableComponentProps } from '../behaviors'
import { Section } from '../../types/blocks'

const isFollowingSiblingSelected = new BlockQuery()
  .subsequentSiblings()
  .hasBehaviorProperty<Selectable>('selected', true);

export interface AccordionLayoutProps extends BlockComponentProps<List> {
  block: List
}

export const AccordionLayoutComponent = forwardRef(function AccordionLayout({ className, block }: AccordionLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  // return <div ref={ref} className={getClasses('aics-list', className, block.classNames)} key={block.uuid}>
  //       <BlockLayout blockIds={block.children} parent={block} />
  //   </div>

  const blockStore = useBlockStore()
  const children = blockStore.getChildBlocks(block.uuid)

  // const isFollowingSiblingSelected = (list: List, item: Block): boolean => {
  //   const index = children.indexOf(item)
  //   if (index < 0) {
  //     return false
  //   }
  //   for (let i = index + 1; i < children.length; i++) {
  //     if (selectedVisitor.run(children[i].uuid).length > 0) {
  //       return true
  //     }
  //   }
  //   return false
  // }

  // const getItemClasses = (list: List, node: any): string => {
  //   return getClasses('aics-list-item', node.classNames, className,
  //     () => registry.hasBehavior(node.type, 'aics:selectable') && (node as Selectable).selected ? ['selected'] : [],
  //     () => blockStore.findBlock(isFollowingSiblingSelected.execute(blockStore, registry, node).length > 0 ? ['before-selected'] : []
  //     )
  // }

  return <>
    {children.map((childBlock) => {
      return <AccordionItemComponent block={childBlock as Section} />
    })}
  </>
})

AccordionLayoutComponent.displayName = 'AccordionLayout'

export const AccordionLayout = styled(AccordionLayoutComponent)`
margin: 4px 0;
`

export interface AccordionItemProps extends SelectableComponentProps, CollapsibleComponentProps {
  block: Section
}

export const AccordionItemComponent = forwardRef(function ListItem({ className, block, setSelected, setCollapsed }: AccordionItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStore()
  const registry = useBlockRegistry()

  const itemClass = useClasses([
    'aics-list-item',
    className,
    block.classNames,
    () => block.selected ? ['selected'] : [],
    () => blockStore.findBlocks(block, isFollowingSiblingSelected, registry).length > 0 ? ['before-selected'] : []
  ], [className, block])

  return <div className={itemClass} key={block.uuid}>
    <CollapsibleBlock
      ref={ref}
      block={block}
      setSelected={setSelected}
      setCollapsed={setCollapsed} />
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
