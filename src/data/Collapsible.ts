import { Content } from './Content'

export class Collapsible extends Content {
  public collapsed: boolean = true
  public icon?: string

  constructor (uuid: string, public name: string) {
    super(uuid)
  }
}
