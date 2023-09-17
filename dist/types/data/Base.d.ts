export declare abstract class Base {
    uuid: string;
    classNames: Set<string>;
    iteration?: number;
    getClassNames(selected_index: number): string[];
}
