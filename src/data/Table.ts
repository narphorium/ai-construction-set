import { type Paragraph } from './Paragraph'
import { Selectable } from './Selectable'

export class TableRow extends Selectable {
  values: Paragraph[] = []
  isHeader?: boolean
}

export class Table extends Selectable {
  rows: TableRow[] = []
}
