export abstract class Base {
  classNames = new Set<string>()
  iteration?: number

  public constructor (public uuid: string) {}

  public getClassNames (selectedIndex: number): string[] {
    return Array.from(this.classNames)
  }
}
