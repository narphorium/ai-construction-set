export declare abstract class Base {
    uuid: string;
    classNames: Set<string>;
    iteration?: number;
    constructor(uuid: string);
    getClassNames(selectedIndex: number): string[];
}
