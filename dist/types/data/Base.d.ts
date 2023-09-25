export declare abstract class Base {
    uuid: string;
    classNames: Set<string>;
    iteration?: number;
    constructor(uuid: string);
    getClassNames(selected_index: number): string[];
}
