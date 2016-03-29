declare interface Immuted<T> {
    merge(part): Immutable<T>;
    set(property: string, value: any): Immutable<T>;
    setIn(propertyPath: (string|number)[], value: any): Immutable<T>;
    without(...property: string[]): Immutable<T>;
    without(property: string[]): Immutable<T>;
    without(filter: (value: any, key: string) => boolean): Immutable<T>;
    // Array 
    flatMap(fn: (item: any) => any[]): Immutable<any[]>;
    asObject(fn: (item: any) => any[]): Immutable<any>;
    asMutable(): T;
}
declare type Immutable<T> = T & Immuted<T>;
declare interface Options {
    prototype?: any;
}

declare function Immutable<T>(source: T, options?: Options): Immutable<T>;

declare module 'seamless-immutable' {
    export default Immutable;
}