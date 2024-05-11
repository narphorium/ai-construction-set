export declare abstract class Base {
    uuid: string;
    classNames: Set<string>;
    iteration?: number;
    variant?: string;
    theme?: string;
    constructor(uuid: string);
    getClassNames(selectedIndex: number): string[];
}
