
type LambdaCallbackType =  (obj : any) => any;
type QueryType = string | number | LambdaCallbackType;
type LambdaFunctionType = (obj : any, func? : LambdaFunctionType) => any; 

class Drill {
    
    protected _obj : any ;
    protected _lambda : (obj : any, callback : (obj: any) => any) => any;
    protected _parent? : Drill;
    
    protected _debug? : any;
    
    constructor ( obj : any ) {
        this._obj = obj ; 
        this._lambda = (obj, callback) => callback(obj)
    }
    
    static _query (obj : any , query : QueryType[] ) : any {
        const key = query.shift();
        let value : any;
        
        // key is number && obj is array
        if (typeof(key) === "number" && Array.isArray(obj)) {
            // range of length
            if (0 <= key && key < obj.length) {
                value = obj[key]
            }
            else {
                value = undefined;
            }
        }
        
        // key is str && obj is Object
        if (typeof(key) === "string" && typeof(obj) === "object"){
            // contains key
            if (key in obj) {
                value = obj[key];
            }
            else {
                value = undefined;
            }
        }
        
        // key is funtion
        if (typeof(key) === "function") {
            value = key(obj);
        }
        
        // for next step
        if (query.length === 0) {
            return value;
        }
        else {
            return Drill._query(value, query);
        }
        
    }
    
    q (query : QueryType[]) : Drill {
        return this.query (query);
    }
    
    query (query : QueryType[]) : Drill {
        const drill = new Drill(null);
        drill._parent = this;
        drill._debug  = query;
        drill._lambda = (obj, callback) => {
            const result = Drill._query(obj, query.slice());
            return callback(result);
        }
        
        return drill;
    } 
    
    sq (query : QueryType []) : Drill {
        return this.subquery (query);
    }
    
    subquery (query : QueryType[]) : Drill {
        const drill = new Drill(null);
        drill._parent = this;
        drill._debug  = query;
        drill._lambda = (obj, callback) => {
            if (Array.isArray(obj)) {
                return obj.map((n) => callback(Drill._query(n, query.slice())));
            }
            else {
                return null;
            }
        }
        
        return drill;
    }
    
    f (query : QueryType[], value : any) : Drill {
        return this.find(query, value);
    }
    
    find (query : QueryType[], value : any) : Drill {
        const drill = new Drill(null);
        drill._parent = this;
        drill._debug  = query;
        drill._lambda = (obj, callback) => {
            if (Array.isArray(obj)) {
                const filter = obj.filter((n) => Drill._query(n, query.slice()) === value);
                return filter.map((n) => callback(n))
            }
            else {
                return null;
            }
        }
        
        return drill;
        
    }
    
    _dig (callback? : (obj : any) => any ) : any | undefined {

        // main logic
        const lambda = (obj : any) : any => {
            
            // complement callback
            let _callback;
            if (callback) {
                _callback = callback
            }
            else {
                _callback = (obj : any) : any => obj;
            }
            
        
            const result =  this._lambda(obj, _callback);
            
        
            return result;
            
            
        }
        
        // if exist parent
        // call to parent dig
        if (this._parent) {
            return this._parent._dig(lambda);
        }
        
        // if no exit parent (root node)
        // coll to lambda
        else {
            if (lambda) {
                return lambda(this._obj);
            }
            else {
                return this._obj;
            }
        }
        
    }
    
    // output method
    value<T> (def? : T) : T | undefined {
        
        // dig object
        const result = this._dig();
        
        // cast
        if (result as T) {
            return result
        } 
        else {
            return def;
        }
    }
}


export default Drill;