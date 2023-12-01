import { Base } from './Base'

export class Stream extends Base {
  public name?: string
  public page?: number
  public blocks: Base[] = []
}
