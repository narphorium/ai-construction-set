import React, { forwardRef, useCallback, useContext, type ForwardedRef } from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import { Tree, type Base, type Selectable } from '../data'
import { SelectedVisitor } from '../data/Visitor'
import { BlockFactoryContext, NestedPaginationContext } from '../hooks'
import { getColor } from '../themes/colors'
import { defaultFont, textColor } from '../themes/theme'
import { getClasses, type PaginatedProps } from './Base'
import { Pagination } from './Pagination'

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

  const getNodeClasses = (node: Selectable): string => {
    const classes = ['aics-tree-node']
    if (node.selected) {
      classes.push('selected')
    }
    if (!(node instanceof Tree)) {
      classes.push('aics-tree-leaf-node')
    }
    if (selectedVisitor.run(node).length > 0) {
      classes.push('selected')
    } else if (isFollowingSiblingSelected(node)) {
      classes.push('before-selected')
    }
    return classes.join(' ')
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
    return <div ref={ref} className={getClasses('aics-tree', tree.classNames, className, () => selectedVisitor.run(tree).length > 0 ? ['selected'] : [])}>
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

export const treeColor = theme('mode', {
  light: getColor('gray-800'),
  dark: getColor('gray-200')
})

export const selectedTreeColor = theme('mode', {
  light: getColor('yellow-200'),
  dark: getColor('yellow-400')
})

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
  padding-left: 16px;
}

& .aics-tree-title > label {
  font-family: ${defaultFont};
  font-size: 12pt;
  font-weight: 500;
  vertical-align: middle;
  color: ${textColor};
  margin-right: 8px;
}

.aics-pagination {
  display: inline-block;
  vertical-align: top;
}

& .aics-tree-node {
  display: block;
  position: relative;
  padding-left: 12px;
}

& .aics-tree-leaf-node {
  padding-left: 26px;
}

& .aics-tree-node > .aics-tree {
  padding-left: 0px;
}

& .aics-tree-node {
  position: relative;
  border-left: 2px solid ${treeColor};
  line-height: 24px;
}

& .aics-tree-node:last-child {
  border-color: transparent;
}

.aics-tree-node::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  top: -12px;
  left: -2px;
  width: 10px;
  height: 25px;
  border: solid ${treeColor};
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: 6px;
}

.aics-tree-node:nth-child(3)::before {
  top: -10px;
  height: 23px;
}

& .aics-tree-title:focus {
  outline: none;
}

& .aics-tree-leaf-node::after {
  content: "";
  display: block;
  position: absolute;
  top: 10px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${treeColor};
  z-index: 2;
}

& > .aics-tree-control > span {
  content: "";
  display: block;
  position: absolute;
  border-radius: 50%;
  z-index: 2;

  border: 2px solid ${treeColor};
  left: -4px;
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
  background-color: ${selectedTreeColor};
}

& .before-selected {
  border-color: ${selectedTreeColor};
}

&.selected
  > .aics-tree-control
  > span {
    border-color: ${selectedTreeColor};
}

& > .selected::after {
  background: ${selectedTreeColor};
}

& > .selected::before {
  border-color: ${selectedTreeColor};
  z-index: 1;
}

& .aics-tree-title::before {
  z-index: 1;
  content: " ";
  position: absolute;
  top: 18px;
  left: 0;
  background-color: ${treeColor};
  background-clip: content-box;
  width: 2px;
  height: 100%;
}

`
