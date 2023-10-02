import { Selectable } from './Selectable'
import { type Span } from './Span'

export class Section extends Selectable {
  public name: string | null = null
  public spans: Span[] = []
}
