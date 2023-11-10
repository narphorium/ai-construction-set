import { type Section } from './Section'
import { Selectable } from './Selectable'

export class TableRow extends Selectable {
  values: Section[] = []
  isHeader?: boolean
}

export class Table extends Selectable {
  rows: TableRow[] = []
}
