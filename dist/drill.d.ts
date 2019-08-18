declare type LambdaCallbackType = (obj: any) => any;
declare type QueryType = string | number | LambdaCallbackType;
declare class Drill {
    protected _obj: any;
    protected _lambda: (obj: any, callback: (obj: any) => any) => any;
    protected _parent?: Drill;
    protected _debug?: any;
    constructor(obj: any);
    static _query(obj: any, query: QueryType[]): any;
    q(query: QueryType[]): Drill;
    query(query: QueryType[]): Drill;
    sq(query: QueryType[]): Drill;
    subquery(query: QueryType[]): Drill;
    f(query: QueryType[], value: any): Drill;
    find(query: QueryType[], value: any): Drill;
    _dig(callback?: (obj: any) => any): any | undefined;
    value<T>(def?: T): T | undefined;
}
export default Drill;
//# sourceMappingURL=drill.d.ts.map