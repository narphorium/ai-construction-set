import React, { forwardRef, useContext, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import { type Section, type Table, type TableRow } from '../data'
import { BlockFactoryContext } from '../hooks'
import { themedIcon } from '../themes/icons'
import { borderColor, selectedVariants } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface TableSectionProps extends SelectableProps {
  table: Table
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const TableSectionComponent = forwardRef(function FrameBlock ({ className, table, selected, onSelected, onClick, variant, key }: TableSectionProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { factory } = useContext(BlockFactoryContext)

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  return <div ref={ref} className={getClasses('aics-table', className, table.classNames)} onClick={handleClick}>
    { table.rows.map((row: TableRow) => {
      return <div className="aics-table-row" key={row.uuid}>
        { row.values.map((cell: Section) => {
          return <div className={getClasses('aics-table-cell', cell.classNames)} key={cell.uuid}>
            { factory?.build(cell, row)}
            </div>
        }) }
        </div>
    }) }
  </div>
})

const hoverColor = selectedVariants('mode', {
  default: {
    unselected: { light: '#f8f8f8', dark: '#2a2a2a' },
    selected: { light: '#f8f8f8', dark: '#2a2a2a' }
  },
  blue: {
    unselected: { light: 'blue-800', dark: '#2a2a2a' },
    selected: { light: '#f8f8f8', dark: '#2a2a2a' }
  }
})

export const TableSection = styled(TableSectionComponent)`
display: grid;
grid-template-columns: min-content 1fr;
gap: 0;
width: 100%;

.aics-table-row {
  display: contents;
}

.aics-table-row:hover > div {
  background-color: ${hoverColor};
}

.aics-table-row:first-child {
  .aics-table-cell:first-child {
    border-top-left-radius: 4px;
    padding-top: 6px;
    background-position-y: 4px;
  }
  .aics-table-cell:last-child {
    border-top-right-radius: 4px;
    padding-top: 6px;
  }
}

.aics-table-row:last-child {
  .aics-table-header {
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
  padding: 2px 16px 0 32px;
  color: ${borderColor};
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

  .aics-content-section {
    padding: 2px 0;
    margin: 4px;
  }
}

.aics-table-header {
  background-repeat: no-repeat;
  white-space: nowrap;
}

.aics-table-header.aics-content-span-text {
  background-image: ${themedIcon('text', borderColor)};
}

.aics-table-header.aics-content-span-number {
  background-image: ${themedIcon('number', borderColor)};
}

.aics-table-header.aics-content-span-date {
  background-image: ${themedIcon('date', borderColor)};
}
`
