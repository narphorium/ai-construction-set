import { type Base } from './Base'
import { Selectable } from './Selectable'

export class Content extends Selectable {
  public children: Base[] = []
}
