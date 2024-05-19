import { Paragraph } from './Paragraph'

export class Code extends Paragraph {
  public language?: string
  public editable: boolean = false
}
