export abstract class Base {
    classNames: Set<string> = new Set();

    public getClassNames(selected_index: number): string[] {
        return Array.from(this.classNames);
    }

    public containsSelected(selected_index: number): boolean {
        return false;
    }
}