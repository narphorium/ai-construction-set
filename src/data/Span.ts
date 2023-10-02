import { Selectable } from './Selectable'

export class Span extends Selectable {
  constructor (public uuid: string, public content: string) {
    super(uuid)
  }
}
