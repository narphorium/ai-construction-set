import { Base } from './Base'

export class Selectable extends Base {
  public selected: boolean = false
  public selectionIndex: number | null = null

  public constructor (uuid: string) {
    super(uuid)
  }

  public getClassNames (selectedIndex: number): string[] {
    const classNames = new Set(super.getClassNames(selectedIndex))
    if (this.selectionIndex !== null) {
      classNames.add('selectable')
    }
    if (selectedIndex === this.selectionIndex) {
      classNames.add('selected')
    }
    return Array.from(classNames)
  }
}
