import { Base } from './Base'
import { Collapsible } from './Collapsible'

export class ListItem extends Collapsible {}

export class ChecklistItem extends ListItem {
  checked: boolean = false
}

export class List extends Base {
  items: ListItem[] = []
}

export class Checklist extends List {
  items: ChecklistItem[] = []
}
