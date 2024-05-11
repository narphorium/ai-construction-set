import { Base } from './Base'

export class Pageable extends Base {
  public page?: number
  public children: Base[] = []
}
