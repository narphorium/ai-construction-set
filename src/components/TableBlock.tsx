import React, { forwardRef, useContext, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Paragraph, type Table, type TableRow } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedIcon } from '../themes/icons'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface TableBlockProps extends SelectableProps {
  block: Table
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const TableBlockComponent = forwardRef(function TableBlock ({ className, block, onClick }: TableBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  const getTableClasses = (block: Table, className: string | string[] | undefined): string => {
    return getClasses('aics-table', className, block.classNames)
  }

  const getRowClasses = (row: TableRow): string => {
    return getClasses('aics-table-row', row.classNames)
  }

  const getCellClasses = (cell: Paragraph): string => {
    return getClasses('aics-table-cell', cell.classNames)
  }

  return <div ref={ref} key={block.uuid} className={getTableClasses(block, className)} onClick={handleClick}>
    { block.rows.map((row: TableRow) => {
      return <div className={getRowClasses(row)} key={row.uuid}>
        { row.values.map((cell: Paragraph) => {
          return <div className={getCellClasses(cell)} key={cell.uuid}>
            { factory?.build(cell, row)}
            </div>
        }) }
        </div>
    }) }
  </div>
})

TableBlockComponent.displayName = 'TableBlock'

export const TableBlock = styled(TableBlockComponent)`
display: grid;
grid-template-columns: min-content 1fr;
gap: 0;
width: 100%;

.aics-table-row {
  display: contents;
}

.aics-table-row:hover > div {
  background-color: ${themedVariant('hoverColor')};
}

.aics-table-row:first-child {
  .aics-table-cell:first-child {
    border-top-left-radius: 4px;
    padding-top: 6px;
  }
  .aics-table-cell:last-child {
    border-top-right-radius: 4px;
    padding-top: 6px;
  }
}

.aics-table-row:last-child {
  .aics-table-cell:first-child {
    border-bottom-left-radius: 4px;
    padding-bottom: 6px;
  }
  .aics-table-cell:last-child {
    border-bottom-right-radius: 4px;
    padding-bottom: 6px;
  }
}

.aics-table-header {
  grid-column: auto;
  grid-row: auto;

  text-align: left;
  padding: 2px 16px 0 28px;
  color: ${themedVariant('fadedTextColor')};
  font-size: 9.5pt;
  font-weight: 500;
  width: 1%;
  vertical-align: top;
  white-space: nowrap;
}

.aics-table-cell {
  grid-column: auto;
  grid-row: auto;

  font-size: 11pt;

  .aics-paragraph {
    padding: 2px 0;
    margin: 4px;
  }
}

.aics-table-header {
  background-repeat: no-repeat;
  background-size: contain;
  white-space: nowrap;
}

.aics-table-header.aics-content-span-text {
  background-image: ${themedIcon('text', 12, themedVariant('fadedTextColor'))};
}

.aics-table-header.aics-content-span-number {
  background-image: ${themedIcon('number', 12, themedVariant('fadedTextColor'))};
}

.aics-table-header.aics-content-span-date {
  background-image: ${themedIcon('date', 12, themedVariant('fadedTextColor'))};
}
`
