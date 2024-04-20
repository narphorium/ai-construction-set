import React, { forwardRef, useCallback, useContext, type ForwardedRef } from 'react'
import styled from 'styled-components'
import { Tree, type Base, type Selectable } from '../data'
import { SelectedVisitor } from '../data/Visitor'
import { BlockFactoryContext, NestedPaginationContext } from '../hooks'
import { themedVariant } from '../themes/theme'
import { getClasses, type PaginatedProps } from './Base'
import { Pagination } from './Pagination'
import { themedIcon } from '../themes'

export interface TreeLayoutProps extends PaginatedProps {
  tree: Tree
}

export const TreeLayoutComponent = forwardRef(function TreeLayout ({ className, tree, level, page, setPage, variant, key }: TreeLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)
  const pages = useContext(NestedPaginationContext)
  const selectedVisitor = new SelectedVisitor()

  const isFollowingSiblingSelected = (block: Base): boolean => {
    const index = tree.blocks.indexOf(block)
    if (index < 0) {
      return false
    }
    for (let i = index + 1; i < tree.blocks.length; i++) {
      if (selectedVisitor.run(tree.blocks[i]).length > 0) {
        return true
      }
    }
    return false
  }

  const getTreeClasses = (tree: Tree, className: any): string => {
    return getClasses('aics-tree', tree.classNames, className,
      () => selectedVisitor.run(tree).length > 0 ? ['selected'] : [],
      () => tree.icon !== undefined ? ['has-icon'] : [])
  }

  const getNodeClasses = (node: Selectable): string => {
    return getClasses('aics-tree-node', node.classNames, className,
      () => selectedVisitor.run(node).length > 0 ? ['selected'] : [],
      () => !(node instanceof Tree) ? ['aics-tree-leaf-node'] : [],
      () => isFollowingSiblingSelected(node) ? ['before-selected'] : []
    )
  }

  const filterBlocks = useCallback(() => {
    const filteredBlocks: Base[] = []
    tree.blocks.forEach((block) => {
      if (block.iteration === undefined || block.iteration === page) {
        filteredBlocks.push(block)
      }
    })
    return filteredBlocks
  }, [tree, page])

  if (pages !== null && pages.getNumPages(level) > 1) {
    return <div ref={ref} className={getTreeClasses(tree, className)}>
        <div className='aics-tree-control'><span></span></div>
        <div className='aics-tree-title'>
          <label className='aics-tree-page-label'>{ tree.name }</label>
          <Pagination level={level} page={page} numPages={pages.getNumPages(level)} setPage={setPage} key={tree.uuid} />
        </div>
        { filterBlocks().map((block) => {
          return <div className={getNodeClasses(block as Selectable)} key={block.uuid}>
            { factory?.build(block, tree) }
            </div>
        }) }
    </div>
  } else {
    return <div ref={ref} className={getClasses()} key={tree.uuid}>
      { filterBlocks().map((block) => {
        return factory?.build(block, tree)
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
  background-image: ${(props) => props.tree.icon !== undefined ? themedIcon(props.tree.icon, 24, themedVariant('textColor')) : ''};
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
