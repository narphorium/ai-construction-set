import { Base } from './Base'

export class Tree extends Base {
  public name?: string
  public page?: number
  public blocks: Base[] = []
}
