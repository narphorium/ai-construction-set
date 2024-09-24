import React, { forwardRef, type ForwardedRef } from 'react'
import styled from 'styled-components'
import { useBlockRegistry, useBlockRenderer, useBlockStoreActions, useClasses } from '../../hooks'
import { themedVariant } from '../../themes/theme'
import { Pagination } from '../fragments/Pagination'
import { themedIcon } from '../../themes'
import { PaginatedComponentProps } from '../behaviors'
import { Pageable, Selectable } from '../../types/behaviors'
import { List, Tree } from '../../types/layouts'
import { Block } from '../../types/blocks'
import { BlockQuery } from '../../state/matchers'

const isFollowingSiblingSelected = new BlockQuery()
  .subsequentSiblings()  // TODO: Is this supposed to be nextSibling()?
  .hasBehaviorProperty<Selectable>('selected', true);

const hasSelectedDescendant = new BlockQuery()
  .descendants()
  .hasBehaviorProperty<Selectable>('selected', true);

export interface NestedLayoutProps extends PaginatedComponentProps {
  block: Tree & Pageable
  level: number
}

export const NestedLayoutComponent = forwardRef(function NestedLayout({ className, block, level, setPage }: NestedLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStoreActions()
  const registry = useBlockRegistry()
  const children = blockStore.getChildBlocks(block.uuid)

  const nestedLayoutClasses = useClasses([
    className,
    () => blockStore.findBlocks(block, hasSelectedDescendant, registry).length > 0 ? ['selected'] : [],
    () => block.icon !== undefined ? ['has-icon'] : []
  ], [className, block])

  const filterBlocks = (children: Block[]): Block[] => {
    const filteredBlocks: Block[] = []
    children.forEach((child) => {
      if (child !== undefined && (child.iteration === undefined || child.iteration === block.page)) {
        filteredBlocks.push(child)
      }
    })
    return filteredBlocks
  }

  if (block.page !== undefined && block.numPages !== undefined && block.numPages > 1) {
    return <div ref={ref} key={block.uuid} className={nestedLayoutClasses}>
      <div className='aics-tree-control'><span></span></div>
      <div className='aics-tree-title'>
        <label className='aics-tree-page-label'>{block.name}</label>
        <Pagination level={level} page={block.page} numPages={block.numPages} setPage={setPage} key={block.uuid} />
      </div>
      {filterBlocks(children).map((child) => {
        return <NestedLayoutItemComponent block={child} list={block} />
      })}
    </div>
  } else {
    return <div ref={ref} key={block.uuid} className={nestedLayoutClasses}>
      {filterBlocks(children).map((child) => {
        return <NestedLayoutItemComponent block={child} list={block} />
      })}
    </div>
  }
})

NestedLayoutComponent.displayName = 'NestedLayout'

export const NestedLayout = styled(NestedLayoutComponent)`
position: relative;
margin-top: 12px;
margin-bottom: 12px;
margin-left: 0;
padding-left: 0;

.aics-tree-content {
  position: relative;
  margin-left: 24px;
}

& .aics-tree-title {
  position: relative;
  padding-left: 24px;
}

& .aics-tree-title > label {
  font-family: ${themedVariant('fontFamily')};
  font-size: 12pt;
  font-weight: 500;
  line-height: 24px;
  vertical-align: middle;
  color: ${themedVariant('textColor')};
  margin-right: 12px;
}

&.has-icon .aics-tree-title > label {
  padding-left: 26px;
  background-position: 4px center;
  background-size: contain;
  background-image: ${(props) => props.block.icon !== undefined ? themedIcon(props.block.icon, 24, themedVariant('textColor')) : ''};
  background-repeat: no-repeat;
}

.aics-pagination {
  display: inline-block;
  vertical-align: top;
}

& .aics-tree-node {
  display: block;
  position: relative;
  padding-left: 4px;
  margin: 0 0 0 8px;
}

& .aics-tree-leaf-node {
  padding-left: 24px;
}

& .aics-tree-node > .aics-tree {
  padding-left: 0px;
}

& .aics-tree-node {
  position: relative;
  border-left: 2px solid ${themedVariant('treeColor')};
}

& .aics-tree-node:last-child {
  border-color: transparent;
}

.aics-tree-node::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: -19px;
  left: -2px;
  width: 10px;
  height: 32px;
  border: solid ${themedVariant('treeColor')};
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: 6px;
}

.aics-tree-leaf-node::before {
  top: -12px;
}

.aics-tree-node:nth-child(3)::before {
  top: -10px;
  height: 30px;
}

& .aics-tree-title:focus {
  outline: none;
}

& .aics-tree-leaf-node::after {
  content: "";
  display: block;
  position: absolute;
  top: 17px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${themedVariant('treeColor')};
  z-index: 2;
}

& > .aics-tree-control > span {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  z-index: 2;

  border: 2px solid ${themedVariant('treeColor')};
  left: 4px;
  top: 9px;
  width: 6px;
  height: 6px;
  background: transparent;
}

&.selected
  > .aics-tree-title::before,
&
  > .selected
  > .aics-tree-title::before {
  background-color: ${themedVariant('selectedTreeColor')};
}

& .before-selected {
  border-color: ${themedVariant('selectedTreeColor')};
}

&.selected
  > .aics-tree-control
  > span {
    border-color: ${themedVariant('selectedTreeColor')};
}

& > .selected::after {
  background: ${themedVariant('selectedTreeColor')};
}

& > .selected::before {
  border-color: ${themedVariant('selectedTreeColor')};
  z-index: 1;
}

& .aics-tree-title::before {
  z-index: 1;
  content: " ";
  position: absolute;
  top: 18px;
  left: 8px;
  background-color: ${themedVariant('treeColor')};
  background-clip: content-box;
  width: 2px;
  height: 18px;
}

`

export interface NestedLayoutItemProps {
  block: Block
  list: List
  className?: string
}

export const NestedLayoutItemComponent = forwardRef(function NestedLayout({ className, block, list }: NestedLayoutItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStoreActions()
  const registry = useBlockRegistry()
  const renderer = useBlockRenderer()

  const itemClasses = useClasses([
    'aics-tree-node',
    block.classNames,
    className,
    () => blockStore.findBlocks(block, hasSelectedDescendant, registry).length > 0 ? ['selected'] : [],
    () => !(block.type === 'aics:tree') ? ['aics-tree-leaf-node'] : [],
    () => blockStore.findBlocks(block, isFollowingSiblingSelected, registry).length > 0 ? ['before-selected'] : []
  ], [className, block])

  return <div ref={ref} key={block.uuid} className={itemClasses}>
    {renderer.render(block, list)}
  </div>
})

NestedLayoutComponent.displayName = 'NestedLayout'