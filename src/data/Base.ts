export abstract class Base {
  classNames = new Set<string>()
  iteration?: number
  variant?: string
  theme?: string

  public constructor (public uuid: string) {}
}
