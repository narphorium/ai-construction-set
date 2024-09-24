import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { themedIcon } from '../../themes/icons'
import { themedVariant } from '../../themes/theme'
import { useBlockRenderer } from '../../hooks/useBlockRenderer'
import { useBlockStoreActions } from '../../hooks/useBlockStore'
import { useClasses } from '../../hooks/useClasses'
import { SelectableComponentProps } from '../behaviors'
import { Selectable } from '../../types/behaviors'
import { Table, TableRow } from '../../types/layouts'
import { Block } from '../../types/blocks'

export interface TableLayoutProps extends SelectableComponentProps {
  block: Table & Selectable
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const TableLayoutComponent = forwardRef(function TableBlock({ className, block, onClick }: TableLayoutProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const blockStore = useBlockStoreActions()
  const children = blockStore.getChildBlocks<TableRow>(block.uuid)

  const tableClasses = useClasses([
    'aics-table',
    className,
    block.classNames
  ], [className, block.classNames])


  return <div ref={ref} key={block.uuid} className={tableClasses}>
    {children.map((row: TableRow) => {
      return <TableLayoutRowComponent block={row} />
    })}
  </div>
})

TableLayoutComponent.displayName = 'TableLayout'

export const TableLayout = styled(TableLayoutComponent)`
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

export interface TableLayoutRowProps {
  block: TableRow
  className?: string
}

export const TableLayoutRowComponent = ({ className, block }: TableLayoutRowProps): JSX.Element => {
  const blockStore = useBlockStoreActions()
  const children = blockStore.getChildBlocks(block.uuid)

  const rowClasses = useClasses([
    'aics-table-row',
    className,
    block.classNames
  ], [className, block.classNames])

  return <div key={block.uuid} className={rowClasses} >
    {children.map((cell: Block) => {
      return <TableLayoutCellComponent block={cell} row={block} />
    })}
  </div>
}

TableLayoutRowComponent.displayName = 'TableRow'

export interface TableLayoutCellProps {
  block: Block
  row: TableRow
  className?: string
}

export const TableLayoutCellComponent = ({ className, block, row }: TableLayoutCellProps): JSX.Element => {
  const renderer = useBlockRenderer()

  const cellClasses = useClasses([
    'aics-table-cell',
    className,
    block.classNames
  ], [className, block.classNames])

  return <div key={block.uuid} className={cellClasses} >
    {renderer.render(block, row)}
  </div>
}

TableLayoutRowComponent.displayName = 'TableRow'