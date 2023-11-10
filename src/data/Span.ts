import { Selectable } from './Selectable'

export class Span extends Selectable {
  icon?: string

  constructor (public uuid: string, public content: string) {
    super(uuid)
  }
}
