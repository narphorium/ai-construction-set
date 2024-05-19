import React, { forwardRef, useContext, type ForwardedRef } from 'react'
import styled from 'styled-components'
import { Tree, type Base, type Selectable } from '../data'
import { SelectedVisitor } from '../data/Visitor'
import { BlockFactoryContext, NestedPaginationContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type PaginatedProps } from './Base'
import { Pagination } from './Pagination'
import { themedIcon } from '../themes'

export interface TreeLayoutProps extends PaginatedProps {
  block: Tree
}

export const TreeLayoutComponent = forwardRef(function TreeLayout ({ className, block, level, page, setPage }: TreeLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)
  const pages = useContext(NestedPaginationContext)
  const selectedVisitor = new SelectedVisitor()

  const isFollowingSiblingSelected = (sibling: Base): boolean => {
    const index = block.children.indexOf(sibling)
    if (index < 0) {
      return false
    }
    for (let i = index + 1; i < block.children.length; i++) {
      if (selectedVisitor.run(block.children[i]).length > 0) {
        return true
      }
    }
    return false
  }

  const getTreeClasses = (tree: Tree, className: any, page: number): string => {
    return getClasses('aics-tree', tree.classNames, className,
      () => selectedVisitor.run(tree, page).length > 0 ? ['selected'] : [],
      () => tree.icon !== undefined ? ['has-icon'] : [])
  }

  const getNodeClasses = (node: Selectable, page: number): string => {
    return getClasses('aics-tree-node', node.classNames, className,
      () => selectedVisitor.run(node, page).length > 0 ? ['selected'] : [],
      () => !(node instanceof Tree) ? ['aics-tree-leaf-node'] : [],
      () => isFollowingSiblingSelected(node) ? ['before-selected'] : []
    )
  }

  const filterBlocks = (): Base[] => {
    const filteredBlocks: Base[] = []
    block.children.forEach((child) => {
      if (child.iteration === undefined || child.iteration === page) {
        filteredBlocks.push(child)
      }
    })
    return filteredBlocks
  }

  if (pages !== null && pages.getNumPages(level) > 1) {
    return <div ref={ref} key={block.uuid} className={getTreeClasses(block, className, page)}>
        <div className='aics-tree-control'><span></span></div>
        <div className='aics-tree-title'>
          <label className='aics-tree-page-label'>{ block.name }</label>
          <Pagination level={level} page={page} numPages={pages.getNumPages(level)} setPage={setPage} key={block.uuid} />
        </div>
        { filterBlocks().map((childBlock) => {
          return <div className={getNodeClasses(childBlock as Selectable, page)} key={childBlock.uuid}>
            { factory?.build(childBlock, block) }
            </div>
        }) }
    </div>
  } else {
    return <div ref={ref} key={block.uuid} className={getClasses()}>
      { filterBlocks().map((childBlock) => {
        return <div key={childBlock.uuid}>
        { factory?.build(childBlock, block) }
        </div>
      }) }
    </div>
  }
})

TreeLayoutComponent.displayName = 'TreeLayout'

export const TreeLayout = styled(TreeLayoutComponent)`
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
