import { Selectable } from './Selectable'
import { type Span } from './Span'

export class Paragraph extends Selectable {
  public spans: Span[] = []
}
