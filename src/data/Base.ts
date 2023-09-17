export abstract class Base {
    uuid: string = crypto.randomUUID();
    classNames: Set<string> = new Set();
    iteration?: number;

    public getClassNames(selected_index: number): string[] {
        return Array.from(this.classNames);
    }
}