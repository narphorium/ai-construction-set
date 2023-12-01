import { Content } from './Content'

export class Collapsible extends Content {
  public collapsed: boolean = true

  constructor (uuid: string, public name: string) {
    super(uuid)
  }
}
