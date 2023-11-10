import { Selectable } from './Selectable'

export class Span extends Selectable {
  datatype?: string

  constructor (public uuid: string, public content: string) {
    super(uuid)
  }
}
