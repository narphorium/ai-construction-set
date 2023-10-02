import { Base } from './Base'

export class Stream extends Base {
  public name?: string
  public parent?: string
  public blocks: Base[] = []
}
