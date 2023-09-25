export abstract class Base {
    classNames: Set<string> = new Set();
    iteration?: number;

    public constructor(public uuid: string) {}

    public getClassNames(selected_index: number): string[] {
        return Array.from(this.classNames);
    }
}